import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Bookmark, Sparkles, Tag } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const t = useThemeClasses();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${slug}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className={`min-h-screen pt-32 flex items-center justify-center ${t.bgSurface}`}>
        <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${t.isDark ? 'border-[#47d6ff]' : 'border-[#006398]'}`} />
      </div>
    );
  }

  if (!blog || blog.error) {
    return (
      <div className={`min-h-screen pt-40 text-center ${t.bgSurface}`}>
        <h2 className={`text-3xl font-bold mb-4 ${t.textOnSurface}`}>Blog Not Found</h2>
        <button onClick={() => navigate('/blog')} className={`mt-4 font-bold ${t.textPrimary}`}>Back to Blog</button>
      </div>
    );
  }

  return (
    <main className={`min-h-screen pb-24 ${t.bgSurface}`}>
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src={`https://images.unsplash.com/photo-1620712943543-bcc46386c6dd?auto=format&fit=crop&q=80&w=1600`} 
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button 
                  onClick={() => navigate('/blog')}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm border border-white/20 hover:bg-white/20 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <span className="px-4 py-1.5 rounded-full bg-[#47d6ff]/20 text-[#47d6ff] text-xs font-bold uppercase tracking-widest border border-[#47d6ff]/30 backdrop-blur-md">
                  {blog.category}
                </span>
                {blog.is_ai_generated && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest border border-indigo-500/30 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5" /> AI Insights
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-headline text-white mb-8 leading-[1.1]">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-8 text-white/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold">{blog.author}</div>
                    <div className="text-xs">Technical Architect</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#47d6ff]" />
                  <span>{new Date(blog.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-6">
                <button className={`p-3 rounded-full border transition-all ${t.isDark ? 'border-[#45464d]/30 hover:bg-[#222a3d] text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-600'}`}>
                    <Share2 className="w-5 h-5" />
                </button>
                <button className={`p-3 rounded-full border transition-all ${t.isDark ? 'border-[#45464d]/30 hover:bg-[#222a3d] text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-600'}`}>
                    <Bookmark className="w-5 h-5" />
                </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-11">
            <div className={`prose prose-lg max-w-none ${t.isDark ? 'prose-invert' : ''} 
                prose-headings:font-headline prose-headings:font-bold 
                prose-p:leading-relaxed prose-p:text-lg
                prose-a:text-[#47d6ff] hover:prose-a:text-[#008cab]
                prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700
                ${t.textOnSurfaceVariant}`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.content}
              </ReactMarkdown>
            </div>

            {/* Footer / Author Box */}
            <div className={`mt-20 p-10 rounded-3xl border ${t.isDark ? 'bg-[#131b2e] border-[#45464d]/20' : 'bg-[#f2f4f6] border-gray-200'}`}>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#47d6ff] to-[#d2bbff] p-1 shadow-xl">
                        <div className={`w-full h-full rounded-[0.9rem] flex items-center justify-center text-3xl font-bold ${t.isDark ? 'bg-[#0b1326] text-white' : 'bg-white text-[#0b1326]'}`}>
                            {blog.author.charAt(0)}
                        </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className={`text-2xl font-bold font-headline mb-2 ${t.textOnSurface}`}>{blog.author}</h4>
                        <p className={`mb-4 ${t.textOnSurfaceVariant}`}>
                            Specializing in AI-driven software architecture and enterprise-grade solutions. Leading the charge in US-based engineering squads at ApZelio.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            {['AI & ML', 'Cloud Native', 'Cybersecurity'].map(skill => (
                                <span key={skill} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${t.secondaryContainer}`}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogDetail;
