import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PremiumCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
  badgeColor?: string;
  className?: string;
  h?: number | string;
}

const PremiumCard = ({ title, description, image, href, badge, badgeColor = 'bg-white/20', className = '', h }: PremiumCardProps) => {
  return (
    <Link 
      to={href} 
      className={`group relative overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl transition-all duration-700  hover:shadow-cm-blue/20 ${!h ? 'aspect-[4/5] md:aspect-[3/4]' : ''} ${className}`}
      style={h ? { height: h } : {}}
    >
      {/* Background Image */}
      <div className="absolute inset-0 transition-transform duration-1000 group-">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
      </div>

      {/* Badge */}
      {badge && (
        <div className="absolute top-6 left-6 z-20">
          <div className={`px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-gray-900 bg-white/90 shadow-lg flex items-center gap-2 ${badgeColor}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-900/40" />
            {badge}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight transform group- transition-transform duration-500">
          {title}
        </h3>
        <p className="text-white/60 text-sm font-medium leading-relaxed mb-6 line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {description}
        </p>

        <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-[0.3em] group/btn">
          EXPLORE 
          <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
        </div>
      </div>

      {/* Border Highlight Effect */}
      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-[2.5rem] transition-colors duration-700 pointer-events-none" />
    </Link>
  );
};

export default PremiumCard;
