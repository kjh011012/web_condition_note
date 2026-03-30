const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop";

function IconNature() {
  return (
    <svg
      aria-hidden="true"
      className="cn-home-about__pillar-icon-svg"
      fill="none"
      height="28"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 22h20" />
      <path d="M12 2v20" />
      <path d="M12 11c-2.5 0-4.5-2-4.5-4.5S9.5 2 12 2" />
      <path d="M12 11c2.5 0 4.5-2 4.5-4.5S14.5 2 12 2" />
      <path d="M12 22c-3.5 0-6-2.5-6-6s2.5-6 6-6" />
      <path d="M12 22c3.5 0 6-2.5 6-6s-2.5-6-6-6" />
    </svg>
  );
}

function IconAppGrid() {
  return (
    <svg
      aria-hidden="true"
      className="cn-home-about__pillar-icon-svg"
      fill="none"
      height="28"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="20" rx="2" ry="2" width="14" x="5" y="2" />
      <path d="M12 18h.01" />
      <path d="M8 11h.01" />
      <path d="M12 11h.01" />
      <path d="M16 11h.01" />
      <path d="M8 7h.01" />
      <path d="M12 7h.01" />
      <path d="M16 7h.01" />
      <path d="M8 15h.01" />
      <path d="M12 15h.01" />
      <path d="M16 15h.01" />
    </svg>
  );
}

function IconShieldCheck() {
  return (
    <svg
      aria-hidden="true"
      className="cn-home-about__trust-icon"
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/**
 * About Condition Note — 홈 두 번째 섹션 (디자인 스펙)
 */
export default function HomeAboutSection() {
  return (
    <section className="cn-home-about" aria-labelledby="cn-home-about-heading">
      <div className="cn-home-about__inner">
        <div className="cn-home-about__intro-row">
          <div className="cn-home-about__intro-text cn-home-about__reveal">
            <span className="cn-home-about__eyebrow">About Condition Note</span>
            <h2 className="cn-home-about__title" id="cn-home-about-heading">
              그냥 여행이 아니에요.
              <br />
              생활리듬을 되찾는 곳이에요.
            </h2>
            <div className="cn-home-about__rule" aria-hidden="true" />
            <p className="cn-home-about__body">
              컨디션노트는 강원도 전역의 농업기술원 공인 치유마을과 치유농장이 모인 웰니스 플랫폼입니다.
              <br className="cn-home-about__br-md" />
              자연 속에서의 치유 프로그램, 약선식, 숙박을 통해 흐트러진 생활리듬을 회복하고 삶의 질을 높입니다.
              <br className="cn-home-about__br-md" />
              우리의 여정은 방문으로 끝나지 않습니다. 전용 앱을 통해 일상에서도 건강한 리듬 관리가 이어집니다.
            </p>
          </div>

          <div className="cn-home-about__intro-visual cn-home-about__reveal cn-home-about__reveal--d2">
            <div className="cn-home-about__photo-tilt">
              <img
                alt="강원도 치유 공간"
                className="cn-home-about__photo"
                height="400"
                loading="lazy"
                src={ABOUT_IMAGE}
                width="600"
              />
              <div aria-hidden="true" className="cn-home-about__photo-tint" />
            </div>
          </div>
        </div>

        <div className="cn-home-about__pillars">
          <div className="cn-home-about__pillar cn-home-about__pillar--divider cn-home-about__reveal cn-home-about__reveal--d2">
            <div className="cn-home-about__pillar-icon cn-home-about__pillar-icon--sage">
              <IconNature />
            </div>
            <h3 className="cn-home-about__pillar-title">방문하는 동안</h3>
            <p className="cn-home-about__pillar-sub">자연 속 온전한 쉼과 회복</p>
            <div className="cn-home-about__pillar-tags">
              <span>치유체험</span>
              <span aria-hidden="true" className="cn-home-about__dot cn-home-about__dot--terra">
                •
              </span>
              <span>약선식</span>
              <span aria-hidden="true" className="cn-home-about__dot cn-home-about__dot--terra">
                •
              </span>
              <span>숙박</span>
            </div>
          </div>

          <div className="cn-home-about__pillar cn-home-about__reveal cn-home-about__reveal--d3">
            <div className="cn-home-about__pillar-icon cn-home-about__pillar-icon--terra">
              <IconAppGrid />
            </div>
            <h3 className="cn-home-about__pillar-title">일상에서도</h3>
            <p className="cn-home-about__pillar-sub">나만의 템포를 유지하는 습관</p>
            <div className="cn-home-about__pillar-tags">
              <span>생활리듬 관리</span>
              <span aria-hidden="true" className="cn-home-about__dot cn-home-about__dot--sage">
                •
              </span>
              <span>AI 리포트</span>
              <span aria-hidden="true" className="cn-home-about__dot cn-home-about__dot--sage">
                •
              </span>
              <span>추천 활동</span>
            </div>
          </div>
        </div>

        <div className="cn-home-about__trust cn-home-about__reveal cn-home-about__reveal--d4">
          <div className="cn-home-about__trust-inner">
            <IconShieldCheck />
            <span className="cn-home-about__trust-label">
              강원특별자치도 농업기술원 공인 치유 플랫폼
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
