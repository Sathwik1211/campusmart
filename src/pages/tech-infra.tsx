import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { Monitor, Wifi, Server, Shield, ArrowRight } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

interface CardItem { title: string; description: string; }

const DEFAULTS = {
  heroTitle: 'Technology Infrastructure',
  heroSubtitle: 'Complete technology infrastructure solutions for modern campuses. From networking to security, we build the foundation for digital learning.',
  heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  section1Title: 'Our Services',
  cards: [
    { title: 'Interactive Displays', description: 'Smart boards and digital displays' },
    { title: 'Network Solutions', description: 'Campus-wide WiFi and networking' },
    { title: 'Server Infrastructure', description: 'On-premise and cloud solutions' },
    { title: 'Cybersecurity', description: 'Complete security solutions' }
  ] as CardItem[]
};

const ICONS = [Monitor, Wifi, Server, Shield];

const TechInfra = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('tech-infra');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards, 
          { opacity: 0, y: 30 }, 
          { 
            opacity: 1, y: 0, 
            duration: 0.6, 
            stagger: 0.1, 
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const heroTitle = data.heroTitle ?? DEFAULTS.heroTitle;
  const heroSubtitle = data.heroSubtitle ?? DEFAULTS.heroSubtitle;
  const heroImage = data.heroImage ?? DEFAULTS.heroImage;
  const section1Title = data.section1Title ?? DEFAULTS.section1Title;
  const cards: CardItem[] = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;

  return (
    <main className="min-h-screen bg-white">
      {/* Technical Blueprint Hero */}
      <section className="bg-white py-8 md:py-10 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="px-3 py-1 bg-cm-blue text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                  Core 1.0
                </div>
                <div className="h-[1px] w-12 bg-cm-blue/20" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Infra v25.4</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-cm-blue-dark leading-none tracking-tighter uppercase mb-8"
              >
                DIGITAL<br/>FOUNDATION.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-lg font-bold leading-tight max-w-md mb-10"
              >
                {heroSubtitle}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/contact-us" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-transform flex items-center justify-center gap-3">
                  INITIATE AUDIT <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="p-4 bg-cm-gray rounded-xl flex items-center gap-4">
                   <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Wifi className="w-5 h-5 text-cm-blue" />
                   </div>
                   <div>
                      <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Status</div>
                      <div className="text-xs font-black text-cm-blue-dark uppercase tracking-widest">Fully Encrypted</div>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* Right Visual Composition */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   className="col-span-2 row-span-2 rounded-[40px] overflow-hidden border-4 border-cm-gray shadow-2xl"
                 >
                    <img 
                      src="/images/heroes/tech-infra.png" 
                      alt="Infra" 
                      className="w-full h-full object-cover" 
                    />
                 </motion.div>
                 <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.5 }}
                   className="bg-cm-blue rounded-[30px] p-6 text-white flex flex-col justify-between shadow-xl"
                 >
                    <Server className="w-8 h-8 text-cm-yellow mb-4" />
                    <div>
                       <div className="text-2xl font-black">99.9%</div>
                       <div className="text-[9px] font-black uppercase tracking-widest text-white/50">Guaranteed Uptime</div>
                    </div>
                 </motion.div>
                 <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.6 }}
                   className="bg-cm-yellow rounded-[30px] p-6 text-cm-blue-dark flex flex-col justify-between shadow-xl"
                 >
                    <Shield className="w-8 h-8 mb-4" />
                    <div>
                       <div className="text-lg font-black uppercase tracking-tighter leading-none">Military Grade</div>
                       <div className="text-[9px] font-black uppercase tracking-widest opacity-50">Secure Nodes</div>
                    </div>
                 </motion.div>
              </div>
              {/* Grid Decoration */}
              <div className="absolute -inset-10 z-0 opacity-5 pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(#0046ad 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Structured Nodes Layout */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-10">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-cm-blue-dark mb-4">
                {section1Title}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6 font-opensans">
                We design and implement scalable digital foundations that power modern learning. Our expertise ranges from high-speed connectivity to enterprise-grade cloud security.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-cm-gray rounded-xl font-opensans">
                  <div className="text-xl font-bold text-cm-blue mb-1">99.9%</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Typical Uptime</div>
                </div>
                <div className="p-5 bg-cm-gray rounded-xl font-opensans">
                  <div className="text-xl font-bold text-cm-blue mb-1">10Gbps</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Backbone Speed</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img src={heroImage} alt={heroTitle} className="rounded-2xl shadow-xl w-full h-[350px] object-cover" />
            </div>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={card.title} className="group p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl transition-all duration-300 flex flex-col items-start shadow-sm">
                  <div className="w-16 h-16 bg-cm-blue/5 rounded-2xl flex items-center justify-center mb-6 border border-cm-blue/10 group-hover:bg-cm-blue transition-all duration-500 shadow-inner">
                    <Icon className="w-8 h-8 text-cm-blue group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-cm-blue-dark mb-3 tracking-tighter group-hover:text-cm-blue transition-colors leading-tight">{card.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-opensans flex-grow">{card.description}</p>
                  <div className="mt-8 pt-6 border-t border-gray-50 w-full flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cm-yellow" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cm-blue-dark/40">Secure Tech</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standard Call to Action */}
      <section className="py-12 bg-cm-blue-dark text-white rounded-[2rem] mx-4 mb-10 overflow-hidden shadow-xl">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Shield className="w-12 h-12 text-cm-yellow mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Foundation for Digital Excellence.</h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
            Join 4000+ campuses trusted by our engineering expertise. We build the architecture that sustains the future of Indian education.
          </p>
          <Link to="/request-quote" className="btn-secondary inline-block px-10 py-3 text-base">
            Get Technical Audit
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TechInfra;
