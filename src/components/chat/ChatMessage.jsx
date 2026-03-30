function LeafAvatar() {
  return (
    <span className="cn-msg__avatar" aria-hidden>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path
          d="M12 3c-2 4-6 5-6 10a6 6 0 1012 0c0-5-4-6-6-10z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * @param {{ role: 'ai' | 'user', children: import('react').ReactNode, style?: import('react').CSSProperties }} props
 */
export default function ChatMessage({ role, children, style }) {
  const isAi = role === "ai";
  return (
    <div className={`cn-msg cn-msg--${role}`} style={style}>
      {isAi ? <LeafAvatar /> : null}
      <div className={`cn-msg__bubble cn-msg__bubble--${role}`}>{children}</div>
    </div>
  );
}
