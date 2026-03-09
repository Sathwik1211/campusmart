import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Landmark, GraduationCap, Library, TestTube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Mock data for collaborations - using icons as placeholders for logos
const collaborations = [
    { name: 'Stanford University', icon: Landmark },
    { name: 'MIT Labs', icon: TestTube },
    { name: 'Oxford Library', icon: Library },
    { name: 'Cambridge Tech', icon: Building2 },
    { name: 'Harvard Research', icon: GraduationCap },
    { name: 'Yale Architecture', icon: Landmark },
    { name: 'Princeton Science', icon: TestTube },
    { name: 'Columbia Design', icon: Building2 },
];

const CollaborationsTicker = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-12 bg-white border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <h3 className="text-sm md:text-base font-bold text-gray-400 tracking-widest uppercase">
                    Trusted By Leading Institutions Worldwide
                </h3>
            </div>

            {/* Infinite scrolling marquee container */}
            <div className="relative flex overflow-hidden">
                {/* Left gradient mask */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

                {/* Marquee Track */}
                <div className="flex animate-marquee gap-12 md:gap-24 items-center whitespace-nowrap px-6">
                    {/* First set of items */}
                    {collaborations.map((collab, i) => (
                        <div key={`collab-1-${i}`} className="flex items-center gap-3">
                            <collab.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                            <span className="text-base md:text-lg font-semibold text-gray-400">{collab.name}</span>
                        </div>
                    ))}
                    {/* Duplicate set for seamless looping */}
                    {collaborations.map((collab, i) => (
                        <div key={`collab-2-${i}`} className="flex items-center gap-3">
                            <collab.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                            <span className="text-base md:text-lg font-semibold text-gray-400">{collab.name}</span>
                        </div>
                    ))}
                </div>

                {/* Right gradient mask */}
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#f4f3ef] to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
};

export default CollaborationsTicker;
