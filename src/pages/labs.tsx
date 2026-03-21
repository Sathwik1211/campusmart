import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, FlaskConical, Atom, Monitor, CheckCircle } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

interface Card { title: string; description: string; image?: string; name?: string; }

const DEFAULTS = {
  heroTitle: 'Laboratory Solutions',
  heroSubtitle: 'State-of-the-art laboratory setups for schools and colleges. From STEM labs to specialized research facilities, we deliver excellence.',
  heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  section1Title: 'Lab Types',
  cards: [
    { title: 'Chemistry Lab', description: '', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Physics Lab', description: '', image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Biology Lab', description: '', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Computer Lab', description: '', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ] as Card[],
};

const ICONS = [FlaskConical, Atom, Microscope, Monitor];

const Labs = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('labs');

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
  const cards: Card[] = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;

  return (
    <main className="min-h-screen bg-white">
      {/* Standard Corporate Hero - Side by Side */}
      <section ref={heroRef} className="bg-cm-blue py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-left text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {heroTitle}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed font-opensans max-w-xl">
              {heroSubtitle}
            </p>
          </div>
          <div className="lg:w-1/2">
            <img src={heroImage} alt={heroTitle} className="rounded-2xl shadow-xl w-full h-[350px] object-cover border-4 border-cm-blue-dark" />
          </div>
        </div>
      </section>

      {/* Lab Modules Grid Layout */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-cm-blue-dark tracking-tighter">
              {section1Title}
            </h2>
            <div className="hidden md:block h-1 w-24 bg-cm-yellow rounded-full" />
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((lab, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={lab.title} className="group bg-white border border-gray-100 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col shadow-sm overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={lab.image} alt={lab.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-cm-blue-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-cm-blue group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-cm-blue-dark mb-2 tracking-tighter group-hover:text-cm-blue transition-colors leading-tight">{lab.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-opensans flex-grow">
                      {lab.description || 'Specialized turnkey solutions for advanced institutional learning.'}
                    </p>
                    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                       <div className="flex items-center gap-1.5">
                          <div className="h-1 w-3 bg-cm-yellow rounded-full" />
                          <span className="text-[10px] font-bold uppercase tracking-tight text-cm-blue/60">Research Ready</span>
                       </div>
                       <div className="text-cm-blue opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
                          <ArrowRight className="w-4 h-4" />
                       </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison: Static to Dynamic Lab Evolution */}
      <section className="py-12 bg-cm-gray/30 rounded-[2rem] mx-4 mb-16 overflow-hidden shadow-sm border border-cm-gray">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="p-8 md:p-12 bg-cm-blue-dark rounded-[2.5rem] text-white shadow-xl relative">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                <Atom className="w-12 h-12 text-cm-yellow" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight tracking-tighter">Static Lab to Innovation Centre.</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8 font-opensans">
                Traditional labs are warehouses for equipment. Our Innovation Centres are ecosystems for discovery— curriculum-mapped and NEP-ready.
              </p>
              <ul className="space-y-4 font-opensans text-sm">
                {[
                  'Integrated Curriculum Mapping',
                  'Safety-First Modular Furniture',
                  'Turnkey Execution Strategy'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 group">
                    <div className="w-5 h-5 bg-cm-yellow rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <CheckCircle className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-white/80 group-hover:text-white transition-opacity">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="grid grid-cols-2 gap-4 font-opensans">
                {[
                  { title: 'Project Design', desc: 'BIM & 3D space planning' },
                  { title: 'Modular Build', desc: 'Custom lab workstations' },
                  { title: 'Installation', desc: 'NABL compliant setup' },
                  { title: 'Certification', desc: 'Safety & quality audits' },
                ].map((service) => (
                  <div key={service.title} className="p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all transform hover:-translate-y-1 shadow-sm font-opensans">
                    <h4 className="font-bold text-cm-blue-dark mb-1 tracking-tight text-sm">{service.title}</h4>
                    <p className="text-gray-500 text-[11px] leading-tight">{service.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center lg:text-left font-opensans">
                <Link to="/contact-us" className="inline-flex items-center gap-2 text-cm-blue font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
                  Full Service List <ArrowRight className="w-4 h-4 text-cm-yellow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Callout */}
      <section className="py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Microscope className="w-12 h-12 text-cm-yellow mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl md:text-5xl font-bold text-cm-blue-dark leading-tight mb-6 tracking-tighter">Certified Excellence.</h2>
          <div className="h-1 w-24 bg-cm-blue mx-auto rounded-full" />
        </div>
      </section>
    </main>
  );
};

export default Labs;
