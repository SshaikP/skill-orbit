
# 🐳 Day 12 — Dockerization & Environment Configuration

## ✅ Objective
Containerize the full-stack application:
- Backend (Spring Boot)
- Frontend (React + Nginx)
- Database (PostgreSQL)

---

## 🧱 Architecture
Frontend (Nginx)
↓
Backend (Spring Boot)
↓
PostgreSQL (Docker)

---

## ✅ Work Done

### ✅ Backend Containerization
- Multi-stage Docker build
- Maven build inside container
- JAR execution via OpenJDK

---

### ✅ Frontend Containerization
- React build stage (Node)
- Served using Nginx
- Configured API proxy via nginx.conf

---

### ✅ Database Setup
- PostgreSQL container
- Persistent storage using volumes

---

### ✅ Docker Compose Orchestration
- Defined services:
  - postgres-db
  - backend
  - frontend
- Network configuration for service communication

---

## ✅ Environment Configuration

Implemented environment-based configuration:

| Environment | DB |
|------------|----|
| Local | H2 |
| Docker | PostgreSQL |

---

### ✅ Profiles Used

```properties
SPRING_PROFILES_ACTIVE=local
SPRING_PROFILES_ACTIVE=docker


✅ Env Variables Added
ShellDB_URLDB_USERNAMEDB_PASSWORD``Show more lines

✅ Frontend API Handling
JavaScriptconst BASE_URL = process.env.REACT_APP_API_URL || ""``Show more lines
Supports:

Local development
Docker networking
Future cloud deployment

🧪 Troubleshooting & Learnings
❌ Issue 1 — Backend Container 404 on /api
Problem:
Testing /api endpoint returned 404
Root Cause:
Endpoint doesn’t exist
Fix:

Tested correct endpoints:
/api/users
/api/analysis




❌ Issue 2 — curl Malformed URL Error
Problem:
curl: (3) URL rejected

Root Cause:
Used &amp; instead of &
Fix:

Corrected to:
&currentSkills=Java




❌ Issue 3 — Empty Response from Backend
Problem:
Frontend showed error despite 200 OK
Root Cause:
Backend returning empty or unserializable response
Fix:

Ensured proper Map response
Used:
JavaResponseEntity<Map<String, Object>>Show more lines

Forced structured JSON output


❌ Issue 4 — JSON Parsing Failure
Problem:
Frontend failed at response.json()
Fix:

Added fallback handling
Ensured backend always returns valid JSON


❌ Issue 5 — DB Connection Issues
Problem:
Backend couldn’t connect to PostgreSQL
Root Cause:
Incorrect host (localhost inside container)
Fix:

Updated to:
postgres-db ✅




❌ Issue 6 — Frontend API Failure Inside Docker
Problem:
Frontend couldn’t reach backend
Fix:

Configured Nginx reverse proxy:
Nginx Configlocation /api/ {    proxy_pass http://backend:8080/api/;}Show more lines



✅ Testing
✅ Backend API Test
Shelldocker exec -it skillorbit-backend curl http://localhost:8080/api/usersShow more lines

✅ Full System Test
http://localhost:3000


✅ User creation works
✅ Analysis works
✅ Charts render

✅ Outcome

Fully containerized system
Environment-driven configuration
Production-ready architecture
Debug-ready system