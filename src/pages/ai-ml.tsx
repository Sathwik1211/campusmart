import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { Brain, Cpu, Database, Code, ArrowRight } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';
interface Card { title: string; description: string; image?: string; }

const DEFAULTS = {
  heroTitle: 'AI & Machine Learning',
  heroSubtitle: 'Cutting-edge AI and ML solutions for educational institutions. Prepare students for the future with hands-on learning experiences.',
  heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  section1Title: 'AI/ML Solutions',
  section2Title: 'Future-Ready Education',
  cards: [
    { title: 'AI Learning Stations', description: 'Interactive AI-powered learning environments' },
    { title: 'ML Labs', description: 'Machine learning experimentation setups' },
    { title: 'Coding Platforms', description: 'Programming and development environments' },
    { title: 'Computing Infrastructure', description: 'High-performance computing solutions' },
  ] as Card[],
  features: [] as string[],
};

const ICONS = [Brain, Database, Code, Cpu];

const AIML = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('ai-ml');

  useEffect(() => {
    // Animations removed to maintain static professional aesthetic
  }, []);

  const heroTitle = data.heroTitle ?? DEFAULTS.heroTitle;
  const heroSubtitle = data.heroSubtitle ?? DEFAULTS.heroSubtitle;
  const heroImage = data.heroImage ?? DEFAULTS.heroImage;
  const section1Title = data.section1Title ?? DEFAULTS.section1Title;
  const section2Title = data.section2Title ?? DEFAULTS.section2Title;
  const cards: Card[] = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;

  return (
    <main className="min-h-screen bg-white">
      {/* Neural Burst Hero */}
      <section className="bg-white py-4 md:py-6 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-3/5 z-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-cm-blue/5 rounded-full mb-6 border border-cm-blue/10"
              >
                <div className="w-2 h-2 rounded-full bg-cm-blue animate-pulse" />
                <span className="text-[10px] font-black text-cm-blue uppercase tracking-[0.2em]">Next-Gen Intelligence</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-8xl font-black text-cm-blue-dark leading-none tracking-tighter uppercase mb-6"
              >
                NEURAL<br/><span className="text-cm-blue">DYNAMICS.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-lg md:text-xl font-bold leading-tight max-w-xl mb-10"
              >
                {heroSubtitle}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact-us" className="bg-cm-blue text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-transform flex items-center gap-3">
                  SYSTEM AUDIT <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex -space-x-3 items-center">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-cm-gray overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" />
                    </div>
                  ))}
                  <div className="pl-6 text-[10px] font-black text-cm-blue-dark uppercase tracking-widest">
                    4k+ Nodes Active
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-2/5 relative">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <div className="relative rounded-[60px] overflow-hidden border-8 border-cm-gray shadow-2xl bg-white aspect-square">
                  <img 
                    src="/images/heroes/ai-ml.png" 
                    alt="AI Dynamics" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-cm-yellow rounded-3xl p-6 shadow-xl flex items-center justify-center border-4 border-white">
                  <Brain className="w-full h-full text-cm-blue-dark" />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[32px] shadow-2xl border border-gray-100 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cm-blue/10 rounded-xl flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-cm-blue" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Processing</div>
                      <div className="text-xl font-black text-cm-blue-dark">94.2 TFLOPS</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Abstract Background Blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-50">
                <div className="absolute top-0 left-0 w-64 h-64 bg-cm-yellow/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-cm-blue/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module Grid */}
      <section className="py-8 md:py-12 relative">
        <div className="w-full mx-auto px-4 sm:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-cm-blue-dark tracking-tighter">{section1Title}</h2>
            <div className="hidden md:block h-1 w-32 bg-cm-yellow rounded-full" />
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((s, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={s.title} className="group bg-white border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 rounded-2xl flex flex-col items-center text-center shadow-sm">
                  <div className="relative mb-8">
                    <div className="w-16 h-16 bg-cm-blue/5 rounded-2xl flex items-center justify-center group-hover:bg-cm-blue transition-all duration-500 border border-cm-blue/10 shadow-inner">
                      <Icon className="w-8 h-8 text-cm-blue group-hover:text-white" />
                    </div>
                  </div>

                  <div className="relative font-opensans flex-grow">
                    <h3 className="text-xl font-bold text-cm-blue-dark mb-3 tracking-tighter group-hover:text-cm-blue transition-colors leading-tight">{s.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{s.description}</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-50 w-full flex items-center justify-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-cm-yellow" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cm-blue-dark/40">AI-Powered</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Futuristic Feature Section */}
      <section className="py-8 md:py-12 bg-cm-gray/30 border-y border-cm-gray rounded-[2rem] mx-4 mb-12 overflow-hidden shadow-sm">
        <div className="w-full mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="p-8 bg-white border border-gray-200 rounded-[2rem] relative shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-cm-blue-dark mb-6 tracking-tight">{section2Title}</h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8 font-opensans">
                  Our AI/ML systems are built on a modular architecture, allowing institutions to scale from single-station coding pods to campus-wide neural networks.
                </p>
                <ul className="space-y-4 font-opensans">
                  {['Scalable Architecture', 'Low-Latency Neural Compute', 'NEP 2020 Dataset Integration'].map((item) => (
                    <li key={item} className="flex items-center gap-3 group">
                      <div className="w-2 h-2 bg-cm-yellow rounded-full group- transition-transform" />
                      <span className="text-cm-blue-dark font-bold text-xs tracking-wide">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-cm-blue blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <img src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Engine" className="relative rounded-[2rem] border-4 border-white shadow-2xl transition-all duration-700 h-[320px] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Tech CTA */}
      <section className="py-16 text-center relative overflow-hidden bg-cm-blue-dark text-white rounded-t-[4rem] border-t-4 border-cm-yellow/50">
        <div className="relative z-10 w-full mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter">Initiate Sync Phase</h2>
          <p className="text-lg text-white/50 mb-8 font-bold uppercase tracking-[0.2em] font-opensans">Contact our core engineering team today.</p>
          <Link to="/contact-us" className="btn-secondary px-12 py-3 text-xl font-bold transition-all shadow-2xl">
            Establish Connection
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AIML;
