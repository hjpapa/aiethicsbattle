import { StoneAvatar } from "@/components/StoneAvatar";
import type { DebateMessage } from "@/types/debate";

const roleLabel: Record<DebateMessage["role"], string> = {
  black: "흑돌 착수",
  white: "백돌 응수",
  system: "형세판단",
};

export function ChatMessage({ message }: { message: DebateMessage }) {
  if (message.role === "system") {
    return <div className="system-message">{message.content}</div>;
  }

  const tone = message.role === "black" ? "black" : "white";

  return (
    <article className={`chat-message chat-message--${message.role}`}>
      <StoneAvatar tone={tone} size="sm" />
      <div className="chat-bubble">
        <div className="chat-bubble__meta">{roleLabel[message.role]}</div>
        <p>{message.content}</p>
      </div>
    </article>
  );
}
