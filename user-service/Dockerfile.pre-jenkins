# =====================================
# ✅ STAGE 1 — BUILD THE APPLICATION
# =====================================

# ✅ lightweight base image
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder   

# ✅ STEP 1 — Set working directory
WORKDIR /app

# ✅ STEP 2 — Copy only pom.xml first (for dependency caching)
COPY pom.xml .

# ✅ STEP 3 — Download dependencies (cached layer)
RUN mvn dependency:go-offline -B

# ✅ STEP 4 — Copy full project source
COPY src ./src

# ✅ STEP 5 — Build JAR (skip tests for speed)
RUN mvn clean package -DskipTests

# =====================================
# ✅ STAGE 2 — RUN THE APPLICATION
# =====================================

# ✅ smaller than full JDK
FROM eclipse-temurin:17-jre-alpine   

# ✅ STEP 6 — Set working directory
WORKDIR /app

# ✅ STEP 7 — Copy built JAR from builder
COPY --from=builder /app/target/*.jar app.jar

# ✅ STEP 8 — Expose application port
EXPOSE 8080

# ✅ STEP 9 — Run Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]