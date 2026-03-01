import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Users, Target, Award, Handshake, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Corporate = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      const stats = statsRef.current?.children;
      if (stats) {
        gsap.fromTo(
          stats,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Building2, value: '4000+', label: 'Partner Campuses' },
    { icon: Users, value: '7+', label: 'Years of Experience' },
    { icon: Target, value: '100%', label: 'Client Satisfaction' },
    { icon: Award, value: '50+', label: 'Awards Won' },
  ];

  const values = [
    {
      icon: Handshake,
      title: 'Partnership',
      description: 'We believe in building long-term partnerships with educational institutions.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Constantly evolving to bring the latest technology and design to campuses.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality in every project we undertake.',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-cm-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Campus Mart
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We are a consortium of architects, designers, and campus innovators who strive 
            to bring learning outcomes through the latest infrastructure and edtech solutions.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-cm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cm-blue/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-cm-blue" />
                </div>
                <div className="text-3xl font-bold text-cm-blue-dark mb-1">{value}</div>
                <div className="text-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                To transform educational infrastructure across India by providing comprehensive 
                campus solutions that blend physical spaces with cutting-edge digital technology. 
                We aim to create learning environments that inspire, engage, and empower students 
                and educators alike.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                As the first company in Asia to bring curriculum-mapped innovations to the campus 
                industry, we continue to lead the way in educational transformation.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Campus Mart Team"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-cm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="w-14 h-14 rounded-full bg-cm-blue/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-cm-blue" />
                </div>
                <h3 className="text-xl font-bold text-cm-blue-dark mb-3">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-12">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Priya Sharma', role: 'Chief Design Officer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Amit Patel', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-bold text-cm-blue-dark">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-16 bg-cm-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals who are passionate about 
            transforming education. Explore our open positions and become part of our journey.
          </p>
          <a href="/partnership" className="btn-secondary inline-block">
            View Open Positions
          </a>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-16 bg-cm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-12">
            Our Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'European Educational Group',
              'MAXHUB',
              'Nike',
              'ViewSonic',
              'Kidken',
              'Little Tikes',
              'ButterflyFields',
              'ALTOP',
              'Skill O Fun',
              'WriteOnWalls',
              'ICTS',
              'INFINITI',
            ].map((partner) => (
              <div key={partner} className="bg-white rounded-lg p-4 flex items-center justify-center h-20 shadow-card">
                <span className="text-sm font-semibold text-gray-600 text-center">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Corporate;
