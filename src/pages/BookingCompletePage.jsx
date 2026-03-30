import { Link, useLocation } from "react-router-dom";
import { formatCurrency } from "../data/format";
import StatusPill from "../components/StatusPill";

function BookingCompletePage() {
  const location = useLocation();
  const payload = location.state ?? {
    amount: 150000,
    bookingId: "CN-240419",
    contactName: "고객",
    itemTitle: "태기산치유마을 약선식탁·선도기공 스테이",
    selectedDate: "4월 19일 토요일",
    guests: 2,
  };

  return (
    <div className="page-shell">
      <section className="complete-card hero-surface">
        <StatusPill tone="success">예약 요청 접수 완료</StatusPill>
        <h1 className="display-title">
          {payload.contactName} 님의 회복 여정을<br />
          조용히 준비하겠습니다.
        </h1>
        <p className="section-copy">
          운영 사무국이 24시간 이내에 확정 여부와 세부 안내를 전달드립니다.
        </p>

        <div className="archive-stats">
          <article className="metric-tile">
            <p className="eyebrow">예약 번호</p>
            <div className="metric-tile__value">{payload.bookingId}</div>
          </article>
          <article className="metric-tile">
            <p className="eyebrow">선택 일정</p>
            <div className="metric-tile__value">{payload.selectedDate}</div>
          </article>
          <article className="metric-tile">
            <p className="eyebrow">인원 및 금액</p>
            <div className="metric-tile__value">
              {payload.guests}명 · {formatCurrency(payload.amount)}
            </div>
          </article>
        </div>

        <article className="surface-card">
          <h2 className="card-title">{payload.itemTitle}</h2>
          <div className="check-list">
            <div className="check-list__item">
              <span className="check-list__mark">●</span>
              <span>운영 사무국이 24시간 내 확정 메시지를 전송합니다.</span>
            </div>
            <div className="check-list__item">
              <span className="check-list__mark">●</span>
              <span>예약 변경이나 문의는 마이페이지와 고객지원에서 바로 이어집니다.</span>
            </div>
          </div>
        </article>

        <article className="surface-card complete-prep-card">
          <h2 className="card-title">사전에 준비하시면 좋아요</h2>
          <ul className="complete-prep-list">
            <li>이동 동선이 길 수 있으니 편한 신발과 얇은 겉옷을 챙겨 주세요.</li>
            <li>식단 요청은 확정 메시지에 답장하거나 마이페이지 문의로 이어가실 수 있습니다.</li>
            <li>컨디션 측정을 원하시면 현장 안내에 따라 앱을 설치·로그인해 주세요.</li>
          </ul>
        </article>

        <article className="surface-card complete-app-card">
          <h2 className="card-title">컨디션노트 앱</h2>
          <p className="section-copy complete-app-copy">
            방문 전후 컨디션을 기록하면 리포트와 다음 추천에 반영됩니다. 스토어에서
            &ldquo;컨디션노트&rdquo;를 검색해 설치할 수 있습니다.
          </p>
          <div className="complete-app-actions">
            <a
              className="button button--secondary"
              href="https://apps.apple.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              App Store
            </a>
            <a
              className="button button--secondary"
              href="https://play.google.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Play
            </a>
          </div>
          <p className="help-text">
            링크는 스토어 메인으로 연결된 예시입니다. 실제 앱 출시 시 URL을 교체하세요.
          </p>
        </article>

        <article className="surface-card complete-measure-card">
          <h2 className="card-title">측정·기록 안내</h2>
          <p className="section-copy">
            현장 또는 앱에서 짧은 체크인만으로도 여정 전후 변화를 비교할 수 있습니다.
            측정에 동의하지 않아도 예약과 이용은 가능합니다.
          </p>
          <Link className="button button--plain" to="/archive">
            회복 리포트·아카이브 둘러보기
          </Link>
        </article>

        <div className="card-actions">
          <Link className="button button--primary" to="/my/reservations">
            예약 확인하기
          </Link>
          <Link className="button button--secondary" to="/archive">
            회복 리포트 보기
          </Link>
          <Link className="button button--plain" to="/">
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </div>
  );
}

export default BookingCompletePage;
