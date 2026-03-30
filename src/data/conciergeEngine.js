/**
 * 대화·자유 입력에서 추출한 여정 프로필 → 점수·추천 이유.
 * 실 LLM 없음; 키워드·칩 id 기반.
 */

export const GOAL_CHIPS = [
  { id: "sleep", label: "숙면·수면 리듬", keywords: ["숙면", "수면", "잠", "불면", "피로"] },
  { id: "stress", label: "스트레스 완화", keywords: ["스트레스", "긴장", "번아웃", "압박"] },
  { id: "quiet", label: "자연 속 고요", keywords: ["고요", "조용", "숲", "쉼", "멍"] },
  { id: "family", label: "가족·함께", keywords: ["가족", "아이", "부모", "함께"] },
  { id: "detox", label: "디지털 디톡스", keywords: ["디톡스", "핸드폰", "스마트폰", "화면"] },
  { id: "bodymind", label: "몸과 마음 정리", keywords: ["몸", "마음", "호흡", "명상", "요가"] },
];

export const DURATION_CHIPS = [
  { id: "day", label: "당일·반나절" },
  { id: "1n2d", label: "1박 2일" },
  { id: "2n3d", label: "2박 3일" },
  { id: "long", label: "4박 이상" },
];

export const COMPANION_CHIPS = [
  { id: "solo", label: "혼자" },
  { id: "couple", label: "파트너·커플" },
  { id: "family", label: "가족" },
  { id: "parents", label: "부모님 동행" },
];

export const ENV_CHIPS = [
  { id: "forest", label: "숲", keywords: ["숲", "솔", "피톤"] },
  { id: "sea", label: "바다·동해", keywords: ["바다", "해", "파도", "해변"] },
  { id: "mountain", label: "산·고원", keywords: ["산", "고원", "해발"] },
  { id: "farm", label: "농장·밭", keywords: ["농장", "허브", "밭"] },
  { id: "indoor", label: "실내·온돌 중심", keywords: ["실내", "온돌", "객실"] },
];

export const INTENSITY_CHIPS = [
  { id: "calm", label: "아주 조용함" },
  { id: "balance", label: "휴식·체험 균형" },
  { id: "active", label: "체험을 조금 더" },
];

export const MEASURE_CHIPS = [
  { id: "need", label: "측정·기록 꼭 활용" },
  { id: "nice", label: "있으면 좋음" },
  { id: "any", label: "상관없음" },
];

export function emptyProfile() {
  return {
    goals: [],
    duration: null,
    companion: null,
    environment: [],
    intensity: null,
    measurement: null,
    notes: [],
    moodId: null,
  };
}

/** Step1 무드 이미지 → 목적·환경 칩 */
const MOOD_PROFILE_MAP = {
  "misty-forest": { goals: ["quiet"], environment: ["forest"] },
  "wide-field": { goals: ["quiet"], environment: ["farm"] },
  "quiet-valley": { goals: ["quiet"], environment: ["mountain"] },
  "coastal-cliff": { goals: ["stress"], environment: ["sea"] },
  "old-village": { goals: ["quiet"], environment: ["indoor"] },
  "empty-field": { goals: ["detox"], environment: ["farm"] },
};

export function applyMoodSelection(profile, moodId) {
  let next = { ...profile, moodId };
  const m = MOOD_PROFILE_MAP[moodId];
  if (!m) return next;
  for (const g of m.goals) {
    next = setChip(next, "goal", g);
  }
  for (const e of m.environment) {
    next = setChip(next, "environment", e);
  }
  return next;
}

/**
 * Step2 리듬·동행 (채팅 전용 값)
 * rhythm: "calm" | "active"
 * companion: "solo" | "couple" | "family"
 */
export function applyRhythmAndCompanion(profile, { rhythm, companion }) {
  let next = { ...profile };
  if (rhythm === "calm") next = setChip(next, "intensity", "calm");
  else if (rhythm === "active") next = setChip(next, "intensity", "active");
  if (companion === "solo") next = setChip(next, "companion", "solo");
  else if (companion === "couple") next = setChip(next, "companion", "couple");
  else if (companion === "family") next = setChip(next, "companion", "family");
  if (!next.duration) next = setChip(next, "duration", "1n2d");
  return next;
}

export function ingestFreeText(profile, text) {
  const t = (text || "").toLowerCase().trim();
  if (!t) return profile;
  const next = { ...profile, notes: [...profile.notes, text.slice(0, 500)] };

  for (const g of GOAL_CHIPS) {
    if (g.keywords.some((k) => t.includes(k)) && !next.goals.includes(g.id)) {
      next.goals = [...next.goals, g.id];
    }
  }
  for (const e of ENV_CHIPS) {
    if (e.keywords.some((k) => t.includes(k)) && !next.environment.includes(e.id)) {
      next.environment = [...next.environment, e.id];
    }
  }
  if (/(당일|반나절|하루)/.test(text)) next.duration = "day";
  if (/(1박|일박이일)/.test(text)) next.duration = "1n2d";
  if (/(2박|이박삼일)/.test(text)) next.duration = "2n3d";
  if (/(4박|일주|길게|오래)/.test(text)) next.duration = "long";
  if (/(혼자|솔로)/.test(text)) next.companion = "solo";
  if (/(커플|파트너|연인)/.test(text)) next.companion = "couple";
  if (/(가족|아이)/.test(text)) next.companion = "family";
  if (/(부모|어머니|아버지)/.test(text)) next.companion = "parents";

  return next;
}

export function setChip(profile, dimension, value) {
  const next = { ...profile };
  if (dimension === "goal") {
    if (!next.goals.includes(value)) next.goals = [...next.goals, value];
  } else if (dimension === "duration") next.duration = value;
  else if (dimension === "companion") next.companion = value;
  else if (dimension === "environment") {
    if (!next.environment.includes(value)) next.environment = [...next.environment, value];
  } else if (dimension === "intensity") next.intensity = value;
  else if (dimension === "measurement") next.measurement = value;
  return next;
}

function labelForGoal(id) {
  return GOAL_CHIPS.find((g) => g.id === id)?.label ?? id;
}

function labelForDuration(id) {
  return DURATION_CHIPS.find((d) => d.id === id)?.label ?? id;
}

function labelForCompanion(id) {
  return COMPANION_CHIPS.find((c) => c.id === id)?.label ?? id;
}

function labelForEnv(id) {
  return ENV_CHIPS.find((e) => e.id === id)?.label ?? id;
}

function labelForIntensity(id) {
  return INTENSITY_CHIPS.find((i) => i.id === id)?.label ?? id;
}

function labelForMeasure(id) {
  return MEASURE_CHIPS.find((m) => m.id === id)?.label ?? id;
}

export function buildMindmapNodes(profile) {
  const center = { id: "me", label: "지금 필요한 회복", children: [] };
  if (profile.goals.length) {
    center.children.push({
      id: "purpose",
      label: "목적",
      leaves: profile.goals.map((id) => ({ id: `g-${id}`, label: labelForGoal(id) })),
    });
  }
  if (profile.duration) {
    center.children.push({
      id: "duration",
      label: "머무름",
      leaves: [{ id: "d", label: labelForDuration(profile.duration) }],
    });
  }
  if (profile.companion) {
    center.children.push({
      id: "companion",
      label: "동행",
      leaves: [{ id: "c", label: labelForCompanion(profile.companion) }],
    });
  }
  if (profile.environment.length) {
    center.children.push({
      id: "env",
      label: "환경",
      leaves: profile.environment.map((id) => ({ id: `e-${id}`, label: labelForEnv(id) })),
    });
  }
  if (profile.intensity) {
    center.children.push({
      id: "intensity",
      label: "강도",
      leaves: [{ id: "i", label: labelForIntensity(profile.intensity) }],
    });
  }
  if (profile.measurement) {
    center.children.push({
      id: "measure",
      label: "데이터",
      leaves: [{ id: "m", label: labelForMeasure(profile.measurement) }],
    });
  }
  return center;
}

export function summarizeProfile(profile) {
  const parts = [];
  if (profile.goals.length) parts.push(`목적: ${profile.goals.map(labelForGoal).join(" · ")}`);
  if (profile.duration) parts.push(labelForDuration(profile.duration));
  if (profile.companion) parts.push(labelForCompanion(profile.companion));
  if (profile.environment.length) parts.push(`환경: ${profile.environment.map(labelForEnv).join(" · ")}`);
  if (profile.intensity) parts.push(labelForIntensity(profile.intensity));
  if (profile.measurement) parts.push(labelForMeasure(profile.measurement));
  return parts.length ? parts.join(" · ") : "아직 조건을 덜 골랐어요. 대화나 칩으로 조금만 더 알려 주세요.";
}

function itemText(item, collectionType) {
  const tags = (item.tags || []).join(" ");
  return `${item.description || ""} ${tags} ${item.title} ${item.companion || ""} ${collectionType === "villages" ? item.nights || "" : item.duration || ""}`;
}

export function scoreExperience(item, collectionType, profile) {
  const desc = itemText(item, collectionType);
  const reasons = [];
  let score = 0;

  const add = (n, msg) => {
    score += n;
    if (msg && !reasons.includes(msg)) reasons.push(msg);
  };

  for (const gid of profile.goals) {
    if (gid === "sleep" && /수면|숙면|온돌|명상|해변|족욕/.test(desc)) {
      add(3, "숙면·야간 리듬을 돕는 구성이 카피·태그와 맞닿아 있어요.");
    }
    if (gid === "stress" && /숲|명상|호흡|피톤|차담|침묵/.test(desc)) {
      add(3, "스트레스 완화에 자주 쓰이는 숲·호흡·명상 요소가 있습니다.");
    }
    if (gid === "quiet" && /숲|고요|침묵|조용|해변/.test(desc)) {
      add(2, "조용한 자연 동선이나 낮은 자극 흐름이 보입니다.");
    }
    if (gid === "family" && /가족|부모|약선|아이/.test(desc)) {
      add(3, "가족·부모님 동선이나 식사 구성이 강조되어 있어요.");
    }
    if (gid === "detox" && /숲|산책|자연|디지털/.test(desc)) {
      add(2, "화면에서 잠시 벗어나 자연에 몰입하기 좋은 구성입니다.");
    }
    if (gid === "bodymind" && /요가|명상|약선|체험|족욕/.test(desc)) {
      add(2, "몸의 감각과 식사·휴식이 함께 이어지는 편입니다.");
    }
  }

  if (profile.duration === "day" && collectionType === "farms") {
    add(4, "당일·반나절 일정을 찾고 계셔서 치유농장형 코스에 가깝습니다.");
  }
  if (profile.duration && profile.duration !== "day" && collectionType === "villages") {
    add(3, "체류형 일정을 원하시는 만큼 숙박이 포함된 치유마을 후보에 가깝습니다.");
  }

  if (profile.companion === "parents" && /부모|약선/.test(desc)) {
    add(2, "부모님 동반 여정에 어울리는 식사·동선 설명이 있습니다.");
  }
  if (profile.companion === "solo" && /혼자/.test(item.companion || "")) {
    add(1, "혼자 방문하기 편한 동선으로 소개된 프로그램입니다.");
  }

  for (const eid of profile.environment) {
    if (eid === "forest" && /숲|솔|피톤|산책/.test(desc)) add(2, "숲·산책 요소가 잘 드러나 있어요.");
    if (eid === "sea" && /바다|해|해변|동해/.test(desc)) add(2, "바다·해안 감각과 연결된 설명이 있습니다.");
    if (eid === "mountain" && /고원|산|별|해발/.test(desc)) add(2, "고원·산의 리듬을 살린 구성입니다.");
    if (eid === "farm" && /농장|허브|재배/.test(desc)) add(2, "농장·수작업·허브 등 촉각적 회복에 가깝습니다.");
    if (eid === "indoor" && /온돌|객실|실내|황토/.test(desc)) add(1, "실내·숙면 환경이 강조되어 있어요.");
  }

  if (profile.intensity === "calm" && /명상|족욕|차담|휴식/.test(desc)) {
    add(2, "조용한 휴식 중심 톤과 맞습니다.");
  }
  if (profile.intensity === "active" && /요가|산책|체험|트레킹/.test(desc)) {
    add(2, "가벼운 활동·체험이 프로그램에 포함되어 있어요.");
  }

  if (profile.measurement === "need" && item.measurementLinked !== false) {
    add(2, "컨디션노트 측정·기록 연계가 가능한 프로그램입니다.");
  }

  if (reasons.length === 0 && score === 0) {
    add(1, "전체 카탈로그 중에서도 여정 톤이 중립적으로 어울릴 수 있어요.");
  }

  return { score, reasons };
}

export function rankAll(villages, farms, profile) {
  const v = villages.map((item) => {
    const { score, reasons } = scoreExperience(item, "villages", profile);
    return { item, collectionType: "villages", score, reasons };
  });
  const f = farms.map((item) => {
    const { score, reasons } = scoreExperience(item, "farms", profile);
    return { item, collectionType: "farms", score, reasons };
  });
  v.sort((a, b) => b.score - a.score);
  f.sort((a, b) => b.score - a.score);
  return { villages: v, farms: f };
}

const TITLE_PRESETS = [
  { test: (p) => p.environment?.includes("forest"), title: "고요한 숲에서 나를 되찾는 여행" },
  { test: (p) => p.environment?.includes("sea"), title: "바닷바람에 마음을 맡기는 여정" },
  { test: (p) => p.environment?.includes("mountain"), title: "고원의 빛 속에서 천천히 숨 쉬기" },
  { test: (p) => p.environment?.includes("farm"), title: "흙과 햇살에 닿는 느린 하루" },
  { test: (p) => p.goals?.includes("sleep"), title: "깊은 잠으로 이어지는 회복 스테이" },
  { test: (p) => p.goals?.includes("stress"), title: "스트레스를 내려놓는 작은 휴식" },
  { test: (p) => p.intensity === "calm", title: "조용한 리듬으로 이어지는 치유 시간" },
  { test: () => true, title: "당신을 위한 맞춤 치유 여정" },
];

export function deriveTitle(profile) {
  const hit = TITLE_PRESETS.find((row) => row.test(profile));
  return hit ? hit.title : "당신을 위한 맞춤 치유 여정";
}

function dayCountFromDuration(d) {
  if (d === "day") return 1;
  if (d === "1n2d") return 2;
  if (d === "2n3d") return 3;
  if (d === "long") return 3;
  return 3;
}

function defaultSlot(label, text) {
  return { slot: label, text };
}

export function buildTimeline(profile, mainSpot, collectionType) {
  const days = dayCountFromDuration(profile.duration || "1n2d");
  const itinerary = mainSpot?.itinerary;
  const tags = (mainSpot?.tags || []).join(" · ");

  const fromItinerary = (dayIndex) => {
    const block = itinerary?.[dayIndex];
    if (!block) return null;
    return [
      defaultSlot("오전·오후", block.body?.slice(0, 120) || block.title),
    ];
  };

  const genericDay = (n, phase) => {
    const base = mainSpot?.title?.slice(0, 24) || "치유 프로그램";
    if (phase === 0) {
      return [
        defaultSlot("오전", `도착 · 웰컴 티와 가벼운 오리엔테이션 — ${tags || "자연·식사"}`),
        defaultSlot("오후", `${base} 숲길 또는 산책, 저녁은 제철 식탁`),
        defaultSlot("저녁", "온돌·명상 또는 족욕으로 하루를 마무리"),
      ];
    }
    if (phase === 1) {
      return [
        defaultSlot("오전", "느린 아침 · 호흡·명상 또는 가벼운 체험"),
        defaultSlot("오후", "자유 산책 또는 공방·카페 연계 추천"),
        defaultSlot("저녁", "조용한 휴식과 수면 리듬 정리"),
      ];
    }
    return [
      defaultSlot("오전", "아침 식사 후 컨디션 체크"),
      defaultSlot("오후", "체크아웃 전 가벼운 산책"),
    ];
  };

  const out = [];
  for (let i = 0; i < days; i += 1) {
    const items = fromItinerary(i) || genericDay(i + 1, i);
    out.push({ day: i + 1, items });
  }

  if (collectionType === "farms" && days === 1) {
    out[0] = {
      day: 1,
      items: [
        defaultSlot("오전", mainSpot?.flow?.[0]?.title ? `${mainSpot.flow[0].title} 체험` : "체험 프로그램 입문"),
        defaultSlot("오후", mainSpot?.flow?.[1]?.title || "자연 산책 · 티타임"),
      ],
    };
  }

  return out;
}

const NEARBY_FALLBACK_IMG =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80";

export function buildNearby(profile, mainSpot) {
  const region = mainSpot?.region || "강원도";
  return [
    {
      id: "cafe",
      name: "숲향 카페",
      category: "감성 카페",
      image: NEARBY_FALLBACK_IMG,
      blurb: `${region} 근처, 창가 자리와 핸드드립`,
    },
    {
      id: "walk",
      name: "이름 없는 산책로",
      category: "산책",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
      blurb: "사람 적은 오솔길 · 40분 코스",
    },
    {
      id: "craft",
      name: "토굴 공방",
      category: "공방",
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80",
      blurb: "도자기·천연 염색 체험",
    },
    {
      id: "gallery",
      name: "로컬 갤러리",
      category: "전시",
      image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&q=80",
      blurb: "지역 작가 작품과 북카페",
    },
  ];
}

export function buildJourneyResult(profile, ranked) {
  const mainRow = ranked.villages[0] ?? null;
  const mainSpot = mainRow?.item ?? null;
  const collectionType = "villages";
  const title = deriveTitle(profile);
  const timeline = buildTimeline(profile, mainSpot, collectionType);
  const nearby = buildNearby(profile, mainSpot);

  return {
    title,
    mainSpot,
    collectionType,
    timeline,
    nearby,
    rankedSnapshot: ranked,
  };
}

const STORAGE_KEY = "cn-stay-concierge";

export function saveCuration(payload) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...payload, savedAt: Date.now() }));
  } catch {
    /* ignore */
  }
}

export function loadCuration() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearCuration() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
