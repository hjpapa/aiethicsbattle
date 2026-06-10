import { NextResponse } from "next/server";
import { getEthicsTypeByCode, getTopicById } from "@/lib/debate-engine";
import { parseJsonObject } from "@/lib/json";
import { AI_MODEL, generateAIText } from "@/lib/openai";
import { buildReviewPrompt } from "@/lib/prompts";
import { isEthicsTypeCode, isStudentLevel, saveDebateReview } from "@/lib/supabase-server";
import type { DebateMessage, ReviewResult } from "@/types/debate";

const fallbackReview: ReviewResult = {
  blackMainClaim: "흑돌은 자신의 입장에서 중요한 가치를 제시했습니다.",
  whiteMainCounter: "백돌은 반대편 가치와 기준을 물었습니다.",
  strongestConflict: "인간존엄성, 사회공공성, 기술합목적성 중 무엇을 우선할지의 충돌입니다.",
  blackStrength: "자기 생각을 직접 말하며 토론에 참여했습니다.",
  nextPerspective: "상대 입장에서 가장 걱정하는 피해가 무엇인지 더 생각해 볼 수 있습니다.",
  growthSentence: "좋은 토론은 이기는 것이 아니라 기준을 더 선명하게 만드는 과정입니다.",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    !isEthicsTypeCode(body.userType) ||
    !isEthicsTypeCode(body.botType) ||
    !isStudentLevel(body.studentLevel) ||
    typeof body.topicId !== "string" ||
    !Array.isArray(body.history)
  ) {
    return NextResponse.json({ error: "Invalid review payload." }, { status: 400 });
  }

  const userType = getEthicsTypeByCode(body.userType);
  const botType = getEthicsTypeByCode(body.botType);
  const topic = getTopicById(body.topicId);
  const history = body.history as DebateMessage[];

  try {
    const raw = await generateAIText({
      instructions:
        "너는 AI 윤리 흑백토론의 복기 코치다. 반드시 유효한 JSON만 출력한다.",
      input: buildReviewPrompt({
        topic,
        userType,
        botType,
        studentLevel: body.studentLevel,
        history,
      }),
    });

    const review = parseJsonObject<ReviewResult>(raw, fallbackReview);
    await saveDebateReview({ sessionId: body.sessionId, review });

    return NextResponse.json({ review, model: AI_MODEL });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown review error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
