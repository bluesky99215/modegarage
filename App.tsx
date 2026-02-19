
import React, { useState, useEffect } from 'react';
import { 
  Shield, Zap, Wrench, Camera, ChevronRight, Mail, Phone, MapPin, 
  Settings, ArrowUpRight, Fuel, Palette, Calendar, MessageSquare, CheckCircle2,
  Instagram, Youtube
} from 'lucide-react';
import Layout from './components/Layout';
import AdminPanel from './components/AdminPanel';
import { Language, BlogPost, SiteContent, SiteSettings } from './types';
import { INITIAL_CONTENT, INITIAL_POSTS, INITIAL_SETTINGS, ANALYTICS_DATA, YOUTUBE_VIDEOS } from './constants';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ko');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('mg_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [siteContent, setSiteContent] = useState<Record<string, SiteContent>>(() => {
    const saved = localStorage.getItem('mg_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('mg_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('mg_posts', JSON.stringify(posts));
    localStorage.setItem('mg_content', JSON.stringify(siteContent));
    localStorage.setItem('mg_settings', JSON.stringify(settings));
  }, [posts, siteContent, settings]);

  const activeContent = siteContent[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="text-red-600" size={32} />;
      case 'Shield': return <Shield className="text-red-600" size={32} />;
      case 'Camera': return <Camera className="text-red-600" size={32} />;
      case 'Wrench': return <Wrench className="text-red-600" size={32} />;
      case 'Fuel': return <Fuel className="text-red-600" size={32} />;
      case 'Palette': return <Palette className="text-red-600" size={32} />;
      default: return <Settings className="text-red-600" size={32} />;
    }
  };

  return (
    <Layout 
      lang={lang} 
      onLanguageToggle={() => setLang(lang === 'ko' ? 'en' : 'ko')}
      isAdmin={isAdmin}
      onAdminToggle={() => setIsAdmin(!isAdmin)}
    >
      {isAdmin ? (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <AdminPanel 
            posts={posts} content={siteContent} settings={settings}
            analytics={ANALYTICS_DATA} onUpdatePosts={setPosts}
            onUpdateContent={setSiteContent} onUpdateSettings={setSettings}
          />
        </div>
      ) : (
        <>
          {/* Hero Section: 페라리 최신 모델 이미지 적용 */}
          <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2000" 
                alt="Latest Ferrari SF90" 
                className="w-full h-full object-cover opacity-70 animate-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            </div>
            
            <div className="relative z-10 text-center max-w-4xl px-4">
              <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-[1.1] drop-shadow-2xl">
                {activeContent.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-zinc-100 font-medium mb-12 max-w-2xl mx-auto">
                {activeContent.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a href="#contact" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-black px-12 py-5 rounded-full uppercase tracking-widest text-sm transition-all flex items-center justify-center space-x-2 hero-glow">
                  <span>{activeContent.hero.cta}</span>
                  <ChevronRight size={18} />
                </a>
                <a href="#blog" className="w-full sm:w-auto border border-white/40 backdrop-blur-sm hover:border-red-600 text-white font-black px-12 py-5 rounded-full uppercase tracking-widest text-sm transition-all">
                  작업 사진 보기
                </a>
              </div>
            </div>
          </section>

          {/* 서비스 항목 그리드 */}
          <section id="services" className="py-32 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeContent.services.map((service) => (
                <div key={service.id} className="p-10 bg-black border border-white/5 rounded-[40px] hover:border-red-600/50 transition-all text-center group">
                  <div className="mb-8 w-20 h-20 mx-auto bg-zinc-900 rounded-3xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <h4 className="text-2xl font-black mb-4 italic">{service.title}</h4>
                  <p className="text-zinc-500">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 유튜브 영상 섹션 */}
          <section className="py-32 bg-black border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-end mb-16">
                <h2 className="text-4xl md:text-6xl font-black italic">VIDEO <span className="text-red-600">STORY</span></h2>
                <a href="https://youtube.com/@mode1554" target="_blank" className="hidden md:flex items-center space-x-2 text-red-600 font-black uppercase tracking-widest text-xs">
                  <Youtube /> <span>SUBSCRIBE @mode1554</span>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {YOUTUBE_VIDEOS.map((v) => (
                  <div key={v.id} className="aspect-video rounded-[40px] overflow-hidden border border-white/5">
                    <iframe className="w-full h-full grayscale hover:grayscale-0 transition-all" src={`https://www.youtube.com/embed/${v.videoId}`} frameBorder="0" allowFullScreen></iframe>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 하단 연락처 및 SNS */}
          <section id="contact" className="py-32 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-zinc-900 p-12 md:p-20 rounded-[60px] border border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                  <h2 className="text-5xl font-black italic mb-10">QUICK <span className="text-red-600">INQUIRY</span></h2>
                  <div className="space-y-8 mb-12">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center"><Phone /></div>
                      <div>
                        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">긴급 상담</p>
                        <p className="text-2xl font-black italic">1533-1410</p>
                        <p className="text-xl font-black italic text-zinc-400">010-7340-8559</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-red-600"><MapPin /></div>
                      <div>
                        <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">오시는 길</p>
                        <p className="text-lg font-black italic">경기도 성남시 분당구 새마을로51번길 20 지하2층</p>
                      </div>
                    </div>
                  </div>
                  {/* SNS 채널 추가 */}
                  <div className="pt-8 border-t border-white/5 space-y-4">
                    <a href="https://instagram.com/modegarage_" target="_blank" className="flex items-center space-x-4 text-zinc-400 hover:text-white transition-colors">
                      <Instagram className="text-red-600" /> <span className="font-black italic uppercase">Instagram @modegarage_</span>
                    </a>
                    <a href="https://youtube.com/@mode1554" target="_blank" className="flex items-center space-x-4 text-zinc-400 hover:text-white transition-colors">
                      <Youtube className="text-red-600" /> <span className="font-black italic uppercase">Youtube @mode1554</span>
                    </a>
                  </div>
                </div>
                
                <div className="bg-black/40 p-10 rounded-[40px] border border-white/5">
                  <form className="space-y-6">
                    <input className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl p-5 outline-none focus:border-red-600 transition-all text-white font-bold" placeholder="성함 또는 연락처" />
                    <input className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl p-5 outline-none focus:border-red-600 transition-all text-white font-bold" placeholder="차종 (예: 포르쉐 911)" />
                    <textarea className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl p-5 h-40 outline-none focus:border-red-600 transition-all text-white font-bold" placeholder="상담 내용" />
                    <button className="w-full bg-red-600 py-6 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-red-700 transition-shadow">신청하기</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export default App;
