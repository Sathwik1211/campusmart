import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Phone, Facebook, Twitter, Youtube, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const topBarRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const authLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        topBarRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          leftContentRef.current?.children || [],
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          socialIconsRef.current?.children || [],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(1.7)' },
          '-=0.2'
        )
        .fromTo(
          authLinksRef.current,
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' },
          '-=0.3'
        );
    });

    return () => ctx.revert();
  }, []);

  const socialIcons = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <div ref={topBarRef} className="top-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left - Contact Info */}
          <div ref={leftContentRef} className="flex items-center gap-4 text-sm">
            <a
              href="mailto:info@campusmart.in"
              className="flex items-center gap-2 hover:text-cm-yellow transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@campusmart.in</span>
            </a>
            <span className="hidden md:inline text-blue-300">|</span>
            <a
              href="tel:+919966109191"
              className="flex items-center gap-2 hover:text-cm-yellow transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+91 9966109191</span>
            </a>
          </div>

          {/* Right - Social Icons & Auth */}
          <div className="flex items-center gap-4">
            <div ref={socialIconsRef} className="hidden md:flex items-center gap-2">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-cm-yellow hover:text-cm-blue-dark hover:rotate-12 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div ref={authLinksRef} className="flex items-center gap-4 text-sm font-semibold">
              <Link
                to="/registration"
                className="hover:text-cm-yellow transition-colors duration-200 relative group"
              >
                REGISTRATION
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cm-yellow transition-all duration-300 group-hover:w-full" />
              </Link>
              <span className="text-blue-300">|</span>
              <Link
                to="/login"
                className="hover:text-cm-yellow transition-colors duration-200 relative group"
              >
                LOGIN
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cm-yellow transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
