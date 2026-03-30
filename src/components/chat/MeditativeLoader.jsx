import { useEffect, useRef } from "react";

/**
 * @param {{ onDone: () => void, minMs?: number }} props
 */
export default function MeditativeLoader({ onDone, minMs = 2500 }) {
  const fired = useRef(false);
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (fired.current) return;
      fired.current = true;
      onDone();
    }, minMs);
    return () => window.clearTimeout(t);
  }, [onDone, minMs]);

  return (
    <div className="cn-meditative-loader">
      <div className="cn-meditative-loader__ripples" aria-hidden>
        <span className="cn-ripple" />
        <span className="cn-ripple" />
        <span className="cn-ripple" />
      </div>
      <p className="cn-meditative-loader__text">
        당신의 쉼을 위한 여정을
        <br />
        조용히 준비하고 있어요.
      </p>
    </div>
  );
}
