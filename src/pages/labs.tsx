import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, FlaskConical, Atom, Monitor } from 'lucide-react';
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
  const { data } = usePageData('labs');

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
        <img src={heroImage} alt="Labs" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-green-600/60" />
        <div className="relative w-full mx-auto px-2 sm:px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl text-white/90 mb-2">{heroSubtitle}</p>
            <Link to="/request-quote" className="btn-secondary inline-flex items-center gap-2">
              Get Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-6">{section1Title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {cards.map((lab, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={lab.title} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-sm-hover transition-all duration-300 hover:-translate-y-2">
                  {lab.image && (
                    <div className="h-48 overflow-hidden">
                      <img src={lab.image} alt={lab.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6 text-center">
                    <Icon className="w-10 h-10 text-green-700 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-cm-blue-dark">{lab.title}</h3>
                    {lab.description && <p className="text-gray-600 text-sm mt-1">{lab.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-12 bg-cm-gray/50">
        <div className="w-full mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-green-600">
              <h2 className="text-2xl font-bold text-cm-blue-dark mb-4">The Traditional Lab System</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Conventional laboratories often focus on isolated experiments. However, modern educational requirements demand an integrated approach where theory and practice blend seamlessly.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our solutions transition your institution from traditional static labs to <strong>Curriculum Mapped Innovation Centres</strong>, providing students with hands-on experience that aligns with NEP 2020 objectives.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Lab Design to Execution', desc: 'Space planning & 3D modeling' },
                { title: 'Build & Supply', desc: 'Premium equipment & furniture' },
                { title: 'Installation & Training', desc: 'Expert setup & teacher workshops' },
                { title: 'Support & Audit', desc: 'Regular maintenance & safety audits' },
              ].map((service) => (
                <div key={service.title} className="bg-green-600 p-6 rounded-xl text-white shadow-md">
                  <h4 className="font-bold text-sm mb-1">{service.title}</h4>
                  <p className="text-white/80 text-xs">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Labs;
