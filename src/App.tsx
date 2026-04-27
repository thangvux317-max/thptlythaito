/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Search, 
  Calendar, 
  BookOpen, 
  Clock, 
  GraduationCap, 
  Send, 
  ChevronDown, 
  Menu, 
  X, 
  Loader2,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Globe,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { UNIVERSITY_SCORES, EXAM_INFO } from './constants';
import { chatWithAI, solveHomework } from './services/geminiService';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Giới thiệu', href: '#about' },
    { name: 'Chat AI', href: '#chat' },
    { name: 'Điểm chuẩn', href: '#scores' },
    { name: 'Thi THPT 2026', href: '#exam' },
    { name: 'Giải bài tập', href: '#homework' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-school-blue rounded-full flex items-center justify-center text-white font-bold text-xl">L</div>
          <span className={cn(
            "font-display font-bold text-lg md:text-xl hidden sm:block",
            isScrolled ? "text-school-blue" : "text-school-blue"
          )}>
            thptlytaito271ai
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-slate-700 hover:text-school-blue font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#chat" 
            className="bg-school-blue text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Bắt đầu
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-school-blue p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 lg:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-700 hover:text-school-blue font-medium text-lg border-b border-slate-100 pb-2"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-school-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-school-gold/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-school-blue px-4 py-1 rounded-full text-sm font-bold mb-6">
            <GraduationCap size={16} />
            <span>EduTech Platform 2026</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-tight mb-6">
            Học tập thông minh cùng <span className="text-school-blue">thptlytaito271ai</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Trợ lý ảo đồng hành cùng học sinh trường THPT Lý Thái Tổ trong học tập, tra cứu thông tin và định hướng tương lai.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#chat" 
              className="bg-school-blue text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-200"
            >
              Bắt đầu hỏi AI <ArrowRight size={20} />
            </a>
            <a 
              href="#about" 
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 bg-white p-4 rounded-3xl shadow-2xl border border-slate-100">
            <img 
              src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/494122133_1237003708427168_7548807852552427552_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGBAtwgWviZWuioJ5Ay2p-YCiMCWJMV0wEKIwJYkxXTAX_YXNcTOr_PD7hV6mB4f2d5J2h3ODHb0iqssHYeMPUn&_nc_ohc=_27R7SVTXj0Q7kNvwHHePkl&_nc_oc=AdpdFsB78yJ1gKkAnoOSE2JNz74bBiuZh2wv1xQ87Z4CuNdkiyOi6zWA4ngO4BVBXThvSB5GDqEf5oqCIdy5NXED&_nc_zt=23&_nc_ht=scontent.fhan5-10.fna&_nc_gid=lwJQsETAf2mG78WWmD8FMw&_nc_ss=7b2a8&oh=00_Af36XfKrn_LxKiZqAud_uEWQzpKxF9B4WwG63sVQmfrCzA&oe=69F2C71E" 
              alt="Học sinh THPT Lý Thái Tổ" 
              className="rounded-2xl w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-4">
              <div className="w-12 h-12 bg-school-gold rounded-full flex items-center justify-center text-white">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">AI Status</p>
                <p className="text-sm font-bold text-slate-800">Sẵn sàng hỗ trợ 24/7</p>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-school-gold/20 rounded-full blur-2xl animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

const AIChat = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Chào bạn! Mình là trợ lý ảo của trường THPT Lý Thái Tổ. Bạn cần mình giúp gì hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const aiResponse = await chatWithAI(userMsg, history);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <section id="chat" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Hỏi đáp trực tiếp với AI</h2>
          <p className="text-slate-600">Giải đáp mọi thắc mắc về trường lớp, kiến thức và tuyển sinh.</p>
        </div>

        <div className="bg-slate-50 rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[600px]">
          <div className="bg-school-blue p-4 text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="font-bold">thptlytaito271ai Chat</p>
              <p className="text-xs text-blue-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Online
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white",
                  msg.role === 'user' ? "bg-school-gold" : "bg-school-blue"
                )}>
                  {msg.role === 'user' ? 'U' : 'AI'}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed",
                  msg.role === 'user' 
                    ? "bg-school-blue text-white rounded-tr-none" 
                    : "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
                )}>
                  <div className="markdown-body">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-school-blue flex items-center justify-center text-white">AI</div>
                <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                  <Loader2 className="animate-spin text-school-blue" size={20} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-200">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Nhập câu hỏi của bạn..."
                className="w-full bg-slate-100 border-none rounded-2xl py-4 pl-6 pr-14 focus:ring-2 focus:ring-school-blue transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 bg-school-blue text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const UniversityScores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('Tất cả');

  const filteredScores = UNIVERSITY_SCORES.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.major.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = regionFilter === 'Tất cả' || item.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  return (
    <section id="scores" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Tra cứu điểm chuẩn Đại học</h2>
          <p className="text-slate-600">Dữ liệu điểm chuẩn các năm 2024, 2025 và dự kiến 2026.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Nhập tên trường hoặc ngành học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-school-blue transition-all"
            />
          </div>
          <select 
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl py-3 px-6 focus:ring-2 focus:ring-school-blue outline-none"
          >
            <option>Tất cả</option>
            <option>Miền Bắc</option>
            <option>Miền Trung</option>
            <option>Miền Nam</option>
          </select>
        </div>

        <div className="grid gap-6">
          {filteredScores.length > 0 ? (
            filteredScores.map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold bg-blue-100 text-school-blue px-2 py-0.5 rounded uppercase">{item.region}</span>
                    <h3 className="font-bold text-lg text-slate-900">{item.name}</h3>
                  </div>
                  <p className="text-slate-600 flex items-center gap-2">
                    <BookOpen size={16} /> {item.major}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">2024</p>
                    <p className="text-lg font-bold text-slate-700">{item.scores["2024"]}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">2025</p>
                    <p className="text-lg font-bold text-slate-700">{item.scores["2025"]}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <p className="text-[10px] font-bold text-school-blue uppercase">2026*</p>
                    <p className="text-lg font-bold text-school-blue">{item.scores["2026"]}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
              <Search size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">Không tìm thấy dữ liệu phù hợp.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ExamInfo = () => {
  return (
    <section id="exam" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Kỳ thi THPT Quốc Gia 2026</h2>
          <p className="text-slate-600">Cập nhật thông tin mới nhất về lịch thi, cấu trúc đề và quy chế.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Schedule */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-school-blue rounded-2xl flex items-center justify-center text-white">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold">Lịch thi dự kiến</h3>
            </div>
            <div className="space-y-4">
              {EXAM_INFO.schedule.map((s, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
                  <p className="font-bold text-school-blue mb-2">{s.date}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Sáng: {s.morning}</span>
                    <span className="text-slate-500">Chiều: {s.afternoon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structure */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-school-gold rounded-2xl flex items-center justify-center text-white">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold">Cấu trúc đề thi</h3>
            </div>
            <div className="space-y-4">
              {EXAM_INFO.structure.map((s, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-0">
                  <div>
                    <p className="font-bold text-slate-800">{s.subject}</p>
                    <p className="text-xs text-slate-500">{s.format}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-700">{s.questions} câu</p>
                    <p className="text-xs text-slate-400">{s.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admission */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 lg:col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold">Hình thức xét tuyển</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {EXAM_INFO.admissionMethods.map((m, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <p className="font-bold text-slate-800 mb-1">{m.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomeworkSolver = () => {
  const [subject, setSubject] = useState('Toán');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const subjects = ['Toán', 'Lý', 'Hóa', 'Văn', 'Anh'];

  const handleSolve = async () => {
    if (!problem.trim() || isLoading) return;
    setIsLoading(true);
    setSolution('');
    const result = await solveHomework(subject, problem);
    setSolution(result);
    setIsLoading(false);
  };

  return (
    <section id="homework" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Hỏi đáp – Giải bài tập</h2>
          <p className="text-slate-600">Nhập đề bài, AI sẽ phân tích và trình bày lời giải chi tiết từng bước.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <label className="block font-bold text-slate-700 mb-4">Chọn môn học:</label>
              <div className="grid grid-cols-2 gap-3">
                {subjects.map(s => (
                  <button 
                    key={s}
                    onClick={() => setSubject(s)}
                    className={cn(
                      "py-3 rounded-xl font-bold transition-all border",
                      subject === s 
                        ? "bg-school-blue text-white border-school-blue shadow-lg shadow-blue-100" 
                        : "bg-white text-slate-500 border-slate-200 hover:border-school-blue"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <label className="block font-bold text-slate-700 mb-4">Nhập đề bài:</label>
              <textarea 
                rows={6}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Ví dụ: Giải phương trình x^2 - 5x + 6 = 0"
                className="w-full bg-white border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-school-blue outline-none transition-all resize-none"
              />
              <button 
                onClick={handleSolve}
                disabled={isLoading || !problem.trim()}
                className="w-full mt-4 bg-school-gold text-white py-4 rounded-xl font-bold text-lg hover:bg-yellow-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-yellow-100 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                Giải bài tập ngay
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-slate-900 rounded-3xl p-8 h-full min-h-[400px] text-white overflow-y-auto">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="w-8 h-8 bg-school-gold rounded-full flex items-center justify-center text-white font-bold">AI</div>
                <h3 className="font-bold text-lg">Lời giải từ AI</h3>
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[300px] gap-4">
                  <Loader2 className="animate-spin text-school-gold" size={48} />
                  <p className="text-slate-400 animate-pulse">Đang phân tích và giải bài tập...</p>
                </div>
              ) : solution ? (
                <div className="markdown-body text-slate-200">
                  <Markdown>{solution}</Markdown>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] gap-4 text-center">
                  <BookOpen size={48} className="text-slate-700" />
                  <p className="text-slate-500">Kết quả giải bài tập sẽ hiển thị tại đây.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-school-blue rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Liên hệ với chúng tôi</h2>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Mọi thắc mắc về kỹ thuật hoặc đóng góp ý kiến cho ứng dụng AI, vui lòng liên hệ qua các kênh sau.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 font-bold uppercase">Địa chỉ</p>
                    <p className="font-medium">1/271 Trần Nguyên Hãn, An Biên, Lê Chân, Hải Phòng</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 font-bold uppercase">Điện thoại</p>
                    <p className="font-medium">0225.650.8111 - 0982.062.799</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 font-bold uppercase">Email</p>
                    <p className="font-medium">contact@lythaitohp.edu.vn</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 text-slate-900">
              <h3 className="text-xl font-bold mb-6">Gửi tin nhắn nhanh</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Họ và tên" className="w-full bg-slate-100 border-none rounded-xl p-4 focus:ring-2 focus:ring-school-blue" />
                  <input type="email" placeholder="Email" className="w-full bg-slate-100 border-none rounded-xl p-4 focus:ring-2 focus:ring-school-blue" />
                </div>
                <input type="text" placeholder="Chủ đề" className="w-full bg-slate-100 border-none rounded-xl p-4 focus:ring-2 focus:ring-school-blue" />
                <textarea rows={4} placeholder="Nội dung tin nhắn..." className="w-full bg-slate-100 border-none rounded-xl p-4 focus:ring-2 focus:ring-school-blue resize-none" />
                <button className="w-full bg-school-gold text-white py-4 rounded-xl font-bold hover:bg-yellow-600 transition-all">Gửi tin nhắn</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-school-blue rounded-full flex items-center justify-center text-white font-bold text-xl">L</div>
              <span className="font-display font-bold text-2xl">thptlytaito271ai</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-6">
              Hệ thống giáo dục Lý Thái Tổ luôn tiên phong trong việc ứng dụng công nghệ vào giảng dạy và học tập, giúp học sinh phát triển toàn diện trong kỷ nguyên số.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-school-blue transition-all"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-school-blue transition-all"><Globe size={20} /></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-school-blue transition-all"><Mail size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-lg">Liên kết nhanh</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#about" className="hover:text-white transition-all">Giới thiệu</a></li>
              <li><a href="#chat" className="hover:text-white transition-all">Chat AI</a></li>
              <li><a href="#scores" className="hover:text-white transition-all">Điểm chuẩn</a></li>
              <li><a href="#exam" className="hover:text-white transition-all">Thi THPT 2026</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Hỗ trợ</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#homework" className="hover:text-white transition-all">Giải bài tập</a></li>
              <li><a href="#" className="hover:text-white transition-all">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-white transition-all">Chính sách bảo mật</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© 2026 THPT Lý Thái Tổ. Tất cả quyền được bảo lưu.</p>
          <p>Phát triển bởi Đội ngũ Công nghệ Lý Thái Tổ</p>
        </div>
      </div>
    </footer>
  );
};

const About = () => {
  const images = [
    { src: "https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/657225837_1533711068756429_5391923994686533883_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeEWnFgGBtucF2Qf59zMqt8njmkaFtPNoMGOaRoW082gwS6SlkGxnJqHX2Q84xPcCMmbQcX7l6e-tzxTqQ-O_iIk&_nc_ohc=6iTuUNPo1t8Q7kNvwHPBbrE&_nc_oc=AdpYpVTtHlgB6TmEFYBELE64IheaWiMDfyCkjxoRDhArCa7Epl7SbGp28vblNyLkYMEOdBDmTjRmPX6lrO2YKwI7&_nc_zt=23&_nc_ht=scontent.fhan5-6.fna&_nc_gid=b_vD5ulBOnGcx0NmrbVUDA&_nc_ss=7b2a8&oh=00_Af1iz7mKHWLalM2Gz3ylVzImwhYcveRJq-m5tDQwKU9v6w&oe=69F2AF45", alt: "Hoạt động ngoại khóa" },
    { src: "https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/494122133_1237003708427168_7548807852552427552_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGBAtwgWviZWuioJ5Ay2p-YCiMCWJMV0wEKIwJYkxXTAX_YXNcTOr_PD7hV6mB4f2d5J2h3ODHb0iqssHYeMPUn&_nc_ohc=_27R7SVTXj0Q7kNvwHHePkl&_nc_oc=AdpdFsB78yJ1gKkAnoOSE2JNz74bBiuZh2wv1xQ87Z4CuNdkiyOi6zWA4ngO4BVBXThvSB5GDqEf5oqCIdy5NXED&_nc_zt=23&_nc_ht=scontent.fhan5-10.fna&_nc_gid=lwJQsETAf2mG78WWmD8FMw&_nc_ss=7b2a8&oh=00_Af36XfKrn_LxKiZqAud_uEWQzpKxF9B4WwG63sVQmfrCzA&oe=69F2C71E", alt: "Hội trường lớn" },
    { src: "https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/658830932_1533858202075049_2792395910050985281_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHAYLkziHSVaNFAeWkb4Pkj7uwwVOKu23Lu7DBU4q7bckdy3Ty1KDir0vfOB6dsRcQF5YNkAsbfc_BidQi7j1Dl&_nc_ohc=x4qY9-8lvCgQ7kNvwGvXFJ0&_nc_oc=Adoq6xrrffsTlsVI1b5K9RRiQqaR6kJgJoaDammew3aJal4ZLq0pMJtJXMYvFxLNAtrnmJShq-Xm2l3dipIe7XGS&_nc_zt=23&_nc_ht=scontent.fhan5-10.fna&_nc_gid=99bftTJeN6gyOIpplpvp_w&_nc_ss=7b2a8&oh=00_Af3c6WuXfhPBHwiPkYWAxRPkO5OhbJnPMT4idWsTXQPubQ&oe=69F2C829", alt: "Văn nghệ chào mừng" },
    { src: "https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/615330459_1467848762009327_8831148506307061496_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHfNFqooxS4LJ_uuIAq3d_AsgtztkoJrXKyC3O2SgmtcuIYNBBS9lSldUPFMwC5N3F_5DILZOVhA99w6FZyVogY&_nc_ohc=dcWAFbDPUJwQ7kNvwHQ4Vlo&_nc_oc=AdqGhzA7xtUGPq3CLkGeGuUDC_ozVmHM83KDbs_Xs37dqR9iOnl2aOqyxOoIwaZxQsyPhclNyR7fzRWYGVP3VbeZ&_nc_zt=23&_nc_ht=scontent.fhan5-2.fna&_nc_gid=ZK-d8eiazBexY-0drG8Slg&_nc_ss=7b2a8&oh=00_Af0VJIzUExYX6WWwKhQf4vEDrMF4m8I6GmkvcJ10Pe6kCA&oe=69F2C39D", alt: "Lễ khai giảng rực rỡ" },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="relative">
            <div className="aspect-video rounded-[30px] overflow-hidden shadow-2xl border-4 border-school-blue/10">
              <img 
                src="https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/660860298_1533821625412040_7176024895442176284_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeF9t6LXKHnIkC2gozPc6Y3bcCK7-t0Pq8BwIrv63Q-rwHquSx3SYSGdMIuDByyRakWdp11QxIwSCgooX0drAc70&_nc_ohc=dKhhGBR9Uq8Q7kNvwFsz4Zt&_nc_oc=AdrAh35h-oRAL4RE8wdtqPbeQutn8qLwWuI4lw-t2gMTF2_TKGDba5TrR9xCTracjBJ6CHIMyd7c2EXPZw1Mg_4d&_nc_zt=23&_nc_ht=scontent.fhan5-8.fna&_nc_gid=0u1Kwu43KkHSK2PJ4F08hQ&_nc_ss=7b2a8&oh=00_Af3mGGLoQ1q2-EdcGXtJ9NABJ04AVby8kUA-CaKJa7XTIg&oe=69F2DA68" 
                alt="Chào mừng THPT Lý Thái Tổ" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-school-gold p-6 rounded-2xl shadow-xl text-white max-w-[220px]">
              <p className="text-3xl font-bold mb-1">Hải Phòng</p>
              <p className="font-medium text-xs opacity-90">1/271 Trần Nguyên Hãn, An Biên, Lê Chân</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">Chào mừng đến với thptlytaito271ai</h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Trường Trung học phổ thông Lý Thái Tổ tự hào là một trong những cơ sở giáo dục uy tín tại Hải Phòng. Với sứ mệnh bồi dưỡng nhân tài, trang bị kiến thức và kỹ năng đáp ứng yêu cầu của thế kỷ 21, chúng tôi chắp cánh ước mơ cho bao thế hệ học sinh.
            </p>
            <div className="space-y-4">
              {[
                "Phương thức tuyển sinh linh hoạt: Xét học bạ & Điểm thi khảo sát.",
                "Cơ sở vật chất hiện đại, môi trường học tập kỷ luật và nhân văn.",
                "Đội ngũ giáo viên tâm huyết, giàu kinh nghiệm.",
                "Tích hợp công nghệ AI và chuyển đổi số trong giảng dạy."
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ArrowRight size={14} />
                  </div>
                  <p className="text-slate-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 italic text-school-blue text-sm">
              "Tuyển sinh lớp 10 năm học 2026-2027 dành cho học sinh tốt nghiệp THCS có hạnh kiểm khá trở lên."
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-bold">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <AIChat />
        <UniversityScores />
        <ExamInfo />
        <HomeworkSolver />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
