import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Users, Target, Award, Handshake, TrendingUp } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

gsap.registerPlugin(ScrollTrigger);

const Corporate = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('corporate');

  const heroTitle = data.heroTitle ?? 'About Campus Mart';
  const heroSubtitle = data.heroSubtitle ?? 'We are a consortium of architects, designers, and campus innovators who strive to bring learning outcomes through the latest infrastructure and edtech solutions.';
  const section1Title = data.section1Title ?? 'Our Mission';
  const section2Title = data.section2Title ?? 'Our Core Values';


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
      <section ref={heroRef} className="bg-cm-blue py-6">
        <div className="w-full mx-auto px-2 sm:px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {heroTitle}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 bg-cm-gray">
        <div className="w-full mx-auto px-2 sm:px-4">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
      <section className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">{section1Title}</h2>
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
                className="rounded-lg shadow-sm w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-4 bg-cm-gray">
        <div className="w-full mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-6">
            {section2Title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-sm-hover transition-shadow">
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

      {/* Why Sign Up Section */}
      <section className="py-12 bg-cm-yellow/20">
        <div className="w-full mx-auto px-2 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-8">
              Why should you sign up with Campus Mart?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-cm-blue flex-shrink-0" />
                  <p className="text-gray-700 font-medium">India's leading Consortium for Campus Infrastructure</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-cm-blue flex-shrink-0" />
                  <p className="text-gray-700 font-medium">Bespoke Design to Delivery across 100+ categories</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-cm-blue flex-shrink-0" />
                  <p className="text-gray-700 font-medium">Strategic Planning for new Campuses from scratch</p>
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-cm-blue flex-shrink-0" />
                  <p className="text-gray-700 font-medium">4000+ Partner Campuses across India</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-cm-blue flex-shrink-0" />
                  <p className="text-gray-700 font-medium">Exclusive access to global educational brands</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-cm-blue flex-shrink-0" />
                  <p className="text-gray-700 font-medium">NEP 2020 aligned innovation & digital tools</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-6">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
      <section id="careers" className="py-4 bg-cm-blue">
        <div className="w-full mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-2">
            We're always looking for talented individuals who are passionate about
            transforming education. Explore our open positions and become part of our journey.
          </p>
          <a href="/partnership" className="btn-secondary inline-block">
            View Open Positions
          </a>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-4 bg-cm-gray">
        <div className="w-full mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-2">
            Quality Partners
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            We collaborate with the world's most trusted educational equipment manufacturers and design houses.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
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
              <div key={partner} className="bg-white rounded-lg p-4 flex items-center justify-center h-20 shadow-sm">
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
