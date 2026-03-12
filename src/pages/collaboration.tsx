import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, MessageSquare, Video, Presentation } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

interface CardItem { title: string; description: string; }

const DEFAULTS = {
  heroTitle: 'Collaboration Spaces',
  heroSubtitle: 'Foster teamwork and innovation with purpose-built collaboration spaces. Designed for modern learning and working styles.',
  heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  section1Title: 'Collaboration Features',
  cards: [
    { title: 'Collaborative Spaces', description: 'Designed for teamwork and group projects' },
    { title: 'Discussion Rooms', description: 'Private spaces for focused conversations' },
    { title: 'Video Conferencing', description: 'Connect with remote participants seamlessly' },
    { title: 'Presentation Areas', description: 'Equipped for effective presentations' }
  ] as CardItem[]
};

const ICONS = [Users, MessageSquare, Video, Presentation];

const Collaboration = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('collaboration');

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
  const cards: CardItem[] = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="relative h-[500px] overflow-hidden">
        <img src={heroImage} alt={heroTitle} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-700/90 to-orange-500/60" />
        <div className="relative w-full mx-auto px-2 sm:px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroTitle}</h1>
            <p className="text-xl text-white/90 mb-2">
              {heroSubtitle}
            </p>
            <Link to="/request-quote" className="btn-secondary inline-flex items-center gap-2">
              Explore Options
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-6">{section1Title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {cards.map((card, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div key={card.title} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-sm-hover transition-all duration-300 hover:-translate-y-2 text-center">
                  <Icon className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-cm-blue-dark mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Collaboration;
