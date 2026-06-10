"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LevelSelector } from "@/components/LevelSelector";
import { getDebateSetup, patchDebateSetup } from "@/lib/client-store";
import type { StudentLevel } from "@/types/debate";

export default function SelectLevelPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<StudentLevel>();

  useEffect(() => {
    setSelected(getDebateSetup().studentLevel);
  }, []);

  function continueFlow() {
    if (!selected) {
      return;
    }

    patchDebateSetup({ studentLevel: selected });
    router.push("/topics");
  }

  return (
    <main className="app-page">
      <section className="page-heading">
        <span className="app-kicker">토론 난이도</span>
        <h1>토론 수준 선택하기</h1>
        <p>백돌의 말투와 질문 깊이가 선택한 수준에 맞춰집니다.</p>
      </section>

      <LevelSelector selected={selected} onSelect={setSelected} />

      <nav className="step-footer">
        <button className="primary-button" type="button" onClick={continueFlow} disabled={!selected}>
          <span>주제 고르기</span>
          <ArrowRight size={18} />
        </button>
      </nav>
    </main>
  );
}
