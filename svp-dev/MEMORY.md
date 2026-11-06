# Project Memory

## Project Type
Corporate website for SVP Minerals — Global Bulk Commodities & Energy Trading.

## Design Source
- `ruff-logo.jpeg`: Used for branding identity, value proposition signature badge (`GLOBAL 🌐 TRADER`), core commodities (Coal, Energy, Biofuel), and hero visual direction (port terminal, bulk vessel, maritime logistics).
- `footer-design.jpeg`: Official letterhead reference used for footer layout, contact details (Email, Phone, Address), top-bar styling, and dynamic blue-green wave motif.
- `assets/images/`: Finalized logo (`site-logo-removebg.png`), site icon/favicon (`site-icon.jpeg`), and secondary logo (`site-secondary-logo.jpeg`).

## Framework
Bootstrap 5 (`./assets/css/bootstrap/bootstrap.min.css`, `./assets/js/bootstrap/bootstrap.bundle.min.js`)

## Fonts
- Headings: 'Plus Jakarta Sans', sans-serif
- Body / Primary: 'DM Sans', sans-serif
- Typography variables available in `:root` with responsive breakpoints: `--fs-120` down to `--fs-14`

## Icons
Inline accessible SVGs (Zero third-party icon library dependencies).

## Libraries
- Bootstrap 5
- jQuery (`./assets/js/jquery/jquery.min.js`)
- Owl Carousel (`./assets/css/owl/owl.carousel.min.css`, `./assets/css/owl/owl.theme.default.min.css`, `./assets/js/owl/owl.carousel.min.js`)
- Zero unauthorized libraries (Font Awesome, Swiper unlinked/removed)

## Global Components
- Primary Button: `.primary_btn` / `.header_section__btn` / `.hero_section__btn_primary`
- Secondary Button: `.hero_section__btn_secondary`
- Spacing Utilities: `.pt_100`, `.pb_100`, `.pt_50`, `.pb_50`, `.mt_100`, `.mb_100`, `.mt_50`, `.mb_50`
- Colors: `--clr-0a2540`, `--clr-0284c7`, `--clr-0369a1`, `--clr-16a34a`, `--clr-22c55e`, `--clr-15803d`, `--clr-f8fafc`, `--clr-64748b`, `--clr-e2e8f0`, `--clr-0f172a`, `--clr-white`, `--clr-black`

## Current Section Order
1. `header_section` (`.header_section`): Topbar with contact details, primary navigation menu (Home, Products, About), header CTA button (`Inquire Now`), responsive mobile & tablet drawer toggle with inline SVG menu/close icons, dedicated drawer header with close action, brand-themed active/hover states, background scroll locking, and orientation optimization. Desktop header and navigation remain completely unchanged.
2. `hero_section` (`.hero_section`): Value proposition badge (`GLOBAL 🌐 TRADER`), headline, lead text, action CTAs, maritime cargo visual background, trust badge. On mobile screens (< 992px), responsive CSS flex layout separates the existing hero background image into a dedicated image area at the very top of the banner with clear framing (80% 35%), followed by the content container underneath on a clean white background. Desktop layout remains completely unchanged.
3. `about_section` (`.about_section`): Positioned immediately after Hero banner. Smooth sequential scroll reveal animation, company overview and mission.
4. `commodities_section` (`.commodities_section`, `#commodities` / `#products`): Modern 3-card grid (Thermal & Coking Coal, Energy Commodities, Sustainable Biofuels) with 800x600 WebP imagery, category badges, and staggered scroll reveal. Card 1 links directly to `#coal-supply`.
5. `coal_supply_section` (`.coal_supply_section`, `#coal-supply`): Dedicated "Coal Trading & Supply" section with 4 highlight blocks (Indonesian Imported Coal, Indian Coal, Lignite, GAR 3600–5000 Grades) and 6 verified accredited mining origins (MIFA, BSSR, ATM, LANA, KUTAI, SINGLURUS) with an inquiry allocation CTA.
6. `testimonials_section` (`.testimonials_section`, `#testimonials`): Modern responsive Owl Carousel slider featuring 5 B2B commodity trading client reviews, 5-star SVG ratings, monogram initials avatars, equal-height card layouts, custom SVG navigation arrows, and pagination dots.
7. `contact_section` (`.contact_section`, `#contact`): Modern two-column section with verified business headquarters address card on the left and full validation contact form on the right.
8. `footer_section` (`.footer_section`): Multi-column layout with brand overview, commodities, quick navigation (Home, Products, About), exact contact details, secondary logo, and bottom copyright bar.

## Navigation Standard
- Header and Footer navigation strictly use the 3-page structure:
  1. **Home**: `./index.html`
  2. **Products**: `./products.html`
  3. **About**: `./about.html`
- Active states:
  - `index.html`: `Home` marked active
  - `products.html`: `Products` marked active
  - `about.html`: `About` marked active
- All other navigation links removed; header CTA button retained.

## Dedicated Pages
1. **Products Page (`products.html`)**:
   - `inner_banner_section`: Background `inner-banner-products.webp`, breadcrumbs (`Home / Products`), title "Our Products", matches homepage hero banner padding-top (`calc(var(--headerHeight, 120px) + 50px)` on desktop, responsive dynamic header height on tablet/mobile).
   - `products_listing_section`: Badge "Mineral Portfolio", title "Explore Our Coal Products", description, responsive 4-card grid:
     1. Indonesian Coal (GAR 3800-5000 kcal/kg, `product-indonesian-coal.jpg`)
     2. Indian Coal (Domestic Thermal & Industrial, `product-indian-coal.jpg`)
     3. Lignite (Commercial & Industrial Grade, `product-lignite.jpg`)
     4. Other Coal Grades (Screened Lumps, Fines & ROM, `product-coal-grades.jpg`)
     Each card features grade badge, specification pills, and "Enquire Now" CTA. Strictly zero filter/search/sort UI.
   - `page_cta_section`: Bulk allocation inquiry card with direct desk call and quote request.

2. **About Page (`about.html`)**:
   - `inner_banner_section`: Background `inner-banner-about.webp`, breadcrumbs (`Home / About Us`), title "About Us", matches homepage hero banner padding-top (`calc(var(--headerHeight, 120px) + 50px)` on desktop, responsive dynamic header height on tablet/mobile).
   - `about_intro_section`: Two-column layout with operations photo (`about-operations.jpg`) and floating trade badge on left; narrative copy, mine partner highlights, and dual CTA buttons on right.
   - `about_expertise_section`: 4 core competency cards (Diverse Coal Trading, Multiple Coal Grades, Indian & Indonesian Coal, Reliable Supply Network).
   - `about_why_choose_section`: 4 distinct advantage cards with numbering (Wide Product Range, Multiple Grade Availability, Industry Knowledge, Customer-Focused Approach).
   - `page_cta_section`: Supply chain partnership CTA banner.

## Terminology Standard
- All historical references to "Importer", "Exporter", "Import & Export" have been replaced site-wide with "Trader", "Global Trading", or "Trading".
- 0 business-related occurrences of "Import", "Export", "Importer", or "Exporter" remain across custom site markup and styles.
- Legal Registration: The firm is not registered as Private Limited. All terms ("Private Limited", "Pvt Ltd", "Pvt. Ltd.", "PVT LTD", "Ltd") have been removed site-wide.
- Official Company Name: **SVP Minerals**.
- Logo: Displays "SVP" and **"MINERALS"** only ("PVT LTD" removed from `site-logo-removebg.png`, `site-logo.jpeg`, and `site-secondary-logo.jpeg`). The complete word "MINERALS" is unified (M through S) and centered horizontally across the entire logo composition with exact visual and mathematical symmetry (57px left margin, 57px right margin), matching the client-provided reference screenshot precisely. Proportions, symbol, typography, and styling preserved.

## Scroll Reveal Animation Standard
- Applied to all content sections between Hero and Footer:
  - `.about_section` (`#about`)
  - `.commodities_section` (`#commodities`)
  - `.coal_supply_section` (`#coal-supply`)
  - `.testimonials_section` (`#testimonials`)
  - `.contact_section` (`#contact`)
- Excluded: Header (`.site_header`), Hero/Banner (`.hero_section`), and Footer (`.site_footer`).
- Permitted Directions Only:
  - Left to Right: `.reveal_left` (`translateX(-40px)` -> `translateX(0)`)
  - Right to Left: `.reveal_right` (`translateX(40px)` -> `translateX(0)`)
  - Bottom to Top: `.reveal_bottom` (`translateY(40px)` -> `translateY(0)`)
- Implementation: Native CSS transitions (`0.8s cubic-bezier(0.16, 1, 0.3, 1)`) + native `IntersectionObserver` in `assets/js/function.js` (unobserves on reveal).
- Stagger Delays: `.delay_1` (0.1s) through `.delay_6` (0.6s).
- Accessibility: `@media (prefers-reduced-motion: reduce)` disables animations; `<noscript>` inline fallback ensures zero content clipping if JavaScript is disabled.

