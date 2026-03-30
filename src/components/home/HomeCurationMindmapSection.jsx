import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/condition-note-immersive.css";

const PATH_IDS = ["l1l", "l1r", "l21", "l22", "l23", "l31", "l32", "l33"];

/** 한 사이클 끝난 뒤 다음 재생까지 대기 (ms) */
const LOOP_GAP_MS = 1800;

const IMG_BG = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000";
const IMG_L = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400";
const IMG_C = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400";
const IMG_R = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400";
const IMG_RESULT = "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80&w=300";

function initialAnimState() {
  return {
    cardsVisible: [false, false, false],
    card2Focus: false,
    sideCardsDim: false,
    introHidden: false,
    introLight: false,
    bgOn: false,
    initialHide: false,
    centerOn: false,
    l1Draw: false,
    l1Nodes: false,
    l1Sel: false,
    l2Draw: false,
    l2Nodes: [false, false, false],
    l2Sel: false,
    l3Draw: false,
    l3Nodes: [false, false, false],
    footerLinkOn: false,
  };
}

function IconArrowRight() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
}

/**
 * 큐레이션 이머시브 애니메이션 (Condition Note 디자인 스펙)
 */
export default function HomeCurationMindmapSection() {
  const gradId = useId().replace(/:/g, "");
  const pathRefs = useRef({});
  const [pathLens, setPathLens] = useState({});
  const [s, setS] = useState(initialAnimState);
  const isPlayingRef = useRef(false);
  const timersRef = useRef([]);

  const setPathRef = (id) => (el) => {
    if (el) pathRefs.current[id] = el;
    else delete pathRefs.current[id];
  };

  useLayoutEffect(() => {
    const next = {};
    PATH_IDS.forEach((id) => {
      const el = pathRefs.current[id];
      if (el) next[id] = el.getTotalLength();
    });
    if (Object.keys(next).length) setPathLens((prev) => ({ ...prev, ...next }));
  }, []);

  const pathLen = (id) => pathLens[id] ?? 1000;

  const resetPathsDom = useCallback(() => {
    PATH_IDS.forEach((id) => {
      const el = pathRefs.current[id];
      if (!el) return;
      const len = el.getTotalLength();
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
    });
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const schedule = (fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const playSequence = useCallback(() => {
    if (isPlayingRef.current) return;
    isPlayingRef.current = true;
    clearTimers();
    setS(initialAnimState());

    requestAnimationFrame(() => {
      resetPathsDom();
    });

    /* 카드 순차 등장 */
    schedule(() => setS((p) => ({ ...p, cardsVisible: [true, p.cardsVisible[1], p.cardsVisible[2]] })), 500);
    schedule(() => setS((p) => ({ ...p, cardsVisible: [true, true, p.cardsVisible[2]] })), 800);
    schedule(() => setS((p) => ({ ...p, cardsVisible: [true, true, true] })), 1100);

    /* 중앙 카드 선택 · 인트로 페이드 */
    schedule(() => {
      setS((p) => ({
        ...p,
        card2Focus: true,
        sideCardsDim: true,
        introHidden: true,
      }));
      schedule(() => {
        setS((p) => ({
          ...p,
          introHidden: false,
          introLight: true,
        }));
      }, 1000);
    }, 2000);

    /* 배경 · 캔버스 전환 · 센터 노드 · L1 */
    schedule(() => {
      setS((p) => ({
        ...p,
        bgOn: true,
        initialHide: true,
      }));
      schedule(() => {
        setS((p) => ({ ...p, centerOn: true }));
      }, 500);
      schedule(() => {
        setS((p) => ({ ...p, l1Draw: true }));
        schedule(() => setS((p) => ({ ...p, l1Nodes: true })), 500);
      }, 1000);
    }, 3500);

    schedule(() => setS((p) => ({ ...p, l1Sel: true })), 5500);

    schedule(() => {
      setS((p) => ({ ...p, l2Draw: true }));
      schedule(() => {
        setS((p) => ({ ...p, l2Nodes: [true, p.l2Nodes[1], p.l2Nodes[2]] }));
      }, 500);
      schedule(() => setS((p) => ({ ...p, l2Nodes: [true, true, p.l2Nodes[2]] })), 800);
      schedule(() => setS((p) => ({ ...p, l2Nodes: [true, true, true] })), 1100);
    }, 6500);

    schedule(() => setS((p) => ({ ...p, l2Sel: true })), 8500);

    schedule(() => {
      setS((p) => ({ ...p, l3Draw: true }));
      schedule(() => setS((p) => ({ ...p, l3Nodes: [true, p.l3Nodes[1], p.l3Nodes[2]] })), 400);
      schedule(() => setS((p) => ({ ...p, l3Nodes: [true, true, p.l3Nodes[2]] })), 1000);
      schedule(() => setS((p) => ({ ...p, l3Nodes: [true, true, true] })), 1600);
    }, 9500);

    schedule(() => setS((p) => ({ ...p, footerLinkOn: true })), 12500);

    schedule(() => {
      isPlayingRef.current = false;
      schedule(() => {
        playSequence();
      }, LOOP_GAP_MS);
    }, 14000);
  }, [resetPathsDom]);

  useEffect(() => {
    const t = window.setTimeout(playSequence, 500);
    return () => {
      clearTimeout(t);
      clearTimers();
    };
  }, [playSequence]);

  const pathStyle = (id, drawn) => {
    const L = pathLen(id);
    return {
      strokeDasharray: L,
      strokeDashoffset: drawn ? 0 : L,
    };
  };

  return (
    <section className="cni" aria-label="큐레이션 여정 미리보기">
      <div className={`cni__bg ${s.bgOn ? "cni__bg--visible" : ""}`}>
        <img className="cni__bg-img" src={IMG_BG} alt="" />
        <div className={`cni__bg-overlay ${s.bgOn ? "cni__bg-overlay--dark" : ""}`} />
      </div>

      <div className="cni__section">
        <div
          className={`cni__intro ${s.introHidden ? "cni__intro--hidden" : ""} ${s.introLight ? "cni__intro--light" : ""}`}
        >
          <h2 className="cni__intro-title">지금 당신의 마음은 어떤 색인가요?</h2>
          <p className="cni__intro-lead">끌리는 이미지 하나면, 나머지는 우리가 설계해드려요.</p>
        </div>

        <div className="cni__canvas-wrap">
          <div className="cni__canvas cni__canvas--interactive">
            <svg className="cni__svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                </linearGradient>
              </defs>
              <path
                ref={setPathRef("l1l")}
                data-cni-path="l1l"
                className="cni__path"
                d="M 600 400 L 350 300"
                stroke={`url(#${gradId})`}
                style={pathStyle("l1l", s.l1Draw)}
              />
              <path
                ref={setPathRef("l1r")}
                data-cni-path="l1r"
                className="cni__path"
                d="M 600 400 L 850 300"
                stroke={`url(#${gradId})`}
                style={pathStyle("l1r", s.l1Draw)}
              />
              <path
                ref={setPathRef("l21")}
                data-cni-path="l21"
                className="cni__path"
                d="M 350 300 L 200 450"
                stroke={`url(#${gradId})`}
                style={pathStyle("l21", s.l2Draw)}
              />
              <path
                ref={setPathRef("l22")}
                data-cni-path="l22"
                className="cni__path"
                d="M 350 300 L 350 500"
                stroke={`url(#${gradId})`}
                style={pathStyle("l22", s.l2Draw)}
              />
              <path
                ref={setPathRef("l23")}
                data-cni-path="l23"
                className="cni__path"
                d="M 350 300 L 500 450"
                stroke={`url(#${gradId})`}
                style={pathStyle("l23", s.l2Draw)}
              />
              <path
                ref={setPathRef("l31")}
                data-cni-path="l31"
                className="cni__path"
                d="M 200 450 L 350 650"
                stroke={`url(#${gradId})`}
                style={pathStyle("l31", s.l3Draw)}
              />
              <path
                ref={setPathRef("l32")}
                data-cni-path="l32"
                className="cni__path"
                d="M 200 450 L 600 650"
                stroke={`url(#${gradId})`}
                style={pathStyle("l32", s.l3Draw)}
              />
              <path
                ref={setPathRef("l33")}
                data-cni-path="l33"
                className="cni__path"
                d="M 200 450 L 850 650"
                stroke={`url(#${gradId})`}
                style={pathStyle("l33", s.l3Draw)}
              />
            </svg>

            <div className={`cni__initial-cards ${s.initialHide ? "cni__initial-cards--hide" : ""}`}>
              <div
                className={`cni__card ${s.cardsVisible[0] ? "cni__card--visible" : ""} ${s.sideCardsDim ? "cni__card--dim" : ""}`}
              >
                <img className="cni__card-img" src={IMG_L} alt="안개 숲" />
                <div className="cni__card-shade" />
                <div className="cni__card-cap">안개 숲</div>
              </div>
              <div
                className={`cni__card ${s.cardsVisible[1] ? "cni__card--visible" : ""} ${s.card2Focus ? "cni__card--focus" : ""}`}
              >
                <img className="cni__card-img" src={IMG_C} alt="고요한 계곡" />
                <div className="cni__card-shade" />
                <div className="cni__card-cap">고요한 계곡</div>
              </div>
              <div
                className={`cni__card ${s.cardsVisible[2] ? "cni__card--visible" : ""} ${s.sideCardsDim ? "cni__card--dim" : ""}`}
              >
                <img className="cni__card-img" src={IMG_R} alt="넓은 들판" />
                <div className="cni__card-shade" />
                <div className="cni__card-cap">넓은 들판</div>
              </div>
            </div>

            <div className={`cni__node cni__node-center cni__pos-center ${s.centerOn ? "cni__node--visible" : ""}`}>
              <span className="cni__node-center-badge">고요한 계곡</span>
            </div>

            <div
              className={`cni__node cni__node-l1 cni__pos-l1l ${s.l1Nodes ? "cni__node--visible" : ""} ${s.l1Sel ? "cni__node-l1--selected" : ""}`}
            >
              <span>조용히 쉬고 싶어</span>
            </div>
            <div
              className={`cni__node cni__node-l1 cni__pos-l1r ${s.l1Nodes ? "cni__node--visible" : ""} ${s.l1Sel ? "cni__node-l1--dimmed" : ""}`}
            >
              <span>몸을 움직이고 싶어</span>
            </div>

            <div
              className={`cni__node cni__node-l2 cni__node-l2--w130 cni__pos-l21 ${s.l2Nodes[0] ? "cni__node--visible" : ""} ${s.l2Sel ? "cni__node-l2--selected" : ""}`}
            >
              <span>혼자</span>
            </div>
            <div
              className={`cni__node cni__node-l2 cni__node-l2--w130 cni__pos-l22 ${s.l2Nodes[1] ? "cni__node--visible" : ""} ${s.l2Sel ? "cni__node-l2--dimmed" : ""}`}
            >
              <span>둘이서</span>
            </div>
            <div
              className={`cni__node cni__node-l2 cni__node-l2--w150 cni__pos-l23 ${s.l2Nodes[2] ? "cni__node--visible" : ""} ${s.l2Sel ? "cni__node-l2--dimmed" : ""}`}
            >
              <span>가족·소그룹</span>
            </div>

            <div className={`cni__result cni__result--loc cni__pos-l31 ${s.l3Nodes[0] ? "cni__result--visible" : ""}`}>
              <span className="cni__result-badge">Location</span>
              <div className="cni__result-img-wrap">
                <img className="cni__result-img" src={IMG_RESULT} alt="평창 치유의 숲" />
              </div>
              <div className="cni__result-body">
                <h4 className="cni__result-title">평창 치유의 숲</h4>
              </div>
            </div>

            <div className={`cni__result cni__result--act cni__pos-l32 ${s.l3Nodes[1] ? "cni__result--visible" : ""}`}>
              <span className="cni__result-badge">Activity</span>
              <div className="cni__result-icon-wrap">
                <IconSun />
              </div>
              <h4 className="cni__result-title">숲속명상 · 싱잉볼</h4>
            </div>

            <div className={`cni__result cni__result--plan cni__pos-l33 ${s.l3Nodes[2] ? "cni__result--visible" : ""}`}>
              <span className="cni__result-badge">Plan</span>
              <ul className="cni__result-plan-list">
                <li>
                  <span className="cni__result-plan-day">Day 1</span>
                  <span>
                    도착 및 오리엔테이션, <br />
                    저녁 싱잉볼 명상
                  </span>
                </li>
                <li>
                  <span className="cni__result-plan-day">Day 2</span>
                  <span>
                    오전 숲길 걷기, <br />
                    오후 자유 휴식
                  </span>
                </li>
                <li>
                  <span className="cni__result-plan-day">Day 3</span>
                  <span>마무리 다과회, 귀가</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="cni__footer">
          <Link className={`cni__footer-link ${s.footerLinkOn ? "cni__footer-link--visible" : ""}`} to="/villages">
            나에게 맞는 치유 찾기
            <IconArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
