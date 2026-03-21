import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Sun, Wind, Droplets, Recycle } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';

gsap.registerPlugin(ScrollTrigger);

const DEFAULTS = {
  heroTitle: 'New Learning Environments',
  heroSubtitle: 'Create innovative spaces that inspire learning, foster creativity, and adapt to the evolving needs of modern education.',
  heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  section1Title: 'Specialized Learning Spaces',
  cards: [
    {
      title: 'Wondergarten Room',
      description: 'A magical space designed for early childhood development with interactive learning elements.',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      href: '/furniture',
    },
    {
      title: 'Rumpus Room',
      description: 'Active play area designed for physical development and social interaction.',
      image: 'https://images.unsplash.com/photo-1596908181055-e10301d47d03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      href: '/furniture',
    },
    {
      title: 'Art & Craft Room',
      description: 'Creative space equipped for artistic expression and craft activities.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      href: '/furniture',
    },
    {
      title: 'Music Room',
      description: 'Acoustically designed space for musical education and practice.',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      href: '/furniture',
    },
    {
      title: 'Discovery Pod',
      description: 'STEM-focused learning environment for scientific exploration.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      href: '/labs',
    },
    {
      title: 'Collaboration Room',
      description: 'Flexible space designed for group projects and teamwork.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      href: '/collaboration',
    },
  ]
};

const NewEnvironments = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('new-environments');

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
    });

    return () => ctx.revert();
  }, []);

  const heroTitle = data.heroTitle ?? DEFAULTS.heroTitle;
  const heroSubtitle = data.heroSubtitle ?? DEFAULTS.heroSubtitle;
  const heroImage = data.heroImage ?? DEFAULTS.heroImage;
  const section1Title = data.section1Title ?? DEFAULTS.section1Title;

  const cards = (data.cards && data.cards.length > 0)
    ? data.cards.map((c: any, i: number) => ({
      ...c,
      image: c.image || DEFAULTS.cards[i]?.image || DEFAULTS.cards[0].image,
      href: c.href || DEFAULTS.cards[i]?.href || '/furniture'
    }))
    : DEFAULTS.cards;

  const sustainabilityFeatures = [
    { icon: Leaf, title: 'Green Building', description: 'Eco-friendly construction materials and practices' },
    { icon: Sun, title: 'Solar Power', description: 'Renewable energy integration for campus operations' },
    { icon: Wind, title: 'Natural Ventilation', description: 'Optimized airflow design for energy efficiency' },
    { icon: Droplets, title: 'Water Conservation', description: 'Rainwater harvesting and recycling systems' },
    { icon: Recycle, title: 'Waste Management', description: 'Comprehensive recycling and waste reduction' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[500px] overflow-hidden">
        <img
          src={heroImage}
          alt={heroTitle}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cm-blue/90 to-cm-blue/60" />
        <div className="relative w-full mx-auto px-2 sm:px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {heroTitle}
            </h1>
            <p className="text-xl text-white/90">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Environment Types */}
      <section className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-cm-blue-dark text-center mb-4">
            {section1Title}
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-6">
            We design and build purpose-specific environments that cater to different
            learning styles and educational needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {cards.map((env: any) => (
              <Link
                key={env.title}
                to={env.href}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-sm-hover transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={env.image}
                    alt={env.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-cm-blue-dark mb-2 group-hover:text-cm-blue transition-colors">
                    {env.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{env.description}</p>
                  <span className="inline-flex items-center gap-2 text-cm-blue font-semibold">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-4 bg-cm-gray">
        <div className="w-full mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">
                Sustainable Campus Design
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-2">
                Our commitment to sustainability ensures that every new environment
                we create is eco-friendly, energy-efficient, and designed for the future.
              </p>
              <div className="space-y-4">
                {sustainabilityFeatures.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-cm-lime/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-cm-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-cm-blue-dark">{title}</h4>
                      <p className="text-gray-600 text-sm">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Sustainable Campus"
                className="rounded-lg shadow-sm w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEP Ready Section */}
      <section className="py-4 bg-cm-blue">
        <div className="w-full mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            NEP 2020 Ready Environments
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-2">
            Our learning spaces are designed in alignment with the National Education Policy 2020,
            supporting holistic development, flexibility, and multidisciplinary learning.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-12">
            {[
              { title: 'Holistic Development', description: 'Spaces that nurture cognitive, physical, and emotional growth' },
              { title: 'Flexibility', description: 'Adaptable environments for diverse learning activities' },
              { title: 'Integration', description: 'Seamless blend of academic and vocational learning spaces' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white/10 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-4">
        <div className="w-full mx-auto px-2 sm:px-4 text-center">
          <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">
            Ready to Transform Your Campus?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
            Let us help you create learning environments that inspire and empower.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-quote" className="btn-primary">
              Request a Quote
            </Link>
            <Link to="/contact-us" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewEnvironments;
