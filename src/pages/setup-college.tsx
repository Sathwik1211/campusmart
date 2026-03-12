import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Download } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

const DEFAULTS = {
  heroTitle: 'Setting Up a College in India',
  heroSubtitle: 'Step-by-step guide to establishing a new college in India.',
  section1Title: 'Guide Contents',
  features: [
    'Regulatory Requirements',
    'Infrastructure Planning',
    'Faculty Recruitment',
    'Curriculum Development',
    'Accreditation Process'
  ]
};

const SetupCollege = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('setup-college');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  const heroTitle = data.heroTitle ?? DEFAULTS.heroTitle;
  const heroSubtitle = data.heroSubtitle ?? DEFAULTS.heroSubtitle;
  const section1Title = data.section1Title ?? DEFAULTS.section1Title;
  const features = (data.features && data.features.length > 0) ? data.features : DEFAULTS.features;

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="bg-cm-blue py-6">
        <div className="w-full mx-auto px-2 sm:px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{heroTitle}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-4">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-cm-blue-dark mb-6">{section1Title}</h2>
            <ul className="space-y-4 text-gray-700 mb-2">
              {features.map((feature: string) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <button className="btn-primary inline-flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Guide
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SetupCollege;
