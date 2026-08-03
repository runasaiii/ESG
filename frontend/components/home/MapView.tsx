'use client';

import { useTranslation } from '@/lib/i18n';
import { useStore } from '@/lib/store';
import CategoryBadge from '@/components/common/CategoryBadge';
import { Application } from '@/lib/api';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const ApplicationMarker = dynamic(
  () => import('./ApplicationMarker'),
  { ssr: false }
);
const MapResizeHandler = dynamic(
  () => import('./MapResizeHandler'),
  { ssr: false }
);
const MapInitializer = dynamic(
  () => import('./MapInitializer'),
  { ssr: false }
);



interface MapViewProps {
  applications: Application[];
  center?: [number, number];
  userLocation?: [number, number] | null;
}

type CategoryFilter = 'food' | 'medicine' | 'shelter' | 'emergency' | 'all';
type RadiusFilter = 5 | 10 | 25 | 50 | 'all';

// Расстояние между двумя точками в километрах (формула Haversine)
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Компонент для обновления центра карты
function MapCenterController({ center }: { center?: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, map.getZoom() || 10);
    }
  }, [center, map]);
  
  return null;
}

// Центрирует карту на заявке, выбранной из списка
function MapFocusController({
  applications,
  selectedId,
}: {
  applications: Application[];
  selectedId: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const target = applications.find((app) => app.id === selectedId);
    if (target) {
      map.setView([target.latitude, target.longitude], 15, { animate: true });
    }
  }, [selectedId, applications, map]);

  return null;
}

export default function MapView({ applications, center, userLocation }: MapViewProps) {
  const { language, selectedApplicationId } = useStore();
  const t = useTranslation(language);

  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedRadius, setSelectedRadius] = useState<RadiusFilter>('all');
  const [mapKey, setMapKey] = useState(0);
  

  useEffect(() => {
    setIsClient(true);
    // Принудительное обновление карты только при монтировании
    setMapKey(prev => prev + 1);
  }, []);

  // React Leaflet автоматически обновит маркеры при изменении пропса applications
  // Не нужно обновлять mapKey, так как это вызывает полную перерисовку карты и ошибки

  const filteredApplications = applications
    .filter((app) => selectedCategory === 'all' || app.category === selectedCategory)
    .filter((app) => {
      if (selectedRadius === 'all' || !userLocation) return true;
      const distance = getDistanceKm(userLocation[0], userLocation[1], app.latitude, app.longitude);
      return distance <= selectedRadius;
    });

  const handleCategoryClick = (category: CategoryFilter) => {
    setSelectedCategory(selectedCategory === category ? 'all' : category);
  };

  if (!isClient) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '600px' }}>
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <p>Загрузка карты...</p>
          </div>
        </div>
      </div>
    );
  }

const categories: {
  key: CategoryFilter;
  label: string;
  category?: 'food' | 'medicine' | 'shelter' | 'emergency';
}[] = [
  { key: 'all', label: t('categories.all') },
  { key: 'food', label: t('categories.food'), category: 'food' },
  { key: 'medicine', label: t('categories.medicine'), category: 'medicine' },
  { key: 'shelter', label: t('categories.shelter'), category: 'shelter' },
  { key: 'emergency', label: t('categories.emergency'), category: 'emergency' },
];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600 font-semibold">
          {t('map.legend')}
        </span>
          {categories.map(({ key, category, label }) => (
            <button
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`transition-all duration-200 ${
                selectedCategory === key
                  ? 'ring-2 ring-blue-500 ring-offset-2 scale-105'
                  : 'hover:scale-105'
              }`}
            >
              {key === 'all' ? (
                <span className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  {label}
                </span>
              ) : (
                <CategoryBadge category={category!} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div 
        className="bg-white rounded-lg shadow-md w-full relative overflow-hidden"
        style={{ height: '600px', position: 'relative', isolation: 'isolate' }}
      >
      {userLocation && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600 font-semibold">Радиус:</span>
            {([5, 10, 25, 50, 'all'] as RadiusFilter[]).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRadius(r)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 ${
                  selectedRadius === r
                    ? 'border-blue-500 bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-1'
                    : 'border-gray-300 bg-gray-100 text-gray-700 hover:scale-105'
                }`}
              >
                {r === 'all' ? 'Все' : `${r} км`}
              </button>
            ))}
          </div>
        </div>
      )}
        <div 
          className="w-full h-full relative overflow-hidden"
          style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative',
            maxWidth: '100%'
          }}
        >
          {isClient && (
            <MapContainer
              key={mapKey}
              center={center || [43.2220, 76.8512]}
              zoom={10}
              style={{ height: '100%', width: '100%' }}
              className="map-container"
            >
              <MapResizeHandler />
              <MapInitializer />
              <MapCenterController center={center} />
              <MapFocusController applications={filteredApplications} selectedId={selectedApplicationId} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredApplications.map((app) => (
                <ApplicationMarker key={app.id} application={app} />
              ))}
            </MapContainer>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}

