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
[CONFIRMED] Front-end static homepage for 4Care, an NDIS provider focusing on people with vision impairment. Designed with premium accessibility features like high contrast mode, text scaling, and read-aloud options.

## Repository Classification
[CONFIRMED] SINGLE_PROJECT

## Repository Structure
[CONFIRMED]
- index.html: Main static web page.
- about.html: Dedicated About Us subpage.
- services.html: Services breakdown subpage.
- team.html: Team listing & grid filtering subpage.
- blog.html: Luxury blog listing & recent posts subpage.
- resources.html: Downloadable NDIS PDF resources subpage.
- online-form.html: Dedicated Online Appointment & Intake Form subpage.
- intake-form.html: Dedicated NDIS Participant Referral & Intake Form subpage.
- feedback-complaints.html: Dedicated Feedback & Complaints subpage.
- career.html: Dedicated Careers subpage with open roles & EOI form.
- assets/css/style.css: Core styles, layout rules, and variables.
- assets/js/main.js: Client side scripts (accessibility helpers, sliders, forms).
- assets/images/: WebP placeholder graphics.
- assets/vendor/: Vendor libraries (Bootstrap 5.3.3, Owl Carousel 2.3.4, jQuery 3.7.1).
- README.md: Documentation.

## Architecture Summary
[CONFIRMED] Static frontend page serving client side scripts and stylesheets with no server-side build steps. Leverages Bootstrap grid for layout responsiveness.

## Tech Stack
[CONFIRMED] HTML5, CSS3, Vanilla JS, Bootstrap 5.3.3, Owl Carousel 2.3.4, jQuery 3.7.1, Atkinson Hyperlegible & Lexend fonts.

## Environment Setup
[CONFIRMED] Static HTML website. Can be served via any local HTTP server (e.g. `python3 -m http.server 8000`).

## Build/Test Commands
[CONFIRMED] None.

## Conventions
[adopted defaults: Trunk-based development & Conventional Commits]
* jQuery convention: Always write `jQuery` explicitly instead of using `$` alias.
* JS Policy: Do NOT write JavaScript for static templates/blog/pagination unless explicitly required for client-side interactivity; preserve clean static HTML/CSS markup for WordPress/backend integration.
* Responsive Utilities: Always make Bootstrap margin (`mb-md-4 mb-3`, `mt-md-5 mt-3`), padding (`p-md-4 p-3`), and grid gap (`g-md-4 g-3`, `gap-md-3 gap-2`) utility classes responsive across mobile and desktop viewports.
* Typography & Colors Policy: Do NOT use Bootstrap utility classes for text color or font sizes (`fs-*`, `text-*`, `h1-h6`). Use custom CSS rules referencing predefined CSS font and color variables (`var(--fs-*)`, `var(--primary)`, `var(--secondary)`, `var(--accent)`, `var(--text-dark)`). Bootstrap classes are strictly reserved for grid layouts and responsive margin/padding/gap spacing.
* Server Execution Policy: After any request is completed, do NOT run live server or local preview server. The user will run and test files manually.

## Data Classification
[CONFIRMED] Public (all source files and assets). Intake form utilizes standard HTTPS request endpoints for transmission.

## Known Issues
[CONFIRMED] None.

## Changelog
* 2026-07-24 · chore · Project bootstrapped
* 2026-07-24 · feat · Implement responsive frontend homepage with custom accessibility features
* 2026-07-24 · feat · Design and implement dedicated About Us subpage (about.html)
* 2026-07-27 · style · Update footer row grid gap from g-5 to g-md-5 g-3 across HTML templates
* 2026-07-28 · style · Implement responsive section spacing & padding CSS variables (100/80/60)
* 2026-07-28 · refactor · Replace Bootstrap color/bg classes with pure CSS and responsive margin/padding utilities across templates
* 2026-07-28 · style · Convert all static section paddings in style.css to responsive CSS variables
* 2026-07-28 · feat · Update team.html filter tabs to custom categories and enable static grid filtering
* 2026-07-28 · style · Implement responsive center alignment for all hero and banner sections on mobile
* 2026-07-30 · feat · Add luxury blog.html page with team.html hero banner layout (inline bg image), Recent Posts design sidebar, luxury cards grid, and static pagination (removed filter tabs per user request).
* 2026-07-30 · feat · Create dedicated resources.html page for downloadable NDIS & vision impairment PDF documents with hero banner, featured spotlight resource card, 3-column resource cards grid, and static pagination.
* 2026-07-30 · feat · Design and build dedicated online-form.html subpage with contact hero banner layout, 3-step online booking intro cards, interactive appointment intake form, light bg team section, and footer quick links.
* 2026-07-30 · feat · Create dedicated intake-form.html subpage duplicating online-form.html template with updated NDIS referral & intake content.
* 2026-07-30 · feat · Restructure header navigation: Media dropdown contains Blog & Resources; Contact dropdown contains Contact Us, Online Form, & Intake Form with enhanced luxury icon dropdown menu styling.
* 2026-07-30 · feat · Design and build single-blog.html detail page template featuring centered hero banner, post metadata, full-width article card without sidebar or team section, compact cover image height, and custom share action button.
* 2026-08-03 · feat · Design and build dedicated feedback-complaints.html subpage with contact hero banner layout, feedback submission form, NDIS Commission safeguards info card, white version team section, and Contact navigation header/footer dropdown updates across all pages.
* 2026-08-03 · style · Added hero banner background image overlay (assets/images/about-hero-placeholder.webp) on career.html and feedback-complaints.html to match other site page banners.
* 2026-08-03 · refactor · Update feedback-complaints.html form fields to match mockup (First Name, Last Name, Email, Complaints) and add Download Complaints Form Brochure sidebar card with preview image & dummy PDF download link, aligned with 4Care brand theme aesthetics. Removed bottom sidebar card per user request.
* 2026-08-31 · feat · Design and implement 4-column Services Mega Menu for index.html matching client reference design with custom category icons, SIL/SDA badges, and CTA card. Preserved standard dropdown styling for Resources and Contact.
* 2026-08-31 · feat · Convert mobile navigation into a single-menu pure CSS slide-out offcanvas drawer with luxury categorized services cards, icons, and CTA card.
* 2026-09-01 · doc · Record server execution policy (do not run live server, user will test manually) in AGENTS.md and MEMORY.md.

## ADR Summary
* 2026-07-24 · Adopt default conventions · Adopting trunk-based development and Conventional Commits as default conventions for the empty repository. · active

## Repository Fingerprint
- classification: SINGLE_PROJECT
- stack: HTML/CSS/JS/Bootstrap/OwlCarousel
- bootstrap date: 2026-07-24
- last verified: 2026-07-24
