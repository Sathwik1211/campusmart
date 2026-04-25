import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Video, Presentation, ArrowRight } from 'lucide-react';
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
  const cardsRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('collaboration');

  useEffect(() => {
    // Animations removed to maintain static professional aesthetic
  }, []);

  const heroSubtitle = data.heroSubtitle ?? DEFAULTS.heroSubtitle;
  const heroImage = data.heroImage ?? DEFAULTS.heroImage;
  const section1Title = data.section1Title ?? DEFAULTS.section1Title;
  const cards: CardItem[] = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;

  return (
    <main className="min-h-screen bg-white">
      {/* Synergy Bento Hero */}
      <section className="bg-white py-4 md:py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Top Left: Main Message */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:col-span-7 bg-[#EBF1FA] rounded-[40px] p-10 md:p-14 flex flex-col justify-center border border-cm-blue/10 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-2 h-2 rounded-full bg-cm-blue" />
                 <span className="text-[10px] font-black text-cm-blue uppercase tracking-widest">Connection Live</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-cm-blue-dark leading-none tracking-tighter uppercase mb-8">
                SYNERGY<br/>NETWORK.
              </h1>
              <p className="text-gray-500 text-base md:text-lg font-bold leading-tight max-w-sm mb-10">
                {heroSubtitle}
              </p>
              <Link to="/contact-us" className="w-max bg-cm-blue text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-transform flex items-center gap-3">
                START SYNC <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Top Right: Dynamic Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-5 rounded-[40px] overflow-hidden border-4 border-cm-gray shadow-xl relative group h-[300px] md:h-auto"
            >
               <img 
                 src="/images/heroes/collaboration.png" 
                 alt="Collaboration" 
                 className="w-full h-full object-cover transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-cm-blue-dark/40 to-transparent pointer-events-none" />
               <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cm-yellow flex items-center justify-center shadow-lg">
                     <Users className="w-5 h-5 text-cm-blue-dark" />
                  </div>
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Active Collab</span>
               </div>
            </motion.div>

            {/* Bottom Left: Social Proof / Status */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-4 bg-slate-900 rounded-[40px] p-8 text-white flex flex-col justify-between shadow-xl"
            >
               <div className="flex -space-x-3 mb-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-cm-gray overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-cm-blue flex items-center justify-center text-[10px] font-black">
                    +12
                  </div>
               </div>
               <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">Global Reach</h3>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-none">Connecting Institutions</p>
               </div>
            </motion.div>

            {/* Bottom Right: Quick Action / Metric */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-8 bg-cm-gray rounded-[40px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between border border-gray-100 shadow-sm"
            >
               <div className="flex items-center gap-6 mb-6 md:mb-0">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                     <MessageSquare className="w-7 h-7 text-cm-blue" />
                  </div>
                  <div>
                     <h4 className="text-lg font-black text-cm-blue-dark uppercase tracking-tighter leading-none mb-1">Sync Phase</h4>
                     <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none">Instant Communication</p>
                  </div>
               </div>
               <div className="flex items-center gap-8">
                  <div className="text-center">
                     <div className="text-2xl font-black text-cm-blue">100%</div>
                     <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Uptime</div>
                  </div>
                  <div className="h-8 w-[1px] bg-gray-200" />
                  <div className="text-center">
                     <div className="text-2xl font-black text-cm-yellow">0.2s</div>
                     <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Latency</div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Structured Synergy Features */}
      <section className="py-8 md:py-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-10">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-4xl font-bold text-cm-blue-dark mb-6 leading-tight tracking-tight">Synergy isn't just a Buzzword.</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-cm-blue pl-6 py-2 font-opensans">
                We believe that the best ideas are born in the friction between diverse minds. Our spaces are engineered to facilitate those collisions—making innovation inevitable.
              </p>
              <div className="flex flex-wrap gap-8 font-opensans">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-cm-blue">4.5x</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Interaction Boost</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-cm-yellow">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">User Engagement</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-2 bg-cm-blue/5 rounded-3xl blur-md" />
              <img src={heroImage} alt="Collaboration" className="relative rounded-2xl shadow-xl w-full h-[380px] object-cover" />
            </div>
          </div>

          {/* Staggered Vertical Card Layout */}
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-cm-blue-dark tracking-tighter mb-8">
              {section1Title}
            </h2>
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cards.map((card, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <div key={card.title} 
                       className="group p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-2xl transition-all duration-300 flex flex-col items-start shadow-sm">
                    <div className="w-16 h-16 bg-cm-blue/5 rounded-2xl flex items-center justify-center mb-6 border border-cm-blue/10 group-hover:bg-cm-blue transition-all duration-500 shadow-inner">
                      <Icon className="w-8 h-8 text-cm-blue group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-cm-blue-dark mb-3 tracking-tighter group-hover:text-cm-blue transition-colors leading-tight">{card.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-opensans flex-grow">{card.description}</p>
                    <div className="mt-8 pt-6 border-t border-gray-50 w-full flex items-center gap-2">
                      <Users className="w-4 h-4 text-cm-yellow" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cm-blue-dark/40">Synergy</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Balanced Call to Action */}
      <section className="py-16 bg-cm-gray/30 rounded-[3rem] mx-4 mb-12 text-center border border-cm-gray shadow-sm">
        <div className="max-w-4xl mx-auto px-6">
          <MessageSquare className="w-16 h-16 text-cm-blue mx-auto mb-8 opacity-50" />
          <h2 className="text-4xl md:text-6xl font-bold text-cm-blue-dark mb-10 tracking-tighter">Start the Conversation.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/contact-us" className="btn-primary px-16 py-5 text-xl">
              Connect With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Collaboration;
