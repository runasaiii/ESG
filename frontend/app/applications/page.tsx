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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        {t('applications.title')}
      </h1>

      {/* Фильтр */}
      <div className="bg-white rounded-xl shadow border p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-gray-600">
            {t('applications.categories')}
          </span>

          {categories.map(({ key, label, category }) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`transition-all duration-200 ${
                selectedCategory === key
                  ? 'ring-2 ring-blue-500 ring-offset-2 scale-105'
                  : 'hover:scale-105'
              }`}
            >
              {key === 'all' ? (
                <span className="px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-700 text-sm font-semibold">
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
        <div className="grid gap-6">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-semibold text-lg mb-3">
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
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    SOS
                  </span>
                )}
              </div>

              <div className="flex gap-6 text-gray-500 text-sm mb-4 flex-wrap">
                {app.city && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {app.city}
                  </div>
                )}

                {app.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(app.date).toLocaleDateString('ru-RU')}
                  </div>
                )}
              </div>

              <Link
                href={`/applications/${app.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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