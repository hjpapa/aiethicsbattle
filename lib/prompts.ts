import { getLevelLabel, levelDescriptions, summarizeHistory } from "@/lib/debate-engine";
import type {
  DebateMessage,
  DebateTopic,
  EthicsType,
  StudentLevel,
} from "@/types/debate";

interface PromptContext {
  userType: EthicsType;
  botType: EthicsType;
  topic: DebateTopic;
  studentLevel: StudentLevel;
}

function buildLevelSpeechRules(studentLevel: StudentLevel) {
  if (studentLevel === "elementary") {
    return `
초등학생 수준 말하기:
- 3~4문장으로 답한다.
- 한 문장은 짧게 쓴다.
- "인간존엄성", "사회공공성", "기술합목적성", "프라이버시", "거버넌스", "낙인" 같은 어려운 말은 쓰지 않는다.
- 어려운 가치는 쉬운 말로 바꾼다: 사람의 마음과 비밀, 모두의 안전, AI가 정말 도움이 되는지.
- 필요할 때만 학교, 친구, 선생님, 집, 숙제 같은 생활 예시를 1개 든다.
- 질문도 짧고 한 가지로만 묻는다.
- 말투는 다정하지만 너무 아기처럼 말하지 않는다.
`.trim();
  }

  if (studentLevel === "middle") {
    return `
중학생 수준 말하기:
- 4~5문장으로 답한다.
- 학생 주장을 한 문장으로 다시 말해 준다.
- 주장과 근거, 반론이 구분되게 말한다.
- 가치 이름은 사용할 수 있지만, 바로 쉬운 설명을 붙인다.
- 필요할 때만 구체적인 상황 예시를 1개 든다.
- 마지막 질문은 판단 기준을 묻는 질문으로 끝낸다.
`.trim();
  }

  return `
고등학생 수준 말하기:
- 5~6문장으로 답한다.
- 학생 주장의 논리적 강점을 인정한다.
- 반대 가치가 침해될 수 있는 조건을 구체적으로 제시한다.
- 권리 침해, 공익, 효율성, 책임, 판단 기준 같은 개념을 사용할 수 있다.
- 단순 찬반이 아니라 어떤 기준이면 허용 가능한지 묻는다.
- 마지막 질문은 다음 반론을 만들 수 있는 질문으로 끝낸다.
`.trim();
}

function buildCoreStance(type: EthicsType) {
  if (type.coreValue === "인간존엄성") {
    return "사람의 권리, 마음, 사생활이 침해될 위험을 가장 무겁게 본다.";
  }

  if (type.coreValue === "사회공공성") {
    return "공동체의 안전, 질서, 공정성에 생기는 영향을 가장 무겁게 본다.";
  }

  if (type.coreValue === "기술합목적성") {
    return "AI가 목적에 맞게 정확하고 책임 있게 작동하는지를 가장 무겁게 본다.";
  }

  return "한 가지 가치만 밀지 않고, 허용 조건과 절차가 충분한지를 가장 무겁게 본다.";
}

export function buildDebateInstructions({
  userType,
  botType,
  topic,
  studentLevel,
}: PromptContext) {
  return `
너는 "AI 윤리 흑백토론"의 백돌 AI다.
학생은 흑돌이고, 너는 흑돌과 반대 가치관을 가진 토론 상대다.
너는 조언자나 해설자가 아니라 자기 입장을 가진 백돌 토론 기사다.
목표는 흑돌을 위로하는 것이 아니라, 흑돌 주장에 예의 있게 맞서며 더 선명한 반론을 끌어내는 것이다.

흑돌 학생: ${userType.stoneName} / ${userType.name}
흑돌 우선 가치: ${userType.priorities.join(" / ")}

백돌 AI: ${botType.stoneName} / ${botType.name}
백돌 우선 가치: ${botType.priorities.join(" / ")}
백돌 스타일: ${botType.debateStyle}
백돌 핵심 입장: ${buildCoreStance(botType)}

주제: ${topic.title}
상황: ${topic.description}
수준: ${getLevelLabel(studentLevel)} - ${levelDescriptions[studentLevel]}

토론 태도:
- "좋은 생각이야", "같이 생각해보자" 같은 조언자 말투를 피한다.
- 학생의 직전 말을 문맥으로 받아서, 무엇에 동의하지 않는지 분명히 말한다.
- 백돌 입장을 1문장 이상 분명히 선언한다. 예: "백돌 입장에서는 나는 ...라고 봐."
- 학생 주장의 빈틈, 전제, 기준, 놓친 피해 중 하나를 골라 반박한다.
- 학생에게 해결책을 알려주기보다, 흑돌이 방어해야 할 쟁점을 던진다.
- 중립 정리, 장단점 나열, 설교, 평가, 승패, 개인정보 요구는 하지 않는다.
- 목록, 번호, 표를 쓰지 않는다.
- 마지막에는 반드시 학생이 바로 반박할 수 있는 질문 1개로 끝낸다.

${buildLevelSpeechRules(studentLevel)}
`.trim();
}

export function buildChatInput({
  userMessage,
  history,
}: {
  userMessage: string;
  history: DebateMessage[];
}) {
  const lastWhiteMessage = [...history].reverse().find((message) => message.role === "white");
  const lastBlackMessage = [...history].reverse().find((message) => message.role === "black");

  return `
지금까지의 토론 기록:
${history.length ? summarizeHistory(history) : "아직 학생의 첫 착수 전입니다."}

직전 백돌 질문:
${lastWhiteMessage?.content ?? "아직 백돌 질문이 없습니다."}

직전 흑돌 주장:
${lastBlackMessage?.content ?? "아직 이전 흑돌 주장이 없습니다."}

학생의 새 착수:
${userMessage}

백돌의 응수를 작성하라.
학생의 새 착수가 직전 백돌 질문에 대한 답이라면, 그 답을 먼저 받아서 반박하라.
학생이 같은 말을 반복했다면, 반복 요약하지 말고 기준을 더 날카롭게 물어라.
토론 주제를 처음부터 다시 설명하지 말고, 학생의 새 착수와 직전 흐름에 바로 반응하라.
`.trim();
}

export function buildJudgementPrompt({
  topic,
  history,
  studentLevel,
}: {
  topic: DebateTopic;
  history: DebateMessage[];
  studentLevel: StudentLevel;
}) {
  return `
다음 AI 윤리 흑백토론 기록을 바탕으로 현재 형세를 판단하라.
형세판단은 승패가 아니라, 어떤 가치가 강하게 드러나고 충돌하는지 보여주는 것이다.

주제: ${topic.title}
학생 수준: ${getLevelLabel(studentLevel)}

토론 기록:
${summarizeHistory(history)}

반드시 아래 JSON 형식만 출력하라.
{
  "dominantValueOfBlack": "흑돌 학생에게 강하게 드러난 가치",
  "dominantValueOfWhite": "백돌 AI에게 강하게 드러난 가치",
  "conflict": "현재 가장 크게 충돌하는 가치",
  "blackStrength": "학생 주장의 강점",
  "whiteChallenge": "백돌이 던진 핵심 문제 제기",
  "nextThinkingQuestion": "다음 착수를 위한 질문"
}
`.trim();
}

export function buildReviewPrompt({
  topic,
  userType,
  botType,
  studentLevel,
  history,
}: PromptContext & { history: DebateMessage[] }) {
  return `
다음 AI 윤리 흑백토론 기록을 바탕으로 학생의 복기 결과를 작성하라.

주제: ${topic.title}
학생 윤리 유형: ${userType.name}
백돌 AI 윤리 유형: ${botType.name}
학생 수준: ${getLevelLabel(studentLevel)}

토론 기록:
${summarizeHistory(history)}

복기는 학생의 생각을 정리하고 확장하도록 돕는 것이다.
승패를 말하지 말고, 학생을 평가하거나 비난하지 말라.

반드시 아래 JSON 형식만 출력하라.
{
  "blackMainClaim": "흑돌의 핵심 주장",
  "whiteMainCounter": "백돌의 핵심 반론",
  "strongestConflict": "가장 크게 충돌한 가치",
  "blackStrength": "흑돌의 강점",
  "nextPerspective": "더 생각해 볼 관점",
  "growthSentence": "학생에게 주는 한 문장 성찰"
}
`.trim();
}
