import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactSection = ({ darkMode, lang }) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const t = {
    UZ: {
      badge: "Biz bilan bog'laning",
      title: "Savollaringiz bormi?",
      desc: "Sayohat bo'yicha maslahat kerakmi yoki tur buyurtma qilmoqchimisiz? Bizga yozing, tez orada javob beramiz.",
      phone: "Telefon",
      email: "Email",
      address: "Manzil",
      addr_text: "Toshkent shahri, Amir Temur ko'chasi, 15-uy",
      label_name: "Ismingiz",
      label_email: "Email manzilingiz",
      label_subject: "Mavzu",
      label_msg: "Xabaringiz",
      placeholder_msg: "Xabaringizni shu yerga yozing...",
      btn: "Xabarni yuborish",
      sending: "Yuborilmoqda...",
      success: "Xabaringiz muvaffaqiyatli yuborildi!"
    },
    RU: {
      badge: "Свяжитесь с нами",
      title: "Есть вопросы?",
      desc: "Нужен совет по путешествию или хотите заказать тур? Напишите нам, и мы скоро ответим.",
      phone: "Телефон",
      email: "Электронная почта",
      address: "Адрес",
      addr_text: "город Ташкент, улица Амира Темура, 15",
      label_name: "Ваше имя",
      label_email: "Ваш Email",
      label_subject: "Тема",
      label_msg: "Ваше сообщение",
      placeholder_msg: "Напишите ваше сообщение здесь...",
      btn: "Отправить сообщение",
      sending: "Отправка...",
      success: "Ваше сообщение успешно отправлено!"
    },
    EN: {
      badge: "Contact Us",
      title: "Have Questions?",
      desc: "Need travel advice or want to book a tour? Write to us, and we will reply soon.",
      phone: "Phone",
      email: "Email",
      address: "Address",
      addr_text: "Tashkent city, Amir Temur street, 15",
      label_name: "Your Name",
      label_email: "Your Email Address",
      label_subject: "Subject",
      label_msg: "Message",
      placeholder_msg: "Write your message here...",
      btn: "Send Message",
      sending: "Sending...",
      success: "Your message has been sent successfully!"
    }
  };

  const currentT = t[lang] || t.UZ;

  const handleSend = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formRef.current,
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
      setLoading(false);
      setSent(true);
      formRef.current.reset();
      setTimeout(() => setSent(false), 5000);
    })
    .catch((error) => {
      setLoading(false);
      alert("Xatolik yuz berdi: " + error.text);
    });
  };

  const cardClass = darkMode 
    ? "bg-slate-900 border-slate-800 text-white" 
    : "bg-white border-slate-200 text-slate-900 shadow-sm shadow-slate-100";
    
  const inputClass = darkMode
    ? "bg-slate-800 border-transparent focus:border-blue-500 text-white placeholder-slate-500"
    : "bg-slate-100 border-slate-200 focus:bg-white focus:border-blue-500 text-slate-900 placeholder-slate-400";

  return (
    <section className={`pt-32 pb-20 transition-all duration-500 ${darkMode ? 'bg-slate-950' : 'bg-[#f8fafc]'}`} id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-blue-600 font-extrabold tracking-[0.2em] uppercase text-xs mb-4">
            {currentT.badge}
          </motion.h2>
          <h1 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {currentT.title}
          </h1>
          <p className={`max-w-2xl mx-auto text-lg font-medium leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {currentT.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-4">
            {[
              { icon: <Phone size={22} />, title: currentT.phone, val1: "+998 90 123 45 67", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
              { icon: <Mail size={22} />, title: currentT.email, val1: "support@dreamkam.uz", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
              { icon: <MapPin size={22} />, title: currentT.address, val1: currentT.addr_text, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" }
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-[28px] border transition-transform hover:scale-[1.02] ${cardClass}`}>
                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4`}>{item.icon}</div>
                <h3 className="text-lg font-black mb-2">{item.title}</h3>
                <p className="text-sm font-semibold opacity-70">{item.val1}</p>
              </div>
            ))}
          </div>

          <div className={`lg:col-span-2 p-8 md:p-10 rounded-[40px] border ${cardClass} shadow-xl relative overflow-hidden`}>
            
            <AnimatePresence>
              {sent && (
                <motion.div initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} className="absolute inset-x-0 top-0 p-4 bg-emerald-500 text-white flex items-center justify-center gap-2 z-10 font-bold">
                  <CheckCircle2 size={20} /> {currentT.success}
                </motion.div>
              )}
            </AnimatePresence>

            <form ref={formRef} onSubmit={handleSend} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ml-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{currentT.label_name}</label>
                  <input name="from_name" required type="text" className={`w-full p-4 rounded-2xl outline-none transition-all border font-bold ${inputClass}`} />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-black uppercase tracking-wider ml-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{currentT.label_email}</label>
                  <input name="reply_to" required type="email" className={`w-full p-4 rounded-2xl outline-none transition-all border font-bold ${inputClass}`} />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-xs font-black uppercase tracking-wider ml-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{currentT.label_subject}</label>
                <input name="subject" required type="text" className={`w-full p-4 rounded-2xl outline-none transition-all border font-bold ${inputClass}`} />
              </div>

              <div className="space-y-2">
                <label className={`text-xs font-black uppercase tracking-wider ml-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{currentT.label_msg}</label>
                <textarea name="message" required rows="4" placeholder={currentT.placeholder_msg} className={`w-full p-4 rounded-2xl outline-none transition-all border font-bold resize-none ${inputClass}`}></textarea>
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className="w-full md:w-max px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="animate-spin" size={20} /> {currentT.sending}</>
                ) : (
                  <>{currentT.btn} <Send size={20} strokeWidth={3} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;