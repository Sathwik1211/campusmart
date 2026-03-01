import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const AIDigitalDesign = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="bg-cm-purple py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">AI/Digital Design + Supply</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Cutting-edge AI and digital solutions for modern education. Transform learning 
            with technology.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="AI" className="rounded-2xl shadow-xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">Digital Solutions</h2>
              <ul className="space-y-4">
                {['AI Learning Stations', 'Digital Content', 'VR/AR Solutions', 'Smart Classrooms'].map((s) => (
                  <li key={s} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-cm-purple" />
                    <span className="text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
              <Link to="/request-quote" className="btn-primary inline-flex items-center gap-2 mt-8">
                Get Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AIDigitalDesign;
