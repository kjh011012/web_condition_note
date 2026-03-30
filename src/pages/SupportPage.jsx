import { useState } from "react";
import { Link } from "react-router-dom";
import { faqItems, supportContacts } from "../data/siteData";
import Accordion from "../components/Accordion";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

function SupportPage() {
  const [openKey, setOpenKey] = useState(faqItems[0].question);
  const contactStats = [
    { label: "응답 기준", value: "평일 24시간 이내" },
    { label: "상담 톤", value: "압박 없는 안내 중심" },
    { label: "주요 요청", value: "식단 · 이동 · 일정 변경" },
  ];

  return (
    <div className="page-shell">
      <section className="support-hero hero-surface">
        <p className="eyebrow">도움</p>
        <h1 className="display-title">
          궁금한 점이나 도움이 필요하신<br />내용을 찾아보세요
        </h1>
        <p className="section-copy">
          궁금한 점이나 도움이 필요하신 내용을 찾아보세요.
        </p>
        <div className="archive-stats">
          {contactStats.map((stat) => (
            <article key={stat.label} className="metric-tile">
              <p className="eyebrow">{stat.label}</p>
              <div className="metric-tile__value">{stat.value}</div>
            </article>
          ))}
        </div>
      </section>

      <Reveal>
      <section className="support-grid">
        {supportContacts.map((contact) => (
          <article key={contact.title} className="support-card">
            <p className="eyebrow">안내</p>
            <h2 className="card-title">{contact.title}</h2>
            <p className="card-copy">{contact.body}</p>
            <Link className="support-card__cta" to={contact.to}>
              {contact.cta}
            </Link>
          </article>
        ))}
      </section>
      </Reveal>

      <Reveal delay={100}>
      <section className="stack">
        <SectionHeading
          eyebrow="자주 묻는 질문"
          title="자주 묻는 질문"
        />
        <Accordion items={faqItems.slice(0, 3)} onToggle={setOpenKey} openKey={openKey} />
        <div className="card-actions">
          <Link className="button button--primary" to="/support/faq">
            전체 FAQ 보기
          </Link>
          <Link className="button button--plain" to="/support/refund">
            취소 및 환불 안내
          </Link>
          <Link className="button button--secondary" to="/my/inquiries">
            1:1 문의 남기기
          </Link>
        </div>
      </section>
      </Reveal>
    </div>
  );
}

export default SupportPage;
