FROM openjdk:21-jdk

WORKDIR /app

COPY /build/libs/*.jar member-server.jar

ENTRYPOINT ["java", "-jar", "/app/member-server.jar"]
