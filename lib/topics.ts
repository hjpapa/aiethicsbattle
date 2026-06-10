import type { DebateTopic } from "@/types/debate";

export const debateTopics: DebateTopic[] = [
  {
    id: "school-ai-cctv",
    title: "학교에서 AI CCTV로 학생의 위험 행동을 미리 감지해도 될까?",
    subtitle: "안전인가, 감시인가",
    description:
      "AI가 학교 CCTV 영상을 분석해 폭력, 사고, 위험 행동을 미리 알려주는 상황입니다.",
    relatedValues: ["인간존엄성", "사회공공성", "기술합목적성"],
    blackPrompt:
      "나는 학교 안전을 위해 AI CCTV를 사용할 수 있다고 생각한다 / 사용할 수 없다고 생각한다.",
  },
  {
    id: "ai-learning-data",
    title: "AI 맞춤 학습을 위해 학생의 학습 데이터를 계속 수집해도 될까?",
    subtitle: "맞춤 학습인가, 데이터 침해인가",
    description:
      "AI가 문제 풀이 기록, 집중 시간, 오답 패턴을 분석해 맞춤 학습을 제공하는 상황입니다.",
    relatedValues: ["인간존엄성", "기술합목적성"],
    blackPrompt:
      "나는 맞춤 학습을 위해 학습 데이터를 수집해도 된다고 생각한다 / 제한해야 한다고 생각한다.",
  },
  {
    id: "ai-emotion-analysis",
    title: "AI가 학생의 표정과 목소리로 감정을 분석해도 될까?",
    subtitle: "도움인가, 마음의 침범인가",
    description:
      "AI가 표정과 목소리를 분석해 스트레스나 우울감을 예측하는 상황입니다.",
    relatedValues: ["인간존엄성", "사회공공성"],
    blackPrompt:
      "나는 AI 감정 분석이 학생 보호를 위해 필요하다고 생각한다 / 조심해야 한다고 생각한다.",
  },
  {
    id: "ai-homework-grading",
    title: "AI가 숙제를 자동으로 검사하고 점수를 매겨도 될까?",
    subtitle: "효율적인 평가인가, 불공정한 판단인가",
    description:
      "AI가 글쓰기, 수학 풀이, 과제를 자동 평가하는 상황입니다.",
    relatedValues: ["기술합목적성", "인간존엄성"],
    blackPrompt:
      "나는 AI 자동 채점이 편리하고 필요하다고 생각한다 / 사람의 판단이 더 중요하다고 생각한다.",
  },
  {
    id: "ai-public-safety",
    title: "범죄 예방을 위해 AI가 사람들의 이동 정보를 분석해도 될까?",
    subtitle: "공공 안전인가, 개인정보 침해인가",
    description:
      "AI가 공공 안전을 위해 사람들의 이동 패턴을 분석하는 상황입니다.",
    relatedValues: ["사회공공성", "인간존엄성", "기술합목적성"],
    blackPrompt:
      "나는 공공 안전을 위해 이동 정보 분석이 필요하다고 생각한다 / 개인정보 보호가 더 중요하다고 생각한다.",
  },
  {
    id: "ai-creative-work",
    title: "AI가 만든 그림이나 글을 학생의 작품으로 인정해도 될까?",
    subtitle: "창작 도구인가, 대신 해 주는 기계인가",
    description:
      "학생이 AI로 만든 그림, 글, 발표 자료를 자신의 작품으로 제출하는 상황입니다.",
    relatedValues: ["인간존엄성", "기술합목적성", "사회공공성"],
    blackPrompt:
      "나는 AI를 사용한 작품도 학생의 작품으로 인정할 수 있다고 생각한다 / 인정하기 어렵다고 생각한다.",
  },
];
