# 📅 Day 10 — Full Containerization of SkillOrbit (v1.1 Complete System)

---

## 🎯 Goals

- Transition from local development to fully containerized architecture
- Replace H2 database with PostgreSQL
- Containerize backend and database
- Introduce docker-compose for orchestration
- ✅ Containerize frontend and unify entire system

---

## ✅ Work Completed

---

### ✅ 1. Backend Dockerization

---

#### ✅ Dockerfile Created

```dockerfile
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY target/user-service-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

✅ Image Build
Shelldocker build -t skillorbit-backend .Show more lines

✅ Outcome

Backend successfully containerized
Runs independently of local Java setup



✅ 2. PostgreSQL Container Setup

✅ Database Migration

Replaced H2 (in-memory) with PostgreSQL
Enabled persistent database storage


✅ Docker Run Command
Shell
docker run -d \  --name postgres-db \  -e POSTGRES_DB=careerdb \  -e POSTGRES_USER=admin \  -e POSTGRES_PASSWORD=admin123 \  -p 5432:5432 \  -v postgres_data:/var/lib/postgresql/data \  postgres:15Show more lines

✅ Outcome

PostgreSQL container running successfully
Data persists across restarts using volume



✅ 3. Backend → Database Integration

✅ Configuration Changes
.properties
spring.datasource.url=jdbc:postgresql://postgres-db:5432/careerdb
spring.datasource.username=admin
spring.datasource.password=admin123
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

✅ Key Concept

Used container name (postgres-db) for networking
Enabled inter-container communication


✅ 4. docker-compose Orchestration

✅ Created docker-compose.yml
YAML
services:  
 db:    
  image: postgres:15    
  container_name: postgres-db    
  environment:      
   POSTGRES_DB: careerdb      
   POSTGRES_USER: admin      
   POSTGRES_PASSWORD: admin123   
    ports:      - "5432:5432"    
volumes:      - postgres_data:/var/lib/postgresql/data  
 backend:    
  image: skillorbit-backend    
  container_name: skillorbit-backend    
depends_on:      
- db    
ports:      - "8080:8080"
volumes:  postgres_data:

✅ Execution
Shelldocker-compose up -d

✅ Outcome

Multi-container startup simplified
Automatic dependency handling
Consistent environment setup



✅ 5. ✅ Frontend Dockerization (NEW)

✅ Created Frontend Dockerfile
DockerfileFROM node:18 AS buildWORKDIR /appCOPY package*.json ./RUN npm installCOPY . .RUN npm run buildFROM nginx:alpineCOPY --from=build /app/build /usr/share/nginx/htmlEXPOSE 80CMD ["nginx", "-g", "daemon off;"]Show more lines

✅ Built Frontend Image
Shell docker build -t skillorbit-frontend .

✅ Updated docker-compose
YAMLservices:  db:    image: postgres:15    container_name: postgres-db    ...  backend:    image: skillorbit-backend    container_name: skillorbit-backend    ...  frontend:    image: skillorbit-frontend    container_name: skillorbit-frontend    depends_on:      - backend    ports:      - "3000:80"volumes:  postgres_data:Show more lines

✅ API Update
JavaScriptconst BASE_URL = "/api/users";

✅ Outcome

React app fully containerized
Served via NGINX
No local frontend dependency required



✅ 6. Full System Execution

✅ Start Entire Application

Shell docker-compose down
Shell docker-compose up -d

✅ Access Points

Frontend: http://localhost:3000
Backend API: http://localhost:8080/api/users


✅ Verified Functionality

UI loads ✅
User creation ✅
User deletion ✅
Backend API response ✅
PostgreSQL persistence ✅



🚧 Issues Faced & Troubleshooting

❌ Docker Daemon Not Running
✅ Fixed by restarting Docker Desktop

❌ Invalid Base Image
✅ Fixed by using correct image:
DockerfileFROM eclipse-temurin:17-jdkShow more lines

❌ PostgreSQL Container Failure
✅ Fixed by removing corrupt volumes
Shell docker volume rm postgres_data

❌ Volume Naming Issues
✅ Corrected naming mismatch

❌ Backend DB Connection Failure
✅ Fixed:
.propertiesjdbc:postgresql://postgres-db:5432/careerdb

❌ Docker Compose 500 Error
✅ Fixed with:
Shelldocker system prune -a -f 

🧠 Key Learnings

✅ Containerization

Docker image creation
Multi-stage builds
Container lifecycle


✅ Database Management

Migrating to PostgreSQL
Persistent storage via volumes


✅ Networking

Service communication via container names
Avoiding localhost in containers


✅ Orchestration

docker-compose simplifies system management
Multi-container coordination


✅ Full Stack Containerization

Frontend + Backend + Database unified
Independent system deployment

🚀 Final Outcome

✅ Fully containerized 3-tier architecture
✅ Frontend, backend, and database running in Docker
✅ Persistent storage enabled
✅ docker-compose orchestration configured
✅ Production-ready application setup


🔥 System Status (SkillOrbit v1.1 — COMPLETE)
Frontend (Docker - NGINX)
        ↓
Backend (Docker - Spring Boot)
        ↓
PostgreSQL (Docker + Volume)



✅ Alignment with Project Vision
Day 10 successfully transformed the project into:
✅ Fully containerized platform
✅ Portable and environment-independent system
✅ DevOps-ready architecture
