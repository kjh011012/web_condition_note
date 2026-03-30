function SectionHeading({ eyebrow, title, copy, action, align = "left" }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="section-title">{title}</h2>
        {copy ? <p className="section-copy">{copy}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export default SectionHeading;
