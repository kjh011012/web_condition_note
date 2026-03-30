function Accordion({ items, openKey, onToggle }) {
  return (
    <div className="accordion-list">
      {items.map((item, index) => {
        const isOpen = openKey === item.question;
        const panelId = `accordion-panel-${index}`;
        const buttonId = `accordion-button-${index}`;

        return (
          <article key={item.question} className="accordion-item">
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              id={buttonId}
              className="accordion-trigger"
              onClick={() => onToggle(isOpen ? null : item.question)}
              type="button"
            >
              <span>
                <strong>{item.question}</strong>
                <span className="accordion-trigger__meta">
                  {item.category}
                </span>
              </span>
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? (
              <div
                aria-labelledby={buttonId}
                className="accordion-panel"
                id={panelId}
                role="region"
              >
                {item.answer}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export default Accordion;
