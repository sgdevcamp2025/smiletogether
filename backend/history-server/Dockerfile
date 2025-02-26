FROM openjdk:21-jdk

WORKDIR /app

COPY /build/libs/*.jar history-server.jar

ENV SPRING_DATA_MONGODB_URI=mongodb://rootuser:rootpass@mongodb:27017/history-db?authSource=admin

ENTRYPOINT ["java", "-jar", "/app/history-server.jar"]