import { useCallback, useEffect, useRef, useState } from "react";

function IconPlus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function IconArrowUp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function IconArchive() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * @param {{ onSendMessage: (payload: { message: string, files: File[] }) => void, placeholder?: string }} props
 */
export default function ClaudeChatInput({ onSendMessage, placeholder }) {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  }, [message]);

  const addFiles = useCallback((list) => {
    const arr = Array.from(list);
    setFiles((prev) => {
      const next = [...prev];
      for (const file of arr) {
        const isImage = file.type.startsWith("image/") || /\.(jpe?g|png|gif|webp|svg)$/i.test(file.name);
        if (!isImage) continue;
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        next.push({ id, file, preview: URL.createObjectURL(file) });
      }
      return next;
    });
  }, []);

  const removeFile = (id) => {
    setFiles((prev) => {
      const row = prev.find((f) => f.id === id);
      if (row?.preview) URL.revokeObjectURL(row.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleSend = () => {
    const t = message.trim();
    const fileList = files.map((f) => f.file);
    if (!t && fileList.length === 0) return;
    onSendMessage({ message: t, files: fileList });
    setMessage("");
    setFiles((prev) => {
      prev.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
      return [];
    });
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasContent = message.trim().length > 0 || files.length > 0;

  return (
    <div
      className="cn-chat-input-wrap"
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
      }}
    >
      <div className="cn-chat-input-box">
        {files.length > 0 ? (
          <div className="cn-chat-input-files">
            {files.map((f) => (
              <div className="cn-chat-file-card" key={f.id}>
                <img alt="" src={f.preview} />
                <button
                  type="button"
                  className="cn-chat-file-card__remove"
                  onClick={() => removeFile(f.id)}
                  aria-label="첨부 제거"
                >
                  <IconX />
                </button>
              </div>
            ))}
          </div>
        ) : null}
        <textarea
          ref={textareaRef}
          className="cn-chat-input-ta"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder ?? "지금 어떤 쉼이 필요하세요? 편하게 말씀해 주세요."}
          rows={1}
        />
        <div className="cn-chat-input-bar">
          <button
            type="button"
            className="cn-chat-input-icon-btn"
            onClick={() => fileInputRef.current?.click()}
            aria-label="이미지 첨부"
          >
            <IconPlus />
          </button>
          <button
            type="button"
            className="cn-chat-input-send"
            disabled={!hasContent}
            onClick={handleSend}
            aria-label="보내기"
          >
            <IconArrowUp />
          </button>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files?.length) addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      {isDragging ? (
        <div className="cn-chat-input-drag">
          <IconArchive />
          <p>이미지를 여기에 놓아 주세요</p>
        </div>
      ) : null}
      <p className="cn-chat-input-disclaimer">안내는 참고용이며, 예약·의료 판단은 담당 기관과 상담해 주세요.</p>
    </div>
  );
}
