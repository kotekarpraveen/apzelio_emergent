import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Sparkles } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import axios from 'axios';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

/* ---------- Sub-components ---------- */

const BlogCard = ({ blog, index, t, onClick }) => (
  <motion.div
    key={blog.id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeUp}
    custom={index % 3}
    onClick={onClick}
    className={`group flex flex-col rounded-2xl border overflow-hidden cursor-pointer transition-all hover:translate-y-[-8px] ${t.glassCard} ${t.isDark ? 'border-[#45464d]/10 hover:border-[#47d6ff]/30' : 'border-gray-200 hover:border-[#006398]/30'}`}
  >
    <div className="h-56 relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800"
        alt={blog.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/20 text-white bg-black/40">
          {blog.category}
        </span>
        {blog.is_ai_generated && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-indigo-500/40 text-white border border-indigo-500/30 backdrop-blur-md">
            <Sparkles className="w-2.5 h-2.5" /> AI
          </span>
        )}
      </div>
    </div>
    <div className="p-8 flex flex-col flex-1">
      <div className={`flex items-center gap-4 mb-4 text-[11px] font-bold uppercase tracking-widest ${t.textSecondary}`}>
        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.created_at).toLocaleDateString()}</div>
      </div>
      <h3 className={`text-2xl font-bold font-headline mb-4 line-clamp-2 transition-colors ${t.textOnSurface}`}>
        {blog.title}
      </h3>
      <p className={`text-sm leading-relaxed mb-8 line-clamp-3 ${t.textOnSurfaceVariant}`}>
        {blog.summary}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <div className={`flex items-center gap-2 text-xs font-bold ${t.textOnSurface}`}>
          <div className={`w-6 h-6 rounded-full ${t.isDark ? 'bg-slate-700' : 'bg-slate-200'} flex items-center justify-center text-[10px]`}>
            {blog.author.charAt(0)}
          </div>
          {blog.author}
        </div>
        <div className={`flex items-center gap-1 text-sm font-bold ${t.textPrimary}`}>
          Read More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  </motion.div>
);

const FeaturedBlog = ({ blog, t, onClick }) => (
  <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mb-16">
    <div onClick={onClick} className={`group relative overflow-hidden rounded-[2rem] border cursor-pointer transition-all hover:scale-[1.01] ${t.isDark ? 'border-[#45464d]/30' : 'border-gray-200'}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
      <div className="h-[500px] w-full relative">
        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600"
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-10 z-20">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md text-white border border-white/30">
            Featured Post
          </span>
          {blog.is_ai_generated && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-indigo-500/30 text-indigo-200 border border-indigo-500/30 backdrop-blur-md">
              <Sparkles className="w-3 h-3" /> AI Generated
            </span>
          )}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-headline text-white mb-4 group-hover:text-[#47d6ff] transition-colors">
          {blog.title}
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mb-6 line-clamp-2">{blog.summary}</p>
        <div className="flex items-center gap-6 text-white/70 text-sm">
          <div className="flex items-center gap-2"><User className="w-4 h-4" /> {blog.author}</div>
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(blog.created_at).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ---------- Main Component ---------- */

const Blog = () => {
  const t = useThemeClasses();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const categories = ['All', 'Development', 'AI', 'Cloud', 'Enterprise'];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className={`min-h-screen pt-32 pb-24 px-8 ${t.bgSurface}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 text-center">
          <span className={`inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase rounded-full backdrop-blur-sm ${t.isDark ? 'text-[#47d6ff] border border-[#47d6ff]/30 bg-[#47d6ff]/10' : 'text-[#006398] border border-[#006398]/30 bg-[#006398]/10'}`}>
            ApZelio Insights
          </span>
          <h1 className={`text-5xl md:text-6xl font-bold font-headline mb-6 ${t.textOnSurface}`}>
            Our <span className={t.textGradient}>Engineering</span> Blog
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${t.textOnSurfaceVariant}`}>
            Deep dives into AI-driven development, cloud-native architecture, and the future of enterprise software.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? t.ctaGradient + ' shadow-lg'
                    : `${t.bgSurfaceHigh} ${t.textOnSurfaceVariant} hover:scale-105`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${t.textSecondary}`} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all outline-none ${t.bgSurfaceLow} ${t.textOnSurface} ${t.isDark ? 'border-[#45464d]/30 focus:border-[#47d6ff]/50' : 'border-gray-200 focus:border-[#006398]/50'}`}
            />
          </div>
        </motion.div>

        {/* Featured */}
        {filteredBlogs.length > 0 && activeCategory === 'All' && !searchQuery && (
          <FeaturedBlog blog={filteredBlogs[0]} t={t} onClick={() => navigate(`/blog/${filteredBlogs[0].slug}`)} />
        )}

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['skeleton-1', 'skeleton-2', 'skeleton-3'].map(key => (
              <div key={key} className={`h-[450px] rounded-2xl animate-pulse ${t.bgSurfaceLow}`} />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} t={t} onClick={() => navigate(`/blog/${blog.slug}`)} />
            ))}
          </div>
        ) : (
          <div className={`text-center py-20 rounded-3xl border border-dashed ${t.borderOutlineLight}`}>
            <p className={`text-xl ${t.textOnSurfaceVariant}`}>No articles found matching your criteria.</p>
            <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className={`mt-6 font-bold ${t.textPrimary}`}>Clear filters</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Blog;
