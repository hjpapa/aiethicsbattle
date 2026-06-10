"use client";

import { Scale, X } from "lucide-react";
import type { JudgementResult } from "@/types/debate";

export function JudgementModal({
  judgement,
  onClose,
}: {
  judgement: JudgementResult | null;
  onClose: () => void;
}) {
  if (!judgement) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="judgement-title">
      <section className="modal-panel">
        <header className="modal-panel__header">
          <span className="modal-title">
            <Scale size={18} />
            <span id="judgement-title">현재 형세판단</span>
          </span>
          <button className="icon-button" type="button" onClick={onClose} aria-label="닫기">
            <X size={18} />
          </button>
        </header>
        <div className="judgement-grid">
          <JudgementItem label="흑돌의 강한 가치" value={judgement.dominantValueOfBlack} />
          <JudgementItem label="백돌의 강한 가치" value={judgement.dominantValueOfWhite} />
          <JudgementItem label="충돌 지점" value={judgement.conflict} />
          <JudgementItem label="흑돌의 강점" value={judgement.blackStrength} />
          <JudgementItem label="백돌의 문제 제기" value={judgement.whiteChallenge} />
          <JudgementItem label="다음 질문" value={judgement.nextThinkingQuestion} />
        </div>
      </section>
    </div>
  );
}

function JudgementItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="judgement-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
