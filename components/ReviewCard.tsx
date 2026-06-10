import { ValueBadge } from "@/components/ValueBadge";
import type { ReviewResult } from "@/types/debate";

export function ReviewCard({ review }: { review: ReviewResult }) {
  const items = [
    ["흑돌의 핵심 주장", review.blackMainClaim],
    ["백돌의 핵심 반론", review.whiteMainCounter],
    ["가장 큰 가치 충돌", review.strongestConflict],
    ["흑돌의 강점", review.blackStrength],
    ["더 생각해 볼 관점", review.nextPerspective],
  ];

  return (
    <section className="review-panel">
      <div className="review-panel__growth">
        <ValueBadge value="균형" />
        <p>{review.growthSentence}</p>
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
