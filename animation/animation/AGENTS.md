# AGENTS.md

<!-- ZONE 1: GOVERNANCE — INTEGRITY LOCKED
     Agents MUST NOT modify Zone 1. Rule changes: human edit only.
     If a rule change is needed, raise CONFLICT [HIGH] and stop. -->
## Governance Rules

### Authority Order (higher wins — never resolve conflicts silently)
0. Antigravity artifact comments ← highest when present
1. Human instructions
2. Root AGENTS.md (this file)
3. Local AGENTS.md
4. MEMORY.md
5. Graphy.md (structural topology)
6. Source code
7. Config
8. Generated artifacts
9. Assumptions ← weakest

Truth: Code > Documentation. When they conflict → update docs.

### Conflict Format
CONFLICT [LOW|MEDIUM|HIGH|BLOCKING] Source A: Source B: Impact: Resolution:
LOW=proceed · MEDIUM=proceed+note · HIGH=stop unless justified · BLOCKING=stop, await human.
Unknown info → [UNKNOWN]. Blocks work → CONFLICT [BLOCKING].

### Fast Start
1. Read AGENTS.md
2. Read MEMORY.md
3. Verify architecture claims vs source
4. Report divergences as CONFLICT [MEDIUM]+
5. Output report → wait

FAST START REPORT Last Session: In Progress: Open Threads: Locks: Divergences: Ready State:
Do not re-bootstrap unless topology change or human requests.

### Locking (shared: schemas · contracts · types · migrations · core interfaces)
1. Read MEMORY.md ## LOCKS — confirm clear
2. Add: `LOCK: <file> | Agent: <id> | Task: <desc> | Since: <timestamp>`
3. Re-read immediately. If another lock predates or co-exists → remove yours, rollback, add OPEN THREAD, stop.
4. Release when done.

### Workflow
Discover → Verify → Classify → Document → Implement — never skip or reverse.

### Scan Rules
Shallow → targeted → dependency tracing only. Never recursively scan.
Skip: node_modules, vendor, dist, build, coverage, cache, logs, binaries.

### Graphy Rules
Read-only reference. If topology differs from code:
* Stale graph → note and continue.
* Current graph conflicts with code → CONFLICT [HIGH].

### Generated Files
Never manually edit: ORM output · SDK output · OpenAPI clients · Prisma · Protobuf · Graphy.md.
Fix the generator, not the output.

### Destructive Operations
Require explicit human approval before: delete · bulk rename · migration rewrite · DB reset · infra destruction.

### Dependencies
* Prefer latest stable. Pin exact versions in production (floating `^~*` → CONFLICT [MEDIUM]).
* No deprecated tech. Legacy exception: inherited deprecated items permitted only if documented
  in MEMORY.md ## RISKS with reason + migration plan in ADR. No new instances.
* CVE policy: Critical/High CVE → CONFLICT [HIGH], do not proceed without human approval.
  Medium CVE → CONFLICT [MEDIUM], document in ## RISKS with remediation plan.
* Unknown version → [UNKNOWN VERSION].

### Security Baseline (SOC 2 — CC/C/P/A/PI)
* Least privilege. No wildcard scopes or overly broad IAM roles.
* Validate and sanitize all external inputs at system boundaries.
* Parameterized queries only — never string-concatenated SQL/queries.
* TLS 1.2+ in transit. AES-256 (or platform equivalent) for sensitive data at rest.
* No secrets in repo. No sensitive values in logs. No PII in logs, errors, or URLs.
* Error responses to clients MUST be safe generic messages — never stack traces, DB errors, or internal paths. Log full detail server-side with correlation ID.
* Audit-log security events: auth · sensitive data access · mutations · permission changes · failures. Each entry: timestamp + identity + action + resource + outcome.
* Data classification: Public · Internal · Confidential · Restricted. Apply encryption + access control + audit logging to Confidential and Restricted tiers. Mark PII inline: `// PII: <type>`.
* Environment separation via env vars only. `.env.example` must exist. No hardcoded env-specific values.
* Timeouts on all external calls. Health endpoints on all services. Transactions for critical writes.

### Documentation
Document public interfaces: purpose · inputs · outputs · errors · examples.
Comments explain WHY not WHAT.

### UI Validation
Verify visually using Antigravity when available. Otherwise mark visual claims [INFERRED].

### Multi-Agent Rules
Respect root governance. Stay within assigned scope.
AGENTS.md + MEMORY.md are canonical handoff artifacts.

### Topology Change
Re-bootstrap only when: service added/removed · package manager changed ·
deployment target changed · classification changed · monolith ↔ monorepo.

---

<!-- ZONE 2: PROJECT KNOWLEDGE — [CONFIRMED] only -->
## Project Overview
AETHERIA is a high-fidelity, immersive landing page representing a creative digital agency. It starts with a cinematic particle-based splash screen and transitions to a responsive glassmorphic homepage featuring a customized cursor trail, custom animations, and a core services section.

## Repository Classification
SINGLE_PROJECT

## Repository Structure
- [index.html](file:///Users/eiplmacmini/Desktop/animation/index.html): Page entry point, HTML structure, splash screen, and main layout.
- [styles.css](file:///Users/eiplmacmini/Desktop/animation/styles.css): Complete style declarations, typography, glassmorphism tokens, and keyframe animations.
- [script.js](file:///Users/eiplmacmini/Desktop/animation/script.js): Page interactivity, custom cursor tracking, particle system, and screen transitions.

## Architecture Summary
The project operates as a standard high-performance static web experience built on vanilla HTML, CSS, and JS. It relies on standard browser APIs (canvas, CSS custom variables, requestAnimationFrame) to ensure smooth 120 FPS animations.

## Tech Stack
- Frontend: HTML5, CSS3 (Vanilla), JavaScript (ES6)
- Icons: Lucide Icons (script tag)
- Fonts: Outfit & Inter (Google Fonts)

## Environment Setup
Open [index.html](file:///Users/eiplmacmini/Desktop/animation/index.html) directly in any modern browser, or run a simple local web server:
```bash
python3 -m http.server 8000
```

## Build/Test Commands
No build or build tool setup needed. Fully client-side vanilla assets.

## Conventions
Trunk-based development with Conventional Commits.

## Data Classification
Public. No user database, session tokens, or PII.

## Known Issues
Missing portfolio ("Work") and Contact sections in HTML/CSS/JS, causing the nav menu items to link to nonexistent section IDs.

## Changelog
- `2026-07-10` · feature · Added multi-stage cinematic portal entrance transition on landing page click.
- `2026-07-10` · feature · Created transition_demo.html showcasing 12 different splash reveal transition animations (diagonal, ripple, digital shard, glitch curtain, 3D tunnel zoom, spiral vortex, aperture shutter, liquid melt, glass shatter, staggered slide, horizontal blinds, and 3D shrink).
- `2026-07-10` · initial · Initial project setup with splash screen, hero layout, and services section.

## ADR Summary
- `2026-07-10` · Adopt vanilla CSS/JS · Keep styling and logic lightweight for maximum performance and compatibility.

## Repository Fingerprint
- classification: SINGLE_PROJECT
- stack: HTML/CSS/JS (Vanilla)
- bootstrap date: 2026-07-10
- last verified: 2026-07-10
