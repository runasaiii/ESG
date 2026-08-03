'use client';

import SearchBar from '@/components/common/SearchBar';
import { apiClient, Notification } from '@/lib/api';
import { getLanguage, Language, useTranslation } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { Bell, ChevronDown, FileText, Globe, Home, LogOut, Menu, Newspaper, Shield, User, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import NotificationsDropdown from './NotificationsDropdown';

export default function Header() {
  const router = useRouter();
  const { user, setUser, language, setLanguage: setLang, viewMode, setViewMode } = useStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const t = useTranslation(language);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = getLanguage();
      if (storedLang !== language) {
        setLang(storedLang);
      }
      const storedViewMode = (localStorage.getItem('viewMode') as 'map' | 'list') || 'map';
      if (storedViewMode !== viewMode) {
        setViewMode(storedViewMode);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showLangMenu || showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showLangMenu, showNotifications]);

  useEffect(() => {
    if (user?.is_authenticated) {
      loadNotifications();
      const interval = setInterval(loadNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      const data = await apiClient.getNotifications();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unread_count || 0);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3 lg:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="flex items-center flex-shrink-0 group" onClick={closeMobileMenu}>
            <div className="group-hover:opacity-90 transition-opacity">
              <img
            src="/asar/ASARlogoo3.png"
            alt="ASAR Logo"
            className="h-14 sm:h-18 lg:h-24 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-logo.svg";
            }}
          />
            </div>
          </Link>

          <div className="hidden lg:block flex-1 mx-8 max-w-2xl">
            <SearchBar />
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            {user?.is_authenticated ? (
              <>
                <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100">
                  <Home className="w-5 h-5" />
                  <span className="font-medium">{t('nav.home')}</span>
                </Link>
                <Link href="/applications/new" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">{t('nav.applications')}</span>
                </Link>
                <Link href="/news" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100">
                  <Newspaper className="w-5 h-5" />
                  <span className="font-medium">Новости</span>
                </Link>
                <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{t('nav.profile')}</span>
                </Link>

                {user?.isAdmin && (
                  <Link href="/admin" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors px-3 py-2 rounded-md hover:bg-purple-50 border border-purple-200">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{t('admin.title')}</span>
                  </Link>
                )}

                <button
                  onClick={async () => {
                    try {
                      await apiClient.logout();
                      setUser(null);
                      router.push('/');
                    } catch (error) {
                      console.error('Error logging out:', error);
                    }
                  }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">{t('nav.logout')}</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 font-medium">
                  {t('nav.home')}
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 font-medium">
                  {t('nav.about')}
                </Link>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 font-medium">
                  {t('nav.login')}
                </Link>
                <Link href="/sign-up" className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>

          
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {user?.is_authenticated && (
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative flex items-center text-gray-700 hover:text-blue-600 transition-colors p-2 sm:px-3 sm:py-2 rounded-md hover:bg-gray-100"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <NotificationsDropdown
                    notifications={notifications}
                    onClose={() => setShowNotifications(false)}
                    onMarkRead={async (id) => {
                      await apiClient.markNotificationRead(id);
                      loadNotifications();
                    }}
                    onMarkAllRead={async () => {
                      await apiClient.markAllNotificationsRead();
                      loadNotifications();
                    }}
                  />
                )}
              </div>
            )}

            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="group relative flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-500 px-2.5 sm:px-4 py-2 rounded-md text-white transition-all duration-200 border border-blue-500 shadow-sm"
              >
                <div className="relative">
                  <Globe className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="uppercase font-bold text-sm tracking-wider">
                  {language === 'ru' ? 'RU' : language === 'kk' ? 'KZ' : 'EN'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-50 min-w-[200px] max-w-[calc(100vw-1.5rem)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2">
                    {(['ru', 'kk', 'en'] as Language[]).map((lang) => {
                      const isActive = language === lang;
                      const langData = {
                        ru: { name: 'Русский', flag: '🇷🇺', code: 'RU' },
                        kk: { name: 'Қазақша', flag: '🇰🇿', code: 'KZ' },
                        en: { name: 'English', flag: '🇬🇧', code: 'EN' }
                      }[lang];

                      return (
                        <button
                          key={lang}
                          onClick={() => {
                            setLang(lang);
                            setShowLangMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-md transition-all duration-200 flex items-center justify-between ${isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-blue-50'
                            }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{langData.flag}</span>
                            <div>
                              <div className={`font-semibold ${isActive ? 'text-white' : 'text-gray-800'}`}>
                                {langData.name}
                              </div>
                              <div className={`text-xs ${isActive ? 'text-red-100' : 'text-gray-500'}`}>
                                {langData.code}
                              </div>
                            </div>
                          </div>
                          {isActive && (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="lg:hidden mt-2.5 sm:mt-3">
          <SearchBar />
        </div>

        
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-gray-100 space-y-1 pb-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {user?.is_authenticated ? (
              <>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition-colors font-medium"
                >
                  <Home className="w-5 h-5 flex-shrink-0" />
                  <span>{t('nav.home')}</span>
                </Link>
                <Link
                  href="/applications/new"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition-colors font-medium"
                >
                  <FileText className="w-5 h-5 flex-shrink-0" />
                  <span>{t('nav.applications')}</span>
                </Link>
                <Link
                  href="/news"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition-colors font-medium"
                >
                  <Newspaper className="w-5 h-5 flex-shrink-0" />
                  <span>Новости</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition-colors font-medium"
                >
                  <User className="w-5 h-5 flex-shrink-0" />
                  <span>{t('nav.profile')}</span>
                </Link>
                {user?.isAdmin && (
                  <Link
                    href="/admin"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-purple-50 active:bg-purple-50 transition-colors font-medium border border-purple-200"
                  >
                    <Shield className="w-5 h-5 flex-shrink-0 text-purple-600" />
                    <span>{t('admin.title')}</span>
                  </Link>
                )}
                <button
                  onClick={async () => {
                    closeMobileMenu();
                    try {
                      await apiClient.logout();
                      setUser(null);
                      router.push('/');
                    } catch (error) {
                      console.error('Error logging out:', error);
                    }
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition-colors font-medium"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span>{t('nav.logout')}</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition-colors font-medium"
                >
                  {t('nav.home')}
                </Link>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition-colors font-medium"
                >
                  {t('nav.about')}
                </Link>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition-colors font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/sign-up"
                  onClick={closeMobileMenu}
                  className="block text-center bg-blue-600 text-white px-4 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-sm mt-2"
                >
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}