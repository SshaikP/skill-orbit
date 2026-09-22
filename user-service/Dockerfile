FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY target/skillorbit-backend.jar skillorbit-backend.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "skillorbit-backend.jar"]
