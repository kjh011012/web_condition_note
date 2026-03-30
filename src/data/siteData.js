const _base = import.meta.env.BASE_URL.replace(/\/$/, "");
function img(path) { return `${_base}${path}`; }

export const primaryNav = [
  { label: "회복 스테이", to: "/villages" },
  { label: "회복 리포트", to: "/archive" },
];

export const footerColumns = [
  {
    title: "프로그램",
    links: [{ label: "치유마을", to: "/villages" }],
  },
  {
    title: "도움말",
    links: [
      { label: "고객센터", to: "/support" },
      { label: "FAQ", to: "/support/faq" },
      { label: "취소 및 환불", to: "/support/refund" },
      { label: "개인정보 처리방침", to: "/support/privacy" },
    ],
  },
  {
    title: "나의 여정",
    links: [
      { label: "예약 확인", to: "/my/reservations" },
      { label: "문의 내역", to: "/my/inquiries" },
      { label: "웰니스 아카이브", to: "/archive" },
    ],
  },
];

export const collectionLabels = {
  villages: {
    singular: "치유마을",
    plural: "치유마을",
    badge: "STAY",
    route: "/villages",
    cta: "마을 보기",
  },
  farms: {
    singular: "치유농장",
    plural: "치유농장",
    badge: "EXPERIENCE",
    route: "/farms",
    cta: "체험 보기",
  },
};

export const filters = {
  regions: ["전체", "횡성", "동해안권", "고원산악권", "내륙호수권", "접경권"],
  themes: ["전체", "약선 요리", "명상", "숲길 산책", "족욕", "다도", "허브"],
  companions: ["전체", "부모님과", "혼자", "아이와 함께", "친구와"],
  stayLengths: ["전체", "1박 2일", "2박 3일", "4박 이상"],
  budgets: ["전체", "15만원 이하", "15~25만원", "25만원 이상"],
  measurement: ["전체", "측정 연계 희망", "상관없음"],
  sorts: ["추천순", "가격 낮은순", "리뷰 많은순"],
};

export const villages = [
  {
    slug: "hoengseong-goradei",
    title: "고라데이 치유마을 숲 치유 스테이",
    region: "횡성",
    companion: "혼자",
    price: 165000,
    rating: 4.85,
    reviewCount: 48,
    nights: "1박 2일",
    heroImage: img("/images/villages/goradei-village.jpg"),
    galleryImage: img("/images/villages/goradei-village.jpg"),
    description:
      "숲 속 건강 호흡법·싱잉볼·족욕 등이 어우러진 힐링 산책형 프로그램. 횡성군 청일면 봉명로 375-1. 문의 010-9435-0053.",
    tags: ["숲 치유", "싱잉볼", "족욕"],
    inclusions: ["숙박", "숲 프로그램", "간식", "현장 안내"],
    exclusions: ["개인 교통", "개인 보험"],
    itinerary: [
      {
        title: "DAY 1. 숲으로",
        body: "오리엔테이션 후 건강 호흡과 숲길 이동, 싱잉볼·족욕으로 하루를 마무리합니다.",
      },
      {
        title: "DAY 2. 여운",
        body: "가벼운 산책과 브런치 후 체크아웃합니다.",
      },
    ],
    reassurance: [
      { title: "지역 전문 운영", body: "청일면 일대 숲 코스를 오래 안내해 온 마을 프로그램입니다." },
    ],
    reviews: [
      { author: "한수진", body: "숲에서의 호흡과 족욕이 부담 없이 이어져 휴식에 잘 맞았어요." },
    ],
    bookingOptions: {
      dates: ["4월 19일 토요일", "4월 26일 토요일"],
      defaultDate: "4월 19일 토요일",
      maxGuests: 4,
    },
  },
  {
    slug: "hoengseong-nodaji",
    title: "춘당 노다지 치유마을 아로마·황토 휴식",
    region: "횡성",
    companion: "부모님과",
    price: 178000,
    rating: 4.82,
    reviewCount: 41,
    nights: "1박 2일",
    heroImage: img("/images/villages/nodaji-village.jpg"),
    galleryImage: img("/images/villages/nodaji-village.jpg"),
    description:
      "아로마 브레인 디톡스 테라피·아로마 족욕·황토찜질·더덕 허브 훈제 바비큐. 횡성군 청일면 춘당로 232. 문의 010-4150-1952.",
    tags: ["아로마", "황토찜질", "힐링식"],
    inclusions: ["숙박", "아로마 프로그램", "식사", "현장 안내"],
    exclusions: ["개인 교통"],
    itinerary: [
      {
        title: "DAY 1. 향으로 깊게",
        body: "브레인 디톡스와 족욕, 저녁에는 더덕 허브 훈제 바비큐 일정으로 이어집니다.",
      },
      {
        title: "DAY 2. 황토와 휴식",
        body: "황토찜질과 여유 시간 후 체크아웃합니다.",
      },
    ],
    reassurance: [
      { title: "감각 케어", body: "향과 온열을 활용해 몸의 긴장을 순하게 풀어 주는 코스입니다." },
    ],
    reviews: [
      { author: "윤미경", body: "황토찜질 후 숙면이 좋아졌고 식사 구성도 정갈했습니다." },
    ],
    bookingOptions: {
      dates: ["5월 3일 토요일", "5월 10일 토요일"],
      defaultDate: "5월 3일 토요일",
      maxGuests: 3,
    },
  },
  {
    slug: "hoengseong-taegisan",
    title: "태기산치유마을 약선식탁·선도기공 스테이",
    region: "횡성",
    companion: "부모님과",
    price: 172000,
    rating: 4.88,
    reviewCount: 62,
    nights: "1박 2일",
    heroImage: img("/images/villages/taegisan-village.jpg"),
    galleryImage: img("/images/villages/taegisan-village.jpg"),
    description:
      "치유 식탁(더덕무침·토마토김치 등), 국자랑(선도기공), 치유 산책. 횡성군 청일면 청일로 779번길 117. 문의 010-6847-8713.",
    tags: ["약선식", "기공", "산책"],
    inclusions: ["숙박", "치유 식탁", "기공 세션", "산책"],
    exclusions: ["개인 교통", "주류"],
    itinerary: [
      {
        title: "DAY 1. 식탁과 기공",
        body: "웰컴 티 후 국자랑 선도기공, 저녁 치유 식탁으로 마무리합니다.",
      },
      {
        title: "DAY 2. 숲길",
        body: "치유 산책과 제철 아침 후 체크아웃합니다.",
      },
    ],
    reassurance: [
      { title: "약선 중심", body: "지역 식재로 구성한 식탁과 가벼운 활동 동선을 함께 배치했습니다." },
    ],
    reviews: [
      { author: "조현우", body: "부모님 모시고 가기 좋았고 식단 설명이 친절했습니다." },
    ],
    bookingOptions: {
      dates: ["4월 27일 일요일", "5월 4일 일요일"],
      defaultDate: "4월 27일 일요일",
      maxGuests: 4,
    },
  },
];

export const farms = [
  {
    slug: "hoengseong-noah-forest",
    title: "노아의 숲 숲슐랭·초록쉼표 치유",
    region: "횡성",
    companion: "친구와",
    price: 78000,
    rating: 4.79,
    reviewCount: 55,
    duration: "반나절 체험",
    heroImage: img("/images/farms/noah-forest-gallery.jpg"),
    galleryImage: img("/images/farms/noah-forest-gallery.jpg"),
    description:
      "숲슐랭 피크닉·샐러드 피크닉 도시락·초록쉼표 치유여행. 횡성군 갑천면 외갑천로 694번길 92-20. 문의 010-9040-5295.",
    tags: ["숲 피크닉", "도시락", "치유여행"],
    flow: [
      { title: "Welcome", body: "오늘의 코스 안내와 함께 시작합니다." },
      { title: "Forest Picnic", body: "숲슐랭·샐러드 도시락으로 자연 속에서 식사합니다." },
      { title: "Green Pause", body: "초록쉼표 치유 여정으로 하루를 정리합니다." },
    ],
    reviews: [
      { author: "배준영", body: "피크닉 구성이 특별해서 사진도 좋고 휴식도 됐어요." },
    ],
    bookingOptions: {
      dates: ["토요일 11:00", "토요일 14:30", "일요일 10:00"],
      defaultDate: "토요일 11:00",
      maxGuests: 6,
    },
  },
  {
    slug: "hoengseong-bluewing",
    title: "블루윙 팜 동물 교감 체험",
    region: "횡성",
    companion: "아이와 함께",
    price: 62000,
    rating: 4.76,
    reviewCount: 38,
    duration: "2시간 체험",
    heroImage: img("/images/farms/bluewing-farm.jpg"),
    galleryImage: img("/images/farms/bluewing-farm.jpg"),
    description:
      "애완닭·앵무새 등과의 동물 교감 프로그램. 횡성군 공근면 금계로 11-13. 문의 010-9743-0078.",
    tags: ["동물교감", "가족", "농장"],
    flow: [
      { title: "안내", body: "동물 친화 수칙과 체험 순서를 안내합니다." },
      { title: "교감 시간", body: "닭·앵무새 등 지정 구역에서 교감 활동을 진행합니다." },
      { title: "마무리", body: "간식과 짧은 휴식으로 체험을 마칩니다." },
    ],
    reviews: [
      { author: "서지안", body: "아이가 동물과 어울리기 좋았고 시간 배분이 알찼어요." },
    ],
    bookingOptions: {
      dates: ["토요일 10:00", "일요일 14:00"],
      defaultDate: "토요일 10:00",
      maxGuests: 5,
    },
  },
  {
    slug: "hoengseong-sanchae",
    title: "산채마을 텃밭 브런치·원격근무 치유공간",
    region: "횡성",
    companion: "혼자",
    price: 58000,
    rating: 4.71,
    reviewCount: 29,
    duration: "3시간 체험",
    heroImage: img("/images/farms/sanchae-village-welchon.jpg"),
    galleryImage: img("/images/farms/sanchae-village-welchon.jpg"),
    description:
      "텃밭 브런치·피크닉과 원격근무 가능한 치유 공간. 횡성군 둔내면 삽교로 386. 문의 010-9219-4922.",
    tags: ["브런치", "피크닉", "워케이션"],
    flow: [
      { title: "Arrival", body: "텃밭 소개와 오늘의 재료 안내." },
      { title: "Brunch & Picnic", body: "수확·브런치와 야외 피크닉 시간." },
      { title: "Quiet Work", body: "지정된 치유 공간에서 집중 또는 휴식을 선택합니다." },
    ],
    reviews: [
      { author: "남궁현", body: "브런치 후 조용히 일하기 좋은 공간이었습니다." },
    ],
    bookingOptions: {
      dates: ["금요일 11:00", "토요일 10:30"],
      defaultDate: "토요일 10:30",
      maxGuests: 4,
    },
  },
];

export const featuredReasons = [
  {
    title: "대한민국 산림의 80%",
    body: "도심의 소음을 끊고 자연의 주파수에 맞춰 호흡할 수 있는 지형적 강점.",
  },
  {
    title: "약선 식탁과 공동체",
    body: "체험만으로 끝나지 않고 식사, 숙박, 응대 경험까지 일관된 회복 서사를 설계.",
  },
  {
    title: "운영 가능한 구조",
    body: "홈에서 목록, 상세, 결제, 사후 관리까지 이어지는 서비스형 동선이 명확합니다.",
  },
];

export const personas = [
  {
    title: "부모님과 함께",
    body: "식단, 숙소, 이동 강도를 세심하게 조절한 1박 회복 패키지.",
  },
  {
    title: "나를 위한 시간",
    body: "혼자서 조용히 리듬을 회복할 수 있도록 짧고 선명한 당일 체험 중심.",
  },
];

export const seasonalCourses = [
  {
    slug: "samcheok-canola-package",
    title: "삼척 맹방 유채꽃 치유 패키지",
    summary:
      "바다와 꽃의 숨결을 동시에 경험하는 1박 2일 패키지로 봄 시즌 대표 코스입니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2dSAgwEDnQGesIZDb_MXIeAvPzMGrMeVKZOrkUnc7_AosP04j4sZ7jPGPD_i2GjnpCfxQeo5Du0p2QrdM213IDqZKfzumFkORR7tINSJWjds-SeLKH3jCtGo04IESJA9Y4pSVxkqxhcaIfcGLnMjvIEIcwT_lYbU_ZzhfC_zYqI_LZ_Rhnz0e8lkAqa7m2qZWtyTG3NtVaa-tWqmDzfaLZWz495zntbEk2579rSM6u33dBRcRpYX9V2wAdf8sf0ygRfRmJY6nKVc",
    cta: "/villages/hoengseong-taegisan",
  },
  {
    slug: "pyeongchang-wildflower",
    title: "평창 야생화 숲길 산책",
    summary:
      "해발 700m 고원에서 야생화와 숲의 맥박을 따라 걷는 반나절 코스입니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgU2VGQkKEubRIeu7cE6JZNq3oHeyVm5AXg2itjp5oHECr1y-I451aZtycFsp3ITB1eH69ShkJ6JvTa-qwO-nvipgs2Bzsi1-AsD93uN7MK7rua5fQnRL895cXn_1y9cRjVnbF2y-0iAri1i5OpvS5RJ8m9rqB_K1zp17bUCl9FxVoSXK_E-lhU1Cq2Oj8mqsq3LyXnAebkYyN00Q0weA61H7I4NXqYsBgrfYX72BxxAIsqtp2CMV8tTN3QRcQ-u4PRHJOjp_tYWM",
    cta: "/villages/hoengseong-goradei",
  },
];

export const faqItems = [
  {
    category: "예약/결제",
    question: "치유마을과 치유농장의 차이는 무엇인가요?",
    answer:
      "치유마을은 숙박 중심의 1박 2일 패키지이고, 치유농장은 당일 또는 반나절 체험 중심입니다.",
  },
  {
    category: "예약/결제",
    question: "예약 확정은 언제 되나요?",
    answer:
      "결제 또는 문의 접수 후 운영 사무국이 24시간 내 확정 메시지를 안내합니다.",
  },
  {
    category: "식사/숙소",
    question: "부모님 식단은 별도 선택이 가능한가요?",
    answer:
      "체크아웃 단계에서 맞춤형 식단 옵션을 선택하고 추가 요청을 남길 수 있습니다.",
  },
  {
    category: "취소/환불",
    question: "환불 규정은 어디에서 확인하나요?",
    answer:
      "고객지원 메뉴의 취소 및 환불 안내 페이지에서 날짜별 환불 기준을 확인할 수 있습니다.",
  },
];

export const supportContacts = [
  {
    title: "예약 확인 및 변경",
    body: "예약 번호를 기준으로 상태를 확인하고 일정 변경 요청을 접수합니다.",
    cta: "예약 관리로 이동",
    to: "/my/reservations",
  },
  {
    title: "1:1 문의 접수",
    body: "식단, 이동, 단체 예약 등 운영 상담이 필요한 경우 문의를 남길 수 있습니다.",
    cta: "문의 내역 보기",
    to: "/my/inquiries",
  },
  {
    title: "자주 묻는 질문",
    body: "반복 문의를 줄이기 위해 FAQ, 환불, 개인정보 정책을 구조적으로 분리했습니다.",
    cta: "FAQ 보기",
    to: "/support/faq",
  },
];

export const reservations = [
  {
    id: "RSV-240419",
    title: "태기산치유마을 약선식탁·선도기공 스테이",
    status: "예약 확정",
    date: "2026.04.19 - 2026.04.20",
    location: "강원도 횡성",
    amount: 300000,
  },
  {
    id: "RSV-240503",
    title: "노아의 숲 숲슐랭·초록쉼표 치유",
    status: "예약 대기",
    date: "2026.05.03 11:00",
    location: "강원도 횡성",
    amount: 68000,
  },
];

export const inquiries = [
  {
    id: "QNA-0325",
    category: "식단 관련 문의",
    status: "답변 완료",
    summary: "부모님 저염 식단 가능 여부 문의",
    answer:
      "저염 옵션으로 대응 가능하며, 체크아웃 단계에서 별도 요청을 남겨주시면 됩니다.",
  },
  {
    id: "QNA-0322",
    category: "교통 문의",
    status: "답변 대기",
    summary: "고라데이 치유마을 픽업 지원 가능 여부",
    answer:
      "운영 사무국 확인 중입니다. 24시간 내 답변 예정입니다.",
  },
];

export const archiveData = {
  heroTitle: "회복 리포트",
  heroSubtitle: "김지은 님 · 242일간의 기록",
  stats: [
    { label: "강원에서의 숨결", value: "치유마을 3회 / 치유농장 5회" },
    { label: "가장 많이 찾은 풍경", value: "횡성의 숲" },
    { label: "함께한 이", value: "부모님 2회 / 나 홀로 6회" },
    { label: "숲의 숨결", value: "120시간" },
  ],
  themes: [
    { label: "산책", value: 85 },
    { label: "명상", value: 60 },
    { label: "다도", value: 45 },
    { label: "로컬식탁", value: 30 },
  ],
  timeline: [
    { title: "강릉 해변 다도 체험", date: "2025.08", note: "혼자" },
    { title: "태기산치유마을", date: "2025.11", note: "부모님과" },
    { title: "노아의 숲", date: "2026.03", note: "나 홀로" },
  ],
};

export const policies = {
  refund: {
    title: "취소 및 환불 안내",
    summary:
      "숙소, 식재료, 현장 인력 배정이 동시에 시작되는 구조이기 때문에 날짜별 차등 기준을 적용합니다.",
    sections: [
      {
        heading: "환불 기준 요약",
        items: [
          "이용 7일 전까지 전액 환불",
          "이용 3일 전까지 70% 환불",
          "이용 1일 전까지 50% 환불",
          "당일 취소 및 노쇼는 환불 불가",
        ],
      },
      {
        heading: "환불 절차 안내",
        items: [
          "마이페이지에서 예약 선택 후 취소 신청",
          "운영 사무국 확인 후 환불 금액 확정",
          "결제 수단 기준 3~5영업일 내 환불",
        ],
      },
    ],
  },
  privacy: {
    title: "개인정보 처리방침",
    summary:
      "예약 운영에 필요한 최소한의 정보만 수집하고, 식단/건강 관련 메모는 운영 종료 후 별도 파기합니다.",
    sections: [
      {
        heading: "수집 항목",
        items: ["이름", "연락처", "이메일", "예약 메모", "결제 정보 일부"],
      },
      {
        heading: "이용 목적",
        items: ["예약 처리", "운영 안내", "식단/체질 요청 반영", "고객 문의 대응"],
      },
      {
        heading: "보관 기간",
        items: ["법정 보관 대상 제외 정보는 운영 목적 달성 후 파기"],
      },
    ],
  },
};

/** 큐레이션 Step1 — 감성 이미지 (Unsplash, 자연 톤) */
export const moodImages = [
  {
    id: "misty-forest",
    label: "안개숲",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  },
  {
    id: "wide-field",
    label: "넓은들판",
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
  },
  {
    id: "quiet-valley",
    label: "고요계곡",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
  },
  {
    id: "coastal-cliff",
    label: "바닷가",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  },
  {
    id: "old-village",
    label: "오래된마을",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
  },
  {
    id: "empty-field",
    label: "빈 손밭",
    src: "https://images.unsplash.com/photo-1523349699287-8af84a976450?w=600&q=80",
  },
];

export function getCollection(collectionType) {
  return collectionType === "villages" ? villages : farms;
}

export function getExperience(collectionType, slug) {
  return getCollection(collectionType).find((item) => item.slug === slug) || null;
}
