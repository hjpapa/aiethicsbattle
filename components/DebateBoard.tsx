"use client";

import { useEffect, useRef } from "react";
import { Flag, Loader2, RotateCcw, Scale, Send } from "lucide-react";
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
  reviewReady,
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
  reviewReady: boolean;
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

        <footer className="move-composer">
          <div className="move-form">
            <textarea
              value={input}
              onChange={(event) => onInput(event.target.value)}
              placeholder="내 생각과 그 이유를 자유롭게 적어 보세요."
              rows={3}
              disabled={busy}
            />
            <div className="move-form__actions">
              <button className="primary-button move-form__button" type="button" onClick={onSubmit} disabled={busy || !input.trim()}>
                {busy ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
                <span>착수하기</span>
              </button>
              <button className="secondary-button move-form__button" type="button" onClick={onReview} disabled={busy || !reviewReady}>
                {busy ? <Loader2 size={18} className="spin" /> : <Flag size={18} />}
                <span>토론 끝내기</span>
              </button>
            </div>
          </div>
        </footer>
        <div className="board-progress" aria-label={`흑돌 착수 ${blackMoveCount}회`}>
          <span>흑돌 착수</span>
          <strong>{blackMoveCount}회</strong>
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
