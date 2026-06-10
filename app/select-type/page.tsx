"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { EthicsTypeCard } from "@/components/EthicsTypeCard";
import { ethicsTypes } from "@/lib/ethics-types";
import { getOppositeEthicsType } from "@/lib/debate-engine";
import { getDebateSetup, patchDebateSetup, resetDebate } from "@/lib/client-store";
import type { EthicsTypeCode } from "@/types/debate";

export default function SelectTypePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<EthicsTypeCode>();

  useEffect(() => {
    const setup = getDebateSetup();
    setSelected(setup.userType);
  }, []);

  function continueFlow() {
    if (!selected) {
      return;
    }

    resetDebate();
    const botType = getOppositeEthicsType(selected);
    patchDebateSetup({ userType: selected, botType: botType.code });
    router.push("/select-level");
  }

  return (
    <main className="app-page">
      <section className="page-heading">
        <span className="app-kicker">흑돌 유형 선택</span>
        <h1>나의 흑돌 유형 선택하기</h1>
        <p>AI 윤리 문제에서 먼저 지키고 싶은 가치를 고릅니다.</p>
      </section>

      <section className="choice-grid choice-grid--types">
        {ethicsTypes.map((ethicsType) => (
          <EthicsTypeCard
            key={ethicsType.code}
            ethicsType={ethicsType}
            selected={selected === ethicsType.code}
            onSelect={setSelected}
          />
        ))}
      </section>

      <nav className="step-footer">
        <button className="primary-button" type="button" onClick={continueFlow} disabled={!selected}>
          <span>이 유형으로 착수하기</span>
          <ArrowRight size={18} />
        </button>
      </nav>
    </main>
  );
}
