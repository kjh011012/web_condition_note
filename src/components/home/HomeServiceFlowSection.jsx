function IconSparkle() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="32"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="32"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconLeaf() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="32"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="32"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="20" rx="2" ry="2" width="14" x="5" y="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="32"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

const STEPS = [
  {
    delayClass: "cn-service-flow__fade--d100",
    stepLabel: "Step 01",
    title: "웹 큐레이션",
    body: (
      <>
        이미지 선택으로 나의 심리 상태 파악 후
        <br className="cn-service-flow__br-md" />
        맞는 치유마을·농장 추천
      </>
    ),
    Icon: IconSparkle,
  },
  {
    delayClass: "cn-service-flow__fade--d200",
    stepLabel: "Step 02",
    title: "치유마을·농장 방문",
    body: <>치유체험·약선식·숙박</>,
    Icon: IconHome,
  },
  {
    delayClass: "cn-service-flow__fade--d300",
    stepLabel: "Step 03",
    title: "현장 체험",
    body: (
      <>
        스트레스 측정기·
        <br />
        치유 프로그램 참여
      </>
    ),
    Icon: IconLeaf,
  },
  {
    delayClass: "cn-service-flow__fade--d400",
    stepLabel: "Step 04",
    title: "앱 데이터 기록",
    body: (
      <>
        수면·스트레스·활동
        <br />
        데이터 자동 저장
      </>
    ),
    Icon: IconPhone,
  },
  {
    delayClass: "cn-service-flow__fade--d500",
    stepLabel: "Step 05",
    title: "귀가 후 지속 관리",
    body: (
      <>
        AI 리포트·오늘의 추천·
        <br />
        생활리듬 관리
      </>
    ),
    Icon: IconSun,
  },
];

/**
 * Service Flow — 홈 3번째 섹션 (디자인 스펙)
 */
export default function HomeServiceFlowSection() {
  return (
    <section
      className="cn-service-flow"
      aria-labelledby="cn-service-flow-heading"
      id="journey"
    >
      <div className="cn-service-flow__shell">
        <div className="cn-service-flow__header cn-service-flow__fade">
          <p className="cn-service-flow__eyebrow">Service Flow</p>
          <h2 className="cn-service-flow__title" id="cn-service-flow-heading">
            <span className="cn-service-flow__title-part">큐레이션으로 찾고</span>
            <span aria-hidden="true" className="cn-service-flow__arrow cn-service-flow__arrow--inline">
              →
            </span>
            <span aria-hidden="true" className="cn-service-flow__arrow cn-service-flow__arrow--stack">
              →
            </span>
            <span className="cn-service-flow__title-part">방문해서 회복하고</span>
            <span aria-hidden="true" className="cn-service-flow__arrow cn-service-flow__arrow--inline">
              →
            </span>
            <span aria-hidden="true" className="cn-service-flow__arrow cn-service-flow__arrow--stack">
              →
            </span>
            <span className="cn-service-flow__title-part">앱으로 계속 관리해요</span>
          </h2>
          <div className="cn-service-flow__rule" aria-hidden="true" />
        </div>

        <div className="cn-service-flow__track-wrap">
          <div aria-hidden="true" className="cn-service-flow__dash cn-service-flow__dash--h" />
          <div aria-hidden="true" className="cn-service-flow__dash cn-service-flow__dash--v" />

          <div className="cn-service-flow__grid">
            {STEPS.map(({ Icon, body, delayClass, stepLabel, title }) => (
              <div className={`cn-service-flow__step cn-service-flow__fade ${delayClass}`} key={stepLabel}>
                <div className="cn-service-flow__icon-ring">
                  <Icon />
                </div>
                <span className="cn-service-flow__step-label">{stepLabel}</span>
                <h3 className="cn-service-flow__step-title">{title}</h3>
                <p className="cn-service-flow__step-desc">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
