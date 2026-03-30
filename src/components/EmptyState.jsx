function EmptyState({ eyebrow = "Condition Note", title, copy, action }) {
  return (
    <section className="empty-state surface-card">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="section-title">{title}</h1>
      <p className="section-copy">{copy}</p>
      {action ? <div className="empty-state__action">{action}</div> : null}
    </section>
  );
}

export default EmptyState;
