import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Calendar, Users, ArrowRight, 
  Heart, Star, Clock, ChevronDown, Loader2, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Home = ({ lang, darkMode }) => {
  const { i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // --- STATE-LAR ---
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (lang) {
      localStorage.setItem('selectedLanguage', lang);
      i18n.changeLanguage(lang.toLowerCase());
    }
  }, [lang, i18n]);

  const allAvailableTours = [
    { id: 101, loc: "tashkent", title: { UZ: "Toshkent City Tur", RU: "Тур по Ташкенту", EN: "Tashkent City Tour" }, price: "25", img: "https://images.unsplash.com/photo-1528518290605-1fcc8dcca204?w=400" },
    { id: 102, loc: "dubai", title: { UZ: "Dubay Safari", RU: "Сафари в Дубае", EN: "Dubai Desert Safari" }, price: "85", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400" },
    { id: 103, loc: "tashkent", title: { UZ: "Eski Shahar bo'ylab", RU: "По Старому Городу", EN: "Old City Walking Tour" }, price: "15", img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400" }
  ];

  const handleSearchClick = () => {
    setIsSearchLoading(true);
    
    setTimeout(() => {
      const filtered = allAvailableTours.filter(tour => tour.loc === searchLocation);
      setSearchResults(filtered);
      
      setIsSearchLoading(false);
      setShowSearchModal(true);
    }, 1500);
  };

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000",
      tag: { UZ: "Dunyoni kashf eting", RU: "Открой мир", EN: "Discovery the World" },
      title: { 
        UZ: "Sayohat ishtiyoqingizni uyg'oting", 
        RU: "Дайте волю своей жажде странствий", 
        EN: "Unleash Your Wanderlust" 
      },
      desc: {
        UZ: "Ajoyib sayohatlar: Sizning global qochish rejangiz.",
        RU: "Исключительные путешествия: Ваш план побега.",
        EN: "Crafting Exceptional Journeys: Your Global Escape Planner."
      }
    }
  ];

  const tourCards = [
    {
      id: 1,
      tag: "Top Rated",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600",
      title: { UZ: "California Sunset Boat Cruise", RU: "Круиз на лодке в Калифорнии", EN: "California Sunset Boat Cruise" },
      rating: "4.96 (672 reviews)",
      duration: "2 days 3 nights",
      guests: "4-6 guest",
      price: "48.25"
    },
    {
      id: 2,
      tag: "Best Sale",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600",
      title: { UZ: "NYC: Food Tastings Tour", RU: "Нью-Йорк: Гастротур", EN: "NYC: Food Tastings and Culture Tour" },
      rating: "4.96 (672 reviews)",
      duration: "3 days 3 nights",
      guests: "4-6 guest",
      price: "17.32"
    },
    {
      id: 3,
      tag: "25% Off",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600",
      title: { UZ: "Grand Canyon Horseshoe Bend", RU: "Гранд-Каньон: Подкова", EN: "Grand Canyon Horseshoe Bend 2 days" },
      rating: "4.96 (672 reviews)",
      duration: "7 days 6 nights",
      guests: "4-6 guest",
      price: "15.63"
    }
  ];

  const categories = [
    { name: { UZ: "Tog'lar", RU: "Горы", EN: "Mountain" }, count: "356 Tours", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" },
    { name: { UZ: "Safari", RU: "Сафари", EN: "Safari" }, count: "356 Tours", img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400" },
    { name: { UZ: "Sahro", RU: "Пустыня", EN: "Desert" }, count: "356 Tours", img: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=400" },
    { name: { UZ: "Gullar", RU: "Цветы", EN: "Flower" }, count: "356 Tours", img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400" },
  ];

  const t = {
    tabs: {
      UZ: ["Turlar", "Mehmonxonalar", "Chiptalar", "Ijara", "Faoliyatlar"],
      RU: ["Туры", "Отели", "Билеты", "Аренда", "Активности"],
      EN: ["Tours", "Hotels", "Tickets", "Rental", "Activities"]
    },
    sections: {
      featured: { UZ: "Saralangan turlar", RU: "Популярные туры", EN: "Our Featured Tours" },
      categories: { UZ: "Top toifalar", RU: "Топ категории", EN: "Top Categories of Tours" },
      viewMore: { UZ: "Barchasi", RU: "Показать все", EN: "View More" }
    }
  };

  return (
    <div className={`w-full transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      
      <main className="relative min-h-[85vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-0">
            <div className={`absolute inset-0 z-10 ${darkMode ? 'bg-black/50' : 'bg-black/30'}`} />
            <img src={slides[currentSlide].image} alt="Hero" className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 container mx-auto px-4 pt-16 md:pt-20 pb-32">
          <div className="max-w-3xl">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block bg-yellow-400 text-black px-4 py-1.5 rounded-full text-xs md:sm font-black mb-6">
              {slides[currentSlide].tag[lang]}
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6 drop-shadow-lg">
              {slides[currentSlide].title[lang]}
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-10 max-w-xl leading-relaxed font-medium">
              {slides[currentSlide].desc[lang]}
            </p>
          </div>

          <div className="mt-8 md:mt-16 max-w-5xl mx-auto">
            <div className={`rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-100'}`}>
              <div className={`flex items-center gap-4 md:gap-8 px-4 md:px-8 py-4 border-b overflow-x-auto no-scrollbar ${darkMode ? 'border-slate-800' : 'border-slate-50'}`}>
                {t.tabs[lang].map((tab, idx) => (
                  <button key={tab} className={`text-xs md:sm font-black transition-all whitespace-nowrap ${idx === 0 ? (darkMode ? 'bg-yellow-400 text-black' : 'bg-black text-white') + ' px-5 py-2 rounded-full' : 'text-slate-400 hover:text-slate-500'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 items-center">
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
                  
                  <div className="flex flex-col border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pb-3 md:pb-0 px-2 group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">Location</label>
                    <div className="flex items-center gap-2 relative">
                      <MapPin size={18} className="text-blue-500 shrink-0" />
                      <select 
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        className={`bg-transparent outline-none w-full cursor-pointer text-sm font-bold appearance-none pr-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}
                      >
                        <option value="">Qayerga borasiz?</option>
                        <option value="tashkent">Tashkent, UZ</option>
                        <option value="dubai">Dubai, UAE</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-0 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pb-3 md:pb-0 px-2 group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">Check In</label>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-blue-500 shrink-0" />
                      <input type="date" className={`bg-transparent outline-none w-full cursor-pointer text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`} />
                    </div>
                  </div>

                  <div className="flex flex-col px-2 group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-blue-500 transition-colors">Guests</label>
                    <div className="flex items-center gap-2 relative">
                      <Users size={18} className="text-blue-500 shrink-0" />
                      <select className={`bg-transparent outline-none w-full cursor-pointer text-sm font-bold appearance-none pr-8 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        <option value="2">2 Adults</option>
                        <option value="4">4 Adults</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-0 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleSearchClick}
                  disabled={isSearchLoading || !searchLocation}
                  className={`h-14 md:h-16 rounded-2xl flex items-center justify-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all w-full cursor-pointer ${
                    darkMode ? 'bg-yellow-400 text-black shadow-yellow-400/10' : 'bg-blue-600 text-white shadow-blue-600/20'
                  } ${isSearchLoading ? 'opacity-70 cursor-wait' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSearchLoading ? (
                    <Loader2 size={24} className="animate-spin" />
                  ) : (
                    <Search size={24} strokeWidth={3} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSearchModal(false)} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`relative w-full max-w-2xl p-8 rounded-[35px] shadow-3xl overflow-hidden ${darkMode ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900'}`}>
              <button onClick={() => setShowSearchModal(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-500/10 transition-colors z-10"><X size={24} /></button>
              
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black">Natijalar ({searchResults.length})</h2>
                <p className="mt-2 opacity-60">Tanlangan joy: <span className="text-blue-500 font-bold uppercase">{searchLocation}</span></p>
              </div>

              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map(result => (
                    <div key={result.id} className={`p-4 rounded-2xl border flex items-center gap-4 transition-all hover:border-blue-500/50 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                      <img src={result.img} alt="" className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="font-black text-lg">{result.title[lang]}</h4>
                        <p className="text-blue-500 font-bold">${result.price} / person</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">Ko'rish</button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 opacity-50 font-bold">Hozircha bu joy uchun turlar mavjud emas.</div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <section className="py-16 md:py-24 container mx-auto px-4">
         <h2 className={`text-3xl md:text-4xl font-black mb-10 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t.sections.featured[lang]}</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourCards.map((tour) => (
            <div key={tour.id} className={`rounded-3xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
               <img src={tour.image} className="w-full h-64 object-cover" alt={tour.title[lang]} />
               <div className="p-6">
                  <h3 className="text-xl font-black mb-4">{tour.title[lang]}</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black">${tour.price}</div>
                    <button className="cursor-pointer px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black">Book Now</button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 md:py-24 container mx-auto px-4">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourCards.map((tour) => (
            <div key={tour.id} className={`rounded-3xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl'}`}>
               <img src={tour.image} className="w-full h-64 object-cover" alt={tour.title[lang]} />
               <div className="p-6">
                  <h3 className="text-xl font-black mb-4">{tour.title[lang]}</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black">${tour.price}</div>
                    <button className="cursor-pointer px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black">Book Now</button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;