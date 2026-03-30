import { Link } from "react-router-dom";
import HomeAboutSection from "../components/home/HomeAboutSection.jsx";
import HomeCurationMindmapSection from "../components/home/HomeCurationMindmapSection.jsx";
import HomeManagerCurationSection from "../components/home/HomeManagerCurationSection.jsx";
import HomeMobileAppSection from "../components/home/HomeMobileAppSection.jsx";
import HomePlayfulCheckSection from "../components/home/HomePlayfulCheckSection.jsx";
import HomeSymbioticSection from "../components/home/HomeSymbioticSection.jsx";
import HomeServiceFlowSection from "../components/home/HomeServiceFlowSection.jsx";
import ImmersiveConditionHero from "../components/home/ImmersiveConditionHero.jsx";
import Reveal from "../components/Reveal";
import { villages } from "../data/siteData";

/* ── 정적 데이터 ─────────────────────────────────────────────── */

const homePickStays = villages
  .slice(0, 6)
  .map((v) => ({ ...v, kind: "villages", kindLabel: "치유마을" }));

/* ── HomePage ─────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="page-home">

      {/* ═══════════════════════════════════════════════════════
          S0: 풀스크린 히어로 (디자인 스펙)
      ═══════════════════════════════════════════════════════ */}
      <ImmersiveConditionHero />

      {/* ═══════════════════════════════════════════════════════
          S1: About Condition Note
      ═══════════════════════════════════════════════════════ */}
      <HomeAboutSection />

      {/* ═══════════════════════════════════════════════════════
          S2: Service Flow
      ═══════════════════════════════════════════════════════ */}
      <HomeServiceFlowSection />

      {/* ═══════════════════════════════════════════════════════
          S3: 큐레이션 마인드맵
      ═══════════════════════════════════════════════════════ */}
      <HomeCurationMindmapSection />

      {/* ═══════════════════════════════════════════════════════
          S3b: 매니저 큐레이션 · 자동 일정
      ═══════════════════════════════════════════════════════ */}
      <HomeManagerCurationSection />

      {/* ═══════════════════════════════════════════════════════
          S4: 추천 스테이 (치유마을)
      ═══════════════════════════════════════════════════════ */}
      <Reveal>
        <section className="home-picks" aria-labelledby="home-picks-heading">
          <div className="shell">
            <header className="home-picks__header">
              <div className="home-picks__header-main">
                <p className="home-picks__eyebrow">Recommended Stays</p>
                <h2 className="home-picks__title" id="home-picks-heading">
                  지금 둘러보기 좋은 치유마을
                </h2>
                <div className="home-picks__rule" aria-hidden="true" />
                <p className="home-picks__lead">
                  유형·기간·포함 정보를 나란히 두어 비교하기 쉽게 모았습니다.
                </p>
              </div>
              <div className="home-picks__links">
                <Link className="btn btn--outline" to="/villages">
                  회복 스테이 전체 →
                </Link>
              </div>
            </header>

            <div className="home-picks__grid">
              {homePickStays.map((s) => (
                <article className="home-pick-card" key={`${s.kind}-${s.slug}`}>
                  <Link
                    aria-hidden="true"
                    className="home-pick-card__img-link"
                    tabIndex={-1}
                    to={`/${s.kind}/${s.slug}`}
                  >
                    <img alt="" loading="lazy" src={s.heroImage} />
                  </Link>
                  <div className="home-pick-card__body">
                    <span className="home-pick-card__type">{s.kindLabel}</span>
                    <h3 className="home-pick-card__name">
                      <Link to={`/${s.kind}/${s.slug}`}>{s.title}</Link>
                    </h3>
                    <p className="home-pick-card__meta">
                      {s.region}
                      {' · '}
                      {s.nights || s.duration}
                    </p>
                    <p className="home-pick-card__desc">
                      {(s.description || "").slice(0, 96)}
                      {(s.description || "").length > 96 ? "…" : ""}
                    </p>
                    <ul className="home-pick-card__tags">
                      {(s.tags || []).slice(0, 3).map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <p className="home-pick-card__measure">
                      측정·앱 연계: 시설·프로그램별 상이 (상세에서 확인)
                    </p>
                    <div className="home-pick-card__footer">
                      <span className="home-pick-card__price">
                        1박 {s.price.toLocaleString("ko-KR")}원~
                      </span>
                      <Link className="home-pick-card__cta" to={`/${s.kind}/${s.slug}`}>
                        프로그램 일정·포함 내용 확인하기 →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ═══════════════════════════════════════════════════════
          S4: 모바일 앱 (컨디션노트 지속 관리)
      ═══════════════════════════════════════════════════════ */}
      <Reveal>
        <HomeMobileAppSection />
      </Reveal>

      {/* ═══════════════════════════════════════════════════════
          S4b: Playful Check (체류 방문자 마음 게임)
      ═══════════════════════════════════════════════════════ */}
      <Reveal>
        <HomePlayfulCheckSection />
      </Reveal>

      {/* ═══════════════════════════════════════════════════════
          S4c: 공생 구조 (마을·플랫폼·정부)
      ═══════════════════════════════════════════════════════ */}
      <Reveal>
        <HomeSymbioticSection />
      </Reveal>

    </div>
  );
}
