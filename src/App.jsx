import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Komponentlarni import qilish
import Header from './components/Header';
import Home from './components/Home'; // Biz boyitgan barcha bo'limlar Home ichida bo'lishi kerak
import TravelFooter from './components/Footer'; // Yangi Footer komponentingiz
import ContactSection from './page/Aloqa';
import HotelPage from './page/Hotel';

// Turlar sahifasi uchun vaqtinchalik komponent (Buni alohida faylga chiqarishingiz mumkin)
const ToursPage = ({ lang }) => (
  <div className="pt-32 text-center min-h-screen">
    <h1 className="text-4xl font-black italic">
      {lang === 'UZ' ? 'Turlar sahifasi' : lang === 'RU' ? 'Страница туров' : 'Tours Page'}
    </h1>
    <p className="mt-4 text-slate-500 italic">Yaqinda yangi eksklyuziv turlar qo'shiladi...</p>
  </div>
);

function App() {
  // LocalStorage dan sozlamalarni yuklash
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true'
  );
  
  const [lang, setLang] = useState(() => 
    (localStorage.getItem('i18nextLng') || 'UZ').toUpperCase()
  );

  // DarkMode o'zgarganda HTML klassini yangilash
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Til o'zgarganda saqlab qo'yish
  useEffect(() => {
    localStorage.setItem('i18nextLng', lang);
  }, [lang]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
      }`}>
        
        {/* Navigatsiya paneli - barcha sahifalar uchun umumiy */}
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          lang={lang} 
          setLang={setLang} 
        />
        
        {/* Sahifalar kontenti - asosiy qism kengayishi uchun flex-grow qo'shildi */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} darkMode={darkMode} />} />
            <Route path="/tours" element={<ToursPage lang={lang} />} />
            <Route path="/hotel" element={<HotelPage lang={lang} darkMode={darkMode} />} />        
            <Route path="/contact" element={<ContactSection lang={lang} darkMode={darkMode} />} />
          </Routes>
        </main>

        {/* Footer - barcha sahifalar uchun umumiy bo'lishi kerak */}
        <TravelFooter lang={lang} darkMode={darkMode} />
        
      </div>
    </Router>
  );
}

export default App;