# 🛠️ Containerization Troubleshooting

## Diagnostic Order

Use the following order when the SkillOrbit stack fails:

1. Container state
2. Container logs
3. Health-check output
4. Runtime environment variables
5. Docker DNS and network attachment
6. Published ports
7. Browser developer-console errors
8. Database credentials and persisted state

## Check Container State

```bash
docker compose ps
docker compose ps -a
```

## Review Logs

```bash
docker compose logs --tail=200
docker compose logs --tail=200 backend
docker compose logs --tail=200 frontend
docker compose logs --tail=200 postgres
```

## Backend Cannot Reach PostgreSQL

Typical symptoms include connection refusal, host-resolution failure, authentication errors, or Spring Boot startup failure.

Verify that:

- PostgreSQL is running
- The backend uses the PostgreSQL service name instead of `localhost`
- The database, username, and password match
- Both services are attached to the same Compose network
- The backend uses the database container port

## Misleading Database Health Check

A running PostgreSQL process does not guarantee that the application can connect using its configured database and credentials.

The health check should validate the intended user and database. Dependency ordering alone does not prove application readiness.

## CORS Failure

Typical symptoms:

- The frontend loads
- Direct backend access may work
- Browser API calls fail
- The browser console reports a CORS policy error

Compare the frontend origin with the backend's allowed origins. Check protocol, hostname, and port.

## Frontend Uses an Internal Docker Address

If browser-side code calls an internal Compose service name, containers may resolve it but the browser may not.

Use a host-reachable backend address or proxy API traffic through the frontend server.

## Inspect the Network

```bash
docker network ls
docker network inspect <network-name>
```

Confirm that the expected SkillOrbit containers are attached to the same network.

## Inspect a Container

```bash
docker inspect <container-name>
```

Review environment variables, network attachment, port bindings, mounts, health-check output, and restart count.

## Clean Rebuild

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

To remove persisted database data as well:

```bash
docker compose down -v
docker compose up --build -d
```

> Use the volume-removal command only when deleting the database data is acceptable.

## Lessons Captured

- `localhost` inside a container refers to that container
- Browser networking differs from container networking
- A running container is not necessarily a ready application
- Health checks must validate the dependency the application actually uses
- Frontend build-time variables may require an image rebuild
- Volumes can preserve stale database state across container recreations
