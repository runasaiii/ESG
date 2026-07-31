# ASAR Platform

Платформа для экстренной помощи и обмена ресурсами

## Требования

- Docker Desktop (с Docker Compose v2)
- Git

Устанавливать Python, Node.js или PostgreSQL локально **не нужно** — всё поднимается через Docker.

## Структура проекта

```
ESG/
├── backend/
│   ├── Dockerfile
│   ├── entrypoint.sh
│   ├── .dockerignore
│   ├── .env              ← создаётся из .env.example, см. ниже
│   └── ...
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env              ← создаётся из .env.example, см. ниже
│   ├── next.config.js
│   └── ...
├── docker-compose.yml
└── .env                  ← создаётся из .env.example, читает docker-compose
```

## Быстрый старт

### 1. Проверить Docker

```bash
docker --version
docker compose version
```

Если команды не найдены — поставить [Docker Desktop](https://www.docker.com/products/docker-desktop/) и перезапустить терминал.

### 2. Настроить переменные окружения

В проекте **три отдельных `.env` файла** — не один общий:

| Файл | Кто читает | Назначение |
|---|---|---|
| `ESG/.env` | сам `docker-compose.yml` | credentials для контейнера БД |
| `ESG/backend/.env` | контейнер `asar-backend` | Flask-конфиг, подключение к БД, токены |
| `ESG/frontend/.env` | контейнер `asar-frontend` (на этапе сборки) | публичные переменные для Next.js |

Создайте их из шаблона:

**Windows (PowerShell), из корня `ESG/`:**
```powershell
Copy-Item .env.example .env
Copy-Item .env.example backend\.env
New-Item frontend\.env
```

**Linux/Mac:**
```bash
cp .env.example .env
cp .env.example backend/.env
touch frontend/.env
```

Затем заполните каждый файл:

**`ESG/.env`** (корень):
```env
DB_USER=asar_user
DB_PASSWORD=придумайте_пароль
DB_NAME=asar_db
```

**`ESG/backend/.env`**:
```env
SECRET_KEY=придумайте_случайную_строку
DB_USER=asar_user
DB_PASSWORD=тот_же_пароль_что_в_корневом_.env
DB_HOST=asar-db
DB_PORT=5432
DB_NAME=asar_db
TELEGRAM_BOT_TOKEN=токен_от_BotFather
WEB_APP_URL=http://localhost:3000
FLASK_DEBUG=False
```
⚠️ `DB_USER`, `DB_PASSWORD`, `DB_NAME` должны **совпадать** во всех трёх файлах — иначе Postgres не создаст роль, под которой backend пытается подключиться.

⚠️ `DB_HOST=asar-db` — это имя сервиса из `docker-compose.yml`, а не `localhost`: контейнеры внутри compose общаются по именам сервисов.

**`ESG/frontend/.env`**:
```env
NEXT_PUBLIC_API_URL=http://asar-backend:8000
```

### 3. Создать общую docker-сеть

```bash
docker network create shared-network
```
(если уже существует — команда просто вернёт ошибку, это нормально, можно игнорировать)

### 4. Собрать и поднять контейнеры

```bash
docker compose build
docker compose up -d
```

Первая сборка фронтенда — самая долгая (npm install + build), 3–5 минут.

### 5. Проверить, что всё живое

```bash
docker compose ps
```
Ожидаем 4 контейнера (`asar-db`, `asar-backend`, `asar-bot`, `asar-frontend`) в статусе `Up`.

Если что-то не поднялось:
```bash
docker compose logs -f asar-backend
docker compose logs -f asar-frontend
```

### 6. Проверить миграции БД

При старте `asar-backend` `entrypoint.sh` автоматически прогоняет `flask db upgrade`. Проверить вручную:
```bash
docker compose exec asar-backend flask db upgrade
docker compose exec asar-db psql -U asar_user -d asar_db -c "\dt"
```

### 7. Открыть в браузере

Приложение работает под basePath **`/asar`**:

**http://localhost:3000/asar**

## basePath: как это устроено

Next.js собран с `basePath = '/asar'` (управляется переменной `NEXT_BASE_PATH`, задаётся как build-arg в `docker-compose.yml` для сервиса `asar-frontend`). Это значение должно быть доступно **и на этапе сборки, и в рантайм-стадии Dockerfile** (multi-stage сборки не наследуют `ENV` между стадиями — прописывайте `ARG`/`ENV` в каждой стадии, где переменная нужна).

Клиентский код (`lib/api.ts`) формирует URL для API-запросов с учётом basePath через `NEXT_PUBLIC_BASE_PATH` — не хардкодьте `/api/...` без префикса, иначе запросы 404-ят при проксировании через `rewrites()`.

## Частые проблемы

### ChunkLoadError / 404 на `_next/static/chunks/*.js`
Обычно значит, что в контейнер не попал `next.config.js` (проверьте, что он копируется в `runner`-стадию Dockerfile), либо basePath не был передан на этапе сборки. См. раздел про basePath выше.

### `role "asar_user" does not exist`
Postgres создаёт пользователя/базу **только при первой инициализации volume**. Если раньше поднимали БД с другими credentials — volume уже проинициализирован под старые. Решение (для локальной разработки, где не жалко данных):
```bash
docker compose down -v
docker compose up -d
```

### `relation "X" already exists` при миграциях
Рассинхрон между `alembic_version` и реальным состоянием схемы — обычно решается тем же пересозданием volume, что и выше.

### 500 на API-запросах после успешного логина/старта
Смотрите живые логи backend в момент запроса:
```bash
docker compose logs --tail=100 -f asar-backend
```

## Локальная разработка без Docker (опционально)

Если нужно быстро дебажить фронт или бэк по отдельности без пересборки контейнеров:

**Backend:**
```bash
cd backend
pip install -r requirements.txt
# .env должен указывать DB_HOST=localhost и порт вашей локальной/проброшенной БД
python main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Учтите: при локальном `npm run dev` basePath из Docker-сборки не действует, приложение будет на `http://localhost:3000` без `/asar`.

## Telegram-бот

Бот поднимается как отдельный сервис `asar-bot` в том же `docker-compose.yml`. Токен берётся из `backend/.env` (`TELEGRAM_BOT_TOKEN`). Логи:
```bash
docker compose logs -f asar-bot
```

### Функционал бота
- `/start` — авторизация и начало работы
- `/create` — создание заявки
- `/sos` — экстренная ситуация
- `/resources` — просмотр точек ресурсов
- `/help` — справка

## Погасить всё

```bash
docker compose down
```
Добавьте `-v`, если нужно также удалить данные БД (volume):
```bash
docker compose down -v
```

## Функционал

### Для пользователей:
- Просмотр карты с точками интереса (ЧП, ресурсы, медикаменты)
- Создание заявок через веб-интерфейс или Telegram бота
- Отклик на заявки других пользователей
- Система рейтингов и бейджей
- SOS функционал для экстренных ситуаций
- Привязка Telegram аккаунта для работы через бота

### Для модераторов:
- Модерация заявок (одобрение/отклонение)
- Статистика и аналитика
- Управление пользователями
- Создание новых администраторов (только супер-админ)