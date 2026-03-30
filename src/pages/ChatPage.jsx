import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/chat.css";
import ClaudeChatInput from "../components/ui/ClaudeChatInput.jsx";
import ChatMessage from "../components/chat/ChatMessage.jsx";
import ImageMoodGrid from "../components/chat/ImageMoodGrid.jsx";
import MiniChoiceStep from "../components/chat/MiniChoiceStep.jsx";
import MeditativeLoader from "../components/chat/MeditativeLoader.jsx";
import JourneyResultCard from "../components/chat/JourneyResultCard.jsx";
import MindmapInChat from "../components/chat/MindmapInChat.jsx";
import { farms, moodImages, villages } from "../data/siteData.js";
import {
  applyMoodSelection,
  applyRhythmAndCompanion,
  buildJourneyResult,
  emptyProfile,
  rankAll,
  saveCuration,
  summarizeProfile,
} from "../data/conciergeEngine.js";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const CURATION_TRIGGERS = /큐레이션|추천해|추천|여정|스케줄|일정 짜|코스 짜/;

function genericReply(userText) {
  const t = userText.trim();
  if (!t) return "말씀을 이어가 주시면, 그에 맞춰 장소와 리듬을 더 구체화해 드릴게요.";
  if (t.length < 8) return "조금만 더 구체적으로 알려 주시면, 숲·바다·농장 중 어디에 가까운지 짚어 드릴게요.";
  return "말씀해 주신 톤을 기억해 두었어요. 원하시면 아래에서 다시 큐레이션을 시작해 여정 카드로 정리해 드릴 수 있어요.";
}

export default function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const startedFromUrl = useRef(false);
  const profileRef = useRef(emptyProfile());

  const [profile, setProfile] = useState(() => emptyProfile());
  const [messages, setMessages] = useState(() => [
    {
      id: uid(),
      role: "ai",
      text: "안녕하세요, 컨디션노트 여정 설계를 돕는 동행자입니다. 지금은 편하게 이야기해 주셔도 되고, 아래에서 바로 큐레이션을 시작하셔도 좋아요.",
      showQuick: true,
    },
  ]);

  const syncProfile = useCallback((next) => {
    profileRef.current = next;
    setProfile(next);
  }, []);

  const pushMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, { ...msg, id: msg.id ?? uid() }]);
  }, []);

  const scrollBottom = useCallback(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    scrollBottom();
  }, [messages, scrollBottom]);

  const startCuration = useCallback(() => {
    syncProfile(emptyProfile());
    pushMessage({
      role: "user",
      text: "맞춤 치유 여정 큐레이션을 시작할게요.",
    });
    pushMessage({
      role: "ai",
      text: "지금 이 순간, 어떤 풍경이 가장 편안하게 느껴지나요? 이미지 하나만 골라 주세요.",
      showMood: true,
      moodLocked: false,
      moodSelected: null,
    });
  }, [pushMessage, syncProfile]);

  useEffect(() => {
    if (startedFromUrl.current) return;
    if (searchParams.get("start") === "curation") {
      startedFromUrl.current = true;
      startCuration();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams, startCuration]);

  const handleMoodSelect = (messageId, moodId) => {
    setMessages((prev) => {
      const target = prev.find((m) => m.id === messageId);
      if (!target?.showMood || target.moodLocked) return prev;
      const label = moodImages.find((x) => x.id === moodId)?.label ?? moodId;
      const nextP = applyMoodSelection(profileRef.current, moodId);
      profileRef.current = nextP;
      setProfile(nextP);
      const mapped = prev.map((m) =>
        m.id === messageId ? { ...m, moodLocked: true, moodSelected: moodId } : m,
      );
      return [...mapped, { id: uid(), role: "user", text: `${label} 풍경이 좋아요.` }];
    });

    window.setTimeout(() => {
      pushMessage({
        role: "ai",
        text: "리듬과 동행을 알려 주시면, 그에 맞춰 하루를 어떻게 풀어갈지 정리해 볼게요.",
        showChoice: true,
      });
    }, 800);
  };

  const completeLoader = useCallback(
    (loaderMessageId) => {
      const ranked = rankAll(villages, farms, profileRef.current);
      const jr = buildJourneyResult(profileRef.current, ranked);
      saveCuration({
        profile: profileRef.current,
        summary: summarizeProfile(profileRef.current),
        rankedSnapshot: true,
        journeyTitle: jr.title,
      });
      setMessages((prev) => {
        const rest = prev.filter((m) => m.id !== loaderMessageId);
        return [
          ...rest,
          {
            id: uid(),
            role: "ai",
            text: "여정의 뼈대를 조용히 짜 보았어요. 저장해 두었다가 예약 단계로 이어가실 수 있어요.",
            journeyResult: jr,
          },
        ];
      });
    },
    [],
  );

  const handleChoiceConfirm = ({ rhythm, companion }) => {
    const nextP = applyRhythmAndCompanion(profileRef.current, { rhythm, companion });
    profileRef.current = nextP;
    setProfile(nextP);
    const rhythmLabel = rhythm === "calm" ? "조용하고 느리게" : "적당히 걷고 움직이며";
    const compLabel =
      companion === "solo" ? "혼자" : companion === "couple" ? "둘이서" : "가족·소그룹";
    pushMessage({
      role: "user",
      text: `${rhythmLabel}, ${compLabel} 동행이에요.`,
    });
    const loaderId = uid();
    pushMessage({
      id: loaderId,
      role: "ai",
      kind: "loading",
    });
  };

  const handleSend = ({ message, files }) => {
    const t = message.trim();
    const fileNote = files.length ? ` (이미지 ${files.length}장 첨부)` : "";
    if (t) {
      pushMessage({ role: "user", text: t + fileNote });
    } else if (files.length) {
      pushMessage({ role: "user", text: `이미지 ${files.length}장을 보냈어요.` });
    } else return;

    window.setTimeout(() => {
      if (/마인드맵/.test(t)) {
        pushMessage({
          role: "ai",
          text: "지금까지 나눈 조건을 한눈에 정리해 보았어요.",
          showMindmap: true,
        });
        return;
      }
      if (CURATION_TRIGGERS.test(t)) {
        startCuration();
        return;
      }
      pushMessage({ role: "ai", text: genericReply(t) });
    }, 600);
  };

  return (
    <div className="curated-app cn-chat-page">
      <header className="cn-chat-header">
        <Link className="cn-chat-header__brand" to="/">
          <svg className="cn-chat-header__logo" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path
              d="M16 4c-1.2 3.2-4 4.8-4 9a4 4 0 108 0c0-4.2-2.8-5.8-4-9z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path d="M10 24c2-3 4-4 6-4s4 1 6 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <div className="cn-chat-header__titles">
            <h1 className="cn-chat-header__title">컨디션노트 AI 여정 설계</h1>
            <p className="cn-chat-header__sub">선택은 가볍게, 설계는 조용히</p>
          </div>
        </Link>
        <Link className="cn-chat-header__back" to="/villages">
          회복 스테이
        </Link>
      </header>

      <div className="cn-chat-stream">
        {messages.map((m, index) => {
          if (m.role === "user") {
            return (
              <ChatMessage key={m.id} role="user" style={{ animationDelay: `${index * 0.04}s` }}>
                <p className="cn-msg__text">{m.text}</p>
              </ChatMessage>
            );
          }

          return (
            <ChatMessage key={m.id} role="ai" style={{ animationDelay: `${index * 0.04}s` }}>
              {m.text ? <p className="cn-msg__text">{m.text}</p> : null}
              {m.showQuick ? (
                <div className="cn-chat-quick">
                  <button type="button" className="cn-chat-quick__btn" onClick={startCuration}>
                    치유마을 큐레이션 시작하기
                  </button>
                  <button type="button" className="cn-chat-quick__btn" onClick={startCuration}>
                    지금 기분에 맞는 장소 찾기
                  </button>
                  <button type="button" className="cn-chat-quick__btn" onClick={startCuration}>
                    오늘 하루 회복 여정 짜줘
                  </button>
                </div>
              ) : null}
              {m.showMood ? (
                <ImageMoodGrid
                  images={moodImages}
                  selectedId={m.moodSelected ?? null}
                  stepIndex={0}
                  onSelect={(id) => {
                    if (m.moodLocked) return;
                    handleMoodSelect(m.id, id);
                  }}
                />
              ) : null}
              {m.showChoice ? <MiniChoiceStep onConfirm={handleChoiceConfirm} /> : null}
              {m.kind === "loading" ? (
                <MeditativeLoader onDone={() => completeLoader(m.id)} />
              ) : null}
              {m.journeyResult ? (
                <JourneyResultCard
                  result={m.journeyResult}
                  profile={profile}
                  onAfterSave={() =>
                    pushMessage({
                      role: "ai",
                      text: "저장했어요. 회복 스테이 목록에서 맞춤 배너로도 이어질 수 있어요.",
                    })
                  }
                />
              ) : null}
              {m.showMindmap ? <MindmapInChat profile={profile} /> : null}
            </ChatMessage>
          );
        })}
      </div>

      <footer className="cn-chat-footer">
        <ClaudeChatInput onSendMessage={handleSend} />
      </footer>
    </div>
  );
}
