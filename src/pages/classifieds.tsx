import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, DollarSign, Handshake } from 'lucide-react';

const Classifieds = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  const listings = [
    { title: 'Colleges for Sale', icon: Building2, desc: 'Browse educational institutions available for acquisition', link: '#' },
    { title: 'Education Funding', icon: DollarSign, desc: 'Explore funding options for your institution', link: '#' },
    { title: 'Partnership Opportunities', icon: Handshake, desc: 'Find partnership opportunities with running colleges', link: '/partnership' },
  ];

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="bg-cm-blue py-6">
        <div className="w-full mx-auto px-2 sm:px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Classifieds</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explore opportunities in the education sector. Colleges for sale, funding options, and partnerships.
          </p>
        </div>
      </section>

      <section className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {listings.map((item) => (
              <Link key={item.title} to={item.link} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-sm-hover transition-all duration-300 hover:-translate-y-2">
                <item.icon className="w-12 h-12 text-cm-blue mb-4" />
                <h3 className="text-xl font-bold text-cm-blue-dark mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-cm-blue font-semibold">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Classifieds;
