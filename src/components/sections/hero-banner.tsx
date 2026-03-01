import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteContent } from '@/contexts/SiteContentContext';

gsap.registerPlugin(ScrollTrigger);

const HeroBanner = () => {
  const { content } = useSiteContent();
  const heroData = content.home_hero || {
    title: 'Your Complete Guide to Campus Infrastructure',
    subtitle: 'Physical + Digital',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.9 });

      // Container clip reveal
      tl.fromTo(
        containerRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'power3.out',
        }
      )
        // Background image scale
        .fromTo(
          imageRef.current,
          { scale: 1.2 },
          { scale: 1, duration: 1.5, ease: 'power3.out' },
          '-=1'
        )
        // Overlay fade
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.8'
        )
        // Title words animation
        .fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        // Subtitle slide up
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.3'
        );

      // Scroll-based parallax
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              y: self.progress * 100,
            });
          }
          if (overlayRef.current) {
            gsap.set(overlayRef.current, {
              opacity: 0.3 + self.progress * 0.3,
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="py-4 px-4">
      <div
        ref={containerRef}
        className="hero-section relative overflow-hidden rounded-2xl"
      >
        {/* Background Image */}
        <img
          ref={imageRef}
          src={heroData.image}
          alt={heroData.title}
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />

        {/* Overlay */}
        <div
          ref={overlayRef}
          className="hero-overlay"
        />

        {/* Content */}
        <div className="hero-content">
          <h1
            ref={titleRef}
            className="hero-title max-w-4xl"
          >
            {heroData.title}
          </h1>
          <p
            ref={subtitleRef}
            className="hero-subtitle"
          >
            {heroData.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
