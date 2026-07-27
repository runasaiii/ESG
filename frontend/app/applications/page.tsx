'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient, Application } from '@/lib/api';
import CategoryBadge from '@/components/common/CategoryBadge';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import {
  FileText,
  MapPin,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

type CategoryFilter =
  | 'all'
  | 'food'
  | 'medicine'
  | 'shelter'
  | 'emergency';

export default function ApplicationsPage() {
  const { language } = useStore();
  const t = useTranslation(language);

  const [selectedCategory, setSelectedCategory] =
  useState<CategoryFilter>('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getApplications();
      setApplications(data || []);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications =
    selectedCategory === 'all'
      ? applications
      : applications.filter(
          (app) => app.category === selectedCategory
        );

  const categories: {
    key: 'all' | 'food' | 'medicine' | 'shelter' | 'emergency';
    label: string;
    category?: 'food' | 'medicine' | 'shelter' | 'emergency';
  }[] = [
    { key: 'all', label: t('categories.all') },
    { key: 'food', label: t('categories.food'), category: 'food' },
    { key: 'medicine', label: t('categories.medicine'), category: 'medicine' },
    { key: 'shelter', label: t('categories.shelter'), category: 'shelter' },
    { key: 'emergency', label: t('categories.emergency'), category: 'emergency' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-5 px-3 sm:py-8 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        {t('applications.title')}
      </h1>

      
      <div className="bg-white rounded-xl shadow border p-3 sm:p-4 mb-4 sm:mb-6">
        <span className="block text-sm font-semibold text-gray-600 mb-2 sm:mb-0 sm:inline sm:mr-3">
          {t('applications.categories')}
        </span>

       
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
          {categories.map(({ key, label, category }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex-shrink-0 transition-all duration-200 ${
                selectedCategory === key
                  ? 'ring-2 ring-blue-500 ring-offset-2 scale-105'
                  : 'active:scale-95 sm:hover:scale-105'
              }`}
            >
              {key === 'all' ? (
                <span className="px-3 py-1.5 sm:py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-700 text-sm font-semibold whitespace-nowrap">
                  {label}
                </span>
              ) : (
                <CategoryBadge category={category!} />
              )}
            </button>
          ))}
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="mx-auto w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-500">
            {t('applications.noResults')}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-6">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl shadow border p-4 sm:p-6 active:scale-[0.99] sm:active:scale-100 hover:shadow-lg transition"
            >
              <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 sm:mb-4">
                <div>
                  <h2 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 leading-snug">
                    {app.description}
                  </h2>

                  <CategoryBadge
                    category={
                      app.category as
                        | 'food'
                        | 'medicine'
                        | 'shelter'
                        | 'emergency'
                    }
                  />
                </div>

                {app.is_sos && (
                  <span className="self-start bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 animate-pulse-emergency">
                    <AlertTriangle className="w-4 h-4" />
                    SOS
                  </span>
                )}
              </div>

              <div className="flex gap-4 sm:gap-6 text-gray-500 text-sm mb-4 flex-wrap">
                {app.city && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    {app.city}
                  </div>
                )}

                {app.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    {new Date(app.date).toLocaleDateString('ru-RU')}
                  </div>
                )}
              </div>

              <Link
                href={`/applications/${app.id}`}
                className="block text-center sm:inline-block w-full sm:w-auto bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition font-medium"
              >
                {t('applications.details')}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}