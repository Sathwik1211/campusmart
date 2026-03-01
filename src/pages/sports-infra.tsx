import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const SportsInfra = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  const sports = [
    { name: 'Basketball Court', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Football Ground', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Tennis Court', image: 'https://images.unsplash.com/photo-1622163642998-1ea36b1ade5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Swimming Pool', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Athletics Track', image: 'https://images.unsplash.com/photo-1461896836934- voices?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { name: 'Indoor Sports', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="relative h-[500px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Sports" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-cm-cyan/90 to-cm-cyan/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sports Infrastructure</h1>
            <p className="text-xl text-white/90 mb-8">
              World-class sports facilities designed to promote physical fitness and athletic excellence 
              in educational institutions.
            </p>
            <Link to="/request-quote" className="btn-secondary inline-flex items-center gap-2">
              Get Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-12">Sports Facilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sports.map((s) => (
              <div key={s.name} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2">
                <div className="h-56 overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-cm-blue-dark">{s.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-cm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-cm-blue-dark mb-8">Our Services Include</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Surface Installation', 'Equipment Supply', 'Maintenance'].map((s) => (
              <div key={s} className="bg-white rounded-xl p-8 shadow-card">
                <CheckCircle className="w-12 h-12 text-cm-cyan mx-auto mb-4" />
                <h3 className="text-xl font-bold text-cm-blue-dark">{s}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SportsInfra;
