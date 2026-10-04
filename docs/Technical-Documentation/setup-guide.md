# 🛠️ SkillOrbit Setup Guide

## Overview

This guide explains how to prepare and run SkillOrbit for local development and containerized validation.

SkillOrbit contains:

- React frontend in `skillorbit-ui`
- Spring Boot backend in `user-service`
- H2 database for the traditional local phase
- PostgreSQL for containerized and orchestrated phases

## Repository Layout

```text
skill-orbit/
├── skillorbit-ui/
├── user-service/
├── docs/
├── docker-compose.yml
└── README.md
```

The repository contents remain the source of truth if paths change.

## Local Development Prerequisites

Install:

- Git
- Java 17 or later
- Maven 3.9 or later, or use the Maven wrapper
- Node.js
- npm

Verify the tools:

```bash
git --version
java -version
mvn -version
node --version
npm --version
```

## Get the Repository

```bash
git clone <repository-url>
cd skill-orbit
```

Use the repository URL from the GitHub project page.

## Run the Backend Locally

Navigate to the backend:

```bash
cd user-service
```

Start with the Maven wrapper when available:

```bash
./mvnw spring-boot:run
```

Alternatively:

```bash
mvn spring-boot:run
```

The traditional local backend is available at:

```text
http://localhost:8080
```

When the H2 console is enabled by the active configuration, it is available at:

```text
http://localhost:8080/h2-console
```

Use datasource values from the active Spring configuration. Do not add production credentials to local documentation.

## Run the Frontend Locally

Open a second terminal and navigate to the frontend:

```bash
cd skillorbit-ui
npm install
npm start
```

The development frontend is available at:

```text
http://localhost:3000
```

## Local Validation

Confirm that:

- The frontend loads
- The backend starts without errors
- The frontend can reach the backend
- Registration and login work
- A valid login returns a JWT
- Protected pages reject unauthenticated access
- Admin and user access remain separated
- Role and skill operations work
- Skill-gap analysis returns results
- Learning recommendations are displayed

## Containerized Setup

### Prerequisites

Install Docker Engine or Docker Desktop with Docker Compose v2.

```bash
docker version
docker compose version
```

### Start the Stack

From the repository location containing `docker-compose.yml`:

```bash
docker compose up --build -d
```

### Validate the Stack

```bash
docker compose ps
docker compose logs --tail=100
```

Follow logs when deeper investigation is required:

```bash
docker compose logs -f
```

### Stop the Stack

Retain named volumes:

```bash
docker compose down
```

Remove named volumes as well:

```bash
docker compose down -v
```

> **Warning:** Removing volumes deletes PostgreSQL data managed by the Compose project.

## Environment Configuration

Environment-specific values should remain outside container images and source code where possible.

Typical settings include:

- Database address and port
- Database name
- Database username and password
- Frontend API address
- Allowed CORS origins
- Active Spring profile
- Registry credentials for automated deployments

### Repository Hygiene

- Do not commit `.env` files containing secrets
- Commit a sanitized `.env.example` when environment variables must be documented
- Do not commit JWTs, cloud credentials, registry tokens, or database passwords
- Review staged changes before committing

```bash
git diff --cached
```

## Build Validation

### Backend

```bash
cd user-service
./mvnw clean test
./mvnw clean package
```

Use equivalent Maven commands if the wrapper is unavailable.

### Frontend

```bash
cd skillorbit-ui
npm install
npm test -- --watchAll=false
npm run build
```

The exact available scripts are defined in the frontend's `package.json`.

## Common Setup Problems

### Frontend Cannot Reach the Backend

Check the frontend API address, backend port, active configuration, and browser console. Confirm that the backend's CORS configuration permits the actual frontend origin.

### Backend Cannot Reach PostgreSQL

Inside Docker or Kubernetes, do not use `localhost` for a database running in another container or pod. Use the service address defined by the deployment configuration.

### Authentication Fails After Login

Check token creation, browser storage, authorization-header attachment, token expiration, and Spring Security logs without printing the token itself.

### Port Already in Use

Identify the process or container using the required port, then stop it or adjust the local configuration intentionally.

### Stale Container Build

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

## Next Steps

After local validation, use the documentation under:

- `docs/Containerization`
- `docs/Deployment-Strategies`
- Kubernetes and Helm documentation in the repository
- CI/CD documentation for automated delivery
