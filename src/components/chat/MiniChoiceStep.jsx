import { useState } from "react";

/**
 * @param {{ onConfirm: (v: { rhythm: 'calm'|'active', companion: 'solo'|'couple'|'family' }) => void }} props
 */
export default function MiniChoiceStep({ onConfirm }) {
  const [rhythm, setRhythm] = useState(null);
  const [companion, setCompanion] = useState(null);
  const ready = rhythm !== null && companion !== null;

  return (
    <div className="cn-mini-choice">
      <p className="cn-mini-choice__q">이번 여정은 어떤 리듬이 좋으세요?</p>
      <div className="cn-mini-choice__row">
        <button
          type="button"
          className={`cn-choice-btn${rhythm === "calm" ? " cn-choice-btn--selected" : ""}`}
          onClick={() => setRhythm("calm")}
        >
          🌿 조용하고 느리게
        </button>
        <button
          type="button"
          className={`cn-choice-btn${rhythm === "active" ? " cn-choice-btn--selected" : ""}`}
          onClick={() => setRhythm("active")}
        >
          🚶 적당히 걷고 움직이고 싶어
        </button>
      </div>
      <p className="cn-mini-choice__q">누구와 함께인가요?</p>
      <div className="cn-mini-choice__row">
        <button
          type="button"
          className={`cn-choice-btn${companion === "solo" ? " cn-choice-btn--selected" : ""}`}
          onClick={() => setCompanion("solo")}
        >
          혼자
        </button>
        <button
          type="button"
          className={`cn-choice-btn${companion === "couple" ? " cn-choice-btn--selected" : ""}`}
          onClick={() => setCompanion("couple")}
        >
          둘이서
        </button>
        <button
          type="button"
          className={`cn-choice-btn${companion === "family" ? " cn-choice-btn--selected" : ""}`}
          onClick={() => setCompanion("family")}
        >
          가족·소그룹
        </button>
      </div>
      <button
        type="button"
        className="cn-mini-choice__confirm"
        disabled={!ready}
        onClick={() => ready && onConfirm({ rhythm, companion })}
      >
        확인하기 →
      </button>
    </div>
  );
}
