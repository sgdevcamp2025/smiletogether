# 1. Gradle 빌드 단계
FROM openjdk:21-jdk-alpine AS builder
WORKDIR /app

# Gradle 실행을 위한 권한 부여 및 복사
COPY gradlew gradlew.bat build.gradle settings.gradle ./
COPY gradle gradle
COPY src src

RUN chmod +x gradlew
RUN ./gradlew bootJar

# 2. 실행 단계
FROM openjdk:21-jdk-alpine
WORKDIR /app

COPY --from=builder /app/build/libs/*.jar gateway-server.jar

ENTRYPOINT ["java", "-jar", "/app/gateway-server.jar"]
