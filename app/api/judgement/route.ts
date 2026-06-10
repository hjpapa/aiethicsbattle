import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getTopicById } from "@/lib/debate-engine";
import { parseJsonObject } from "@/lib/json";
import { AI_MODEL, generateAIText } from "@/lib/openai";
import { buildJudgementPrompt } from "@/lib/prompts";
import { isStudentLevel, saveDebateMessage } from "@/lib/supabase-server";
import type { DebateMessage, JudgementResult } from "@/types/debate";

const fallbackJudgement: JudgementResult = {
  dominantValueOfBlack: "학생의 주장 속 핵심 가치를 아직 더 확인해야 합니다.",
  dominantValueOfWhite: "백돌은 반대 관점을 제시하고 있습니다.",
  conflict: "인간존엄성, 사회공공성, 기술합목적성 사이의 충돌을 더 살펴봐야 합니다.",
  blackStrength: "자신의 입장을 직접 말하며 토론을 시작했습니다.",
  whiteChallenge: "다른 가치 기준도 함께 보자고 질문했습니다.",
  nextThinkingQuestion: "이 주제에서 절대 양보하기 어려운 기준은 무엇인가요?",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.topicId !== "string" ||
    !isStudentLevel(body.studentLevel) ||
    !Array.isArray(body.history)
  ) {
    return NextResponse.json({ error: "Invalid judgement payload." }, { status: 400 });
  }

  const topic = getTopicById(body.topicId);
  const history = body.history as DebateMessage[];

  try {
    const raw = await generateAIText({
      instructions:
        "너는 AI 윤리 흑백토론의 형세판단 해설자다. 반드시 유효한 JSON만 출력한다.",
      input: buildJudgementPrompt({
        topic,
        history,
        studentLevel: body.studentLevel,
      }),
    });

    const judgement = parseJsonObject<JudgementResult>(raw, fallbackJudgement);
    const judgementMessage: DebateMessage = {
      id: randomUUID(),
      role: "system",
      content: JSON.stringify(judgement),
      stage: "judgement",
      createdAt: new Date().toISOString(),
    };

    await saveDebateMessage({ sessionId: body.sessionId, message: judgementMessage });

    return NextResponse.json({ judgement, model: AI_MODEL });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown judgement error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
