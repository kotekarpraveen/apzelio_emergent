import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Send, Save, Eye, EyeOff, LayoutDashboard, 
  FileText, Users, MessageSquare, Settings, LogOut, 
  Sparkles, CheckCircle, Clock, ArrowRight, UserPlus
} from 'lucide-react';
import axios from 'axios';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Blog Creation State
  const [isCreating, setIsCreating] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', summary: '', category: 'Development', topic: '', status: 'draft' });
  const [generating, setGenerating] = useState(false);

  const token = localStorage.getItem('apzelio_token');

  const checkAuth = useCallback(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(localStorage.getItem('apzelio_user'));
    setUser(userData);
  }, [token, navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('/api/blogs?status=draft', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const published = await axios.get('/api/blogs?status=published');
      setBlogs([...response.data, ...published.data]);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    if (user?.role !== 'admin') return;
    try {
      const response = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Fetch users error:', err);
    }
  }, [token, user]);

  const fetchContacts = useCallback(async () => {
    if (user?.role !== 'admin') return;
    try {
      const response = await axios.get('/api/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(response.data);
    } catch (err) {
      console.error('Fetch contacts error:', err);
    }
  }, [token, user]);

  useEffect(() => {
    if (user) {
      fetchBlogs();
      fetchUsers();
      fetchContacts();
      setLoading(false);
    }
  }, [user, fetchBlogs, fetchUsers, fetchContacts]);

  const handleToggleStatus = async (blogId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
      await axios.patch(`/api/blogs/${blogId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const generateWithAI = async () => {
    if (!newBlog.topic) return;
    setGenerating(true);
    try {
      const res = await axios.post('/api/blogs/generate', { topic: newBlog.topic }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewBlog({ ...newBlog, title: res.data.title, content: res.data.content, summary: res.data.summary, image_url: res.data.image_url });
    } catch (err) {
      alert('AI Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const saveBlog = async () => {
    try {
      await axios.post('/api/blogs', newBlog, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsCreating(false);
      setNewBlog({ title: '', content: '', summary: '', category: 'Development', topic: '', status: 'draft' });
      fetchBlogs();
    } catch (err) {
      alert('Save failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('apzelio_token');
    localStorage.removeItem('apzelio_user');
    navigate('/login');
  };

  if (loading || !user) return <div className="min-h-screen bg-[#0b1326] flex items-center justify-center text-white">Initializing Studio...</div>;

  return (
    <div className="min-h-screen bg-[#0b1326] text-slate-300 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#191c24] border-r border-white/5 flex flex-col p-8 fixed h-full">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#47d6ff] to-[#006398] flex items-center justify-center font-bold text-white shadow-lg">A</div>
          <div>
            <h2 className="text-white font-headline font-bold">Studio Admin</h2>
            <p className="text-xs text-[#47d6ff] uppercase tracking-widest font-bold">{user.role}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem active={activeTab === 'blogs'} icon={<FileText />} label="Articles" onClick={() => setActiveTab('blogs')} />
          {user.role === 'admin' && (
            <>
              <NavItem active={activeTab === 'users'} icon={<Users />} label="Users" onClick={() => setActiveTab('users')} />
              <NavItem active={activeTab === 'contacts'} icon={<MessageSquare />} label="Enquiries" onClick={() => setActiveTab('contacts')} />
            </>
          )}
          <NavItem active={activeTab === 'settings'} icon={<Settings />} label="Settings" onClick={() => setActiveTab('settings')} />
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 p-4 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-12">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-headline font-bold text-white mb-2">
              {activeTab === 'blogs' && 'Article Studio'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'contacts' && 'Recent Enquiries'}
            </h1>
            <p className="text-slate-500">Welcome back, {user.username}</p>
          </div>
          
          {activeTab === 'blogs' && (
            <button 
              onClick={() => setIsCreating(true)}
              className="px-6 py-3 rounded-xl bg-[#47d6ff] text-[#0b1326] font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-[#47d6ff]/20"
            >
              <Plus className="w-5 h-5" /> Create New
            </button>
          )}
        </header>

        {activeTab === 'blogs' && (
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {isCreating && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-[#191c24] rounded-3xl p-8 border border-[#47d6ff]/20 shadow-2xl mb-8 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">AI Prompt</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-[#47d6ff]" 
                            placeholder="What should the article be about?"
                            value={newBlog.topic}
                            onChange={e => setNewBlog({...newBlog, topic: e.target.value})}
                          />
                          <button onClick={generateWithAI} disabled={generating} className="px-6 rounded-xl bg-white/10 hover:bg-white/20 text-[#47d6ff] font-bold transition-all disabled:opacity-50">
                            {generating ? 'Generating...' : <Sparkles />}
                          </button>
                        </div>
                      </div>
                      <input 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xl font-bold text-white outline-none focus:border-[#47d6ff]" 
                        placeholder="Article Title"
                        value={newBlog.title}
                        onChange={e => setNewBlog({...newBlog, title: e.target.value})}
                      />
                      <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-64 text-white outline-none focus:border-[#47d6ff]" 
                        placeholder="Content (Markdown supported)..."
                        value={newBlog.content}
                        onChange={e => setNewBlog({...newBlog, content: e.target.value})}
                      />
                    </div>
                    <div className="space-y-6">
                      <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                         <h4 className="font-bold text-white mb-4">Metadata</h4>
                         <div className="space-y-4">
                            <select className="w-full bg-[#191c24] border border-white/10 rounded-xl p-3" value={newBlog.category} onChange={e => setNewBlog({...newBlog, category: e.target.value})}>
                              <option>Development</option>
                              <option>AI</option>
                              <option>Cloud</option>
                              <option>Enterprise</option>
                            </select>
                            <textarea className="w-full bg-[#191c24] border border-white/10 rounded-xl p-3 h-24 text-sm" placeholder="Summary..." value={newBlog.summary} onChange={e => setNewBlog({...newBlog, summary: e.target.value})} />
                         </div>
                      </div>
                      {newBlog.image_url && (
                        <div className="rounded-2xl overflow-hidden aspect-video border border-white/10 relative">
                          <img src={newBlog.image_url} alt="AI Generated" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold uppercase">AI Generated Header</div>
                        </div>
                      )}
                      <div className="flex gap-4">
                        <button onClick={saveBlog} className="flex-1 bg-[#47d6ff] text-[#0b1326] font-bold py-4 rounded-xl flex items-center justify-center gap-2">
                          <Save className="w-5 h-5" /> Save to Drafts
                        </button>
                        <button onClick={() => setIsCreating(false)} className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all">Cancel</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {blogs.map(blog => (
              <div key={blog.id} className="bg-[#191c24] rounded-2xl p-6 border border-white/5 flex items-center justify-between hover:border-white/10 transition-all">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${blog.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {blog.status === 'published' ? <CheckCircle /> : <Clock />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{blog.title || 'Untitled Article'}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 uppercase font-bold tracking-wider">
                      <span>{blog.author_name || 'Unknown Author'}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span>{blog.category || 'General'}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span>{blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'No Date'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => handleToggleStatus(blog.id, blog.status)} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${blog.status === 'published' ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}>
                    {blog.status === 'published' ? <><EyeOff className="w-4 h-4" /> Move to Drafts</> : <><Eye className="w-4 h-4" /> Publish</>}
                  </button>
                  <button className="p-3 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-end">
               <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
                 <UserPlus className="w-5 h-5" /> Add Author
               </button>
            </div>
            <div className="bg-[#191c24] rounded-3xl border border-white/5 overflow-hidden">
               <table className="w-full text-left">
                 <thead className="bg-white/5 text-xs font-bold uppercase text-slate-500">
                   <tr>
                     <th className="p-6">User</th>
                     <th className="p-6">Email</th>
                     <th className="p-6">Role</th>
                     <th className="p-6">Joined</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   {users.map(u => (
                     <tr key={u.id} className="hover:bg-white/5 transition-all">
                       <td className="p-6 font-bold text-white">{u.username}</td>
                       <td className="p-6">{u.email}</td>
                       <td className="p-6"><span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-[#47d6ff]/10 text-[#47d6ff]' : 'bg-slate-800 text-slate-400'}`}>{u.role}</span></td>
                       <td className="p-6 text-sm">{u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-6">
             {contacts.map(c => (
               <div key={c.id} className="bg-[#191c24] p-8 rounded-3xl border border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                       <h3 className="text-xl font-bold text-white mb-1">{c.name}</h3>
                       <p className="text-slate-500">{c.email}</p>
                    </div>
                    <span className="px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase">New Enquiry</span>
                  </div>
                  <p className="text-slate-300 bg-white/5 p-4 rounded-xl">{c.message || 'No message content.'}</p>
               </div>
             ))}
          </div>
        )}
      </main>
    </div>
  );
};

const NavItem = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl font-medium transition-all ${active ? 'bg-[#47d6ff] text-[#0b1326] shadow-lg shadow-[#47d6ff]/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    {React.cloneElement(icon, { className: 'w-5 h-5' })}
    <span>{label}</span>
  </button>
);

export default Admin;
