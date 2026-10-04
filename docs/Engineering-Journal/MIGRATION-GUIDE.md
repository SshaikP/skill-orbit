# Daily Journal Migration Guide

## Important Limitation

The individual legacy `day-*.md` files were not available for line-by-line inspection while this package was prepared. Therefore, do not delete a specific legacy file solely because of this guide. Classify each file using the rules below and review its staged diff before committing.

## Target Structure

```text
docs/Engineering-Journal/
├── README.md
├── 01-application-foundation.md
├── 02-docker-compose-evolution.md
├── 03-aws-terraform-evolution.md
├── 04-kubernetes-evolution.md
├── 05-helm-release-management.md
├── 06-jenkins-cicd-automation.md
└── archive/
    └── day-*.md
```

## Archive a Legacy File When

Archive unchanged if it contains at least one unique item:

- Exact error output that explains an investigation
- A failed assumption and how it was disproved
- A root-cause analysis
- A recovery sequence or incident timeline
- Evidence behind an architectural decision
- A useful before-and-after configuration comparison

Add this banner to the archive README, not to every historical file:

> Archived notes are historical and may contain superseded commands. Use current technical and deployment documentation for operations.

## Edit and Merge When

Extract the useful lesson into the matching milestone document when a daily file contains:

- A meaningful problem buried in raw command history
- Repeated attempts that can be summarized as investigation steps
- A final fix without a clearly stated root cause
- A decision that affected the later architecture

After the lesson is captured, archive the original only if its raw evidence remains useful.

## Remove When

Delete from the active branch when a file contains only:

- Empty headings or placeholders
- Generic copied theory with no SkillOrbit application
- Commands already maintained in current setup or deployment guides
- Duplicate screenshots with no explanation
- Temporary to-do lists that are already complete
- Broken links with no historical value
- Generated logs or build output
- Secrets, tokens, passwords, private keys, or sensitive configuration

For sensitive content, remove it from the current branch immediately and rotate the exposed credential. If the repository was public, normal deletion does not erase Git history; use an appropriate history-cleaning process when required.

## Classification Worksheet

For each legacy file, record:

```text
File:
Primary topic:
Unique troubleshooting evidence: yes/no
Duplicates current documentation: yes/no
Contains obsolete commands: yes/no
Contains sensitive data: yes/no
Decision: archive / merge then archive / remove
Destination milestone:
Reason:
```

## Suggested Mapping by Content

| Legacy content | Destination |
|---|---|
| React, Spring Boot, H2, JWT, RBAC | `01-application-foundation.md` |
| Dockerfiles, Compose, PostgreSQL, CORS | `02-docker-compose-evolution.md` |
| AWS, Terraform, state, teardown | `03-aws-terraform-evolution.md` |
| kind, manifests, probes, HPA | `04-kubernetes-evolution.md` |
| Helm chart, values, release `v1.2.3` | `05-helm-release-management.md` |
| Jenkins, Trivy, GHCR, release `v1.3.0` | `06-jenkins-cicd-automation.md` |

## Safe Migration Procedure

```bash
git checkout -b docs/engineering-journal-cleanup
mkdir -p docs/Engineering-Journal/archive
```

Copy the new milestone files, then move legacy notes selected for preservation:

```bash
git mv docs/Daily-Engineering-Journal/day-*.md docs/Engineering-Journal/archive/
```

Review references before removing the old folder:

```bash
git grep -n 'Daily-Engineering-Journal\|day-[0-9]'
```

Update links in the repository README and documentation index. Then review all changes:

```bash
git status
git diff --check
git diff --stat
git diff
```

After review:

```bash
git add docs README.md
git diff --cached
git commit -m 'docs: consolidate SkillOrbit engineering journal'
```

## Exact Recommendation

- Keep all six milestone documents active.
- Keep one journal README active.
- Keep a legacy file only in `archive/` when it adds unique evidence.
- Remove active day-based files after useful content is merged or archived.
- Do not maintain duplicate operational commands in both the journal and current guides.
- Rename the folder to `Engineering-Journal` after updating every inbound link.
