import { useState } from "react";
import { Link } from "react-router-dom";
import { archiveData, villages } from "../data/siteData";
import Reveal from "../components/Reveal";

function ArchivePage() {
  const [activeTheme, setActiveTheme] = useState(archiveData.themes[0].label);
  const activeThemeData =
    archiveData.themes.find((theme) => theme.label === activeTheme) ?? archiveData.themes[0];

  return (
    <div className="page-shell page-shell--wide archive-page">
      <section className="archive-pro-hero">
        <div className="archive-pro-hero__media">
          <img src={villages[0].heroImage} alt="" aria-hidden="true" loading="eager" />
          <div className="archive-pro-hero__overlay" />
        </div>
        <div className="archive-pro-hero__content">
          <p className="archive-pro-hero__eyebrow">Wellness Intelligence Report</p>
          <h1 className="archive-pro-hero__title">{archiveData.heroTitle}</h1>
          <p className="archive-pro-hero__subtitle">{archiveData.heroSubtitle}</p>
          <p className="archive-pro-hero__lead">
            체류 전후 변화 데이터와 활동 로그를 기반으로, 나에게 맞는 회복 패턴을
            정리한 전문 리포트입니다.
          </p>
        </div>
      </section>

      <Reveal>
        <section className="archive-pro-kpi">
          {archiveData.stats.map((stat) => (
            <article key={stat.label} className="archive-pro-kpi__card">
              <p className="archive-pro-kpi__label">{stat.label}</p>
              <p className="archive-pro-kpi__value">{stat.value}</p>
            </article>
          ))}
        </section>
      </Reveal>

      <Reveal delay={100}>
        <section className="archive-pro-layout">
          <article className="archive-pro-panel">
            <header className="archive-pro-panel__head">
              <p className="archive-pro-panel__eyebrow">회복 테마 분석</p>
              <h2 className="archive-pro-panel__title">활동 비중과 선호 패턴</h2>
              <p className="archive-pro-panel__desc">
                자주 반복되는 활동일수록 회복 루틴으로 정착될 가능성이 높습니다.
              </p>
            </header>
            <div className="archive-pro-theme-list">
              {archiveData.themes.map((theme) => (
                <button
                  key={theme.label}
                  className={
                    activeTheme === theme.label
                      ? "archive-pro-theme archive-pro-theme--active"
                      : "archive-pro-theme"
                  }
                  onClick={() => setActiveTheme(theme.label)}
                  type="button"
                >
                  <span className="archive-pro-theme__name">{theme.label}</span>
                  <span className="archive-pro-theme__value">{theme.value}%</span>
                  <span className="archive-pro-theme__track">
                    <span
                      className="archive-pro-theme__fill"
                      style={{ width: `${theme.value}%` }}
                    />
                  </span>
                </button>
              ))}
            </div>
            <article className="archive-pro-highlight">
              <p className="archive-pro-highlight__eyebrow">이번 달 핵심 인사이트</p>
              <h3 className="archive-pro-highlight__title">
                {activeThemeData.label} 활동이 가장 큰 회복 기여를 보였어요
              </h3>
              <p className="archive-pro-highlight__copy">
                최근 기록에서 {activeThemeData.label} 비중이 {activeThemeData.value}%로
                가장 높았습니다. 이 흐름을 다음 여정에서도 유지하면 회복 리듬이
                더 안정적으로 이어집니다.
              </p>
            </article>
          </article>

          <article className="archive-pro-panel">
            <header className="archive-pro-panel__head">
              <p className="archive-pro-panel__eyebrow">여정 로그</p>
              <h2 className="archive-pro-panel__title">나의 회복 타임라인</h2>
              <p className="archive-pro-panel__desc">
                시간순으로 쌓인 체류 기록은 다음 목적지 선택의 기준이 됩니다.
              </p>
            </header>
            <div className="archive-pro-timeline">
              {archiveData.timeline.map((entry) => (
                <article key={`${entry.title}-${entry.date}`} className="archive-pro-entry">
                  <div className="archive-pro-entry__dot" />
                  <div className="archive-pro-entry__body">
                    <p className="archive-pro-entry__date">{entry.date}</p>
                    <h3 className="archive-pro-entry__title">{entry.title}</h3>
                    <p className="archive-pro-entry__note">{entry.note}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="archive-pro-insight">
              <p className="archive-pro-insight__label">다음 추천</p>
              <p className="archive-pro-insight__text">
                현재 패턴 기준으로는 숲 치유 + 명상 중심 2박 3일 프로그램이 가장
                적합합니다.
              </p>
            </div>
          </article>
        </section>
      </Reveal>

      <Reveal delay={180}>
        <section className="archive-pro-cta">
          <div className="archive-pro-cta__body">
            <p className="archive-pro-cta__eyebrow">다음 회복 여정 제안</p>
            <h2 className="archive-pro-cta__title">
              이번 기록을 바탕으로,
              <br />
              다음 치유 여정을 설계해보세요
            </h2>
            <p className="archive-pro-cta__copy">
              회복 리포트는 단순한 기록이 아니라 다음 변화를 위한 기준선입니다.
            </p>
            <Link className="archive-pro-cta__button" to="/villages">
              맞춤 치유마을 보러가기
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

export default ArchivePage;
