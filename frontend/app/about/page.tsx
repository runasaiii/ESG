'use client';

import { useTranslation } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import { Heart, Users, MapPin, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { language } = useStore();
  const t = useTranslation(language);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">
              {t('aboutPage.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('aboutPage.subtitle')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6">
                {t('aboutPage.intro')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-50 p-3 rounded-md border border-red-200">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {t('aboutPage.cards.emergency.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('aboutPage.cards.emergency.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-50 p-3 rounded-md border border-green-200">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {t('aboutPage.cards.volunteering.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('aboutPage.cards.volunteering.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {t('aboutPage.cards.geolocation.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('aboutPage.cards.geolocation.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                    <Heart className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {t('aboutPage.cards.community.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('aboutPage.cards.community.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-lg shadow-sm border border-blue-700 p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              {t('aboutPage.joinTitle')}
            </h2>
            <p className="text-lg mb-6 text-blue-100">
              {t('aboutPage.joinSubtitle')}
            </p>
            <Link href="/sign-up" className="btn bg-white text-blue-700 hover:bg-gray-50 inline-block border border-gray-300">
              {t('nav.signup')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}