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
  | "사회공공성"
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
  coreValue: EthicsCoreValue | "균형";
  secondaryValue: EthicsCoreValue | "상황판단";
  debateStyle: string;
}

export interface DebateTopic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  relatedValues: EthicsCoreValue[];
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
  id?: string;
  userType: EthicsTypeCode;
  botType: EthicsTypeCode;
  studentLevel: StudentLevel;
  topicId: string;
  messages: DebateMessage[];
  createdAt: string;
}

export interface JudgementResult {
  dominantValueOfBlack: string;
  dominantValueOfWhite: string;
  conflict: string;
  blackStrength: string;
  whiteChallenge: string;
  nextThinkingQuestion: string;
}

export interface ReviewResult {
  blackMainClaim: string;
  whiteMainCounter: string;
  strongestConflict: string;
  blackStrength: string;
  nextPerspective: string;
  growthSentence: string;
}

export interface DebateSetup {
  userType?: EthicsTypeCode;
  botType?: EthicsTypeCode;
  studentLevel?: StudentLevel;
  topicId?: string;
  sessionId?: string;
}
