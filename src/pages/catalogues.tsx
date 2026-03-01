import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Download, FileText, BookOpen, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Catalogues = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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

  const catalogues = [
    {
      title: 'Product Catalog 2025-26',
      description: 'Complete range of furniture, equipment, and infrastructure solutions for educational institutions.',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      downloadLink: '#',
      size: '15 MB',
    },
    {
      title: 'Play Furniture Lookbook',
      description: 'Innovative play area solutions and furniture for early childhood education.',
      image: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      downloadLink: '#',
      size: '8 MB',
    },
    {
      title: 'Lab Equipment Guide',
      description: 'Comprehensive guide to science lab setups and equipment for schools and colleges.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      downloadLink: '#',
      size: '12 MB',
    },
    {
      title: 'Sports Infrastructure',
      description: 'Complete sports facility design and equipment catalogue.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      downloadLink: '#',
      size: '10 MB',
    },
    {
      title: 'Digital Solutions',
      description: 'EdTech products and digital transformation solutions for campuses.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      downloadLink: '#',
      size: '6 MB',
    },
    {
      title: 'Library Solutions',
      description: 'Modern library furniture and digital management systems.',
      image: 'https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      downloadLink: '#',
      size: '9 MB',
    },
  ];

  const caseStudies = [
    {
      title: 'Campus Master Planning',
      description: 'Complete campus transformation for a leading university in Bangalore.',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: '20 Stunning College Buildings',
      description: 'Showcase of our most innovative campus architecture projects.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'STEM Lab Implementation',
      description: 'State-of-the-art STEM lab setup for a prestigious school chain.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-cm-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Product Catalogues
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Browse our comprehensive catalogues featuring furniture, equipment, 
            and infrastructure solutions for educational institutions.
          </p>
        </div>
      </section>

      {/* Catalogues Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cm-blue-dark mb-12 text-center">
            Download Our Catalogues
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogues.map((catalogue) => (
              <div
                key={catalogue.title}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={catalogue.image}
                    alt={catalogue.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-cm-blue" />
                    <span className="text-sm text-gray-500">{catalogue.size}</span>
                  </div>
                  <h3 className="text-xl font-bold text-cm-blue-dark mb-2">
                    {catalogue.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{catalogue.description}</p>
                  <a
                    href={catalogue.downloadLink}
                    className="inline-flex items-center gap-2 text-cm-blue font-semibold hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-cm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-cm-blue-dark mb-4 text-center">
            Case Studies & Projects
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Explore our completed projects and see how we've transformed educational institutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div
                key={study.title}
                className="bg-white rounded-xl overflow-hidden shadow-card"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-cm-blue" />
                    <span className="text-sm text-gray-500">Case Study</span>
                  </div>
                  <h3 className="text-lg font-bold text-cm-blue-dark mb-2">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{study.description}</p>
                  <Link
                    to="#"
                    className="inline-flex items-center gap-2 text-cm-blue font-semibold text-sm hover:underline"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cm-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-cm-blue-dark mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Our team can create customized catalogues based on your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-quote" className="btn-primary">
              Request Custom Catalogue
            </Link>
            <Link to="/contact-us" className="bg-white text-cm-blue-dark px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Catalogues;
