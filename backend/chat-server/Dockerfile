FROM openjdk:21-jdk

WORKDIR /app

COPY /build/libs/*.jar chat-server.jar

ENTRYPOINT ["java", "-jar", "/app/chat-server.jar"]
