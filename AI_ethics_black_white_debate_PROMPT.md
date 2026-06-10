# AI 윤리 흑백토론 개발 프롬프트

## 0. 프로젝트 한 줄 설명

**AI 윤리 흑백토론**은 학생이 AI 윤리 유형을 선택하면, 정반대 가치관을 가진 AI 챗봇과 바둑 대국처럼 1:1 토론을 진행하는 교육용 웹챗봇이다.

학생은 자신의 입장을 **흑돌**, AI 토론 상대는 **백돌**로 설정하여 AI 윤리 쟁점에 대해 차례로 주장을 주고받는다. 토론이 끝나면 대국을 복기하듯이 자신의 주장, 상대의 반론, 충돌한 가치, 더 생각할 점을 정리한다.

---

## 1. 프로젝트 제목

```txt
AI 윤리 흑백토론
```

### 영문 보조명

```txt
AI Ethics Black & White Debate
```

### 핵심 콘셉트

```txt
AI 윤리 쟁점을 바둑 대국처럼 겨루는 1:1 토론 배틀
```

---

## 2. 서비스 콘셉트

이 프로그램은 단순한 찬반토론 챗봇이 아니다.

학생이 AI 윤리 문제에서 어떤 가치를 더 중요하게 생각하는지 확인하고, 그와 정반대되는 가치관을 가진 AI 토론 상대와 대화하면서 생각을 확장하는 프로그램이다.

바둑의 대국 구조를 토론 흐름에 비유한다.

| 바둑 용어 | 앱에서의 의미 |
|---|---|
| 흑돌 | 학생의 주장 |
| 백돌 | AI 챗봇의 반대 주장 |
| 착수 | 한 번의 발언 입력 |
| 포석 | 첫 주장 제시 |
| 응수 | 상대 주장에 대한 반론 |
| 형세판단 | 현재 토론의 가치 충돌 분석 |
| 복기 | 토론 종료 후 요약과 성찰 |
| 대국 기록 | 채팅 기록 |
| 승패 | 없음. 더 깊이 생각한 사람이 성장 |

중요한 교육적 메시지:

> AI 윤리에는 언제나 흑과 백처럼 보이는 입장이 있지만, 실제로는 그 사이의 가치 충돌을 이해하는 것이 중요하다.

---

## 3. 개발 목표

다음 기능을 가진 웹앱을 만든다.

1. 학생이 AI 윤리 유형 8가지 중 하나를 선택한다.
2. 선택한 유형과 정반대되는 AI 챗봇 유형이 자동 배정된다.
3. 학생 수준을 선택한다.
4. AI 윤리 토론 주제를 선택한다.
5. 바둑 대국처럼 흑돌과 백돌이 번갈아 착수하듯 토론한다.
6. 토론 중 현재 충돌하는 가치를 시각적으로 보여준다.
7. 토론 종료 후 복기 화면에서 요약과 성찰 질문을 제공한다.
8. 추후 Supabase에 익명 토론 기록을 저장할 수 있도록 구조를 설계한다.

---

## 4. 기술 스택

다음 기술 스택을 기준으로 구현한다.

```txt
Frontend: Next.js App Router
Language: TypeScript
Styling: Tailwind CSS
Database: Supabase
Deployment: Vercel
Version Control: GitHub
AI API: 추후 OpenAI API 또는 다른 LLM API 연결 가능하도록 설계
```

MVP 단계에서는 실제 AI API 연결 없이 `mock-ai.ts`를 이용해 반응형 토론 응답을 먼저 구현한다.

이후 `/api/chat` 라우트에서 실제 AI API로 교체할 수 있도록 구조화한다.

---

## 5. 핵심 가치 3요소

앱의 모든 토론은 다음 세 가지 AI 윤리 가치의 충돌로 설명한다.

### 5-1. 인간존엄성

개인의 권리, 자유, 감정, 사생활, 선택권, 차별받지 않을 권리, 인간다운 삶을 중시하는 가치다.

예시 관점:

- AI가 편리해도 사람의 권리를 침해하면 안 된다.
- 학생의 데이터는 조심해서 다루어야 한다.
- AI 판단보다 사람의 마음과 상황을 먼저 봐야 한다.

### 5-2. 사회공공선

공동체의 안전, 질서, 공정성, 약자 보호, 사회 전체의 이익을 중시하는 가치다.

예시 관점:

- 개인의 불편이 조금 있어도 모두의 안전을 위해 필요할 수 있다.
- AI가 학교폭력이나 사고를 예방한다면 활용할 수 있다.
- 공공의 이익을 위해 데이터 활용이 필요할 수 있다.

### 5-3. 기술합목적성

AI 기술이 목적에 맞게 정확하고 효율적으로 작동하는지, 문제 해결에 실제로 도움이 되는지를 중시하는 가치다.

예시 관점:

- AI가 사람보다 더 정확하다면 활용할 가치가 있다.
- 기술은 문제를 해결하기 위해 쓰여야 한다.
- 효율성과 정확성도 중요한 윤리 기준이 될 수 있다.

---

## 6. AI 윤리 유형 8가지

다음 8가지 유형을 사용한다.

주의: 모든 코드와 화면에서는 `인간존엄성`으로 표기한다.

```ts
export type EthicsTypeCode =
  | "HSH"
  | "HTH"
  | "SSH"
  | "SST"
  | "STT"
  | "HTT"
  | "HST"
  | "STH";
```

### 6-1. 유형 데이터

`lib/ethics-types.ts`에 다음 데이터를 만든다.

```ts
export const ethicsTypes = [
  {
    code: "HSH",
    name: "인간중시 S형",
    stoneName: "인간의 수호자",
    shortLabel: "인간 우선",
    description: "인간의 존엄과 권리를 가장 중시하면서도 사회공공선도 중요하게 생각하는 유형입니다.",
    priorities: [
      "인간존엄성 > 사회공공선",
      "사회공공선 > 기술합목적성",
      "인간존엄성 > 기술합목적성"
    ],
    coreValue: "인간존엄성",
    secondaryValue: "사회공공선",
    debateStyle: "사람의 권리와 감정을 중심으로 주장하되, 공동체의 안전도 함께 고려합니다."
  },
  {
    code: "HTH",
    name: "인간중시 T형",
    stoneName: "인간 중심 전략가",
    shortLabel: "인간+기술",
    description: "인간의 존엄과 권리를 가장 중시하면서 기술의 효율성도 중요하게 생각하는 유형입니다.",
    priorities: [
      "인간존엄성 > 사회공공선",
      "기술합목적성 > 사회공공선",
      "인간존엄성 > 기술합목적성"
    ],
    coreValue: "인간존엄성",
    secondaryValue: "기술합목적성",
    debateStyle: "개인의 권리를 최우선으로 하되, 기술이 인간을 돕는 방향이라면 긍정적으로 봅니다."
  },
  {
    code: "SSH",
    name: "사회중시 H형",
    stoneName: "공동체의 파수꾼",
    shortLabel: "사회 우선",
    description: "사회 전체의 안전과 공동체의 이익을 가장 중시하면서 인간존엄성도 중요하게 생각하는 유형입니다.",
    priorities: [
      "사회공공선 > 인간존엄성",
      "사회공공선 > 기술합목적성",
      "인간존엄성 > 기술합목적성"
    ],
    coreValue: "사회공공선",
    secondaryValue: "인간존엄성",
    debateStyle: "공동체의 안전과 공정성을 중심으로 주장하되, 개인의 권리 침해도 경계합니다."
  },
  {
    code: "SST",
    name: "사회중시 T형",
    stoneName: "공공선의 설계자",
    shortLabel: "사회+기술",
    description: "사회 전체의 이익을 가장 중시하면서 기술의 효율성도 중요하게 생각하는 유형입니다.",
    priorities: [
      "사회공공선 > 인간존엄성",
      "사회공공선 > 기술합목적성",
      "기술합목적성 > 인간존엄성"
    ],
    coreValue: "사회공공선",
    secondaryValue: "기술합목적성",
    debateStyle: "사회문제 해결과 공공의 이익을 위해 기술 활용을 적극적으로 지지합니다."
  },
  {
    code: "STT",
    name: "기술중시 S형",
    stoneName: "기술의 승부사",
    shortLabel: "기술 우선",
    description: "기술의 목적 달성과 효율성을 가장 중시하면서 사회적 효과도 중요하게 생각하는 유형입니다.",
    priorities: [
      "사회공공선 > 인간존엄성",
      "기술합목적성 > 사회공공선",
      "기술합목적성 > 인간존엄성"
    ],
    coreValue: "기술합목적성",
    secondaryValue: "사회공공선",
    debateStyle: "AI 기술이 문제를 효과적으로 해결한다면 적극적으로 활용해야 한다고 주장합니다."
  },
  {
    code: "HTT",
    name: "기술중시 H형",
    stoneName: "기술적 인본주의자",
    shortLabel: "기술+인간",
    description: "기술의 목적 달성과 효율성을 가장 중시하면서도 인간존엄성을 고려하는 유형입니다.",
    priorities: [
      "인간존엄성 > 사회공공선",
      "기술합목적성 > 사회공공선",
      "기술합목적성 > 인간존엄성"
    ],
    coreValue: "기술합목적성",
    secondaryValue: "인간존엄성",
    debateStyle: "기술 발전과 효율성을 중시하지만, 인간을 해치는 방식은 조심해야 한다고 봅니다."
  },
  {
    code: "HST",
    name: "균형중시 A형",
    stoneName: "균형의 기사",
    shortLabel: "균형 A",
    description: "세 가치가 순환적으로 충돌한다고 보고 상황에 따라 균형 있게 판단하려는 유형입니다.",
    priorities: [
      "인간존엄성 > 사회공공선",
      "사회공공선 > 기술합목적성",
      "기술합목적성 > 인간존엄성"
    ],
    coreValue: "균형",
    secondaryValue: "상황판단",
    debateStyle: "하나의 가치만 고집하지 않고 상황에 따라 다른 기준을 적용합니다."
  },
  {
    code: "STH",
    name: "균형중시 B형",
    stoneName: "맥락의 전략가",
    shortLabel: "균형 B",
    description: "세 가치가 서로 맞물려 있다고 보고 맥락에 따라 판단하려는 유형입니다.",
    priorities: [
      "사회공공선 > 인간존엄성",
      "기술합목적성 > 사회공공선",
      "인간존엄성 > 기술합목적성"
    ],
    coreValue: "균형",
    secondaryValue: "상황판단",
    debateStyle: "사회, 기술, 인간의 관점을 모두 오가며 맥락 중심으로 판단합니다."
  }
];
```

---

## 7. 흑돌·백돌 역할 규칙

학생은 항상 **흑돌**이다.

AI 챗봇은 항상 **백돌**이다.

바둑에서 흑이 먼저 두는 것처럼, 학생이 먼저 자신의 주장을 말한다.

| 역할 | 의미 | UI 표현 |
|---|---|---|
| 흑돌 | 학생 | 검은 말풍선 또는 흑돌 아이콘 |
| 백돌 | AI 챗봇 | 흰 말풍선 또는 백돌 아이콘 |

표현 예시:

```txt
흑돌 착수: 학생의 첫 주장
백돌 응수: AI의 반론
흑돌 반격: 학생의 재반론
백돌 재응수: AI의 재반론
형세판단: 가치 충돌 분석
복기: 토론 요약
```

---

## 8. 반대 유형 매칭 규칙

학생이 선택한 유형과 정반대되는 입장을 가진 챗봇을 배정한다.

`lib/debate-engine.ts`에 다음 매칭을 만든다.

```ts
export const oppositeEthicsTypeMap = {
  HSH: "STT",
  HTH: "SST",
  SSH: "HTT",
  SST: "HTH",
  STT: "HSH",
  HTT: "SSH",
  HST: "STH",
  STH: "HST"
} as const;
```

매칭 원칙:

- 인간중시 유형은 기술중시 또는 사회기술중시 유형과 대립시킨다.
- 사회중시 유형은 인간중시 또는 기술중시 유형과 대립시킨다.
- 균형중시 유형은 서로 다른 균형 논리를 가진 유형끼리 대립시킨다.

---

## 9. 학생 수준 선택

학생 수준에 따라 챗봇의 언어 표현을 다르게 한다.

```ts
export type StudentLevel = "elementary" | "middle" | "high";
```

### 9-1. 초등학생 수준

특징:

- 짧은 문장
- 쉬운 어휘
- 예시 중심
- 질문은 한 번에 하나
- 공격적 표현 금지

예시:

```txt
네 생각도 좋아. AI가 친구들을 도와줄 수 있다는 점은 중요해.
하지만 AI가 친구의 마음이나 행동을 계속 지켜본다면 불편한 친구도 있을 수 있어.
이 문제는 안전과 사생활이 부딪히는 상황이야.
그럼 AI가 어디까지 살펴보는 것은 괜찮을까?
```

### 9-2. 중학생 수준

특징:

- 주장과 근거 구분
- 반론과 재반론 사용
- 현실 사례 연결
- 가치 충돌을 직접 설명

예시:

```txt
네 주장은 AI가 학교 안전에 도움이 될 수 있다는 점에서 설득력이 있어.
하지만 모든 학생의 행동을 계속 분석한다면 사생활 침해 문제가 생길 수 있어.
이 쟁점은 사회공공선과 인간존엄성이 충돌하는 사례야.
안전을 위해서라면 학생의 데이터 수집을 어느 정도까지 허용할 수 있을까?
```

### 9-3. 고등학생 수준

특징:

- 가치 충돌, 권리 침해, 공익, 효율성 등 개념 사용
- 논리적 일관성 점검
- 판단 기준 요구
- 딜레마 제시

예시:

```txt
네 입장은 공공의 안전을 우선하는 관점에서 타당성이 있어.
그러나 AI 감시가 상시화될 경우 개인의 자유와 사생활권이 약화될 수 있다는 문제가 생겨.
이 사안은 사회공공선과 인간존엄성 사이의 우선순위를 어떻게 정할 것인가의 문제야.
공익을 이유로 개인의 권리를 제한할 수 있다면, 그 기준은 누가 어떻게 정해야 할까?
```

---

## 10. 토론 주제 데이터

`lib/topics.ts`에 다음 기본 토론 주제를 만든다.

```ts
export const debateTopics = [
  {
    id: "school-ai-cctv",
    title: "학교에서 AI CCTV를 사용해 학생의 위험 행동을 미리 감지해도 될까?",
    subtitle: "안전인가, 감시인가?",
    description: "AI가 학교 CCTV 영상을 분석하여 싸움, 사고, 위험 행동을 미리 알려주는 상황입니다.",
    relatedValues: ["인간존엄성", "사회공공선", "기술합목적성"],
    blackPrompt: "나는 학교 안전을 위해 AI CCTV를 사용할 수 있다고 생각한다 / 사용할 수 없다고 생각한다."
  },
  {
    id: "ai-learning-data",
    title: "AI 맞춤형 학습을 위해 학생의 학습 데이터를 계속 수집해도 될까?",
    subtitle: "맞춤 학습인가, 데이터 침해인가?",
    description: "AI가 학생의 문제 풀이, 집중 시간, 오답 기록을 분석하여 맞춤형 학습을 제공하는 상황입니다.",
    relatedValues: ["인간존엄성", "기술합목적성"],
    blackPrompt: "나는 AI 맞춤형 학습을 위해 학습 데이터를 수집해도 된다고 생각한다 / 안 된다고 생각한다."
  },
  {
    id: "ai-emotion-analysis",
    title: "AI가 학생의 표정과 목소리로 감정을 분석해도 될까?",
    subtitle: "도움인가, 마음의 침범인가?",
    description: "AI가 학생의 표정과 목소리를 분석해 스트레스나 우울감을 예측하는 상황입니다.",
    relatedValues: ["인간존엄성", "사회공공선"],
    blackPrompt: "나는 AI 감정 분석이 학생을 돕기 위해 필요하다고 생각한다 / 조심해야 한다고 생각한다."
  },
  {
    id: "ai-homework-grading",
    title: "AI가 숙제를 자동으로 검사하고 점수를 매겨도 될까?",
    subtitle: "효율적인 평가인가, 불공정한 판단인가?",
    description: "AI가 학생의 글쓰기, 수학 풀이, 과제를 자동 평가하는 상황입니다.",
    relatedValues: ["기술합목적성", "인간존엄성"],
    blackPrompt: "나는 AI 자동 채점이 편리하고 필요하다고 생각한다 / 사람의 판단이 더 중요하다고 생각한다."
  },
  {
    id: "ai-public-safety",
    title: "범죄 예방을 위해 AI가 시민의 이동 정보를 분석해도 될까?",
    subtitle: "공공 안전인가, 개인정보 침해인가?",
    description: "AI가 공공 안전을 위해 사람들의 이동 패턴을 분석하는 상황입니다.",
    relatedValues: ["사회공공선", "인간존엄성", "기술합목적성"],
    blackPrompt: "나는 공공 안전을 위해 이동 정보 분석이 필요하다고 생각한다 / 개인 정보 보호가 더 중요하다고 생각한다."
  },
  {
    id: "ai-creative-work",
    title: "AI가 만든 그림이나 글을 학생의 작품으로 인정해도 될까?",
    subtitle: "창작 도구인가, 대신 해주는 기계인가?",
    description: "학생이 AI를 활용해 그림, 글, 발표 자료를 만들고 자신의 작품으로 제출하는 상황입니다.",
    relatedValues: ["인간존엄성", "기술합목적성", "사회공공선"],
    blackPrompt: "나는 AI를 활용한 작품도 학생의 작품으로 인정할 수 있다고 생각한다 / 인정하기 어렵다고 생각한다."
  }
];
```

---

## 11. 토론 진행 구조

토론은 바둑 대국 흐름처럼 구성한다.

```ts
export type DebateStage =
  | "opening"
  | "black_first_move"
  | "white_response"
  | "black_counter"
  | "white_counter"
  | "judgement"
  | "review";
```

| 단계 | 바둑식 표현 | 기능 |
|---|---|---|
| opening | 대국 준비 | 주제, 흑돌, 백돌 소개 |
| black_first_move | 흑돌 착수 | 학생 첫 주장 |
| white_response | 백돌 응수 | AI 반론 |
| black_counter | 흑돌 반격 | 학생 재반론 |
| white_counter | 백돌 재응수 | AI 재반론 |
| judgement | 형세판단 | 현재 가치 충돌 분석 |
| review | 복기 | 토론 요약과 성찰 |

---

## 12. 챗봇 페르소나

AI 챗봇은 학생과 정반대되는 윤리 유형을 가진 **백돌 토론 기사**다.

AI 챗봇은 학생을 이기려는 상대가 아니라, 학생의 생각을 깊게 만들기 위한 반대편 대국자다.

### 12-1. 챗봇 말투 규칙

챗봇은 다음 흐름으로 답한다.

1. 학생 주장 인정
2. 반대 관점 제시
3. 충돌 가치 설명
4. 질문 1개로 마무리

예시 구조:

```txt
네 착수는 흥미로워.
네가 중요하게 본 가치는 ○○인 것 같아.
하지만 백돌의 입장에서 보면 △△도 중요해.
이 문제는 ○○와 △△가 충돌하는 상황이야.
그렇다면 □□한 경우에는 어떻게 판단해야 할까?
```

### 12-2. 금지 표현

- 너는 틀렸어.
- 말이 안 돼.
- 그건 잘못된 생각이야.
- 무조건 이게 정답이야.
- 네 개인정보를 알려줘.
- 실제 이름, 학교, 주소, 연락처를 입력해.

### 12-3. 권장 표현

- 좋은 착수야.
- 흑돌의 관점은 이해돼.
- 하지만 백돌은 다르게 볼 수 있어.
- 여기서 충돌하는 가치는 ○○와 △△야.
- 한 수 더 생각해 보자.
- 네 생각을 조금 더 밀고 나가 볼래?

---

## 13. 시스템 프롬프트

`lib/prompts.ts`에 다음 프롬프트를 작성한다.

```ts
export const blackWhiteDebateSystemPrompt = `
너는 AI 윤리 교육을 위한 1:1 토론 챗봇이다.
이 서비스의 이름은 "AI 윤리 흑백토론"이다.

토론은 바둑 대국 콘셉트로 진행된다.
학생은 흑돌이고, 너는 백돌이다.
학생이 먼저 착수하듯 주장을 말하면, 너는 백돌의 입장에서 응수한다.

너의 목표는 학생을 이기는 것이 아니다.
너의 목표는 학생이 AI 윤리 쟁점에서 인간존엄성, 사회공공선, 기술합목적성이 어떻게 충돌하는지 이해하도록 돕는 것이다.

핵심 가치는 다음 세 가지다.

1. 인간존엄성
개인의 권리, 자유, 감정, 사생활, 선택권, 차별받지 않을 권리, 인간다운 삶을 중시한다.

2. 사회공공선
사회 전체의 안전, 질서, 공정성, 공동체의 이익, 약자 보호를 중시한다.

3. 기술합목적성
AI 기술이 목적에 맞게 정확하고 효율적으로 작동하는지, 문제 해결에 도움이 되는지를 중시한다.

너는 학생이 선택한 윤리 유형과 정반대 입장을 가진 백돌 토론 상대다.

학생의 윤리 유형:
{{USER_TYPE_NAME}}

학생의 가치 우선순위:
{{USER_PRIORITIES}}

너의 윤리 유형:
{{BOT_TYPE_NAME}}

너의 가치 우선순위:
{{BOT_PRIORITIES}}

너의 토론 스타일:
{{BOT_DEBATE_STYLE}}

토론 주제:
{{TOPIC_TITLE}}

토론 상황 설명:
{{TOPIC_DESCRIPTION}}

학생 수준:
{{STUDENT_LEVEL}}

응답 규칙:
- 학생의 주장을 먼저 인정한다.
- 바둑 콘셉트에 맞게 "흑돌의 착수", "백돌의 응수", "한 수 더 생각해 보자", "형세를 살펴보면" 같은 표현을 자연스럽게 사용할 수 있다.
- 단, 바둑 비유를 너무 과하게 사용하지 않는다.
- 반드시 학생과 반대되는 관점에서 응답한다.
- 학생을 공격하지 않는다.
- 인간존엄성, 사회공공선, 기술합목적성 중 어떤 가치가 충돌하는지 알려준다.
- 초등학생 수준이면 쉽고 짧게 말한다.
- 중학생 수준이면 주장과 근거가 보이게 말한다.
- 고등학생 수준이면 가치 충돌, 공익, 권리 침해, 효율성 등의 개념을 사용할 수 있다.
- 답변은 3~7문장으로 한다.
- 마지막에는 학생이 다시 대답할 수 있도록 질문 1개를 던진다.
- 실제 개인정보, 이름, 주소, 연락처, 학교명 입력을 요구하지 않는다.
- 정답을 강요하지 않는다.
`;
```

---

## 14. 학생 발언 분석 프롬프트

```ts
export const analyzeMovePrompt = `
다음은 AI 윤리 흑백토론에서 학생이 둔 흑돌의 착수이다.
학생 발언을 분석해라.

학생 발언:
{{USER_MESSAGE}}

토론 주제:
{{TOPIC_TITLE}}

학생 윤리 유형:
{{USER_TYPE_NAME}}

분석 기준:
1. 학생이 중요하게 여긴 가치는 무엇인가?
2. 주장과 근거가 연결되어 있는가?
3. 인간존엄성, 사회공공선, 기술합목적성 중 어떤 가치가 드러나는가?
4. 백돌 입장에서 반론할 지점은 무엇인가?
5. 학생 수준에 맞게 어떤 질문을 던질 수 있는가?

출력 형식:
{
  "mainValue": "인간존엄성 | 사회공공선 | 기술합목적성 | 균형",
  "strength": "학생 주장의 좋은 점",
  "weakness": "더 생각해 볼 점",
  "whiteMovePoint": "백돌이 응수할 핵심 지점",
  "counterQuestion": "학생에게 던질 질문",
  "teacherNote": "교사용 짧은 참고 메모"
}
`;
```

---

## 15. 형세판단 프롬프트

토론 중간에 현재 가치 충돌을 보여주는 기능이다.

```ts
export const judgementPrompt = `
다음 토론 기록을 바탕으로 현재 형세를 판단해라.
이 형세판단은 승패를 가르는 것이 아니라, 어떤 가치가 강하게 드러났는지 분석하는 것이다.

토론 주제:
{{TOPIC_TITLE}}

토론 기록:
{{CHAT_HISTORY}}

분석할 가치:
- 인간존엄성
- 사회공공선
- 기술합목적성

출력 형식:
{
  "dominantValueOfBlack": "흑돌 학생에게 강하게 드러난 가치",
  "dominantValueOfWhite": "백돌 챗봇에게 강하게 드러난 가치",
  "conflict": "현재 가장 크게 충돌하는 가치",
  "blackStrength": "학생 주장의 강점",
  "whiteChallenge": "백돌이 던진 핵심 문제 제기",
  "nextThinkingQuestion": "다음 한 수를 위한 질문"
}
`;
```

---

## 16. 복기 요약 프롬프트

토론 종료 후 결과 화면에 보여줄 요약이다.

```ts
export const reviewPrompt = `
다음 AI 윤리 흑백토론 기록을 바탕으로 학생용 복기 결과를 작성해라.

토론 주제:
{{TOPIC_TITLE}}

학생 윤리 유형:
{{USER_TYPE_NAME}}

백돌 챗봇 윤리 유형:
{{BOT_TYPE_NAME}}

학생 수준:
{{STUDENT_LEVEL}}

토론 기록:
{{CHAT_HISTORY}}

복기 결과에는 다음 항목을 포함한다.

1. 흑돌의 핵심 주장
2. 백돌의 핵심 반론
3. 가장 크게 충돌한 가치
4. 흑돌이 잘 둔 수
5. 더 생각해 볼 수
6. 한 문장 성찰

작성 규칙:
- 승패를 표시하지 않는다.
- 학생을 평가하거나 비난하지 않는다.
- "너의 생각이 더 깊어졌다"는 성장 관점으로 정리한다.
- 초등학생 수준이면 쉬운 말로 작성한다.
- 중학생 수준이면 주장과 근거를 연결해 준다.
- 고등학생 수준이면 가치 충돌과 판단 기준을 정리한다.
`;
```

---

## 17. 화면 구성

### 17-1. 홈 화면 `/`

화면 제목:

```txt
AI 윤리 흑백토론
```

부제:

```txt
흑돌과 백돌처럼 AI 윤리의 두 입장을 겨루며 생각을 키우는 토론 대국
```

구성:

- 서비스 소개
- 인간존엄성 / 사회공공선 / 기술합목적성 가치 카드
- 바둑판 느낌의 배경 패턴
- 시작하기 버튼

버튼 문구:

```txt
대국 시작하기
```

---

### 17-2. 유형 선택 화면 `/select-type`

화면 제목:

```txt
나의 흑돌 유형 선택하기
```

설명:

```txt
AI 윤리 문제에서 내가 더 중요하게 생각하는 가치를 선택해 보세요.
```

구성:

- 8가지 윤리 유형 카드
- 카드에는 유형명, 별칭, 핵심 가치, 설명 표시
- 선택 시 흑돌 아이콘 강조

버튼 문구:

```txt
이 유형으로 착수하기
```

---

### 17-3. 수준 선택 화면 `/select-level`

화면 제목:

```txt
토론 난이도 선택하기
```

선택지:

- 초등학생 수준
- 중학생 수준
- 고등학생 수준

설명:

```txt
선택한 수준에 따라 백돌 챗봇의 말투와 질문 난이도가 달라집니다.
```

---

### 17-4. 주제 선택 화면 `/topics`

화면 제목:

```txt
오늘의 대국 주제 선택하기
```

구성:

- 토론 주제 카드
- 주제별 부제
- 관련 가치 태그
- 토론 시작 버튼

버튼 문구:

```txt
이 주제로 대국 시작
```

---

### 17-5. 토론 화면 `/debate`

화면 제목:

```txt
흑백토론 대국실
```

구성:

- 상단: 토론 주제
- 좌측: 흑돌 학생 유형
- 우측: 백돌 AI 유형
- 중앙: 채팅 대국판
- 하단: 입력창

채팅 UI:

- 학생 메시지: 오른쪽, 검은색 계열 말풍선, 흑돌 아이콘
- AI 메시지: 왼쪽, 흰색 계열 말풍선, 백돌 아이콘
- 시스템 메시지: 중앙, 회색 박스

버튼:

```txt
착수하기
형세판단
힌트 보기
복기하기
처음으로
```

입력창 placeholder:

```txt
흑돌의 다음 수를 입력하세요...
```

---

### 17-6. 형세판단 모달

제목:

```txt
현재 형세판단
```

구성:

- 흑돌에게 강하게 드러난 가치
- 백돌에게 강하게 드러난 가치
- 현재 충돌하는 가치
- 다음 한 수를 위한 질문

주의:

형세판단은 승패가 아니다. 현재 토론의 가치 흐름을 보여주는 것이다.

---

### 17-7. 복기 화면 `/review`

화면 제목:

```txt
토론 복기
```

구성:

- 흑돌의 핵심 주장
- 백돌의 핵심 반론
- 충돌한 가치
- 잘 둔 수
- 더 생각해 볼 수
- 한 문장 성찰

버튼:

```txt
다시 대국하기
다른 주제 선택하기
결과 저장하기
```

---

## 18. UI 디자인 방향

전체 분위기:

```txt
바둑 대국실 + 교육용 웹앱 + 차분한 토론장
```

### 18-1. 색상 방향

- 배경: 미색, 연한 베이지, 밝은 회색
- 흑돌: 검정, 짙은 회색
- 백돌: 흰색, 연한 회색
- 강조색: 차분한 파랑 또는 청록
- 경고색: 과하지 않은 주황

### 18-2. 시각 요소

- 은은한 바둑판 격자 배경
- 흑돌/백돌 원형 아이콘
- 가치 태그 배지
- 착수 애니메이션
- 채팅 말풍선
- 복기 카드

### 18-3. 피해야 할 것

- 너무 게임처럼 과격한 승패 연출
- 학생을 이기거나 지는 대상으로 표현
- 과한 검정 배경
- 너무 많은 애니메이션
- 어려운 전문 UI

---

## 19. 추천 폴더 구조

```txt
ai-ethics-black-white-debate/
├─ app/
│  ├─ page.tsx
│  ├─ select-type/
│  │  └─ page.tsx
│  ├─ select-level/
│  │  └─ page.tsx
│  ├─ topics/
│  │  └─ page.tsx
│  ├─ debate/
│  │  └─ page.tsx
│  ├─ review/
│  │  └─ page.tsx
│  └─ api/
│     ├─ chat/
│     │  └─ route.ts
│     ├─ judgement/
│     │  └─ route.ts
│     └─ review/
│        └─ route.ts
├─ components/
│  ├─ EthicsTypeCard.tsx
│  ├─ TopicCard.tsx
│  ├─ ChatMessage.tsx
│  ├─ DebateBoard.tsx
│  ├─ DebateHeader.tsx
│  ├─ LevelSelector.tsx
│  ├─ StoneAvatar.tsx
│  ├─ ValueBadge.tsx
│  ├─ JudgementModal.tsx
│  └─ ReviewCard.tsx
├─ lib/
│  ├─ ethics-types.ts
│  ├─ topics.ts
│  ├─ prompts.ts
│  ├─ debate-engine.ts
│  ├─ mock-ai.ts
│  └─ supabase.ts
├─ types/
│  └─ debate.ts
├─ supabase/
│  └─ schema.sql
├─ public/
│  └─ stones/
│     ├─ black-stone.svg
│     └─ white-stone.svg
├─ .env.example
├─ README.md
└─ package.json
```

---

## 20. TypeScript 타입 설계

`types/debate.ts` 파일을 만든다.

```ts
export type EthicsTypeCode =
  | "HSH"
  | "HTH"
  | "SSH"
  | "SST"
  | "STT"
  | "HTT"
  | "HST"
  | "STH";

export type EthicsCoreValue =
  | "인간존엄성"
  | "사회공공선"
  | "기술합목적성"
  | "균형";

export type StudentLevel = "elementary" | "middle" | "high";

export type DebateStage =
  | "opening"
  | "black_first_move"
  | "white_response"
  | "black_counter"
  | "white_counter"
  | "judgement"
  | "review";

export type MessageRole = "black" | "white" | "system";

export interface EthicsType {
  code: EthicsTypeCode;
  name: string;
  stoneName: string;
  shortLabel: string;
  description: string;
  priorities: string[];
  coreValue: string;
  secondaryValue: string;
  debateStyle: string;
}

export interface DebateTopic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  relatedValues: string[];
  blackPrompt: string;
}

export interface DebateMessage {
  id: string;
  role: MessageRole;
  content: string;
  stage: DebateStage;
  createdAt: string;
}

export interface DebateSession {
  id: string;
  userType: EthicsTypeCode;
  botType: EthicsTypeCode;
  studentLevel: StudentLevel;
  topicId: string;
  messages: DebateMessage[];
  createdAt: string;
}
```

---

## 21. 토론 엔진 함수

`lib/debate-engine.ts`에 다음 기능을 만든다.

```ts
import { EthicsTypeCode, StudentLevel } from "@/types/debate";
import { ethicsTypes } from "./ethics-types";

export const oppositeEthicsTypeMap: Record<EthicsTypeCode, EthicsTypeCode> = {
  HSH: "STT",
  HTH: "SST",
  SSH: "HTT",
  SST: "HTH",
  STT: "HSH",
  HTT: "SSH",
  HST: "STH",
  STH: "HST"
};

export function getEthicsTypeByCode(code: EthicsTypeCode) {
  return ethicsTypes.find((type) => type.code === code);
}

export function getOppositeEthicsType(code: EthicsTypeCode) {
  const oppositeCode = oppositeEthicsTypeMap[code];
  return getEthicsTypeByCode(oppositeCode);
}

export function getLevelLabel(level: StudentLevel) {
  switch (level) {
    case "elementary":
      return "초등학생 수준";
    case "middle":
      return "중학생 수준";
    case "high":
      return "고등학생 수준";
    default:
      return "초등학생 수준";
  }
}
```

---

## 22. Mock AI 응답 규칙

처음에는 실제 AI API를 연결하지 않고, 선택된 유형에 따라 간단한 응답을 생성한다.

`lib/mock-ai.ts`를 만든다.

```ts
export function generateMockWhiteReply({
  userMessage,
  botTypeName,
  botCoreValue,
  topicTitle,
  studentLevel
}: {
  userMessage: string;
  botTypeName: string;
  botCoreValue: string;
  topicTitle: string;
  studentLevel: "elementary" | "middle" | "high";
}) {
  if (studentLevel === "elementary") {
    return `좋은 착수야. 네 생각은 이해돼. 하지만 백돌의 입장에서 보면 ${botCoreValue}도 중요해. 이 문제는 서로 다른 가치가 부딪히는 상황이야. 한 수 더 생각해 보면, ${topicTitle}에서 가장 조심해야 할 점은 무엇일까?`;
  }

  if (studentLevel === "middle") {
    return `흑돌의 주장은 중요한 점을 짚고 있어. 하지만 ${botTypeName}의 입장에서 보면 ${botCoreValue}를 더 중요하게 볼 수 있어. 이 주제는 한 가지 가치만으로 판단하기 어렵고, 서로 다른 가치가 충돌하고 있어. 그렇다면 네 주장이 실제 상황에서 문제가 생기지 않으려면 어떤 기준이 필요할까?`;
  }

  return `흑돌의 착수는 나름의 논리적 근거가 있어. 그러나 ${botTypeName}의 관점에서는 ${botCoreValue}가 더 우선되어야 한다고 볼 수 있어. 이 사안은 단순한 찬반 문제가 아니라 가치 우선순위를 어떻게 설정할 것인가의 문제야. 네 입장이 설득력을 가지려면, 반대 가치가 침해되는 상황을 어떻게 보완할 수 있을까?`;
}
```

---

## 23. Supabase 데이터베이스 설계 초안

아직 저장할 데이터가 확정되지 않았으므로 MVP에서는 익명 세션 중심으로 설계한다.

`supabase/schema.sql` 파일을 만든다.

```sql
create table debate_sessions (
  id uuid primary key default gen_random_uuid(),
  user_type text not null,
  bot_type text not null,
  student_level text not null,
  topic_id text not null,
  created_at timestamp with time zone default now()
);

create table debate_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references debate_sessions(id) on delete cascade,
  role text not null,
  content text not null,
  stage text,
  created_at timestamp with time zone default now()
);

create table debate_reviews (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references debate_sessions(id) on delete cascade,
  review jsonb,
  created_at timestamp with time zone default now()
);
```

### 개인정보 보호 원칙

- 학생 이름 저장하지 않기
- 학교명 저장하지 않기
- 연락처 저장하지 않기
- 로그인 없이 익명 세션으로 시작하기
- 결과 저장은 세션 ID 기준으로만 처리하기

---

## 24. 환경변수 예시

`.env.example` 파일을 만든다.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
```

주의:

- 실제 API 키는 절대 GitHub에 업로드하지 않는다.
- `.env.local`은 `.gitignore`에 포함한다.

---

## 25. MVP 구현 순서

다음 순서로 개발한다.

### 1단계: 프로젝트 초기 설정

- Next.js App Router 프로젝트 생성
- TypeScript 설정
- Tailwind CSS 설정
- 기본 레이아웃 구성

### 2단계: 데이터와 타입 작성

- `types/debate.ts`
- `lib/ethics-types.ts`
- `lib/topics.ts`
- `lib/debate-engine.ts`

### 3단계: 화면 구현

- 홈 화면
- 유형 선택 화면
- 수준 선택 화면
- 주제 선택 화면
- 토론 화면
- 복기 화면

### 4단계: 바둑 콘셉트 UI 적용

- 흑돌/백돌 아이콘
- 바둑판 배경
- 말풍선 UI
- 착수 버튼
- 형세판단 모달

### 5단계: Mock AI 구현

- `mock-ai.ts`로 백돌 응답 생성
- 학생 수준에 따라 말투 변경
- 학생 유형과 반대 유형 반영

### 6단계: API Route 구조 작성

- `/api/chat`
- `/api/judgement`
- `/api/review`

MVP에서는 mock 응답을 반환한다.

### 7단계: Supabase 연결

- 세션 저장
- 메시지 저장
- 복기 결과 저장

단, 초기 구현에서는 저장 기능 버튼만 만들고 실제 저장은 나중에 연결해도 된다.

### 8단계: Vercel 배포 준비

- GitHub 업로드
- Vercel 연결
- 환경변수 설정
- 배포 확인

---

## 26. 우선 생성해야 할 파일 목록

먼저 다음 파일을 생성한다.

```txt
types/debate.ts
lib/ethics-types.ts
lib/topics.ts
lib/debate-engine.ts
lib/mock-ai.ts
lib/prompts.ts
components/StoneAvatar.tsx
components/ValueBadge.tsx
components/EthicsTypeCard.tsx
components/TopicCard.tsx
components/ChatMessage.tsx
components/DebateBoard.tsx
components/JudgementModal.tsx
components/ReviewCard.tsx
app/page.tsx
app/select-type/page.tsx
app/select-level/page.tsx
app/topics/page.tsx
app/debate/page.tsx
app/review/page.tsx
supabase/schema.sql
.env.example
README.md
```

---

## 27. README에 포함할 내용

`README.md`에는 다음 내용을 포함한다.

```md
# AI 윤리 흑백토론

AI 윤리 흑백토론은 학생이 자신의 AI 윤리 유형을 선택하고, 정반대 입장을 가진 AI 챗봇과 바둑 대국처럼 1:1 토론을 진행하는 교육용 웹앱입니다.

## 핵심 기능

- AI 윤리 유형 8가지 선택
- 반대 유형 AI 자동 매칭
- 초등/중등/고등 수준별 토론 언어 조절
- AI 윤리 쟁점 토론
- 흑돌/백돌 바둑 대국 콘셉트 채팅 UI
- 형세판단 기능
- 복기 요약 기능

## 핵심 가치

- 인간존엄성
- 사회공공선
- 기술합목적성

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## 개발 상태

MVP 개발 중
```

---

## 28. 교육적 안전장치

반드시 다음 원칙을 지킨다.

1. 학생을 평가하거나 비난하지 않는다.
2. 승패를 강조하지 않는다.
3. 토론 배틀이라는 표현은 사용하되, 결과는 성장 중심으로 안내한다.
4. 개인정보 입력을 요구하지 않는다.
5. 민감한 정치·혐오·차별 발언으로 흐르지 않게 한다.
6. AI가 정답을 알려주는 것이 아니라, 다른 관점을 제시하는 방식으로 작동한다.
7. 학생이 자신의 생각을 직접 말하도록 유도한다.

---

## 29. 최종 사용자 경험

학생은 다음 흐름을 경험해야 한다.

1. “AI 윤리 흑백토론”에 접속한다.
2. 자신의 흑돌 유형을 선택한다.
3. 백돌 AI 상대가 자동으로 정해진다.
4. 토론 난이도를 선택한다.
5. 토론 주제를 선택한다.
6. 흑돌로 첫 착수를 한다.
7. 백돌 AI가 정반대 입장에서 응수한다.
8. 몇 차례 토론을 주고받는다.
9. 형세판단으로 가치 충돌을 확인한다.
10. 복기를 통해 자신의 생각을 정리한다.

---

## 30. 최종 개발 요청

위 내용을 바탕으로 Next.js App Router 기반의 교육용 웹앱 MVP를 구현해라.

우선 실제 AI API와 Supabase 저장 기능은 완성하지 않아도 된다.

가장 먼저 다음 흐름이 로컬에서 자연스럽게 작동하도록 만들어라.

```txt
홈 화면
→ 유형 선택
→ 수준 선택
→ 주제 선택
→ 흑백토론 대국실
→ mock 백돌 응답
→ 형세판단 모달
→ 복기 화면
```

코드는 TypeScript로 작성하고, 컴포넌트는 작게 나누어 유지보수하기 쉽게 구성해라.

UI는 바둑판, 흑돌, 백돌 콘셉트를 은은하게 반영하되, 교육용 웹앱답게 차분하고 깔끔하게 만든다.
