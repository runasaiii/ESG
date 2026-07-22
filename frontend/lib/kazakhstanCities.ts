export interface CityData {
  name: string;
  lat: number;
  lng: number;
  region?: string;
}

export const kazakhstanCities: CityData[] = [
  { name: 'Алматы', lat: 43.2220, lng: 76.8512, region: 'Алматинская область' },
  { name: 'Астана', lat: 51.1694, lng: 71.4491, region: 'Акмолинская область' },
  { name: 'Шымкент', lat: 42.3417, lng: 69.5901, region: 'Туркестанская область' },
  { name: 'Караганда', lat: 49.8047, lng: 73.1094, region: 'Карагандинская область' },
  { name: 'Актобе', lat: 50.2839, lng: 57.1670, region: 'Актюбинская область' },
  { name: 'Тараз', lat: 42.9000, lng: 71.3667, region: 'Жамбылская область' },
  { name: 'Павлодар', lat: 52.2873, lng: 76.9674, region: 'Павлодарская область' },
  { name: 'Усть-Каменогорск', lat: 49.9483, lng: 82.6278, region: 'Восточно-Казахстанская область' },
  { name: 'Семей', lat: 50.4111, lng: 80.2275, region: 'Восточно-Казахстанская область' },
  { name: 'Атырау', lat: 47.1167, lng: 51.8833, region: 'Атырауская область' },
  { name: 'Костанай', lat: 53.2144, lng: 63.6246, region: 'Костанайская область' },
  { name: 'Кызылорда', lat: 44.8479, lng: 65.5093, region: 'Кызылординская область' },
  { name: 'Уральск', lat: 51.2333, lng: 51.3667, region: 'Западно-Казахстанская область' },
  { name: 'Петропавловск', lat: 54.8667, lng: 69.1500, region: 'Северо-Казахстанская область' },
  { name: 'Актау', lat: 43.6500, lng: 51.1600, region: 'Мангистауская область' },
  { name: 'Темиртау', lat: 50.0547, lng: 72.9646, region: 'Карагандинская область' },
  { name: 'Туркестан', lat: 43.3019, lng: 68.2519, region: 'Туркестанская область' },
  { name: 'Кокшетау', lat: 53.2833, lng: 69.3833, region: 'Акмолинская область' },
  { name: 'Талдыкорган', lat: 45.0167, lng: 78.3667, region: 'Алматинская область' },
  { name: 'Экибастуз', lat: 51.7297, lng: 75.3269, region: 'Павлодарская область' },
  { name: 'Рудный', lat: 52.9667, lng: 63.1167, region: 'Костанайская область' },
  { name: 'Жанаозен', lat: 43.3412, lng: 52.8619, region: 'Мангистауская область' },
  { name: 'Жезказган', lat: 47.7833, lng: 67.7000, region: 'Карагандинская область' },
  { name: 'Балхаш', lat: 46.8481, lng: 74.9950, region: 'Карагандинская область' },
  { name: 'Сарань', lat: 49.7906, lng: 72.8386, region: 'Карагандинская область' },
  { name: 'Каскелен', lat: 43.2075, lng: 76.6278, region: 'Алматинская область' },
  { name: 'Кентау', lat: 43.5167, lng: 68.5167, region: 'Туркестанская область' },
  { name: 'Арал', lat: 46.8000, lng: 61.6667, region: 'Кызылординская область' },
  { name: 'Аксу', lat: 52.0333, lng: 76.9167, region: 'Павлодарская область' },
  { name: 'Лисаковск', lat: 52.5500, lng: 62.5000, region: 'Костанайская область' },
  { name: 'Риддер', lat: 50.3500, lng: 83.5167, region: 'Восточно-Казахстанская область' },
  { name: 'Степногорск', lat: 52.3500, lng: 71.8833, region: 'Акмолинская область' },
  { name: 'Щучинск', lat: 52.9333, lng: 70.1833, region: 'Акмолинская область' },
];

export function getCityByName(name: string): CityData | undefined {
  const normalized = name.trim().toLowerCase();
  return kazakhstanCities.find((city) => city.name.toLowerCase() === normalized);
}

export function searchKazakhstanCities(query: string, startsWith = false): CityData[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return kazakhstanCities.slice(0, 10);
  }

  return kazakhstanCities.filter((city) => {
    const cityName = city.name.toLowerCase();
    return startsWith ? cityName.startsWith(normalized) : cityName.includes(normalized);
  }).slice(0, 10);
}
