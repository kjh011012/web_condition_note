import "../styles/catalog.css";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { farms, villages } from "../data/siteData";

const STAY_CATALOG_HERO_VIDEO = "/videos/nature-forest.webm";

function enrichItem(item, index) {
  const certMap = ["강원 인증", "치유농업 인증", "지역 추천"];
  return {
    ...item,
    themeColor: ["forest", "sea", "mountain"][index % 3],
    theme: item.tags?.[0] ?? ["번아웃 회복", "수면 회복", "집중 회복"][index % 3],
    certified: certMap[index % certMap.length],
    durationLabel: item.nights ?? item.duration,
  };
}

function StayCard({ item, collectionLabel, linkTo }) {
  const tags = item.tags?.slice(0, 3) ?? [];
  const priceLabel = item.nights ? "1박 기준" : "1인 기준";
  const ctaLabel = item.nights ? "프로그램 일정·포함 내용 확인하기 →" : "프로그램 일정·포함 내용 확인하기 →";

  return (
    <article className="cn3-card cn3-card--stay">
      {linkTo ? (
        <Link className="cn3-card__img-link" to={linkTo} tabIndex={-1} aria-hidden>
          <img alt="" loading="lazy" src={item.heroImage} />
        </Link>
      ) : (
        <div className="cn3-card__img-link">
          <img alt="" loading="lazy" src={item.heroImage} />
        </div>
      )}
      <div className="cn3-card__body">
        <span className="cn3-card__collection-badge">{collectionLabel}</span>
        <h3 className="cn3-card__title">
          {linkTo ? (
            <Link to={linkTo}>{item.title}</Link>
          ) : (
            item.title
          )}
        </h3>
        <p className="cn3-card__meta">
          {item.region}&ensp;·&ensp;{item.durationLabel}
        </p>
        <p className="cn3-card__desc">{item.description}</p>
        {tags.length > 0 && (
          <div className="cn3-card__tag-row">
            {tags.map((tag) => (
              <span className="cn3-card__tag" key={tag}>{tag}</span>
            ))}
          </div>
        )}
        <p className="cn3-card__measure-note">
          측정앱 연계: 시설·프로그램별 상이 (상세에서 확인)
        </p>
        <div className="cn3-card__footer">
          <div className="cn3-card__price">
            <span className="cn3-card__price-from">{priceLabel}</span>
            <strong>{item.price.toLocaleString("ko-KR")}원~</strong>
          </div>
          {linkTo ? (
            <Link className="cn3-card__cta" to={linkTo}>{ctaLabel}</Link>
          ) : (
            <span className="cn3-card__cta">{ctaLabel}</span>
          )}
        </div>
      </div>
    </article>
  );
}

function CatalogPage() {
  const allVillageItems = useMemo(
    () => villages.map((item, idx) => enrichItem(item, idx)),
    [],
  );

  const allFarmItems = useMemo(
    () => farms.map((item, idx) => enrichItem(item, idx)),
    [],
  );

  const heroText = {
    eyebrow: "회복 스테이",
    title: <>당신이 쉬어갈 곳</>,
    sub: "숲 향과 온돌, 약선 식탁이 이어지는 강원의 치유마을에서 하루를 느리게 엽니다.",
  };

  return (
    <div className="cn3-cat">
      <section className="cn3-cat__hero cn3-cat__hero--split">
        <div className="cn3-cat__hero-split">
          <div className="cn3-cat__hero-left">
            <div className="cn3-cat__hero-left-inner">
              <span className="cn3-cat__hero-eyebrow">{heroText.eyebrow}</span>
              <h1 className="cn3-cat__hero-title">{heroText.title}</h1>
              <p className="cn3-cat__hero-sub">{heroText.sub}</p>
              <div className="cn3-stay-hero__ctas">
                <Link className="cn3-cat__concierge-btn" to="/chat?start=curation">
                  AI 채팅 큐레이션
                </Link>
              </div>
            </div>
          </div>
          <div className="cn3-cat__hero-right">
            <video
              aria-hidden
              autoPlay
              className="cn3-cat__hero-video"
              loop
              muted
              playsInline
              poster={allVillageItems[0]?.heroImage}
            >
              <source src={STAY_CATALOG_HERO_VIDEO} type="video/webm" />
            </video>
            <div aria-hidden className="cn3-cat__hero-video-overlay" />
          </div>
        </div>
      </section>

      <section className="cn3-stay-browse shell">
        <div className="cn3-stay-section">
          <div className="cn3-stay-section__head">
            <div className="cn3-stay-section__head-text">
              <h2 className="cn3-stay-section__title">치유마을</h2>
              <span className="cn3-stay-section__sub">숙박형 회복 스테이</span>
            </div>
            <span className="cn3-stay-section__count">{allVillageItems.length}</span>
          </div>
          <div className="cn3-cat__grid-list cn3-cat__grid-list--villages">
            {allVillageItems.slice(0, 3).map((item) => (
              <StayCard
                key={item.slug}
                item={item}
                collectionLabel="치유마을"
                linkTo={`/villages/${item.slug}`}
              />
            ))}
          </div>
        </div>

        <div className="cn3-stay-section cn3-stay-section--farms">
          <div className="cn3-stay-section__head">
            <div className="cn3-stay-section__head-text">
              <h2 className="cn3-stay-section__title">치유농장</h2>
              <span className="cn3-stay-section__sub">당일 체험 프로그램</span>
            </div>
            <span className="cn3-stay-section__count">{allFarmItems.length}</span>
          </div>
          <div className="cn3-cat__grid-list cn3-cat__grid-list--villages">
            {allFarmItems.slice(0, 3).map((item) => (
              <StayCard
                key={item.slug}
                item={item}
                collectionLabel="치유농장"
                linkTo={null}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="cn3-cat__curation-cta shell" aria-labelledby="curation-cta-title">
        <div className="cn3-cat__curation-cta-inner">
          <h2 className="cn3-cat__curation-cta-title" id="curation-cta-title">
            나에게 맞는 여정을 찾고 싶다면?
          </h2>
          <p className="cn3-cat__curation-cta-desc">
            이미지와 짧은 선택만으로도 하루·이틀의 흐름을 짜 드릴게요.
          </p>
          <Link className="cn3-cat__curation-cta-btn" to="/chat?start=curation">
            내 여정 큐레이션 받기
          </Link>
        </div>
      </section>
    </div>
  );
}

export default CatalogPage;
