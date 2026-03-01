import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Download } from 'lucide-react';

const Lookbook = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Play Furniture Lookbook</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Play area solutions for early childhood education.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl p-8 shadow-card">
            <img 
              src="https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="Lookbook" 
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h2 className="text-2xl font-bold text-cm-blue-dark mb-4">Download Play Furniture Lookbook</h2>
            <p className="text-gray-600 mb-6">Explore our range of play area furniture.</p>
            <button className="btn-primary inline-flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Lookbook;
