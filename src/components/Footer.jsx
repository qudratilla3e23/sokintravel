    import React from 'react';
    import { Facebook, Instagram, Twitter, Youtube, Send, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

    const TravelFooter = ({ lang = 'UZ', darkMode = false }) => {
    const currentYear = new Date().getFullYear();

    const content = {
        about: {
        UZ: "Sokin Travel — dunyo bo'ylab unutilmas va xavfsiz sayohatlarni tashkil etishda sizning ishonchli hamkoringiz.",
        RU: "Sokin Travel — ваш надежный партнер в организации незабываемых и безопасных путешествий по всему миру.",
        EN: "Sokin Travel — your reliable partner in organizing unforgettable and safe travels worldwide."
        },
        links: [
        { title: { UZ: "Kompaniya", RU: "Компания", EN: "Company" }, items: ["About Us", "Tours", "Services", "Pricing"] },
        { title: { UZ: "Yordam", RU: "Помощь", EN: "Support" }, items: ["FAQ", "Contact", "Privacy Policy", "Terms"] }
        ],
        newsletter: {
        title: { UZ: "Yangi sayohatlardan xabardor bo'ling", RU: "Узнавайте о новых турах", EN: "Stay updated on new tours" },
        placeholder: { UZ: "Email manzilingiz", RU: "Ваш Email", EN: "Your Email" }
        }
    };

    return (
        <footer className={`pt-20 pb-10 border-t ${darkMode ? 'bg-slate-950 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'}`}>
        <div className="container mx-auto px-4">
            
            <div className="flex flex-col lg:flex-row justify-between items-center mb-16 p-8 md:p-12 rounded-[40px] bg-blue-600 text-white shadow-2xl shadow-blue-600/20">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                {content.newsletter.title[lang]}
                </h2>
                <p className="opacity-80 text-lg italic">Get 10% discount on your first booking!</p>
            </div>
            <div className="lg:w-1/3 w-full relative">
                <input 
                type="email" 
                placeholder={content.newsletter.placeholder[lang]} 
                className="w-full py-5 px-8 rounded-full bg-white text-slate-900 focus:outline-none text-lg"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-blue-700 hover:bg-slate-900 text-white px-8 rounded-full transition-all flex items-center gap-2">
                <Send size={18} />
                </button>
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            <div className="space-y-6">
                <h3 className="text-3xl font-black tracking-tighter italic">SOKIN <span className="text-blue-600">TRAVEL</span></h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                {content.about[lang]}
                </p>
                <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all">
                    <Icon size={18} />
                    </a>
                ))}
                </div>
            </div>

            {content.links.map((group, idx) => (
                <div key={idx}>
                <h4 className="text-xl font-black mb-6">{group.title[lang]}</h4>
                <ul className="space-y-4">
                    {group.items.map((item, i) => (
                    <li key={i}>
                        <a href="#" className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2 group">
                        {item} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                        </a>
                    </li>
                    ))}
                </ul>
                </div>
            ))}

            <div>
                <h4 className="text-xl font-black mb-6">{lang === 'UZ' ? "Kontaktlar" : "Contacts"}</h4>
                <ul className="space-y-4">
                <li className="flex items-center gap-4 text-slate-500 font-medium">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600"><Phone size={18} /></div>
                    +998 90 123 45 67
                </li>
                <li className="flex items-center gap-4 text-slate-500 font-medium">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600"><Mail size={18} /></div>
                    info@sokintravel.uz
                </li>
                <li className="flex items-center gap-4 text-slate-500 font-medium">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-blue-600"><MapPin size={18} /></div>
                    Tashkent, Uzbekistan
                </li>
                </ul>
            </div>

            </div>

            <div className="pt-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm font-medium">
            <p>© {currentYear} Sokin Travel. All rights reserved.</p>
            <div className="flex gap-8">
                <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Cookies</a>
            </div>
            </div>

        </div>
        </footer>
    );
    };

    export default TravelFooter;