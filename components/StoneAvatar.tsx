import Image from "next/image";

export function StoneAvatar({
  tone,
  label,
  size = "md",
}: {
  tone: "black" | "white";
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span className={`stone-avatar stone-avatar--${tone} stone-avatar--${size}`}>
      <Image
        src={`/stones/${tone}-stone.svg`}
        alt={label || (tone === "black" ? "흑돌" : "백돌")}
        width={size === "lg" ? 64 : size === "sm" ? 32 : 44}
        height={size === "lg" ? 64 : size === "sm" ? 32 : 44}
        priority={size === "lg"}
      />
    </span>
  );
}
