import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { Lightbulb, Rocket, Target, Zap } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

interface Card { title: string; description: string; image?: string; }

const DEFAULTS = {
  heroTitle: 'Innovation Centers',
  heroSubtitle: 'Create spaces that nurture creativity and innovation. From maker spaces to research centers, we build environments that inspire breakthrough thinking.',
  heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  section1Title: 'Innovation Solutions',
  cards: [
    { title: 'Innovation Labs', description: 'Spaces for creative thinking and prototyping' },
    { title: 'Startup Incubators', description: 'Support for student entrepreneurship' },
    { title: 'Research Centers', description: 'Dedicated research and development spaces' },
    { title: 'Maker Spaces', description: 'Hands-on creation and experimentation areas' },
  ] as Card[],
};

const ICONS = [Lightbulb, Rocket, Target, Zap];

const Innovation = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('innovation');

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
      {/* Standard Corporate Hero */}
      <section ref={heroRef} className="bg-cm-blue py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-opensans">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Innovation Pods Grid */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-cm-blue-dark tracking-tighter">
              {section1Title}
            </h2>
            <div className="hidden md:block h-1 w-32 bg-cm-yellow" />
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((f, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={f.title} className="group p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-start shadow-sm">
                  <div className="w-16 h-16 bg-cm-blue/5 rounded-2xl flex items-center justify-center mb-6 border border-cm-blue/10 group-hover:bg-cm-blue transition-all duration-500 shadow-inner">
                    <Icon className="w-8 h-8 text-cm-blue group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-cm-blue-dark mb-3 tracking-tighter group-hover:text-cm-blue transition-colors leading-tight">{f.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed font-opensans flex-grow">{f.description}</p>
                  <div className="mt-8 pt-6 border-t border-gray-50 w-full flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-cm-yellow animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cm-blue-dark/40">Next-Gen</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact & Performance */}
      <section className="py-10 bg-cm-gray/30 rounded-[2rem] mx-4 mb-16 overflow-hidden shadow-sm border border-cm-gray/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-cm-blue-dark mb-6 leading-tight tracking-tighter">Innovation is a Habit.</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl font-opensans">
                We measure our success not just by the technology we deploy, but by the transformations we ignite. Our innovation hubs create environments where ideas flow freely and execution follows fast.
              </p>
              
              <div className="flex flex-wrap gap-6 font-opensans">
                <div className="p-6 bg-white border-b-4 border-cm-blue rounded-xl shadow-md">
                  <div className="text-4xl font-bold text-cm-blue mb-1 tracking-tighter">500+</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Startups Launched</div>
                </div>
                <div className="p-6 bg-cm-blue text-white rounded-xl shadow-md transform -rotate-1">
                  <div className="text-4xl font-bold text-cm-yellow mb-1 tracking-tighter">100k+</div>
                  <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Prototypes Built</div>
                </div>
              </div>
            </div>
            
            <div className="relative p-2 bg-white rounded-3xl shadow-xl">
              <img src={heroImage} alt="Innovation" className="rounded-2xl w-full h-[380px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Lightbulb className="w-12 h-12 text-cm-yellow mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl md:text-4xl font-bold text-cm-blue-dark mb-8 tracking-tighter">Ready to Build the Future?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/request-proposal" className="btn-primary px-8 py-3 text-base font-bold">
              Request Space Concept
            </Link>
            <Link to="/contact-us" className="btn-secondary px-8 py-3 text-base font-bold">
              Consult with Architects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Innovation;
