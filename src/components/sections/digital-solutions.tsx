import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { BookOpen, Glasses, Library, GraduationCap, ClipboardCheck, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DigitalSolutions = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = sectionsRef.current?.children;
      if (!sections) return;

      Array.from(sections).forEach((section, index) => {
        const image = section.querySelector('.solution-image');
        const content = section.querySelector('.solution-content');
        const isEven = index % 2 === 0;

        // Image animation
        gsap.fromTo(
          image,
          { x: isEven ? -80 : 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Content animation
        gsap.fromTo(
          content,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Parallax effect on scroll
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (image) {
              gsap.set(image, {
                y: (self.progress - 0.5) * 60,
              });
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const solutions = [
    {
      icon: BookOpen,
      title: 'Digital Content',
      description:
        'We provide curriculum-mapped digital learning content designed specifically for engineering, life sciences, and other university programs. Each module includes multimedia lessons, simulations, and case studies, developed in collaboration with academic experts to meet global higher education standards.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/digital-transformation',
    },
    {
      icon: Glasses,
      title: 'AR / VR Content',
      description:
        'Our AR/VR-based learning experiences revolutionize higher education by simulating real-world labs and complex concepts in engineering, biotechnology, and life sciences. We ensure immersive, research-driven content that enhances conceptual understanding and experiential learning.',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/digital-transformation',
    },
    {
      icon: Library,
      title: 'Library Management System',
      description:
        'Our AI-driven library management software modernizes academic libraries with digital cataloging, e-journal integration, and advanced search systems. Designed for technical and scientific universities, it ensures instant, organized access to research publications and institutional repositories.',
      image: 'https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/library-management',
    },
    {
      icon: GraduationCap,
      title: 'Learning Management System (LMS)',
      description:
        'We implement robust Learning Management Systems that empower universities to deliver, track, and evaluate online and blended learning. Our LMS platforms are tailored for engineering and science colleges, supporting digital classrooms, grading automation, and research collaboration.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/lms',
    },
    {
      icon: ClipboardCheck,
      title: 'Student Assessment System',
      description:
        'We offer automated student assessment platforms designed for higher education evaluations, from theory exams to lab practicals. Our tools support STEM and life sciences curricula, ensuring accurate evaluation, plagiarism checks, and analytics-driven performance tracking.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/assessment-system',
    },
    {
      icon: Settings,
      title: 'Campus Automation Solutions',
      description:
        'We transform universities into smart, automated campuses, covering operations such as admissions, attendance, finance, and research tracking. Built for engineering and multidisciplinary universities, our systems improve transparency, efficiency, and academic governance.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      href: '/campus-automation',
    },
  ];

  return (
    <section ref={containerRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionsRef} className="space-y-20">
          {solutions.map(({ icon: Icon, title, description, image, href }, index) => (
            <div
              key={title}
              className={`solution-card ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="solution-image overflow-hidden rounded-xl shadow-lg">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-64 md:h-80 object-cover  transition-transform duration-500"
                />
              </div>
              <div className="solution-content">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-cm-blue/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-cm-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-cm-blue-dark">{title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
                <Link
                  to={href}
                  className="inline-flex items-center gap-2 mt-6 text-cm-blue font-semibold hover:underline group"
                >
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalSolutions;
