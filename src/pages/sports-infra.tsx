import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

const DEFAULTS = {
  heroTitle: 'Sports Infrastructure',
  heroSubtitle: 'World-class sports facilities designed to promote physical fitness and athletic excellence in educational institutions.',
  heroImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  section1Title: 'Sports Facilities',
  section2Title: 'Our Services Include',
  cards: [
    { title: 'Basketball Court', description: '' },
    { title: 'Football Ground', description: '' },
    { title: 'Tennis Court', description: '' },
    { title: 'Swimming Pool', description: '' },
    { title: 'Athletics Track', description: '' },
    { title: 'Indoor Sports', description: '' },
  ],
  features: [
    'Surface Installation',
    'Equipment Supply',
    'Maintenance'
  ],
  // Helper images for cards since CMS doesn't store card images natively
  _cardImages: [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1622163642998-1ea36b1ade5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1461896836934-voices?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  ]
};

const SportsInfra = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('sports-infra');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power4.out' });
      
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards, 
          { scale: 0.8, opacity: 0 }, 
          { 
            scale: 1, opacity: 1, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: 'back.out(2)',
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
  const section2Title = data.section2Title ?? DEFAULTS.section2Title;
  const cards = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;
  const features = (data.features && data.features.length > 0) ? data.features : DEFAULTS.features;

  return (
    <main className="min-h-screen bg-white text-opensans">
      {/* Modified Hero */}
      <section className="bg-white py-8 md:py-12 px-4 sm:px-6 relative overflow-hidden border-b-[4px] border-cm-blue-dark">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#1e3a8a 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="lg:w-1/2 flex flex-col justify-center"
            >
              {/* Badge */}
              <div className="inline-block bg-cm-yellow text-cm-blue-dark font-black uppercase tracking-widest text-xs px-4 py-1.5 border-4 border-cm-blue-dark mb-4 w-max shadow-[4px_4px_0px_0px_#1e3a8a] hover:shadow-[2px_2px_0px_0px_#1e3a8a] hover:translate-y-[2px] hover:translate-x-[2px] transition-all">
                High Performance
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter leading-[0.9] text-cm-blue-dark uppercase break-words">
                {heroTitle}
              </h1>
              
              <p className="text-lg md:text-xl text-cm-blue-dark font-bold leading-relaxed max-w-xl mb-8 border-l-[4px] border-cm-blue pl-4 py-1 bg-cm-blue/5">
                {heroSubtitle}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/request-proposal" className="group bg-cm-blue text-white px-8 py-3 font-black uppercase text-base border-4 border-cm-blue-dark shadow-[6px_6px_0px_0px_#FFB800] hover:shadow-[3px_3px_0px_0px_#FFB800] hover:translate-y-[3px] hover:translate-x-[3px] transition-all flex items-center gap-3">
                  Request Proposal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.2 }}
              className="lg:w-1/2 relative mt-4 lg:mt-0"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full">
                {/* Decorative shadow layers */}
                <div className="absolute inset-0 bg-cm-blue border-4 border-cm-blue-dark translate-x-3 translate-y-3" />
                <div className="absolute inset-0 bg-cm-yellow border-4 border-cm-blue-dark translate-x-6 translate-y-6" />
                
                <img 
                  src={heroImage} 
                  alt={heroTitle} 
                  className="absolute inset-0 w-full h-full object-cover border-4 border-cm-blue-dark  transition-all duration-500" 
                />
                
                {/* Floating element */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -left-4 bottom-8 bg-white border-4 border-cm-blue-dark p-3 shadow-[4px_4px_0px_0px_#1e3a8a] rotate-[-2deg]"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-black uppercase tracking-wider text-sm text-cm-blue-dark">Elite Grade</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Grid of Facilities */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
            <h2 className="text-2xl md:text-3xl font-bold text-cm-blue-dark tracking-tighter">{section1Title}</h2>
            <div className="hidden md:block h-1 w-32 bg-cm-yellow rounded-full" />
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((s: any, i: number) => {
              const image = DEFAULTS._cardImages[i % DEFAULTS._cardImages.length];
              return (
                <div key={s.title} className="group bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-2xl  border border-gray-100 flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={image} alt={s.title} className="w-full h-full object-cover transition-transform duration-700 group- opacity-90 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-cm-blue-dark/5 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-cm-blue-dark mb-4 group-hover:text-cm-blue transition-colors tracking-tight">{s.title}</h3>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-4 bg-cm-yellow rounded-full" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cm-blue/60">Professional</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-cm-blue font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        View Specs <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="py-10 bg-cm-gray/30 border-y border-cm-gray rounded-[2rem] mx-4 mb-16 overflow-hidden shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4">
              <h2 className="text-2xl md:text-4xl font-bold text-cm-blue-dark leading-tight mb-4 tracking-tighter">
                {section2Title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                From concept to completion, we deliver turnkey solutions for elite athletic performance.
              </p>
            </div>
            
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature: string) => (
                  <div key={feature} className="bg-white p-6 rounded-2xl shadow-md border border-gray-50 transform  transition-transform duration-300">
                    <div className="w-12 h-12 bg-cm-blue/10 mb-4 flex items-center justify-center rounded-xl border border-cm-blue/10">
                      <CheckCircle className="w-6 h-6 text-cm-blue" />
                    </div>
                    <h3 className="text-sm font-bold text-cm-blue-dark mb-1 tracking-tight">{feature}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <section className="py-16 text-center rounded-t-[4rem] bg-cm-blue-dark text-white border-t-4 border-cm-yellow/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 tracking-tighter">Ready to Build Your Arena?</h2>
          <Link to="/contact-us" className="btn-secondary px-10 py-3 text-lg font-bold transition-all inline-block shadow-lg">
            Get Project Audit
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SportsInfra;
