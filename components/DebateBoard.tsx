"use client";

import { useEffect, useRef } from "react";
import { Loader2, RotateCcw, Save, Scale, Send } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";
import { StoneAvatar } from "@/components/StoneAvatar";
import { ValueBadge } from "@/components/ValueBadge";
import { buildBlackOpeningGuide } from "@/lib/debate-engine";
import type { DebateMessage, DebateTopic, EthicsType } from "@/types/debate";

export function DebateBoard({
  topic,
  userType,
  botType,
  messages,
  input,
  busy,
  replying,
  blackMoveCount,
  maxBlackMoves,
  reviewReady,
  debateComplete,
  status,
  onInput,
  onSubmit,
  onJudge,
  onReview,
  onRestart,
}: {
  topic: DebateTopic;
  userType: EthicsType;
  botType: EthicsType;
  messages: DebateMessage[];
  input: string;
  busy: boolean;
  replying: boolean;
  blackMoveCount: number;
  maxBlackMoves: number;
  reviewReady: boolean;
  debateComplete: boolean;
  status: string;
  onInput: (value: string) => void;
  onSubmit: () => void;
  onJudge: () => void;
  onReview: () => void;
  onRestart: () => void;
}) {
  const chatBoardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBoardRef.current?.scrollTo({
      top: chatBoardRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, replying]);

  return (
    <section className="debate-shell">
      <aside className="player-panel player-panel--black">
        <StoneAvatar tone="black" size="lg" />
        <span>흑돌 학생</span>
        <strong>{userType.stoneName}</strong>
        <ValueBadge value={userType.coreValue} compact />
      </aside>

      <main className="board-panel">
        <header className="board-panel__header">
          <div>
            <span className="choice-card__eyebrow">{topic.subtitle}</span>
            <h1>{topic.title}</h1>
          </div>
          <div className="board-actions">
            <button className="icon-button" type="button" onClick={onJudge} disabled={busy || blackMoveCount < 1} aria-label="형세판단">
              <Scale size={18} />
            </button>
            <button className="icon-button" type="button" onClick={onReview} disabled={busy || !reviewReady} aria-label="복기">
              <Save size={18} />
            </button>
            <button className="icon-button" type="button" onClick={onRestart} aria-label="처음으로">
              <RotateCcw size={18} />
            </button>
          </div>
        </header>

        <div className="chat-board" aria-live="polite" ref={chatBoardRef}>
          {messages.length === 0 ? (
            <div className="empty-board">
              <StoneAvatar tone="black" size="lg" />
              <div className="empty-board__copy">
                <span>흑돌의 첫 관점</span>
                <p>{buildBlackOpeningGuide(userType)}</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {replying ? <ThinkingBubble /> : null}
            </>
          )}
        </div>

        {debateComplete ? (
          <footer className="debate-complete">
            <div>
              <strong>다섯 번의 착수를 모두 마쳤어요.</strong>
              <p>이제 승패 대신 내 생각에 더해진 조건과 약속을 복기해 보세요.</p>
            </div>
            <button className="primary-button" type="button" onClick={onReview} disabled={busy}>
              {busy ? <Loader2 size={18} className="spin" /> : <Save size={18} />}
              <span>복기 만들기</span>
            </button>
          </footer>
        ) : (
          <footer className="move-composer">
            <SentenceStarters moveNumber={blackMoveCount + 1} onSelect={onInput} />
            <div className="move-form">
              <textarea
                value={input}
                onChange={(event) => onInput(event.target.value)}
                placeholder="문장 틀을 눌러 시작하거나, 내 생각을 직접 적어 보세요."
                rows={3}
                disabled={busy}
              />
              <button className="primary-button move-form__button" type="button" onClick={onSubmit} disabled={busy || !input.trim()}>
                {busy ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
                <span>착수하기</span>
              </button>
            </div>
          </footer>
        )}
        <div className="board-progress" aria-label={`흑돌 착수 ${blackMoveCount}/${maxBlackMoves}`}>
          <span>흑돌 착수</span>
          {Array.from({ length: maxBlackMoves }, (_, index) => (
            <i key={index} className={index < blackMoveCount ? "is-complete" : ""} />
          ))}
          <strong>{blackMoveCount}/{maxBlackMoves}</strong>
        </div>
        <p className="board-status">{status}</p>
      </main>

      <aside className="player-panel player-panel--white">
        <StoneAvatar tone="white" size="lg" />
        <span>백돌 AI</span>
        <strong>{botType.stoneName}</strong>
        <ValueBadge value={botType.coreValue} compact />
      </aside>
    </section>
  );
}

const sentenceStarters = {
  1: [
    "나는 __________라고 생각합니다.\n왜냐하면 __________ 때문입니다.",
    "하지만 __________ 문제가 생길 수도 있습니다.",
  ],
  2: [
    "그래서 __________ 조건이 필요하다고 생각합니다.",
    "백돌의 말을 듣고 __________도 생각하게 되었습니다.",
  ],
  3: [
    "이 선택으로 __________한 사람은 __________하게 느낄 것 같습니다.",
    "__________의 입장에서 보면 __________도 중요합니다.",
  ],
  4: [
    "그래서 내 생각에 __________ 조건을 추가하고 싶습니다.",
    "__________인 경우에만 허용하고, __________은/는 사람이 확인해야 합니다.",
  ],
  5: [
    "내 최종 생각은 __________이고, __________ 조건이 꼭 필요합니다.",
    "앞으로 AI를 사용할 때 __________을/를 조심하겠습니다.",
  ],
} as const;

function SentenceStarters({
  moveNumber,
  onSelect,
}: {
  moveNumber: number;
  onSelect: (value: string) => void;
}) {
  const starters = sentenceStarters[moveNumber as keyof typeof sentenceStarters] ?? sentenceStarters[5];

  return (
    <div className="sentence-starters">
      <div className="sentence-starters__heading">
        <strong>{moveNumber === 1 ? "첫 주장 문장 틀" : "생각 보완 문장 틀"}</strong>
        <span>눌러서 시작해 보세요</span>
      </div>
      <div className="sentence-starters__list">
        {starters.map((starter) => (
          <button key={starter} type="button" onClick={() => onSelect(starter)}>
            {starter.replace("\n", " ")}
          </button>
        ))}
      </div>
    </div>
  );
}

function ThinkingBubble() {
  return (
    <article className="chat-message chat-message--white chat-message--thinking">
      <StoneAvatar tone="white" size="sm" />
      <div className="chat-bubble">
        <div className="chat-bubble__meta">백돌 응수</div>
        <p className="thinking-line">
          <span>백돌이 다음 응수를 생각 중입니다</span>
          <span className="thinking-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </p>
      </div>
    </article>
  );
}
