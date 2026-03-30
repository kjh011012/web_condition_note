import { useEffect, useId } from "react";

function Modal({ title, children, onClose }) {
  const titleId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className="modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="modal__header">
          <h2 id={titleId} className="modal__title">
            {title}
          </h2>
          <button className="button button--plain" onClick={onClose} type="button">
            닫기
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export default Modal;
