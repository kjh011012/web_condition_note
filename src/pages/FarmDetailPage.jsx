import "../styles/detail.css";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { farms } from "../data/siteData";
import AdaptiveImage from "../components/AdaptiveImage";
import EmptyState from "../components/EmptyState";

function getCareJourney(item) {
  return [
    {
      no: "01",
      title: "체험 전 컨디션 측정",
      body: "컨디션노트 앱 또는 현장 측정기로 스트레스·심박을 측정해 출발 상태를 기록합니다.",
    },
    {
      no: "02",
      title: "체험 중 지속 체크",
      body: `${item.duration ?? "반나절"} 동안 프로그램 전후 컨디션 변화를 짧게 기록해 개인 회복 패턴을 수집합니다.`,
    },
    {
      no: "03",
      title: "체험 후 변화 리포트",
      body: "체험 전후 기록을 비교해 어떤 활동이 회복에 기여했는지 그래프와 짧은 해설로 정리합니다.",
    },
    {
      no: "04",
      title: "다음 여정 자동 추천",
      body: "현재 상태를 기준으로 다음 치유마을·치유농장 코스를 다시 큐레이션해 재방문을 돕습니다.",
    },
  ];
}

function FarmDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const item = farms.find((f) => f.slug === slug);

  const [guests, setGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState(
    item?.bookingOptions?.defaultDate ?? "",
  );

  const totalPrice = useMemo(() => {
    if (!item) return 0;
    return item.price * guests;
  }, [item, guests]);

  const related = useMemo(
    () => farms.filter((f) => f.slug !== slug).slice(0, 3),
    [slug],
  );

  if (!item) {
    return (
      <div className="page-shell">
        <EmptyState
          copy="체험 프로그램을 찾을 수 없습니다."
          title="해당 프로그램을 찾을 수 없습니다."
          action={
            <Link className="button button--primary" to="/villages">
              목록으로 돌아가기
            </Link>
          }
        />
      </div>
    );
  }

  const careJourney = getCareJourney(item);
  const summaryPoints = [
    `${item.duration ?? "반나절"} 안에 끝나는 집중 회복 체험`,
    `${item.tags?.slice(0, 2).join(" · ") ?? "감각 회복 프로그램"} 중심의 짧고 선명한 구성`,
    "체험 전후 컨디션을 기록해 변화를 스스로 확인하고 다음 선택에 반영",
  ];

  return (
    <div className="cn3-det">
      {/* 히어로 */}
      <section className="cn3-det__hero">
        <div className="cn3-det__hero-media">
          <AdaptiveImage
            alt={item.title}
            fallbackSrc={item.galleryImage || item.heroImage}
            src={item.heroImage}
          />
          <div className="cn3-det__hero-overlay" />
        </div>
        <div className="cn3-det__hero-body">
          <p className="cn3-det__hero-region">{item.region}</p>
          <h1 className="cn3-det__hero-title">{item.title}</h1>
          <p className="cn3-det__hero-tagline">
            &ldquo;{item.region} 속 {item.duration ?? "반나절"}, 짧고 선명한 쉼&rdquo;
          </p>
        </div>
      </section>

      {/* 태그·수치 스트립 */}
      <div className="cn3-det__metrics-strip shell">
        <div className="cn3-det__tags">
          <span className="cn3-det__tag cn3-det__tag--type">치유농장</span>
          <span className="cn3-det__tag cn3-det__tag--region">{item.region}</span>
          <span className="cn3-det__tag cn3-det__tag--duration">{item.duration}</span>
          {item.tags?.slice(0, 2).map((t) => (
            <span key={t} className="cn3-det__tag cn3-det__tag--duration">{t}</span>
          ))}
        </div>
        <div className="cn3-det__key-nums">
          <div className="cn3-det__key-num">
            <strong>{item.duration}</strong>
            <span>소요</span>
          </div>
          <div className="cn3-det__key-num">
            <strong>{item.price.toLocaleString("ko-KR")}원~</strong>
            <span>1인 체험 기준</span>
          </div>
          <div className="cn3-det__key-num">
            <strong>{item.rating} · 리뷰 {item.reviewCount}</strong>
            <span>평점</span>
          </div>
          <div className="cn3-det__key-num">
            <strong>컨디션노트 측정 연계</strong>
            <span>데이터</span>
          </div>
        </div>
      </div>

      <div className="cn3-det__layout shell">
        <main className="cn3-det__main">
          {/* 한눈에 보기 */}
          <section className="cn3-det__section cn3-det__section--summary">
            <span className="cn3-det__eyebrow">프로그램 한눈에 보기</span>
            <h2 className="cn3-det__section-title">이 체험이 당신에게 맞는 이유</h2>
            <ul className="cn3-det__summary-list">
              {summaryPoints.map((point) => (
                <li className="cn3-det__summary-item" key={point}>{point}</li>
              ))}
            </ul>
          </section>

          {/* 프로그램 소개 */}
          <section className="cn3-det__section">
            <span className="cn3-det__eyebrow">프로그램 소개</span>
            <h2 className="cn3-det__section-title">{item.title}</h2>
            <div className="cn3-det__story-body">
              <p>{item.description}</p>
            </div>
          </section>

          {/* 체험 흐름 */}
          {item.flow?.length > 0 && (
            <section className="cn3-det__section">
              <span className="cn3-det__eyebrow">체험 흐름</span>
              <h2 className="cn3-det__section-title">진행 순서</h2>
              <div className="cn3-det__flow">
                {item.flow.map((step, i) => (
                  <div className="cn3-det__flow-step" key={step.title}>
                    <div className="cn3-det__flow-idx" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="cn3-det__flow-content">
                      <p className="cn3-det__flow-title">{step.title}</p>
                      <p className="cn3-det__flow-body">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 포함 / 불포함 */}
          {(item.inclusions?.length > 0 || item.exclusions?.length > 0) && (
            <section className="cn3-det__section">
              <span className="cn3-det__eyebrow">포함 / 불포함</span>
              <h2 className="cn3-det__section-title">포함 / 불포함</h2>
              <div className="cn3-det__checks-grid">
                {item.inclusions?.length > 0 && (
                  <div className="cn3-det__check-group">
                    <h3>포함 사항</h3>
                    <ul className="cn3-det__check-list">
                      {item.inclusions.map((inc) => (
                        <li className="cn3-det__check-item" key={inc}>
                          <em className="cn3-det__check-icon cn3-det__check-icon--yes" aria-hidden="true">✓</em>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.exclusions?.length > 0 && (
                  <div className="cn3-det__check-group">
                    <h3>불포함 사항</h3>
                    <ul className="cn3-det__check-list">
                      {item.exclusions.map((exc) => (
                        <li className="cn3-det__check-item" key={exc}>
                          <em className="cn3-det__check-icon cn3-det__check-icon--no" aria-hidden="true">×</em>
                          {exc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 운영처 정보 / 준비사항 */}
          {(item.address || item.phone || item.preparations?.length > 0) && (
            <section className="cn3-det__section">
              <span className="cn3-det__eyebrow">운영처 정보 / 준비사항</span>
              <h2 className="cn3-det__section-title">운영처 정보 / 준비사항</h2>
              <div className="cn3-det__operator-card">
                {item.address && (
                  <div className="cn3-det__operator-row">
                    <span className="cn3-det__operator-icon" aria-hidden="true">📍</span>
                    <span>{item.address}</span>
                  </div>
                )}
                {item.phone && (
                  <div className="cn3-det__operator-row">
                    <span className="cn3-det__operator-icon" aria-hidden="true">📞</span>
                    <span>{item.phone}</span>
                  </div>
                )}
                {item.parking !== undefined && (
                  <div className="cn3-det__operator-row">
                    <span className="cn3-det__operator-icon" aria-hidden="true">🚗</span>
                    <span>{item.parking ? "주차 가능" : "주차 불가"}</span>
                  </div>
                )}
              </div>
              {item.preparations?.length > 0 && (
                <div className="cn3-det__operator-card" style={{ marginTop: "1rem" }}>
                  <h3 className="cn3-det__operator-sub">준비물</h3>
                  <ul className="cn3-det__tab-list">
                    {item.preparations.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <p className="cn3-det__tab-footnote">당일 프로그램은 시작 10분 전 도착을 권장합니다. 예약 후 운영처에서 세부 준비사항을 다시 안내드립니다.</p>
                </div>
              )}
            </section>
          )}

          {/* 컨디션노트 여정 */}
          <section className="cn3-det__section">
            <span className="cn3-det__eyebrow">앱 연동 회복 루프</span>
            <h2 className="cn3-det__section-title">방문 이후까지 이어지는 컨디션노트 여정</h2>
            <ol className="cn3-det__journey-grid">
              {careJourney.map((step) => (
                <li className="cn3-det__journey-card" key={step.no}>
                  <span className="cn3-det__journey-no">{step.no}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="cn3-det__journey-loop">
              컨디션노트 소개 → 예약 → 현장 체험과 측정 → 일상 관리 → 재방문 추천
            </p>
          </section>

          {/* 후기 */}
          {item.reviews?.length > 0 && (
            <section className="cn3-det__section">
              <span className="cn3-det__eyebrow">참여 후기</span>
              <h2 className="cn3-det__section-title">직접 다녀온 분들의 이야기</h2>
              <div className="cn3-det__reviews-list">
                {item.reviews.map((review) => (
                  <article className="cn3-det__review" key={review.author}>
                    <span className="cn3-det__review-open-quote" aria-hidden="true">&ldquo;</span>
                    <p className="cn3-det__review-body">{review.body}</p>
                    <footer className="cn3-det__review-footer">
                      <span className="cn3-det__review-dot" aria-hidden="true" />
                      <span className="cn3-det__review-author">{review.author}</span>
                    </footer>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* 관련 체험 */}
          {related.length > 0 && (
            <section className="cn3-det__section">
              <span className="cn3-det__eyebrow">관련 체험</span>
              <h2 className="cn3-det__section-title">다른 치유농장도 둘러보세요</h2>
              <div className="cn3-det__related-grid">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    className="cn3-det__related-card"
                    to={`/farms/${r.slug}`}
                  >
                    <div className="cn3-det__related-img">
                      <AdaptiveImage
                        alt={r.title}
                        fallbackSrc={r.heroImage}
                        src={r.heroImage}
                        loading="lazy"
                      />
                    </div>
                    <div className="cn3-det__related-body">
                      <p className="cn3-det__related-region">{r.region} · 치유농장</p>
                      <h3 className="cn3-det__related-title">{r.title}</h3>
                      <p className="cn3-det__related-meta">{r.duration} · {r.price.toLocaleString("ko-KR")}원</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* 예약 사이드바 */}
        <aside className="cn3-det__sidebar">
          <div className="cn3-booking">
            <span className="cn3-booking__price-label">참가비</span>
            <strong className="cn3-booking__price-amount">
              {item.price.toLocaleString("ko-KR")}원
            </strong>
            <span className="cn3-booking__price-unit">1인 기준 · 부가세 포함</span>

            <div className="cn3-booking__divider" />

            <div className="cn3-booking__field">
              <label htmlFor="farm-date">체험 날짜</label>
              <select
                id="farm-date"
                className="cn3-booking__select"
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              >
                {item.bookingOptions.dates.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="cn3-booking__field">
              <label>인원</label>
              <div className="cn3-booking__stepper">
                <button
                  className="cn3-booking__stepper-btn"
                  disabled={guests <= 1}
                  onClick={() => setGuests((v) => Math.max(1, v - 1))}
                  type="button"
                  aria-label="인원 감소"
                >
                  −
                </button>
                <span className="cn3-booking__stepper-count">{guests}명</span>
                <button
                  className="cn3-booking__stepper-btn"
                  disabled={guests >= item.bookingOptions.maxGuests}
                  onClick={() => setGuests((v) => Math.min(item.bookingOptions.maxGuests, v + 1))}
                  type="button"
                  aria-label="인원 증가"
                >
                  +
                </button>
              </div>
            </div>

            <div className="cn3-booking__subtotal">
              <span className="cn3-booking__subtotal-label">
                {item.price.toLocaleString("ko-KR")}원 × {guests}명
              </span>
              <span className="cn3-booking__subtotal-amount">
                {totalPrice.toLocaleString("ko-KR")}원
              </span>
            </div>

            <Link
              className="cn3-booking__reserve"
              state={{ guests, selectedDate }}
              to={`/checkout/farms/${item.slug}`}
            >
              예약하기
            </Link>
            <button className="cn3-booking__inquiry" type="button">
              일정 문의
            </button>

            <div className="cn3-booking__trust">
              <div className="cn3-booking__trust-item">
                <span className="cn3-booking__trust-dot" aria-hidden="true" />
                강원도 공식 인증 파트너
              </div>
              <div className="cn3-booking__trust-item">
                <span className="cn3-booking__trust-dot" aria-hidden="true" />
                컨디션노트 측정·기록 연동 가능
              </div>
              <div className="cn3-booking__trust-item">
                <span className="cn3-booking__trust-dot" aria-hidden="true" />
                무료 취소 (7일 전까지)
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 모바일 하단 CTA */}
      <div className="det-booking">
        <div className="det-booking__inner shell">
          <div>
            <p className="det-booking__name">{item.title}</p>
            <p className="det-booking__price">{item.price.toLocaleString("ko-KR")}원부터</p>
          </div>
          <div className="det-booking__actions">
            <button className="det-booking__inquiry" type="button">문의</button>
            <Link
              className="det-booking__reserve"
              state={{ guests, selectedDate }}
              to={`/checkout/farms/${item.slug}`}
            >
              예약하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmDetailPage;
