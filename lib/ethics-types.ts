import type { EthicsType } from "@/types/debate";

export const ethicsTypes: EthicsType[] = [
  {
    code: "HSH",
    name: "인간중시 S형",
    stoneName: "인간의 수호자",
    shortLabel: "인간 우선",
    description:
      "개인의 권리와 감정을 가장 먼저 살피며, 공동체의 안전도 함께 고려하는 유형입니다.",
    priorities: [
      "인간존엄성 > 사회공공성",
      "사회공공성 > 기술합목적성",
      "인간존엄성 > 기술합목적성",
    ],
    coreValue: "인간존엄성",
    secondaryValue: "사회공공성",
    debateStyle:
      "사람의 권리와 감정을 중심으로 주장하되, 공동체의 안전도 놓치지 않습니다.",
  },
  {
    code: "HTH",
    name: "인간중시 T형",
    stoneName: "인간 중심 전략가",
    shortLabel: "인간+기술",
    description:
      "인간의 존엄을 최우선에 두면서도 기술이 사람을 돕는 방식이라면 긍정적으로 봅니다.",
    priorities: [
      "인간존엄성 > 사회공공성",
      "기술합목적성 > 사회공공성",
      "인간존엄성 > 기술합목적성",
    ],
    coreValue: "인간존엄성",
    secondaryValue: "기술합목적성",
    debateStyle:
      "개인의 권리를 최우선으로 보되, 기술이 인간을 돕는 방향인지 따져 묻습니다.",
  },
  {
    code: "SSH",
    name: "사회중시 H형",
    stoneName: "공동체의 파수꾼",
    shortLabel: "사회 우선",
    description:
      "공동체의 안전과 공정성을 가장 중요하게 보며, 개인의 권리 침해도 경계합니다.",
    priorities: [
      "사회공공성 > 인간존엄성",
      "사회공공성 > 기술합목적성",
      "인간존엄성 > 기술합목적성",
    ],
    coreValue: "사회공공성",
    secondaryValue: "인간존엄성",
    debateStyle:
      "공동체의 안전과 질서를 중심으로 주장하되, 개인의 자유가 지나치게 침해되는지도 살핍니다.",
  },
  {
    code: "SST",
    name: "사회중시 T형",
    stoneName: "공공선의 설계자",
    shortLabel: "사회+기술",
    description:
      "사회 전체의 이익을 우선하며, 기술을 공공 문제 해결의 도구로 적극 활용하려는 유형입니다.",
    priorities: [
      "사회공공성 > 인간존엄성",
      "사회공공성 > 기술합목적성",
      "기술합목적성 > 인간존엄성",
    ],
    coreValue: "사회공공성",
    secondaryValue: "기술합목적성",
    debateStyle:
      "공공의 이익과 문제 해결을 위해 기술 활용을 지지하지만, 기준과 책임도 요구합니다.",
  },
  {
    code: "STT",
    name: "기술중시 S형",
    stoneName: "기술의 해결사",
    shortLabel: "기술 우선",
    description:
      "기술의 정확성과 효율성을 중요하게 보며, 사회적 효과를 함께 따지는 유형입니다.",
    priorities: [
      "사회공공성 > 인간존엄성",
      "기술합목적성 > 사회공공성",
      "기술합목적성 > 인간존엄성",
    ],
    coreValue: "기술합목적성",
    secondaryValue: "사회공공성",
    debateStyle:
      "AI가 문제를 효과적으로 해결할 수 있다면 사용할 가치가 있다고 주장합니다.",
  },
  {
    code: "HTT",
    name: "기술중시 H형",
    stoneName: "기술의 인간주의자",
    shortLabel: "기술+인간",
    description:
      "기술의 성능과 효율을 중시하면서도 인간의 피해를 줄이는 설계를 중요하게 봅니다.",
    priorities: [
      "인간존엄성 > 사회공공성",
      "기술합목적성 > 사회공공성",
      "기술합목적성 > 인간존엄성",
    ],
    coreValue: "기술합목적성",
    secondaryValue: "인간존엄성",
    debateStyle:
      "기술 발전과 효율성을 중시하지만, 인간을 해치지 않는 보완 장치를 요구합니다.",
  },
  {
    code: "HST",
    name: "균형중시 A형",
    stoneName: "균형의 기사",
    shortLabel: "균형 A",
    description:
      "하나의 가치만 고집하지 않고 상황에 따라 인간, 사회, 기술의 균형을 조정합니다.",
    priorities: [
      "인간존엄성 > 사회공공성",
      "사회공공성 > 기술합목적성",
      "기술합목적성 > 인간존엄성",
    ],
    coreValue: "균형",
    secondaryValue: "상황판단",
    debateStyle:
      "상황에 따라 가치의 우선순위가 달라질 수 있음을 강조하며 판단 기준을 묻습니다.",
  },
  {
    code: "STH",
    name: "균형중시 B형",
    stoneName: "맥락의 전략가",
    shortLabel: "균형 B",
    description:
      "서로 다른 가치가 맞물려 있다고 보고, 맥락에 맞는 기준과 절차를 세우려는 유형입니다.",
    priorities: [
      "사회공공성 > 인간존엄성",
      "기술합목적성 > 사회공공성",
      "인간존엄성 > 기술합목적성",
    ],
    coreValue: "균형",
    secondaryValue: "상황판단",
    debateStyle:
      "사회, 기술, 인간의 관점을 모두 열어 두고 맥락 중심으로 판단합니다.",
  },
];
