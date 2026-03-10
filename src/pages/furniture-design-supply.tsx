import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

const DEFAULTS = {
  heroTitle: 'Furniture Design + Supply',
  heroSubtitle: 'Complete furniture solutions for educational institutions. From design to delivery, we provide ergonomic and durable furniture.',
  section1Title: 'Our Furniture Services',
  heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  features: [
    'Custom Design',
    'Bulk Manufacturing',
    'Quality Assurance',
    'Installation'
  ]
};

const FurnitureDesign = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('furniture-design-supply');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  const heroTitle = data.heroTitle ?? DEFAULTS.heroTitle;
  const heroSubtitle = data.heroSubtitle ?? DEFAULTS.heroSubtitle;
  const section1Title = data.section1Title ?? DEFAULTS.section1Title;
  const heroImage = data.heroImage ?? DEFAULTS.heroImage;
  const features = (data.features && data.features.length > 0) ? data.features : DEFAULTS.features;

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="bg-cm-red py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{heroTitle}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">{section1Title}</h2>
              <ul className="space-y-4">
                {features.map((feature: string) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-cm-red flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2 mt-8">
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div>
              <img src={heroImage} alt={heroTitle} className="rounded-2xl shadow-xl w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FurnitureDesign;
