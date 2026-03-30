import "../styles/detail.css";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { collectionLabels, getCollection, getExperience } from "../data/siteData";
import AdaptiveImage from "../components/AdaptiveImage";
import EmptyState from "../components/EmptyState";

const REGION_STORIES = {
  고원산악권: {
    title: "고원의 고요함이 호흡을 바꿉니다",
    p1: "맑은 공기와 넓은 하늘 아래, 강원 고원의 자연은 압도적이면서도 포근합니다. 입실 첫날 오전, 아무것도 하지 않고 숲길만 걸어도 어깨가 내려가는 느낌을 받기 쉽습니다.",
    p2: "숫자로 증명하기보다 몸이 먼저 ‘여기는 다르다’고 알려 주는 공간입니다. 번잡한 일상에서 잠시 벗어나 산과 하늘에 둘러싸이면, 회복의 신호가 조용히 돌아오기 시작합니다.",
  },
  동해안권: {
    title: "파도 소리가 수면의 질을 바꿉니다",
    p1: "동해안을 따라 들려오는 규칙적인 파도 소리는 자연의 백색소음입니다. 뇌파를 알파파 상태로 유도하여 도심에서는 경험하기 어려운 깊은 수면을 돕습니다.",
    p2: "머무는 동안 매일 아침 해변을 걷는 것이 일과의 전부가 됩니다. 그것만으로도 충분합니다. 아무것도 더 하지 않아도 됩니다.",
  },
  내륙호수권: {
    title: "호수의 고요함이 생각을 비웁니다",
    p1: "잔잔한 수면 위로 새벽 안개가 피어오릅니다. 내륙 호수권의 이른 아침은 서울의 어느 카페보다 조용하고, 그 고요함이 하루 종일 몸 안에 남습니다.",
    p2: "물가를 따라 천천히 걸으면서 생각의 속도가 느려집니다. 아무것도 해결하려 하지 않아도 되는 이틀 — 그것이 이 곳이 드릴 수 있는 가장 큰 선물입니다.",
  },
  접경권: {
    title: "세상의 끝 같은 고요함에서 쉬어갑니다",
    p1: "사람의 손길이 닿지 않은 원시 자연. 접경권의 숲은 아직 개발이 최소화되어, 순수한 자연의 치유력을 그대로 경험할 수 있습니다.",
    p2: "스마트폰 신호가 희미해지는 이 곳에서, 의도하지 않은 디지털 디톡스가 시작됩니다. 처음 몇 시간은 낯설지만, 그 다음부터는 오래전 잊었던 고요함이 돌아옵니다.",
  },
};

function getStory(item) {
  return (
    REGION_STORIES[item.region] ?? {
      title: `${item.tags?.[0] ?? "자연"} 속에서 시작되는 회복`,
      p1: `강원도의 깨끗한 자연 환경 속에서, ${item.title}는 일상의 긴장을 서서히 내려놓을 수 있는 공간을 제공합니다. 숲의 향기와 맑은 공기, 그리고 계절의 변화가 몸과 마음의 회복을 자연스럽게 이끕니다.`,
      p2: "체류하는 동안 프로그램과 휴식이 번갈아 이어지며 일상의 속도에서 벗어난 리듬을 천천히 찾아갑니다. 컨디션노트와 연동하면 변화를 기록하고 다음 여정까지 자연스럽게 이어갈 수 있습니다.",
    }
  );
}

function getMeasurementLinked(item) {
  return item.measurementLinked !== false;
}

function getGoodForLines(item) {
  if (item.goodFor?.length) return item.goodFor;
  const lines = [];
  if (item.companion === "부모님과") {
    lines.push("부모님과 함께 식사·숙면 중심으로 천천히 쉬고 싶은 분");
  } else if (item.companion === "혼자") {
    lines.push("혼자만의 리듬으로 방해받지 않고 쉬고 싶은 분");
  } else if (item.companion === "아이와 함께") {
    lines.push("아이와 자연 체험을 함께 나누고 싶은 분");
  } else if (item.companion === "친구와") {
    lines.push("친구와 부담 없는 휴식 시간을 보내고 싶은 분");
  }
  if (item.tags?.length) {
    lines.push(`${item.tags.slice(0, 2).join("·")} 같은 분위기를 기대하는 분`);
  }
  return lines.length ? lines : ["자연 속에서 호흡과 긴장을 바꾸고 싶은 분"];
}

function getAvoidForLines(item, collectionType) {
  if (item.avoidFor?.length) return item.avoidFor;
  const lines = [];
  if (collectionType === "villages") {
    lines.push("당일 왕복만으로 끝내는 짧은 방문을 원하시는 경우(숙박·식사가 포함된 패키지입니다)");
  } else {
    lines.push("1박 이상 숙박과 식사까지 묶인 스테이를 원하시는 경우");
  }
  lines.push("고강도 야간 일정이나 음주 중심 여행을 기대하시는 경우");
  return lines;
}

function getCareJourney(collectionType, item) {
  const duration = collectionType === "villages" ? item.nights ?? "2일" : item.duration ?? "반나절";

  return [
    {
      no: "01",
      title: "입실 전 컨디션 측정",
      body: "컨디션노트 앱 또는 현장 측정기로 스트레스·수면·심박을 측정해 출발 상태를 기록합니다.",
    },
    {
      no: "02",
      title: "체험 중 지속 체크",
      body: `${duration} 동안 프로그램 전후 컨디션 변화를 짧게 기록해 개인 회복 패턴을 수집합니다.`,
    },
    {
      no: "03",
      title: "퇴실 후 변화 리포트",
      body: "입실 전후 기록을 비교해 어떤 활동이 회복에 기여했는지 그래프와 짧은 해설로 정리합니다.",
    },
    {
      no: "04",
      title: "다음 여정 자동 추천",
      body: "현재 상태를 기준으로 다음 치유마을·치유농장 코스를 다시 큐레이션해 재방문을 돕습니다.",
    },
  ];
}

function ExperienceDetailPage({ collectionType }) {
  const { slug } = useParams();
  const location = useLocation();
  const journeyContext = location.state?.journeyContext;
  const item = getExperience(collectionType, slug);
  const label = collectionLabels[collectionType];
  const collection = getCollection(collectionType);

  const [guests, setGuests] = useState(collectionType === "villages" ? 2 : 1);
  const [selectedDate, setSelectedDate] = useState(
    item?.bookingOptions?.defaultDate ?? "",
  );

  useEffect(() => {
    if (!item) return;
    setSelectedDate(item.bookingOptions.defaultDate);
    setGuests(collectionType === "villages" ? 2 : 1);
  }, [collectionType, item]);

  const galleryImages = useMemo(() => {
    if (!item) return [];
    const related = collection
      .filter((e) => e.slug !== item.slug)
      .map((e) => e.heroImage);
    return [
      item.heroImage,
      item.galleryImage || item.heroImage,
      related[0] || item.heroImage,
    ]
      .filter(Boolean)
      .slice(0, 3);
  }, [collection, item]);

  /** 탭「일정/진행 순서」용: villages는 시간표(steps)를 한 줄씩 펼침, key는 항상 고유 */
  const flowItems = useMemo(() => {
    if (!item) return [];
    if (collectionType === "farms") {
      return (item.flow ?? []).map((step, i) => ({
        key: `${item.slug}-flow-${i}`,
        title: step.title,
        body: step.body,
        idx: i + 1,
      }));
    }
    const it = item.itinerary ?? [];
    if (!it.length) return [];
    /** 첫째 날 steps만 보면 안 됨: 빈 배열이면 레거시 분기로 가며 day 객체가 그대로 렌더되어 글이 비어 보임 */
    const hasScheduledSteps = it.some(
      (d) => Array.isArray(d?.steps) && d.steps.length > 0,
    );
    if (hasScheduledSteps) {
      let n = 0;
      const rows = [];
      for (const d of it) {
        for (const s of d.steps ?? []) {
          n += 1;
          rows.push({
            key: `${item.slug}-${d.day ?? "d"}-${n}-${s.time ?? n}`,
            title: [s.time, s.title].filter(Boolean).join(" · "),
            body: s.body ?? "",
            idx: n,
          });
        }
      }
      return rows;
    }
    return it
      .filter((row) => row?.title != null || row?.body != null)
      .map((row, i) => ({
        key: `${item.slug}-day-${i}-${String(row.title ?? "row").slice(0, 48)}`,
        title: row.title ?? "",
        body: row.body ?? "",
        idx: i + 1,
      }));
  }, [collectionType, item]);

  const [detailTab, setDetailTab] = useState("flow");

  useEffect(() => {
    if (!item) return;
    setDetailTab(flowItems.length ? "flow" : "fit");
  }, [item?.slug, flowItems.length]);

  const keyFacts = useMemo(() => {
    if (!item) return [];
    const duration =
      collectionType === "villages" ? item.nights ?? "1박 2일" : item.duration ?? "—";
    const priceLabel = collectionType === "villages" ? "1인 1박 기준" : "1인 체험 기준";
    const measurement = getMeasurementLinked(item)
      ? "컨디션노트 측정 연계"
      : "앱 연계 미표시 · 문의 시 안내";
    return [
      { value: duration, label: collectionType === "villages" ? "체류" : "소요" },
      {
        value: `${item.price.toLocaleString("ko-KR")}원~`,
        label: priceLabel,
      },
      {
        value: `${item.rating} · 리뷰 ${item.reviewCount}`,
        label: "평점",
      },
      { value: measurement, label: "데이터" },
    ];
  }, [collectionType, item]);

  const totalPrice = useMemo(() => {
    if (!item) return 0;
    return item.price * guests;
  }, [item, guests]);

  if (!item) {
    return (
      <div className="page-shell">
        <EmptyState
          copy="프로그램을 찾을 수 없습니다."
          title="해당 프로그램을 찾을 수 없습니다."
          action={
            <Link className="button button--primary" to={label.route}>
              {label.plural} 목록으로 돌아가기
            </Link>
          }
        />
      </div>
    );
  }

  const story = getStory(item);
  const careJourney = getCareJourney(collectionType, item);
  const goodForLines = getGoodForLines(item);
  const avoidForLines = getAvoidForLines(item, collectionType);
  const summaryPoints =
    collectionType === "villages"
      ? [
          `${item.nights ?? "1박 2일"} 동안 숙박·식사·체험을 하나로 연결한 회복 패키지`,
          `${item.tags?.slice(0, 2).join(" · ") ?? "자연 기반 프로그램"} 중심으로 무리 없는 흐름 구성`,
          "입실 전후 측정 데이터로 회복 변화를 확인하고 다음 일정까지 추천",
        ]
      : [
          `${item.duration ?? "반나절"} 안에 끝나는 집중 회복 체험`,
          `${item.tags?.slice(0, 2).join(" · ") ?? "감각 회복 프로그램"} 중심의 짧고 선명한 구성`,
          "체험 전후 컨디션을 기록해 변화를 스스로 확인하고 다음 선택에 반영",
        ];

  const heroTagline =
    collectionType === "villages"
      ? `${item.region} 속 ${item.nights ?? "1박 2일"}, 온전한 쉼`
      : `${item.duration ?? "반나절"} 동안의 집중 회복 체험`;

  return (
    <div className="cn3-det">
      <section className="cn3-det__hero">
        <div className="cn3-det__hero-media">
          <AdaptiveImage
            alt={item.title}
            fallbackSrc={item.galleryImage || item.heroImage}
            src={item.heroImage}
          />
          <div className="cn3-det__hero-overlay" />
        </div>
        <div className="cn3-det__hero-body">
          <p className="cn3-det__hero-region">{item.region}</p>
          <h1 className="cn3-det__hero-title">{item.title}</h1>
          <p className="cn3-det__hero-tagline">&ldquo;{heroTagline}&rdquo;</p>
        </div>
      </section>

      <div className="cn3-det__metrics-strip shell">
        <div className="cn3-det__tags">
          <span className="cn3-det__tag cn3-det__tag--type">{label.badge}</span>
          <span className="cn3-det__tag cn3-det__tag--region">{item.region}</span>
          <span className="cn3-det__tag cn3-det__tag--duration">
            {collectionType === "villages" ? item.nights : item.duration}
          </span>
          {item.tags?.slice(0, 2).map((t) => (
            <span key={t} className="cn3-det__tag cn3-det__tag--duration">
              {t}
            </span>
          ))}
        </div>
        <div className="cn3-det__key-nums">
          {keyFacts.map((n) => (
            <div className="cn3-det__key-num" key={n.label}>
              <strong>{n.value}</strong>
              <span>{n.label}</span>
            </div>
          ))}
        </div>
      </div>

      {journeyContext ? (
        <div className="cn3-det__journey-from-explore shell">
          <p className="cn3-det__eyebrow">큐레이션에서</p>
          <h2 className="cn3-det__journey-from-explore-title">이 여정이 지금 조건에 닿는 이유</h2>
          <p className="cn3-det__journey-from-explore-sum">{journeyContext.profileSummary}</p>
          <ul className="cn3-det__journey-from-explore-list">
            {(journeyContext.matchReasons || []).map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="cn3-det__layout shell">
        <main className="cn3-det__main">
          <section className="cn3-det__section cn3-det__section--summary">
            <span className="cn3-det__eyebrow">프로그램 한눈에 보기</span>
            <h2 className="cn3-det__section-title">이 여정이 당신에게 맞는 이유</h2>
            <ul className="cn3-det__summary-list">
              {summaryPoints.map((point) => (
                <li className="cn3-det__summary-item" key={point}>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section className="cn3-det__section">
            <span className="cn3-det__eyebrow">이 공간에 대하여</span>
            <h2 className="cn3-det__section-title">{story.title}</h2>
            <div className="cn3-det__story-body">
              <p>{story.p1}</p>
              <p>{story.p2}</p>
            </div>

            <div className="cn3-det__gallery">
              {galleryImages.map((src, i) => (
                <div className="cn3-det__gallery-img" key={i}>
                  <AdaptiveImage
                    alt={`${item.title} 공간 ${i + 1}`}
                    fallbackSrc={item.heroImage}
                    src={src}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>

          <section
            aria-label="일정 및 맞춤 안내"
            className="cn3-det__section cn3-det__section--tabs"
          >
            <span className="cn3-det__eyebrow">일정과 맞춤 정보</span>
            <h2 className="cn3-det__section-title">
              {collectionType === "villages"
                ? "일정, 추천 대상, 참고 사항"
                : "진행 순서, 추천 대상, 참고 사항"}
            </h2>
            <div aria-label="상세 탭" className="cn3-det__tabs" role="tablist">
              {flowItems.length > 0 ? (
                <button
                  aria-controls="det-panel-flow"
                  aria-selected={detailTab === "flow"}
                  className={`cn3-det__tab${detailTab === "flow" ? " cn3-det__tab--on" : ""}`}
                  id="det-tab-flow"
                  onClick={() => setDetailTab("flow")}
                  role="tab"
                  type="button"
                >
                  {collectionType === "villages" ? "일정" : "진행 순서"}
                </button>
              ) : null}
              <button
                aria-controls="det-panel-fit"
                aria-selected={detailTab === "fit"}
                className={`cn3-det__tab${detailTab === "fit" ? " cn3-det__tab--on" : ""}`}
                id="det-tab-fit"
                onClick={() => setDetailTab("fit")}
                role="tab"
                type="button"
              >
                이런 분께
              </button>
              <button
                aria-controls="det-panel-caution"
                aria-selected={detailTab === "caution"}
                className={`cn3-det__tab${detailTab === "caution" ? " cn3-det__tab--on" : ""}`}
                id="det-tab-caution"
                onClick={() => setDetailTab("caution")}
                role="tab"
                type="button"
              >
                참고 사항
              </button>
            </div>
            <div className="cn3-det__tab-panels">
              {detailTab === "flow" && flowItems.length > 0 ? (
                <div
                  aria-labelledby="det-tab-flow"
                  className="cn3-det__tab-panel"
                  id="det-panel-flow"
                  role="tabpanel"
                >
                  <div className="cn3-det__flow">
                    {flowItems.map((step) => (
                      <div className="cn3-det__flow-step" key={step.key}>
                        <div className="cn3-det__flow-idx" aria-hidden="true">
                          {String(step.idx).padStart(2, "0")}
                        </div>
                        <div className="cn3-det__flow-content">
                          <p className="cn3-det__flow-title">{step.title}</p>
                          <p className="cn3-det__flow-body">{step.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {detailTab === "fit" ? (
                <div
                  aria-labelledby="det-tab-fit"
                  className="cn3-det__tab-panel"
                  id="det-panel-fit"
                  role="tabpanel"
                >
                  <ul className="cn3-det__tab-list">
                    {goodForLines.map((line, i) => (
                      <li key={`${i}-${line}`}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {detailTab === "caution" ? (
                <div
                  aria-labelledby="det-tab-caution"
                  className="cn3-det__tab-panel"
                  id="det-panel-caution"
                  role="tabpanel"
                >
                  <ul className="cn3-det__tab-list cn3-det__tab-list--caution">
                    {avoidForLines.map((line, i) => (
                      <li key={`${i}-${line}`}>{line}</li>
                    ))}
                  </ul>
                  <p className="cn3-det__tab-footnote">
                    위 항목은 일반적인 안내이며, 개별 건강 상태는 의료 전문가와 상담해 주세요.
                  </p>
                </div>
              ) : null}
            </div>
          </section>

          <section className="cn3-det__section">
            <span className="cn3-det__eyebrow">앱 연동 회복 루프</span>
            <h2 className="cn3-det__section-title">방문 이후까지 이어지는 컨디션노트 여정</h2>
            <ol className="cn3-det__journey-grid">
              {careJourney.map((step) => (
                <li className="cn3-det__journey-card" key={step.no}>
                  <span className="cn3-det__journey-no">{step.no}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="cn3-det__journey-loop">
              컨디션노트 소개 → 예약 → 현장 체험과 측정 → 일상 관리 → 재방문 추천
            </p>
          </section>

          {(item.inclusions?.length > 0 || item.exclusions?.length > 0) ? (
            <section className="cn3-det__section">
              <span className="cn3-det__eyebrow">포함 / 불포함</span>
              <h2 className="cn3-det__section-title">포함 / 불포함</h2>
              <div className="cn3-det__checks-grid">
                {item.inclusions?.length > 0 ? (
                  <div className="cn3-det__check-group">
                    <h3>포함 사항</h3>
                    <ul className="cn3-det__check-list">
                      {item.inclusions.map((inc) => (
                        <li className="cn3-det__check-item" key={inc}>
                          <em className="cn3-det__check-icon cn3-det__check-icon--yes" aria-hidden="true">✓</em>
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {item.exclusions?.length > 0 ? (
                  <div className="cn3-det__check-group">
                    <h3>불포함 사항</h3>
                    <ul className="cn3-det__check-list">
                      {item.exclusions.map((exc) => (
                        <li className="cn3-det__check-item" key={exc}>
                          <em className="cn3-det__check-icon cn3-det__check-icon--no" aria-hidden="true">×</em>
                          {exc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {(item.accommodation || item.meals) ? (
            <section className="cn3-det__section">
              <span className="cn3-det__eyebrow">숙소 / 식사 안내</span>
              <h2 className="cn3-det__section-title">숙소 / 식사 안내</h2>
              <div className="cn3-det__checks-grid">
                {item.accommodation ? (
                  <div className="cn3-det__check-group">
                    <h3>숙소</h3>
                    <p className="cn3-det__info-type">{item.accommodation.type}</p>
                    <ul className="cn3-det__check-list">
                      {item.accommodation.amenities.map((a) => (
                        <li className="cn3-det__check-item" key={a}>
                          <em className="cn3-det__check-icon cn3-det__check-icon--yes" aria-hidden="true">✓</em>
                          {a}
                        </li>
                      ))}
                    </ul>
                    {item.accommodation.note && (
                      <p className="cn3-det__tab-footnote">{item.accommodation.note}</p>
                    )}
                  </div>
                ) : null}
                {item.meals ? (
                  <div className="cn3-det__check-group">
                    <h3>식사</h3>
                    <p className="cn3-det__info-summary">{item.meals.summary}</p>
                    {item.meals.note && (
                      <p className="cn3-det__tab-footnote">{item.meals.note}</p>
                    )}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {(item.address || item.phone || item.preparations?.length > 0) ? (
            <section className="cn3-det__section">
              <span className="cn3-det__eyebrow">운영처 정보 / 준비사항</span>
              <h2 className="cn3-det__section-title">운영처 정보 / 준비사항</h2>
              <div className="cn3-det__operator-card">
                {item.address && (
                  <div className="cn3-det__operator-row">
                    <span className="cn3-det__operator-icon" aria-hidden="true">📍</span>
                    <span>{item.address}</span>
                  </div>
                )}
                {item.phone && (
                  <div className="cn3-det__operator-row">
                    <span className="cn3-det__operator-icon" aria-hidden="true">📞</span>
                    <span>{item.phone}</span>
                  </div>
                )}
                {item.checkin && (
                  <div className="cn3-det__operator-row">
                    <span className="cn3-det__operator-icon" aria-hidden="true">🕐</span>
                    <span>체크인 {item.checkin} / 체크아웃 {item.checkout}</span>
                  </div>
                )}
                {item.parking !== undefined && (
                  <div className="cn3-det__operator-row">
                    <span className="cn3-det__operator-icon" aria-hidden="true">🚗</span>
                    <span>{item.parking ? "주차 가능" : "주차 불가"}</span>
                  </div>
                )}
              </div>
              {item.preparations?.length > 0 && (
                <div className="cn3-det__operator-card" style={{ marginTop: "1rem" }}>
                  <h3 className="cn3-det__operator-sub">준비물</h3>
                  <ul className="cn3-det__tab-list">
                    {item.preparations.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <p className="cn3-det__tab-footnote">예약 후 운영처에서 세부 일정과 준비사항을 다시 안내드립니다.</p>
                </div>
              )}
            </section>
          ) : null}

          {item.itinerary?.some((d) => Array.isArray(d?.steps) && d.steps.length > 0) ? (
            <section className="cn3-det__section">
              <span className="cn3-det__eyebrow">상세 일정</span>
              <h2 className="cn3-det__section-title">일정표</h2>
              <div className="cn3-det__timeline-days">
                {item.itinerary.map((day) => (
                  <div className="cn3-det__timeline-day" key={day.day}>
                    <div className="cn3-det__timeline-day-header">
                      <span className="cn3-det__timeline-day-badge">{day.day}</span>
                      <span className="cn3-det__timeline-day-label">{day.label}</span>
                    </div>
                    <div className="cn3-det__timeline-steps">
                      {day.steps.map((step, si) => (
                        <div className="cn3-det__timeline-step" key={`${day.day}-${si}-${step.time}`}>
                          <span className="cn3-det__timeline-time">{step.time}</span>
                          <div className="cn3-det__timeline-dot" aria-hidden="true" />
                          <div className="cn3-det__timeline-content">
                            <p className="cn3-det__timeline-title">{step.title}</p>
                            <p className="cn3-det__timeline-body">{step.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {item.reviews?.length > 0 ? (
            <section className="cn3-det__section">
              <span className="cn3-det__eyebrow">참여 후기</span>
              <h2 className="cn3-det__section-title">직접 다녀온 분들의 이야기</h2>
              <div className="cn3-det__reviews-list">
                {item.reviews.map((review) => (
                  <article className="cn3-det__review" key={review.author}>
                    <span className="cn3-det__review-open-quote" aria-hidden="true">
                      &ldquo;
                    </span>
                    <p className="cn3-det__review-body">{review.body}</p>
                    <footer className="cn3-det__review-footer">
                      <span className="cn3-det__review-dot" aria-hidden="true" />
                      <span className="cn3-det__review-author">{review.author}</span>
                    </footer>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </main>

        <aside className="cn3-det__sidebar">
          <div className="cn3-booking">
            <span className="cn3-booking__price-label">
              {collectionType === "villages" ? "1박 기준" : "참가비"}
            </span>
            <strong className="cn3-booking__price-amount">
              {item.price.toLocaleString("ko-KR")}원
            </strong>
            <span className="cn3-booking__price-unit">부가세 포함</span>

            <div className="cn3-booking__divider" />

            <div className="cn3-booking__field">
              <label htmlFor="det-date">
                {collectionType === "villages" ? "입실 날짜" : "체험 날짜"}
              </label>
              <select
                id="det-date"
                className="cn3-booking__select"
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              >
                {item.bookingOptions.dates.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="cn3-booking__field">
              <label>인원</label>
              <div className="cn3-booking__stepper">
                <button
                  className="cn3-booking__stepper-btn"
                  disabled={guests <= 1}
                  onClick={() => setGuests((v) => Math.max(1, v - 1))}
                  type="button"
                  aria-label="인원 감소"
                >
                  −
                </button>
                <span className="cn3-booking__stepper-count">{guests}명</span>
                <button
                  className="cn3-booking__stepper-btn"
                  disabled={guests >= item.bookingOptions.maxGuests}
                  onClick={() => setGuests((v) => Math.min(item.bookingOptions.maxGuests, v + 1))}
                  type="button"
                  aria-label="인원 증가"
                >
                  +
                </button>
              </div>
            </div>

            <div className="cn3-booking__subtotal">
              <span className="cn3-booking__subtotal-label">
                {item.price.toLocaleString("ko-KR")}원 × {guests}명
              </span>
              <span className="cn3-booking__subtotal-amount">
                {totalPrice.toLocaleString("ko-KR")}원
              </span>
            </div>

            <Link
              className="cn3-booking__reserve"
              state={{ guests, selectedDate }}
              to={`/checkout/${collectionType}/${item.slug}`}
            >
              예약하기
            </Link>
            <button className="cn3-booking__inquiry" type="button">
              일정 문의
            </button>

            <div className="cn3-booking__trust">
              <div className="cn3-booking__trust-item">
                <span className="cn3-booking__trust-dot" aria-hidden="true" />
                강원도 공식 인증 파트너
              </div>
              <div className="cn3-booking__trust-item">
                <span className="cn3-booking__trust-dot" aria-hidden="true" />
                {getMeasurementLinked(item)
                  ? "컨디션노트 측정·기록 연동 가능"
                  : "앱 연계는 문의 시 개별 안내"}
              </div>
              <div className="cn3-booking__trust-item">
                <span className="cn3-booking__trust-dot" aria-hidden="true" />
                무료 취소 (7일 전까지)
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="det-booking">
        <div className="det-booking__inner shell">
          <div>
            <p className="det-booking__name">{item.title}</p>
            <p className="det-booking__price">{item.price.toLocaleString("ko-KR")}원부터</p>
          </div>
          <div className="det-booking__actions">
            <button className="det-booking__inquiry" type="button">
              문의
            </button>
            <Link
              className="det-booking__reserve"
              state={{ guests, selectedDate }}
              to={`/checkout/${collectionType}/${item.slug}`}
            >
              예약하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceDetailPage;
