import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Wifi, Server, Shield } from 'lucide-react';

const TechInfra = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  const services = [
    { title: 'Interactive Displays', icon: Monitor, desc: 'Smart boards and digital displays' },
    { title: 'Network Solutions', icon: Wifi, desc: 'Campus-wide WiFi and networking' },
    { title: 'Server Infrastructure', icon: Server, desc: 'On-premise and cloud solutions' },
    { title: 'Cybersecurity', icon: Shield, desc: 'Complete security solutions' },
  ];

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="relative h-[500px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Tech Infra" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-cm-blue/90 to-cm-blue/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Technology Infrastructure</h1>
            <p className="text-xl text-white/90 mb-8">
              Complete technology infrastructure solutions for modern campuses. From networking 
              to security, we build the foundation for digital learning.
            </p>
            <Link to="/request-quote" className="btn-secondary inline-flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 text-center">
                <s.icon className="w-16 h-16 text-cm-blue mx-auto mb-4" />
                <h3 className="text-lg font-bold text-cm-blue-dark mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TechInfra;
