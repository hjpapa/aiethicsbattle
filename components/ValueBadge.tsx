import type { EthicsCoreValue } from "@/types/debate";

const valueClass: Record<EthicsCoreValue | "상황판단", string> = {
  인간존엄성: "value-badge--human",
  사회공공성: "value-badge--public",
  기술합목적성: "value-badge--tech",
  균형: "value-badge--balance",
  상황판단: "value-badge--balance",
};

export function ValueBadge({
  value,
  compact = false,
}: {
  value: EthicsCoreValue | "상황판단";
  compact?: boolean;
}) {
  return (
    <span className={`value-badge ${valueClass[value]} ${compact ? "value-badge--compact" : ""}`}>
      {value}
    </span>
  );
}
