import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const FurnitureDesign = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="bg-cm-red py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Furniture Design + Supply</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Complete furniture solutions for educational institutions. From design to delivery, 
            we provide ergonomic and durable furniture.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">Our Furniture Services</h2>
              <ul className="space-y-4">
                {['Custom Design', 'Bulk Manufacturing', 'Quality Assurance', 'Installation'].map((s) => (
                  <li key={s} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-cm-red" />
                    <span className="text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2 mt-8">
                Browse Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Furniture" className="rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FurnitureDesign;
