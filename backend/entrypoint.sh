#!/bin/sh
set -e

echo ">> Waiting for PostgreSQL at ${DB_HOST:-localhost}:${DB_PORT:-5432}..."
python - <<'PYEOF'
import os
import sys
import time
import psycopg2

host = os.getenv("DB_HOST", "localhost")
port = os.getenv("DB_PORT", "5432")
user = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
dbname = os.getenv("DB_NAME", "asar_db")

for attempt in range(1, 31):
    try:
        conn = psycopg2.connect(
            host=host, port=port, user=user, password=password, dbname=dbname
        )
        conn.close()
        print(">> Database is up")
        sys.exit(0)
    except Exception as e:
        print(f">> Attempt {attempt}/30: DB not ready yet ({e})")
        time.sleep(2)

print(">> Could not connect to database, exiting")
sys.exit(1)
PYEOF

echo ">> Running database migrations (flask db upgrade)..."
flask db upgrade || echo ">> No migrations applied (possibly already up to date)"

echo ">> Starting Gunicorn..."
exec gunicorn \
    -w "${GUNICORN_WORKERS:-4}" \
    -b 0.0.0.0:8000 \
    --access-logfile - \
    --error-logfile - \
    main:app
