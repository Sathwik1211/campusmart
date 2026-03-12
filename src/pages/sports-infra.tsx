import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
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
  const { data } = usePageData('sports-infra');

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
  const cards = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;
  const features = (data.features && data.features.length > 0) ? data.features : DEFAULTS.features;

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="relative h-[500px] overflow-hidden">
        <img src={heroImage} alt={heroTitle} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-cm-cyan/90 to-cm-cyan/60" />
        <div className="relative w-full mx-auto px-2 sm:px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl text-white/90 mb-2">
              {heroSubtitle}
            </p>
            <Link to="/request-quote" className="btn-secondary inline-flex items-center gap-2">
              Get Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-6">{section1Title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {cards.map((s: any, i: number) => {
              const image = DEFAULTS._cardImages[i % DEFAULTS._cardImages.length];
              return (
                <div key={s.title} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-sm-hover transition-all duration-300 hover:-translate-y-2">
                  <div className="h-56 overflow-hidden">
                    <img src={image} alt={s.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-cm-blue-dark">{s.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-4 bg-cm-gray">
        <div className="w-full mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-3xl font-bold text-cm-blue-dark mb-2">{section2Title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {features.map((feature: string) => (
              <div key={feature} className="bg-white rounded-xl p-8 shadow-sm">
                <CheckCircle className="w-12 h-12 text-cm-cyan mx-auto mb-4" />
                <h3 className="text-xl font-bold text-cm-blue-dark">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SportsInfra;
