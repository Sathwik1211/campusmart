import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Resources = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const cataloguesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Resource cards stagger
      const resourceCards = resourcesRef.current?.children;
      if (resourceCards) {
        gsap.fromTo(
          resourceCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: resourcesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Catalogue cards
      const catalogueCards = cataloguesRef.current?.children;
      if (catalogueCards) {
        gsap.fromTo(
          catalogueCards,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cataloguesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const resources = [
    {
      icon: BookOpen,
      title: 'Complete Guide on AI Implementation',
      description: 'A comprehensive guide for implementing AI in educational institutions.',
      href: '/ai-guide',
    },
    {
      icon: FileText,
      title: 'Setting Up a College in India',
      description: 'Step-by-step guide to establishing a new college in India.',
      href: '/setup-college',
    },
    {
      icon: Building2,
      title: 'UGC Guidelines for Digital Campus',
      description: 'Latest UGC guidelines for digital transformation of campuses.',
      href: '/ugc-guidelines',
    },
  ];

  const catalogues = [
    {
      title: 'Product Catalog 2025',
      subtitle: 'Complete product range',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      href: '/product-catalog',
    },
    {
      title: 'Lookbook – Play Furniture',
      subtitle: 'Play area solutions',
      image: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      href: '/lookbook',
    },
  ];

  const projects = [
    'Campus Master Planning',
    '20 Stunning College Buildings',
    'Academic buildings',
    'Research facilities',
    'Student life centers',
    'Athletic complexes',
  ];

  return (
    <section ref={containerRef} className="py-16 bg-cm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={titleRef} className="text-3xl font-bold text-cm-blue-dark mb-10 text-center">
          Resources & Catalogues
        </h2>

        {/* Resources Grid */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-cm-blue mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Resources
          </h3>
          <div ref={resourcesRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                to={href}
                className="resource-card group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cm-blue/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-cm-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-cm-blue-dark mb-2 group-hover:text-cm-blue transition-colors">
                      {title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">{description}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-cm-blue font-semibold">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Catalogues & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Catalogues */}
          <div>
            <h3 className="text-xl font-bold text-cm-blue mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Product Catalog 25-26
            </h3>
            <div ref={cataloguesRef} className="grid grid-cols-2 gap-4">
              {catalogues.map(({ title, subtitle, image, href }) => (
                <Link
                  key={title}
                  to={href}
                  className="group relative overflow-hidden rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-bold text-sm">{title}</h4>
                    <p className="text-white/70 text-xs">{subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Completed Projects */}
          <div>
            <h3 className="text-xl font-bold text-cm-blue mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Completed Projects
            </h3>
            <div className="bg-white rounded-xl p-6 shadow-card">
              <ul className="space-y-3">
                {projects.map((project) => (
                  <li key={project}>
                    <Link
                      to="/catalogues"
                      className="flex items-center gap-2 text-gray-700 hover:text-cm-blue transition-colors group"
                    >
                      <ArrowRight className="w-4 h-4 text-cm-blue opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform">
                        {project}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
