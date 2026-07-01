"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DebateBoard } from "@/components/DebateBoard";
import { JudgementModal } from "@/components/JudgementModal";
import {
  getDebateSetup,
  getStoredMessages,
  patchDebateSetup,
  resetDebate,
  setStoredMessages,
  setStoredReview,
} from "@/lib/client-store";
import {
  MAX_BLACK_MOVES,
  MIN_BLACK_MOVES_FOR_REVIEW,
  countBlackMoves,
  createMessage,
  getEthicsTypeByCode,
  getNextBlackStage,
  getTopicById,
} from "@/lib/debate-engine";
import type { DebateMessage, DebateSetup, JudgementResult, ReviewResult } from "@/types/debate";

export default function DebatePage() {
  const router = useRouter();
  const [setup, setSetup] = useState<DebateSetup>({});
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [replying, setReplying] = useState(false);
  const [status, setStatus] = useState("대국을 준비하고 있습니다.");
  const [judgement, setJudgement] = useState<JudgementResult | null>(null);

  useEffect(() => {
    const currentSetup = getDebateSetup();
    const currentMessages = getStoredMessages();
    setSetup(currentSetup);
    setMessages(currentMessages);

    if (
      currentSetup.userType &&
      currentSetup.botType &&
      currentSetup.studentLevel &&
      currentSetup.topicId &&
      !currentSetup.sessionId
    ) {
      fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSetup),
      })
        .then((response) => response.json())
        .then((data: { sessionId?: string | null; database?: boolean }) => {
          if (data.sessionId) {
            const next = patchDebateSetup({ sessionId: data.sessionId });
            setSetup(next);
            setStatus("Supabase 세션이 연결되었습니다.");
          } else {
            setStatus("로컬 대국으로 시작했습니다. Supabase env가 준비되면 자동 저장됩니다.");
          }
        })
        .catch(() => setStatus("로컬 대국으로 시작했습니다."));
    } else {
      setStatus("흑돌의 착수를 기다리고 있습니다.");
    }
  }, []);

  const readySetup =
    setup.userType && setup.botType && setup.studentLevel && setup.topicId ? setup : null;

  const { userType, botType, topic } = useMemo(() => {
    if (!readySetup?.userType || !readySetup.botType || !readySetup.topicId) {
      return {};
    }

    return {
      userType: getEthicsTypeByCode(readySetup.userType),
      botType: getEthicsTypeByCode(readySetup.botType),
      topic: getTopicById(readySetup.topicId),
    };
  }, [readySetup]);

  const blackMoveCount = countBlackMoves(messages);
  const debateComplete = blackMoveCount >= MAX_BLACK_MOVES;
  const reviewReady = blackMoveCount >= MIN_BLACK_MOVES_FOR_REVIEW;

  async function submitMove() {
    if (
      !readySetup?.studentLevel ||
      !userType ||
      !botType ||
      !topic ||
      !input.trim() ||
      debateComplete
    ) {
      return;
    }

    const currentSetup = getDebateSetup();
    const blackMessage = createMessage("black", input.trim(), getNextBlackStage(messages));
    const nextMessages = [...messages, blackMessage];
    setInput("");
    setBusy(true);
    setReplying(true);
    setStatus("백돌이 응수하고 있습니다.");
    setMessages(nextMessages);
    setStoredMessages(nextMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...readySetup,
          sessionId: currentSetup.sessionId,
          message: blackMessage,
          history: messages,
        }),
      });

      const data = (await response.json()) as {
        message?: DebateMessage;
        acceptedMessage?: DebateMessage;
        countsAsMove?: boolean;
        error?: string;
      };
      if (!response.ok || !data.message) {
        throw new Error(data.error || "백돌 응수 생성에 실패했습니다.");
      }

      const acceptedMessage = data.acceptedMessage ?? blackMessage;
      const finalMessages = [...messages, acceptedMessage, data.message];
      setMessages(finalMessages);
      setStoredMessages(finalMessages);
      if (data.countsAsMove === false) {
        setStatus("대국 방법을 안내했어요. 이번 입력은 착수 횟수에 포함되지 않습니다.");
      } else {
        setStatus(
          blackMoveCount + 1 >= MAX_BLACK_MOVES
            ? "다섯 번의 착수를 마쳤습니다. 이제 복기로 생각을 정리해 보세요."
            : "백돌의 질문을 보고 다음 생각을 보완해 보세요.",
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      setMessages(messages);
      setStoredMessages(messages);
      setInput(blackMessage.content);
      setStatus(message);
    } finally {
      setBusy(false);
      setReplying(false);
    }
  }

  async function requestJudgement() {
    if (!readySetup?.studentLevel || !topic || blackMoveCount < 1) {
      return;
    }

    setBusy(true);
    setReplying(false);
    setStatus("형세를 읽고 있습니다.");

    try {
      const response = await fetch("/api/judgement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: readySetup.topicId,
          studentLevel: readySetup.studentLevel,
          sessionId: getDebateSetup().sessionId,
          history: messages,
        }),
      });

      const data = (await response.json()) as { judgement?: JudgementResult; error?: string };
      if (!response.ok || !data.judgement) {
        throw new Error(data.error || "형세판단 생성에 실패했습니다.");
      }

      setJudgement(data.judgement);
      setStatus("형세판단을 확인했습니다.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      setStatus(message);
    } finally {
      setBusy(false);
    }
  }

  async function requestReview() {
    if (!readySetup?.studentLevel || !reviewReady) {
      return;
    }

    setBusy(true);
    setReplying(false);
    setStatus("복기를 정리하고 있습니다.");

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...readySetup,
          sessionId: getDebateSetup().sessionId,
          history: messages,
        }),
      });

      const data = (await response.json()) as { review?: ReviewResult; error?: string };
      if (!response.ok || !data.review) {
        throw new Error(data.error || "복기 생성에 실패했습니다.");
      }

      setStoredReview(data.review);
      router.push("/review");
    } catch (error) {
      const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      setStatus(message);
    } finally {
      setBusy(false);
    }
  }

  function restart() {
    resetDebate();
    router.push("/");
  }

  if (!readySetup || !userType || !botType || !topic) {
    return (
      <main className="app-page centered-page">
        <section className="notice-panel">
          <h1>대국 준비가 필요합니다</h1>
          <p>흑돌 유형, 수준, 주제를 차례대로 선택하면 토론판이 열립니다.</p>
          <Link className="primary-button" href="/select-type">
            유형 선택으로 이동
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="app-page app-page--wide">
      <DebateBoard
        topic={topic}
        userType={userType}
        botType={botType}
        messages={messages}
        input={input}
        busy={busy}
        replying={replying}
        blackMoveCount={blackMoveCount}
        maxBlackMoves={MAX_BLACK_MOVES}
        reviewReady={reviewReady}
        debateComplete={debateComplete}
        status={status}
        onInput={setInput}
        onSubmit={submitMove}
        onJudge={requestJudgement}
        onReview={requestReview}
        onRestart={restart}
      />
      <JudgementModal judgement={judgement} onClose={() => setJudgement(null)} />
    </main>
  );
}
