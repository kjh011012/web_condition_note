import { formatCurrency } from "../data/format";

function BookingSummaryCard({
  item,
  collectionType,
  selectedDate,
  guests,
  onDecrease,
  onIncrease,
  maxGuests = 5,
  footer,
}) {
  const total = item.price * guests;

  return (
    <aside className="booking-summary sticky-panel">
      <p className="eyebrow">
        {collectionType === "villages" ? "Stay Package" : "Experience Booking"}
      </p>
      <h3 className="booking-summary__title">{item.title}</h3>
      <div className="booking-summary__list">
        <div className="summary-row">
          <span>선택 일정</span>
          <strong>{selectedDate}</strong>
        </div>
        <div className="summary-row">
          <span>인원</span>
          <div className="stepper" aria-label="인원 선택">
            <button disabled={guests <= 1} onClick={onDecrease} type="button">
              −
            </button>
            <strong>{guests}</strong>
            <button disabled={guests >= maxGuests} onClick={onIncrease} type="button">
              +
            </button>
          </div>
        </div>
        <div className="summary-row">
          <span>기본 금액</span>
          <strong>{formatCurrency(item.price)}</strong>
        </div>
        <div className="summary-row summary-row--strong">
          <span>총 결제 예정</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </div>
      {footer ? <div className="booking-summary__footer">{footer}</div> : null}
    </aside>
  );
}

export default BookingSummaryCard;
