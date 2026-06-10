"use client";

import { Check, GraduationCap } from "lucide-react";
import { levelDescriptions, levelLabels } from "@/lib/debate-engine";
import type { StudentLevel } from "@/types/debate";

const levels: StudentLevel[] = ["elementary", "middle", "high"];

export function LevelSelector({
  selected,
  onSelect,
}: {
  selected?: StudentLevel;
  onSelect: (level: StudentLevel) => void;
}) {
  return (
    <div className="level-grid">
      {levels.map((level) => (
        <button
          type="button"
          key={level}
          className={`choice-card level-card ${selected === level ? "choice-card--selected" : ""}`}
          onClick={() => onSelect(level)}
        >
          <span className="level-card__icon" aria-hidden="true">
            <GraduationCap size={20} />
          </span>
          <span className="choice-card__check" aria-hidden="true">
            {selected === level ? <Check size={16} /> : null}
          </span>
          <strong>{levelLabels[level]}</strong>
          <span className="choice-card__body">{levelDescriptions[level]}</span>
        </button>
      ))}
    </div>
  );
}
