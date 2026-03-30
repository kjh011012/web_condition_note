import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency, formatStatusTone } from "../data/format";
import { reservations } from "../data/siteData";
import Modal from "../components/Modal";
import SectionHeading from "../components/SectionHeading";
import StatusPill from "../components/StatusPill";

function ReservationsPage() {
  const [items, setItems] = useState(reservations);
  const [selectedReservation, setSelectedReservation] = useState(null);

  return (
    <div className="page-shell">
      <section className="archive-hero hero-surface">
        <p className="eyebrow">나의 여정</p>
        <h1 className="display-title">나의 예약</h1>
        <p className="section-copy">
          예약 현황과 일정을 확인하세요.
        </p>
      </section>

      <section className="stack">
        <SectionHeading
          eyebrow="예약 목록"
          title={`${items.length}개의 예약`}
        />
        <div className="reservation-grid">
          {items.map((reservation) => (
            <article key={reservation.id} className="reservation-card">
              <div className="reservation-card__header">
                <div>
                  <div className="summary-meta">
                    <StatusPill tone={formatStatusTone(reservation.status)}>
                      {reservation.status}
                    </StatusPill>
                    <span className="badge">{reservation.id}</span>
                  </div>
                  <h2 className="card-title">{reservation.title}</h2>
                </div>
                <strong>{formatCurrency(reservation.amount)}</strong>
              </div>
              <div className="stack">
                <div className="summary-row">
                  <span>일정</span>
                  <strong>{reservation.date}</strong>
                </div>
                <div className="summary-row">
                  <span>장소</span>
                  <strong>{reservation.location}</strong>
                </div>
              </div>
              <div className="card-actions">
                <button
                  className="button button--secondary"
                  onClick={() => setSelectedReservation(reservation)}
                  type="button"
                >
                  예약 취소 문의
                </button>
                <Link className="button button--plain" to="/support">
                  운영 안내 보기
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedReservation ? (
        <Modal
          onClose={() => setSelectedReservation(null)}
          title="예약 취소 요청 접수"
        >
          <div className="stack">
            <p className="card-copy">
              <strong>{selectedReservation.title}</strong> 예약을 취소 요청
              상태로 전환하시겠습니까? 운영 사무국 확인 후 환불 금액이 확정됩니다.
            </p>
            <div className="card-actions">
              <button
                className="button button--primary"
                onClick={() => {
                  setItems((current) =>
                    current.map((item) =>
                      item.id === selectedReservation.id
                        ? { ...item, status: "취소 요청 접수" }
                        : item,
                    ),
                  );
                  setSelectedReservation(null);
                }}
                type="button"
              >
                취소 요청하기
              </button>
              <button
                className="button button--plain"
                onClick={() => setSelectedReservation(null)}
                type="button"
              >
                닫기
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}

export default ReservationsPage;
