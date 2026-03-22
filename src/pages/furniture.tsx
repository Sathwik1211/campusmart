import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { usePageData } from '@/hooks/usePageData';
import api from '@/api/client';

interface Card { title: string; description: string; image?: string; count?: number; }

const DEFAULTS = {
  heroTitle: 'Furniture Solutions',
  heroSubtitle: 'Premium quality furniture designed for educational institutions. From classrooms to libraries, we provide durable and ergonomic solutions.',
  heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  section1Title: 'Furniture Categories',
  section2Title: 'Why Our Furniture?',
  cards: [
    { title: 'Classroom Furniture', description: '45 products', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Library Furniture', description: '28 products', image: 'https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Office Furniture', description: '32 products', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Hostel Furniture', description: '18 products', image: 'https://images.unsplash.com/photo-1505693416388-b0346ef414b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Play Furniture', description: '24 products', image: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { title: 'Premium Furniture', description: '15 products', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  ] as Card[],
  features: [
    'Ergonomic designs for comfort',
    'Durable and long-lasting materials',
    'Customizable options available',
    'Eco-friendly manufacturing',
    'Bulk order discounts',
    'Installation services included',
  ],
};

const Furniture = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const { data } = usePageData('furniture');

  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    api.get('/products', { params: { category: 'furniture', limit: '4' } })
      .then(({ data }) => setDbProducts(data.products || []))
      .catch(() => setDbProducts([]))
      .finally(() => setLoadingProducts(false));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' });
      
      const cats = categoriesRef.current?.children;
      if (cats) {
        gsap.fromTo(cats, 
          { opacity: 0, y: 30 }, 
          { 
            opacity: 1, y: 0, 
            duration: 0.8, 
            stagger: 0.1, 
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const heroTitle = data.heroTitle ?? DEFAULTS.heroTitle;
  const heroSubtitle = data.heroSubtitle ?? DEFAULTS.heroSubtitle;
  const heroImage = data.heroImage ?? DEFAULTS.heroImage;
  const section1Title = data.section1Title ?? DEFAULTS.section1Title;
  const section2Title = data.section2Title ?? DEFAULTS.section2Title;
  const cards: Card[] = (data.cards && data.cards.length > 0) ? data.cards : DEFAULTS.cards;
  const features: string[] = (data.features && data.features.length > 0) ? data.features : DEFAULTS.features;

  return (
    <main className="min-h-screen bg-white text-opensans">
      {/* Elegant Hero - Side by Side Corporate Style */}
      <section ref={heroRef} className="bg-cm-blue py-10 px-4 sm:px-6 relative shadow-inner">
         <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="lg:w-1/2 text-left text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              {heroTitle}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              {heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-secondary px-8 py-3 text-base">
                View Collections
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-cm-blue-dark/20 rounded-[3rem] blur-2xl" />
            <img src={heroImage} alt={heroTitle} className="rounded-2xl shadow-xl w-full h-[350px] object-cover border-4 border-cm-blue-dark relative z-10" />
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
            <h2 className="text-2xl md:text-3xl font-bold text-cm-blue-dark tracking-tighter">{section1Title}</h2>
            <div className="hidden md:block h-1 w-32 bg-cm-yellow rounded-full" />
          </div>

          <div ref={categoriesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((cat) => (
              <Link 
                key={cat.title} 
                to="/shop" 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-cm-blue-dark/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-cm-blue-dark mb-2 group-hover:text-cm-blue transition-colors tracking-tight">{cat.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-opensans flex-grow">{cat.description || 'Premium campus furniture solutions designed for flexibility and durability.'}</p>
                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cm-blue/60">Collection</span>
                    <div className="flex items-center gap-1.5 text-cm-blue font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      View <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Products Grid Loaded from DB */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Featured Collections</h2>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Available setups in stock</p>
          </div>

          {loadingProducts ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-cm-blue border-t-transparent rounded-full animate-spin" />
            </div>
          ) : dbProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 font-bold">No listed products found in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {dbProducts.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 group flex flex-col">
                  <div className="aspect-square overflow-hidden relative bg-slate-100">
                    <img src={p.imageUrl || 'https://via.placeholder.com/300'} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-cm-blue transition-colors mb-1 line-clamp-1">{p.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                       <span className="text-xs font-bold text-orange-400">⭐ {p.rating || '4.0'}</span>
                    </div>
                    <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                       <span className="font-black text-cm-blue text-sm">₹{Number(p.price).toLocaleString('en-IN')}</span>
                       <Link to="/contact-us" className="p-2 bg-slate-100 group-hover:bg-cm-blue rounded-xl text-slate-600 group-hover:text-white transition-all"><ArrowRight className="w-4 h-4" /></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Split Feature Section */}
      <section className="py-12 bg-cm-gray/30 border-y border-cm-gray rounded-[2rem] mx-4 mb-16 overflow-hidden shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2 relative">
              <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Furniture Detail" className="rounded-2xl shadow-xl relative z-10 border-4 border-white" />
              <div className="absolute -bottom-6 -right-6 bg-cm-blue-dark p-6 rounded-2xl shadow-xl z-20 text-white hidden md:block border-2 border-cm-blue">
                <div className="text-2xl font-bold mb-0.5">10+</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-cm-yellow">Years of Quality</div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-cm-blue-dark mb-6 leading-tight tracking-tighter">
                {section2Title}
              </h2>
              <div className="space-y-4 font-opensans">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-cm-blue/10 flex items-center justify-center group-hover:bg-cm-blue transition-all duration-300 border border-cm-blue/10">
                      <CheckCircle className="w-5 h-5 text-cm-blue group-hover:text-white" />
                    </div>
                    <span className="text-sm text-gray-700 font-bold">{f}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-200 flex items-center gap-4 shadow-sm">
                <CheckCircle className="w-8 h-8 text-cm-blue" />
                <div>
                  <h4 className="font-bold text-cm-blue-dark mb-0.5 text-sm">Durability Guaranteed</h4>
                  <p className="text-gray-500 text-xs font-opensans">All our furniture undergoes rigorous stress testing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-16 bg-cm-blue-dark text-white text-center rounded-t-[4rem] border-t-4 border-cm-yellow/50">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-xl md:text-3xl font-bold mb-8 leading-relaxed max-w-2xl mx-auto">
            "Infrastructure isn't just about buildings; it's about the tools we give our students to shape their own environments."
          </h3>
          <div className="w-12 h-1 bg-cm-yellow mx-auto mb-4 rounded-full" />
          <div className="font-bold uppercase tracking-widest text-xs text-white/50">Campus Mart Design Philosophy</div>
        </div>
      </section>
    </main>
  );
};

export default Furniture;
