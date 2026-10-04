# 🏗️ Container Architecture

## Overview

SkillOrbit uses a three-tier container architecture. Docker Compose manages the frontend, backend, and database services as one application stack while preserving clear service boundaries.

## Request Flow

```text
User Browser
     |
     | HTTP
     v
React Frontend
     |
     | REST API
     v
Spring Boot Backend
     |
     | JDBC
     v
PostgreSQL Database
```

## Service Responsibilities

### Frontend

The frontend serves the compiled React application and provides the SkillOrbit user interface. Browser-side code sends API requests to the backend.

### Backend

The Spring Boot backend exposes the application APIs and handles authentication, authorization, role and skill management, assessments, skill-gap analysis, learning-roadmap generation, and database access.

### PostgreSQL

PostgreSQL stores persistent SkillOrbit data. A Docker-managed volume preserves the data when containers are recreated.

## Container Boundaries

Each service has its own process, filesystem, runtime, and dependencies. Services communicate through the Docker Compose network instead of directly sharing a host runtime.

## Service Discovery

Docker Compose provides DNS-based service discovery. Containers reach one another using the service names declared in the Compose file.

For example, the backend should connect to the PostgreSQL service name rather than `localhost`.

## Important `localhost` Rule

Inside a container, `localhost` refers to that container itself. It does not refer to another container or automatically refer to the host machine.

Browser traffic is different. React code runs in the user's browser, so the API address must be reachable from the host environment. An internal Docker service name is not automatically resolvable by the browser.

## Persistence

The PostgreSQL data directory is attached to a named volume. Container replacement therefore does not automatically remove database data. The data is removed only when the associated volume is explicitly deleted.
