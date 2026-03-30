/**
 * Playful Check — 체류 방문자 전용 마음 게임 섹션 (디자인 스펙)
 */
export default function HomePlayfulCheckSection() {
  return (
    <section className="cn-playful" aria-labelledby="cn-playful-heading">
      <div className="cn-playful__noise" aria-hidden="true" />

      <div className="cn-playful__blobs" aria-hidden="true">
        <div className="cn-playful__blob cn-playful__blob--pink" />
        <div className="cn-playful__blob cn-playful__blob--blue" />
      </div>

      <div className="cn-playful__shell">
        <header className="cn-playful__header">
          <span className="cn-playful__badge cn-playful__badge--hero">체류 방문자 전용</span>
          <h2 className="cn-playful__title" id="cn-playful-heading">
            체류하는 동안, 게임으로 내 마음 상태를 알아봐요
          </h2>
          <p className="cn-playful__subtitle">
            당일 방문이 아닌, 머무는 분들을 위한 깊은 치유 경험이에요.
          </p>
        </header>

        <div className="cn-playful__grid">
          <div className="cn-playful__col cn-playful__col--d100">
            <div className="cn-playful__visual cn-playful__visual--left">
              <div className="cn-playful__visual-blob cn-playful__visual-blob--pink" />
              <div className="cn-playful__visual-blob cn-playful__visual-blob--green" />

              <div className="cn-playful__visual-inner">
                <div className="cn-playful__clock-wrap">
                  <div className="cn-playful__clock-dashed" />
                  <div className="cn-playful__clock-center">
                    <svg
                      aria-hidden="true"
                      fill="none"
                      height="32"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      width="32"
                    >
                      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                      <path d="M12 8v4l3 3" />
                    </svg>
                  </div>
                </div>

                <div className="cn-playful__float-card cn-playful__float-card--doc" aria-hidden="true">
                  <div className="cn-playful__float-doc-top" />
                  <div className="cn-playful__float-doc-line cn-playful__float-doc-line--lg" />
                  <div className="cn-playful__float-doc-line cn-playful__float-doc-line--sm" />
                </div>

                <div className="cn-playful__float-card cn-playful__float-card--cube" aria-hidden="true">
                  <svg
                    fill="none"
                    height="32"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    width="32"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" x2="12" y1="22.08" y2="12" />
                  </svg>
                </div>

                <div className="cn-playful__float-dot cn-playful__float-dot--delay" aria-hidden="true">
                  <span />
                </div>
              </div>
            </div>

            <div className="cn-playful__tags-row">
              <span className="cn-playful__pill cn-playful__pill--red cn-playful__pill--tilt-l">인지체크</span>
              <span className="cn-playful__pill cn-playful__pill--green cn-playful__pill--tilt-r">정서게임</span>
            </div>
            <h3 className="cn-playful__h3">진행자와 함께하는 마음 게임</h3>
            <p className="cn-playful__body">
              치유마을 숙박·체류 방문자에게만 제공되는 특별한 경험입니다. 딱딱한 설문지 대신, 전문
              진행자와 함께 보드게임이나 대화형 놀이를 즐기며 인지·정서 상태를 자연스럽고 편안하게
              체크합니다.
            </p>
          </div>

          <div className="cn-playful__col cn-playful__col--d200">
            <div className="cn-playful__visual cn-playful__visual--right">
              <div className="cn-playful__visual-white-blob" aria-hidden="true" />

              <div className="cn-playful__phone">
                <div className="cn-playful__phone-notch">
                  <div className="cn-playful__phone-notch-inner" />
                </div>
                <div className="cn-playful__phone-body">
                  <div className="cn-playful__phone-head">
                    <p className="cn-playful__phone-eyebrow">DAILY PLAY</p>
                    <h4 className="cn-playful__phone-title">마음 조각 맞추기</h4>
                  </div>

                  <div className="cn-playful__phone-grid">
                    <div className="cn-playful__tile cn-playful__tile--pink">
                      <div className="cn-playful__tile-inner">
                        <svg
                          aria-hidden="true"
                          fill="none"
                          height="28"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          width="28"
                        >
                          <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                          <line x1="9" x2="15" y1="15" y2="15" />
                          <line x1="9" x2="15" y1="9" y2="9" />
                          <polygon fill="currentColor" points="10 8 16 12 10 16 10 8" />
                        </svg>
                      </div>
                    </div>
                    <div className="cn-playful__tile cn-playful__tile--yellow">
                      <div className="cn-playful__tile-inner">
                        <svg
                          aria-hidden="true"
                          fill="none"
                          height="28"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          width="28"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" x2="9.01" y1="9" y2="9" />
                          <line x1="15" x2="15.01" y1="9" y2="9" />
                        </svg>
                      </div>
                    </div>
                    <div className="cn-playful__tile cn-playful__tile--green cn-playful__tile--plain">
                      <svg
                        aria-hidden="true"
                        fill="none"
                        height="36"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        width="36"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div className="cn-playful__tile cn-playful__tile--blue">
                      <div className="cn-playful__tile-inner">
                        <svg
                          aria-hidden="true"
                          fill="none"
                          height="28"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          width="28"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="cn-playful__phone-fade" aria-hidden="true" />
                </div>
              </div>
            </div>

            <h3 className="cn-playful__h3">모바일로 이어지는 치유 놀이</h3>
            <p className="cn-playful__body cn-playful__body--mb">
              체류 기간 중 모바일 앱으로 치매·우울증 예방 게임도 함께 제공합니다. 방문 중에도, 일상으로
              돌아가서도 꾸준히 즐기며 마음의 근육을 키워요.
            </p>

            <div className="cn-playful__mini-grid">
              <div className="cn-playful__mini">
                <div className="cn-playful__mini-icon">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                    <polyline points="7.5 19.79 7.5 14.6 3 12" />
                    <polyline points="21 12 16.5 14.6 16.5 19.79" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" x2="12" y1="22.08" y2="12" />
                  </svg>
                </div>
                <span className="cn-playful__mini-label">기억력 게임</span>
              </div>
              <div className="cn-playful__mini cn-playful__mini--yellow">
                <div className="cn-playful__mini-icon">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    <path d="M12 8s1-1 2-1 2 1 2 1" />
                    <path d="M12 12s1 1 2 1 2-1 2-1" />
                  </svg>
                </div>
                <span className="cn-playful__mini-label">감정 일기</span>
              </div>
              <div className="cn-playful__mini cn-playful__mini--blue">
                <div className="cn-playful__mini-icon">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <span className="cn-playful__mini-label">명상 퍼즐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
