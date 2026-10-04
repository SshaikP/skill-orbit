# Milestone 4: Kubernetes Evolution

## Goal

Move SkillOrbit from individually managed containers to declarative, orchestrated workloads.

## Implementation Summary

- Created a local `kind` cluster
- Deployed frontend, backend, and PostgreSQL workloads
- Added Services for stable networking
- Externalized configuration through ConfigMaps and Secrets
- Added PostgreSQL persistence
- Configured startup, readiness, and liveness probes
- Added CPU and memory requests and limits
- Installed Metrics Server
- Configured Horizontal Pod Autoscaling

## Engineering Decisions

- Readiness controls traffic eligibility; liveness controls restart behavior.
- Requests affect scheduling; limits constrain consumption.
- PostgreSQL storage must outlive an individual pod.
- Autoscaling requires observable metrics and appropriate resource requests.

## Troubleshooting Lessons

### `ImagePullBackOff`

Validate image names, immutable tags, registry access, and image pull credentials.

### `CrashLoopBackOff`

Inspect pod events, current logs, previous logs, runtime configuration, dependency availability, and probe settings.

### `OOMKilled`

Compare observed memory usage with the configured limit before deciding whether to tune the application or adjust resources.

### Probe Failures

Validate the exact path, port, startup duration, status response, and threshold configuration.

### Missing HPA Metrics

Confirm Metrics Server health, resource requests, and the HPA target.

## Validation

- Pods reached Ready state
- Services routed traffic correctly
- Configuration was not embedded in images
- PostgreSQL data survived pod replacement
- Metrics were visible
- HPA could read its target metrics

## Outcome

Kubernetes added desired-state reconciliation, health-based traffic routing, restart behavior, resource controls, storage lifecycle management, and autoscaling.

## Related Documentation

- `docs/Deployment-Strategies/04-orchestrated-cloud-deployment.md`
- Kubernetes manifests in the repository

## Documentation Boundary

This journal records engineering decisions, failures, investigations, and lessons. Current commands and operational procedures belong in `docs/Technical-Documentation`, `docs/Containerization`, and `docs/Deployment-Strategies`.
