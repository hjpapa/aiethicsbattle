import Link from "next/link";
import { ArrowRight, CircleDot, Scale } from "lucide-react";
import { StoneAvatar } from "@/components/StoneAvatar";
import { ValueBadge } from "@/components/ValueBadge";

export default function HomePage() {
  return (
    <main className="app-page home-page">
      <section className="hero-band">
        <div className="hero-copy">
          <span className="app-kicker">
            <CircleDot size={16} />
            AI Ethics Black & White Debate
          </span>
          <h1>AI 윤리 흑백토론</h1>
          <p>
            흑돌과 백돌처럼 서로 다른 윤리 관점을 주고받으며, AI 문제 속 가치 충돌을
            차분하게 정리합니다.
          </p>
          <Link className="primary-button" href="/select-type">
            <span>대국 시작하기</span>
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="hero-board" aria-hidden="true">
          <div className="hero-board__grid" />
          <StoneAvatar tone="black" size="lg" />
          <StoneAvatar tone="white" size="lg" />
          <div className="hero-board__label">
            <Scale size={18} />
            가치의 형세를 읽는 토론
          </div>
        </div>
      </section>

      <section className="value-band" aria-label="핵심 가치">
        <article>
          <ValueBadge value="인간존엄성" />
          <p>권리, 자유, 감정, 사생활을 먼저 살핍니다.</p>
        </article>
        <article>
          <ValueBadge value="사회공공성" />
          <p>공동체의 안전, 질서, 공정성을 따집니다.</p>
        </article>
        <article>
          <ValueBadge value="기술합목적성" />
          <p>기술이 문제 해결에 실제로 알맞은지 묻습니다.</p>
        </article>
      </section>
    </main>
  );
}
