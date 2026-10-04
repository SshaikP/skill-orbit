# 📅 SkillOrbit Engineering Plan

## Purpose

This document organizes SkillOrbit development into verifiable engineering milestones. Each milestone should produce a working release, updated documentation, and evidence that the defined acceptance criteria were met.

## Delivery Principles

- Keep application build, image packaging, and runtime deployment separate
- Store environment-specific configuration outside images
- Use versioned releases and immutable image tags
- Validate every deployment before promoting it
- Document failures, root causes, and recovery steps
- Keep credentials out of source control
- Treat repository configuration as the implementation source of truth

## Milestone 1: Functional Local Application

### Scope

- React frontend
- Spring Boot backend
- H2 database
- JWT authentication
- Role-based authorization
- Administrator workflows
- User skill assessment
- Skill-gap analysis
- Learning-roadmap generation

### Acceptance Criteria

- Frontend and backend start locally
- Authentication returns a usable JWT
- Protected routes reject unauthorized access
- Administrator and user capabilities remain separated
- Role and skill data can be managed
- Skill-gap analysis produces expected output
- Learning recommendations are visible in the UI

### Documentation

- Local setup guide
- API domain documentation
- Traditional deployment strategy

## Milestone 2: Docker Compose Deployment

### Scope

- Frontend image
- Backend image
- PostgreSQL container
- Docker Compose orchestration
- Isolated networking
- Runtime environment configuration
- Persistent database storage
- Service health checks

### Acceptance Criteria

- The stack starts using Docker Compose
- All services reach the expected state
- Backend connects to PostgreSQL through the Compose network
- The browser can reach the backend
- CORS allows the intended frontend origin
- Application data survives normal container recreation
- Secrets are not embedded in images or committed files

### Documentation

- Containerization overview
- Image documentation
- Docker Compose operations
- Networking and configuration
- Troubleshooting guide

## Milestone 3: AWS Infrastructure with Terraform

### Scope

- Reusable Terraform modules
- Environment-specific infrastructure configuration
- S3 remote state
- DynamoDB state locking
- Cross-stack state references
- AWS networking and security configuration
- Application deployment to AWS resources
- Monitoring and teardown validation

### Acceptance Criteria

- Terraform formatting and validation pass
- Plans contain only expected changes
- State is stored in the configured remote backend
- Concurrent operations are protected by locking
- Application components communicate through intended network paths
- Access rules expose only required traffic
- Teardown follows dependency order
- No unintended cost-generating resources remain after cleanup

### Documentation

- AWS deployment strategy
- Terraform state-management notes
- Provisioning and teardown runbook
- Incident and remediation journal

## Milestone 4: Kubernetes Deployment

### Scope

- Local `kind` cluster
- Deployments and Services
- ConfigMaps and Secrets
- PostgreSQL persistent storage
- Startup, readiness, and liveness probes
- CPU and memory requests and limits
- Metrics Server
- Horizontal Pod Autoscaler

### Acceptance Criteria

- Workloads reach a stable ready state
- Services route traffic to the expected pods
- Configuration is externalized
- PostgreSQL data survives pod replacement
- Probes reflect actual application health
- Resource metrics are available
- HPA reads metrics and targets the intended workload
- Common pod failures can be diagnosed from logs, events, and metrics

### Documentation

- Kubernetes architecture
- Resource manifest guide
- Probe and resource-management notes
- Troubleshooting records

## Milestone 5: Helm Packaging

### Scope

- Reusable Helm chart
- Values-driven configuration
- Templated Kubernetes resources
- Release installation and upgrade
- Release validation and rollback awareness

### Acceptance Criteria

- `helm lint` succeeds
- Rendered templates match the expected resources
- The release installs or upgrades successfully
- Environment-specific values can be changed without editing templates
- Rollout status is validated
- Release history is available for investigation

### Release Marker

The Helm-based Kubernetes deployment milestone is associated with release `v1.2.3`.

## Milestone 6: Jenkins CI/CD Integration

### Scope

- Build the Spring Boot JAR
- Build the React production assets
- Build lean runtime images from prebuilt artifacts
- Scan images with Trivy
- Push images to GHCR
- Reconcile registry credentials for Kubernetes
- Deploy through Helm
- Validate rollout health

### Acceptance Criteria

- Source is compiled once per pipeline run
- Runtime images consume pipeline-built artifacts
- Image scanning runs before promotion
- Versioned images are published successfully
- Kubernetes can pull the images
- Helm deployment completes successfully
- Failed rollout validation fails the pipeline
- Deployment logs identify the released image versions

### Release Marker

The Jenkins-integrated CI/CD milestone is associated with release `v1.3.0`.

## Quality Gates

Every milestone should satisfy these gates before it is considered complete:

### Code

- Backend tests pass
- Frontend tests and production build pass
- Configuration changes are reviewed

### Security

- No secrets are committed
- Images are scanned when part of the delivery stage
- Authorization is enforced by the backend
- Registry and cloud credentials use the minimum required access

### Deployment

- The target environment reaches the expected health state
- Logs show no unexplained startup failures
- Rollout validation succeeds
- Recovery or rollback steps are documented

### Documentation

- Setup and deployment instructions match the repository
- Architecture diagrams reflect the implemented flow
- Commands are safe and scoped
- Destructive commands include warnings
- Known issues include diagnosis and resolution

## Future Backlog

Potential future work should remain separate from completed milestones until implemented and validated. Candidate areas include:

- Centralized application logging
- Expanded metrics and alerting
- External secret management
- Managed Kubernetes deployment
- Automated integration and end-to-end testing
- Policy checks for infrastructure and Kubernetes manifests
- Progressive delivery strategies
- Disaster-recovery validation

## Definition of Done

A SkillOrbit milestone is done when:

1. The implementation is committed and versioned.
2. Automated or repeatable validation passes.
3. The deployment reaches the expected health state.
4. Security-sensitive values remain outside source control.
5. Documentation matches the implemented behavior.
6. Known limitations and recovery steps are recorded.
