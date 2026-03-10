import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

const DEFAULTS = {
  heroTitle: 'Campus Design + Execution',
  heroSubtitle: 'End-to-end campus design and construction services. From concept to completion, we bring your vision to life.',
  heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  section1Title: 'Our Process',
  features: [
    'Site Analysis',
    'Concept Design',
    'Detailed Planning',
    'Construction',
    'Handover'
  ]
};

const CampusDesignExecution = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('campus-design-execution');

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
  const features = (data.features && data.features.length > 0) ? data.features : DEFAULTS.features;

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="bg-cm-lime py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">{heroTitle}</h1>
          <p className="text-xl text-black/70 max-w-3xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={heroImage} alt={heroTitle} className="rounded-2xl shadow-xl w-full h-auto object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">{section1Title}</h2>
              <ul className="space-y-4">
                {features.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-cm-lime flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/request-quote" className="btn-primary inline-flex items-center gap-2 mt-8">
                Get Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CampusDesignExecution;
