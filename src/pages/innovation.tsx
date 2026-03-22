import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { PenSquare, X, CheckCircle2 } from 'lucide-react';
import api from '@/api/client';

interface Card { title: string; description: string; }
interface Section { title: string; description: string; image?: string; }

const DEFAULTS = {
  heroTitle: 'Launch startup and innovation centres at your college with our platform-driven managed services',
  cards: [
    { title: 'Idea Ideation & research', description: 'Early stage support systems for nurturing creativity.' },
    { title: 'INCUBATION', description: 'Nurturing student ideas into Minimum Viable Products.' },
    { title: 'ACCELERATION', description: 'Speed up expansion nodes following rapid execution cycles.' },
    { title: 'MARKET ACCESS', description: 'Investor connecting layers targeting global distribution pipelines.' },
  ] as Card[],
  sections: [
    { 
      title: 'About Us', 
      description: 'We connect entrepreneurship and innovation, starting from student mindsets to successful startups. Every step of our process empowers students to discover, adapt, and grow with accurate mentorship and accurate workflow benchmarks.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      title: 'Startups & Innovation', 
      description: 'Innovation is inside our DNA. Leveraging our managed innovation systems for higher educational institutes, we bring together student minds and experienced faculty with startup accelerators that fuel high velocity growth cycles.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      title: 'Managed Services', 
      description: 'We provide end-to-end solutions for tech and design incubations. Absolute digital hubs equipped with next-gen tooling layouts including smooth support systems following fully manageable structural frameworks securely.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      title: 'Venture Studio Launchpad', 
      description: 'Accredited venture validation frameworks validating prototype nodes scaling up safely with accurate investor pipelines connecting loads aligning natively onto marketplace environments seamlessly.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      title: 'Start Free, Scale at Your Pace', 
      description: 'Our pricing scales as your centres adapt to startup launches. Safe, modular, and affordable load balancing matrices targeting campus innovation designs framing accurate institutional growth models securely.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    { 
      title: 'Global Chapters', 
      description: 'Connect globally with our expansive hub networks, sharing node references to startup founders directly aligning workflow loops natively and safely across campus networks everywhere.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ] as Section[]
};

const Innovation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<any>({});

  const fetchData = () => {
     api.get('/pages/innovation')
       .then(res => {
          try {
             const parsed = res.data.pageData ? JSON.parse(res.data.pageData) : {};
             setData(parsed);
             setEditData(parsed);
          } catch { setData({}); }
       })
       .catch(() => setData({}))
       .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    setIsAdmin(!!localStorage.getItem('adminToken'));
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
    });
    return () => ctx.revert();
  }, [loading]);

  const handleSave = async () => {
      try {
          await api.post('/pages/innovation', { pageData: JSON.stringify(editData) });
          alert('Page updated successfully!');
          setData(editData);
          setIsEditModalOpen(false);
      } catch {
          alert('Failed to save page data.');
      }
  };

  if (loading) return (
     <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-cm-blue border-t-transparent rounded-full animate-spin" />
     </div>
  );

  const heroTitle = data.heroTitle ?? DEFAULTS.heroTitle;
  const cards: Card[] = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;
  const sections: Section[] = (data.sections && data.sections.length > 0) ? data.sections : DEFAULTS.sections;

  return (
    <main ref={containerRef} className="min-h-screen bg-slate-50 pb-20 relative">
      {/* Admin Edit Floating Button */}
      {isAdmin && (
         <button 
           onClick={() => setIsEditModalOpen(true)}
           className="fixed bottom-6 right-6 p-4 bg-slate-900 text-white rounded-full shadow-2xl z-[500] hover:scale-105 transition-transform flex items-center gap-2 font-bold text-sm"
         >
           <PenSquare className="w-5 h-5 text-cm-yellow" /> Edit Page
         </button>
      )}

      {/* Hero Banner Title */}
      <section className="bg-cm-blue py-12 md:py-16 text-center text-white px-4">
        <div className="max-w-5xl mx-auto">
           <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-tight md:leading-snug">
             {heroTitle}
           </h1>
        </div>
      </section>

      {/* 4-Item Grid Cards Row */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((c, i) => (
               <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 font-black text-slate-800 text-lg">
                     {i+1}
                  </div>
                  <div>
                     <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">{c.title}</h3>
                     <p className="text-slate-500 text-xs font-opensans leading-relaxed">{c.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* Consecutive Details Rows List */}
      <section className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {sections.map((sec, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
               <div className="md:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                  <img src={sec.image || 'https://via.placeholder.com/600x450?text=Innovation'} alt={sec.title} className="w-full h-full object-cover" />
               </div>
               <div className="md:col-span-7 space-y-4">
                  <div className="h-1 w-16 bg-cm-yellow rounded-full" />
                  <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">{sec.title}</h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-opensans">{sec.description}</p>
                  <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-cm-blue">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Managed Solutions Supported
                  </div>
               </div>
            </div>
         ))}
      </section>

      {/* CTA Box */}
      <section className="py-16 px-4">
         <div className="max-w-5xl mx-auto bg-gradient-to-br from-cm-yellow via-amber-400 to-amber-500 rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
               <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Ready to talk?</h3>
               <p className="text-slate-800/80 text-sm font-bold mt-1">Connect with our execution platform managers for instant deployment guides.</p>
            </div>
            <div className="flex gap-4">
               <Link to="/contact-us" className="px-8 py-3 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all text-sm">Contact Us</Link>
            </div>
         </div>
      </section>

      {/* Edit Modal Overlay */}
      {isEditModalOpen && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
               <div className="p-6 border-b flex items-center justify-between bg-slate-50">
                  <div>
                     <h2 className="text-lg font-black text-slate-900">Edit Page Content</h2>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Dynamic CMS Loader</p>
                  </div>
                  <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-slate-400 hover:text-red-500 rounded-xl transition-all"><X className="w-5 h-5" /></button>
               </div>
               
               <div className="p-6 overflow-y-auto space-y-5 flex-1">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-slate-700">Hero Main Title</label>
                     <textarea 
                       className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 h-24" 
                       value={editData.heroTitle ?? heroTitle}
                       onChange={(e) => setEditData({...editData, heroTitle: e.target.value})}
                     />
                  </div>
                  
                  {/* Additional section edit grids can be expanded here simply as inputs binds nodes easily */}
                  <p className="text-[10px] text-center text-slate-400">Save edits to apply instantly to the frontend screen layouts feed nodes securely.</p>
               </div>

               <div className="p-6 border-t flex justify-end gap-3 bg-slate-50/50">
                  <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-slate-900">Cancel</button>
                  <button onClick={handleSave} className="px-8 py-2.5 bg-blue-600 text-white text-sm font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg">Save Changes</button>
               </div>
            </div>
         </div>
      )}
    </main>
  );
};

export default Innovation;
