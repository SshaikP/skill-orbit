# Milestone 1: Application Foundation

## Goal

Build a functional SkillOrbit baseline before introducing infrastructure automation.

## Starting Point

The project began as a three-tier career-transition application with a React frontend, Spring Boot backend, and H2 database for local development.

## Implementation Summary

The milestone established:

- User registration and login
- JWT-based authentication
- Role-based access control
- Administrator management of users, roles, skills, and learning paths
- User selection of current and target roles
- Skill self-assessment
- Skill-gap calculation
- Free and premium learning-roadmap recommendations

## Engineering Decisions

- Keep business logic in the backend rather than the browser.
- Enforce authorization through Spring Security, not only through frontend visibility.
- Model roles, skills, assessments, and roadmaps as explicit relationships.
- Use the local deployment as a functional baseline for later infrastructure changes.

## Problems Encountered

### Frontend and Backend Contract Mismatch

Client request paths and backend mappings must remain aligned. Incorrect paths or response expectations caused integration failures during the local phase.

### JWT Propagation

Protected operations required consistent token creation, storage, authorization-header attachment, validation, and role enforcement.

### Data Relationships

Role-to-skill and skill-to-learning-path relationships required a clear data model before meaningful analysis could be produced.

## Validation

The milestone was considered complete when authentication, authorization, administrator workflows, role selection, assessment, analysis, and roadmap display worked together through the UI.

## Outcome

This phase proved the product flow. Its main limitation was dependency on host-installed runtimes and local configuration, which motivated containerization.

## Related Documentation

- `docs/Technical-Documentation/setup-guide.md`
- `docs/Technical-Documentation/api-docs.md`
- `docs/Deployment-Strategies/01-traditional-deployment.md`

## Documentation Boundary

This journal records engineering decisions, failures, investigations, and lessons. Current commands and operational procedures belong in `docs/Technical-Documentation`, `docs/Containerization`, and `docs/Deployment-Strategies`.
