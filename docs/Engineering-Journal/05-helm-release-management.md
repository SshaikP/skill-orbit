# Milestone 5: Helm Release Management

## Goal

Replace repeated standalone Kubernetes manifest handling with a reusable, values-driven release package.

## Starting Point

The application had already been deployed through Kubernetes manifests. The next step was to package those resources as one installable and upgradeable release.

## Implementation Summary

- Created a Helm chart for SkillOrbit
- Converted Kubernetes resources into templates
- Moved environment-specific values into Helm values
- Preserved probes, resources, storage, configuration, and service definitions
- Added chart linting and template rendering checks
- Used Helm upgrade/install for release management
- Validated Kubernetes rollout health after deployment

## Engineering Decisions

- Keep templates reusable and move environment differences into values.
- Keep image repository and tag configurable.
- Render templates before applying them to catch invalid output early.
- Treat Helm deployment success and Kubernetes rollout success as separate checks.

## Validation

```text
helm lint
    -> helm template
    -> helm upgrade --install
    -> helm status
    -> kubectl rollout status
```

## Troubleshooting Lessons

- A syntactically valid chart can still render incorrect workload values.
- A successful Helm command does not guarantee healthy pods.
- Image tag changes must be visible in rendered manifests and live workloads.
- Rollback decisions should use release history and workload evidence.

## Resulting Release

This milestone is represented by release `v1.2.3`, the Helm-based Kubernetes deployment milestone.

## Outcome

SkillOrbit gained a repeatable deployment unit, values-driven configuration, release history, upgrade behavior, and a clear path for CI/CD integration.

## Related Documentation

- Helm chart and values files in the repository
- `docs/Deployment-Strategies/04-orchestrated-cloud-deployment.md`

## Documentation Boundary

This journal records engineering decisions, failures, investigations, and lessons. Current commands and operational procedures belong in `docs/Technical-Documentation`, `docs/Containerization`, and `docs/Deployment-Strategies`.
