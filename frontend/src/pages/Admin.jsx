import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Trash2, Loader2, CheckCircle2, AlertCircle, BrainCircuit, Wand2, Eye, Code2, LayoutDashboard, FileText, Clock, ArrowRight } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }),
};

/* ---------- Sub-components ---------- */

const Notification = ({ notification }) => (
  <AnimatePresence>
    {notification && (
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className={`fixed top-24 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl border shadow-2xl backdrop-blur-xl ${
          notification.type === 'success'
            ? 'bg-green-500/10 border-green-500/20 text-green-400'
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}
      >
        {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        <span className="font-bold text-sm">{notification.msg}</span>
      </motion.div>
    )}
  </AnimatePresence>
);

const StatsBar = ({ t, blogCount }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
    {[
      { icon: FileText, label: 'Published', value: blogCount, color: 'primary' },
      { icon: BrainCircuit, label: 'AI Generated', value: blogCount, color: 'tertiary' },
      { icon: Eye, label: 'Total Views', value: '—', color: 'secondary' },
      { icon: Clock, label: 'Avg. Read Time', value: '5 min', color: 'primary' },
    ].map((stat) => (
      <div key={stat.label} className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${t.isDark ? 'bg-[#131b2e] border-[#45464d]/10' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color === 'primary' ? (t.isDark ? 'bg-[#47d6ff]/10' : 'bg-[#006398]/10') : stat.color === 'tertiary' ? (t.isDark ? 'bg-[#d2bbff]/10' : 'bg-[#00668a]/10') : (t.isDark ? 'bg-[#b9c7e0]/10' : 'bg-gray-100')}`}>
            <stat.icon className={`w-4 h-4 ${stat.color === 'primary' ? t.textPrimary : stat.color === 'tertiary' ? t.textTertiary : t.textSecondary}`} />
          </div>
          <span className={`text-xs font-bold uppercase tracking-widest ${t.textSecondary}`}>{stat.label}</span>
        </div>
        <div className={`text-2xl font-bold font-headline ${t.textOnSurface}`}>{stat.value}</div>
      </div>
    ))}
  </div>
);

const GeneratorPanel = ({ t, topic, setTopic, category, setCategory, tone, setTone, isGenerating, onGenerate }) => (
  <div className={`p-8 rounded-2xl border relative overflow-hidden ${t.isDark ? 'bg-[#131b2e] border-[#45464d]/15' : 'bg-white border-gray-100 shadow-md'}`}>
    {/* Decorative accent */}
    <div className={`absolute top-0 left-0 w-full h-1 ${t.ctaGradient}`} />

    <div className="flex items-center gap-3 mb-8">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${t.isDark ? 'bg-gradient-to-br from-[#47d6ff]/20 to-[#d2bbff]/20' : 'bg-gradient-to-br from-[#006398]/10 to-[#40a2e7]/10'}`}>
        <Wand2 className={`w-5 h-5 ${t.textPrimary}`} />
      </div>
      <div>
        <h2 className={`text-lg font-bold font-headline ${t.textOnSurface}`}>AI Content Engine</h2>
        <p className={`text-xs ${t.textSecondary}`}>Powered by GPT-4o-mini</p>
      </div>
    </div>

    <div className="space-y-5">
      <div>
        <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Topic / Keyword</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. How Serverless Architecture reduces SaaS costs by 40%"
          className={`w-full p-4 rounded-xl border bg-transparent text-sm outline-none transition-all resize-none ${t.isDark ? 'border-[#45464d]/30 focus:border-[#47d6ff]/50 text-[#dae2fd] placeholder-[#c6c6cd]/40' : 'border-gray-200 focus:border-[#006398]/50 text-[#191c1e] placeholder-gray-400'}`}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={`w-full p-3 rounded-xl border bg-transparent text-sm outline-none ${t.isDark ? 'border-[#45464d]/30 text-[#dae2fd]' : 'border-gray-200 text-[#191c1e]'}`}>
            {['Development', 'AI', 'Cloud', 'Enterprise'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Tone</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)} className={`w-full p-3 rounded-xl border bg-transparent text-sm outline-none ${t.isDark ? 'border-[#45464d]/30 text-[#dae2fd]' : 'border-gray-200 text-[#191c1e]'}`}>
            {[['Professional and Technical', 'Technical'], ['Creative and Visionary', 'Visionary'], ['Direct and Business-focused', 'Business']].map(([val, label]) => <option key={val} value={val}>{label}</option>)}
          </select>
        </div>
      </div>

      <button onClick={onGenerate} disabled={isGenerating || !topic} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all disabled:opacity-40 text-base ${t.ctaGradient} hover:scale-[1.02] active:scale-[0.98]`} style={t.ctaShadow}>
        {isGenerating ? (
          <>
            <div className="relative w-5 h-5">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
            </div>
            <span>AI is Thinking...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Generate Article</span>
          </>
        )}
      </button>

      {isGenerating && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 mt-4">
          {['Analyzing topic...', 'Structuring outline...', 'Writing content...'].map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 1.5 }}
              className={`flex items-center gap-2 text-xs ${t.textSecondary}`}
            >
              <Loader2 className="w-3 h-3 animate-spin" />
              {step}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  </div>
);

const EditorPanel = ({ t, title, setTitle, summary, setSummary, content, setContent, isSaving, onSave, onDiscard }) => {
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Editor Header */}
      <div className={`flex items-center justify-between p-5 rounded-2xl border ${t.isDark ? 'bg-[#131b2e] border-[#45464d]/15' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full animate-pulse ${t.isDark ? 'bg-green-400' : 'bg-green-500'}`} />
          <span className={`font-bold font-headline ${t.textOnSurface}`}>Review & Edit</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onDiscard} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${t.isDark ? 'text-[#c6c6cd] hover:bg-[#222a3d]' : 'text-gray-500 hover:bg-gray-100'}`}>Discard</button>
          <button onClick={onSave} disabled={isSaving} className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all hover:scale-105 ${t.ctaGradient}`}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Publish
          </button>
        </div>
      </div>

      {/* Title & Summary */}
      <div className={`p-6 rounded-2xl border space-y-4 ${t.isDark ? 'bg-[#131b2e] border-[#45464d]/15' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div>
          <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={`w-full p-4 rounded-xl border bg-transparent text-xl font-bold font-headline outline-none ${t.isDark ? 'border-[#45464d]/20 text-[#dae2fd]' : 'border-gray-200 text-[#191c1e]'}`} />
        </div>
        <div>
          <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Summary</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className={`w-full p-4 rounded-xl border bg-transparent text-sm outline-none resize-none ${t.isDark ? 'border-[#45464d]/20 text-[#dae2fd]' : 'border-gray-200 text-[#191c1e]'}`} rows={2} />
        </div>
      </div>

      {/* Content Editor with Tabs */}
      <div className={`rounded-2xl border overflow-hidden ${t.isDark ? 'bg-[#131b2e] border-[#45464d]/15' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className={`flex items-center border-b ${t.isDark ? 'border-[#45464d]/15' : 'border-gray-100'}`}>
          <button onClick={() => setPreviewMode(false)} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-colors ${!previewMode ? `${t.textPrimary} border-b-2 ${t.isDark ? 'border-[#47d6ff]' : 'border-[#006398]'}` : t.textSecondary}`}>
            <Code2 className="w-4 h-4" /> Editor
          </button>
          <button onClick={() => setPreviewMode(true)} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-colors ${previewMode ? `${t.textPrimary} border-b-2 ${t.isDark ? 'border-[#47d6ff]' : 'border-[#006398]'}` : t.textSecondary}`}>
            <Eye className="w-4 h-4" /> Preview
          </button>
        </div>
        <div className="p-6">
          {previewMode ? (
            <div className={`prose prose-lg max-w-none min-h-[400px] ${t.isDark ? 'prose-invert' : 'prose-slate'} prose-headings:font-headline`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full min-h-[400px] p-4 rounded-xl border bg-transparent text-sm font-mono outline-none resize-y ${t.isDark ? 'border-[#45464d]/20 text-[#c6c6cd]' : 'border-gray-200 text-[#3e4850]'}`}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const BlogListItem = ({ blog, t, onDelete }) => (
  <motion.div variants={fadeUp} className={`group p-5 rounded-2xl border flex items-center gap-5 transition-all ${t.isDark ? 'bg-[#131b2e] border-[#45464d]/10 hover:border-[#47d6ff]/20' : 'bg-white border-gray-100 hover:border-[#006398]/20 shadow-sm'}`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${t.isDark ? 'bg-gradient-to-br from-[#47d6ff]/10 to-[#d2bbff]/10' : 'bg-gradient-to-br from-[#006398]/5 to-[#40a2e7]/5'}`}>
      <FileText className={`w-5 h-5 ${t.textPrimary}`} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-1">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${t.secondaryContainer}`}>{blog.category}</span>
        {blog.is_ai_generated && <span className="flex items-center gap-1 text-[9px] font-bold text-indigo-400"><Sparkles className="w-2.5 h-2.5" /> AI</span>}
        <span className={`text-[10px] ${t.textSecondary}`}>{new Date(blog.created_at).toLocaleDateString()}</span>
      </div>
      <h3 className={`font-bold truncate ${t.textOnSurface}`}>{blog.title}</h3>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" className={`p-2.5 rounded-xl transition-colors ${t.isDark ? 'hover:bg-[#222a3d] text-[#c6c6cd]' : 'hover:bg-gray-100 text-gray-500'}`}>
        <Eye className="w-4 h-4" />
      </a>
      <button onClick={() => onDelete(blog.id)} className="p-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

/* ---------- Main Component ---------- */

const Admin = () => {
  const t = useThemeClasses();
  const [blogs, setBlogs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('Development');
  const [tone, setTone] = useState('Professional and Technical');
  const [generatedBlog, setGeneratedBlog] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedSummary, setEditedSummary] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [notification, setNotification] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const showNotification = useCallback((msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setGeneratedBlog(null);
    try {
      const response = await axios.post('/api/blogs/generate', { topic, category, tone });
      if (response.data.error) {
        showNotification(response.data.error, 'error');
      } else {
        setGeneratedBlog(response.data);
        setEditedTitle(response.data.title);
        setEditedSummary(response.data.summary);
        setEditedContent(response.data.content);
        showNotification('Article generated! Review and publish below.');
      }
    } catch {
      showNotification('Generation failed. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.post('/api/blogs', { title: editedTitle, summary: editedSummary, content: editedContent, category, status: 'published' });
      showNotification('Article published successfully!');
      setGeneratedBlog(null);
      setTopic('');
      fetchBlogs();
    } catch {
      showNotification('Failed to publish.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article permanently?')) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      showNotification('Article deleted.');
      fetchBlogs();
    } catch {
      showNotification('Failed to delete.', 'error');
    }
  };

  return (
    <main className={`min-h-screen pt-32 pb-24 px-8 ${t.bgSurface}`}>
      <Notification notification={notification} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.isDark ? 'bg-gradient-to-br from-[#47d6ff]/20 to-[#d2bbff]/20' : 'bg-gradient-to-br from-[#006398]/10 to-[#40a2e7]/10'}`}>
              <LayoutDashboard className={`w-5 h-5 ${t.textPrimary}`} />
            </div>
            <h1 className={`text-3xl font-bold font-headline ${t.textOnSurface}`}>Content Studio</h1>
          </div>
          <p className={`ml-[52px] ${t.textOnSurfaceVariant}`}>Generate, edit, and publish AI-powered technical articles.</p>
        </motion.div>

        <StatsBar t={t} blogCount={blogs.length} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <GeneratorPanel t={t} topic={topic} setTopic={setTopic} category={category} setCategory={setCategory} tone={tone} setTone={setTone} isGenerating={isGenerating} onGenerate={handleGenerate} />
            </div>
          </div>

          {/* Main Area */}
          <div className="lg:col-span-8">
            {generatedBlog ? (
              <EditorPanel t={t} title={editedTitle} setTitle={setEditedTitle} summary={editedSummary} setSummary={setEditedSummary} content={editedContent} setContent={setEditedContent} isSaving={isSaving} onSave={handleSave} onDiscard={() => setGeneratedBlog(null)} />
            ) : (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className={`text-xl font-bold font-headline ${t.textOnSurface}`}>Published Articles</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${t.secondaryContainer}`}>{blogs.length} total</span>
                </div>
                {blogs.length > 0 ? (
                  <motion.div variants={{ visible: { transition: { staggerChildren: 0.05 } } }} className="space-y-3">
                    {blogs.map(blog => (
                      <BlogListItem key={blog.id} blog={blog} t={t} onDelete={handleDelete} />
                    ))}
                  </motion.div>
                ) : (
                  <div className={`text-center py-20 rounded-3xl border border-dashed ${t.isDark ? 'border-[#45464d]/30' : 'border-gray-200'}`}>
                    <BrainCircuit className={`w-12 h-12 mx-auto mb-4 opacity-20 ${t.textPrimary}`} />
                    <p className={`text-lg font-headline font-bold mb-2 ${t.textOnSurface}`}>No articles yet</p>
                    <p className={t.textOnSurfaceVariant}>Use the AI generator on the left to create your first article.</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admin;
