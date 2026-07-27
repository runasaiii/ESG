export interface CityData {
  name: string;
  lat: number;
  lng: number;
  region?: string;
}

export const kazakhstanCities: CityData[] = [
  { name: 'Алматы', lat: 43.2220, lng: 76.8512, region: 'Алматы' },
  { name: 'Астана', lat: 51.1694, lng: 71.4491, region: 'Астана' },
  { name: 'Шымкент', lat: 42.3417, lng: 69.5901, region: 'Шымкент' },
  { name: 'Караганда', lat: 49.8047, lng: 73.1094, region: 'Карагандинская область' },
  { name: 'Актобе', lat: 50.2839, lng: 57.1670, region: 'Актюбинская область' },
  { name: 'Тараз', lat: 42.9000, lng: 71.3667, region: 'Жамбылская область' },
  { name: 'Павлодар', lat: 52.2873, lng: 76.9674, region: 'Павлодарская область' },
  { name: 'Усть-Каменогорск', lat: 49.9714, lng: 82.6059, region: 'Восточно-Казахстанская область' },
  { name: 'Семей', lat: 50.4111, lng: 80.2275, region: 'Восточно-Казахстанская область' },
  { name: 'Атырау', lat: 47.1164, lng: 51.8830, region: 'Атырауская область' },
  { name: 'Костанай', lat: 53.2144, lng: 63.6246, region: 'Костанайская область' },
  { name: 'Кызылорда', lat: 44.8479, lng: 65.4823, region: 'Кызылординская область' },
  { name: 'Уральск', lat: 51.2333, lng: 51.3667, region: 'Западно-Казахстанская область' },
  { name: 'Петропавловск', lat: 54.8667, lng: 69.1500, region: 'Северо-Казахстанская область' },
  { name: 'Актау', lat: 43.6500, lng: 51.1667, region: 'Мангистауская область' },
  { name: 'Темиртау', lat: 50.0546, lng: 72.9645, region: 'Карагандинская область' },
  { name: 'Туркестан', lat: 43.2975, lng: 68.2517, region: 'Туркестанская область' },
  { name: 'Кокшетау', lat: 53.2833, lng: 69.3833, region: 'Акмолинская область' },
  { name: 'Талдыкорган', lat: 45.0167, lng: 78.3667, region: 'Алматинская область' },
  { name: 'Экибастуз', lat: 51.7264, lng: 75.3231, region: 'Павлодарская область' },
  { name: 'Рудный', lat: 52.9667, lng: 63.1167, region: 'Костанайская область' },
  { name: 'Жезказган', lat: 47.7833, lng: 67.7000, region: 'Карагандинская область' },
  { name: 'Балхаш', lat: 46.8481, lng: 74.9950, region: 'Карагандинская область' },
  { name: 'Кентау', lat: 43.5167, lng: 68.5000, region: 'Туркестанская область' },
  { name: 'Жанаозен', lat: 43.3417, lng: 52.8583, region: 'Мангистауская область' },
];


export function searchKazakhstanCities(
  query: string,
  exactPrefixOnly?: boolean
): CityData[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return kazakhstanCities;
  }

  if (exactPrefixOnly) {
    return kazakhstanCities.filter((city) =>
      city.name.toLowerCase().startsWith(normalized)
    );
  }

  return kazakhstanCities.filter((city) =>
    city.name.toLowerCase().includes(normalized)
  );
}


export function getCityByName(name: string): CityData | undefined {
  if (!name) return undefined;
  const normalized = name.trim().toLowerCase();
  return kazakhstanCities.find((city) => city.name.toLowerCase() === normalized);
}

export default kazakhstanCities;