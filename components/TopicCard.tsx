"use client";

import { ArrowRight } from "lucide-react";
import { ValueBadge } from "@/components/ValueBadge";
import type { DebateTopic } from "@/types/debate";

export function TopicCard({
  topic,
  selected,
  onSelect,
}: {
  topic: DebateTopic;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className={`choice-card topic-card ${selected ? "choice-card--selected" : ""}`}
      onClick={() => onSelect(topic.id)}
    >
      <span className="choice-card__eyebrow">{topic.subtitle}</span>
      <strong>{topic.title}</strong>
      <span className="choice-card__body">{topic.description}</span>
      <span className="badge-row">
        {topic.relatedValues.map((value) => (
          <ValueBadge key={value} value={value} compact />
        ))}
      </span>
      <span className="topic-card__action">
        이 주제로 착수 <ArrowRight size={16} />
      </span>
    </button>
  );
}
