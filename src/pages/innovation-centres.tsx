import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const InnovationCentres = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="bg-cm-yellow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-cm-blue-dark mb-6">Innovation Centres</h1>
          <p className="text-xl text-cm-blue-dark/70 max-w-3xl mx-auto">
            Create spaces that foster creativity and innovation. From maker spaces to 
            research labs, we build environments for breakthrough thinking.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">What We Offer</h2>
              <ul className="space-y-4 text-gray-700">
                <li>• Maker Spaces</li>
                <li>• Research Labs</li>
                <li>• Innovation Hubs</li>
                <li>• Startup Incubators</li>
              </ul>
              <Link to="/request-quote" className="btn-primary inline-flex items-center gap-2 mt-8">
                Get Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Innovation" className="rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InnovationCentres;
