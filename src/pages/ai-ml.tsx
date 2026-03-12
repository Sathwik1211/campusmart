import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Cpu, Database, Code } from 'lucide-react';
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
  const { data } = usePageData('ai-ml');

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
  const section2Title = data.section2Title ?? DEFAULTS.section2Title;
  const cards: Card[] = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="relative h-[500px] overflow-hidden">
        <img src={heroImage} alt="AI/ML" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-cm-purple/90 to-cm-purple/60" />
        <div className="relative w-full mx-auto px-2 sm:px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl text-white/90 mb-2">{heroSubtitle}</p>
            <Link to="/request-quote" className="btn-secondary inline-flex items-center gap-2">
              Explore Solutions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-6">{section1Title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {cards.map((s, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={s.title} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-sm-hover transition-all duration-300 hover:-translate-y-2 text-center">
                  {s.image
                    ? <img src={s.image} alt={s.title} className="w-16 h-16 mx-auto mb-4 object-cover rounded-xl" />
                    : <Icon className="w-16 h-16 text-cm-purple mx-auto mb-4" />
                  }
                  <h3 className="text-lg font-bold text-cm-blue-dark mb-2">{s.title}</h3>
                  <p className="text-gray-600">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-4 bg-cm-gray">
        <div className="w-full mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">{section2Title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our AI/ML solutions help educational institutions stay ahead of the curve.
                From AI learning stations to complete ML labs, we provide everything needed
                to prepare students for the AI-driven future.
              </p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="AI/ML" className="rounded-lg shadow-sm w-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AIML;
