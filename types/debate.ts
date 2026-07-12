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

export type LearningStage =
  | "dilemma_setting"
  | "situation_perception"
  | "consequence_prediction"
  | "empathy_perception"
  | "position_selection"
  | "opposing_argument"
  | "position_revision"
  | "responsibility_commitment"
  | "review";

export type DebateStage =
  | "opening"
  | "black_first_move"
  | "white_response"
  | "black_counter"
  | "white_counter"
  | "judgement"
  | "review";

export type MessageRole = "black" | "white" | "system";
export type DebateMessageKind = "move" | "guidance";

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
  dilemmaNarrative: string;
  dilemmaChoiceA: string;
  dilemmaChoiceB: string;
  relatedValues: EthicsCoreValue[];
  relatedRequirements: string[];
  stakeholders: string[];
  expectedPositiveConsequences: string[];
  expectedNegativeConsequences: string[];
  empathyTargets: string[];
  responsibilityQuestion: string;
  blackPrompt: string;
}

export interface DebateMessage {
  id: string;
  role: MessageRole;
  content: string;
  stage: DebateStage;
  kind?: DebateMessageKind;
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
  closingMessage: string;
  initialThought: string;
  finalThought: string;
  blackArguments: string[];
  whitePerspective: string;
  valueConflict: string;
  addedCondition: string;
  goodMove: string;
  unresolvedIssue: string;
  responsibleConditions: string[];
  responsiblePromise: string;
  reflectionSentence: string;
  finalMessage: string;
}

export interface DebateSetup {
  userType?: EthicsTypeCode;
  botType?: EthicsTypeCode;
  studentLevel?: StudentLevel;
  topicId?: string;
  sessionId?: string;
}
