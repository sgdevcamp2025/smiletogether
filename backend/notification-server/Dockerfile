FROM openjdk:21-jdk

WORKDIR /app

COPY /build/libs/*.jar notification-server.jar

ENTRYPOINT ["java", "-jar", "/app/notification-server.jar"]
