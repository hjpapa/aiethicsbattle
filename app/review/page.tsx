"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RotateCcw, Rows3 } from "lucide-react";
import { ReviewCard } from "@/components/ReviewCard";
import { getDebateSetup, getStoredReview, setStoredMessages } from "@/lib/client-store";
import { getEthicsTypeByCode, getTopicById } from "@/lib/debate-engine";
import type { DebateSetup, ReviewResult } from "@/types/debate";

export default function ReviewPage() {
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [setup, setSetup] = useState<DebateSetup>({});

  useEffect(() => {
    setReview(getStoredReview());
    setSetup(getDebateSetup());
  }, []);

  const summary = useMemo(() => {
    if (!setup.userType || !setup.botType || !setup.topicId) {
      return null;
    }

    return {
      userType: getEthicsTypeByCode(setup.userType),
      botType: getEthicsTypeByCode(setup.botType),
      topic: getTopicById(setup.topicId),
    };
  }, [setup]);

  function replaySameTopic() {
    setStoredMessages([]);
  }

  if (!review) {
    return (
      <main className="app-page centered-page">
        <section className="notice-panel">
          <h1>아직 복기가 없습니다</h1>
          <p>토론판에서 백돌과 몇 차례 주고받은 뒤 복기를 만들 수 있습니다.</p>
          <Link className="primary-button" href="/debate">
            토론판으로 이동
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="app-page">
      <section className="page-heading">
        <span className="app-kicker">대국 복기</span>
        <h1>오늘의 흑백토론 복기</h1>
        {summary ? (
          <p>
            {summary.topic.title} · 흑돌 {summary.userType.stoneName} vs 백돌{" "}
            {summary.botType.stoneName}
          </p>
        ) : null}
      </section>

      <ReviewCard review={review} />

      <nav className="step-footer step-footer--split">
        <Link className="secondary-button" href="/debate" onClick={replaySameTopic}>
          <RotateCcw size={18} />
          <span>같은 주제로 다시</span>
        </Link>
        <Link className="primary-button" href="/topics">
          <Rows3 size={18} />
          <span>다른 주제 선택</span>
        </Link>
      </nav>
    </main>
  );
}
