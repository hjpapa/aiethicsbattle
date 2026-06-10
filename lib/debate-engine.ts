import { ethicsTypes } from "@/lib/ethics-types";
import { debateTopics } from "@/lib/topics";
import type {
  DebateMessage,
  DebateStage,
  EthicsType,
  EthicsTypeCode,
  StudentLevel,
} from "@/types/debate";

export const oppositeEthicsTypeMap: Record<EthicsTypeCode, EthicsTypeCode> = {
  HSH: "STT",
  HTH: "SST",
  SSH: "HTT",
  SST: "HTH",
  STT: "HSH",
  HTT: "SSH",
  HST: "STH",
  STH: "HST",
};

export const levelLabels: Record<StudentLevel, string> = {
  elementary: "초등학생 수준",
  middle: "중학생 수준",
  high: "고등학생 수준",
};

export const levelDescriptions: Record<StudentLevel, string> = {
  elementary: "짧고 쉬운 문장, 생활 예시, 한 번에 하나의 질문",
  middle: "주장과 근거 구분, 반론과 재반론, 가치 충돌 설명",
  high: "권리 침해, 공익, 효율성, 판단 기준 같은 개념을 포함",
};

export function getEthicsTypeByCode(code: EthicsTypeCode) {
  const ethicsType = ethicsTypes.find((type) => type.code === code);
  if (!ethicsType) {
    throw new Error(`Unknown ethics type: ${code}`);
  }
  return ethicsType;
}

export function getOppositeEthicsType(code: EthicsTypeCode) {
  return getEthicsTypeByCode(oppositeEthicsTypeMap[code]);
}

export function getTopicById(topicId: string) {
  const topic = debateTopics.find((item) => item.id === topicId);
  if (!topic) {
    throw new Error(`Unknown debate topic: ${topicId}`);
  }
  return topic;
}

export function getLevelLabel(level: StudentLevel) {
  return levelLabels[level];
}

export function buildBlackOpeningGuide(userType: EthicsType) {
  const valueGuide: Record<string, string> = {
    인간존엄성:
      "학생의 권리, 마음, 사생활이 먼저 보호되어야 한다고 볼 가능성이 큽니다.",
    사회공공성:
      "개인의 불편만이 아니라 모두의 안전과 공정성을 함께 지켜야 한다고 볼 가능성이 큽니다.",
    기술합목적성:
      "AI가 실제 문제를 정확하고 효율적으로 해결한다면 활용할 수 있다고 볼 가능성이 큽니다.",
    균형:
      "한쪽으로 단정하기보다 조건, 절차, 책임 기준을 세워 판단해야 한다고 볼 가능성이 큽니다.",
  };

  return `${userType.stoneName} 관점에서는 이 주제에서 ${
    valueGuide[userType.coreValue]
  }`;
}

export function getNextBlackStage(messages: DebateMessage[]): DebateStage {
  const blackMoves = messages.filter((message) => message.role === "black").length;
  if (blackMoves === 0) {
    return "black_first_move";
  }
  return "black_counter";
}

export function createMessage(
  role: DebateMessage["role"],
  content: string,
  stage: DebateStage,
): DebateMessage {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    stage,
    createdAt: new Date().toISOString(),
  };
}

export function summarizeHistory(messages: DebateMessage[]) {
  return messages
    .map((message) => {
      const roleLabel =
        message.role === "black"
          ? "흑돌 학생"
          : message.role === "white"
            ? "백돌 AI"
            : "진행";
      return `[${roleLabel} / ${message.stage}] ${message.content}`;
    })
    .join("\n");
}
