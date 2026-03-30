import { Link } from "react-router-dom";
import { collectionLabels } from "../data/siteData";
import { formatCurrency } from "../data/format";
import AdaptiveImage from "./AdaptiveImage";

function ExperienceCard({ item, collectionType, emphasized = false }) {
  const label = collectionLabels[collectionType];

  return (
    <article
      className={
        emphasized
          ? "experience-card experience-card--emphasized"
          : "experience-card"
      }
    >
      <Link
        aria-label={`${item.title} 상세 보기`}
        className="experience-card__media"
        to={`${label.route}/${item.slug}`}
      >
        <AdaptiveImage
          alt={item.title}
          fallbackSrc={item.galleryImage || item.heroImage}
          src={item.heroImage}
        />
      </Link>
      <div className="experience-card__meta">
        <span className="badge badge--primary">{label.badge}</span>
        <span className="badge">{item.region}</span>
        <span className="badge">
          {collectionType === "villages" ? item.nights : item.duration}
        </span>
      </div>
      <div className="chip-row">
        {item.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>
      <div className="experience-card__body">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-copy">{item.description}</p>
      </div>
      <div className="price-row">
        <div className="price-block">
          <div className="price-label">1인 기준</div>
          <div className="price">{formatCurrency(item.price)}</div>
          <div className="body-muted">
            {item.rating} / 후기 {item.reviewCount}개
          </div>
        </div>
        <div className="stack-actions">
          <Link className="button button--plain" to={`${label.route}/${item.slug}`}>
            상세
          </Link>
          <Link
            className="button button--primary"
            to={`/checkout/${collectionType}/${item.slug}`}
          >
            예약
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ExperienceCard;
