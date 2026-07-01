import { NextResponse } from "next/server";
import {
  MIN_BLACK_MOVES_FOR_REVIEW,
  countBlackMoves,
  getEthicsTypeByCode,
  getTopicById,
} from "@/lib/debate-engine";
import { parseJsonObject } from "@/lib/json";
import { AI_MODEL, generateAIText } from "@/lib/openai";
import { buildReviewPrompt } from "@/lib/prompts";
import { isEthicsTypeCode, isStudentLevel, saveDebateReview } from "@/lib/supabase-server";
import type { DebateMessage, ReviewResult } from "@/types/debate";

const fallbackReview: ReviewResult = {
  initialThought: "흑돌은 자신의 입장에서 중요한 생각과 이유를 말했습니다.",
  whitePerspective: "백돌은 같은 문제를 다른 사람과 가치의 입장에서 살펴보게 했습니다.",
  valueConflict: "AI의 도움과 사람의 권리, 모두의 안전 중 무엇을 함께 지킬지 생각했습니다.",
  addedCondition: "AI를 사용할 때 필요한 제한과 사람의 확인 절차를 더 생각했습니다.",
  responsiblePromise: "AI의 판단만 믿지 않고 사람에게 미칠 영향을 함께 살피겠습니다.",
  reflectionSentence: "AI의 도움을 활용하면서도 사람의 권리와 마음을 함께 지켜야 합니다.",
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

  if (countBlackMoves(history) < MIN_BLACK_MOVES_FOR_REVIEW) {
    return NextResponse.json(
      { error: "다섯 번 착수한 뒤 복기를 만들 수 있습니다." },
      { status: 400 },
    );
  }

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
