import useReveal from "../hooks/useReveal";

export default function Reveal({ children, delay = 0, className = "" }) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "reveal--visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
