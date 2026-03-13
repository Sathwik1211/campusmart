import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Beaker, BookOpen, Lightbulb, Users, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Solutions = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const solutionList = [
        {
            title: 'Laboratories',
            description: 'Advanced science and technology labs equipped with modern safety and learning tools.',
            icon: Beaker,
            href: '/labs',
            color: 'bg-cm-blue'
        },
        {
            title: 'Libraries',
            description: 'Next-generation libraries combining traditional resources with digital learning environments.',
            icon: BookOpen,
            href: '/libraries',
            color: 'bg-cm-yellow'
        },
        {
            title: 'Innovation Centres',
            description: 'Dedicated spaces for creative thinking, prototyping, and interdisciplinary collaboration.',
            icon: Lightbulb,
            href: '/innovation-centres',
            color: 'bg-cm-green'
        },
        {
            title: 'Learning Environments',
            description: 'Flexible classrooms and open spaces designed for active, collaborative learning.',
            icon: Users,
            href: '/new-environments',
            color: 'bg-orange-500'
        },
        {
            title: 'AI Stations',
            description: 'Dedicated hubs for artificial intelligence exploration and digital literacy.',
            icon: Monitor,
            href: '/ai-stations',
            color: 'bg-purple-600'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.solution-card', {
                scale: 0.9,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%'
                }
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen pt-12 pb-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Functional Solutions</h1>
                    <p className="text-xl text-gray-600 max-w-3xl">
                        Specialized environments optimized for specific learning outcomes and operational efficiency.
                    </p>
                </div>

                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutionList.map((sol, i) => (
                        <Link 
                            key={i} 
                            to={sol.href} 
                            className="solution-card group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
                        >
                            <div className={`h-2 ${sol.color}`} />
                            <div className="p-8">
                                <div className={`w-12 h-12 rounded-lg ${sol.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                                    <sol.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cm-blue transition-colors">
                                    {sol.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    {sol.description}
                                </p>
                                <span className="text-cm-blue font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                                    View Details <span className="text-lg">→</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Solutions;
