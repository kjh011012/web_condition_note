import { useState } from "react";
import { formatStatusTone } from "../data/format";
import { inquiries } from "../data/siteData";
import Modal from "../components/Modal";
import SectionHeading from "../components/SectionHeading";
import StatusPill from "../components/StatusPill";

function InquiriesPage() {
  const [items, setItems] = useState(inquiries);
  const [activeInquiry, setActiveInquiry] = useState(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [draft, setDraft] = useState({ category: "운영 문의", summary: "", body: "" });

  function submitDraft(event) {
    event.preventDefault();
    if (!draft.summary.trim()) return;
    setItems((current) => [
      {
        id: `QNA-${Date.now().toString().slice(-4)}`,
        category: draft.category,
        status: "답변 대기",
        summary: draft.summary,
        answer: "문의가 접수되었습니다. 운영 사무국이 확인 후 안내드릴 예정입니다.",
      },
      ...current,
    ]);
    setDraft({ category: "운영 문의", summary: "", body: "" });
    setComposeOpen(false);
  }

  return (
    <div className="page-shell">
      <section className="archive-hero hero-surface">
        <p className="eyebrow">문의 내역</p>
        <h1 className="display-title">문의 내역</h1>
        <p className="section-copy">
          문의 내역을 확인하거나 새로운 문의를 남겨주세요.
        </p>
        <div className="card-actions">
          <button
            className="button button--primary"
            onClick={() => setComposeOpen(true)}
            type="button"
          >
            새 문의 남기기
          </button>
        </div>
      </section>

      <section className="stack">
        <SectionHeading
          eyebrow="내역"
          title={`${items.length}개의 문의 내역`}
        />
        <div className="inquiry-grid">
          {items.map((inquiry) => (
            <article key={inquiry.id} className="inquiry-card">
              <div className="inquiry-card__header">
                <div>
                  <div className="summary-meta">
                    <StatusPill tone={formatStatusTone(inquiry.status)}>
                      {inquiry.status}
                    </StatusPill>
                    <span className="badge">{inquiry.category}</span>
                  </div>
                  <h2 className="card-title">{inquiry.summary}</h2>
                </div>
                <span className="badge">{inquiry.id}</span>
              </div>
              <div className="card-actions">
                <button
                  className="button button--secondary"
                  onClick={() => setActiveInquiry(inquiry)}
                  type="button"
                >
                  답변 보기
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeInquiry ? (
        <Modal onClose={() => setActiveInquiry(null)} title={activeInquiry.summary}>
          <div className="stack">
            <div className="summary-meta">
              <StatusPill tone={formatStatusTone(activeInquiry.status)}>
                {activeInquiry.status}
              </StatusPill>
              <span className="badge">{activeInquiry.category}</span>
            </div>
            <p className="card-copy">{activeInquiry.answer}</p>
          </div>
        </Modal>
      ) : null}

      {composeOpen ? (
        <Modal onClose={() => setComposeOpen(false)} title="새 문의 남기기">
          <form className="stack" onSubmit={submitDraft}>
            <div className="field">
              <label htmlFor="inquiry-category">문의 유형</label>
              <select
                className="select"
                id="inquiry-category"
                onChange={(event) =>
                  setDraft((current) => ({ ...current, category: event.target.value }))
                }
                value={draft.category}
              >
                <option value="운영 문의">운영 문의</option>
                <option value="식단 문의">식단 문의</option>
                <option value="교통 문의">교통 문의</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="inquiry-summary">제목</label>
              <input
                className="input"
                id="inquiry-summary"
                onChange={(event) =>
                  setDraft((current) => ({ ...current, summary: event.target.value }))
                }
                placeholder="문의 제목을 입력해 주세요"
                type="text"
                value={draft.summary}
              />
            </div>
            <div className="field">
              <label htmlFor="inquiry-body">문의 내용</label>
              <textarea
                className="textarea"
                id="inquiry-body"
                onChange={(event) =>
                  setDraft((current) => ({ ...current, body: event.target.value }))
                }
                placeholder="필요한 배려나 궁금한 점을 남겨 주세요"
                value={draft.body}
              />
            </div>
            <button className="button button--primary" type="submit">
              문의 접수하기
            </button>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}

export default InquiriesPage;
