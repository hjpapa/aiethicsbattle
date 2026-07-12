import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import {
  countBlackMoves,
  getEthicsTypeByCode,
  getTopicById,
} from "@/lib/debate-engine";
import {
  buildImmediateDebateGuidance,
  needsImmediateDebateGuidance,
} from "@/lib/conversation-guidance";
import { parseJsonObject } from "@/lib/json";
import { AI_MODEL, generateAIText } from "@/lib/openai";
import { buildChatInput, buildDebateInstructions } from "@/lib/prompts";
import { isEthicsTypeCode, isStudentLevel, saveDebateMessage } from "@/lib/supabase-server";
import type { DebateMessage, StudentLevel } from "@/types/debate";

const CHAT_HISTORY_LIMIT = 10;

const replyTokenBudget = {
  elementary: 1400,
  middle: 1600,
  high: 1800,
} as const;

const replySentenceLimit = {
  elementary: 5,
  middle: 5,
  high: 6,
} as const;

const whiteReplySchema = {
  type: "object",
  properties: {
    replyType: { type: "string", enum: ["debate", "guidance"] },
    content: { type: "string" },
  },
  required: ["replyType", "content"],
  additionalProperties: false,
} as const;

interface GeneratedWhiteReply {
  replyType: "debate" | "guidance";
  content: string;
}

function limitReplySentences(text: string, maximum: number) {
  const sentences = text
    .split(/(?<=[.!?])(?:\s+|\n+)+|\n+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentences.length <= maximum) {
    return sentences.join(" ");
  }

  const finalQuestion = [...sentences]
    .reverse()
    .find((sentence) => sentence.includes("?"));
  const statements = sentences.filter((sentence) => !sentence.includes("?"));
  const selected = statements.slice(0, maximum - (finalQuestion ? 1 : 0));

  if (finalQuestion) {
    selected.push(finalQuestion);
  }

  return selected.join(" ");
}

async function createGuidanceResult({
  body,
  content,
  whiteStage,
}: {
  body: {
    message: DebateMessage;
    sessionId?: string;
  };
  content: string;
  whiteStage: DebateMessage["stage"];
}) {
  const acceptedBlackMessage: DebateMessage = {
    ...body.message,
    kind: "guidance",
  };
  const aiMessage: DebateMessage = {
    id: randomUUID(),
    role: "white",
    content,
    stage: whiteStage,
    kind: "guidance",
    createdAt: new Date().toISOString(),
  };

  await Promise.all([
    saveDebateMessage({ sessionId: body.sessionId, message: acceptedBlackMessage }),
    saveDebateMessage({ sessionId: body.sessionId, message: aiMessage }),
  ]);

  return NextResponse.json({
    message: aiMessage,
    acceptedMessage: acceptedBlackMessage,
    countsAsMove: false,
    model: AI_MODEL,
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    !isEthicsTypeCode(body.userType) ||
    !isEthicsTypeCode(body.botType) ||
    !isStudentLevel(body.studentLevel) ||
    typeof body.topicId !== "string" ||
    !body.message ||
    typeof body.message.content !== "string"
  ) {
    return NextResponse.json({ error: "Invalid chat payload." }, { status: 400 });
  }

  const history = Array.isArray(body.history) ? (body.history as DebateMessage[]) : [];
  const userType = getEthicsTypeByCode(body.userType);
  const botType = getEthicsTypeByCode(body.botType);
  const topic = getTopicById(body.topicId);
  const studentLevel = body.studentLevel as StudentLevel;
  const whiteStage = body.message.stage === "black_counter" ? "white_counter" : "white_response";
  const recentHistory = history.slice(-CHAT_HISTORY_LIMIT);

  if (needsImmediateDebateGuidance(body.message.content)) {
    return createGuidanceResult({
      body,
      whiteStage,
      content: buildImmediateDebateGuidance({ studentLevel, topic }),
    });
  }

  try {
    const raw = await generateAIText({
      instructions: buildDebateInstructions({
        userType,
        botType,
        topic,
        studentLevel,
      }),
      input: buildChatInput({
        userMessage: body.message.content,
        history: recentHistory,
        moveNumber: countBlackMoves(history) + 1,
      }),
      maxOutputTokens: replyTokenBudget[studentLevel],
      verbosity: "low",
      jsonSchema: {
        name: "white_stone_reply",
        description: "백돌의 자연스러운 토론 응수 또는 대국 규칙 안내",
        schema: whiteReplySchema,
      },
    });

    const generated = parseJsonObject<GeneratedWhiteReply>(raw, {
      replyType: "debate",
      content: raw,
    });
    const isGuidance = generated.replyType === "guidance";
    let content =
      typeof generated.content === "string" && generated.content.trim()
        ? generated.content.trim()
        : raw.trim();
    content = limitReplySentences(content, replySentenceLimit[studentLevel]);
    const acceptedBlackMessage: DebateMessage = {
      ...body.message,
      kind: isGuidance ? "guidance" : "move",
    };

    const aiMessage: DebateMessage = {
      id: randomUUID(),
      role: "white",
      content,
      stage: whiteStage,
      kind: isGuidance ? "guidance" : "move",
      createdAt: new Date().toISOString(),
    };

    await Promise.all([
      saveDebateMessage({ sessionId: body.sessionId, message: acceptedBlackMessage }),
      saveDebateMessage({ sessionId: body.sessionId, message: aiMessage }),
    ]);

    return NextResponse.json({
      message: aiMessage,
      acceptedMessage: acceptedBlackMessage,
      countsAsMove: !isGuidance,
      model: AI_MODEL,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown OpenAI error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
