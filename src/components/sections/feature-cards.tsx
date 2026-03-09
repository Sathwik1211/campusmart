import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FileText, MoveUpRight } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';

gsap.registerPlugin(ScrollTrigger);

const defaultFeatures = [
  { title: 'Digital Transformation', description: 'Cutting-edge digital infrastructure transforming how modern campuses operate and learn.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=90', href: '/digital-transformation', tag: 'Digital', color: '#3B82F6', h: 340 },
  { title: 'AI-Powered Learning Stations', description: 'Intelligent AI stations personalising education for every student at every level.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=90', href: '/ai-stations', tag: 'AI & Tech', color: '#8B5CF6', h: 220 },
  { title: 'Innovation Centres', description: 'Purpose-built spaces designed to unlock creativity, collaboration and breakthrough thinking.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=90', href: '/innovation-centres', tag: 'Innovation', color: '#EC4899', h: 270 },
  { title: 'Smart Classrooms', description: 'IoT-connected rooms with interactive boards, real-time analytics and immersive tools.', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=90', href: '/tech-infra', tag: 'Tech Infra', color: '#06B6D4', h: 220 },
  { title: 'Campus Furniture Design', description: 'Thoughtfully engineered, ergonomic furniture that elevates the academic experience.', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=90', href: '/furniture', tag: 'Furniture', color: '#F59E0B', h: 360 },
  { title: 'Sports Infrastructure', description: 'World-class athletic facilities nurturing champions, wellness, and team spirit.', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=90', href: '/sports-infra', tag: 'Sports', color: '#10B981', h: 240 },
  { title: 'Library Management', description: 'AI-driven smart library solutions providing seamless access to global knowledge.', image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=90', href: '/library-management', tag: 'Library', color: '#6366F1', h: 300 },
  { title: 'Science & Tech Labs', description: 'Fully equipped STEM laboratories built for discovery, experimentation and innovation.', image: 'https://images.unsplash.com/photo-1532094349884-543290e34c7d?auto=format&fit=crop&w=800&q=90', href: '/labs', tag: 'Labs', color: '#14B8A6', h: 200 },
  { title: 'Campus Master Planning', description: 'Visionary campus planning from concept to construction, built to inspire generations.', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=90', href: '/campus-design', tag: 'Planning', color: '#F97316', h: 320 },
  { title: 'AR / VR Learning', description: 'Immersive reality experiences bringing complex concepts to vivid, unforgettable life.', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=90', href: '/digital-transformation', tag: 'AR / VR', color: '#A855F7', h: 240 },
  { title: 'Campus Automation', description: 'Smart systems automating admissions, attendance, finance and governance seamlessly.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=90', href: '/campus-automation', tag: 'Automation', color: '#0EA5E9', h: 200 },
  { title: 'Collaboration Spaces', description: 'Dynamic, flexible zones engineered for productive teamwork and creative ideation.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=90', href: '/collaboration', tag: 'Spaces', color: '#EF4444', h: 260 },
];

const defaultSidebar = {
  classifieds: [
    { label: 'Colleges / Universities for Sale', href: '/classifieds' },
    { label: 'Education Infra Funding', href: '/classifieds' },
    { label: 'Partner with Running Colleges', href: '/partnership' },
  ],
  resources: [
    { label: 'Complete Guide on AI Implementation', href: '/ai-guide' },
    { label: 'Setting Up a College in India', href: '/setup-college' },
    { label: 'UGC Guidelines for Digital Campus', href: '/ugc-guidelines' },
    { label: 'Product Catalog 2025', href: '/product-catalog' },
    { label: 'Lookbook – Play Furniture', href: '/lookbook' },
  ],
  completedProjects: [
    { label: 'Campus Master Planning', href: '/catalogues' },
    { label: '20 Stunning College Buildings', href: '/catalogues' },
    { label: 'Academic buildings', href: '/catalogues' },
    { label: 'Research facilities', href: '/catalogues' },
    { label: 'Student life centers', href: '/catalogues' },
    { label: 'Athletic complexes', href: '/catalogues' },
  ],
  contacts: [
    { bg: '#FFD700', title: 'Design & Architecture', contact: 'info@campusmart.in', href: 'mailto:info@campusmart.in', isEmail: true },
    { bg: '#00c4cc', title: 'Campus Innovations', contact: '9966109191', href: 'tel:+919966109191', isEmail: false },
    { bg: '#C8FF00', title: 'Partner Campus', contact: '9866091111', href: 'tel:+919866091111', isEmail: false },
  ]
};

const FeatureCards = () => {
  const { content } = useSiteContent();
  const features = content.home_features || defaultFeatures;
  const sidebar = content.home_sidebar || defaultSidebar;
  const { classifieds, resources, completedProjects, contacts } = sidebar;

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run animation on desktop to avoid WebKit column rendering bugs with transforms
    const isMobile = window.innerWidth < 1024;
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.fc-card');
      if (!cards) return;

      if (isMobile) {
        // Safe animation for mobile WebKit CSS columns: NO transforms, NO opacity 0 start
        // Set explicitly to opacity 1 just to be safe
        gsap.set(cards, { opacity: 1, clearProps: 'all' });
      } else {
        // Full animation for desktop
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, stagger: 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none none' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const [cols, setCols] = useState(3);

  useLayoutEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      // 2 columns on mobile/tablet, 3 on desktop
      setCols(w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 px-4 bg-[#f0f2f5]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* ─── Masonry Grid (Pure Flexbox to fix WebKit bugs) ─── */}
          <div className="w-full md:flex-1 min-w-0 flex gap-4">
            {Array.from({ length: cols }).map((_, colIndex) => (
              <div key={colIndex} className="flex-1 flex flex-col gap-4">
                {features.filter((_: any, i: number) => i % cols === colIndex).map(({ title, description, image, href, tag, color, h }: any) => (
                  <Link
                    key={title}
                    to={href}
                    className="fc-card group flex flex-col w-full min-h-[220px] rounded-2xl overflow-hidden relative shadow-lg"
                    style={{ height: cols === 2 ? Math.min(h || 240, 240) : (h || 240) }}
                  >
                    {/* Background image */}
                    <img
                      src={image}
                      alt={title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Permanent subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />

                    {/* Category badge */}
                    <div
                      className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow"
                      style={{ background: color + 'CC' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-white inline-block"
                        style={{ boxShadow: '0 0 4px white' }}
                      />
                      {tag}
                    </div>

                    {/* Arrow icon — top right on hover */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400">
                      <MoveUpRight className="w-4 h-4 text-white" />
                    </div>

                    {/* Bottom content — frosted glass panel slides up */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out p-4">
                      {/* Always visible title */}
                      <h3
                        className="text-white font-extrabold text-sm leading-snug drop-shadow-lg mb-0 group-hover:mb-2 transition-all duration-300"
                        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
                      >
                        {title}
                      </h3>

                      {/* Description — reveals on hover with max-height transition */}
                      <div
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{ maxHeight: 0 }}
                        ref={(el) => {
                          if (!el) return;
                          (el as HTMLElement).style.maxHeight = '0px';
                          (el as HTMLElement).closest('.group')?.addEventListener('mouseenter', () => {
                            (el as HTMLElement).style.maxHeight = '80px';
                          });
                          (el as HTMLElement).closest('.group')?.addEventListener('mouseleave', () => {
                            (el as HTMLElement).style.maxHeight = '0px';
                          });
                        }}
                      >
                        <p className="text-white/85 text-xs leading-relaxed mt-1">{description}</p>
                        <span className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold tracking-wide uppercase" style={{ color }}>
                          Explore →
                        </span>
                      </div>
                    </div>

                    {/* Hover border ring */}
                    <div
                      className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 transition-all duration-400 pointer-events-none"
                      style={{ '--tw-ring-color': color } as React.CSSProperties}
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* ─── Sidebar ─── */}
          <div className="w-full md:w-[230px] flex-shrink-0 flex flex-col gap-3">

            <Link
              to="/request-quote"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#0a2463] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#1a3a8f] transition-all text-xs shadow-md"
            >
              <FileText className="w-4 h-4" />
              Request a Quote
            </Link>

            {/* Classifieds */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="py-2.5 px-4" style={{ background: '#00c4cc' }}>
                <h3 className="text-white font-extrabold uppercase tracking-[0.15em] text-center text-[11px]">Classifieds</h3>
              </div>
              <ul className="divide-y divide-gray-100">
                {classifieds.map(({ label, href }: any) => (
                  <li key={label}>
                    <Link to={href} className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-700 hover:text-blue-600 hover:bg-blue-50/60 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="py-2.5 px-4" style={{ background: '#00c4cc' }}>
                <h3 className="text-white font-extrabold uppercase tracking-[0.15em] text-center text-[11px]">Resources</h3>
              </div>
              <ul className="divide-y divide-gray-100">
                {resources.map(({ label, href }: any) => (
                  <li key={label}>
                    <Link to={href} className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-700 hover:text-blue-600 hover:bg-blue-50/60 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50">
                    Completed Projects
                  </div>
                </li>
                {completedProjects.map(({ label, href }: any) => (
                  <li key={label}>
                    <Link to={href} className="flex items-center gap-2 px-4 py-2 text-[11px] text-blue-600 hover:bg-blue-50/60 hover:underline transition-colors">
                      <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Job Openings */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Job Openings</h3>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-gray-500 italic">Join with us as Influencers</p>
              </div>
            </div>

            {contacts.map(({ bg, title, contact, href }: any) => (
              <a
                key={title}
                href={href}
                className="block w-full py-3.5 px-4 rounded-xl text-center transition-all hover:brightness-95 hover:-translate-y-0.5 shadow-md"
                style={{ background: bg }}
              >
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/70">For Queries on</p>
                <p className="text-[13px] font-black uppercase tracking-wide text-black leading-tight mt-0.5">{title}</p>
                <p className="text-[11px] text-black/80 mt-1 font-medium">{contact}</p>
              </a>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
