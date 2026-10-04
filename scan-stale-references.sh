#!/usr/bin/env bash
set -u

printf '%s\n' '== Stale status and architecture terms =='
git grep -n -i -E 'Azure \(In Progress\)|Kubernetes \(Planned\)|processing-service|Skill Gap Analysis \(upcoming\)|Personalized Learning Plan \(upcoming\)|Daily Engineering Journal|Daily-Engineering-Journal|Kubernetes Readiness|Frontned' || true

printf '%s\n' '== Old documentation paths =='
git grep -n -E 'docs/(01-traditional-deployment|02-containerized-deployment|03-cloud-deployment|04-orchestrated-cloud-deployment|api-docs|setup-guide|sprint-plan)\.md' || true

printf '%s\n' '== Old containerization filenames =='
git grep -n -E 'frontend-docker\.md|backend-docker\.md|docker-compose\.md|docker-commands\.md|container-networking\.md' || true

printf '%s\n' '== Claims requiring implementation evidence =='
git grep -n -i -E 'microservices|production-grade|managed postgresql|ingress|high availability|self-healing' || true

printf '%s\n' '== Tracked environment files =='
git ls-files | grep -E '(^|/)\.env($|\.)' || true

printf '%s\n' '== Markdown files =='
find . -type f -name '*.md' -print | sort

printf '%s\n' '== Git whitespace check =='
git diff --check || true
