export default function SkipLink({ href = "#main-content", label = "본문으로 건너뛰기" }) {
  return (
    <a className="cn-skip-link" href={href}>
      {label}
    </a>
  );
}
