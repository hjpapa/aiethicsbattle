"use client";

import { Check } from "lucide-react";
import { StoneAvatar } from "@/components/StoneAvatar";
import { ValueBadge } from "@/components/ValueBadge";
import type { EthicsType } from "@/types/debate";

export function EthicsTypeCard({
  ethicsType,
  selected,
  onSelect,
}: {
  ethicsType: EthicsType;
  selected: boolean;
  onSelect: (code: EthicsType["code"]) => void;
}) {
  return (
    <button
      type="button"
      className={`choice-card ethics-card ${selected ? "choice-card--selected" : ""}`}
      onClick={() => onSelect(ethicsType.code)}
    >
      <span className="choice-card__check" aria-hidden="true">
        {selected ? <Check size={16} /> : null}
      </span>
      <span className="ethics-card__top">
        <StoneAvatar tone="black" size="sm" label={`${ethicsType.stoneName} 흑돌`} />
        <span>
          <span className="choice-card__eyebrow">{ethicsType.code}</span>
          <strong>{ethicsType.name}</strong>
        </span>
      </span>
      <span className="ethics-card__stone-name">{ethicsType.stoneName}</span>
      <span className="choice-card__body">{ethicsType.description}</span>
      <span className="badge-row">
        <ValueBadge value={ethicsType.coreValue} compact />
        <ValueBadge value={ethicsType.secondaryValue} compact />
      </span>
    </button>
  );
}
