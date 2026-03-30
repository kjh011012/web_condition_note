function StatusPill({ tone = "default", children }) {
  return <span className={`status-pill status-pill--${tone}`}>{children}</span>;
}

export default StatusPill;
