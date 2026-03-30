import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getExperience } from "../data/siteData";
import { formatCurrency } from "../data/format";
import BookingSummaryCard from "../components/BookingSummaryCard";
import EmptyState from "../components/EmptyState";
import SectionHeading from "../components/SectionHeading";
import { TrustChipList } from "../components/TrustChip";

const CHECKOUT_TRUST_CHIPS = [
  "24시간 내 예약 확정 안내",
  "취소·환불 규정 사전 고지",
  "맞춤 식단·동선 요청 반영",
];

function validateForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "이름을 입력해 주세요.";
  if (!form.phone.trim()) errors.phone = "연락처를 입력해 주세요.";
  if (!form.email.trim()) errors.email = "이메일을 입력해 주세요.";
  if (!form.consent) errors.consent = "개인정보 및 운영 안내 동의가 필요합니다.";
  return errors;
}

function CheckoutPage() {
  const { collectionType, slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const item =
    collectionType === "villages" ? getExperience(collectionType, slug) : null;
  const [selectedDate, setSelectedDate] = useState(
    location.state?.selectedDate ?? item?.bookingOptions.defaultDate ?? "",
  );
  const [guests, setGuests] = useState(
    location.state?.guests ?? 2,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    dietary: "일반식", mobility: "일반",
    request: "", note: "", consent: false,
  });

  useEffect(() => {
    if (!item) return;
    setSelectedDate(location.state?.selectedDate ?? item.bookingOptions.defaultDate);
    setGuests(location.state?.guests ?? 2);
  }, [collectionType, item, location.state]);

  const errors = useMemo(() => validateForm(form), [form]);
  const total = item ? item.price * guests : 0;

  if (!item || collectionType !== "villages") {
    return (
      <div className="page-shell">
        <EmptyState
          copy="예약 정보를 확인할 수 없습니다."
          title="예약 정보를 찾을 수 없습니다."
          action={
            <Link className="button button--primary" to="/">홈으로 이동</Link>
          }
        />
      </div>
    );
  }

  function handleFieldChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setIsSubmitting(true);
    const bookingId = `CN-${Date.now().toString().slice(-6)}`;
    navigate("/booking-complete", {
      state: {
        amount: total, bookingId,
        contactName: form.name, itemTitle: item.title,
        selectedDate, guests, collectionType,
      },
    });
  }

  return (
    <div className="page-shell page-shell--wide">
      <section className="checkout-hero hero-surface">
        <p className="eyebrow">예약하기</p>
        <h1 className="display-title">예약 내용을 확인하고 완료해 주세요</h1>
        <ol aria-label="예약 단계" className="step-strip step-strip--ordered">
          <li className="step-chip step-chip--active">1. 일정·인원</li>
          <li className="step-chip step-chip--active">2. 연락 정보</li>
          <li className="step-chip step-chip--active">3. 요청·동의·완료</li>
        </ol>
      </section>

      <div className="checkout-layout">
        <form className="checkout-main" id="booking-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <SectionHeading
              eyebrow="일정 확인"
              title="예약 내용을 먼저 확인하세요"
            />
            <div className="field-grid field-grid--two">
              <div className="field">
                <label htmlFor="checkout-date">일정</label>
                <select
                  className="select"
                  id="checkout-date"
                  onChange={(event) => setSelectedDate(event.target.value)}
                  value={selectedDate}
                >
                  {item.bookingOptions.dates.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="checkout-guests">인원</label>
                <div className="stepper" id="checkout-guests">
                  <button
                    disabled={guests <= 1}
                    onClick={() => setGuests((v) => Math.max(1, v - 1))}
                    type="button"
                  >−</button>
                  <strong>{guests}명</strong>
                  <button
                    disabled={guests >= item.bookingOptions.maxGuests}
                    onClick={() => setGuests((v) => Math.min(item.bookingOptions.maxGuests, v + 1))}
                    type="button"
                  >+</button>
                </div>
              </div>
            </div>
          </section>

          <section className="form-section">
            <SectionHeading
              eyebrow="참여자 정보"
              title="참여자 정보를 입력해 주세요"
            />
            <div className="field-grid field-grid--two">
              <div className="field">
                <label htmlFor="form-name">예약자 이름</label>
                <input
                  className="input"
                  id="form-name"
                  onChange={(event) => handleFieldChange("name", event.target.value)}
                  placeholder="이름을 입력해 주세요"
                  type="text"
                  value={form.name}
                />
                {showErrors && errors.name ? (
                  <span className="form-error">{errors.name}</span>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="form-phone">연락처</label>
                <input
                  className="input"
                  id="form-phone"
                  onChange={(event) => handleFieldChange("phone", event.target.value)}
                  placeholder="010-0000-0000"
                  type="tel"
                  value={form.phone}
                />
                {showErrors && errors.phone ? (
                  <span className="form-error">{errors.phone}</span>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="form-email">이메일</label>
                <input
                  className="input"
                  id="form-email"
                  onChange={(event) => handleFieldChange("email", event.target.value)}
                  placeholder="example@email.com"
                  type="email"
                  value={form.email}
                />
                {showErrors && errors.email ? (
                  <span className="form-error">{errors.email}</span>
                ) : null}
              </div>
              <div className="field">
                <label htmlFor="form-dietary">식단 옵션</label>
                <select
                  className="select"
                  id="form-dietary"
                  onChange={(event) => handleFieldChange("dietary", event.target.value)}
                  value={form.dietary}
                >
                  <option value="일반식">일반식</option>
                  <option value="저염식">저염식</option>
                  <option value="채식">채식</option>
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <SectionHeading
              eyebrow="배려 요청"
              title="필요한 배려 사항을 알려 주세요"
            />
            <div className="field-grid field-grid--two">
              <fieldset className="fieldset">
                <legend>이동 지원 정도</legend>
                <div className="choice-row">
                  {["일반", "천천한 동선", "추가 안내 필요"].map((option) => (
                    <label key={option} className="choice-chip">
                      <input
                        checked={form.mobility === option}
                        name="mobility"
                        onChange={() => handleFieldChange("mobility", option)}
                        type="radio"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="field">
                <label htmlFor="form-note">운영팀에게 전할 메모</label>
                <textarea
                  className="textarea"
                  id="form-note"
                  onChange={(event) => handleFieldChange("note", event.target.value)}
                  placeholder="부모님 동행, 픽업 문의, 조용한 객실 요청 등을 남겨 주세요"
                  value={form.note}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="form-request">이번 여정의 목적</label>
              <textarea
                className="textarea"
                id="form-request"
                onChange={(event) => handleFieldChange("request", event.target.value)}
                placeholder="예: 최근 피로가 쌓여 있어서 조용히 쉬고 싶어요"
                value={form.request}
              />
            </div>
            <label className="consent-row">
              <input
                checked={form.consent}
                onChange={(event) => handleFieldChange("consent", event.target.checked)}
                type="checkbox"
              />
              <span>
                운영 안내 및 개인정보 처리방침에 동의합니다. 입력 정보는 예약
                운영과 맞춤 응대를 위해서만 사용됩니다.
              </span>
            </label>
            {showErrors && errors.consent ? (
              <span className="form-error">{errors.consent}</span>
            ) : null}
          </section>
        </form>

        <div className="checkout-aside-stack">
          <aside aria-label="예약 안심 안내" className="checkout-trust-panel surface-card">
            <p className="eyebrow">안심하고 진행하세요</p>
            <TrustChipList items={CHECKOUT_TRUST_CHIPS} variant="on-cream" />
            <ul className="checkout-trust-bullets">
              <li>결제 전 입력 정보는 예약 운영과 응대에만 사용됩니다.</li>
              <li>확정 전까지는 무료 취소 가능 구간이 안내됩니다.</li>
              <li>현장에서 컨디션 측정을 원하시면 예약 메모에 남겨 주세요.</li>
            </ul>
          </aside>
          <BookingSummaryCard
            collectionType={collectionType}
            footer={
              <div className="stack">
                <div className="surface-card">
                  <div className="summary-row">
                    <span>프로그램 금액</span>
                    <strong>{formatCurrency(item.price)}</strong>
                  </div>
                  <div className="summary-row">
                    <span>인원</span>
                    <strong>{guests}명</strong>
                  </div>
                  <div className="summary-row summary-row--strong">
                    <span>예상 결제 금액</span>
                    <strong>{formatCurrency(total)}</strong>
                  </div>
                </div>
                <button
                  className="button button--primary button--block"
                  disabled={isSubmitting}
                  form="booking-form"
                  type="submit"
                >
                  {isSubmitting ? "예약 접수 중..." : "예약 요청 완료하기"}
                </button>
                <Link className="button button--plain button--block" to="/support/refund">
                  취소 및 환불 규정 확인
                </Link>
                <p className="help-text">
                  운영 사무국이 24시간 이내 확정 여부와 세부 안내를 전달합니다.
                </p>
              </div>
            }
            guests={guests}
            item={item}
            maxGuests={item.bookingOptions.maxGuests}
            onDecrease={() => setGuests((v) => Math.max(1, v - 1))}
            onIncrease={() => setGuests((v) => Math.min(item.bookingOptions.maxGuests, v + 1))}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
