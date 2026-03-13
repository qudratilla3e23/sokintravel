import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, Sun, Moon, ChevronDown, X, Plane,
  Chrome, Navigation, Palette,
  Settings, LogOut, Camera, Check, User as UserIcon, Mail, Lock, ArrowRight,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ darkMode, setDarkMode, lang, setLang }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authState, setAuthState] = useState('login'); 
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('blue');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [user, setUser] = useState(null);
  const [userNameInput, setUserNameInput] = useState(""); 
  const [userEmailInput, setUserEmailInput] = useState("");
  const [userPasswordInput, setUserPasswordInput] = useState("");
  const [editData, setEditData] = useState({name: "", email: "", photo: "" });
  const profileRef = useRef(null);

  const themes = [
    { id: 'blue', color: '#2563eb' },
    { id: 'emerald', color: '#10b981' },
    { id: 'rose', color: '#f43f5e' },
    { id: 'amber', color: '#f59e0b' },
    { id: 'violet', color: '#8b5cf6' },
    { id: 'orange', color: '#f97316' },
  ];

  const getThemeColor = () => themes.find(t => t.id === activeTheme)?.color || '#2563eb';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20);
      });
    }, 150);

    const savedUser = localStorage.getItem('travila_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setEditData(parsed);
    }
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: ${darkMode ? '#020617' : '#f8fafc'}; }
      ::-webkit-scrollbar-thumb { 
        background: ${getThemeColor()}; 
        border-radius: 10px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [activeTheme, darkMode]);

  const t = {
    UZ: { nav: ["Bosh sahifa", "Turlar", "Mehmonxona", "Aloqa"], signin: "Kirish", signup: "Ro'yxatdan o'tish", settings: "Sozlamalar", logout: "Chiqish", save: "Saqlash", editProfile: "Profilni tahrirlash", or: "YOKI", noAcc: "Hisobingiz yo'qmi?", haveAcc: "Hisobingiz bormi?" },
    RU: { nav: ["Главная", "Туры", "Отель", "Контакт"], signin: "Войти", signup: "Регистрация", settings: "Настройки", logout: "Выйти", save: "Сохранить", editProfile: "Профиль", or: "ИЛИ", noAcc: "Нет аккаунта?", haveAcc: "Есть аккаунт?" },
    EN: { nav: ["Home", "Tours", "Hotel", "Contact"], signin: "Sign In", signup: "Sign Up", settings: "Settings", logout: "Logout", save: "Save", editProfile: "Edit Profile", or: "OR", noAcc: "Don't have an account?", haveAcc: "Already have an account?" }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      name: userNameInput || (authState === 'login' ? "Traveler" : "User"),
      email: userEmailInput || "traveler@mail.com",
      photo: `https://ui-avatars.com/api/?name=${userNameInput || 'T'}&background=random&color=fff&bold=true`
    };
    setUser(newUser);
    setEditData(newUser);
    localStorage.setItem('travila_user', JSON.stringify(newUser));
    setIsAuthOpen(false);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            style={{ backgroundColor: getThemeColor() }}
            className="fixed bottom-6 right-6 p-4 rounded-2xl text-white shadow-2xl border-4 border-white dark:border-slate-900 active:scale-90 transition-transform md:hidden flex items-center justify-center"
          >
            <ArrowUp size={24} strokeWidth={3} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[10000] bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <Plane size={50} fill={getThemeColor()} className="text-white" />
            </motion.div>
            <div className="w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-6 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full" style={{ backgroundColor: getThemeColor() }} />
            </div>
            <span className="mt-4 font-black text-slate-900 dark:text-white tabular-nums">{progress}%</span>
          </motion.div>
        )}
      </AnimatePresence>


      <header className="fixed top-0 left-0 w-full z-[999]">
        
    <div className="relative bg-slate-900 dark:bg-black py-3 border-y border-white/5 overflow-hidden flex">
  <div className="absolute inset-y-0 left-0 w-24 z-10 from-slate-900 dark:from-black to-transparent pointer-events-none" />
  <div className="absolute inset-y-0 right-0 w-24 z-10 from-slate-900 dark:from-black to-transparent pointer-events-none" />

  <motion.div 
    animate={{ x: ["0%", "-50%"] }}
    transition={{ 
      repeat: Infinity, 
      duration: 25,
      ease: "linear" 
    }} 
    className="flex whitespace-nowrap"
  >
    <div className="flex items-center">
      <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/90 px-10">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getThemeColor() }} />
        🌍 Best Summer Deals 2026
      </span>
      <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/40 px-10">
        <span className="w-1.5 h-1.5 rotate-45 border border-white/20" />
        ✈️ Global Travel Access
      </span>
      <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/90 px-10">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getThemeColor() }} />
        🏔️ Adventure Awaits
      </span>
      <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/40 px-10">
        <span className="w-1.5 h-1.5 rotate-45 border border-white/20" />
        🏨 Luxury Hotels
      </span>
    </div>

    <div className="flex items-center border-l border-white/10">
      <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/90 px-10">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getThemeColor() }} />
        🌍 Best Summer Deals 2026
      </span>
      <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/40 px-10">
        <span className="w-1.5 h-1.5 rotate-45 border border-white/20" />
        ✈️ Global Travel Access
      </span>
      <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/90 px-10">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getThemeColor() }} />
        🏔️ Adventure Awaits
      </span>
      <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white/40 px-10">
        <span className="w-1.5 h-1.5 rotate-45 border border-white/20" />
        🏨 Luxury Hotels
      </span>
    </div>
  </motion.div>
</div>

        <div className={`transition-all duration-500 border-b backdrop-blur-xl ${darkMode ? 'bg-slate-950/70 border-slate-800 text-white' : 'bg-white/80 border-slate-200 text-slate-900 shadow-sm'}`}>
          <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
            
            <div onClick={scrollToTop} className="flex items-center gap-2 font-black text-xl md:text-2xl tracking-tighter cursor-pointer group">
              <div style={{ backgroundColor: getThemeColor() }} className="p-2 rounded-xl text-white transition-transform group-hover:rotate-12"><Navigation size={20} fill="white"/></div>
              <span className="hidden sm:block">sokintravel</span>
            </div>
<nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase opacity-70">
  {t[lang].nav.map((item, index) => {
    const paths = ["/", "/tours", "/hotel", "/contact"]; // Sahifa manzillari
    return (
      <Link 
        key={item} 
        to={paths[index]} 
        className="hover:opacity-100 transition-all hover:translate-y-[-2px]"
        style={{ color: activeTheme === item ? getThemeColor() : 'inherit' }}
      >
        {item}
      </Link>
    );
  })}
</nav>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative">
                <button onClick={() => setIsLangOpen(!isLangOpen)} className={`cursor-pointer px-2 py-1.5 md:px-3 md:py-2 rounded-xl border flex items-center gap-2 text-[10px] md:text-xs font-black ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                    <Globe size={14} style={{ color: getThemeColor() }} /> {lang}
                </button>
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute right-0 mt-2 w-24 rounded-2xl border shadow-2xl overflow-hidden z-[100] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                      {['UZ', 'RU', 'EN'].map(l => (
                        <button key={l} onClick={() => {setLang(l); setIsLangOpen(false);}} className={`w-full px-4 py-2 text-left text-xs font-bold cursor-pointer ${darkMode ? 'text-white' : 'text-slate-900'}`}>{l}</button>
                      ))}
                    </motion.div>
                  )} 
                </AnimatePresence>
              </div>

              <button onClick={() => setDarkMode(!darkMode)} className={`cursor-pointer p-2 md:p-2.5 rounded-xl ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {user ? (
                <div className="relative">
                  <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="p-0.5 rounded-xl border-2 transition-transform active:scale-90" style={{ borderColor: getThemeColor() }}>
                    <img src={user.photo} className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover" alt="Profile" />
                  </button>
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`absolute right-0 mt-3 w-64 rounded-[28px] border shadow-2xl p-2 z-[100] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                        <div className="p-4 text-center">
                          <img src={user.photo} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 shadow-lg" style={{ borderColor: getThemeColor() }} />
                          <p className={`font-black truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>{user.name}</p>
                        </div>
                        <button onClick={() => {setIsSettingsOpen(true); setIsProfileMenuOpen(false);}} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl ${darkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-50 text-slate-900'}`}>
                          <Settings size={18} /> {t[lang].settings}
                        </button>
                        <button onClick={() => {setUser(null); localStorage.removeItem('travila_user');}} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 rounded-2xl hover:bg-red-50">
                          <LogOut size={18} /> {t[lang].logout}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button onClick={() => {setAuthState('login'); setIsAuthOpen(true);}} style={{ backgroundColor: getThemeColor() }} className="cursor-pointer px-4 py-2 md:px-6 md:py-2.5 rounded-xl font-black text-xs md:text-sm text-white shadow-lg active:scale-95 transition-all">
                  {t[lang].signin}
                </button>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isSettingsOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSettingsOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`relative w-full max-w-xl p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-3xl overflow-y-auto max-h-[90vh] ${darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900'}`}>
                <button onClick={() => setIsSettingsOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><X size={20}/></button>
                <h2 className="text-2xl font-black mb-8">{t[lang].editProfile}</h2>
                
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group">
                    <img src={editData.photo} className="w-24 h-24 rounded-[30px] object-cover border-4" style={{ borderColor: getThemeColor() }} />
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[30px] opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
                      <Camera className="text-white" />
                      <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                   <input 
                     type="text" 
                     value={editData.name} 
                     onChange={(e) => setEditData({...editData, name: e.target.value})} 
                     className={`w-full p-4 rounded-2xl font-bold border-2 outline-none focus:border-blue-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-100 text-slate-900 placeholder-slate-400'}`} 
                   />
                   <div className="p-6 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                     <p className="text-xs font-black uppercase opacity-40 mb-4 flex items-center gap-2"><Palette size={14}/> Mavzu rangi</p>
                     <div className="flex flex-wrap gap-3">
                       {themes.map(th => (
                         <button key={th.id} onClick={() => setActiveTheme(th.id)} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: th.color }}>
                           {activeTheme === th.id && <Check size={18} className="text-white" />}
                         </button>
                       ))}
                     </div>
                   </div>
                   <button onClick={() => {setUser(editData); localStorage.setItem('travila_user', JSON.stringify(editData)); setIsSettingsOpen(false);}} style={{ backgroundColor: getThemeColor() }} className="w-full py-4 rounded-2xl text-white font-black shadow-xl active:scale-95 transition-all">
                     {t[lang].save}
                   </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAuthOpen && (
            <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-0 md:p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAuthOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
              <motion.div layout initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`relative w-full md:max-w-md p-8 rounded-t-[32px] md:rounded-[40px] shadow-2xl ${darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900'}`}>
                
                <div className="text-center mb-6">
                   <div style={{ backgroundColor: getThemeColor() }} className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                      <Navigation size={24} fill="white" />
                   </div>
                   <h2 className="text-2xl font-black tracking-tight">{authState === 'login' ? t[lang].signin : t[lang].signup}</h2>
                </div>

                <button className={`w-full flex items-center justify-center gap-3 py-4 border-2 rounded-2xl font-black mb-4 transition-colors ${darkMode ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-100 hover:bg-slate-50'}`}>
                  <Chrome size={20} className="text-red-500" /> Google
                </button>

                <div className="flex items-center gap-4 mb-4 opacity-20"><div className="flex-1 h-px bg-current"/> <span className="text-xs font-bold">{t[lang].or}</span> <div className="flex-1 h-px bg-current"/></div>
                
                <form onSubmit={handleLogin} className="space-y-3">
                  {authState === 'register' && (
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                      <input type="text" placeholder="Full Name" onChange={(e) => setUserNameInput(e.target.value)} className={`w-full p-4 pl-12 rounded-2xl font-bold outline-none border-2 transition-all focus:border-blue-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-transparent text-slate-900'}`} required />
                    </div>
                  )}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                    <input type="email" placeholder="Email" onChange={(e) => setUserEmailInput(e.target.value)} className={`w-full p-4 pl-12 rounded-2xl font-bold outline-none border-2 transition-all focus:border-blue-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-transparent text-slate-900'}`} required />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                    <input type="password" placeholder="Password" onChange={(e) => setUserPasswordInput(e.target.value)} className={`w-full p-4 pl-12 rounded-2xl font-bold outline-none border-2 transition-all focus:border-blue-500 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-transparent text-slate-900'}`} required />
                  </div>
                  <button type="submit" style={{ backgroundColor: getThemeColor() }} className="w-full py-4 rounded-2xl text-white font-black shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all">
                    {authState === 'login' ? t[lang].signin : t[lang].signup} <ArrowRight size={18} />
                  </button>
                </form>

                <div className="mt-6 text-center">
                   <p className="text-sm font-bold opacity-60">
                     {authState === 'login' ? t[lang].noAcc : t[lang].haveAcc}
                     <button onClick={() => setAuthState(authState === 'login' ? 'register' : 'login')} className="ml-2 underline transition-colors" style={{ color: getThemeColor() }}>
                        {authState === 'login' ? t[lang].signup : t[lang].signin}``
                     </button>
                   </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;