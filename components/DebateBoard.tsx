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
            <button className="icon-button" type="button" onClick={onJudge} disabled={busy || messages.length < 2} aria-label="형세판단">
              <Scale size={18} />
            </button>
            <button className="icon-button" type="button" onClick={onReview} disabled={busy || messages.length < 2} aria-label="복기">
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

        <footer className="move-form">
          <textarea
            value={input}
            onChange={(event) => onInput(event.target.value)}
            placeholder="흑돌의 다음 착수를 입력하세요."
            rows={3}
            disabled={busy}
          />
          <button className="primary-button move-form__button" type="button" onClick={onSubmit} disabled={busy || !input.trim()}>
            {busy ? <Loader2 size={18} className="spin" /> : <Send size={18} />}
            <span>착수하기</span>
          </button>
        </footer>
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
