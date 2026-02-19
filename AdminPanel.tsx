
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { LayoutDashboard, FileText, Settings as SettingsIcon, Plus, Save, Trash2, Search, BrainCircuit, Loader2 } from 'lucide-react';
import { BlogPost, SiteContent, SiteSettings, AnalyticsData } from '../types';
import { generateSEOKeywords, getAIAssistance } from '../services/geminiService';

interface AdminPanelProps {
  posts: BlogPost[];
  content: Record<string, SiteContent>;
  settings: SiteSettings;
  analytics: AnalyticsData[];
  onUpdatePosts: (posts: BlogPost[]) => void;
  onUpdateContent: (content: Record<string, SiteContent>) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  posts, content, settings, analytics, onUpdatePosts, onUpdateContent, onUpdateSettings 
}) => {
  const [activeTab, setActiveTab] = useState<'dash' | 'content' | 'posts' | 'settings'>('dash');
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [aiTip, setAiTip] = useState<string>("Analyzing your brand...");
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    handleGetAiAdvice();
  }, []);

  const handleGetAiAdvice = async () => {
    setLoadingAi(true);
    const advice = await getAIAssistance("Provide a professional marketing advice for a premium automotive garage looking to attract high-net-worth individuals in Seoul.");
    setAiTip(advice);
    setLoadingAi(false);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPost) return;

    setLoadingAction(true);
    // AI SEO Analysis before saving
    const keywords = await generateSEOKeywords(editPost.title, editPost.content);
    const updatedPost = { ...editPost, seoKeywords: keywords };

    if (posts.find(p => p.id === updatedPost.id)) {
      onUpdatePosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    } else {
      onUpdatePosts([...posts, { ...updatedPost, id: Date.now().toString() }]);
    }
    setEditPost(null);
    setLoadingAction(false);
  };

  const deletePost = (id: string) => {
    if(window.confirm('Delete this post?')) {
      onUpdatePosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-[32px] overflow-hidden min-h-[700px] flex shadow-3xl">
      {/* Sidebar */}
      <div className="w-72 bg-black border-r border-white/10 p-8 flex flex-col">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-black italic">MG</div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter">MG <span className="text-red-600">Admin</span></h2>
        </div>
        
        <div className="flex flex-col space-y-2">
          {[
            { id: 'dash', icon: LayoutDashboard, label: 'Performance' },
            { id: 'content', icon: Search, label: 'Visual Editor' },
            { id: 'posts', icon: FileText, label: 'Blog & SEO' },
            { id: 'settings', icon: SettingsIcon, label: 'Site Config' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                activeTab === item.id 
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                : 'hover:bg-zinc-800/50 text-zinc-400'
              }`}
            >
              <item.icon size={20} />
              <span className="font-black uppercase text-xs tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/5 blur-2xl rounded-full"></div>
          <div className="flex items-center space-x-2 text-red-500 mb-3">
            <BrainCircuit size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Gemini AI Assistant</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed italic font-medium">
            {loadingAi ? "Thinking..." : aiTip}
          </p>
          <button 
            onClick={handleGetAiAdvice}
            className="mt-4 text-[9px] font-black uppercase text-zinc-500 hover:text-white transition-colors underline"
          >
            Refresh Insights
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-12 overflow-y-auto max-h-[85vh] bg-zinc-900/20">
        {activeTab === 'dash' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Market <span className="text-red-600">Dynamics</span></h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Monthly Visitors', value: '12,480', delta: '+12%', color: 'text-white' },
                { label: 'Published Posts', value: posts.length, delta: 'Live', color: 'text-white' },
                { label: 'Inquiry Rate', value: '8.4%', delta: '+2.1%', color: 'text-red-600' }
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-800/50 p-8 rounded-[32px] border border-white/5 hover:border-red-600/20 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                    <span className="text-[9px] font-bold px-2 py-1 bg-zinc-700 rounded-lg text-zinc-300 group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">{stat.delta}</span>
                  </div>
                  <h2 className={`text-4xl font-black italic ${stat.color}`}>{stat.value}</h2>
                </div>
              ))}
            </div>
            
            <div className="bg-zinc-800/30 p-10 rounded-[40px] border border-white/5 h-[450px]">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black uppercase italic tracking-tight">Weekly Traffic Flow</h3>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Visits</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#444" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700 }} 
                  />
                  <YAxis 
                    stroke="#444" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#ff000010' }}
                    contentStyle={{ backgroundColor: '#000', borderRadius: '16px', border: '1px solid #333', color: '#fff' }}
                  />
                  <Bar dataKey="visits" fill="#ef4444" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-4xl font-black uppercase italic tracking-tighter">Content <span className="text-red-600">Engine</span></h1>
              {!editPost && (
                <button 
                  onClick={() => setEditPost({ 
                    id: '', title: '', excerpt: '', content: '', author: 'Tech Lead', 
                    date: new Date().toLocaleDateString('en-CA'), image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800', 
                    category: 'Expert Advice', slug: '', seoKeywords: [] 
                  })}
                  className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center space-x-3 transition-all"
                >
                  <Plus size={18} />
                  <span>Draft New Insights</span>
                </button>
              )}
            </div>

            {editPost ? (
              <form onSubmit={handleSavePost} className="space-y-8 bg-zinc-800/40 p-10 rounded-[40px] border border-white/5 animate-in zoom-in-95 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Editorial Title</label>
                    <input 
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all font-bold"
                      value={editPost.title}
                      onChange={e => setEditPost({...editPost, title: e.target.value})}
                      placeholder="Article Title..."
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Insight Category</label>
                    <input 
                      className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all font-bold"
                      value={editPost.category}
                      onChange={e => setEditPost({...editPost, category: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Hook Excerpt</label>
                  <input 
                    className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all"
                    value={editPost.excerpt}
                    onChange={e => setEditPost({...editPost, excerpt: e.target.value})}
                    placeholder="Short summary for the list view..."
                  />
                </div>
                <div className="space-y-3">
                   <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Full Editorial Content</label>
                    <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">AI Analysis Enabled</span>
                   </div>
                  <textarea 
                    className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white h-72 focus:border-red-600 outline-none transition-all leading-relaxed"
                    value={editPost.content}
                    onChange={e => setEditPost({...editPost, content: e.target.value})}
                    required
                    placeholder="Write your masterpiece here..."
                  />
                </div>
                <div className="flex space-x-6">
                  <button type="submit" disabled={loadingAction} className="bg-red-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center space-x-3 disabled:opacity-50 hover:bg-red-700 transition-all shadow-xl shadow-red-900/20">
                    {loadingAction ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    <span>{loadingAction ? 'Analyzing SEO...' : 'Authorize & Publish'}</span>
                  </button>
                  <button type="button" onClick={() => setEditPost(null)} className="bg-zinc-800 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-700 transition-all">
                    Discard
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {posts.map(post => (
                  <div key={post.id} className="group bg-zinc-800/30 p-6 rounded-[32px] flex items-center justify-between border border-white/5 hover:border-red-600/40 transition-all shadow-lg">
                    <div className="flex items-center space-x-6">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                           <span className="bg-red-600/10 text-red-500 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest">{post.category}</span>
                           <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest">{post.date}</span>
                        </div>
                        <h3 className="font-black italic uppercase tracking-tight text-lg leading-none">{post.title}</h3>
                        <div className="flex space-x-2 mt-3">
                          {post.seoKeywords.slice(0, 3).map((kw, i) => (
                             <span key={i} className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">#{kw}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button onClick={() => setEditPost(post)} className="w-12 h-12 flex items-center justify-center bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors text-blue-400"><FileText size={18} /></button>
                      <button onClick={() => deletePost(post.id)} className="w-12 h-12 flex items-center justify-center bg-zinc-800 rounded-xl hover:bg-red-600/20 transition-colors text-red-500"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[40px]">
                    <p className="text-zinc-600 font-black uppercase tracking-[0.3em]">No journals found. Start documenting your journey.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'content' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
             <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-12">Visual <span className="text-red-600">Identity</span></h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {Object.keys(content).map((langKey) => (
                <div key={langKey} className="bg-zinc-800/40 p-10 rounded-[40px] border border-white/5">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black italic uppercase text-red-500 tracking-tighter">{langKey === 'ko' ? 'Korean' : 'English'} Hub</h2>
                    <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-[10px] font-black uppercase">{langKey}</div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Main Hero Title</label>
                      <input 
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all font-black uppercase italic tracking-tighter"
                        value={content[langKey].hero.title}
                        onChange={(e) => {
                          const newContent = { ...content };
                          newContent[langKey].hero.title = e.target.value;
                          onUpdateContent(newContent);
                        }}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Sub Headline Content</label>
                      <textarea 
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white h-32 focus:border-red-600 outline-none transition-all font-medium leading-relaxed"
                        value={content[langKey].hero.subtitle}
                        onChange={(e) => {
                          const newContent = { ...content };
                          newContent[langKey].hero.subtitle = e.target.value;
                          onUpdateContent(newContent);
                        }}
                      />
                    </div>
                     <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Call to Action Label</label>
                      <input 
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all font-black uppercase tracking-widest text-xs"
                        value={content[langKey].hero.cta}
                        onChange={(e) => {
                          const newContent = { ...content };
                          newContent[langKey].hero.cta = e.target.value;
                          onUpdateContent(newContent);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-12">
            <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Global <span className="text-red-600">Infrastructure</span></h1>
            <div className="bg-zinc-800/40 p-12 rounded-[50px] border border-white/5 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">SEO Master Title</label>
                  <input 
                    className="w-full bg-black border border-white/10 rounded-2xl p-5 text-white focus:border-red-600 outline-none transition-all font-bold"
                    value={settings.seoTitle}
                    onChange={e => onUpdateSettings({...settings, seoTitle: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Brand Accent Palette</label>
                  <div className="flex items-center space-x-6 bg-black p-4 rounded-2xl border border-white/5">
                    <input 
                      type="color" 
                      className="w-12 h-12 bg-transparent rounded cursor-pointer border-none"
                      value={settings.primaryColor}
                      onChange={e => onUpdateSettings({...settings, primaryColor: e.target.value})}
                    />
                    <span className="text-sm font-black italic text-red-500 uppercase tracking-widest">{settings.primaryColor}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-1">Global Meta Description</label>
                <textarea 
                  className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white h-32 focus:border-red-600 outline-none transition-all font-medium leading-relaxed"
                  value={settings.seoDescription}
                  onChange={e => onUpdateSettings({...settings, seoDescription: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {['instagram', 'youtube', 'facebook'].map(platform => (
                    <div key={platform} className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-zinc-600 tracking-widest ml-1">{platform} Link</label>
                      <input 
                        className="w-full bg-black border border-white/10 rounded-xl p-4 text-xs text-zinc-400 outline-none focus:border-red-600"
                        value={(settings.socials as any)[platform]}
                        onChange={e => {
                          const newSocials = { ...settings.socials, [platform]: e.target.value };
                          onUpdateSettings({ ...settings, socials: newSocials });
                        }}
                      />
                    </div>
                 ))}
              </div>
              <button 
                onClick={() => alert('Infrastructure updated successfully.')}
                className="bg-red-600 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center space-x-4 hover:bg-red-700 transition-all shadow-2xl shadow-red-900/30"
              >
                <Save size={20} />
                <span>Save All Site Configurations</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
