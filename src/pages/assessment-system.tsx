import { useEffect, useRef } from 'react';
import gsap from 'gsap';
// Imports

const AssessmentSystem = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Student Assessment System</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Automated assessment platforms for higher education. From theory exams to 
            lab practicals with analytics-driven tracking.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Online Exams', 'Plagiarism Check', 'Performance Analytics'].map((f) => (
              <div key={f} className="bg-white rounded-xl p-8 shadow-card text-center">
                <h3 className="text-xl font-bold text-cm-blue-dark mb-4">{f}</h3>
                <p className="text-gray-600">Comprehensive assessment solution.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AssessmentSystem;
