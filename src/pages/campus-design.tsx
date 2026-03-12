import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Ruler, PenTool, CheckCircle } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

interface Card { title: string; description: string; image?: string; }

const DEFAULTS = {
  heroTitle: 'Campus Design',
  heroSubtitle: 'Transform your educational vision into reality with our comprehensive campus design services. We create spaces that inspire learning and foster innovation.',
  heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  section1Title: 'Our Design Services',
  section2Title: "Why Choose Our Campus Design?",
  ctaTitle: "Ready to Design Your Dream Campus?",
  ctaSubtitle: "Let our expert team help you create a campus that inspires and empowers.",
  cards: [
    { title: 'Master Planning', description: 'Comprehensive campus master planning for new and existing institutions.', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { title: 'Architectural Design', description: 'Innovative architectural solutions for educational buildings.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { title: 'Interior Design', description: 'Functional and aesthetic interior spaces for learning.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { title: 'Landscape Design', description: 'Outdoor spaces that enhance the campus environment.', image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  ] as Card[],
  features: [
    'Space optimization and utilization analysis',
    'Sustainable and eco-friendly design',
    'NEP 2020 compliant layouts',
    'Accessibility and inclusivity',
    'Future-ready infrastructure',
    'Cost-effective solutions',
  ],
};

const PROCESS_STEPS = [
  { icon: Building2, title: 'Discovery', description: 'Understanding your needs and vision' },
  { icon: Ruler, title: 'Planning', description: 'Strategic space planning and analysis' },
  { icon: PenTool, title: 'Design', description: 'Creating detailed design proposals' },
  { icon: CheckCircle, title: 'Execution', description: 'Bringing designs to life' },
];

const CampusDesign = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('campus-design');

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
  const ctaTitle = data.ctaTitle ?? DEFAULTS.ctaTitle;
  const ctaSubtitle = data.ctaSubtitle ?? DEFAULTS.ctaSubtitle;
  const cards: Card[] = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;
  const features: string[] = (data.features && data.features.length > 0) ? data.features : DEFAULTS.features;

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="relative h-[500px] overflow-hidden">
        <img src={heroImage} alt="Campus Design" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-cm-blue/90 to-cm-blue/60" />
        <div className="relative w-full mx-auto px-2 sm:px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl text-white/90 mb-2">{heroSubtitle}</p>
            <Link to="/request-quote" className="btn-secondary inline-flex items-center gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-6">{section1Title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {cards.map((service) => (
              <div key={service.title} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-sm-hover transition-all duration-300 hover:-translate-y-2">
                {service.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-cm-blue-dark mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 bg-cm-gray">
        <div className="w-full mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-6">Our Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cm-blue/10 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-cm-blue" />
                </div>
                <div className="text-cm-blue font-bold mb-2">Step {index + 1}</div>
                <h3 className="text-lg font-bold text-cm-blue-dark mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">{section2Title}</h2>
              <ul className="space-y-4">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-cm-lime flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Campus Design" className="rounded-lg shadow-sm w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 bg-cm-blue">
        <div className="w-full mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">{ctaTitle}</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-2">{ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-quote" className="btn-secondary">Request a Quote</Link>
            <Link to="/contact-us" className="px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CampusDesign;
