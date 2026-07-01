import type { DebateTopic, StudentLevel } from "@/types/debate";

const nonAnswers = new Set([
  "몰라",
  "모름",
  "모르겠어",
  "모르겠어요",
  "모르겠습니다",
  "아무거나",
  "아무생각없어",
  "아무생각없어요",
  "글쎄",
  "패스",
  "ㅋㅋ",
  "ㅎㅎ",
]);

function compact(text: string) {
  return text.toLowerCase().replace(/[\s.!?~…]+/g, "");
}

export function needsImmediateDebateGuidance(text: string) {
  const normalized = compact(text);

  if (!normalized || nonAnswers.has(normalized)) {
    return true;
  }

  return (
    /(?:답|글|주장).*(?:대신|그냥).*(?:써|작성|만들)/.test(normalized) ||
    /(?:뭐|무엇)(?:라고|을|를).*(?:써|말해)/.test(normalized) ||
    /정답.*(?:알려|말해)/.test(normalized)
  );
}

export function buildImmediateDebateGuidance({
  studentLevel,
  topic,
}: {
  studentLevel: StudentLevel;
  topic: DebateTopic;
}) {
  if (studentLevel === "elementary") {
    return `잠깐, 괜찮아. 이 대국은 정답을 맞히는 시간이 아니야. 흑돌이 자기 생각과 까닭을 말하면, 백돌은 다른 입장을 말하고 질문 하나를 이어 갈 거야. “${topic.title}”에 찬성하는지 반대하는지와 그 까닭 하나를 말해 볼래?`;
  }

  if (studentLevel === "middle") {
    return `잠깐 대국 방법을 다시 맞춰 보자. 흑돌은 자신의 주장과 근거를 말하고, 백돌은 반대 입장에서 놓친 결과나 사람을 짚은 뒤 질문 하나를 이어 가는 방식이야. 정답을 찾기보다 네 판단 기준을 만드는 것이 중요해. “${topic.title}”에서 네가 가장 중요하다고 보는 기준은 무엇이야?`;
  }

  return `현재 입력만으로는 흑돌의 판단 기준을 확인하기 어려워서 대국 방법을 짧게 안내할게. 이 대국에서는 흑돌이 입장과 근거를 제시하면 백돌이 반대 가치와 반례를 제시하고, 이후 조건과 책임 기준을 정교화해 가. 정답을 대신 받기보다 자신의 판단을 만드는 과정이 핵심이야. “${topic.title}”를 판단할 때 네가 우선하려는 기준은 무엇이야?`;
}
