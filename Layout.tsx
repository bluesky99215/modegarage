
import React from 'react';
import { Menu, X, Instagram, Youtube, Facebook, Globe } from 'lucide-react';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  onLanguageToggle: () => void;
  onAdminToggle: () => void;
  isAdmin: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, lang, onLanguageToggle, onAdminToggle, isAdmin }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { name: lang === 'ko' ? '홈' : 'Home', href: '#' },
    { name: lang === 'ko' ? '서비스' : 'Services', href: '#services' },
    { name: lang === 'ko' ? '블로그' : 'Blog', href: '#blog' },
    { name: lang === 'ko' ? '문의' : 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <a href="#" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-black text-xl italic skew-x-[-10deg]">MG</div>
                <span className="text-2xl font-black tracking-tighter uppercase italic">
                  Mode<span className="text-red-600">Garage</span>
                </span>
              </a>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold tracking-wide hover:text-red-600 transition-colors uppercase"
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={onLanguageToggle}
                className="flex items-center space-x-1 text-xs bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-all"
              >
                <Globe size={14} />
                <span>{lang === 'ko' ? 'KR' : 'EN'}</span>
              </button>
              <button
                onClick={onAdminToggle}
                className={`text-xs px-4 py-2 rounded-md font-bold transition-all ${
                  isAdmin ? 'bg-red-600 text-white' : 'border border-white/20 hover:border-red-600'
                }`}
              >
                {isAdmin ? 'ADMIN MODE' : 'ADMIN LOGIN'}
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button onClick={onLanguageToggle} className="p-2"><Globe size={20} /></button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-b border-white/10 pb-6 pt-2">
            <div className="px-4 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-bold"
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={onAdminToggle}
                className="w-full py-3 bg-red-600 rounded-lg font-bold"
              >
                {isAdmin ? 'EXIT ADMIN' : 'ADMIN ACCESS'}
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        {children}
      </main>

      <footer className="bg-zinc-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-zinc-500 hover:text-red-600 transition-colors"><Instagram /></a>
            <a href="#" className="text-zinc-500 hover:text-red-600 transition-colors"><Youtube /></a>
            <a href="#" className="text-zinc-500 hover:text-red-600 transition-colors"><Facebook /></a>
          </div>
          <p className="text-zinc-600 text-sm">
            © 2024 ModeGarage. All Rights Reserved. Designed for Perfection.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
