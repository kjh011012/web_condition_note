/**
 * Symbiotic structure — 함께 성장하는 구조 (디자인 스펙)
 */
function ArrowConnector({ delayClass }) {
  return (
    <div className={`cn-symbiotic__arrow ${delayClass}`} aria-hidden="true">
      <svg
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </div>
  );
}

export default function HomeSymbioticSection() {
  return (
    <section className="cn-symbiotic" aria-labelledby="cn-symbiotic-heading">
      <div className="cn-symbiotic__gradient" aria-hidden="true" />

      <div className="cn-symbiotic__shell">
        <header className="cn-symbiotic__header">
          <h2 className="cn-symbiotic__title" id="cn-symbiotic-heading">
            함께 성장하는 구조를 만들어요
          </h2>
          <p className="cn-symbiotic__lead">
            컨디션노트는 치유마을·농장의
            <br className="cn-symbiotic__lead-br" />
            {' '}
            성장 파트너이자 정부의 정책 파트너예요.
          </p>
        </header>

        <div className="cn-symbiotic__row">
          <article className="cn-symbiotic__card cn-symbiotic__card--glass cn-symbiotic__fade cn-symbiotic__fade--100">
            <div className="cn-symbiotic__icon-wrap">
              <svg
                aria-hidden="true"
                className="cn-symbiotic__icon cn-symbiotic__icon--terra"
                fill="none"
                height="40"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
                <path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" opacity="0.6" />
              </svg>
            </div>
            <h3 className="cn-symbiotic__card-title">치유마을·치유농장</h3>
            <p className="cn-symbiotic__card-sub">컨디션노트로부터 받는 것:</p>
            <ul className="cn-symbiotic__list">
              <li>
                <span className="cn-symbiotic__dot" />
                <span>상품·패키지 개발 컨설팅</span>
              </li>
              <li>
                <span className="cn-symbiotic__dot" />
                <span>플랫폼 통한 고객 유입</span>
              </li>
              <li>
                <span className="cn-symbiotic__dot" />
                <span>데이터 기반 프로그램 고도화</span>
              </li>
              <li>
                <span className="cn-symbiotic__dot" />
                <span>정부 지원금 연계 안정적 운영</span>
              </li>
            </ul>
            <div className="cn-symbiotic__card-foot">
              <p className="cn-symbiotic__card-tagline cn-symbiotic__card-tagline--terra">
                더 많은 고객, 더 깊은 치유
              </p>
            </div>
          </article>

          <ArrowConnector delayClass="cn-symbiotic__fade--150" />

          <article className="cn-symbiotic__card cn-symbiotic__card--hub cn-symbiotic__fade cn-symbiotic__fade--200">
            <div className="cn-symbiotic__icon-wrap">
              <svg
                aria-hidden="true"
                className="cn-symbiotic__icon cn-symbiotic__icon--ivory"
                fill="none"
                height="40"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="3" />
                <circle cx="5" cy="6" r="2" opacity="0.6" />
                <circle cx="19" cy="6" r="2" opacity="0.6" />
                <circle cx="12" cy="20" r="2" opacity="0.6" />
                <path d="M6.5 7.5L10.5 10.5" opacity="0.6" />
                <path d="M17.5 7.5L13.5 10.5" opacity="0.6" />
                <path d="M12 15v3" opacity="0.6" />
              </svg>
            </div>
            <h3 className="cn-symbiotic__card-title cn-symbiotic__card-title--semibold">컨디션노트</h3>
            <p className="cn-symbiotic__card-desc">플랫폼·데이터·컨설팅 허브</p>
            <div className="cn-symbiotic__hub-rule" />
            <p className="cn-symbiotic__card-sub cn-symbiotic__card-sub--hub">양방향 연결 역할:</p>
            <ul className="cn-symbiotic__list cn-symbiotic__list--hub">
              <li>
                <span className="cn-symbiotic__dot" />
                <span>치유마을·농장 성장 지원</span>
              </li>
              <li>
                <span className="cn-symbiotic__dot" />
                <span>고객 데이터 정부 제공</span>
              </li>
              <li>
                <span className="cn-symbiotic__dot" />
                <span>고객에게 합리적 가격 연결</span>
              </li>
            </ul>
          </article>

          <ArrowConnector delayClass="cn-symbiotic__fade--250" />

          <article className="cn-symbiotic__card cn-symbiotic__card--glass cn-symbiotic__fade cn-symbiotic__fade--300">
            <div className="cn-symbiotic__icon-wrap">
              <svg
                aria-hidden="true"
                className="cn-symbiotic__icon cn-symbiotic__icon--sage"
                fill="none"
                height="40"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="3" x2="21" y1="22" y2="22" />
                <line x1="6" x2="6" y1="18" y2="11" />
                <line x1="10" x2="10" y1="18" y2="11" />
                <line x1="14" x2="14" y1="18" y2="11" />
                <line x1="18" x2="18" y1="18" y2="11" />
                <polygon points="12 2 20 7 4 7" />
              </svg>
            </div>
            <h3 className="cn-symbiotic__card-title">정부</h3>
            <p className="cn-symbiotic__card-sub">컨디션노트로부터 받는 것:</p>
            <ul className="cn-symbiotic__list">
              <li>
                <span className="cn-symbiotic__dot" />
                <span>국민 생활리듬·수면·스트레스 데이터</span>
              </li>
              <li>
                <span className="cn-symbiotic__dot" />
                <span>치유 인프라 실효성 검증</span>
              </li>
              <li>
                <span className="cn-symbiotic__dot" />
                <span>정밀한 국민 건강 정책 수립</span>
              </li>
            </ul>
            <div className="cn-symbiotic__card-foot">
              <p className="cn-symbiotic__card-tagline cn-symbiotic__card-tagline--sage">
                데이터 기반 정책, 투자 근거
              </p>
            </div>
          </article>
        </div>

        <div className="cn-symbiotic__banner">
          <p className="cn-symbiotic__banner-text">
            고객은 정부 지원으로 낮아진 합리적인 가격으로 검증된 치유마을·농장을 이용해요.
          </p>
        </div>
      </div>
    </section>
  );
}
