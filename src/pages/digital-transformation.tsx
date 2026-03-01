import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DigitalTransformation = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="relative h-[500px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Digital" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-cm-blue/90 to-cm-blue/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Transformation</h1>
            <p className="text-xl text-white/90 mb-8">
              Transform your campus with cutting-edge digital solutions. From smart classrooms 
              to complete campus automation.
            </p>
            <Link to="/request-quote" className="btn-secondary inline-flex items-center gap-2">
              Start Transformation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-cm-blue-dark mb-12">Digital Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Smart Classrooms', 'Campus Automation', 'Digital Learning'].map((s) => (
              <div key={s} className="bg-white rounded-xl p-8 shadow-card">
                <h3 className="text-xl font-bold text-cm-blue-dark mb-4">{s}</h3>
                <p className="text-gray-600">Comprehensive solutions for modern education.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DigitalTransformation;
