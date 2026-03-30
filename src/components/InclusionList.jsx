/**
 * 포함/불포함 목록 — 상세·결제에서 재사용
 */
export default function InclusionList({ title, items, variant = "yes" }) {
  const icon = variant === "yes" ? "✓" : "×";
  return (
    <div className={`cn-inclusion-list cn-inclusion-list--${variant}`}>
      {title ? <h3 className="cn-inclusion-list__title">{title}</h3> : null}
      <ul>
        {items.map((line) => (
          <li key={line}>
            <span className="cn-inclusion-list__icon" aria-hidden="true">
              {icon}
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
