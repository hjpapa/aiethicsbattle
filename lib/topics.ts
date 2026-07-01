import type { DebateTopic } from "@/types/debate";

export const debateTopics: DebateTopic[] = [
  {
    id: "school-ai-cctv",
    title: "학교에서 AI CCTV로 학생의 위험 행동을 미리 감지해도 될까?",
    subtitle: "안전인가, 감시인가",
    description:
      "AI가 학교 CCTV 영상을 분석해 폭력, 사고, 위험 행동을 미리 알려주는 상황입니다.",
    dilemmaNarrative:
      "학교가 복도와 운동장의 사고를 줄이려고 AI CCTV를 도입하려 합니다. 위험을 빨리 발견할 수 있지만, 학생들은 자신의 행동이 계속 분석된다고 느낄 수 있습니다.",
    dilemmaChoiceA: "AI CCTV를 사용해 학교의 안전을 높인다.",
    dilemmaChoiceB: "AI CCTV 사용을 제한해 학생의 사생활과 자유를 지킨다.",
    relatedValues: ["인간존엄성", "사회공공성", "기술합목적성"],
    relatedRequirements: ["사생활 보호", "안전성", "사람의 재확인", "사용 목적 공개"],
    stakeholders: ["학생", "교사", "학부모", "학교 관리자"],
    expectedPositiveConsequences: ["위험 상황을 빨리 발견할 수 있다.", "사고 예방에 도움이 될 수 있다."],
    expectedNegativeConsequences: ["학생이 감시받는다고 느낄 수 있다.", "AI가 행동을 잘못 판단할 수 있다."],
    empathyTargets: ["감시받는 학생", "사고 위험에 놓인 학생", "안전을 책임지는 교사"],
    responsibilityQuestion: "AI CCTV를 쓴다면 사생활 침해와 오판을 줄이기 위해 어떤 조건이 필요할까?",
    blackPrompt:
      "나는 학교 안전을 위해 AI CCTV를 사용할 수 있다고 생각한다 / 사용할 수 없다고 생각한다.",
  },
  {
    id: "ai-learning-data",
    title: "AI 맞춤 학습을 위해 학생의 학습 데이터를 계속 수집해도 될까?",
    subtitle: "맞춤 학습인가, 데이터 침해인가",
    description:
      "AI가 문제 풀이 기록, 집중 시간, 오답 패턴을 분석해 맞춤 학습을 제공하는 상황입니다.",
    dilemmaNarrative:
      "AI가 학생의 오답과 공부 시간을 분석해 알맞은 문제를 추천합니다. 공부에는 도움이 될 수 있지만, 많은 학습 기록이 오래 저장될 수 있습니다.",
    dilemmaChoiceA: "학습 데이터를 모아 개인에게 맞는 공부를 제공한다.",
    dilemmaChoiceB: "데이터 수집을 제한해 학생의 개인정보를 지킨다.",
    relatedValues: ["인간존엄성", "기술합목적성"],
    relatedRequirements: ["최소한의 수집", "저장 기간 제한", "접근 권한", "설명 가능성"],
    stakeholders: ["학생", "교사", "학부모", "학습 서비스 운영자"],
    expectedPositiveConsequences: ["학생에게 필요한 공부를 추천할 수 있다.", "빠른 피드백을 줄 수 있다."],
    expectedNegativeConsequences: ["민감한 학습 기록이 쌓일 수 있다.", "기록으로 학생의 가능성을 좁게 볼 수 있다."],
    empathyTargets: ["학습 기록이 많은 학생", "도움이 필요한 학생", "학생을 지도하는 교사"],
    responsibilityQuestion: "맞춤 학습에 꼭 필요한 정보만 모으려면 어떤 기준이 필요할까?",
    blackPrompt:
      "나는 맞춤 학습을 위해 학습 데이터를 수집해도 된다고 생각한다 / 제한해야 한다고 생각한다.",
  },
  {
    id: "ai-emotion-analysis",
    title: "AI가 학생의 표정과 목소리로 감정을 분석해도 될까?",
    subtitle: "도움인가, 마음의 침범인가",
    description:
      "AI가 표정과 목소리를 분석해 스트레스나 우울감을 예측하는 상황입니다.",
    dilemmaNarrative:
      "AI가 학생의 표정과 목소리에서 힘든 마음을 알아차리려 합니다. 도움을 빨리 줄 수 있지만, 마음을 함부로 판단하거나 오해할 위험도 있습니다.",
    dilemmaChoiceA: "AI 감정 분석을 사용해 도움이 필요한 학생을 빨리 찾는다.",
    dilemmaChoiceB: "감정 분석을 제한해 학생의 마음과 사생활을 지킨다.",
    relatedValues: ["인간존엄성", "사회공공성"],
    relatedRequirements: ["학생의 동의", "결과 비공개", "전문가 재확인", "오판 방지"],
    stakeholders: ["학생", "상담 교사", "학부모", "친구"],
    expectedPositiveConsequences: ["도움을 요청하기 어려운 학생을 발견할 수 있다.", "상담을 일찍 연결할 수 있다."],
    expectedNegativeConsequences: ["학생이 마음을 감시받는다고 느낄 수 있다.", "AI의 오판으로 오해나 낙인이 생길 수 있다."],
    empathyTargets: ["도움을 말하지 못하는 학생", "AI에게 오해받은 학생", "상담을 맡은 교사"],
    responsibilityQuestion: "AI 감정 분석을 쓴다면 학생이 오해받지 않도록 결과를 어떻게 다뤄야 할까?",
    blackPrompt:
      "나는 AI 감정 분석이 학생 보호를 위해 필요하다고 생각한다 / 조심해야 한다고 생각한다.",
  },
  {
    id: "ai-homework-grading",
    title: "AI가 숙제를 자동으로 검사하고 점수를 매겨도 될까?",
    subtitle: "효율적인 평가인가, 불공정한 판단인가",
    description:
      "AI가 글쓰기, 수학 풀이, 과제를 자동 평가하는 상황입니다.",
    dilemmaNarrative:
      "AI가 숙제를 빠르게 검사하고 점수를 줍니다. 학생은 곧바로 피드백을 받을 수 있지만, AI가 노력과 생각 과정을 충분히 보지 못할 수 있습니다.",
    dilemmaChoiceA: "AI 자동 채점으로 빠르게 평가하고 피드백한다.",
    dilemmaChoiceB: "사람이 직접 확인해 학생의 과정과 노력을 공정하게 본다.",
    relatedValues: ["기술합목적성", "인간존엄성"],
    relatedRequirements: ["공정한 평가", "이의 제기", "교사의 재확인", "과제 유형 구분"],
    stakeholders: ["학생", "교사", "학부모", "학교"],
    expectedPositiveConsequences: ["채점 결과를 빨리 받을 수 있다.", "교사가 피드백에 더 많은 시간을 쓸 수 있다."],
    expectedNegativeConsequences: ["학생의 풀이 과정과 노력을 놓칠 수 있다.", "잘못된 점수가 공정성을 해칠 수 있다."],
    empathyTargets: ["AI에게 낮은 점수를 받은 학생", "많은 과제를 채점하는 교사", "빠른 피드백이 필요한 학생"],
    responsibilityQuestion: "AI가 채점할 과제와 교사가 직접 볼 과제를 어떤 기준으로 나누어야 할까?",
    blackPrompt:
      "나는 AI 자동 채점이 편리하고 필요하다고 생각한다 / 사람의 판단이 더 중요하다고 생각한다.",
  },
  {
    id: "ai-public-safety",
    title: "범죄 예방을 위해 AI가 사람들의 이동 정보를 분석해도 될까?",
    subtitle: "공공 안전인가, 개인정보 침해인가",
    description:
      "AI가 공공 안전을 위해 사람들의 이동 패턴을 분석하는 상황입니다.",
    dilemmaNarrative:
      "AI가 범죄와 사고를 예방하려고 시민의 이동 정보를 분석합니다. 위험을 빨리 찾을 수 있지만, 평범한 사람의 생활과 자유까지 계속 추적될 수 있습니다.",
    dilemmaChoiceA: "이동 정보를 분석해 범죄와 사고를 예방한다.",
    dilemmaChoiceB: "이동 정보 분석을 제한해 시민의 사생활과 자유를 지킨다.",
    relatedValues: ["사회공공성", "인간존엄성", "기술합목적성"],
    relatedRequirements: ["목적 제한", "보관 기간", "접근 통제", "시민에게 공개"],
    stakeholders: ["시민", "범죄 피해자", "경찰", "공공기관"],
    expectedPositiveConsequences: ["위험 지역과 상황을 빨리 발견할 수 있다.", "범죄나 사고 예방에 도움을 줄 수 있다."],
    expectedNegativeConsequences: ["시민의 일상이 계속 추적될 수 있다.", "특정 사람이나 지역을 부당하게 의심할 수 있다."],
    empathyTargets: ["안전을 걱정하는 시민", "추적받는 시민", "범죄 피해를 입을 수 있는 사람"],
    responsibilityQuestion: "공공 안전을 위해 이동 정보를 쓴다면 범위와 기간을 어떻게 제한해야 할까?",
    blackPrompt:
      "나는 공공 안전을 위해 이동 정보 분석이 필요하다고 생각한다 / 개인정보 보호가 더 중요하다고 생각한다.",
  },
  {
    id: "ai-creative-work",
    title: "AI가 만든 그림이나 글을 학생의 작품으로 인정해도 될까?",
    subtitle: "창작 도구인가, 대신 해 주는 기계인가",
    description:
      "학생이 AI로 만든 그림, 글, 발표 자료를 자신의 작품으로 제출하는 상황입니다.",
    dilemmaNarrative:
      "학생이 AI에게 아이디어나 글, 그림의 도움을 받아 작품을 만듭니다. 창작을 시작하기 쉬워지지만, 학생이 직접 한 일과 AI가 대신한 일을 구분하기 어려울 수 있습니다.",
    dilemmaChoiceA: "AI를 창작 도구로 활용한 작품도 학생 작품으로 인정한다.",
    dilemmaChoiceB: "공정한 평가를 위해 AI가 대신 만든 결과의 제출을 제한한다.",
    relatedValues: ["인간존엄성", "기술합목적성", "사회공공성"],
    relatedRequirements: ["AI 사용 공개", "학생의 직접 기여", "공정한 평가", "출처 표시"],
    stakeholders: ["작품을 낸 학생", "다른 학생", "교사", "원래 자료의 창작자"],
    expectedPositiveConsequences: ["아이디어를 얻고 표현을 발전시킬 수 있다.", "창작의 어려움을 줄일 수 있다."],
    expectedNegativeConsequences: ["학생의 실제 노력과 실력을 알기 어려울 수 있다.", "다른 학생과의 평가가 불공정해질 수 있다."],
    empathyTargets: ["직접 작품을 만든 학생", "AI 도움을 받은 학생", "공정하게 평가해야 하는 교사"],
    responsibilityQuestion: "AI를 쓴 작품이라면 학생이 한 부분과 AI가 도운 부분을 어떻게 밝혀야 할까?",
    blackPrompt:
      "나는 AI를 사용한 작품도 학생의 작품으로 인정할 수 있다고 생각한다 / 인정하기 어렵다고 생각한다.",
  },
];
