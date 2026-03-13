import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ContactSection from './page/Aloqa';
import HotelPage from './page/Hotel';
const ToursPage = () => <div className="pt-32 text-center h-screen"><h1>Turlar sahifasi</h1></div>;

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [lang, setLang] = useState(() => (localStorage.getItem('i18nextLng') || 'UZ').toUpperCase());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} />
        
        <Routes>
          <Route path="/" element={<Home lang={lang} darkMode={darkMode} />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/hotel" element={<HotelPage lang={lang} darkMode={darkMode} />} />        
          <Route path="/contact" element={<ContactSection lang={lang} darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;