import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Trash2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useThemeClasses } from '../hooks/useThemeClasses';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* ---------- Sub-components ---------- */

const Notification = ({ notification }) => {
  if (!notification) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl border ${
        notification.type === 'success'
          ? 'bg-green-500/10 border-green-500/20 text-green-400'
          : 'bg-red-500/10 border-red-500/20 text-red-400'
      }`}
    >
      {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {notification.msg}
    </motion.div>
  );
};

const GeneratorSidebar = ({ t, topic, setTopic, category, setCategory, tone, setTone, isGenerating, onGenerate }) => (
  <div className={`p-8 rounded-2xl border sticky top-32 ${t.glassCard} ${t.isDark ? 'border-[#45464d]/20' : 'border-gray-200'}`}>
    <div className="flex items-center gap-2 mb-8">
      <div className={`p-2 rounded-lg ${t.secondaryContainer}`}><Sparkles className="w-5 h-5" /></div>
      <h2 className={`text-xl font-bold font-headline ${t.textOnSurface}`}>AI Generator</h2>
    </div>
    <div className="space-y-6">
      <div>
        <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Topic / Keyword</label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Benefits of Serverless for SaaS"
          className={`w-full p-4 rounded-xl border bg-transparent text-sm outline-none transition-all ${t.isDark ? 'border-[#45464d] focus:border-[#47d6ff]/50' : 'border-gray-200 focus:border-[#006398]/50'}`}
          rows={4}
        />
      </div>
      <div>
        <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={`w-full p-4 rounded-xl border bg-transparent text-sm outline-none ${t.isDark ? 'border-[#45464d] text-white' : 'border-gray-200 text-gray-800'}`}>
          {['Development', 'AI', 'Cloud', 'Enterprise'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Tone</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)} className={`w-full p-4 rounded-xl border bg-transparent text-sm outline-none ${t.isDark ? 'border-[#45464d] text-white' : 'border-gray-200 text-gray-800'}`}>
          {['Professional and Technical', 'Creative and Visionary', 'Direct and Business-focused'].map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <button onClick={onGenerate} disabled={isGenerating || !topic} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${t.ctaGradient}`}>
        {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</> : <><Sparkles className="w-5 h-5" /> Generate Blog</>}
      </button>
    </div>
  </div>
);

const BlogEditor = ({ t, editedTitle, setEditedTitle, editedSummary, setEditedSummary, editedContent, setEditedContent, isSaving, onSave, onDiscard }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
    <div className={`p-8 rounded-2xl border ${t.glassCard} ${t.isDark ? 'border-[#45464d]/20' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-xl font-bold font-headline ${t.textOnSurface}`}>Review & Edit</h2>
        <div className="flex gap-4">
          <button onClick={onDiscard} className={`px-4 py-2 rounded-lg text-sm font-bold ${t.textOnSurfaceVariant}`}>Discard</button>
          <button onClick={onSave} disabled={isSaving} className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 ${t.ctaGradient}`}>
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Publish Now
          </button>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Title</label>
          <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className={`w-full p-4 rounded-xl border bg-transparent text-lg font-bold outline-none ${t.isDark ? 'border-[#45464d]' : 'border-gray-200'}`} />
        </div>
        <div>
          <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Summary</label>
          <textarea value={editedSummary} onChange={(e) => setEditedSummary(e.target.value)} className={`w-full p-4 rounded-xl border bg-transparent text-sm outline-none ${t.isDark ? 'border-[#45464d]' : 'border-gray-200'}`} rows={2} />
        </div>
        <div>
          <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${t.textSecondary}`}>Content (Markdown)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className={`w-full p-4 rounded-xl border bg-transparent text-xs font-mono outline-none ${t.isDark ? 'border-[#45464d]' : 'border-gray-200'}`} rows={20} />
            <div className={`p-4 rounded-xl border overflow-auto max-h-[500px] prose prose-sm ${t.isDark ? 'prose-invert border-[#45464d]/10' : 'prose-slate border-gray-100'}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{editedContent}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const BlogList = ({ blogs, t, onDelete }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className={`text-2xl font-bold font-headline ${t.textOnSurface}`}>Published Articles</h2>
      <div className={`px-4 py-2 rounded-lg text-sm font-bold ${t.bgSurfaceHigh} ${t.textOnSurface}`}>Total: {blogs.length}</div>
    </div>
    <div className="space-y-4">
      {blogs.length > 0 ? blogs.map(blog => (
        <div key={blog.id} className={`p-6 rounded-2xl border flex items-center justify-between transition-all hover:border-indigo-500/30 ${t.glassCard} ${t.isDark ? 'border-[#45464d]/20' : 'border-gray-200'}`}>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${t.secondaryContainer}`}>{blog.category}</span>
              <span className={`text-[10px] ${t.textSecondary}`}>{new Date(blog.created_at).toLocaleDateString()}</span>
            </div>
            <h3 className={`text-lg font-bold ${t.textOnSurface}`}>{blog.title}</h3>
          </div>
          <button onClick={() => onDelete(blog.id)} className="p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )) : (
        <div className={`text-center py-20 rounded-3xl border border-dashed ${t.borderOutlineLight}`}>
          <p className={t.textOnSurfaceVariant}>No blogs published yet.</p>
        </div>
      )}
    </div>
  </div>
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

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const showNotification = useCallback((msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 5000);
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
        showNotification('Blog generated successfully!');
      }
    } catch {
      showNotification('Failed to generate blog.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.post('/api/blogs', { title: editedTitle, summary: editedSummary, content: editedContent, category, status: 'published' });
      showNotification('Blog published successfully!');
      setGeneratedBlog(null);
      setTopic('');
      fetchBlogs();
    } catch {
      showNotification('Failed to publish blog.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      showNotification('Blog deleted.');
      fetchBlogs();
    } catch {
      showNotification('Failed to delete blog.', 'error');
    }
  };

  return (
    <main className={`min-h-screen pt-32 pb-24 px-8 ${t.bgSurface}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className={`text-4xl font-bold font-headline mb-2 ${t.textOnSurface}`}>Blog Management</h1>
            <p className={t.textOnSurfaceVariant}>Design and generate high-quality technical content for ApZelio.</p>
          </div>
          <Notification notification={notification} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <GeneratorSidebar t={t} topic={topic} setTopic={setTopic} category={category} setCategory={setCategory} tone={tone} setTone={setTone} isGenerating={isGenerating} onGenerate={handleGenerate} />
          </div>
          <div className="lg:col-span-2">
            {generatedBlog ? (
              <BlogEditor t={t} editedTitle={editedTitle} setEditedTitle={setEditedTitle} editedSummary={editedSummary} setEditedSummary={setEditedSummary} editedContent={editedContent} setEditedContent={setEditedContent} isSaving={isSaving} onSave={handleSave} onDiscard={() => setGeneratedBlog(null)} />
            ) : (
              <BlogList blogs={blogs} t={t} onDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admin;
