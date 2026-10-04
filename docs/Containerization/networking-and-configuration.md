# 🌐 Networking and Configuration

## Compose Network

Docker Compose creates a project network for the SkillOrbit services. Containers attached to this network can resolve one another by their Compose service names.

```text
Browser -> published frontend address
Browser -> published backend address or frontend proxy
Backend -> PostgreSQL service name and container port
```

## Internal and Published Ports

A container port is used inside the Docker network. A published port maps a container port to the host so that a browser or host-side client can reach the service.

Container-to-container communication should use service names and container ports. Browser traffic must use a host-reachable address.

## Backend-to-Database Communication

The datasource URL must use the PostgreSQL Compose service name, not `localhost`.

Conceptual example:

```text
jdbc:postgresql://postgres:5432/<database-name>
```

Replace the service name, port, and database name with the values defined in the repository.

## Frontend-to-Backend Communication

React code executes in the user's browser. Therefore, an internal Docker service name that resolves inside the Compose network may not resolve in the browser.

Use one of these patterns:

1. Publish the backend port and configure a browser-reachable API URL
2. Proxy API requests through the frontend web server
3. Route both services through a common host name or ingress layer

## CORS

The backend's allowed origin must match the browser's actual frontend origin, including:

- Protocol
- Hostname
- Port

For example, addresses using different ports are different origins. Avoid unrestricted production CORS settings merely to bypass a configuration mismatch.

## Environment-Specific Values

Keep these values outside the image where possible:

- Database host and port
- Database name and credentials
- Frontend API address
- Allowed CORS origins
- Spring profile
- Logging level
- Tokens and application secrets

External configuration allows the same image to move between environments without being rebuilt.

## Secret Handling

- Do not commit real credentials
- Do not bake secrets into Dockerfiles or image layers
- Keep local `.env` files out of version control
- Commit only a sanitized `.env.example`
- Use environment-appropriate secret management for shared deployments
