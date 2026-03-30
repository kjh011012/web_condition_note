import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/manager-curation.css";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ACCORDION_SECTIONS = [
  {
    key: "food",
    accent: "terra",
    title: "먹거리",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    ),
    items: [
      { title: "○○막국수", sub: "현지인 단골 맛집" },
      { title: "○○한정식", sub: "약선식 코스 요리" },
      { title: "○○카페", sub: "체험 후 쉬어가기" },
    ],
  },
  {
    key: "see",
    accent: "sage",
    title: "볼거리",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    items: [
      { title: "○○폭포", sub: "숨겨진 비경" },
      { title: "○○전망대", sub: "일몰 명소" },
    ],
  },
  {
    key: "fun",
    accent: "forest",
    title: "즐길거리",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    ),
    items: [
      { title: "○○전통시장", sub: "차로 10분" },
      { title: "○○공방", sub: "도자기 체험" },
    ],
  },
  {
    key: "rest",
    accent: "warm",
    title: "쉴거리",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    ),
    items: [
      { title: "○○정자", sub: "별 보기 좋은 곳" },
      { title: "○○온천", sub: "피로 회복" },
    ],
  },
];

const TIMELINE = [
  { time: "10:30", name: "○○막국수", tag: "먹거리", tagVariant: "terra" },
  { time: "13:00", name: "치유농장 도착·체험", tag: "치유체험", tagVariant: "forest" },
  { time: "15:30", name: "○○카페", tag: "먹거리", tagVariant: "terra" },
  { time: "16:30", name: "○○공방 도자기", tag: "즐길거리", tagVariant: "sage" },
  { time: "18:00", name: "○○폭포 산책", tag: "볼거리", tagVariant: "sage" },
  { time: "19:30", name: "○○한정식", tag: "먹거리", tagVariant: "terra" },
  { time: "21:00", name: "○○정자 별 보기", tag: "쉴거리", tagVariant: "rest" },
];

function ChevronDownIcon() {
  return (
    <svg className="mc__accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function dotClassForAccent(accent) {
  const map = {
    terra: "var(--mc-terracotta)",
    sage: "var(--mc-sage)",
    forest: "var(--mc-forest)",
    warm: "var(--mc-warm-beige)",
  };
  return map[accent] || map.forest;
}

/**
 * 매니저 큐레이션 · 자동 일정 데모 (디자인 스펙)
 */
export default function HomeManagerCurationSection() {
  const bodyRefs = useRef([]);
  const [openIndex, setOpenIndex] = useState(0);
  const [cardVisible, setCardVisible] = useState([false, false, false, false]);
  const [autoWrapVisible, setAutoWrapVisible] = useState(false);
  const [autoPulse, setAutoPulse] = useState(false);
  const [stage1Hidden, setStage1Hidden] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [stage2Visible, setStage2Visible] = useState(false);
  const [stage2Opaque, setStage2Opaque] = useState(true);
  const [ttVisible, setTtVisible] = useState(() => Array(TIMELINE.length).fill(false));
  const [endingVisible, setEndingVisible] = useState(false);

  const setBodyRef = (i) => (el) => {
    bodyRefs.current[i] = el;
  };

  const getAccordionMaxHeight = useCallback(
    (i) => {
      if (openIndex !== i) return 0;
      if (i === 0) return 200;
      const el = bodyRefs.current[i];
      return el ? el.scrollHeight : 0;
    },
    [openIndex],
  );

  const onAccordionClick = (i) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  const resetVisualState = useCallback(() => {
    setOpenIndex(0);
    setCardVisible([false, false, false, false]);
    setAutoWrapVisible(false);
    setAutoPulse(false);
    setStage1Hidden(false);
    setLoadingVisible(false);
    setStage2Visible(false);
    setStage2Opaque(true);
    setTtVisible(Array(TIMELINE.length).fill(false));
    setEndingVisible(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function runOneCycle() {
      for (let i = 0; i < ACCORDION_SECTIONS.length; i++) {
        if (cancelled) return;
        setCardVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        await sleep(400);
      }

      await sleep(2000);
      if (cancelled) return;
      setAutoWrapVisible(true);

      await sleep(800);
      if (cancelled) return;
      setAutoPulse(true);

      await sleep(600);
      if (cancelled) return;
      setStage1Hidden(true);

      await sleep(800);
      if (cancelled) return;
      setLoadingVisible(true);

      await sleep(1500);
      if (cancelled) return;
      setLoadingVisible(false);

      await sleep(800);
      if (cancelled) return;
      setStage2Visible(true);
      setStage2Opaque(true);

      for (let i = 0; i < TIMELINE.length; i++) {
        if (cancelled) return;
        setTtVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        await sleep(350);
      }

      await sleep(400);
      if (cancelled) return;
      setEndingVisible(true);

      await sleep(3000);
      if (cancelled) return;
      setStage2Opaque(false);

      await sleep(1000);
      if (cancelled) return;
      resetVisualState();

      await sleep(500);
    }

    async function loop() {
      while (!cancelled) {
        await runOneCycle();
      }
    }

    const t = setTimeout(() => {
      loop();
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [resetVisualState]);

  return (
    <section className="mc" aria-labelledby="mc-section-heading">
      <div className="mc__inner">
        <header className="mc__section-head">
          <p className="mc__eyebrow">Manager Curation</p>
          <h2 className="mc__section-title" id="mc-section-heading">
            예약 기준, 지역 전문가 큐레이션
          </h2>
          <p className="mc__section-lead">
            예약하신 지역을 오래 살아온 전문가가 믿을 만한 먹거리·볼거리·즐길거리·쉴 거리를 골라 하루 일정으로
            큐레이션해 드립니다.
          </p>
        </header>

        <div className="mc__intro">
          <div className="mc__intro-row">
            <div className="mc__avatar" aria-hidden>
              김
            </div>
            <div>
              <div className="mc__intro-meta">
                <span className="mc__intro-title">평창 치유의 숲 · 관리자 김○○</span>
                <span className="mc__intro-badge">이 지역에서 15년</span>
              </div>
              <div className="mc__bubble">
                <p>
                  제가 직접 다녀보고
                  <br />
                  믿을 수 있는 곳만 골랐어요.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mc__stage-wrap">
          <div className={`mc__stage1 ${stage1Hidden ? "mc__stage1--hidden" : ""}`}>
            <div className="mc__cards">
              {ACCORDION_SECTIONS.map((sec, i) => (
                <div
                  key={sec.key}
                  className={`mc__card mc__card--accent-${sec.accent} ${cardVisible[i] ? "mc__card--visible" : ""} mc__accordion ${openIndex === i ? "mc__accordion--open" : ""}`}
                  onClick={() => onAccordionClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onAccordionClick(i);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="mc__card-head">
                    <div className="mc__card-head-left">
                      <span className={`mc__card-icon-wrap mc__card-icon-wrap--${sec.accent}`}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          {sec.icon}
                        </svg>
                      </span>
                      <h3 className="mc__card-title">{sec.title}</h3>
                    </div>
                    <ChevronDownIcon />
                  </div>
                  <div
                    ref={setBodyRef(i)}
                    className="mc__accordion-body"
                    style={{ maxHeight: getAccordionMaxHeight(i) }}
                  >
                    <ul className="mc__accordion-list">
                      {sec.items.map((item) => (
                        <li key={item.title} className="mc__accordion-item">
                          <div
                            className="mc__accordion-dot"
                            style={{ background: dotClassForAccent(sec.accent) }}
                          />
                          <div className="mc__accordion-item-text">
                            <span className="mc__accordion-item-title">{item.title}</span>
                            <span className="mc__accordion-item-sub">{item.sub}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mc__auto-wrap ${autoWrapVisible ? "mc__auto-wrap--visible" : ""}`}>
              <div className={`mc__auto-btn ${autoPulse ? "mc__auto-btn--pulse" : ""}`}>일정을 자동으로 짜드릴까요?</div>
            </div>
          </div>

          <div className={`mc__loading ${loadingVisible ? "mc__loading--visible" : ""}`}>
            <div className="mc__loading-dots" aria-hidden>
              <div className="mc__loading-dot" />
              <div className="mc__loading-dot" />
              <div className="mc__loading-dot" />
            </div>
            <p className="mc__loading-text">일정 구성 중...</p>
          </div>

          <div
            className={`mc__stage2 ${stage2Visible ? "mc__stage2--visible" : ""} ${stage2Visible && !stage2Opaque ? "mc__stage2--fadeout" : ""}`}
          >
            <div className="mc__timeline">
              {TIMELINE.map((row, i) => (
                <div key={`${row.time}-${row.name}`} className={`mc__tt-item ${ttVisible[i] ? "mc__tt-item--visible" : ""}`}>
                  <div className="mc__tt-line" />
                  <div className="mc__tt-time">{row.time}</div>
                  <div className="mc__tt-dot-wrap">
                    <div className="mc__tt-dot" />
                  </div>
                  <div className="mc__tt-body">
                    <div className="mc__tt-row">
                      <span className="mc__tt-name">{row.name}</span>
                      <span className={`mc__tt-tag mc__tt-tag--${row.tagVariant}`}>{row.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className={`mc__ending ${endingVisible ? "mc__ending--visible" : ""}`}>관리자가 직접 짜준 하루예요.</p>
          </div>
        </div>

        <div className="mc__footer">
          <Link className="mc__cta" to="/chat?start=curation">
            내 일정도 완성해보기
          </Link>
          <p className="mc__footnote">예약 후 관리자가 직접 구성해드려요.</p>
        </div>
      </div>
    </section>
  );
}
