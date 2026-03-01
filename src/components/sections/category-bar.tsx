import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import {
  Ruler,
  Armchair,
  Circle,
  Brain,
  Monitor,
  Building2,
  Microscope,
  Users,
  Lightbulb,
} from 'lucide-react';

const CategoryBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          delay: 0.6,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        iconsRef.current?.children || [],
        { y: 40, scale: 0.5, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.7,
          ease: 'back.out(1.7)',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const categories = [
    { icon: Ruler, label: 'Campus Design', href: '/campus-design' },
    { icon: Armchair, label: 'Furniture', href: '/furniture' },
    { icon: Circle, label: 'Sports Infra', href: '/sports-infra' },
    { icon: Brain, label: 'AI/ML', href: '/ai-ml' },
    { icon: Monitor, label: 'Tech Infra', href: '/tech-infra' },
    { icon: Building2, label: 'Libraries', href: '/libraries' },
    { icon: Microscope, label: 'Labs', href: '/labs' },
    { icon: Users, label: 'Collaboration', href: '/collaboration' },
    { icon: Lightbulb, label: 'Innovation', href: '/innovation' },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-white border-b border-gray-100 py-6 overflow-x-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={iconsRef}
          className="flex items-center justify-between gap-4 min-w-max"
        >
          {categories.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              to={href}
              className="category-icon group"
            >
              <div className="icon-wrapper">
                <Icon className="w-7 h-7 text-gray-600 transition-colors duration-300" />
              </div>
              <span className="text-[10px] md:text-xs whitespace-nowrap">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
