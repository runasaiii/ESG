import math

KAZAKHSTAN_CITIES = [
    {'name': 'Алматы', 'lat': 43.2220, 'lng': 76.8512, 'region': 'Алматы'},
    {'name': 'Астана', 'lat': 51.1694, 'lng': 71.4491, 'region': 'Астана'},
    {'name': 'Шымкент', 'lat': 42.3417, 'lng': 69.5901, 'region': 'Шымкент'},
    {'name': 'Караганда', 'lat': 49.8047, 'lng': 73.1094, 'region': 'Карагандинская область'},
    {'name': 'Актобе', 'lat': 50.2839, 'lng': 57.1670, 'region': 'Актюбинская область'},
    {'name': 'Тараз', 'lat': 42.9000, 'lng': 71.3667, 'region': 'Жамбылская область'},
    {'name': 'Павлодар', 'lat': 52.2873, 'lng': 76.9674, 'region': 'Павлодарская область'},
    {'name': 'Усть-Каменогорск', 'lat': 49.9714, 'lng': 82.6059, 'region': 'Восточно-Казахстанская область'},
    {'name': 'Семей', 'lat': 50.4111, 'lng': 80.2275, 'region': 'Восточно-Казахстанская область'},
    {'name': 'Атырау', 'lat': 47.1164, 'lng': 51.8830, 'region': 'Атырауская область'},
    {'name': 'Костанай', 'lat': 53.2144, 'lng': 63.6246, 'region': 'Костанайская область'},
    {'name': 'Кызылорда', 'lat': 44.8479, 'lng': 65.4823, 'region': 'Кызылординская область'},
    {'name': 'Уральск', 'lat': 51.2333, 'lng': 51.3667, 'region': 'Западно-Казахстанская область'},
    {'name': 'Петропавловск', 'lat': 54.8667, 'lng': 69.1500, 'region': 'Северо-Казахстанская область'},
    {'name': 'Актау', 'lat': 43.6500, 'lng': 51.1667, 'region': 'Мангистауская область'},
    {'name': 'Темиртау', 'lat': 50.0546, 'lng': 72.9645, 'region': 'Карагандинская область'},
    {'name': 'Туркестан', 'lat': 43.2975, 'lng': 68.2517, 'region': 'Туркестанская область'},
    {'name': 'Кокшетау', 'lat': 53.2833, 'lng': 69.3833, 'region': 'Акмолинская область'},
    {'name': 'Талдыкорган', 'lat': 45.0167, 'lng': 78.3667, 'region': 'Алматинская область'},
    {'name': 'Экибастуз', 'lat': 51.7264, 'lng': 75.3231, 'region': 'Павлодарская область'},
    {'name': 'Рудный', 'lat': 52.9667, 'lng': 63.1167, 'region': 'Костанайская область'},
    {'name': 'Жезказган', 'lat': 47.7833, 'lng': 67.7000, 'region': 'Карагандинская область'},
    {'name': 'Балхаш', 'lat': 46.8481, 'lng': 74.9950, 'region': 'Карагандинская область'},
    {'name': 'Кентау', 'lat': 43.5167, 'lng': 68.5000, 'region': 'Туркестанская область'},
    {'name': 'Жанаозен', 'lat': 43.3417, 'lng': 52.8583, 'region': 'Мангистауская область'},
]


def _haversine_km(lat1, lon1, lat2, lon2):
    r = 6371.0
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    d_phi = math.radians(lat2 - lat1)
    d_lambda = math.radians(lon2 - lon1)
    a = (math.sin(d_phi / 2) ** 2 +
         math.cos(phi1) * math.cos(phi2) * math.sin(d_lambda / 2) ** 2)
    return 2 * r * math.asin(math.sqrt(a))


def get_nearest_city(latitude, longitude, max_distance_km=150):
    """
    Возвращает (city_name, region) ближайшего города из справочника.

    Если ближайший известный город находится дальше max_distance_km,
    считаем, что точка вне зоны покрытия справочника, и возвращаем
    (None, None), чтобы не присваивать явно неверный город.
    """
    if latitude is None or longitude is None:
        return None, None

    nearest = None
    nearest_distance = None
    for city in KAZAKHSTAN_CITIES:
        distance = _haversine_km(latitude, longitude, city['lat'], city['lng'])
        if nearest_distance is None or distance < nearest_distance:
            nearest = city
            nearest_distance = distance

    if nearest and nearest_distance is not None and nearest_distance <= max_distance_km:
        return nearest['name'], nearest['region']
    return None, None
