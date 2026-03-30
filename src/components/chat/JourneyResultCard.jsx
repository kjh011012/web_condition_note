import { Link } from "react-router-dom";
import { saveCuration, summarizeProfile } from "../../data/conciergeEngine";

/** @param {{ result: object, profile: object, onAfterSave?: () => void }} props */
export default function JourneyResultCard({ result, profile, onAfterSave }) {
  const { title, mainSpot, collectionType, timeline, nearby } = result;

  const handleSave = () => {
    saveCuration({
      profile,
      summary: summarizeProfile(profile),
      rankedSnapshot: true,
      journeyTitle: title,
    });
    onAfterSave?.();
  };

  if (!mainSpot) {
    return (
      <div className="cn-journey-result">
        <p className="cn-msg__text" style={{ margin: 0 }}>
          조건에 맞는 대표 스테이를 찾지 못했어요. 필터를 조금 바꾸거나 &apos;치유마을&apos; 목록에서 직접 골라 보세요.
        </p>
      </div>
    );
  }

  const detailPath = `/${collectionType}/${mainSpot.slug}`;
  const img = mainSpot.heroImage || mainSpot.galleryImage;

  return (
    <div className="cn-journey-result">
      <h3 className="cn-journey-result__title">{title}</h3>
      <div className="cn-journey-main">
        <img className="cn-journey-main__img" src={img} alt="" />
        <div className="cn-journey-main__body">
          <p className="cn-journey-main__loc">
            <span aria-hidden>🌿</span> {mainSpot.region}
          </p>
          <h4 className="cn-journey-main__name">
            <Link to={detailPath}>{mainSpot.title}</Link>
          </h4>
          <p className="cn-journey-main__desc">{mainSpot.description}</p>
          <div className="cn-journey-main__tags">
            {(mainSpot.tags || []).slice(0, 4).map((tag) => (
              <span className="cn-journey-tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="cn-timeline">
        {timeline.map((day) => (
          <div className="cn-timeline__day" key={day.day}>
            <div className="cn-timeline__label">Day {day.day}</div>
            {day.items.map((it, idx) => (
              <div className="cn-timeline__item" key={`${day.day}-${idx}`}>
                <span className="cn-timeline__slot">{it.slot}</span>
                {it.text}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="cn-nearby__title">주변에 어울리는 경험</p>
      <div className="cn-nearby-scroll">
        {nearby.map((n) => (
          <article className="cn-nearby-card" key={n.id}>
            <img className="cn-nearby-card__img" src={n.image} alt="" />
            <div className="cn-nearby-card__body">
              <p className="cn-nearby-card__cat">{n.category}</p>
              <h5 className="cn-nearby-card__name">{n.name}</h5>
              <p className="cn-nearby-card__blurb">{n.blurb}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="cn-journey-cta">
        <button type="button" className="cn-journey-cta__primary" onClick={handleSave}>
          이 여정 저장하기
        </button>
        <Link className="cn-journey-cta__secondary" to={detailPath}>
          예약 문의
        </Link>
      </div>
    </div>
  );
}
