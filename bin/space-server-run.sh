#!/bin/sh

cd ./config/

# 🔥 기존 컨테이너 및 볼륨 삭제
docker-compose down -v

# 1️⃣ Docker Compose 실행
docker-compose -f docker-compose-space-server.yml up -d

# 2️⃣ 모든 컨테이너가 시작될 때까지 대기 (5초)
echo "⏳ Waiting for containers to be ready..."
sleep 5

# 3️⃣ PostgreSQL 컨테이너가 응답할 때까지 대기
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker exec space_db_postgres pg_isready -U myuser -d mydatabase; do
  sleep 2
done

# 4️⃣ SQL 스크립트 실행
echo "🚀 Running SQL script..."
docker exec -i space_db_postgres psql -U myuser -d mydatabase -f /app/script/space_server_init.sql

echo "✅ SQL script executed successfully!"