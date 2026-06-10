import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getEthicsTypeByCode, getTopicById } from "@/lib/debate-engine";
import { AI_MODEL, generateAIText } from "@/lib/openai";
import { buildChatInput, buildDebateInstructions } from "@/lib/prompts";
import { isEthicsTypeCode, isStudentLevel, saveDebateMessage } from "@/lib/supabase-server";
import type { DebateMessage, StudentLevel } from "@/types/debate";

const CHAT_HISTORY_LIMIT = 10;

const replyTokenBudget = {
  elementary: 900,
  middle: 1100,
  high: 1300,
} as const;

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

  try {
    const content = await generateAIText({
      instructions: buildDebateInstructions({
        userType,
        botType,
        topic,
        studentLevel,
      }),
      input: buildChatInput({
        userMessage: body.message.content,
        history: recentHistory,
      }),
      maxOutputTokens: replyTokenBudget[studentLevel],
      verbosity: "medium",
    });

    const aiMessage: DebateMessage = {
      id: randomUUID(),
      role: "white",
      content,
      stage: whiteStage,
      createdAt: new Date().toISOString(),
    };

    await Promise.all([
      saveDebateMessage({ sessionId: body.sessionId, message: body.message }),
      saveDebateMessage({ sessionId: body.sessionId, message: aiMessage }),
    ]);

    return NextResponse.json({ message: aiMessage, model: AI_MODEL });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown OpenAI error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
