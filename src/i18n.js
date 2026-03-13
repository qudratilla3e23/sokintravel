import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag'],
      caches: ['localStorage'],
    },
    resources: {
      en: {
        translation: {
          "nav": ["Home", "Tours", "Hotel", "Contact"],
          "hero_tag": "Discovery the World",
          "hero_title": "Unleash Your Wanderlust Book Your Next Journey",
          "hero_desc": "Crafting Exceptional Journeys: Your Global Escape Planner.",
          "tours": "Tours",
          "hotels": "Hotels",
          "tickets": "Tickets",
          "rental": "Rental",
          "activities": "Activities",
          "location": "Location",
          "check_in": "Check In",
          "guests": "Guests",
          "search": "Search",
          "featured_tours": "Our Featured Tours",
          "categories_title": "Top Categories of Tours",
          "view_more": "View More",
          "per_person": "/ person",
          "book_now": "Book Now",
          "all_categories": "All Categories",
          "mountain": "Mountain",
          "safari": "Safari",
          "desert": "Desert",
          "beach": "Beach"
        }
      },
      uz: {
        translation: {
          "nav": ["Bosh sahifa", "Turlar", "Mehmonxona", "Aloqa"],
          "hero_tag": "Dunyoni kashf eting",
          "hero_title": "Sayohat ishtiyoqingizni uyg'oting",
          "hero_desc": "Ajoyib sayohatlar: Sizning global qochish rejangiz.",
          "tours": "Turlar",
          "hotels": "Mehmonxonalar",
          "tickets": "Chiptalar",
          "rental": "Ijara",
          "activities": "Faoliyatlar",
          "location": "Manzil",
          "check_in": "Kirish sanasi",
          "guests": "Mehmonlar",
          "search": "Qidirish",
          "featured_tours": "Saralangan turlar",
          "categories_title": "Top toifalar",
          "view_more": "Barchasi",
          "per_person": "/ kishi uchun",
          "book_now": "Band qilish",
          "all_categories": "Barcha kategoriyalar",
          "mountain": "Tog'lar",
          "safari": "Safari",
          "desert": "Sahro",
          "beach": "Plyaj"
        }
      },
      ru: {
        translation: {
          "nav": ["Главная", "Туры", "Отель", "Контакт"],
          "hero_tag": "Открой мир",
          "hero_title": "Дайте волю своей жажде странствий",
          "hero_desc": "Исключительные путешествия: Ваш план побега.",
          "tours": "Туры",
          "hotels": "Отели",
          "tickets": "Билеты",
          "rental": "Аренда",
          "activities": "Активности",
          "location": "Локация",
          "check_in": "Дата заезда",
          "guests": "Гости",
          "search": "Поиск",
          "featured_tours": "Популярные туры",
          "categories_title": "Топ категории",
          "view_more": "Показать все",
          "per_person": "/ на человека",
          "book_now": "Забронировать",
          "all_categories": "Все категории",
          "mountain": "Горы",
          "safari": "Сафари",
          "desert": "Пустыня",
          "beach": "Пляж"
        }
      }
    }
  });

export default i18n;