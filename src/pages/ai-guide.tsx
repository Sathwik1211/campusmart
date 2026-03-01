import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Download } from 'lucide-react';

const AIGuide = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">AI Implementation Guide</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A comprehensive guide for implementing AI in educational institutions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-card">
            <h2 className="text-2xl font-bold text-cm-blue-dark mb-6">What's Inside</h2>
            <ul className="space-y-4 text-gray-700 mb-8">
              <li>• Understanding AI in Education</li>
              <li>• Implementation Roadmap</li>
              <li>• Technology Requirements</li>
              <li>• Best Practices</li>
              <li>• Case Studies</li>
            </ul>
            <button className="btn-primary inline-flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Guide
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AIGuide;
