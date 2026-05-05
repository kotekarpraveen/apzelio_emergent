import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Sparkles, BookOpen, TrendingUp, Zap, Layers, BrainCircuit, Cloud, Shield, PenTool } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import axios from 'axios';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const categoryIcons = { Development: Layers, AI: BrainCircuit, Cloud: Cloud, Enterprise: Shield };
const categoryImages = {
  Development: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
  AI: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  Cloud: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
  Enterprise: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
};

/* ---------- Sub-components ---------- */

const BlogHero = ({ t }) => (
  <div className="relative overflow-hidden mb-16">
    {/* Animated blobs */}
    <div className={`absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[160px] opacity-30 animate-blob ${t.isDark ? 'bg-[#47d6ff]' : 'bg-[#006398]'}`} />
    <div className={`absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full blur-[140px] opacity-20 animate-blob ${t.isDark ? 'bg-[#d2bbff]' : 'bg-[#40a2e7]'}`} style={{ animationDelay: '2s' }} />

    <div className="relative z-10 text-center pt-8 pb-12">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <div className={`inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-md border ${t.isDark ? 'text-[#47d6ff] border-[#47d6ff]/30 bg-[#47d6ff]/10' : 'text-[#006398] border-[#006398]/20 bg-[#006398]/5'}`}>
          <BookOpen className="w-3.5 h-3.5" />
          ApZelio Insights
        </div>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className={`text-5xl md:text-7xl font-bold font-headline mb-6 tracking-tighter ${t.textOnSurface}`}>
        Engineering<br />
        <span className={t.textGradient}>Intelligence</span> Blog
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${t.textOnSurfaceVariant}`}>
        Deep dives into AI-driven development, cloud architecture, and the systems that power tomorrow's enterprises.
      </motion.p>
    </div>
  </div>
);

const CategoryFilters = ({ t, categories, active, setActive }) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {categories.map((cat) => {
      const Icon = categoryIcons[cat] || TrendingUp;
      const isActive = active === cat;
      return (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
            isActive
              ? `${t.ctaGradient} shadow-lg scale-105`
              : `${t.isDark ? 'bg-[#1a2238] border border-[#45464d]/30 text-[#c6c6cd] hover:border-[#47d6ff]/40 hover:text-[#47d6ff]' : 'bg-white border border-gray-200 text-[#3e4850] hover:border-[#006398]/40 hover:text-[#006398]'} hover:scale-105`
          }`}
        >
          {cat !== 'All' && <Icon className={`w-3.5 h-3.5 transition-transform group-hover:rotate-12 ${isActive ? '' : ''}`} />}
          {cat}
        </button>
      );
    })}
  </div>
);

const SearchBar = ({ t, value, onChange }) => (
  <div className="relative w-full md:w-96">
    <div className={`absolute left-0 top-0 bottom-0 w-12 rounded-l-xl flex items-center justify-center ${t.isDark ? 'bg-[#47d6ff]/10' : 'bg-[#006398]/5'}`}>
      <Search className={`w-4 h-4 ${t.textPrimary}`} />
    </div>
    <input
      type="text"
      placeholder="Search articles, topics, authors..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full pl-14 pr-4 py-3.5 rounded-xl border text-sm transition-all outline-none ${t.isDark ? 'bg-[#0b1326] border-[#45464d]/20 text-[#dae2fd] focus:border-[#47d6ff]/50 focus:shadow-[0_0_20px_rgba(71,214,255,0.1)]' : 'bg-white border-gray-200 text-[#191c1e] focus:border-[#006398]/50 focus:shadow-[0_0_20px_rgba(0,99,152,0.08)]'}`}
    />
  </div>
);

const FeaturedBlog = ({ blog, t, onClick }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
    <div onClick={onClick} className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:scale-[1.005] ${t.isDark ? 'shadow-[0_20px_60px_rgba(6,14,32,0.6)]' : 'shadow-[0_20px_60px_rgba(25,28,30,0.12)]'}`}>
      <div className="relative h-[520px]">
        <img
          src={categoryImages[blog.category] || categoryImages.AI}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 ${t.isDark ? 'bg-gradient-to-t from-[#0b1326] via-[#0b1326]/60 to-transparent' : 'bg-gradient-to-t from-[#191c1e] via-[#191c1e]/50 to-transparent'}`} />

        {/* Floating accent line */}
        <div className={`absolute top-0 left-0 w-full h-1 ${t.ctaGradient}`} />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-10 md:p-14">
        <div className="flex items-center gap-3 mb-6">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-lg border ${t.isDark ? 'bg-[#47d6ff]/15 text-[#47d6ff] border-[#47d6ff]/30' : 'bg-white/20 text-white border-white/30'}`}>
            Featured
          </span>
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 backdrop-blur-lg text-white border border-white/20">
            {blog.category}
          </span>
          {blog.is_ai_generated && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 backdrop-blur-lg">
              <Sparkles className="w-3 h-3" /> AI
            </span>
          )}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-headline text-white mb-4 leading-[1.1] group-hover:text-[#47d6ff] transition-colors duration-300">
          {blog.title}
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mb-8 line-clamp-2 leading-relaxed">{blog.summary}</p>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-white text-sm border border-white/20">
              {(blog.author_name || blog.author || 'A').charAt(0)}
            </div>
            <span className="text-white/80 font-medium">{blog.author_name || blog.author || 'ApZelio Team'}</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Calendar className="w-4 h-4" />
            {blog.created_at ? new Date(blog.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
          </div>
          <div className={`ml-auto flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold backdrop-blur-md border transition-all group-hover:scale-105 ${t.isDark ? 'bg-[#47d6ff]/20 text-[#47d6ff] border-[#47d6ff]/30' : 'bg-white/20 text-white border-white/30'}`}>
            Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const BlogCard = ({ blog, index, t, onClick }) => (
  <motion.div
    key={blog.id}
    variants={fadeUp}
    custom={index % 3}
    onClick={onClick}
    className={`group flex flex-col rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 hover:translate-y-[-8px] ${t.isDark ? 'bg-[#131b2e] border-[#45464d]/10 hover:border-[#47d6ff]/30 hover:shadow-[0_20px_40px_rgba(71,214,255,0.08)]' : 'bg-white border-gray-100 hover:border-[#006398]/20 hover:shadow-[0_20px_40px_rgba(0,99,152,0.08)]'}`}
  >
    <div className="h-52 relative overflow-hidden">
      <img
        src={categoryImages[blog.category] || categoryImages.Development}
        alt={blog.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className={`absolute inset-0 ${t.isDark ? 'bg-gradient-to-t from-[#131b2e] via-transparent to-transparent' : 'bg-gradient-to-t from-white/20 via-transparent to-transparent'}`} />
      <div className="absolute top-4 left-4 flex gap-2">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border ${t.isDark ? 'bg-black/40 text-white border-white/20' : 'bg-white/80 text-[#191c1e] border-white/50'}`}>
          {blog.category}
        </span>
        {blog.is_ai_generated && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-indigo-500/30 text-white border border-indigo-500/20 backdrop-blur-md">
            <Sparkles className="w-2.5 h-2.5" /> AI
          </span>
        )}
      </div>
    </div>
    <div className="p-7 flex flex-col flex-1">
      <div className={`flex items-center gap-4 mb-4 text-[11px] font-bold uppercase tracking-widest ${t.textSecondary}`}>
        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {blog.created_at ? new Date(blog.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Recent'}</div>
        <span className="w-1 h-1 rounded-full bg-current opacity-30" />
        <span>5 min read</span>
      </div>
      <h3 className={`text-xl font-bold font-headline mb-3 line-clamp-2 transition-colors duration-300 ${t.textOnSurface} group-hover:${t.isDark ? 'text-[#47d6ff]' : 'text-[#006398]'}`}>
        {blog.title}
      </h3>
      <p className={`text-sm leading-relaxed mb-6 line-clamp-3 ${t.textOnSurfaceVariant}`}>{blog.summary}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className={`flex items-center gap-2.5 text-xs font-bold ${t.textOnSurface}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${t.isDark ? 'bg-gradient-to-br from-[#47d6ff]/20 to-[#d2bbff]/20 text-white' : 'bg-gradient-to-br from-[#006398]/10 to-[#40a2e7]/10 text-[#006398]'}`}>
            {(blog.author_name || blog.author || 'A').charAt(0)}
          </div>
          {blog.author_name || blog.author || 'ApZelio Team'}
        </div>
        <div className={`flex items-center gap-1.5 text-sm font-bold ${t.textPrimary} opacity-0 group-hover:opacity-100 transition-opacity`}>
          Read <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  </motion.div>
);

const EmptyState = ({ t, onClearFilters }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`text-center py-24 rounded-3xl border border-dashed relative overflow-hidden ${t.isDark ? 'border-[#45464d]/30' : 'border-gray-200'}`}>
    <div className={`absolute inset-0 opacity-5 ${t.isDark ? '' : ''}`} style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
    <div className="relative z-10">
      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${t.isDark ? 'bg-[#47d6ff]/10' : 'bg-[#006398]/5'}`}>
        <PenTool className={`w-8 h-8 ${t.textPrimary}`} />
      </div>
      <h3 className={`text-2xl font-bold font-headline mb-3 ${t.textOnSurface}`}>No Articles Yet</h3>
      <p className={`text-lg mb-8 max-w-md mx-auto ${t.textOnSurfaceVariant}`}>
        The engineering blog is fresh and ready for its first insight. Head to the Admin panel to generate AI-powered articles.
      </p>
      <div className="flex gap-4 justify-center">
        <a href="/admin" className={`px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 ${t.ctaGradient}`} style={t.ctaShadow}>
          Create with AI
        </a>
        {onClearFilters && (
          <button onClick={onClearFilters} className={`px-6 py-3 rounded-xl font-bold text-sm border transition-all ${t.isDark ? 'border-[#45464d]/30 text-[#c6c6cd] hover:bg-[#222a3d]' : 'border-gray-200 text-[#3e4850] hover:bg-gray-50'}`}>
            Clear Filters
          </button>
        )}
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

  const hasFilters = activeCategory !== 'All' || searchQuery;

  return (
    <main className={`min-h-screen pt-32 pb-24 px-8 ${t.bgSurface}`}>
      <div className="max-w-7xl mx-auto">
        <BlogHero t={t} />

        {/* Filters Row */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="flex flex-col md:flex-row gap-6 mb-14 items-center justify-between">
          <CategoryFilters t={t} categories={categories} active={activeCategory} setActive={setActiveCategory} />
          <SearchBar t={t} value={searchQuery} onChange={setSearchQuery} />
        </motion.div>

        {/* Featured */}
        {filteredBlogs.length > 0 && activeCategory === 'All' && !searchQuery && (
          <FeaturedBlog blog={filteredBlogs[0]} t={t} onClick={() => navigate(`/blog/${filteredBlogs[0].slug}`)} />
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['sk-1', 'sk-2', 'sk-3'].map(key => (
              <div key={key} className={`h-[420px] rounded-2xl animate-pulse ${t.bgSurfaceLow}`} />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} t={t} onClick={() => navigate(`/blog/${blog.slug}`)} />
            ))}
          </motion.div>
        ) : (
          <EmptyState t={t} onClearFilters={hasFilters ? () => { setActiveCategory('All'); setSearchQuery(''); } : null} />
        )}
      </div>
    </main>
  );
};

export default Blog;
