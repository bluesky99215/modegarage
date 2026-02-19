
export type Language = 'ko' | 'en';

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    description: string;
  };
  services: Service[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  slug: string;
  seoKeywords: string[];
}

export interface AnalyticsData {
  name: string;
  visits: number;
  conversions: number;
}

export interface SiteSettings {
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  seoTitle: string;
  seoDescription: string;
  socials: {
    instagram: string;
    youtube: string;
    facebook: string;
  };
}
