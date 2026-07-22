// Переводы для мультиязычности (русский, казахский, английский)
type Language = 'ru' | 'kk' | 'en';

const translations: Record<Language, Record<string, string>> = {
  ru: {
    'search.placeholder': 'Поиск...',
    'home.noApplications': 'Нет доступных заявок',
    'home.viewMap': 'Карта',
    'home.viewList': 'Список',
    'categories.food': 'Продукты',
    'categories.medicine': 'Медикаменты',
    'categories.shelter': 'Укрытие',
    'categories.emergency': 'Скорая помощь',
    'application.location': 'Местоположение',
    'common.notSpecified': 'Не указано',
    'footer.description': 'Платформа помощи и ресурсов',
    'footer.quickLinks': 'Быстрые ссылки',
    'footer.contact': 'Контакты',
    'footer.rights': 'Все права защищены',
    'nav.home': 'Главная',
    'nav.applications': 'Заявки',
    'nav.about': 'О нас',
    'alerts.loginError': 'Ошибка входа',
    'alerts.loginErrorDetail': 'Не удалось выполнить вход',
    'auth.login.title': 'Вход в систему',
    'auth.login.subtitle': 'Или',
    'auth.login.signupLink': 'зарегистрируйтесь',
    'auth.login.email': 'Email',
    'common.loading': 'Загрузка...',
    'search.noResults': 'Ничего не найдено',
  },
  kk: {
    'search.placeholder': 'Іздеу...',
    'home.noApplications': 'Қолжетімді өтініштер жоқ',
    // ... казахские переводы
  },
  en: {
    'search.placeholder': 'Search...',
    'home.noApplications': 'No applications available',
    // ... английские переводы
  },
};

export type { Language };

export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'ru';
  const stored = localStorage.getItem('language');
  return (stored as Language) || 'ru';
}

export function useTranslation(language: Language) {
  return (key: string): string => {
    return translations[language]?.[key] || translations['ru'][key] || key;
  };
}
