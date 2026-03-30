import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildMindmapNodes,
  emptyProfile,
  ingestFreeText,
  setChip,
  summarizeProfile,
  rankAll,
  saveCuration,
  GOAL_CHIPS,
  DURATION_CHIPS,
  COMPANION_CHIPS,
  ENV_CHIPS,
  INTENSITY_CHIPS,
  MEASURE_CHIPS,
} from "../../data/conciergeEngine";
import "../../styles/concierge.css";

function nextPromptFocus(profile) {
  if (!profile.goals.length) return "goal";
  if (!profile.duration) return "duration";
  if (!profile.companion) return "companion";
  if (!profile.environment.length) return "environment";
  if (!profile.intensity) return "intensity";
  if (!profile.measurement) return "measurement";
  return "done";
}

function chipsForFocus(focus) {
  if (focus === "goal") return { dim: "goal", list: GOAL_CHIPS };
  if (focus === "duration") return { dim: "duration", list: DURATION_CHIPS };
  if (focus === "companion") return { dim: "companion", list: COMPANION_CHIPS };
  if (focus === "environment") return { dim: "environment", list: ENV_CHIPS };
  if (focus === "intensity") return { dim: "intensity", list: INTENSITY_CHIPS };
  if (focus === "measurement") return { dim: "measurement", list: MEASURE_CHIPS };
  return null;
}

function assistantLineForFocus(nf) {
  if (nf === "done") {
    return "조건이 꽤 선명해졌어요. 오른쪽 지도를 확인해 보시고, 아래에서 추천을 반영해 보세요. 더 바꾸고 싶으면 자유롭게 말씀해 주세요.";
  }
  const hints = {
    duration: "머무를 수 있는 시간을 알려 주세요.",
    companion: "누구와 함께 가시는지 알려 주세요.",
    environment: "어떤 풍경(숲, 바다, 산, 농장 등)이 끌리시나요?",
    intensity: "프로그램은 조용한 휴식 쪽과 체험 균형 중 어디에 가깝나요?",
    measurement: "컨디션 측정·기록을 얼마나 활용하고 싶으신가요?",
    goal: "가장 가까운 목적을 골라 주세요.",
  };
  return `알겠습니다. ${hints[nf] || "다음으로도 알려 주시겠어요?"} 칩을 고르거나 문장으로 적어 주세요.`;
}

function MindmapTree({ profile }) {
  const tree = useMemo(() => buildMindmapNodes(profile), [profile]);
  if (!tree.children.length) {
    return (
      <div className="cn-concierge-map__empty">
        대화나 칩을 고르면 여기에 나의 회복 조건이 가지처럼 펼쳐집니다.
      </div>
    );
  }
  return (
    <div className="cn-concierge-map" role="img" aria-label="회복 조건 마인드맵 요약">
      <div className="cn-concierge-map__center">{tree.label}</div>
      <div className="cn-concierge-map__branches">
        {tree.children.map((branch) => (
          <div className="cn-concierge-map__branch" key={branch.id}>
            <span className="cn-concierge-map__branch-label">{branch.label}</span>
            <ul className="cn-concierge-map__leaves">
              {branch.leaves.map((leaf) => (
                <li key={leaf.id}>{leaf.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConciergeOverlay({ farms, isOpen, onClose, onApply, villages }) {
  const [profile, setProfile] = useState(() => emptyProfile());
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const listRef = useRef(null);

  const focus = useMemo(() => nextPromptFocus(profile), [profile]);

  useEffect(() => {
    if (!isOpen) return;
    setProfile(emptyProfile());
    setMessages([
      {
        role: "assistant",
        text: "안녕하세요, 치유 여정 컨시어지입니다. 지금 어떤 회복이 가장 필요하신가요? 아래 칩을 고르거나, 편하게 문장으로 적어 주셔도 됩니다.",
      },
    ]);
    setDraft("");
  }, [isOpen]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isOpen]);

  const pushAssistant = useCallback((text) => {
    setMessages((m) => [...m, { role: "assistant", text }]);
  }, []);

  const pushUser = useCallback((text) => {
    setMessages((m) => [...m, { role: "user", text }]);
  }, []);

  const handleChip = (dimension, id, label) => {
    pushUser(label);
    setProfile((p) => {
      const next = setChip(p, dimension, id);
      const nf = nextPromptFocus(next);
      queueMicrotask(() => {
        pushAssistant(assistantLineForFocus(nf));
      });
      return next;
    });
  };

  const handleSend = () => {
    const t = draft.trim();
    if (!t) return;
    setDraft("");
    pushUser(t);
    setProfile((p) => {
      const next = ingestFreeText(p, t);
      queueMicrotask(() => {
        pushAssistant(
          "말씀해 주신 내용을 반영했어요. 오른쪽 지도가 갱신됩니다. 더 덧붙이거나 칩으로 다듬어 주세요.",
        );
      });
      return next;
    });
  };

  const handleApply = () => {
    const ranked = rankAll(villages, farms, profile);
    const summary = summarizeProfile(profile);
    saveCuration({ profile, summary, rankedSnapshot: true });
    onApply({ profile, summary, ranked });
    onClose();
  };

  const suggestion = chipsForFocus(focus);

  if (!isOpen) return null;

  return (
    <div
      aria-labelledby="concierge-title"
      aria-modal="true"
      className="cn-concierge-overlay"
      role="dialog"
    >
      <div className="cn-concierge-overlay__backdrop" onClick={onClose} />
      <div className="cn-concierge-overlay__panel">
        <header className="cn-concierge-overlay__head">
          <div>
            <p className="cn-concierge-overlay__eyebrow">Condition Note</p>
            <h2 className="cn-concierge-overlay__title" id="concierge-title">
              맞춤 치유 추천
            </h2>
            <p className="cn-concierge-overlay__sub">
              한 번에 고르지 않아도 됩니다. 대화하듯 조건이 쌓이면 마인드맵과 추천이 함께 바뀝니다.
            </p>
          </div>
          <button className="cn-concierge-overlay__close" onClick={onClose} type="button">
            닫기
          </button>
        </header>

        <div className="cn-concierge-overlay__body">
          <div className="cn-concierge-overlay__chat-col">
            <div className="cn-concierge-messages" ref={listRef} tabIndex={-1}>
              {messages.map((msg, i) => (
                <div className={`cn-concierge-msg cn-concierge-msg--${msg.role}`} key={i}>
                  <span className="cn-concierge-msg__role">
                    {msg.role === "assistant" ? "컨시어지" : "나"}
                  </span>
                  <p className="cn-concierge-msg__text">{msg.text}</p>
                </div>
              ))}
            </div>

            {suggestion ? (
              <div className="cn-concierge-suggest" role="group" aria-label="빠른 선택">
                <span className="cn-concierge-suggest__label">이 중에 가까운 것</span>
                <div className="cn-concierge-suggest__chips">
                  {suggestion.list.map((c) => (
                    <button
                      className="cn-concierge-suggest__chip"
                      key={c.id}
                      onClick={() => handleChip(suggestion.dim, c.id, c.label)}
                      type="button"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="cn-concierge-suggest cn-concierge-suggest--done">
                <span className="cn-concierge-suggest__label">
                  충분히 채워졌습니다. 아래에서 추천을 반영하거나 계속 대화해 다듬을 수 있어요.
                </span>
              </div>
            )}

            <div className="cn-concierge-input-shell">
              <textarea
                aria-label="메시지 입력"
                className="cn-concierge-input"
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="예: 요즘 잠이 얕아서 숲에서 천천히 쉬고 싶어요. 부모님이랑 1박 정도요."
                rows={2}
                value={draft}
              />
              <div className="cn-concierge-input__bar">
                <button
                  className="cn-concierge-input__send"
                  disabled={!draft.trim()}
                  onClick={handleSend}
                  type="button"
                >
                  보내기
                </button>
              </div>
            </div>
            <p className="cn-concierge-disclaimer">
              자동 응답은 키워드 기반이며, 의학적 진단을 대신하지 않습니다.
            </p>
          </div>

          <aside className="cn-concierge-overlay__map-col" aria-label="조건 시각화">
            <h3 className="cn-concierge-map__title">나의 회복 지도</h3>
            <MindmapTree profile={profile} />
            <div className="cn-concierge-summary">
              <h4 className="cn-concierge-summary__title">지금까지 정리</h4>
              <p className="cn-concierge-summary__text">{summarizeProfile(profile)}</p>
            </div>
            <button className="button button--primary cn-concierge-apply" onClick={handleApply} type="button">
              히어로 아래 추천 목록에 반영하기
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
