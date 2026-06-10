"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { TopicCard } from "@/components/TopicCard";
import { debateTopics } from "@/lib/topics";
import { getDebateSetup, patchDebateSetup, setStoredMessages } from "@/lib/client-store";

export default function TopicsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    setSelected(getDebateSetup().topicId);
  }, []);

  function continueFlow() {
    if (!selected) {
      return;
    }

    patchDebateSetup({ topicId: selected, sessionId: undefined });
    setStoredMessages([]);
    router.push("/debate");
  }

  return (
    <main className="app-page">
      <section className="page-heading">
        <span className="app-kicker">오늘의 대국 주제</span>
        <h1>토론 주제 선택하기</h1>
        <p>흑돌의 첫 착수는 선택한 주제를 기준으로 시작됩니다.</p>
      </section>

      <section className="choice-grid choice-grid--topics">
        {debateTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            selected={selected === topic.id}
            onSelect={setSelected}
          />
        ))}
      </section>

      <nav className="step-footer">
        <button className="primary-button" type="button" onClick={continueFlow} disabled={!selected}>
          <span>이 주제로 대국 시작</span>
          <ArrowRight size={18} />
        </button>
      </nav>
    </main>
  );
}
