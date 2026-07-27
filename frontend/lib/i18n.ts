export type Language = 'ru' | 'kk' | 'en';

const LANGUAGE_STORAGE_KEY = 'language';

type TranslationDict = { [key: string]: string | TranslationDict };

const translations: Record<Language, TranslationDict> = {
  ru: {
    nav: {
      home: 'Главная',
      applications: 'Заявки',
      about: 'О нас',
      login: 'Войти',
      signup: 'Регистрация',
      profile: 'Профиль',
      logout: 'Выйти',
    },
    home: {
      hero: {
        title: 'Экстренная помощь и обмен ресурсами',
        subtitle: 'Найдите помощь рядом с вами или помогите тем, кто нуждается',
        createApplication: 'Создать заявку',
        viewAll: 'Смотреть все',
      },
      noApplications: 'Заявок пока нет',
      viewList: 'Список',
      viewMap: 'Карта',
      cta: {
        title: 'Хотите помочь?',
        description: 'Создайте заявку, если вам нужна помощь, или откликнитесь на существующую',
        button: 'Создать заявку',
      },
    },
    stats: {
      totalInRegion: 'Всего заявок в регионе',
      activeApplications: 'Активные заявки',
      emergencyApplications: 'Экстренные заявки',
    },
    application: {
      location: 'Местоположение',
      priority: 'Приоритет',
      form: {
        title: 'Создать заявку',
        subtitle: 'Заполните форму, чтобы попросить о помощи',
        category: 'Категория',
        description: 'Описание',
        descriptionPlaceholder: 'Опишите, какая помощь вам нужна...',
        descriptionRequired: 'Пожалуйста, введите описание',
        characters: 'символов',
        selectLocation: 'Выберите местоположение на карте',
        selected: 'Выбрано',
        locationRequired: 'Пожалуйста, выберите местоположение',
        expires: 'Заявка действует',
        days3: '3 дня',
        days7: '7 дней',
        days14: '14 дней',
        days30: '30 дней',
        submit: 'Отправить заявку',
        submitting: 'Отправка...',
        submitError: 'Ошибка при создании заявки. Попробуйте еще раз.',
      },
    },
    auth: {
      login: {
        title: 'Вход в систему',
        subtitle: 'Или',
        signupLink: 'зарегистрируйтесь',
        email: 'Email',
        password: 'Пароль',
        submit: 'Войти',
      },
      signup: {
        title: 'Регистрация',
        subtitle: 'Уже есть аккаунт?',
        loginLink: 'Войдите',
        email: 'Email',
        firstName: 'Имя',
        lastName: 'Фамилия',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submit: 'Зарегистрироваться',
        passwordRequirements: {
          title: 'Требования к паролю',
          minLength: 'Минимум 8 символов',
          uppercase: 'Хотя бы одна заглавная буква',
          lowercase: 'Хотя бы одна строчная буква',
          number: 'Хотя бы одна цифра',
          special: 'Хотя бы один специальный символ',
        },
        passwordStrength: {
          weak: 'Слабый',
          medium: 'Средний',
          strong: 'Надежный',
        },
      },
    },
    categories: {
      food: 'Продукты',
      medicine: 'Медицина',
      shelter: 'Убежище',
      emergency: 'Экстренная помощь',
    },
    search: {
      placeholder: 'Поиск заявок, людей, городов...',
      noResults: 'Ничего не найдено',
      resultsCount: 'Найдено результатов',
      applications: 'Заявки',
      applicationsCount: 'заявок',
      users: 'Пользователи',
      cities: 'Города',
    },
    common: {
      loading: 'Загрузка...',
      cancel: 'Отмена',
      more: 'Подробнее',
      notSpecified: 'Не указано',
    },
    footer: {
      description: 'Платформа для экстренной помощи и обмена ресурсами в Казахстане.',
      quickLinks: 'Быстрые ссылки',
      contact: 'Контакты',
      rights: 'Все права защищены.',
    },
    alerts: {
      geolocationNotSupported: 'Ваш браузер не поддерживает геолокацию',
      locationError: 'Не удалось определить местоположение',
      loginError: 'Ошибка входа',
      loginErrorDetail: 'Не удалось войти. Проверьте email и пароль.',
      profileSaveError: 'Ошибка при сохранении профиля',
      ratingError: 'Ошибка при оценке волонтера',
      ratingNegative: 'Оценка отправлена',
      ratingPositive: 'Оценка отправлена',
      registrationError: 'Ошибка регистрации',
      registrationErrorDetail: 'Не удалось зарегистрироваться. Попробуйте еще раз.',
      resolvedError: 'Ошибка при отметке заявки как решенной',
      resolvedSuccess: 'Заявка отмечена как решенная',
      respondError: 'Ошибка при отклике на заявку',
      respondSuccess: 'Вы успешно откликнулись на заявку',
      sosError: 'Ошибка при отправке SOS',
      sosSent: 'SOS отправлен',
    },
    admin: {
      title: 'Админ-панель',
      applications: {
        approveError: 'Ошибка при одобрении заявки',
        rejectError: 'Ошибка при отклонении заявки',
        markError: 'Ошибка при пометке заявки',
        priorityError: 'Ошибка при установке приоритета',
        noApplications: 'Заявок нет',
      },
      users: {
        applications: 'Заявки',
        totalApplications: 'Всего заявок',
        noApplications: 'Заявок нет',
        blockError: 'Ошибка при блокировке пользователя',
        unblockError: 'Ошибка при разблокировке пользователя',
        adminError: 'Ошибка при назначении администратора',
        deleteError: 'Ошибка при удалении пользователя',
      },
    },
    status: 'Статус',
  },
  kk: {
    nav: {
      home: 'Басты бет',
      applications: 'Өтініштер',
      about: 'Біз туралы',
      login: 'Кіру',
      signup: 'Тіркелу',
      profile: 'Профиль',
      logout: 'Шығу',
    },
    home: {
      hero: {
        title: 'Шұғыл көмек және ресурстар алмасу',
        subtitle: 'Жаныңыздан көмек табыңыз немесе мұқтаждарға көмектесіңіз',
        createApplication: 'Өтініш жасау',
        viewAll: 'Барлығын көру',
      },
      noApplications: 'Әзірге өтініштер жоқ',
      viewList: 'Тізім',
      viewMap: 'Карта',
      cta: {
        title: 'Көмектескіңіз келе ме?',
        description: 'Көмек қажет болса өтініш жасаңыз немесе барыннан жауап беріңіз',
        button: 'Өтініш жасау',
      },
    },
    stats: {
      totalInRegion: 'Аймақтағы барлық өтініштер',
      activeApplications: 'Белсенді өтініштер',
      emergencyApplications: 'Шұғыл өтініштер',
    },
    application: {
      location: 'Орналасқан жері',
      priority: 'Басымдық',
      form: {
        title: 'Өтініш жасау',
        subtitle: 'Көмек сұрау үшін форманы толтырыңыз',
        category: 'Санат',
        description: 'Сипаттама',
        descriptionPlaceholder: 'Қандай көмек қажет екенін сипаттаңыз...',
        descriptionRequired: 'Сипаттаманы енгізіңіз',
        characters: 'таңба',
        selectLocation: 'Картадан орынды таңдаңыз',
        selected: 'Таңдалды',
        locationRequired: 'Орынды таңдаңыз',
        expires: 'Өтініш мерзімі',
        days3: '3 күн',
        days7: '7 күн',
        days14: '14 күн',
        days30: '30 күн',
        submit: 'Өтінішті жіберу',
        submitting: 'Жіберілуде...',
        submitError: 'Өтінішті жасау кезінде қате пайда болды. Қайталап көріңіз.',
      },
    },
    auth: {
      login: {
        title: 'Жүйеге кіру',
        subtitle: 'Немесе',
        signupLink: 'тіркеліңіз',
        email: 'Email',
        password: 'Құпия сөз',
        submit: 'Кіру',
      },
      signup: {
        title: 'Тіркелу',
        subtitle: 'Аккаунтыңыз бар ма?',
        loginLink: 'Кіріңіз',
        email: 'Email',
        firstName: 'Аты',
        lastName: 'Тегі',
        password: 'Құпия сөз',
        confirmPassword: 'Құпия сөзді растаңыз',
        submit: 'Тіркелу',
        passwordRequirements: {
          title: 'Құпия сөзге қойылатын талаптар',
          minLength: 'Кемінде 8 таңба',
          uppercase: 'Кемінде бір бас әріп',
          lowercase: 'Кемінде бір кіші әріп',
          number: 'Кемінде бір сан',
          special: 'Кемінде бір арнайы таңба',
        },
        passwordStrength: {
          weak: 'Әлсіз',
          medium: 'Орташа',
          strong: 'Күшті',
        },
      },
    },
    categories: {
      food: 'Азық-түлік',
      medicine: 'Медицина',
      shelter: 'Пана',
      emergency: 'Шұғыл көмек',
    },
    search: {
      placeholder: 'Өтініштерді, адамдарды, қалаларды іздеу...',
      noResults: 'Ештеңе табылмады',
      resultsCount: 'Табылған нәтижелер',
      applications: 'Өтініштер',
      applicationsCount: 'өтініш',
      users: 'Пайдаланушылар',
      cities: 'Қалалар',
    },
    common: {
      loading: 'Жүктелуде...',
      cancel: 'Болдырмау',
      more: 'Толығырақ',
      notSpecified: 'Көрсетілмеген',
    },
    footer: {
      description: 'Қазақстанда шұғыл көмек және ресурстар алмасу платформасы.',
      quickLinks: 'Жылдам сілтемелер',
      contact: 'Байланыс',
      rights: 'Барлық құқықтар қорғалған.',
    },
    alerts: {
      geolocationNotSupported: 'Сіздің браузеріңіз геолокацияны қолдамайды',
      locationError: 'Орналасқан жерді анықтау мүмкін болмады',
      loginError: 'Кіру қатесі',
      loginErrorDetail: 'Кіру мүмкін болмады. Email мен құпия сөзді тексеріңіз.',
      profileSaveError: 'Профильді сақтау кезінде қате пайда болды',
      ratingError: 'Волонтерді бағалау кезінде қате пайда болды',
      ratingNegative: 'Баға жіберілді',
      ratingPositive: 'Баға жіберілді',
      registrationError: 'Тіркелу қатесі',
      registrationErrorDetail: 'Тіркелу мүмкін болмады. Қайталап көріңіз.',
      resolvedError: 'Өтінішті шешілген деп белгілеу кезінде қате пайда болды',
      resolvedSuccess: 'Өтініш шешілген деп белгіленді',
      respondError: 'Өтінішке жауап беру кезінде қате пайда болды',
      respondSuccess: 'Сіз өтінішке сәтті жауап бердіңіз',
      sosError: 'SOS жіберу кезінде қате пайда болды',
      sosSent: 'SOS жіберілді',
    },
    admin: {
      title: 'Әкімші панелі',
      applications: {
        approveError: 'Өтінішті мақұлдау кезінде қате пайда болды',
        rejectError: 'Өтінішті қабылдамау кезінде қате пайда болды',
        markError: 'Өтінішті белгілеу кезінде қате пайда болды',
        priorityError: 'Басымдықты орнату кезінде қате пайда болды',
        noApplications: 'Өтініштер жоқ',
      },
      users: {
        applications: 'Өтініштер',
        totalApplications: 'Барлық өтініштер',
        noApplications: 'Өтініштер жоқ',
        blockError: 'Пайдаланушыны бұғаттау кезінде қате пайда болды',
        unblockError: 'Пайдаланушыны бұғаттан шығару кезінде қате пайда болды',
        adminError: 'Әкімші тағайындау кезінде қате пайда болды',
        deleteError: 'Пайдаланушыны жою кезінде қате пайда болды',
      },
    },
    status: 'Мәртебе',
  },
  en: {
    nav: {
      home: 'Home',
      applications: 'Applications',
      about: 'About',
      login: 'Login',
      signup: 'Sign up',
      profile: 'Profile',
      logout: 'Logout',
    },
    home: {
      hero: {
        title: 'Emergency help and resource exchange',
        subtitle: 'Find help nearby or help those in need',
        createApplication: 'Create application',
        viewAll: 'View all',
      },
      noApplications: 'No applications yet',
      viewList: 'List',
      viewMap: 'Map',
      cta: {
        title: 'Want to help?',
        description: 'Create an application if you need help, or respond to an existing one',
        button: 'Create application',
      },
    },
    stats: {
      totalInRegion: 'Total applications in region',
      activeApplications: 'Active applications',
      emergencyApplications: 'Emergency applications',
    },
    application: {
      location: 'Location',
      priority: 'Priority',
      form: {
        title: 'Create application',
        subtitle: 'Fill out the form to ask for help',
        category: 'Category',
        description: 'Description',
        descriptionPlaceholder: 'Describe what help you need...',
        descriptionRequired: 'Please enter a description',
        characters: 'characters',
        selectLocation: 'Select a location on the map',
        selected: 'Selected',
        locationRequired: 'Please select a location',
        expires: 'Application expires',
        days3: '3 days',
        days7: '7 days',
        days14: '14 days',
        days30: '30 days',
        submit: 'Submit application',
        submitting: 'Submitting...',
        submitError: 'Error creating application. Please try again.',
      },
    },
    auth: {
      login: {
        title: 'Sign in',
        subtitle: 'Or',
        signupLink: 'sign up',
        email: 'Email',
        password: 'Password',
        submit: 'Sign in',
      },
      signup: {
        title: 'Sign up',
        subtitle: 'Already have an account?',
        loginLink: 'Sign in',
        email: 'Email',
        firstName: 'First name',
        lastName: 'Last name',
        password: 'Password',
        confirmPassword: 'Confirm password',
        submit: 'Sign up',
        passwordRequirements: {
          title: 'Password requirements',
          minLength: 'At least 8 characters',
          uppercase: 'At least one uppercase letter',
          lowercase: 'At least one lowercase letter',
          number: 'At least one number',
          special: 'At least one special character',
        },
        passwordStrength: {
          weak: 'Weak',
          medium: 'Medium',
          strong: 'Strong',
        },
      },
    },
    categories: {
      food: 'Food',
      medicine: 'Medicine',
      shelter: 'Shelter',
      emergency: 'Emergency',
    },
    search: {
      placeholder: 'Search applications, people, cities...',
      noResults: 'Nothing found',
      resultsCount: 'Results found',
      applications: 'Applications',
      applicationsCount: 'applications',
      users: 'Users',
      cities: 'Cities',
    },
    common: {
      loading: 'Loading...',
      cancel: 'Cancel',
      more: 'More',
      notSpecified: 'Not specified',
    },
    footer: {
      description: 'A platform for emergency help and resource exchange in Kazakhstan.',
      quickLinks: 'Quick links',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
    alerts: {
      geolocationNotSupported: 'Your browser does not support geolocation',
      locationError: 'Could not determine your location',
      loginError: 'Login error',
      loginErrorDetail: 'Could not sign in. Check your email and password.',
      profileSaveError: 'Error saving profile',
      ratingError: 'Error rating volunteer',
      ratingNegative: 'Rating submitted',
      ratingPositive: 'Rating submitted',
      registrationError: 'Registration error',
      registrationErrorDetail: 'Could not register. Please try again.',
      resolvedError: 'Error marking application as resolved',
      resolvedSuccess: 'Application marked as resolved',
      respondError: 'Error responding to application',
      respondSuccess: 'You successfully responded to the application',
      sosError: 'Error sending SOS',
      sosSent: 'SOS sent',
    },
    admin: {
      title: 'Admin panel',
      applications: {
        approveError: 'Error approving application',
        rejectError: 'Error rejecting application',
        markError: 'Error marking application',
        priorityError: 'Error setting priority',
        noApplications: 'No applications',
      },
      users: {
        applications: 'Applications',
        totalApplications: 'Total applications',
        noApplications: 'No applications',
        blockError: 'Error blocking user',
        unblockError: 'Error unblocking user',
        adminError: 'Error assigning admin',
        deleteError: 'Error deleting user',
      },
    },
    status: 'Status',
  },
};

function resolveKey(dict: TranslationDict, path: string): string | undefined {
  const parts = path.split('.');
  let current: string | TranslationDict | undefined = dict;
  for (const part of parts) {
    if (typeof current !== 'object' || current === null) return undefined;
    current = current[part];
  }
  return typeof current === 'string' ? current : undefined;
}

export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'ru';
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
  if (stored === 'ru' || stored === 'kk' || stored === 'en') return stored;
  return 'ru';
}

export function setLanguage(language: Language): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
}


export function useTranslation(language: Language) {
  return function t(key: string): string {
    const dict = translations[language] || translations.ru;
    return resolveKey(dict, key) ?? resolveKey(translations.ru, key) ?? key;
  };
}

export default useTranslation;