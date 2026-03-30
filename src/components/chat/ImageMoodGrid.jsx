/**
 * @param {{
 *   images: { id: string, label: string, src: string }[],
 *   selectedId: string | null,
 *   onSelect: (id: string) => void,
 *   stepIndex?: number,
 * }} props
 */
export default function ImageMoodGrid({ images, selectedId, onSelect, stepIndex = 0 }) {
  return (
    <div className="cn-mood-step">
      <div className="cn-mood-step__head">
        <div className="cn-mood-step__dots" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`cn-mood-step__dot${i <= stepIndex ? " cn-mood-step__dot--on" : ""}`} />
          ))}
        </div>
        <p className="cn-mood-step__q">지금 이 순간, 어떤 풍경이 끌리나요?</p>
      </div>
      <div className="cn-mood-grid">
        {images.map((img) => {
          const sel = selectedId === img.id;
          return (
            <button
              key={img.id}
              type="button"
              className={`cn-mood-img${sel ? " cn-mood-img--selected" : ""}`}
              onClick={() => onSelect(img.id)}
            >
              <img src={img.src} alt="" loading="lazy" />
              <span className="cn-mood-img__overlay" />
              <span className="cn-mood-img__label">{img.label}</span>
              {sel ? <span className="cn-mood-img__check">✓</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
