import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Search, Laptop, Users } from 'lucide-react';

const Libraries = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  const features = [
    { title: 'Digital Cataloging', icon: Search, desc: 'Modern library management systems' },
    { title: 'E-Library Solutions', icon: Laptop, desc: 'Digital resources and e-books' },
    { title: 'Reading Spaces', icon: BookOpen, desc: 'Comfortable reading environments' },
    { title: 'Collaboration Zones', icon: Users, desc: 'Group study and discussion areas' },
  ];

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="relative h-[500px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Libraries" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-800/90 to-amber-600/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Library Solutions</h1>
            <p className="text-xl text-white/90 mb-8">
              Modern library solutions that blend traditional resources with digital innovation. 
              Create spaces that inspire learning and research.
            </p>
            <Link to="/request-quote" className="btn-secondary inline-flex items-center gap-2">
              Learn More
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-12">Library Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 text-center">
                <f.icon className="w-16 h-16 text-amber-700 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-cm-blue-dark mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Libraries;
