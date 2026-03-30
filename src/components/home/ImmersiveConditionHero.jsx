import { Link } from "react-router-dom";

const HERO_BG =
  "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2532&auto=format&fit=crop";

/**
 * 디자인 스펙(풀스크린 풍경 + 그라데이션 + reveal 애니메이션 + 숲색 CTA)과 동일한 메인 히어로
 */
export default function ImmersiveConditionHero() {
  return (
    <section className="cn-im-hero" aria-label="메인 소개">
      <div className="cn-im-hero__media-wrap">
        <div
          className="cn-im-hero__bg cn-im-hero__bg--breathe"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
          role="presentation"
        />
      </div>
      <div className="cn-im-hero__gradient" aria-hidden="true" />

      <div className="cn-im-hero__content">
        <h1 className="cn-im-hero__title cn-im-hero__reveal-up cn-im-hero__reveal-up--delay-1">
          지친 당신에게,
          <br />
          강원도가 기다리고 있어요
        </h1>
        <p className="cn-im-hero__lead cn-im-hero__reveal-up cn-im-hero__reveal-up--delay-2">
          자연이 건네는 고요한 위로 속에서 잊고 있던 당신만의 템포를 되찾는 시간
        </p>
        <div className="cn-im-hero__reveal-up cn-im-hero__reveal-up--delay-3">
          <Link className="cn-im-hero__cta" to="/chat?start=curation">
            <span className="cn-im-hero__cta-shade" aria-hidden="true" />
            <span className="cn-im-hero__cta-label">내 여정 찾기</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
