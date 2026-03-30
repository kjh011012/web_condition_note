import { Link } from "react-router-dom";
import { policies } from "../data/siteData";
import SectionHeading from "../components/SectionHeading";

function PolicyPage({ policyKey }) {
  const policy = policies[policyKey];
  if (!policy) return null;

  return (
    <div className="page-shell">
      <section className="support-hero hero-surface">
        <p className="eyebrow">안내</p>
        <h1 className="display-title">{policy.title}</h1>
        <p className="section-copy">{policy.summary}</p>
        <div className="policy-tabs">
          <Link
            className={policyKey === "refund" ? "button button--primary" : "button button--plain"}
            to="/support/refund"
          >
            취소 및 환불
          </Link>
          <Link
            className={policyKey === "privacy" ? "button button--primary" : "button button--plain"}
            to="/support/privacy"
          >
            개인정보 처리방침
          </Link>
        </div>
      </section>

      <section className="policy-grid">
        {policy.sections.map((section) => (
          <article key={section.heading} className="policy-section">
            <SectionHeading title={section.heading} />
            <div className="policy-list">
              {section.items.map((entry) => (
                <div key={entry} className="check-list__item">
                  <span className="check-list__mark">●</span>
                  <span>{entry}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default PolicyPage;
