import { ValueBadge } from "@/components/ValueBadge";
import type { ReviewResult } from "@/types/debate";

export function ReviewCard({ review }: { review: ReviewResult }) {
  const items = [
    ["처음 내 생각", review.initialThought],
    ["백돌이 알려준 다른 생각", review.whitePerspective],
    ["서로 부딪힌 생각", review.valueConflict],
    ["내 생각에 추가한 조건", review.addedCondition],
    ["내가 지킬 약속", review.responsiblePromise],
  ];

  return (
    <section className="review-panel">
      <div className="review-panel__growth">
        <ValueBadge value="균형" />
        <div>
          <span>한 문장 성찰</span>
          <p>{review.reflectionSentence}</p>
        </div>
      </div>
      <div className="review-grid">
        {items.map(([label, value]) => (
          <article key={label} className="review-item">
            <span>{label}</span>
            <p>{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
