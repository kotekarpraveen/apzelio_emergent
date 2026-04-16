import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChatBot = () => {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm ApZelio's AI assistant. Ask me about our services, tech stack, methodology, or how we can help your project." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'chat-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9));
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/chat`, { message: userMsg, session_id: sessionId });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again or use our contact form." }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`mb-4 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl border overflow-hidden flex flex-col ${
              isDark
                ? 'bg-[#131b2e] border-[#45464d]/30'
                : 'bg-white border-gray-200'
            }`}
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className={`px-5 py-4 flex items-center justify-between border-b ${
              isDark ? 'bg-[#171f33] border-[#45464d]/20' : 'bg-[#006398] border-blue-600'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-[#47d6ff]/20' : 'bg-white/20'
                }`}>
                  <Bot className={`w-5 h-5 ${isDark ? 'text-[#47d6ff]' : 'text-white'}`} />
                </div>
                <div>
                  <div className={`font-headline font-bold text-sm ${isDark ? 'text-[#dae2fd]' : 'text-white'}`}>ApZelio AI</div>
                  <div className={`text-[10px] flex items-center gap-1 ${isDark ? 'text-[#c6c6cd]' : 'text-white/70'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className={`p-1.5 rounded-lg transition-colors ${
                isDark ? 'hover:bg-white/10 text-[#c6c6cd]' : 'hover:bg-white/20 text-white'
              }`}>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isDark ? 'bg-[#47d6ff]/15' : 'bg-[#006398]/10'
                    }`}>
                      <Bot className={`w-3.5 h-3.5 ${isDark ? 'text-[#47d6ff]' : 'text-[#006398]'}`} />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                    msg.role === 'user'
                      ? isDark
                        ? 'bg-[#47d6ff] text-[#003543] rounded-br-md'
                        : 'bg-[#006398] text-white rounded-br-md'
                      : isDark
                        ? 'bg-[#222a3d] text-[#dae2fd] rounded-bl-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      isDark ? 'bg-[#3c4a5e]' : 'bg-[#006398]/10'
                    }`}>
                      <User className={`w-3.5 h-3.5 ${isDark ? 'text-[#b9c7e0]' : 'text-[#006398]'}`} />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-2.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-[#47d6ff]/15' : 'bg-[#006398]/10'
                  }`}>
                    <Bot className={`w-3.5 h-3.5 ${isDark ? 'text-[#47d6ff]' : 'text-[#006398]'}`} />
                  </div>
                  <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${
                    isDark ? 'bg-[#222a3d]' : 'bg-gray-100'
                  }`}>
                    <div className="flex gap-1.5">
                      <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-[#47d6ff]' : 'bg-[#006398]'}`} style={{ animationDelay: '0ms' }} />
                      <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-[#47d6ff]' : 'bg-[#006398]'}`} style={{ animationDelay: '150ms' }} />
                      <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-[#47d6ff]' : 'bg-[#006398]'}`} style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`px-4 py-3 border-t ${isDark ? 'border-[#45464d]/20 bg-[#171f33]' : 'border-gray-200 bg-white'}`}>
              <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${isDark ? 'bg-[#0b1326] border border-[#45464d]/20' : 'bg-gray-50 border border-gray-200'}`}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services..."
                  className={`flex-1 bg-transparent text-sm outline-none placeholder-opacity-50 ${
                    isDark ? 'text-[#dae2fd] placeholder-[#c6c6cd]' : 'text-gray-800 placeholder-gray-400'
                  }`}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className={`p-2 rounded-lg transition-all disabled:opacity-30 ${
                    isDark
                      ? 'bg-[#47d6ff] text-[#003543] hover:bg-[#47d6ff]/80'
                      : 'bg-[#006398] text-white hover:bg-[#005080]'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all ${
          isDark
            ? 'bg-[#47d6ff] text-[#003543] hover:shadow-[0_0_30px_rgba(71,214,255,0.3)]'
            : 'bg-[#006398] text-white hover:shadow-[0_0_30px_rgba(0,99,152,0.3)]'
        }`}
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
