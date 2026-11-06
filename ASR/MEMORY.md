# Project Memory

## Project Type
Static Website / Landing Page

## Design Source
Custom / In-progress

## Framework
Bootstrap 5

## Fonts
Primary: DM Sans, sans-serif
Secondary: Manrope, sans-serif (Headings)
Typography variables available: Yes (--fs-120, --fs-80, --fs-52, --fs-40, --fs-34, --fs-30, --fs-28, --fs-25, --fs-24, --fs-22, --fs-20, --fs-18, --fs-16)

## Icons
FontAwesome (assets/css/fontawesome/)

## Libraries
- jQuery (assets/js/jquery/jquery.min.js)
- Bootstrap 5 (assets/css/bootstrap/, assets/js/bootstrap/)
- Owl Carousel (assets/css/owl/, assets/js/owl/)
- GSAP 3 & ScrollTrigger (CDN)

## Global Components
- Primary Button (.primary_btn, .primary_btn.white)
- Section Heading (.sec_hdng)
- Spacing Utilities (.pt_100, .pb_100, .pt_50, .pb_50, .mt_100, .mb_100, .mt_50, .mb_50)
- Header / Hamburger (.site_header, .hemburger, .relative_header)
- Blog Editor Content (.single_blog .content_wrap)
- Healthcare Pinned Scroll Section (.healthcare_section)
- How It Works Section (.how_it_works_section)
- CTA Process Section (.cta_section)
- Banner Hero Section (.banner_section)
- Specialized Services Pinned Section (.services_pin_section)

## Notes
- Removed missing Swiper bundle CSS & JS and incorrect FontAwesome link path from index.html.
- Assets images folder contains 12 files: banner-hero.png, clinic-delivery.svg, courier-service.png, healthcare_industry.png, HIPA.svg, lab.svg, partner.svg, prescription-delivery.svg, site-logo.png, stacked-checkmark.svg, urgency-first.svg, vaccine.svg.
- Created GSAP + ScrollTrigger scroll-driven animated transition from Design 1 (full-width image) to Design 2 (split screen with right content panel & image overlay).
- Created How It Works process section with staggered 2x2 zig-zag step cards, dark navy vertical pills, and responsive SVG connecting paths with accent node.
- Added GSAP ScrollTrigger scrub animation to .how_it_works_section__node so it moves smoothly along the connecting line from Step 1 through Step 4 with controlled slow pacing and sequential fade-up reveals for each step as the ball reaches it.
- Reordered page sections: 1. .how_it_works_section (first), 2. .healthcare_section (second).
- Enhanced .how_it_works_section animation: path/connecting line is masked and hidden when outside the viewport/initially; draws progressively under the moving ball in 100% sync; ScrollTrigger starts when section reaches middle of viewport (`start: "top center"`), and finishes before section leaves viewport (`end: "bottom 70%"`), with sequential fade-up reveals and smooth upward scroll reversal.
- Created modern, responsive CTA section (.cta_section) featuring dark navy container (#0b1329, 24px radius), dual pulsating ambient radial gradient glows, "READY TO PARTNER?" badge with blue dot, centered bold heading (Manrope) and restricted subtitle, glowing blue pill CTA button and secondary link.
- Added GSAP ScrollTrigger sequential reveal animation to .cta_section entering viewport (start: "top 80%"): 1. .cta_section__card upward fade-in (0.55s), 2. .cta_section__badge (0.35s), 3. .cta_section__heading (0.42s), 4. .cta_section__subtitle (0.38s), 5. .cta_section__actions anchors simultaneous smooth slide-in via .fromTo() (0.48s, power2.out). Restyled .cta_section__btn_secondary and .healthcare_section__link with matching crisp SVG arrow (stroke-width 2.2), underline (1.5px currentColor), gap (8px), and hover translate(3px, -3px).
- Implemented Banner Section (.banner_section) with sticky site_header (z-index: 1000) and responsive GSAP matchMedia: on desktop (>=992px), columns enter on load and user scroll scrubs overlay fade-in with sequential reveal and fills (Prescription 90%, Lab 70%, Document 52%, Vaccine 100%) and bottom-right mockup badge while pinned below sticky header; on mobile (<992px), all ScrollTrigger and pinning animations are disabled, displaying content, overlay, and range items in their natural visible state with fills at final values. Retained .banner_section__features with border-bottom and removed .banner_section__stats.
- Updated CTA section ambient glows (.cta_section__glow--one and .cta_section__glow--two) to move continuously throughout the entire CTA card like classic screensaver bouncing balls: both glows move independently across the full card area using direct left/top coordinates; bounce smoothly off all four boundaries (reversing velocity vectors on boundary contact); accurately account for glow dimensions (w1: 580x360, w2: 500x320) so they remain 100% constrained within the card; run on independent starting positions and velocities (Glow 1 at vx: 48, vy: 34; Glow 2 at vx: -40, vy: -46) via a 60fps requestAnimationFrame loop with subpixel precision, tab visibility protection, and responsive resize recalculation.
- Harmonized .services_pin_section__link with other secondary links (.healthcare_section__link and .cta_section__btn_secondary), using matching inline SVG arrow (stroke-width 2.2), 1.5px currentColor underline with 3px padding-bottom, 8px gap, and smooth translate(3px, -3px) hover animation.
- Updated .services_pin_section animation sequence: 1. Header elements fade-up smoothly on approach; 2. Pinned timeline starts at `top ${getHeaderHeight()}px`; 3. Step 1: Center column animates into its exact center resting position (`width: calc(28% - 10px)` with scale 1.15 to 1.0) and completely settles; 4. Step 2: Only after center column has completely settled, all four cards slide into view from their respective sides (left cards from `x: -100` to 0, right cards from `x: 100` to 0) with smooth fade-in and subtle top/bottom stagger; 5. Mobile (<992px) retains clean scroll fade-up reveals without pinning.
- Removed login button (.site_header__login_btn) and action container (.site_header__action) from header, adjusting desktop nav alignment to flex-end.
- Removed all portal mentions and links across the site: updated How It Works Step 1 to "Request Service", removed portal button from .cta_section, and removed portal column from footer.
- Configured CTA "Contact Us" button with mailto link: `mailto:asrlogistics.sk@outlook.com`.
- Separated all GSAP, ScrollTrigger, and section animations into dedicated assets/js/animation.js file, keeping core site functionality (header height, mobile navigation) in assets/js/function.js.
- Implemented smooth header shrink transition on scroll: increased initial header height (118px desktop / 72px mobile) and logo height (92px desktop / 54px mobile); on scroll (>20px), `.site_header--scrolled` smoothly shrinks header height (74px desktop / 58px mobile) and logo (54px desktop / 42px mobile) via cubic-bezier transition, with dynamically adjusted pinning offsets.
- Stabilized site header to consistent fixed dimensions (105px desktop inner height / 80px logo; 64px mobile inner height / 40px logo) and commented out scroll shrink toggle.
- Created comprehensive HOMEPAGE_DESIGN_AND_ANIMATION_GUIDE.md detailing the approved homepage design system, component inventory, animation architectures, and guidelines for developing inner pages (About Us, Services, Contact) independently.
- Built About Page (about.html) with exactly 4 sections: 1. Reusable Inner Banner (.inner_banner_section) with breadcrumb, badge, Manrope heading & serif italic accent; 2. About Story section (.about_story_section) with mission copy, stacked checkmarks, and healthcare facility media with floating 98% on-time badge; 3. Core Commitments section (.about_pillars_section) featuring 3-pillar cards for HIPAA-Compliant Discretion, Urgency-First Mindset, and Partner-Level Integration; 4. Reused existing homepage CTA section (.cta_section). Added scoped CSS in main-style.css and subtle scroll animations in animation.js with safety guards.
- Connected About Page (about.html) to the homepage (index.html) across 3 logical touchpoints: 1. Header navigation "About Us" link; 2. Healthcare brand intro section "Learn More About Us" action link; 3. Footer Company "About Us" link, with logo and Home links returning to index.html.
- Redesigned Inner Banner component (.inner_banner_section): full-width background image with slow continuous Ken Burns zoom animation (inner_banner_zoom: scale 1 to 1.09, 18s ease-in-out infinite alternate), dark navy protective gradient overlay, and exact content order: 1. Subheading pill badge, 2. Prominent Manrope H1 heading with Georgia italic accent, 3. Two-line subtitle description, with breadcrumbs removed. Styled with reduced-motion accessibility protection and configurable image/text per inner page.
- Debugged and resolved .about_story_section ScrollTrigger animation: Root cause was that start: "top 75%" on .about_story_section yielded a negative start offset (start: -32px on 900p, -167px on 1080p) because the preceding header and inner banner measured only ~570px total, causing ScrollTrigger to trigger immediately on page load at scrollY = 0 and finish instantly with once: true. Fixed by setting start: "top 40%" (startPos = +250px on 900p, +178px on 1080p) so elements remain hidden (media at x: 100, card at y: 80) at scroll 0 and trigger smoothly only when scrolling down to the section, with window.addEventListener("load") refreshing ScrollTrigger after all page images load. Verified via Chrome DevTools Protocol.
- Implemented site-wide client updates across index.html and about.html:
  1. Phone numbers: Configured Inquiries (639) 471-3662 and Client Support (639) 539-0109 with tap-to-call links (tel:+16394713662, tel:+16395390109). Displayed Inquiries-only in header on desktop and mobile. In Contact section and footer, displayed both with exact required labels: "Inquiries: (639) 471-3662" and "Client Support: (639) 539-0109".
  2. Email: Replaced all occurrences with asrlogistics.sk@outlook.com and eliminated typo arslogistics.sk@gmail.com completely across codebase.
  3. Buttons & Menu: Replaced all "Get a Quote" buttons with "Contact Us" scrolling to Contact section (#contact). Updated top navigation menu to: Home (#home), Services (#services), Why ASR (#why-asr), About (#about), Contact (#contact). Eliminated all '#' placeholder links, mapping every link to a functional target section.
  4. Content cleanup: Removed text "Refined Web UI Mockup", replaced all client/facility names (Quest Diagnostics, St. Paul's, Sunrise Pharmacy, Metro Clinic) with generic medical terms (Community Pharmacy, Medical Clinic, Diagnostic Laboratory, Regional Hospital), and eliminated all instances of "life-critical" phrasing.
  5. Added smooth scroll-margin-top offset rules in main-style.css for sticky header clearance.
- Homepage-Only Refinements (per strict focus):
  1. Replaced all Font Awesome icons on index.html with lightweight, inline SVG icons (phone, headset, envelope). Removed Font Awesome stylesheet link from index.html head.
  2. Removed the email button from .cta_section__contacts, keeping only the two phone links (Inquiries & Client Support) centered and balanced.
  3. Relocated all footer contact info (Inquiries phone, Client Support phone, email) to the top footer area in a dedicated Contact column, and removed duplicated contact information from the bottom footer, leaving a clean copyright bar.
  4. Added smooth sequential ScrollTrigger reveal animation for `.cta_section__contacts` in `assets/js/animation.js` (`autoAlpha: 0, y: 20` to `autoAlpha: 1, y: 0`, duration 0.45s, `power2.out`, `-=0.15`), completing the reveal sequence of the CTA section.
  5. Updated Hero Section (`.banner_section`) on `index.html`:
     - Badge label: updated to "SASKATOON MEDICAL COURIER".
     - Headline: updated to "Medical Courier for Saskatoon Pharmacies, Clinics & Labs".
     - Paragraph: updated to "Scheduled or on-demand delivery, handled the way each item requires. Contact us and we’ll set up a service that fits your needs.".
     - Action buttons: "Contact Us" (main, `#contact`) and "View Services" (secondary, `#services`).
     - Added growth badge below buttons: "One of Saskatoon’s Fastest-Growing Medical Couriers" (`.banner_section__trust_badge`) with responsive styling.
     - Updated checkmark row to exact 4 items: "Professional Handling", "Scheduled & On-Demand", "Clear Communication", "Healthcare-Focused".
     - Updated 4 floating range cards to exact text without any times, ETAs, patient counts or names:
       1. Prescription Delivery / Pharmacy to patient / SCHEDULED · DELIVERED
       2. Lab Specimen Run / Clinic to lab / ON-DEMAND · IN TRANSIT
       3. Equipment & Supplies / Clinic delivery / SCHEDULED · EN ROUTE
       4. Vaccine Delivery / Cold-chain handled / DELIVERED
   6. Preserved existing GSAP/ScrollTrigger animations, brand styling, and kept all other files/pages completely untouched.
   7. Updated Specialized Services Section (`.services_pin_section`) on `index.html`:
      - Updated header: Heading to "Medical Courier Services in Saskatoon" and intro line to "Scheduled or on-demand, with handling matched to what we’re carrying.".
      - Updated 4 cards in pinned stage:
        1. Prescription Delivery: "Delivery from your pharmacy to your patients, including controlled substances and specialty medications." with small tag "Scheduled & On-Demand".
        2. Clinic Deliveries: "Inter-office and clinic-to-clinic deliveries, on a regular schedule or when you need them." (removed SAME DAY tag).
        3. Lab & Specimen Runs: "Specimens moved between clinics and labs with documented chain of custody and temperature-appropriate handling." (removed TIME-CRITICAL tag).
        4. Vaccine & Temperature-Sensitive Delivery: "Vaccines and time-sensitive items transported with the cold-chain care each product requires." (removed COLD-CHAIN tag).
      - Added 2 new service cards below `.services_pin_section__stage` in a dedicated responsive row (`.services_pin_section__extra_row`, `col-12 col-md-6`):
        5. Equipment & Supply Deliveries: "Medical equipment and supplies delivered to clinics, pharmacies, and care facilities, scheduled or on demand." with inline box/package SVG.
        6. Document Transport: "Medical records and paperwork delivered securely." with inline medical document SVG.
      - Added scroll-triggered entrance animations in `assets/js/animation.js` without altering pinned-stage scrub animations: Card 5 enters from left (`x: -80`), Card 6 enters from right (`x: 80`), with responsive vertical stacking on mobile (`col-12`). All verified via Chrome DevTools Protocol.
   8. Standardized all six service cards in `.services_pin_section` on `index.html`:
      - Removed all `.services_pin_section__pill` elements from all 6 service cards.
      - Standardized all 6 cards to identical design system tokens: light background (`#f0f6fe`), `24px` border-radius, `24px 22px` padding, top-aligned content (`justify-content: flex-start`), `14px` margin below `card_top`.
      - Unified typography: titles in Manrope 700 22px (`#111827`), descriptions in DM Sans 400 16px (`#556987`, line-height: 1.5).
      - Standardized icon visual presentation: identical 44x44 circular container with primary blue fill and crisp white vector glyphs.
      - Maintained stage structure (4 cards inside pinned stage + 2 cards below stage in 1 row) and all GSAP/ScrollTrigger animations. Verified via Chrome DevTools Protocol.
   9. Refined animations for the 2 extra service cards in `assets/js/animation.js`:
      - Unified entrance animation parameters with existing cards: Card 5 enters from left (`x: -100` to `0`), Card 6 enters from right (`x: 100` to `0`), `duration: 0.65`, `ease: "power2.out"`, `autoAlpha: 1`.
      - Integrated `pinnedContainer: section` on desktop ScrollTrigger to accurately account for the pinned stage's 1600px pin-spacing. This ensures the cards do not fire prematurely during the pinned stage or on page load, and animate into view strictly when the user scrolls down to their row (start: 5293px).
      - Clean responsive reversal on mobile and desktop verified via Chrome DevTools Protocol.
   10. Added "Most Popular" highlight tag to Prescription Delivery card in `index.html` & `assets/css/main-style.css`:
       - Placed `.services_pin_section__popular_tag` immediately to the right of the card's 44x44 icon within `.services_pin_section__card_top`, perfectly center-aligned horizontally (`align-items: center`, `10px` gap).
       - Styled with brand tokens: soft ice blue background (`#dcebfc`), primary brand blue text (`var(--clr-0160d3)`), 1px subtle blue border, 5px indicator dot (`.services_pin_section__popular_dot`), 13px bold uppercase typography, and 100px pill radius.
       - Verified across desktop and mobile (`375px`) viewports: zero overflow, no layout shifts, and no impact on existing GSAP/ScrollTrigger pinned animations.
    11. Updated Prescription Delivery ("Most Popular") card styling in `index.html` & `assets/css/main-style.css`:
        - Card background updated to dark navy (`#020b24` via `.services_pin_section__card--dark`) matching design screenshot.
        - Card title styled in pure white (`#ffffff` via `.services_pin_section__card_title--white`) and card description in muted slate (`#94a3b8` via `.services_pin_section__card_desc--muted`).
        - Right-aligned the "MOST POPULAR" tag within `.services_pin_section__card_top` using `margin-left: auto;` (`ms-auto`), pushing it to the far-right edge while keeping the 44x44 circular icon on the left.
        - Tag styled with crisp white background (`#ffffff`), 6px brand blue dot (`#0160d3`), bold uppercase text, and pill radius (`100px`), fully matching screenshot specification.
        - Verified layout, contrast, and responsiveness on desktop and mobile (`375px`) with zero overflow via Chrome DevTools Protocol.
    12. Updated "How It Works" Section (`.how_it_works_section`) in `index.html`, `assets/css/main-style.css`, and `assets/js/animation.js`:
        - Replaced 4 old steps with exactly 3 streamlined steps:
          1. Step 1 (Contact Us): "Tell us what you send and how often."
          2. Step 2 (We Set Up Your Service): "We agree on a schedule or on-demand arrangement, and the handling procedure for your type of delivery."
          3. Step 3 (We Deliver): "Your items are moved with proper handling and procedure, and handoffs are documented."
        - Updated section header: Title to "How It Works" (with accent on "Works") and intro line to "Getting started is a conversation, not a form to fill out."
        - Completely eliminated all mentions of "batches", "routes", "text messages", and "signatures" across the entire section.
        - Redesigned SVG connecting lines and guide paths in `assets/js/animation.js` for 3 steps: seamless curved path from Card 1 right edge to Card 2 top, then from Card 2 left edge to Card 3 top on desktop; continuous vertical path on mobile.
        - Synchronized GSAP ScrollTrigger timeline: initial state has Card 1 visible with Cards 2 & 3 hidden (`autoAlpha: 0, y: 35`); smooth scrub (`scrub: 1`) drives the traveling node and reveals Card 2 at midpoint and Card 3 as the node arrives, with comfortable end buffer.
        - Verified full scroll lifecycle and zero horizontal overflow on desktop (1440px) and mobile (375px) via Chrome DevTools Protocol.
    13. Implemented New "Why ASR" Section (`.why_asr_section`) in `index.html`, `assets/css/main-style.css`, and `assets/js/animation.js`:
        - Placed section directly between "How It Works" (`#how-it-works`) and "About" (`#about`, `.healthcare_section`), assigned exact ID `id="why-asr"` so header nav `#why-asr` navigates directly to it.
        - Exact Section Heading: "Why Healthcare Providers Choose ASR".
        - 4 Service-Style Cards with inline SVG icons in circular 44x44 badges:
          1. Healthcare Only: "We work with pharmacies, clinics, and labs. We know what’s expected on every run."
          2. Handled Right: "A prescription, a specimen, and a vaccine are not treated the same."
          3. Documented: "Clear handoffs you can point to when you need them."
          4. Flexible: "Scheduled or on-demand, whichever fits your day."
        - Responsive Grid Layout: Single row of 4 cards on desktop (`col-lg-3`), 2-column layout on tablet (`col-md-6`), 1-column stack on mobile (`col-12`).
        - Closing Trust Banner: Added sentence "More Saskatoon healthcare providers are choosing us every month." alongside glowing pill "Contact Us" button linked to `#contact`.
        - Standardized GSAP ScrollTrigger animation architecture in `assets/js/animation.js` (`initWhyAsrSection()`) to follow the exact same proven timeline flow and ScrollTrigger configuration as `cta_section`:
          1. Cleaned up any pre-existing timeline instance (`whyAsrTimeline.scrollTrigger.kill()`, `whyAsrTimeline.kill()`).
          2. Pre-hid elements with `gsap.set()` (`header` at `y: 45`, `cards` at `y: 55`, `footer` at `y: 40`, all with `autoAlpha: 0`) to prevent any flicker or autoplay before scrolling.
          3. Reused `cta_section`'s single timeline architecture with `scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" }`.
          4. Sequenced animations smoothly on `whyAsrTimeline`: Header fades up (`0.55s`), 4 Cards animate sequentially with subtle stagger (`stagger: 0.14`, `0.6s`, `-=0.2`), and bottom CTA area enters (`0.5s`, `-=0.15`).
          5. Handled `prefers-reduced-motion` cleanly and added `clearProps: "transform"` on card animation completion so CSS hover lift interacts flawlessly without inline style collisions.
          6. Removed `transition: transform` from `.why_asr_section__card` base CSS in `assets/css/main-style.css`, isolating it to `:hover` to eliminate CSS transition collisions with GSAP transform updates.
          7. Verified via Chrome DevTools Protocol across desktop (1440px) and mobile (375px): 0% animation progress at scroll 0 (even after multi-second waits), seamless scroll-triggered reveal, clean reversal when scrolling back up, and zero impact on `cta_section` or other page sections.
    14. Updated About Section (`.healthcare_section`, `#about`) on `index.html`:
        - Replaced text on the image overlay: "Trusted by Saskatoon Healthcare Providers" (replaces "Trusted Excellence").
        - Replaced section heading: "Built for Healthcare" (replaces "Built for the Healthcare Industry").
        - Replaced description: "We work only with healthcare providers, so we know what’s expected when we pick up a prescription, a specimen, or a patient file. Every item is treated as someone’s health, and handled that way."
        - Deleted the second paragraph ("We partner exclusively...") and the "Learn More About Us" action button.
        - Retained the two key stats in the image overlay: "98% On-Time Rate" and "Saskatoon Local Service".
        - Updated all three highlight boxes:
          1. Confidential Handling: "Patient information is handled under confidentiality agreements with our healthcare clients." (replaces "HIPA Compliant Handling"). Created and applied new matching vector `lock.svg` icon.
          2. Reliable Timing: "Deliveries arrive when we say they will." (replaces "Urgency-First Mindset").
        - Verified layout, responsiveness, and pinned GSAP ScrollTrigger timeline via Chrome DevTools Protocol.
    15. Implemented Contact Section (`.contact_section`, `#contact`) on `index.html`:
        - Placed immediately above `.cta_section` on the homepage, assigning `id="contact"` so all "Contact Us" buttons and navigation links across the site smoothly scroll directly to it.
        - Section Header: exact heading "Tell Us What You Need Moved", description "Tell us what you send and how often. We’ll get back to you promptly and set up the right service.", and "CONTACT US" pill badge.
        - Two-Column Responsive Layout:
          1. Left Column (Contact Form): Complete visual form with exact 7 fields in specified order: Name (required), Organization (required), Phone (required), Email (required), Service Type (dropdown with all 7 options), Scheduled or On-Demand (dropdown with 3 options), Message (optional textarea). Styled with consistent input heights, border-radii, focus ring glows, "Send Message" pill button with vector arrow, and disclaimer note "Please do not include patient information in this form." (design-only, no backend submission logic).
          2. Right Column (Contact Information Panel): Dark navy executive card (`#0b1329`) featuring clean inline SVG icons, "We're Ready to Help" heading, New Inquiries `(639) 471-3662`, Existing Client Support `(639) 539-0109`, Email `asrlogistics.sk@outlook.com`, and Service Area `Serving Saskatoon and area`.
        - Scoped CSS added in `assets/css/main-style.css` using design system tokens with responsive tablet/mobile adaptations and zero horizontal overflow.
        - GSAP ScrollTrigger Animation in `assets/js/animation.js` (`initContactSection()`): follows `cta_section` timeline architecture with pre-hidden elements via `gsap.set()`, triggers only when scrolled to `top 80%` (0% progress on load), and sequentially reveals the header, form card, and information panel without conflicting with existing animations.
    16. Updated Footer (`.site_footer`) on `index.html`:
        - Replaced copyright text with exact string: `© 2026 ASR Logistics. All rights reserved.`
        - Updated contact information items and labels:
          1. New Inquiries: `New inquiries: (639) 471-3662` with tap-to-call `tel:+16394713662`
          2. Existing Client Support: `Existing client support: (639) 539-0109` with tap-to-call `tel:+16395390109`
          3. Email: `asrlogistics.sk@outlook.com` with clickable `mailto:asrlogistics.sk@outlook.com`
        - Updated Services column to exact 6 services:
          1. Prescription Delivery
          2. Clinic Deliveries
          3. Equipment & Supply Deliveries
          4. Lab & Specimen Runs
          5. Vaccine & Temperature-Sensitive Delivery
          6. Document Transport
        - Verified 100% of footer links: all section anchors (`#about`, `#services`, `#why-asr`, `#contact`) and logo link (`index.html`) point to active, valid DOM targets with zero broken or placeholder links.
    17. Updated Footer Copyright Row (`.site_footer__bottom_row`) on `index.html`:
        - Placed `© 2026 ASR Logistics. All rights reserved.` and `Privacy Policy` link horizontally on the same row via flexbox (`display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px 24px;`).
        - Styled `Privacy Policy` link with consistent footer typography (`font-size: var(--fs-13); line-height: 1.5; color: var(--clr-556987);`) with hover state (`color: var(--clr-2563eb); text-decoration: underline;`).
        - Responsive behavior allows items to wrap cleanly on narrow mobile devices without horizontal overflow (`gap: 6px 16px;`).
        - Clickable link destination set to `privacy.html`.
    18. Created Privacy Policy Page (`/privacy`, `privacy/index.html`, and `privacy.html`):
        - Created clean, responsive Privacy Policy page with exact content wording, clickable `mailto:asrlogistics.sk@outlook.com` link, and `Last updated: [Date the website goes live]` placeholder.
        - Scoped section styling `.privacy_section` added to `assets/css/main-style.css` using existing CSS variables and BEM snake_case.
        - Reused site header, mobile navigation, and footer components.
        - Linked homepage footer Privacy Policy link to `/privacy` (`href="/privacy"`).
        - Verified direct `/privacy` route loading, footer link click navigation, exact text matching, and responsive layout across desktop and mobile.
    19. Updated Services Section Card 1 Tag:
        - Replaced `MOST POPULAR` badge on Prescription Delivery card with `Scheduled & On-Demand` matching client feedback.
        - Preserved the interactive pinned animation stage, center scaling courier image, and GSAP ScrollTrigger timeline intact.
    20. Synchronized About Page (`about.html`) Shared Components with Homepage (`index.html`):
        - Header: Replaced FontAwesome phone icon with inline SVG phone vector; removed FontAwesome stylesheet link from `<head>`. Preserved active About nav item and navigation links back to `index.html`.
        - CTA Section (`.cta_section`): Replaced outdated 3-contact layout and FontAwesome icons with the finalized homepage 2-contact layout (Inquiries and Client Support) with inline vector SVGs; removed outdated `id="contact"` attribute.
        - Footer (`.site_footer`): Replaced 3-column layout with the finalized 4-column layout including all 6 services and dedicated Contact column with inline SVGs; updated bottom copyright bar to `© 2026 ASR Logistics. All rights reserved.` with `/privacy` link.
        - Kept all other sections on `about.html` and the entire finalized homepage (`index.html`) completely untouched.
    21. Updated Inner-Page Banner Component (`.inner_banner_section`) on About Page (`about.html`):
        - Background Image: Added high-resolution, professional medical courier photography (`assets/images/inner-banner-about.jpg`) featuring a clean delivery vehicle, professional healthcare courier with a temperature-controlled transport cooler, and a contemporary glass healthcare facility entrance.
        - Overlay: Maintained dark midnight navy gradient overlay (`rgba(11, 19, 41, 0.78)` to `0.88`) for maximum text contrast, readability, and subtle Ken Burns zoom animation.
        - Title & Description: Updated H1 title to "About ASR <span>Logistics</span>" with "Logistics" wrapped in `<span>` styled with the elegant serif accent font (`Georgia, italic`, `color: var(--clr-bfdbfe)`). Description paragraph set to "A medical courier built from the ground up to serve the healthcare community with speed, care, and integrity."
        - Preserved banner layout, height, responsive typography, and all other page sections/homepage intact.
    22. Updated About Story Section (`.about_story_section`) Content on About Page (`about.html`):
        - Heading: Updated to "We Carry More Than <span>Packages</span>" with "Packages" wrapped in `<span>` styled with the accent brand font (Georgia serif italic, `--clr-0160d3`).
        - Content: Restored actual content from the old website including mission paragraphs, 3-item feature checklist, and "Contact Us" & "View Our Services" action buttons.
        - Right-Side Media: Preserved `about-carrier.png` with centered overlay branding (circular white ASR Logistics logo, "Trusted Medical Courier" heading, and "Serving Saskatoon" subtitle).
        - Floating Media Card: Restored original frosted glass card design with 44x44 icon container, verified shield icon, bottom: 24px, left: 24px positioning, displaying "Careful Handling" with "Serving Saskatoon" label.
        - Preserved existing layout, dimensions, styling, and GSAP scroll-triggered entrance animations intact, with the finalized homepage completely untouched.
    23. Updated About Pillars / Values Section (`.about_pillars_section`) on About Page (`about.html`):
        - Header: Badge updated to `OUR VALUES` with dot indicator; Heading updated to `What Drives Us <span class="about_pillars_section__heading_accent">Every Day</span>` styled with brand Georgia serif italic accent; Description updated to `"These aren't just words on a wall. They're the standards we hold ourselves to on every single run."`
        - 6 Pillar Cards Grid: Maintained existing responsive grid and card dimensions (`col-12 col-md-6 col-lg-4`), fitting 2 balanced rows of 3 on desktop:
          1. Professional Handling: Padlock SVG icon, `"Patient information and medical items are handled with the highest level of discretion at every step."`
          2. Speed & Urgency: Lightning bolt SVG icon, `"We understand that in healthcare, delays cost more than time. Our team is trained to treat every run with the urgency it deserves."`
          3. Reliability: Handshake SVG icon, `"When you schedule with ASR Logistics, it gets done. Our focus on reliability isn't luck, it's process, planning, and accountability."`
          4. Proper Handling: Thermometer SVG icon, `"Temperature-sensitive medications, fragile specimens, and confidential documents all require specialized handling, and we deliver."`
          5. Transparency: Map pin SVG icon, `"Know where your delivery is. We believe our clients should never have to wonder if something was picked up or delivered."`
          6. Communication: Speech bubble SVG icon with 3 dots, `"Issues are rare, but when they arise, we communicate immediately. No surprises, no excuses, just straight answers and solutions."`
        - Scoped CSS in `assets/css/main-style.css`: Maintained card layout, padding, background, borders, and typography; added brand blue color styling for inline SVGs inside `.about_pillars_section__icon_box`; isolated `transition: transform` to `:hover` to eliminate animation collisions.
        - GSAP ScrollTrigger Animation in `assets/js/animation.js`: Implemented sequential upward entrance timeline (`y: 50` to `y: 0`, `stagger: 0.15`, `ease: "power2.out"`), triggering when scrolled to `top 78%` with reverse on scroll up, `prefers-reduced-motion` support, and `clearProps: "transform"` on completion for seamless CSS hover lift. Finalized homepage and unrelated sections kept untouched.
    24. Refined Animations & Added Hover Bar in `.about_pillars_section` on About Page (`about.html`):
        - Slowed Entrance Animation in `assets/js/animation.js`: Increased card slide duration to `1.0s`, upward travel distance from `y: 65`, staggered sequencing to `0.18s`, and easing to `"power3.out"`. Ensures each card visibly and deliberately slides upward into view with smooth deceleration.
        - Expanding Blue Hover Bar in `assets/css/main-style.css`: Added horizontal blue bar effect via `.about_pillars_section__card::after` (`height: 4px; background-color: var(--clr-0160d3); border-radius: 20px 20px 0 0; transition: width 0.45s cubic-bezier(0.25, 1, 0.5, 1);`). Positioned at the top edge (`top: 0; left: 0;`), the bar expands smoothly from `0%` to `100%` width on hover, and cleanly retracts to `0%` on mouse leave. Card `overflow: hidden` cleanly respects the 20px border radius.
    25. Standardized Section Badges Font Size to `var(--fs-14)` across All Pages:
        - Updated all section badges in `assets/css/main-style.css` to use existing design system variable `--fs-14` (14px):
          1. `.banner_section .banner_section__badge`
          2. `.how_it_works_section .how_it_works_section__badge`
          3. `.why_asr_section .why_asr_section__badge`
          4. `.healthcare_section .healthcare_section__badge`
          5. `.contact_section .contact_section__badge`
          6. `.cta_section .cta_section__badge`
          7. `.services_pin_section .services_pin_section__badge`
          8. `.inner_banner_section .inner_banner_section__subheading` (already `var(--fs-14)`)
          9. `.about_story_section .about_story_section__badge`
          10. `.about_pillars_section .about_pillars_section__badge`
          11. `.privacy_section .privacy_section__badge`
        - Preserved all existing badge text, indicator dots, colors, padding, borders, spacing, and layouts across all pages.
    26. Implemented New Track Record Section (`.about_track_record_section`) on About Page (`about.html`):
        - Placement: Inserted between Story Section (`.about_story_section`) and Values Section (`.about_pillars_section`), creating a natural light-dark-light-dark visual rhythm across the page.
        - Content & Structure:
          - Pill Badge: `BY THE NUMBERS` with indicator dot, styled at `var(--fs-14)`.
          - Heading: `Our Track <span class="about_track_record_section__heading_accent">Record</span>` styled with brand Georgia serif italic accent in `var(--clr-bfdbfe)`.
          - 4 Stat/Key Highlights in responsive 4-column grid (`col-6 col-lg-3`):
            1. Stat `Local` / Label `Saskatoon Service`
            2. Stat `Careful` / Label `Handling`
            3. Stat `Support` / Label `Request-Based`
            4. Stat `Local` / Label `Partnerships`
        - Scoped CSS in `assets/css/main-style.css`: Executive midnight navy card (`var(--clr-0b1329)`), 24px rounded corners, subtle radial ambient glows (`.about_track_record_section__glow--one` & `--two`), translucent stat item cards with subtle hover lift and border highlight, and responsive breakpoint adjustments for tablet/mobile.
        - GSAP ScrollTrigger Animation in `assets/js/animation.js`: Smooth scroll-triggered reveal at `top 78%` with reverse on scroll up, pre-hidden states, sequential stagger (`0.12s`) across the 4 stat items, `clearProps: "transform"` on completion, and `prefers-reduced-motion` support. Finalized homepage and unrelated sections kept untouched.
    27. Updated CTA Section Content on About Page (`about.html`):
        - Pill Badge: Updated to `JOIN OUR NETWORK` with indicator dot, styled at `var(--fs-14)`.
        - Heading: Replaced with `Ready to Partner with ASR?`
        - Subtitle / Description: Updated to `"Every healthcare provider has unique needs. Contact us to discuss your delivery requirements in Saskatoon."`
        - Action Button: Updated text to `Get Started Today &rarr;` with preserved `mailto:asrlogistics.sk@outlook.com` tap-to-email functionality.
        - Preserved: All existing card designs, direct phone contacts (`Inquiries: (639) 471-3662`, `Client Support: (639) 539-0109`), ambient radial glow animations, GSAP ScrollTrigger timeline, and finalized homepage completely untouched.
    28. Created Service Page Foundation (`service.html` & `services.html`):
        - Created `service.html` and `services.html` with:
          - Sticky Site Header (`.site_header`) with "Services" active nav state (`.site_header__nav_link--active`).
          - Reusable Inner Banner (`.inner_banner_section`) with `OUR SERVICES` badge, `Medical Courier <span>Services</span>` heading, and responsive description.
          - Reused CTA Section (`.cta_section`) with `JOIN OUR NETWORK` badge, `Ready to Partner with ASR?` heading, `Get Started Today` action, and direct phone contact links.
          - Reusable 4-column Site Footer (`.site_footer`) matching `about.html` and `index.html`.
    29. Resolved About Page Initial Load Blank Space & Animation Trigger:
        - Root Cause: `.about_story_section` was bound to a ScrollTrigger with `start: "top 40%"`. Because the section sits directly below the inner banner at scroll position 0, its top edge was positioned around 55% of the viewport (below the 40% threshold). This caused GSAP's `fromTo` to immediately apply `autoAlpha: 0` (`visibility: hidden; opacity: 0`) to all section elements while remaining paused, creating a large white blank gap on page load until the user scrolled down.
        - Fix in `assets/js/animation.js`:
          - Transitioned `.about_story_section` to a page-load entrance timeline (`delay: 0.25s`) synchronized with the inner banner entrance (`delay: 0.15s`), eliminating the need for user scrolling.
          - Kept smooth, subtle entrance reveals: left content slides up (`y: 28` to `0`), right media slides from right (`x: 50` to `0`), and floating card enters with staggered upward float (`y: 45` to `0`).
          - Added `clearProps: "transform"` on completion across all items for pristine CSS layout rendering and hover interactions.
          - Decoupled Sections 3 and 4 (`about_track_record_section` and `about_pillars_section`) so their ScrollTrigger setups remain modular and unaffected.
          - Preserved banner height, layout, spacing, design, and finalized homepage completely untouched.
    30. Updated Floating Card Animation Timing in About Story Section:
        - Updated `.about_story_section__floating_card` animation in `assets/js/animation.js`:
          - All other section elements (left content copy and right media image) reveal completely first.
          - Added a 2-second delay (`"+=2.0"`) after the entire section finishes revealing before the floating card animation begins.
          - Floating card enters last with a gentle upward slide and fade-in (`{ autoAlpha: 0, y: 35 }` to `{ autoAlpha: 1, y: 0 }`, duration `0.85s`, `power2.out`).
          - Automatically clears transforms on completion (`clearProps: "transform"`) preserving all CSS positioning and hover styles.
          - Triggers reliably on initial page load as part of the section entrance sequence without requiring scrolling.
          - Homepage and other sections remain completely untouched.
    31. Created Services Grid Section (`.services_grid`) on Services Page (`services.html` & `service.html`):
        - Placement: Inserted directly below the inner banner (`.inner_banner_section`) and before `.cta_section`.
        - Alternating Layout: Built 6 service rows using authentic website content:
          - Row 1: Prescription Delivery (Icon Box left, Text Wrapper right)
          - Row 2: Clinic Deliveries (Text Wrapper left, Icon Box right)
          - Row 3: Lab & Specimen Runs (Icon Box left, Text Wrapper right)
          - Row 4: Vaccine & Temperature-Sensitive Delivery (Text Wrapper left, Icon Box right)
          - Row 5: Equipment & Supply Deliveries (Icon Box left, Text Wrapper right)
          - Row 6: Document Transport (Text Wrapper left, Icon Box right)
        - Components & Elements:
          - Icon Box: Midnight navy container (`var(--clr-0b1329)`), 24px radius, circular glowing icon wrapper with inline SVG, service excerpt text, and "Get This Service" button with hover micro-interaction.
          - Text Wrapper: White card (`var(--clr-white)`), `SERVICE 0X` pill badge, service title with mini matching inline SVG icon, detailed descriptive text area, and 4 bullet points with checkmark icons.
        - Scoped CSS in `assets/css/main-style.css`: Scoped to `.services_grid` with responsive breakpoints, hover lifts, and clean typography.
        - GSAP ScrollTrigger Animations in `assets/js/animation.js`:
          - Row 1: Reveals automatically on initial page load (`delay: 0.25s`) with left column entering from left (`x: -45`) and right column entering from right (`x: 45`) without requiring user scrolling.
          - Rows 2–6: Animate as they enter the viewport via ScrollTrigger (`start: "top 78%"`), with left columns entering from left and right columns entering from right with smooth stagger (`0.14s`) and `clearProps: "transform"` on completion.
          - Responsive & Accessibility: On mobile (<768px), uses subtle upward entrance (`y: 25`) to prevent horizontal overflow; supports `prefers-reduced-motion`.

    32. Updated Services Grid Content from Live Reference Website (`https://asrlogistics.ca/pages/services.html`):
        - Updated `services.html` and `service.html` to faithfully match the 5 exact services from the live website source of truth:
          1. Service 01: Prescription Delivery (Icon Box left, Text Wrapper right)
             - Excerpt: "Most-requested service.<br>Perfect for independent & chain pharmacies."
             - Button: "Get This Service"
             - Detailed Text: 2 paragraphs detailing pharmacy counter pickup, patient/facility delivery, tracking/documentation, proper chain-of-custody, specialty medications, and signature confirmation.
             - Bullet Points: Professional handling of medical items, Signature confirmation available, Optimized routing for 4-5 batch deliveries, Same-day and scheduled runs, Delivery confirmation records.
          2. Service 02: Clinic Deliveries (Text Wrapper left, Icon Box right)
             - Excerpt: "Clinic-to-clinic and pharmacy-to-clinic.<br>We work around your hours."
             - Button: "Get a Quote"
             - Detailed Text: 2 paragraphs detailing inter-office supply transfers, urgent clinic-to-clinic runs, operational flow integration, recurring scheduled routes, and on-call demand flex.
             - Bullet Points: Recurring scheduled routes, On-demand urgent runs, Medical supply transport, Inter-office equipment transfer.
          3. Service 03: Lab & Specimen Runs (Icon Box left, Text Wrapper right)
             - Excerpt: "Time-critical specimen transport.<br>Reliable handling."
             - Button: "Contact Us"
             - Detailed Text: 2 paragraphs detailing specimen integrity, chain-of-custody documentation, temperature-controlled transport for biological samples, swabs, blood draws, and pathology specimens.
             - Bullet Points: Chain-of-custody documentation, Temperature-controlled transport, Biohazard certified handling, Time-critical scheduling.
          4. Service 04: Vaccine Delivery (Text Wrapper left, Icon Box right)
             - Excerpt: "Cold-chain vaccine transport.<br>Clinics, hospitals, and pharmacies."
             - Button: "Get a Quote"
             - Detailed Text: 2 paragraphs detailing cold-chain protocols for vaccines and sensitive biological products, routine immunizations, and urgent specialty vaccines.
             - Bullet Points: Strict cold-chain management, Priority "First-Off" handling, Temperature monitoring availability, Clinic and hospital distribution.
          5. Service 05: Document Transport (Icon Box left, Text Wrapper right)
             - Excerpt: "Professional document courier.<br>Discretion assured."
             - Button: "Learn More"
             - Detailed Text: 2 paragraphs detailing medical records, referrals, paperwork, sensitive document handling, inter-facility transfer, and time-sensitive insurance authorizations.
             - Bullet Points: Professional handling, Signed delivery confirmation, HIPAA / PHIPA compliant, Urgent & same-day options.
        - Preserved layout structure: Exactly 5 alternating rows, responsive styling, icon boxes with inline SVGs, badges (`SERVICE 01` to `SERVICE 05`), and buttons.
        - Preserved animations: Row 1 auto-reveals on page load; Rows 2-5 animate via ScrollTrigger with alternating slide directions.
        - CSS update: Styled `.services_grid .services_grid__desc` in `assets/css/main-style.css` to cleanly accommodate multi-paragraph descriptions.
        - Untouched pages: `index.html` and `about.html` remain untouched.
    33. Updated CTA Section Content on Services Page (`services.html` & `service.html`):
        - Updated content based on user reference screenshot:
          - Pill Badge: Updated to `GET STARTED` with indicator dot (`.cta_section__badge_dot`), styled at `var(--fs-14)`.
          - Main Heading: Updated to `Need a Custom Delivery Solution?`.
          - Subtitle: Updated to `"Every healthcare provider has unique needs. Contact us and we'll build a plan that works for you."`.
          - Dual Action Buttons:
            1. Primary Blue Button: `Contact Us Today` (`href="index.html#contact"`), styled with `.cta_section__btn_primary.rounded-pill`.
            2. Dark Navy Button: `Portal` (`href="pharmacy-login.html"`), styled with `.cta_section__btn_navy.rounded-pill`.
        - CSS Updates in `assets/css/main-style.css`: Added `.cta_section .cta_section__btn_navy` scoped to `.cta_section` with smooth hover lift, dark background (`var(--clr-0b1329)`), white text, and subtle glow.
        - Preserved Elements: Direct phone contacts, ambient radial glow animations, responsive layout, GSAP ScrollTrigger timeline, and untouched pages (`index.html` and `about.html`). (User subsequently streamlined action button to single `Contact Us Today` button).
    34. Distinct Gradient Color Schemes for Services Grid (`.services_grid`):
        - Created 5 unique, balanced, and medical-grade color schemes matching each service:
          1. Service 01 (Prescription Delivery): **Emerald / Teal**
             - Icon Box: `.services_grid__icon_box--emerald` with deep botanical night gradient (`#072523` -> `#0c3e38` -> `#051f1c`) and subtle radial emerald sheen (`rgba(52, 211, 153, 0.18)`).
             - Main Icon: Luminous mint/emerald (`#34d399`) with matching tinted glow ring.
             - Title Icon: `.services_grid__title_icon--emerald` in `#059669` on `#ecfdf5` background with `#a7f3d0` border.
          2. Service 02 (Clinic Deliveries): **Purple / Violet**
             - Icon Box: `.services_grid__icon_box--violet` with executive royal plum gradient (`#180f2b` -> `#28174a` -> `#120a22`) and violet ambient sheen (`rgba(192, 132, 252, 0.18)`).
             - Main Icon: Vibrant soft lilac/violet (`#c084fc`) with matching tinted glow ring.
             - Title Icon: `.services_grid__title_icon--violet` in `#7c3aed` on `#f5f3ff` background with `#ddd6fe` border.
          3. Service 03 (Lab & Specimen Runs): **Coral / Orange**
             - Icon Box: `.services_grid__icon_box--coral` with deep warm burgundy gradient (`#271216` -> `#421b21` -> `#1e0d10`) and coral ambient sheen (`rgba(251, 146, 60, 0.18)`).
             - Main Icon: Radiant warm coral (`#fb923c`) with matching tinted glow ring.
             - Title Icon: `.services_grid__title_icon--coral` in `#ea580c` on `#fff7ed` background with `#fed7aa` border.
          4. Service 04 (Vaccine Delivery): **Cyan / Glacier Ice**
             - Icon Box: `.services_grid__icon_box--cyan` with cryogenic oceanic gradient (`#071f2f` -> `#0d364f` -> `#051622`) and glacier ice sheen (`rgba(56, 189, 248, 0.18)`).
             - Main Icon: Radiant ice cyan (`#38bdf8`) with matching tinted glow ring.
             - Title Icon: `.services_grid__title_icon--cyan` in `#0891b2` on `#ecfeff` background with `#a5f3fc` border.
          5. Service 05 (Document Transport): **Amber / Warm Gold**
             - Icon Box: `.services_grid__icon_box--amber` with obsidian gold gradient (`#231b08` -> `#3d2f10` -> `#191305`) and golden ambient sheen (`rgba(251, 191, 36, 0.18)`).
             - Main Icon: Radiant amber gold (`#fbbf24`) with matching tinted glow ring.
             - Title Icon: `.services_grid__title_icon--amber` in `#d97706` on `#fffbeb` background with `#fde68a` border.
        - CSS Variables: Added all color stops and accent tokens directly to existing `:root` in `assets/css/main-style.css`.
        - Scoped CSS: Fully scoped under `.services_grid` with matching hover glow borders and box-shadows.
        - Preserved: Dimensions, layout, spacing, border radius, content, buttons, entrance animations, and all other pages remain completely untouched.
    35. Blue Variant Gradients for Services Grid Icon Boxes:
        - Updated only the background gradients of all 5 service icon boxes in `services_grid` to cohesive, distinct shades of blue aligned with ASR Logistics' brand identity:
          1. Service 01 (Prescription Delivery): **Deep Ocean Blue** (`linear-gradient(145deg, #07192f 0%, #0c2d54 52%, #051426 100%)` with sky-cyan radial sheen `rgba(14, 165, 233, 0.22)`).
          2. Service 02 (Clinic Deliveries): **Royal Blue** (`linear-gradient(145deg, #0e1e47 0%, #1e3a8a 52%, #0b1536 100%)` with sapphire radial sheen `rgba(59, 130, 246, 0.25)`).
          3. Service 03 (Lab & Specimen Runs): **Navy Blue** (`linear-gradient(145deg, #081124 0%, #132247 52%, #060c1c 100%)` with classic midnight radial sheen `rgba(37, 99, 235, 0.22)`).
          4. Service 04 (Vaccine Delivery): **Cyan-Blue** (`linear-gradient(145deg, #052438 0%, #0d466b 52%, #041a29 100%)` with arctic ice radial sheen `rgba(6, 182, 212, 0.25)`).
          5. Service 05 (Document Transport): **Sky / Slate Blue** (`linear-gradient(145deg, #0d2137 0%, #173b61 52%, #091728 100%)` with soft sky radial sheen `rgba(56, 189, 248, 0.22)`).
        - Icon Colors Preserved: All existing icon colors (`#34d399`, `#c084fc`, `#fb923c`, `#38bdf8`, `#fbbf24`), icon wraps, and title icons beside service headings remained 100% untouched.
        - Preserved Elements: Box dimensions, layout, spacing, border radius, content, buttons, GSAP animations, and all other pages remain untouched.
    36. Final Contact Page (`contact.html`) with Dedicated FAQ Section:
        - **Shared Layout:** Reused the exact header (`.site_header`), inner-page banner structure (`.inner_banner_section`), and footer (`.site_footer`) from `about.html` and `services.html`. Set "Contact" link in header navigation to `.site_header__nav_link--active`.
        - **Inner Banner:** Configured with "GET IN TOUCH" pill badge, Manrope heading "Contact ASR Logistics" with serif italic accent, and subtitle: "Reach out to set up scheduled routes, request on-demand delivery, or speak with our Saskatoon team.".
        - **Contact Section:**
          - Reused the exact form fields (`name`, `organization`, `phone`, `email`, `service_type`, `schedule_type`, `message`), labels, and submit button from the homepage.
          - Polished direct-assistance info panel with verified phone numbers (Inquiries: `(639) 471-3662`, Client Support: `(639) 539-0109`), email (`asrlogistics.sk@outlook.com`), Service Area (Saskatoon & Surrounding Healthcare Facilities), and Operating Hours (`Mon–Fri: 9AM–8PM | Sat: 9AM–5PM`).
          - Maintained direct email submission to `asrlogistics.sk@outlook.com` via client-side validation and formatted `mailto:` action in `assets/js/function.js`.
        - **Dedicated FAQ Section (`.contact_faq_section`):**
          - Clean header with `FREQUENTLY ASKED QUESTIONS` badge, prominent title "Everything You Need to Know", and short introductory description.
          - 6-item interactive Bootstrap 5 accordion (`#faqAccordion`) covering:
            1. Service coverage (Saskatoon & surrounding clinics/pharmacies/labs).
            2. Scheduled routes vs. urgent on-demand dispatch.
            3. Supported items (prescriptions, biohazard specimens, vaccines, clinic supplies, medical documents).
            4. Specimen, vaccine, and cold-chain compliance handling protocols.
            5. Setup and onboarding timeline (same-day or next-day scheduling).
            6. Chain-of-custody tracking and delivery confirmations.
        - **Scoped Styling & Animations:**
          - Scoped `.contact_faq_section` CSS added to `assets/css/main-style.css` using BEM naming, CSS variables, card hover lifts, custom accordion icons, and immediate responsive media queries.
          - Added `initFaqSection()` in `assets/js/animation.js` with smooth GSAP ScrollTrigger timeline at `top 80%` and `clearProps: "transform"`.
        - **Preserved Codebase:** `index.html`, `about.html`, and `services.html` remain completely untouched.
    37. Contact Section Visual Refinement (Inspired by Screenshot Reference):
        - **Layout Realignment:** Restructured the Contact section on `contact.html` into a balanced asymmetric two-column composition mirroring the reference:
          - **Left Column (`.contact_section__col_info`):** Left-aligned section introduction with "CONTACT US" pill badge, Manrope heading *"Let's Start a Conversation"*, descriptive introductory copy, and vertical contact info items with solid blue rounded icon squircle boxes (`48px x 48px`, `#0160d3` background, white SVG icons) for Phone, Email, Service Area, and Operating Hours (with urgent needs note).
          - **Partner / Support Card:** Added bottom dark navy card (`#0b1329`, rounded corners, subtle border) for *"Already a Partner?"* with direct client support call-to-action button (`tel:+16395390109`).
          - **Right Column (`.contact_section__col_form`):** Elevated form card with card header (*"Send Us a Message"* and *"We'll get back to you within 1–2 business hours."*).
        - **Form Unaltered:** 100% preserved all 7 form fields (`name`, `organization`, `phone`, `email`, `service_type`, `schedule_type`, `message`), labels, placeholders, validation, and email submission behavior (`mailto:asrlogistics.sk@outlook.com`).
        - **Scoped CSS & Animations:** Added complete scoped `.contact_section` styling and responsive breakpoints in `assets/css/main-style.css`. Updated `initContactSection()` in `assets/js/animation.js` to smoothly animate both columns with ScrollTrigger and `clearProps: "transform"`.
        - **Preserved Codebase:** FAQ section, `index.html`, `about.html`, and `services.html` remain untouched.
    38. Complete Website-Wide Link Audit & Navigation Connection:
        - **Site-Wide Connection:**
          - **Home:** Pointed to `index.html` / `#home`.
          - **About:** Connected across all header navigations and footer company links to `about.html`.
          - **Services:** Fixed broken `service.html` typos on `services.html` and `contact.html` to `services.html`. Updated all header navigations, footer company links, and all 6 individual footer service items across `index.html`, `about.html`, `services.html`, `contact.html`, and `privacy.html` to link to `services.html`.
          - **Contact:** Connected across all header navigations, footer company links, CTA buttons, and individual service buttons across `about.html`, `services.html`, and `index.html` to `contact.html`.
          - **Privacy Policy:** Fixed broken root-relative `/privacy` links to `privacy.html` across all page footers.
        - **"Why ASR" Special Handling:**
          - Configured all "Why ASR" links across all inner pages (`about.html`, `services.html`, `contact.html`, `privacy.html`) to `index.html#why-asr`, and in-page anchor on homepage to `#why-asr`.
          - Implemented dynamic smooth scrolling and hash navigation in `assets/js/function.js`:
            1. Dynamically reads `.site_header` height (`105px` desktop / `64px` mobile).
            2. Intercepts in-page hash anchor clicks, calculating exact top offset (`getBoundingClientRect().top + window.pageYOffset - headerHeight - 20px`) and smooth scrolling to prevent section heading from being hidden behind sticky header.
            3. On cross-page direct navigation or page refresh with a hash (e.g. `index.html#why-asr`), delays slightly until page load and ScrollTrigger settle, then smoothly scrolls precisely into position.
            4. Automatically closes mobile navigation drawer when any link is clicked.
        - **Dead Link Removal:** Verified 0 broken paths, 0 missing files, and 0 empty `#` placeholder links across all pages.
        - **Preserved Design & Content:** All page layouts, designs, typography, animations, and contact form handling remain 100% intact.













