import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import api from '@/api/client';
import { usePageData } from '@/hooks/usePageData';

interface Post { id: number; title: string; excerpt: string; publishedAt?: string; imageUrl?: string; slug: string; }

const Blog = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { data } = usePageData('blog');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    api.get('/blog?limit=9')
      .then(({ data }) => setPosts(data.posts))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen">
      <section ref={heroRef} className="bg-cm-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{data.heroTitle ?? 'Blog'}</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {data.heroSubtitle ?? 'Insights, trends, and best practices in educational infrastructure.'}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-cm-blue border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.imageUrl || 'https://via.placeholder.com/600x300'}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    {post.publishedAt && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-cm-blue-dark mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-cm-blue font-semibold hover:underline">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!loading && posts.length === 0 && (
            <div className="text-center py-12 text-gray-500">No blog posts yet.</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
