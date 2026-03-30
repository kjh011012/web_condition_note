/**
 * 신뢰·가치 한 줄 뱃지 (히어로·결제·상세 등)
 */
export function TrustChip({ children, variant = "on-dark", className = "" }) {
  const v =
    variant === "on-cream"
      ? "cn-trust-chip cn-trust-chip--on-cream"
      : "cn-trust-chip";
  return <span className={`${v} ${className}`.trim()}>{children}</span>;
}

export function TrustChipList({ items, variant = "on-dark" }) {
  return (
    <ul className="cn-trust-chip-row" role="list">
      {items.map((text) => (
        <li key={text}>
          <TrustChip variant={variant}>{text}</TrustChip>
        </li>
      ))}
    </ul>
  );
}
