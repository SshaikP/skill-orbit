# 📦 Docker Images

## Overview

SkillOrbit uses separate images for the React frontend and Spring Boot backend. PostgreSQL is supplied through an official database image referenced by Docker Compose.

## Frontend Image

The frontend image produces and serves the React production build.

A multi-stage image normally separates:

1. **Build stage:** installs dependencies and creates the production bundle
2. **Runtime stage:** serves only the compiled static assets

This prevents build tools and source dependencies from being carried into the runtime image.

## Backend Image

The backend image runs the packaged Spring Boot JAR.

A multi-stage image normally separates:

1. **Build stage:** compiles, tests, and packages the application
2. **Runtime stage:** contains the Java runtime and generated JAR

In the automated delivery model, Jenkins builds the backend and frontend artifacts before image packaging. Lean runtime images then consume the prebuilt artifacts instead of rebuilding the source.

## Build Context

Keep Docker build contexts small and predictable. Use `.dockerignore` files to exclude content that is not required by the image build.

Suggested exclusions:

```text
.git
.github
node_modules
target
build
coverage
*.log
.env
.idea
.vscode
```

> Do not exclude an artifact directory when a runtime-only Dockerfile needs to copy a prebuilt artifact from it.

## Image Design Principles

- Use multi-stage builds where compilation occurs inside Docker
- Use minimal, supported runtime images
- Copy only required artifacts into the runtime stage
- Run processes as a non-root user where supported
- Keep credentials and environment-specific values outside the image
- Pin important base-image versions
- Use immutable version or commit-based application tags
- Scan release images before deployment

## Image Tagging

Avoid depending only on `latest`. Prefer traceable tags such as:

```text
skillorbit-frontend:<release-version>
skillorbit-backend:<release-version>
skillorbit-frontend:<git-commit>
skillorbit-backend:<git-commit>
```

Traceable tags make promotion, rollback, and release investigation easier.
