import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Rocket, Target, Zap } from 'lucide-react';
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
  const { data } = usePageData('innovation');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  const heroTitle = data.heroTitle ?? DEFAULTS.heroTitle;
  const heroSubtitle = data.heroSubtitle ?? DEFAULTS.heroSubtitle;
  const heroImage = data.heroImage ?? DEFAULTS.heroImage;
  const section1Title = data.section1Title ?? DEFAULTS.section1Title;
  const cards: Card[] = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="relative h-[500px] overflow-hidden">
        <img src={heroImage} alt="Innovation" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-yellow-400/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl text-white/90 mb-8">{heroSubtitle}</p>
            <Link to="/request-quote" className="btn-secondary inline-flex items-center gap-2">
              Start Innovating <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-12">{section1Title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cards.map((f, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={f.title} className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 text-center">
                  {f.image
                    ? <img src={f.image} alt={f.title} className="w-16 h-16 mx-auto mb-4 object-cover rounded-xl" />
                    : <Icon className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                  }
                  <h3 className="text-lg font-bold text-cm-blue-dark mb-2">{f.title}</h3>
                  <p className="text-gray-600">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Innovation;
