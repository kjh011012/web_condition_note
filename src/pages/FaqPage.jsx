import { useDeferredValue, useMemo, useState } from "react";
import { faqItems } from "../data/siteData";
import Accordion from "../components/Accordion";
import EmptyState from "../components/EmptyState";
import SectionHeading from "../components/SectionHeading";

function FaqPage() {
  const [search, setSearch] = useState("");
  const [openKey, setOpenKey] = useState(faqItems[0].question);
  const deferredSearch = useDeferredValue(search);

  const filteredItems = useMemo(() => {
    const keyword = deferredSearch.trim().toLowerCase();
    if (!keyword) return faqItems;
    return faqItems.filter((item) => {
      const source = `${item.category} ${item.question} ${item.answer}`.toLowerCase();
      return source.includes(keyword);
    });
  }, [deferredSearch]);

  return (
    <div className="page-shell">
      <section className="support-hero hero-surface">
        <p className="eyebrow">자주 묻는 질문</p>
        <h1 className="display-title">자주 묻는 질문</h1>
        <p className="section-copy">
          예약, 식단, 환불 등 궁금하신 내용을 검색해 보세요.
        </p>
      </section>

      <section className="surface-card">
        <SectionHeading
          eyebrow="검색"
          title="필요한 답을 바로 찾아보세요"
        />
        <div className="field">
          <label htmlFor="faq-search">질문 검색</label>
          <input
            className="input"
            id="faq-search"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="예약, 식단, 환불 등으로 검색"
            type="search"
            value={search}
          />
        </div>
      </section>

      {filteredItems.length ? (
        <Accordion items={filteredItems} onToggle={setOpenKey} openKey={openKey} />
      ) : (
        <EmptyState
          copy="다른 검색어로 다시 찾아보세요."
          title="검색 결과가 없습니다."
        />
      )}
    </div>
  );
}

export default FaqPage;
