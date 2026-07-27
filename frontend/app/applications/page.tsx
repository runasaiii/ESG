'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient, Application } from '@/lib/api';
import { FileText, MapPin, Calendar, AlertTriangle } from 'lucide-react';

export default function ApplicationsPage() {
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
        Все заявки
      </h1>

      {applications.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="mx-auto w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-500">
            Заявок пока нет
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl shadow border p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-semibold text-lg">
                  {app.description}
                </h2>

                {app.is_sos && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    SOS
                  </span>
                )}
              </div>

              <div className="flex gap-6 text-gray-500 text-sm mb-4">
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
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Подробнее
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}