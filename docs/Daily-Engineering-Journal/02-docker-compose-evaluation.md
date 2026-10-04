# Milestone 2: Docker Compose Evolution

## Goal

Package SkillOrbit as a reproducible multi-container application.

## Architecture Change

The React frontend, Spring Boot backend, and PostgreSQL database moved into separate containers managed by Docker Compose. PostgreSQL replaced the local H2 database for the containerized runtime.

## Implementation Summary

- Created independent frontend and backend images
- Added PostgreSQL as a runtime dependency
- Connected services through an isolated Compose network
- Externalized environment-specific configuration
- Added persistent database storage
- Added database health and dependency handling

## Key Investigation: `localhost`

Inside a container, `localhost` refers to that same container. The backend therefore had to use the PostgreSQL service address defined by Compose rather than a host-local address.

Browser-side JavaScript created a second networking boundary. The browser could not automatically resolve an internal Compose service name, so the frontend required a host-reachable API address or proxy.

## Key Investigation: CORS

Container connectivity did not guarantee browser access. The backend's allowed origin had to match the frontend's actual protocol, host, and port.

## Key Investigation: False-Healthy Database

A running PostgreSQL process did not prove that the backend could connect with the intended database and user. The health check needed to validate the same dependency assumptions used by the application.

## Validation

- All Compose services reached the intended state
- Backend connected to PostgreSQL through the Compose network
- Browser API calls reached the backend
- Authentication and authorization continued to work
- Data survived normal container recreation

## Outcome

The deployment became portable and repeatable, while exposing important distinctions between process health, application readiness, container networking, and browser networking.

## Related Documentation

- `docs/Containerization/README.md`
- `docs/Containerization/04-networking-and-configuration.md`
- `docs/Containerization/05-troubleshooting.md`
- `docs/Deployment-Strategies/02-containerized-deployment.md`

## Documentation Boundary

This journal records engineering decisions, failures, investigations, and lessons. Current commands and operational procedures belong in `docs/Technical-Documentation`, `docs/Containerization`, and `docs/Deployment-Strategies`.
