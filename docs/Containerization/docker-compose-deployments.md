# 🚀 Docker Compose Deployment

## Overview

Docker Compose runs the SkillOrbit frontend, backend, and PostgreSQL services as a single application stack.

Compose manages:

- Image builds or image pulls
- Service startup
- Application networking
- Runtime environment variables
- Host port publishing
- Persistent volumes
- Configured health checks
- Service dependencies

## Prerequisites

Install Docker Engine or Docker Desktop with Docker Compose v2.

Verify the installation:

```bash
docker version
docker compose version
```

## Start the Stack

From the directory containing the Compose file:

```bash
docker compose up --build -d
```

## Validate the Deployment

```bash
docker compose ps
docker compose logs --tail=100
```

Follow logs for a specific service:

```bash
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f postgres
```

> If the repository uses different Compose service names, use those names in the commands.

## Rebuild One Service

```bash
docker compose build backend
docker compose up -d backend
```

## Stop the Stack

```bash
docker compose down
```

This removes the Compose containers and network while retaining named volumes.

## Reset the Environment

```bash
docker compose down -v
docker compose up --build -d
```

> Use this only when the PostgreSQL data can be deleted.

## Runtime Configuration

Supply environment-specific values through Compose environment variables or an ignored local environment file. Commit an example environment file containing variable names but no real credentials.

Example placeholders:

```dotenv
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
```

The committed variable names must match the Compose file and Spring Boot configuration.

## Deployment Validation Checklist

- All services appear in `docker compose ps`
- PostgreSQL reports the expected health state
- Backend starts without datasource errors
- Frontend loads from the published host port
- Browser API requests reach the backend
- Data remains available after a normal container restart
