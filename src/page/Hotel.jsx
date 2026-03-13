import React, { useState } from 'react';
import { Star, MapPin, Search, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const HotelPage = ({ darkMode, lang }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingId, setBookingId] = useState(null); 
  const [isSuccess, setIsSuccess] = useState(false);

  const TG_TOKEN = "8711537350:AAFMUeimibbIPn8bQbbebVo-jIcfHeZo3fI"; 
  const CH_ID = "55667788";

  const t = {
    UZ: { title: "Mehmonxonalar", price: "dan", night: "/kecha", book: "Band qilish", search: "Qidirish (Nomi yoki shahar)...", success: "Buyurtma botga yuborildi!" },
    RU: { title: "Отели", price: "от", night: "/ночь", book: "Забронировать", search: "Поиск (Название или город)...", success: "Заказ отправлен в бот!" },
    EN: { title: "Hotels", price: "from", night: "/night", book: "Book Now", search: "Search (Name or city)...", success: "Booking sent to bot!" }
  };

  const hotels = [
    { id: 1, name: "Hyatt Regency Tashkent", city: "Toshkent", price: "2,400,000", rating: 5, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" },
    { id: 2, name: "Hilton City Centre", city: "Toshkent", price: "1,850,000", rating: 4.8, image: "https://images.unsplash.com/photo-1551882547-ff43c63efe8c?auto=format&fit=crop&q=80&w=800" },
    { id: 3, name: "Savitsky Plaza", city: "Samarqand", price: "1,200,000", rating: 4.5, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800" },
    { id: 4, name: "Arch Hotel", city: "Buxoro", price: "850,000", rating: 4.7, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800" },
    { id: 5, name: "Dilimah Premium", city: "Samarqand", price: "1,100,000", rating: 4.6, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800" },
    { id: 6, name: "Wyndham Tashkent", city: "Toshkent", price: "1,400,000", rating: 4.4, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" }
  ];

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hotel.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBook = async (hotel) => {
    setBookingId(hotel.id);
    
    // Telegramga boradigan chiroyli xabar formati
    const msg = `⚡️ *YANGI BUYURTMA* ⚡️\n\n` +
                `🏢 *Mehmonxona:* ${hotel.name}\n` +
                `📍 *Shahar:* ${hotel.city}\n` +
                `💰 *Narxi:* ${hotel.price} UZS\n` +
                `🌐 *Til:* ${lang}\n` +
                `🕒 *Vaqt:* ${new Date().toLocaleString()}`;
    
    try {
      await axios.post(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        chat_id: CH_ID,
        text: msg,
        parse_mode: "Markdown"
      });
      
      setBookingId(null);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (error) {
      console.error("Xatolik:", error);
      alert("Xatolik! Botga ulanib bo'lmadi. Chat ID to'g'riligini tekshiring.");
      setBookingId(null);
    }
  };

  return (
    <div className={`pt-24 pb-20 min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-[#f8fafc]'}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Sarlavha va Qidiruv */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-black mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{t[lang].title}</h1>
          <div className={`max-w-xl mx-auto flex items-center p-2 rounded-3xl border transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg'}`}>
            <Search className="ml-4 text-blue-500" size={20} />
            <input 
              type="text" 
              placeholder={t[lang].search}
              className={`w-full p-4 bg-transparent outline-none font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Muvaffaqiyat xabari */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div initial={{ y: -100, x: '-50%' }} animate={{ y: 20, x: '-50%' }} exit={{ y: -100, x: '-50%' }} className="fixed top-20 left-1/2 z-50 bg-emerald-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold">
              <CheckCircle size={24} /> {t[lang].success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mehmonxonalar ro'yxati */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((hotel) => (
            <motion.div layout key={hotel.id} className={`rounded-[35px] overflow-hidden border transition-all duration-300 ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm hover:shadow-xl'}`}>
              <div className="relative h-64 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform hover:scale-105" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl flex items-center gap-1">
                  <Star size={14} fill="#f59e0b" className="text-amber-500" />
                  <span className="text-xs font-black text-slate-900">{hotel.rating}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 text-blue-500 mb-2">
                  <MapPin size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">{hotel.city}</span>
                </div>
                <h3 className="text-2xl font-black mb-6 h-16 line-clamp-2">{hotel.name}</h3>
                <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold opacity-40 block uppercase">{t[lang].price}</span>
                    <span className="text-xl font-black">{hotel.price} <small className="text-xs font-medium opacity-50">{t[lang].night}</small></span>
                  </div>
                  <button 
                    onClick={() => handleBook(hotel)}
                    disabled={bookingId !== null}
                    className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center min-w-[140px] disabled:opacity-50"
                  >
                    {bookingId === hotel.id ? <Loader2 className="animate-spin" size={22} /> : t[lang].book}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelPage;