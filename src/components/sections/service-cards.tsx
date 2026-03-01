import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { useSiteContent } from '@/contexts/SiteContentContext';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem { title: string; bgColor: string; textColor: string; href: string; }

const defaultServices: ServiceItem[] = [
  { title: 'Furniture Design+ Supply', bgColor: '#ef4444', textColor: '#ffffff', href: '/furniture-design-supply' },
  { title: 'Campus Design+ Execution', bgColor: '#a3e635', textColor: '#000000', href: '/campus-design-execution' },
  { title: 'Sports Design+ Execution', bgColor: '#06b6d4', textColor: '#ffffff', href: '/sports-design-execution' },
  { title: 'AI/Digital Design+ Supply', bgColor: '#a855f7', textColor: '#ffffff', href: '/ai-digital-design-supply' },
];

const ServiceCards = () => {
  const { content } = useSiteContent();
  const services: ServiceItem[] = content.home_services || defaultServices;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards) return;

      const directions = ['-100%', '100%', '100%', '100%'];
      const axes = ['x', 'y', 'y', 'x'];

      Array.from(cards).forEach((card, i) => {
        gsap.fromTo(
          card,
          { [axes[i]]: directions[i], opacity: 0 },
          {
            [axes[i]]: 0, opacity: 1, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
        const text = card.querySelector('h3');
        if (text) {
          gsap.fromTo(text, { y: 20, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.4, delay: 0.3 + i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ title, bgColor, textColor, href }) => (
          <Link
            key={title}
            to={href}
            className="service-card group"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <h3 className="group-hover:tracking-wider transition-all duration-300 font-bold text-lg px-6 py-8">
              {title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;
