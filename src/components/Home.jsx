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
      tag: { UZ: "Eng yuqori reyting", RU: "Топ рейтинг", EN: "Top Rated" },
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600",
      title: { UZ: "Kaliforniya quyosh botishi kruizi", RU: "Круиз на закате в Калифорнии", EN: "California Sunset Boat Cruise" },
      rating: "4.96 (672 reviews)",
      duration: { UZ: "2 kun 3 kecha", RU: "2 дня 3 ночи", EN: "2 days 3 nights" },
      guests: { UZ: "4-6 mehmon", RU: "4-6 гостей", EN: "4-6 guests" },
      price: "48.25"
    },
    {
      id: 2,
      tag: { UZ: "Eng ko'p sotilgan", RU: "Хит продаж", EN: "Best Sale" },
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600",
      title: { UZ: "Nyu-York: Gastronomik tur", RU: "Нью-Йорк: Гастротур", EN: "NYC: Food Tastings and Culture Tour" },
      rating: "4.96 (672 reviews)",
      duration: { UZ: "3 kun 3 kecha", RU: "3 дня 3 ночи", EN: "3 days 3 nights" },
      guests: { UZ: "4-6 mehmon", RU: "4-6 гостей", EN: "4-6 guests" },
      price: "17.32"
    },
    {
      id: 3,
      tag: { UZ: "25% Chegirma", RU: "Скидка 25%", EN: "25% Off" },
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600",
      title: { UZ: "Grand Canyon: 2 kunlik sayohat", RU: "Гранд-Каньон: 2-дневный тур", EN: "Grand Canyon Horseshoe Bend 2 days" },
      rating: "4.96 (672 reviews)",
      duration: { UZ: "7 kun 6 kecha", RU: "7 дней 6 ночей", EN: "7 days 6 nights" },
      guests: { UZ: "4-6 mehmon", RU: "4-6 гостей", EN: "4-6 guests" },
      price: "15.63"
    }
  ];

  const uiLabels = {
    bookNow: { UZ: "Band qilish", RU: "Забронировать", EN: "Book Now" },
    reviews: { UZ: "sharhlar", RU: "отзывов", EN: "reviews" }
  };
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
                  className={`h-14 md:h-16 rounded-2xl flex items-center justify-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all w-full cursor-pointer ${darkMode ? 'bg-yellow-400 text-black shadow-yellow-400/10' : 'bg-blue-600 text-white shadow-blue-600/20'
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
                  <button
                    onClick={() => handleTourBooking(tour)}
                    className="cursor-pointer px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black transition-all hover:bg-blue-600 active:scale-95"
                  >
                    {uiLabels.bookNow[lang] || uiLabels.bookNow.UZ}
                  </button>
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
                  <button
                    onClick={() => handleTourBooking(tour)}
                    className="cursor-pointer px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black transition-all hover:bg-blue-600 active:scale-95"
                  >
                    {uiLabels.bookNow[lang] || uiLabels.bookNow.UZ}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            {lang === 'UZ' ? 'Sayohatni rejalashtirish oson' : lang === 'RU' ? 'Планировать легко' : 'Easy to Plan Your Trip'}
          </h2>
          <p className="text-slate-500 font-medium">
            {lang === 'UZ' ? 'Atigi 3 ta qadamda orzuingizdagi sayohatga chiqing' : lang === 'RU' ? 'Всего 3 шага до путешествия вашей мечты' : 'Get to your dream trip in just 3 easy steps'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-blue-200 -z-10" />
          
          {[
            { 
              step: "01", 
              title: { UZ: "Manzilni tanlang", RU: "Выберите место", EN: "Choose Destination" },
              desc: { UZ: "Dunyo bo'ylab 200 dan ortiq manzillar.", RU: "Более 200 мест по всему миру.", EN: "Over 200+ destinations worldwide." },
              icon: "🌍" 
            },
            { 
              step: "02", 
              title: { UZ: "Chiptani band qiling", RU: "Забронируйте билет", EN: "Book a Ticket" },
              desc: { UZ: "Sizga mos keladigan qulay vaqtni tanlang.", RU: "Выберите удобное для вас время.", EN: "Select the time that fits you best." },
              icon: "🎫" 
            },
            { 
              step: "03", 
              title: { UZ: "Sayohatdan zavqlaning", RU: "Наслаждайтесь", EN: "Enjoy Your Trip" },
              desc: { UZ: "Xavfsiz va unutilmas xotiralarga ega bo'ling.", RU: "Получите незабываемые впечатления.", EN: "Safe and unforgettable memories." },
              icon: "✈️" 
            }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 bg-blue-600 rounded-[30px] flex items-center justify-center text-3xl mx-auto mb-6 shadow-xl shadow-blue-200 group-hover:rotate-12 transition-transform">
                {item.icon}
              </div>
              <span className="text-blue-600 font-black text-sm tracking-widest">{item.step}</span>
              <h3 className="text-xl font-black mt-2 mb-3">{item.title[lang]}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`py-24 ${darkMode ? 'bg-slate-900/40' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3">
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                {lang === 'UZ' ? 'Mijozlarimiz biz haqimizda' : lang === 'RU' ? 'Отзывы наших клиентов' : 'What Our Clients Say'}
              </h2>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="#facc15" className="text-yellow-400" />)}
              </div>
              <p className="text-slate-500 font-medium">
                {lang === 'UZ' ? '10,000 dan ortiq mamnun sayohatchilar.' : lang === 'RU' ? 'Более 10,000 довольных путешественников.' : 'More than 10,000+ happy travelers.'}
              </p>
            </div>

            <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  name: "Aziza Karimova", 
                  job: "Photographer", 
                  text: "Eng ajoyib sayohatim! Hammasi yuqori darajada tashkil qilingan.",
                  img: "https://i.pravatar.cc/150?u=1" 
                },
                { 
                  name: "John Doe", 
                  job: "Traveler", 
                  text: "Amazing service and very professional staff. Highly recommended!",
                  img: "https://i.pravatar.cc/150?u=2" 
                }
              ].map((rev, i) => (
                <motion.div 
                  whileHover={{ y: -5 }}
                  key={i} 
                  className={`p-8 rounded-[40px] shadow-sm border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
                >
                  <p className="italic mb-6 opacity-80">"{rev.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={rev.img} alt={rev.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-black text-sm">{rev.name}</h4>
                      <p className="text-xs opacity-50">{rev.job}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              {lang === 'UZ' ? 'Sayohat sirlari bilan tanishing' : lang === 'RU' ? 'Секреты путешествий' : 'Travel Insights'}
            </h2>
            <p className="text-slate-500 font-medium">
              {lang === 'UZ' ? 'Dunyoni kashf qilish uchun foydali maslahatlar va hikoyalar.' : 'Expert tips for your next big adventure.'}
            </p>
          </div>
          <button className="px-8 py-4 bg-slate-100 dark:bg-slate-900 rounded-2xl font-black text-sm hover:bg-blue-600 hover:text-white transition-all">
            {t.sections.viewMore[lang]}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              date: "Mar 15, 2026",
              title: { UZ: "Bali orolida arzon dam olish sirlari", RU: "Секреты дешевого отдыха на Бали", EN: "Bali Budget Travel Guide" },
              img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
              tag: "Tips"
            },
            {
              date: "Mar 10, 2026",
              title: { UZ: "Yevropa bo'ylab poyezdda sayohat", RU: "Путешествие по Европе на поезде", EN: "Europe by Train" },
              img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600",
              tag: "Guide"
            },
            {
              date: "Mar 05, 2026",
              title: { UZ: "Sayohat uchun eng yaxshi 10 ta ilova", RU: "10 лучших приложений для поездок", EN: "Top 10 Travel Apps" },
              img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600",
              tag: "Apps"
            }
          ].map((post, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 rounded-[40px] overflow-hidden mb-6 shadow-xl">
                <img src={post.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-black uppercase">
                  {post.tag}
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-2 text-blue-500 text-xs font-black mb-3">
                  <Calendar size={14} /> {post.date}
                </div>
                <h4 className="text-xl font-black leading-snug group-hover:text-blue-600 transition-colors">
                  {post.title[lang]}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={`py-16 border-t border-b ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-10">
            {lang === 'UZ' ? "Ishonchli hamkorlarimiz" : lang === 'RU' ? "Нам доверяют" : "Trusted by the Best"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {['AIRWAYS', 'HOTELS.COM', 'BOOKING', 'EXPEDIA', 'TURKISH AIR'].map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-black tracking-tighter italic">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4">
        <div className={`rounded-[60px] p-10 md:p-20 text-center ${darkMode ? 'bg-slate-900 border border-slate-800' : 'bg-slate-50'}`}>
           <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
             {lang === 'UZ' ? "Sizni qanday sayohat kutmoqda?" : "Ready for your next adventure?"}
           </h2>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-12 py-5 bg-blue-600 text-white rounded-3xl font-black text-lg shadow-2xl shadow-blue-600/30 hover:bg-blue-700 transition-all">
                {lang === 'UZ' ? "Biz bilan bog'lanish" : "Contact Us"}
              </button>
              <button className="px-12 py-5 bg-white text-slate-900 border border-slate-200 rounded-3xl font-black text-lg hover:bg-slate-100 transition-all">
                {lang === 'UZ' ? "Savollar (FAQ)" : "FAQ"}
              </button>
           </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4">
        <div className="bg-slate-900 rounded-[60px] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Star size={200} className="animate-spin-slow" />
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span className="text-yellow-400 font-black tracking-widest text-xs uppercase mb-4 block">
                {lang === 'UZ' ? "Vaqtni to'g'ri tanlang" : "Perfect Timing"}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                {lang === 'UZ' ? "Har faslning o'z sehri bor" : "Magic in Every Season"}
              </h2>
              
              <div className="space-y-6">
                {[
                  { s: "Bahor", t: "Yaponiya - Sakura gullashi", icon: "🌸" },
                  { s: "Yoz", t: "Maldiv orollari - Moviy suvlar", icon: "🏝️" },
                  { s: "Kuz", t: "Kanada - Alvon barglar", icon: "🍁" },
                  { s: "Qish", t: "Shveytsariya - Chang'i mavsumi", icon: "❄️" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="text-3xl bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-black text-lg">{item.s}</h4>
                      <p className="text-white/50 text-sm">{item.t}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
               <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400" className="rounded-[30px] h-64 w-full object-cover mt-12" alt="" />
                  <img src="https://i.pinimg.com/736x/78/cc/38/78cc38c085030f3df93be4696c7c8a60.jpg" className="rounded-[30px] h-64 w-full object-cover" alt="" />
               </div>
               {/* Floating Badge */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 p-6 rounded-full shadow-2xl rotate-12">
                  <p className="text-black font-black text-center leading-none italic">
                    TOP<br/><span className="text-3xl">2026</span>
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
           <h2 className="text-3xl md:text-5xl font-black italic">#TravelMoments</h2>
           <div className="flex gap-2">
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-100"><ArrowRight className="rotate-180" /></div>
              <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-100"><ArrowRight /></div>
           </div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8">
           {[
             { title: "Bali Surf", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400" },
             { title: "Swiss Alps", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400" },
             { title: "Dubai Night", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400" },
             { title: "Tashkent City", img: "https://images.unsplash.com/photo-1528518290605-1fcc8dcca204?w=400" },
             { title: "Paris Love", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400" },
           ].map((story, i) => (
             <div key={i} className="min-w-[330px] h-[350px] relative rounded-[35px] overflow-hidden group cursor-pointer shadow-lg">
                <img src={story.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                <div className="absolute inset-0  from-black/70 to-transparent p-6 flex flex-col justify-end">
                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2">
                      <Clock size={16} className="text-white" />
                   </div>
                   <h4 className="text-white font-black text-sm">{story.title}</h4>
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="py-24 container mx-auto px-4">
        <div className={`p-8 md:p-16 rounded-[60px] flex flex-col md:flex-row items-center justify-between gap-10 border-4 border-dashed ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
           <div className="md:w-2/3">
              <h2 className="text-4xl font-black mb-4">
                {lang === 'UZ' ? "VIP Klubga a'zo bo'ling" : "Join our VIP Club"}
              </h2>
              <p className="text-lg opacity-60">
                {lang === 'UZ' ? "Eksklyuziv chegirmalar, bepul viza yordami va shaxsiy sayohat menejeriga ega bo'ling." : "Get exclusive discounts and personal support."}
              </p>
           </div>
           <button className="whitespace-nowrap px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-3xl font-black hover:scale-105 transition-all">
              {lang === 'UZ' ? "A'zo bo'lish" : "Join Now"}
           </button>
        </div>
      </section>
      
      {/* --- 1. LOKATSIYA BO'LIMI (MAP SECTION) --- */}
<section className="mt-20 container mx-auto px-4">
  <div className="text-center mb-10">
    <h2 className="text-3xl md:text-5xl font-black mb-4">
      {lang === 'UZ' ? 'Bizning manzil' : lang === 'RU' ? 'Наш адрес' : 'Our Location'}
    </h2>
    <p className="text-blue-600 font-bold tracking-widest uppercase text-sm">
      {lang === 'UZ' ? 'Sokin Travel ofisiga tashrif buyuring' : lang === 'RU' ? 'Посетите офис Sokin Travel' : 'Visit Sokin Travel Office'}
    </p>
  </div>

  <div className={`w-full h-[450px] rounded-[50px] overflow-hidden shadow-2xl border-4 ${darkMode ? 'border-slate-800' : 'border-white'} relative`}>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.743154868958!2d69.2818956765793!3d41.35790479782531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ca0f90e8721%3A0xc6657c6b5b530263!2sSokin%20Travel!5e0!3m2!1sUZ!2suz!4v1715694321000!5m2!1sUZ!2suz"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Sokin Travel Location"
      className={`w-full h-full ${darkMode ? 'grayscale invert opacity-80' : ''}`}
    ></iframe>
  </div>
</section>

      
    </div>
  );
};

export default Home;