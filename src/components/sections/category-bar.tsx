import { Link } from 'react-router-dom';
import {
  Compass,
  Armchair,
  Trophy,
  Brain,
  Monitor,
  BookOpen,
  Microscope,
  Users,
  Lightbulb,
} from 'lucide-react';

const categories = [
  { icon: Compass, label: 'Campus Design', href: '/campus-design' },
  { icon: Armchair, label: 'Furniture', href: '/furniture' },
  { icon: Trophy, label: 'Sports Infra', href: '/sports-infra' },
  { icon: Brain, label: 'AI/ML', href: '/ai-ml' },
  { icon: Monitor, label: 'Tech Infra', href: '/tech-infra' },
  { icon: BookOpen, label: 'Libraries', href: '/libraries' },
  { icon: Microscope, label: 'Labs', href: '/labs' },
  { icon: Users, label: 'Collaboration', href: '/collaboration' },
  { icon: Lightbulb, label: 'Innovation', href: '/innovation' },
];

const CategoryBar = () => {
  return (
    <div className="bg-white border-b border-gray-100 relative z-[60]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-6 overflow-x-auto min-w-max pt-2 pb-2 [&::-webkit-scrollbar]:hidden">
          {categories.map(({ icon: Icon, label, href }) => (
            <div key={label} className="relative group cursor-pointer">
              <Link to={href} className="flex flex-col items-center justify-center gap-2 px-3 hover:text-cm-blue transition-colors">
                <div className="text-gray-400 group-hover:text-cm-blue transition-colors">
                  <Icon className="w-6 h-6 md:w-8 h-8" />
                </div>
                <span className="text-xs md:text-sm font-bold whitespace-nowrap text-gray-700 tracking-tight group-hover:text-cm-blue transition-colors uppercase">
                  {label}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
