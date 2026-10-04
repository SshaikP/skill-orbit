# Milestone 3: AWS and Terraform Evolution

## Goal

Provision and manage the SkillOrbit cloud environment through repeatable infrastructure as code.

## Implementation Summary

- Built reusable Terraform modules
- Stored Terraform state remotely in S3
- Used DynamoDB locking to protect state operations
- Connected stacks through remote-state references
- Used `for_each` where repeated infrastructure patterns were required
- Versioned reusable modules through Git tags
- Applied AWS networking, access, storage, compute, database, and monitoring concepts

## Engineering Decision: Remote State

Remote state separated infrastructure records from one workstation and supported controlled changes. Locking reduced the risk of concurrent state modification.

## Incident: Teardown Dependency Failure

A versioned S3 bucket retained noncurrent object versions, which blocked deletion even after visible current objects were removed. Teardown order also mattered because destroying backend resources too early could interfere with state and lock handling.

## Resolution Pattern

- Preserve the state backend until dependent stacks are removed
- Inspect versioned buckets for current and noncurrent objects
- Remove blocking object versions deliberately
- Verify state-lock release
- Reconcile Terraform state after manual remediation
- Check for residual cost-generating resources

## Validation

- Terraform formatting and validation passed
- Plans showed only expected changes
- State was stored in the configured backend
- Locking protected state operations
- Application paths used intended network controls
- Teardown left no unintended infrastructure

## Outcome

This milestone added infrastructure repeatability and state governance. It also demonstrated that safe destruction is an engineering workflow, not simply a final command.

## Related Documentation

- `docs/Deployment-Strategies/03-cloud-deployment.md`
- Terraform README and backend configuration in the repository

## Documentation Boundary

This journal records engineering decisions, failures, investigations, and lessons. Current commands and operational procedures belong in `docs/Technical-Documentation`, `docs/Containerization`, and `docs/Deployment-Strategies`.
