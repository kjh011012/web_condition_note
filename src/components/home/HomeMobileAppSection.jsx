/**
 * Mobile App — 홈 "방문이 끝나도, 관리는 계속돼요" 섹션 (디자인 스펙)
 */
export default function HomeMobileAppSection() {
  return (
    <section
      className="cn-mobile-app"
      aria-labelledby="cn-mobile-app-heading"
    >
      <div className="cn-mobile-app__blobs" aria-hidden="true">
        <div className="cn-mobile-app__blob cn-mobile-app__blob--tl" />
        <div className="cn-mobile-app__blob cn-mobile-app__blob--br" />
      </div>

      <div className="cn-mobile-app__shell">
        <header className="cn-mobile-app__header">
          <p className="cn-mobile-app__eyebrow">Mobile App</p>
          <h2 className="cn-mobile-app__title" id="cn-mobile-app-heading">
            방문이 끝나도, 관리는 계속돼요
          </h2>
          <div className="cn-mobile-app__rule" aria-hidden="true" />
        </header>

        <div className="cn-mobile-app__layout">
          <div className="cn-mobile-app__features-wrap">
            <div className="cn-mobile-app__timeline" aria-hidden="true" />

            <ul className="cn-mobile-app__feature-list">
              <li className="cn-mobile-app__feature cn-mobile-app__feature--d100">
                <div className="cn-mobile-app__icon-ring">
                  <svg
                    aria-hidden="true"
                    className="cn-mobile-app__icon"
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
                    <circle cx="12" cy="12" r="7" />
                    <polyline points="12 9 12 12 13.5 13.5" />
                    <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
                  </svg>
                </div>
                <div className="cn-mobile-app__feature-text">
                  <h3 className="cn-mobile-app__feature-title">생활리듬 측정</h3>
                  <p className="cn-mobile-app__feature-desc">
                    치유마을 현장 스트레스 측정기·스마트워치 수면 데이터 연동.
                    평상시의 생체 데이터를 꾸준히 기록하여 당신의 생활 리듬을 분석합니다.
                  </p>
                </div>
              </li>

              <li className="cn-mobile-app__feature cn-mobile-app__feature--d200">
                <div className="cn-mobile-app__icon-ring">
                  <svg
                    aria-hidden="true"
                    className="cn-mobile-app__icon"
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
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="m9 15 2 2 4-4" />
                  </svg>
                </div>
                <div className="cn-mobile-app__feature-text">
                  <h3 className="cn-mobile-app__feature-title">AI 리포트</h3>
                  <p className="cn-mobile-app__feature-desc">
                    수집된 데이터를 AI가 분석해 나의 컨디션 리포트 작성.
                    매일 아침 지난 밤의 수면 질과 오늘의 예상 컨디션을 직관적으로 알려줍니다.
                  </p>
                </div>
              </li>

              <li className="cn-mobile-app__feature cn-mobile-app__feature--d400">
                <div className="cn-mobile-app__icon-ring">
                  <svg
                    aria-hidden="true"
                    className="cn-mobile-app__icon cn-mobile-app__icon--yt"
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
                    <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                    <line x1="9" x2="15" y1="15" y2="15" />
                    <line x1="9" x2="15" y1="9" y2="9" />
                    <path
                      className="cn-mobile-app__icon-fill"
                      d="M10 8v8l6-4-6-4Z"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </div>
                <div className="cn-mobile-app__feature-text">
                  <h3 className="cn-mobile-app__feature-title">오늘의 추천</h3>
                  <p className="cn-mobile-app__feature-desc">
                    컨디션에 맞는 추천 운동·음식·활동을 유튜브 영상과 함께 제공.
                    전문가가 제안하는 맞춤형 콘텐츠로 하루를 더 활기차게 시작해보세요.
                  </p>
                </div>
              </li>

              <li className="cn-mobile-app__feature cn-mobile-app__feature--d500">
                <div className="cn-mobile-app__icon-ring">
                  <svg
                    aria-hidden="true"
                    className="cn-mobile-app__icon"
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
                    <path d="M2 12c0 5.5 4.5 10 10 10s10-4.5 10-10S17.5 2 12 2" />
                    <path d="M12 8v4l3 3" />
                    <path d="M19 12a7 7 0 1 0-7 7" />
                  </svg>
                </div>
                <div className="cn-mobile-app__feature-text">
                  <h3 className="cn-mobile-app__feature-title">지속 관리</h3>
                  <p className="cn-mobile-app__feature-desc">
                    치유마을 방문 후 일상에서도 생활리듬 꾸준히 관리.
                    일시적인 방문으로 끝나지 않고, 여러분의 건강한 습관 형성을 지속적으로 돕습니다.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="cn-mobile-app__device-col">
            <div className="cn-mobile-app__device-wrap cn-mobile-app__device-wrap--d300">
              <div className="cn-mobile-app__device-glow" aria-hidden="true" />

              <div className="cn-mobile-app__phone">
                <div className="cn-mobile-app__phone-screen">
                  <div className="cn-mobile-app__notch-wrap" aria-hidden="true">
                    <div className="cn-mobile-app__notch" />
                  </div>

                  <div className="cn-mobile-app__screen-gradient" aria-hidden="true" />

                  <div className="cn-mobile-app__screen-body">
                    <div className="cn-mobile-app__screen-top">
                      <div>
                        <p className="cn-mobile-app__brand">Condition Note</p>
                        <h3 className="cn-mobile-app__greeting">
                          수아님,
                          <br />
                          평온한 하루 보내세요
                        </h3>
                      </div>
                      <div className="cn-mobile-app__avatar">
                        <svg
                          aria-hidden="true"
                          fill="none"
                          height="20"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    </div>

                    <div className="cn-mobile-app__cards">
                      <div className="cn-mobile-app__card cn-mobile-app__card--white">
                        <div className="cn-mobile-app__card-head">
                          <span className="cn-mobile-app__card-label">오늘의 생활리듬</span>
                          <span className="cn-mobile-app__pill">안정적</span>
                        </div>
                        <div className="cn-mobile-app__bars" aria-hidden="true">
                          <div className="cn-mobile-app__bar" style={{ height: "40%" }} />
                          <div className="cn-mobile-app__bar" style={{ height: "70%" }} />
                          <div className="cn-mobile-app__bar" style={{ height: "50%" }} />
                          <div className="cn-mobile-app__bar cn-mobile-app__bar--peak" style={{ height: "90%" }}>
                            <span className="cn-mobile-app__bar-dot" />
                          </div>
                          <div className="cn-mobile-app__bar" style={{ height: "60%" }} />
                        </div>
                        <p className="cn-mobile-app__card-foot">
                          수면 데이터가 성공적으로 동기화되었어요.
                        </p>
                      </div>

                      <div className="cn-mobile-app__card cn-mobile-app__card--sage">
                        <div className="cn-mobile-app__sparkle-deco" aria-hidden="true">
                          <svg
                            fill="none"
                            height="40"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            viewBox="0 0 24 24"
                            width="40"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                          </svg>
                        </div>
                        <div className="cn-mobile-app__ai-row">
                          <svg
                            aria-hidden="true"
                            className="cn-mobile-app__ai-ico"
                            fill="none"
                            height="14"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          <span className="cn-mobile-app__ai-label">AI 리포트</span>
                        </div>
                        <p className="cn-mobile-app__ai-quote">
                          &quot;스트레스 지수가 어제보다 낮아졌어요. 이 페이스를 유지하며 가벼운 산책을 추천해요.&quot;
                        </p>
                      </div>

                      <div className="cn-mobile-app__card cn-mobile-app__card--video">
                        <div className="cn-mobile-app__thumb">
                          <svg
                            aria-hidden="true"
                            className="cn-mobile-app__play"
                            fill="none"
                            height="20"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                          </svg>
                          <div className="cn-mobile-app__thumb-shade" aria-hidden="true" />
                        </div>
                        <div>
                          <span className="cn-mobile-app__video-tag">오늘의 추천 영상</span>
                          <p className="cn-mobile-app__video-title">
                            하루를 마무리하는
                            <br />
                            5분 싱잉볼 명상
                          </p>
                          <p className="cn-mobile-app__video-sub">마을에서 배운 명상법</p>
                        </div>
                      </div>
                    </div>

                    <div className="cn-mobile-app__tabbar" aria-hidden="true">
                      <svg
                        className="cn-mobile-app__tab cn-mobile-app__tab--active"
                        fill="none"
                        height="20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      <svg
                        fill="none"
                        height="20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <rect height="4" rx="1" width="8" x="8" y="2" />
                      </svg>
                      <svg
                        fill="none"
                        height="20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
