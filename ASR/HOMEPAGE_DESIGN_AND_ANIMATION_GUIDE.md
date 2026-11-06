# ASR Logistics — Homepage Design & Animation Architecture Guide
**Document Version:** 1.0  
**Project:** ASR Logistics Medical Courier Website  
**Status:** Approved Reference Standard  
**Target Audience:** Frontend Developers & Designers  

---

## 1. Executive Summary & Architecture Overview

The ASR Logistics homepage has been approved as the visual and technical benchmark for the entire web platform. The site represents a specialized, high-reliability medical courier service operating in Saskatoon, handling prescriptions, vaccines, lab specimens, clinic supplies, and confidential medical documents.

Because no design mocks have been provided for the remaining pages (**About Us**, **Services**, **Contact**), this guide serves as the definitive reference manual for maintaining visual harmony, brand integrity, responsive behavior, and code quality across the entire project.

### Core Technology Stack
- **Structure:** Semantic HTML5 utilizing **Bootstrap 5.3+** for grid systems, flexbox utilities, and responsive breakpoints.
- **Styling:** Vanilla CSS (`assets/css/main-style.css`) structured with parent-scoped BEM classes using `snake_case`. Zero Tailwind or preprocessor dependencies.
- **Typography:** DM Sans (Body, Micro-copy, Buttons) and Manrope (Headings), loaded via Google Fonts with Georgia/Playfair serif for editorial italic accents.
- **Icons & Graphics:** Clean vector SVGs (`assets/images/` and inline SVGs) and FontAwesome 6 Free.
- **JavaScript & Animation:**
  - `assets/js/function.js`: Core layout sizing, sticky header height calculations, and mobile navigation toggling.
  - `assets/js/animation.js`: GSAP 3.12.5 and ScrollTrigger pinned timelines, scrubbed SVG masking, and requestAnimationFrame physics.
  - `assets/js/jquery/jquery.min.js`: DOM ready wrapper compatibility.

---

## 2. Design System & Styling Conventions

### 2.1 Color Palette & CSS Custom Properties

All colors are strictly mapped to the central `:root` declaration in `assets/css/main-style.css`. When building remaining pages, **always reuse these tokens**—never hardcode hex codes.

| Variable | Hex Value | Usage / Semantic Role |
| :--- | :--- | :--- |
| `--clr-0160d3` | `#0160d3` | **Primary Brand Blue** — Primary CTAs, active links, progress fills, badges |
| `--clr-2563eb` | `#2563eb` | **Accent / Hover Blue** — Hover button states, SVG node glows, link accents |
| `--clr-0f172a` | `#0f172a` | **Deep Slate / Ink** — Primary headings (H1/H2), step capsule pills |
| `--clr-0b1329` | `#0b1329` | **Midnight Navy** — CTA section background card, high-contrast surfaces |
| `--clr-111827` | `#111827` | **Charcoal Headings** — Section titles, card titles, footer titles |
| `--clr-556987` | `#556987` | **Muted Slate Body** — Paragraph text, descriptions, navigation links |
| `--clr-94a3b8` | `#94a3b8` | **Muted Light Slate** — Subtitles on dark backgrounds, secondary text |
| `--clr-e0effe` | `#e0effe` | **Soft Ice Blue** — Badge background pills, subtle badge containers |
| `--clr-edf5fd` | `#edf5fd` | **Light Sky Blue** — Hero badge background, Healthcare card background |
| `--clr-bfdbfe` | `#bfdbfe` | **Pale Blue Border** — SVG dashed connector lines, card hover borders |
| `--clr-dbe6f2` | `#dbe6f2` | **Divider Slate** — Subtle border dividers, feature item separators |
| `--clr-e2e8f0` | `#e2e8f0` | **Border Neutral** — Header border, standard card borders, footer border |
| `--clr-f8fafc` | `#f8fafc` | **Off-White Surface** — Step card backgrounds, light container backgrounds |
| `--clr-white` | `#ffffff` | **Pure White** — Page background, header background, primary card surfaces |
| `--clr-black` | `#000000` | **Base Black** — Raw text fallback |

---

### 2.2 Typography Hierarchy

The typography pairs a clean sans-serif body font with an authoritative geometric sans-serif for headings, elevated by high-end serif italic accents for emphasis.

```css
/* Font Families */
--font-primary: "DM Sans", sans-serif;
--font-heading: "Manrope", sans-serif;
--font-accent: Georgia, "Playfair Display", serif;
```

#### Responsive Font Size Scale (`:root`)
All font sizes are variable-driven and adjust dynamically across breakpoints:

| Token | Desktop (>=1400px) | Laptop (1200–1399px) | Tablet (992–1199px) | Mobile Landscape (768–991px) | Mobile Portrait (<768px) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--fs-120` | 120px | 100px | 80px | 60px | 30px |
| `--fs-80` | 80px | 72px | 60px | 50px | 30px |
| `--fs-52` | 52px | 46px | 40px | 36px | 27px |
| `--fs-40` | 40px | 36px | 32px | 30px | 26px |
| `--fs-34` | 34px | 32px | 30px | 28px | 26px |
| `--fs-30` | 30px | 30px | 28px | 26px | 22px |
| `--fs-28` | 28px | 28px | 26px | 25px | 20px |
| `--fs-25` | 25px | 25px | 25px | 23px | 20px |
| `--fs-24` | 24px | 24px | 24px | 22px | 19px |
| `--fs-22` | 22px | 22px | 22px | 20px | 18px |
| `--fs-20` | 20px | 20px | 20px | 18px | 17px |
| `--fs-18` | 18px | 18px | 18px | 17px | 16px |
| `--fs-16` | 16px | 16px | 16px | 16px | 15px |
| `--fs-14` | 14px | 14px | 14px | 14px | 13px |
| `--fs-13` | 13px | 13px | 13px | 13px | 12px |

#### Typography Patterns
- **H1 Hero Titles:** `font-family: 'Manrope'; font-size: calc(var(--fs-52) + 10px); font-weight: 800; line-height: 1.15; letter-spacing: -1.5px;`
- **H2 Section Titles:** `font-family: 'Manrope'; font-size: var(--fs-52); font-weight: 700; line-height: 1.15;`
- **Serif Italic Emphasis:** `font-family: Georgia, serif; font-style: italic; font-weight: 400; color: var(--clr-0160d3);`
- **Paragraph Body:** `font-family: 'DM Sans'; font-size: var(--fs-18); color: var(--clr-556987); line-height: 1.6;`

---

### 2.3 Spacing Conventions

Centralized spacing tokens provide consistent rhythm across sections:
- `--spc-100`: 100px (Desktop) &rarr; 80px (1400px) &rarr; 70px (1200px) &rarr; 60px (992px) &rarr; 40px (&lt;768px)
- `--spc-50`: 50px (Desktop) &rarr; 40px (1400px) &rarr; 35px (1200px) &rarr; 30px (992px) &rarr; 30px (&lt;768px)

**Global Utility Classes:**
- `.pt_100` / `.pb_100`: Padding top/bottom by `--spc-100`
- `.pt_50` / `.pb_50`: Padding top/bottom by `--spc-50`
- `.mt_100` / `.mb_100`: Margin top/bottom by `--spc-100`
- `.mt_50` / `.mb_50`: Margin top/bottom by `--spc-50`
- **Container Max-Width:** `.container` is capped at `1440px` for screens `>= 1500px`.

---

### 2.4 Button & Link Patterns

```html
<!-- Pattern A: Primary Glowing Pill Button -->
<a href="#quote" class="btn btn-primary rounded-pill [section_name]__btn_primary">
  Get a Quote
</a>
```
- **Styling:** `background-color: var(--clr-0160d3); border-color: var(--clr-0160d3); color: var(--clr-white); padding: 12px 28px !important; border-radius: 999px; font-size: var(--fs-18); font-weight: 600; box-shadow: 0 8px 24px -2px rgba(1, 96, 211, 0.45); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);`
- **Hover State:** `background-color: var(--clr-2563eb); transform: translateY(-2px); box-shadow: 0 12px 28px rgba(37, 99, 235, 0.65);`

```html
<!-- Pattern B: Secondary Underlined Arrow Action Link -->
<a href="#services" class="[section_name]__link">
  View Our Services
  <svg class="[section_name]__link_arrow" viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 12L12 4M6 4h6v6"></path>
  </svg>
</a>
```
- **Styling:** `font-size: var(--fs-18); font-weight: 700; display: inline-flex; align-items: center; gap: 8px; border-bottom: 1.5px solid currentColor; padding-bottom: 3px; transition: color 0.3s ease, border-color 0.3s ease;`
- **Hover State:** `color: var(--clr-0160d3);` and child SVG arrow transitions: `transform: translate(3px, -3px);`

---

### 2.5 Badge & Pre-heading Patterns

Every major section begins with an uppercase pill badge featuring a colored indicator dot:

```html
<div class="[section_name]__badge">
  <span class="[section_name]__badge_dot"></span>
  NOW SERVING SASKATOON
</div>
```
- **Styling:** `display: inline-flex; align-items: center; gap: 8px; background-color: var(--clr-edf5fd); (or --clr-e0effe); color: var(--clr-0160d3); font-size: var(--fs-16); font-weight: 700; padding: 6px 14px; border-radius: 999px; letter-spacing: 0.5px; text-transform: uppercase;`
- **Dot:** `width: 6px to 7px; height: 6px to 7px; border-radius: 50%; background-color: var(--clr-0160d3);`

---

### 2.6 Card Treatments & Surface Styles

1. **Light Outlined Card (`.how_it_works_section__card`):**
   - Background: `var(--clr-f8fafc)`
   - Border: `1px solid var(--clr-e2e8f0)`
   - Radius: `16px`
   - Shadow: `0 4px 20px rgba(15, 23, 42, 0.03)`
   - Hover: `transform: translateY(-4px); border-color: var(--clr-bfdbfe); box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);`
2. **Specialized Dark Card (`.services_pin_section__card--dark`):**
   - Background: `var(--clr-0b1329)`
   - Text: White with muted text `#94a3b8`
   - Radius: `24px`
3. **Specialized Light Card (`.services_pin_section__card--light`):**
   - Background: `var(--clr-white)`
   - Border: `1px solid var(--clr-e2e8f0)`
   - Radius: `24px`
   - Hover: `transform: translateY(-4px); border-color: var(--clr-bfdbfe);`
4. **Frosted Glass Container (`.banner_section__overlay`):**
   - Background: Translucent gradient `linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 246, 255, 0.92) 100%)`
   - Border: `1px solid rgba(255, 255, 255, 0.8)`
   - Backdrop-filter: `blur(12px)`
   - Shadow: `0 20px 48px -12px rgba(1, 96, 211, 0.22)`
   - Radius: `24px`

---

## 3. Homepage Section & Component Inventory

| Section / Component | Parent CSS Class | Primary File Location | Responsibilities & Elements |
| :--- | :--- | :--- | :--- |
| **Site Header** | `.site_header` | `index.html#L19`, `main-style.css#L193`, `function.js#L7` | Sticky header (z-index: 1000), fixed height (105px desktop / 64px mobile), logo (80px desktop / 40px mobile), navigation items (`Home`, `About Us`, `Services`, `Contact`), mobile hamburger toggle with aria states. |
| **Hero Banner** | `.banner_section` | `index.html#L56`, `main-style.css#L349`, `animation.js#L46` | Split 2-col hero; left column text, badges, primary & secondary CTAs; right column hero image with frosted glass delivery progress mockup; bottom horizontal 5-item trust checklist bar. |
| **Specialized Services** | `.services_pin_section` | `index.html#L262`, `main-style.css#L1817`, `animation.js#L989` | Section header with link; 3-column stage: Left 2 cards (`Prescription Delivery`, `Clinic Deliveries`), Center image card (`courier-service.png`), Right 2 cards (`Lab & Sample Runs`, `Vaccine Delivery`). |
| **How It Works** | `.how_it_works_section` | `index.html#L387`, `main-style.css#L949`, `animation.js#L266` | Section header; 2x2 zig-zag process flow: Step 1 (Request Service), Step 2 (Submit Request), Step 3 (Route Optimized Pickup), Step 4 (Delivered); vertical step pill capsules; SVG animated connector lines. |
| **Healthcare Focus** | `.healthcare_section` | `index.html#L505`, `main-style.css#L1215`, `animation.js#L597` | Full-width container card (`--clr-edf5fd`); left media image shrinks; right content panel reveals mission, 3 feature items with custom icons (`HIPA.svg`, `urgency-first.svg`, `partner.svg`), and stats overlay. |
| **CTA Card** | `.cta_section` | `index.html#L620`, `main-style.css#L1602`, `animation.js#L703` | Dark navy card (`#0b1329`, 24px radius); dual bouncing screensaver radial glows; centered pre-badge; H2 heading; description; direct mailto CTA button (`asrlogistics.sk@outlook.com`). |
| **Site Footer** | `.site_footer` | `index.html#L655`, `main-style.css#L759` | Clean white footer; brand logo and tagline; company links; services link column; bottom copyright row with telephone and email links. |

---

## 4. Animation System Breakdown & Technical Rules

The homepage utilizes GSAP 3.12.5 and ScrollTrigger to create an immersive flagship presentation. **Crucially, other pages do not require this degree of pinning and scrubbed timelines.**

### 4.1 Animation Architecture Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            HOMEPAGE ANIMATIONS                              │
├──────────────────────────┬──────────────┬─────────────┬─────────────────────┤
│ Section                  │ Mode         │ Pinning     │ Mobile Behavior     │
├──────────────────────────┼──────────────┼─────────────┼─────────────────────┤
│ .banner_section          │ Scrubbed     │ Pinned      │ Disabled (Static)   │
│ .services_pin_section    │ Scrubbed     │ Pinned      │ Fade-up reveals     │
│ .how_it_works_section    │ Scrubbed SVG │ Not pinned  │ Vertical SVG scrub  │
│ .healthcare_section      │ Scrubbed     │ Pinned      │ Static stack        │
│ .cta_section             │ Triggered    │ Not pinned  │ Reveal + Bouncing   │
└──────────────────────────┴──────────────┴─────────────┴─────────────────────┘
```

### 4.2 Section-by-Section Animation Breakdown

#### 1. Banner Hero Section (`initBannerSection`)
- **Desktop (>=992px):**
  - Columns enter automatically on initial load (`delay: 0.2, duration: 0.85, ease: 'power2.out'`).
  - Section pins below sticky header (`start: () => 'top ' + getHeaderHeight() + 'px'`, `end: '+=2600'`, `pin: true`, `scrub: 1`).
  - Scrub Sequence:
    1. Frosted overlay fades in (`duration: 1.2`).
    2. Range items reveal sequentially (item fade in -> progress fill animates to `data-progress` target -> pause).
    3. Mockup footer badge reveals.
- **Mobile (<992px):**
  - **All ScrollTrigger and pinning disabled** via `gsap.matchMedia()`.
  - Content, overlay, and range items display in natural static visibility with fills set directly to target widths (90%, 70%, 52%, 100%).

#### 2. Specialized Services Pinned Section (`initServicesPinAnimation`)
- **Desktop (>=992px):**
  - Header elements fade up on scroll entry (`start: 'top 85%'`).
  - Section pins (`start: () => 'top ' + getHeaderHeight() + 'px'`, `end: '+=1600'`, `pin: true`, `scrub: 1.1`).
  - **Step 1:** Center column shrinks from `width: 100%` with internal zoom (`scale: 1.15 -> 1.0`) down to `width: calc(28% - 10px)` and settles completely.
  - **Step 2:** After center column settles, Left Cards slide in from `x: -100` and Right Cards slide in from `x: 100` with subtle vertical stagger. Pointer events remain disabled until 88% timeline completion.
- **Mobile (<992px):**
  - Pinned timeline is disabled.
  - Cards and center column display in a 2-column or 1-column responsive grid with standard stagger fade-up on scroll (`start: 'top 80%'`).

#### 3. How It Works Section (`initHowItWorksConnectors`)
- **Desktop & Mobile:**
  - Non-pinned scrubbed timeline (`start: 'top center'`, `end: 'bottom 70%'`, `scrub: 1.5`).
  - Dynamically calculates card bounding coordinates and draws custom SVG connecting paths with curved corners.
  - An SVG mask path (`strokeDashoffset`) unmasks the dashed guide path in exact sync with a moving glowing blue node circle (`<circle class="how_it_works_section__node">`).
  - Step 1 is visible immediately. Steps 2, 3, and 4 fade up as the moving ball physically reaches their coordinates.

#### 4. Healthcare Pinned Section (`initHealthcareScrollSection`)
- **Desktop (>=992px):**
  - Pinned scrubbed timeline (`start: 'top top'`, `end: '+=2200'`, `pin: true`, `scrub: 1.2`).
  - Media column smoothly resizes from `width: 100%` (Design 1) down to `width: 48%` (Design 2).
  - Right content panel slides in from `x: 80` to 0.
  - Blue gradient overlay with "Trusted Excellence" and statistics fades in over the image.
- **Mobile (<992px):**
  - Pinning is disabled via CSS media queries (`min-height: auto`, `.healthcare_section__inner { flex-direction: column; }`).
  - Image and content stack naturally with static overlay.

#### 5. CTA Section (`initCtaSection`)
- **Card Entrance:**
  - Standard trigger (`start: 'top 80%'`, `toggleActions: 'play none none reverse'`).
  - Staggered sequence: Card upward reveal (`0.55s`) &rarr; Badge (`0.35s`) &rarr; Heading (`0.42s`) &rarr; Subtitle (`0.38s`) &rarr; Action buttons slide in from opposite sides (`0.48s`).
- **Screensaver Bouncing Ambient Glows:**
  - Runs in a continuous 60fps `requestAnimationFrame` loop.
  - Two radial gradient divs bounce off card boundaries with realistic vector velocity (`vx`, `vy`) and handle window resize dynamically.

---

## 5. Design Approach for Remaining Pages

No mockups exist for **About Us**, **Services**, or **Contact**. Developers must make autonomous design decisions according to the following principles:

### 5.1 Design Principles
1. **Maintain Brand Consistency:** Use identical colors, typography, buttons, badges, and card radius tokens.
2. **Do Not Duplicate Homepage Layouts:** Each page must have a layout tailored to its content rather than copying the homepage's 2x2 zig-zag or split hero sections.
3. **Restrained Animation Strategy:**
   - The homepage is the flagship showpiece. Inner pages must prioritize fast information consumption, scannability, and accessibility.
   - **Do NOT implement pinned scroll scrubbing on inner pages.**
   - Restrict animations to subtle, lightweight fade-ups (`gsap.from()` with `autoAlpha: 0, y: 25, duration: 0.5`) on section entry.
4. **Use Established Facts Only:** Do not invent fictitious client testimonials, team members, or fabricated certifications beyond Saskatoon medical logistics, HIPAA compliance, cold-chain handling, and direct courier dispatch.

---

### 5.2 Page-Specific Layout Guidelines

#### Page 1: About Us (`about.html`)
- **Page Hero:** Clean breadcrumb or pre-badge ("ABOUT ASR LOGISTICS"), bold H1 ("Dedicated Medical Logistics in Saskatoon"), concise mission paragraph.
- **Mission & Vision Split Section:** 2-column layout (Left: Story & local healthcare focus; Right: High-quality delivery image or trust badge stack).
- **Core Pillars (3-Column Grid):**
  1. *HIPAA-Compliant Discretion* (Patient confidentiality protocols).
  2. *Cold-Chain & Time-Critical Custody* (Specimens, vaccines, pharmaceuticals).
  3. *Local Saskatoon Reliability* (Direct communication, no outsourced call centers).
- **Standards & Credentials Banner:** Horizontal highlight strip featuring on-time rate, signature confirmation, and chain-of-custody documentation.
- **CTA Section:** Reuse `.cta_section` component directly.

#### Page 2: Services (`services.html`)
- **Page Hero:** "COMPREHENSIVE MEDICAL COURIER SERVICES", H1 detailing full Saskatoon delivery capabilities.
- **Detailed Service Grid / Alternating Rows:** Dedicate distinct cards or 2-column alternating blocks to each of the 5 services:
  1. *Prescription Delivery* (Controlled substances, specialty medication, patient signatures).
  2. *Vaccine & Biologics Delivery* (Strict temperature-controlled transport).
  3. *Clinic & Practice Deliveries* (Inter-office supplies, emergency transfers).
  4. *Lab & Specimen Runs* (Time-sensitive, scheduled lab runs).
  5. *Medical Document Transport* (Confidential patient records, chain of custody).
- **Service Comparison / Workflow Overview:** A clear, clean 3-step or 4-column overview card explaining routine scheduled vs. STAT emergency runs.
- **CTA Section:** Reuse `.cta_section` with direct contact link.

#### Page 3: Contact / Quote Request (`contact.html`)
- **Page Hero:** "GET IN TOUCH", H1 ("Request a Delivery or Partnership Quote").
- **2-Column Operational Split:**
  - **Left Column (Direct Channels):**
    - Phone: `(639) 539-0109`
    - Email: `asrlogistics.sk@outlook.com`
    - Service Area: Saskatoon & Surrounding Medical Centers
    - Operating Hours: Same-day & Scheduled Dispatch
  - **Right Column (Clean Request Form):**
    - Organization / Facility Name
    - Contact Name, Phone & Email
    - Service Type (Dropdown: Prescription, Lab, Clinic, Vaccine, Document)
    - Frequency (One-Time STAT run vs. Daily Scheduled Route)
    - Notes / Handling Requirements
    - Submit Button (`.btn.btn-primary.rounded-pill`)
- **Zero Scroll Pinning:** Ensure the form has 100% natural, frictionless scrolling.

---

## 6. Code Architecture, Safety & Technical Constraints

### 6.1 Coding Standards from `AGENTS.md` & `GEMINI.md`
1. **Parent-Scoped CSS:** Every section in `assets/css/main-style.css` must be scoped to its unique parent selector:
   ```css
   /* Correct */
   .about_hero .about_hero__title { ... }
   
   /* Strictly Prohibited */
   .title { ... }
   h1 { ... }
   ```
2. **Snake_Case BEM Methodology:** Class names must strictly follow `parent_section__element--modifier`. Generic names like `.wrapper`, `.box`, or `.content` without parent scope are forbidden.
3. **Centralized CSS Variables:** Never declare a second `:root`. All new colors, font sizes, or spacing variables must be added to the existing `:root` at the top of `main-style.css`.
4. **Section Comment Blocks:**
   ```css
   /* ==========================================
   About Hero Section CSS Start
   ========================================== */

   /* Section CSS here */

   /* Media Queries for this section immediately below */

   /* ==========================================
   About Hero Section CSS End
   ========================================== */
   ```
5. **No Regressions on Homepage:** Never modify `.banner_section`, `.services_pin_section`, `.how_it_works_section`, `.healthcare_section`, or `.site_header` when adding styles for new pages.

---

### 6.2 Safe JavaScript & Animation Architecture for Multi-Page Sites

When `animation.js` runs across multiple pages, functions must **safely check for DOM presence before executing**:

```javascript
// Example of resilient multi-page function design
function initAboutPageAnimations() {
  const aboutSection = document.querySelector(".about_hero");
  // CRITICAL: Exit immediately if the section does not exist on the current page
  if (!aboutSection || typeof gsap === "undefined") return;

  // Lightweight, non-pinned entrance animation
  gsap.from(aboutSection.querySelectorAll(".about_hero__animate"), {
    scrollTrigger: {
      trigger: aboutSection,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 30,
    autoAlpha: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power2.out",
  });
}
```

#### Shared Functions in `function.js`
- `updateHeaderHeight()` automatically calculates `.site_header` height and sets `--headerHeight` on `document.body`.
- Navigation toggle `#siteHeaderToggle` and `#siteHeaderNav` handles the mobile menu uniformly across all pages.
- Ensure the active navigation link is indicated with `.site_header__nav_link--active` matching the current page URL.

---

## 7. Verification Checklist for New Pages

Before delivering any new page, verify against this quality checklist:

- [ ] **Header & Footer:** Reused identically with correct `.site_header__nav_link--active` class.
- [ ] **Bootstrap 5:** Grid and utilities used appropriately without unnecessary DOM wrappers.
- [ ] **CSS Scoping:** 100% of selectors scoped under unique parent section class in `snake_case`.
- [ ] **CSS Variables:** Colors use `--clr-*`, font sizes use `--fs-*`, spacing uses `--spc-*`.
- [ ] **Typography:** Manrope for headings, DM Sans for body, Georgia italic for editorial emphasis.
- [ ] **Buttons:** Pill shape with signature shadow and hover translateY effects.
- [ ] **Responsive Integrity:** Verified at 1440px (Desktop), 1024px (Tablet Landscape), 768px (Tablet Portrait), and 375px (Mobile).
- [ ] **Animation Restraint:** Subtle scroll reveals used; no unnecessary scroll pinning or scrub blocking.
- [ ] **No JS Console Errors:** All GSAP and DOM selectors safely check for element existence.
- [ ] **Approved Homepage Intact:** Zero unintended visual or layout changes to `index.html`.
