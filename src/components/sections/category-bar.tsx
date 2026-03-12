import { useEffect, useRef, useState } from 'react';
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

const mockArticles = [
  { title: "Sustainable Campus Architecture & Green Building Trends", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400", href: "#" },
  { title: "Integrating AI Workstations in Modern Classrooms", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400", href: "#" },
  { title: "Ergonomic Furniture Solutions For Student Wellbeing", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=400", href: "#" },
  { title: "Next-Gen Research Labs & Equipment Guidelines", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400", href: "#" },
  { title: "Smart Libraries: Digital Transformation Strategies", image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=400", href: "#" },
];


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

const CategoryBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, delay: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(
        iconsRef.current?.children || [],
        { y: 40, scale: 0.5, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.7, ease: 'back.out(1.7)' }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white border-b border-gray-100 pb-0 relative z-[60]"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={iconsRef}
          className="flex items-center justify-between gap-4 overflow-x-auto min-w-max pt-6 pb-4 [&::-webkit-scrollbar]:hidden"
        >
          {categories.map(({ icon: Icon, label, href }) => (
            <div
              key={label}
              className="relative group cursor-pointer"
              onMouseEnter={() => setActiveCategory(label)}
            >
              <Link to={href} className="flex flex-col items-center justify-center gap-2 px-2 hover:text-cm-blue transition-colors">
                <div className={`p-3 rounded-xl transition-all duration-300 ${activeCategory === label ? 'bg-blue-50 text-cm-blue shadow-sm' : 'bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-cm-blue'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] md:text-xs font-semibold whitespace-nowrap ${activeCategory === label ? 'text-cm-blue' : 'text-gray-700'}`}>
                  {label}
                </span>

                {/* Active Underline Indicator */}
                <div className={`absolute -bottom-[17px] left-0 w-full h-[3px] bg-cm-yellow transition-transform duration-300 origin-center ${activeCategory === label ? 'scale-x-100' : 'scale-x-0'}`} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <div
        className={`absolute left-0 top-full w-full bg-[#f4f3ef] border-t-[3px] border-cm-yellow shadow-xl origin-top transition-all duration-300 overflow-hidden ${activeCategory ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">

          {/* Article Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
            {mockArticles.map((article, i) => (
              <Link key={i} to={article.href} className="group flex flex-col gap-3">
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="font-semibold text-gray-800 text-xs md:text-sm leading-tight group-hover:text-cm-blue transition-colors box-border pr-2">
                  {article.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
