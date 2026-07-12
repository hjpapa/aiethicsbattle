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
  closingMessage: "흑돌과 백돌의 대국이 여기서 끝났습니다. 이제 서로 어떤 수를 두었는지 복기해 봅시다.",
  initialThought: "흑돌은 자신의 입장에서 중요한 생각과 이유를 말했습니다.",
  finalThought: "흑돌은 처음 입장을 바탕으로 판단 기준을 더 구체적으로 살펴보았습니다.",
  blackArguments: ["자신이 중요하게 생각하는 가치와 그 이유를 설명했습니다."],
  whitePerspective: "백돌은 같은 문제를 다른 사람과 가치의 입장에서 살펴보게 했습니다.",
  valueConflict: "AI의 도움과 사람의 권리, 모두의 안전 중 무엇을 함께 지킬지 생각했습니다.",
  addedCondition: "AI를 사용할 때 필요한 제한과 사람의 확인 절차를 더 생각했습니다.",
  goodMove: "한쪽 결론만 말하지 않고 그 선택이 사람에게 미칠 영향을 생각했습니다.",
  unresolvedIssue: "서로 다른 가치가 충돌할 때 무엇을 먼저 지킬지는 계속 생각해 볼 문제입니다.",
  responsibleConditions: ["AI의 판단을 사람이 다시 확인하고 영향을 받는 사람을 살핍니다."],
  responsiblePromise: "AI의 판단만 믿지 않고 사람에게 미칠 영향을 함께 살피겠습니다.",
  reflectionSentence: "AI의 도움을 활용하면서도 사람의 권리와 마음을 함께 지켜야 합니다.",
  finalMessage: "이번 대국에서 중요한 것은 승패가 아니라 서로 다른 가치가 왜 충돌하는지 살펴본 것입니다.",
};

const reviewSchema = {
  type: "object",
  properties: {
    closingMessage: { type: "string" },
    initialThought: { type: "string" },
    finalThought: { type: "string" },
    blackArguments: { type: "array", items: { type: "string" } },
    whitePerspective: { type: "string" },
    valueConflict: { type: "string" },
    addedCondition: { type: "string" },
    goodMove: { type: "string" },
    unresolvedIssue: { type: "string" },
    responsibleConditions: { type: "array", items: { type: "string" } },
    responsiblePromise: { type: "string" },
    reflectionSentence: { type: "string" },
    finalMessage: { type: "string" },
  },
  required: [
    "closingMessage", "initialThought", "finalThought", "blackArguments",
    "whitePerspective", "valueConflict", "addedCondition", "goodMove",
    "unresolvedIssue", "responsibleConditions", "responsiblePromise",
    "reflectionSentence", "finalMessage",
  ],
  additionalProperties: false,
} as const;

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
      { error: "한 번 이상 착수한 뒤 토론을 끝낼 수 있습니다." },
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
      jsonSchema: {
        name: "debate_review",
        description: "종료된 AI 윤리 흑백토론의 공정하고 따뜻한 복기",
        schema: reviewSchema,
      },
    });

    const review = parseJsonObject<ReviewResult>(raw, fallbackReview);
    await saveDebateReview({ sessionId: body.sessionId, review });

    return NextResponse.json({ review, model: AI_MODEL });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown review error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
