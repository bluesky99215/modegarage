
import { BlogPost, SiteContent, SiteSettings, AnalyticsData } from './types';

export const INITIAL_CONTENT: Record<string, SiteContent> = {
  ko: {
    hero: {
      title: "프리미엄 정비의 기준",
      subtitle: "수입차 정비가 막막하신가요? 모드개러지가 투명하고 완벽한 서비스로 소중한 차를 관리해 드립니다.",
      cta: "지금 바로 예약하기"
    },
    about: {
      title: "믿고 맡기는 모드개러지",
      description: "우리는 단순히 차를 고치는 것을 넘어, 고객님의 안전한 드라이빙을 설계합니다."
    },
    services: [
      { id: '1', title: '엔진오일 & 소모품', description: '기본 점검부터 엔진오일, 필터류 교체까지 가장 기초적이고 중요한 관리입니다.', icon: 'Fuel' },
      { id: '2', title: '엔진 & 미션 정밀수정', description: '소음, 진동, 경고등 점검 등 전문 장비가 필요한 고난도 수리를 진행합니다.', icon: 'Wrench' },
      { id: '3', title: '브레이크 & 서스펜션', description: '생명과 직결된 제동 장치와 승차감을 결정짓는 하체 부품을 꼼꼼히 점검합니다.', icon: 'Shield' },
      { id: '4', title: '슈퍼카 퍼포먼스 튜닝', description: '당신의 차를 더 강력하게 만드는 퍼포먼스 업그레이드.', icon: 'Zap' },
      { id: '5', title: '차량 랩핑 & 외장관리', description: '색상 변경부터 PPF 보호 필름까지 차량의 가치를 높이는 프리미엄 케어.', icon: 'Palette' },
      { id: '6', title: '커스텀 로고 디자인', description: '모드개러지 감성의 유니크한 로고 디자인으로 나만의 차를 완성합니다.', icon: 'Camera' }
    ]
  },
  en: {
    hero: {
      title: "Premium Service Standard",
      subtitle: "ModeGarage provides transparent and perfect service for your luxury car.",
      cta: "Book Now"
    },
    about: {
      title: "Trusted ModeGarage",
      description: "We design your safe driving experience beyond simple repairs."
    },
    services: [
      { id: '1', title: 'Oil & Consumables', description: 'Essential care from basic inspection to oil and filter replacement.', icon: 'Fuel' },
      { id: '2', title: 'Engine & Mission', description: 'High-difficulty repairs using expert diagnostic tools.', icon: 'Wrench' },
      { id: '3', title: 'Brakes & Suspension', description: 'Meticulous check on braking systems for your safety.', icon: 'Shield' },
      { id: '4', title: 'Performance Tuning', description: 'Make your car even more powerful with our tuning services.', icon: 'Zap' },
      { id: '5', title: 'Wrapping & Care', description: 'Premium exterior care from color changes to PPF film.', icon: 'Palette' },
      { id: '6', title: 'Custom Logo Design', description: 'Complete your unique car with our signature logo design.', icon: 'Camera' }
    ]
  }
};

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '람보르기니 우루스 엔진오일 교환 작업기',
    excerpt: '정기 점검의 중요성! 모드개러지에서 진행된 우루스 케어 과정을 확인하세요.',
    content: '내용 생략...',
    author: '정비팀장',
    date: '2024-05-20',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200',
    category: '작업갤러리',
    slug: 'urus-oil-change',
    seoKeywords: ['람보르기니', '정비']
  },
  {
    id: '2',
    title: '포르쉐 타이칸 전체 PPF 시공 완료',
    excerpt: '스크래치 걱정 끝! 완벽한 핏감의 PPF 시공 결과물을 공개합니다.',
    content: '내용 생략...',
    author: '디자인팀',
    date: '2024-05-18',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200',
    category: '외장관리',
    slug: 'taycan-ppf',
    seoKeywords: ['포르쉐', 'PPF']
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  primaryColor: '#ff0000',
  accentColor: '#000000',
  fontFamily: 'Inter',
  seoTitle: '모드개러지 | 프리미엄 수입차 정비의 모든 것',
  seoDescription: '수입차 정비, 오일교환, 튜닝까지 가장 투명하게 도와드립니다.',
  socials: {
    instagram: 'https://instagram.com/modegarage_',
    youtube: 'https://youtube.com/@mode1554',
    facebook: '#'
  }
};

export const ANALYTICS_DATA: AnalyticsData[] = [
  { name: '월', visits: 400, conversions: 12 },
  { name: '화', visits: 300, conversions: 8 },
  { name: '수', visits: 600, conversions: 22 },
  { name: '목', visits: 800, conversions: 45 },
  { name: '금', visits: 700, conversions: 38 },
  { name: '토', visits: 1100, conversions: 62 },
  { name: '일', visits: 1200, conversions: 78 },
];

export const YOUTUBE_VIDEOS = [
  { id: '1', videoId: 'dQw4w9WgXcQ', title: '슈퍼카 정비의 모든 것' },
  { id: '2', videoId: 'dQw4w9WgXcQ', title: '모드개러지 랩핑 시공기' },
];
