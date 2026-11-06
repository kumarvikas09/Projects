# Project Memory

## Project Type
Instlld Homepage - Australia's Installation Specialists (Tradie booking & service marketplace)

## Design Source
Figma Design (Instlld Homepage)

## Framework
Bootstrap 5 (v5.3.x) + Vanilla JS (jQuery bundled as fallback/utility)

## Fonts
- Primary: Poppins (`"Poppins", "DM Sans", sans-serif`)
- Secondary: DM Sans (Navigation), Roboto (Buttons)
- Typography variables available: Yes
  - Sizes: `--fs-120`, `--fs-80`, `--fs-69`, `--fs-65`, `--fs-60`, `--fs-52`, `--fs-50`, `--fs-40`, `--fs-34`, `--fs-30`, `--fs-28`, `--fs-25`, `--fs-24`, `--fs-22`, `--fs-20`, `--fs-18`, `--fs-16`, `--fs-14`
  - Breakpoints: Responsive scaling mapped at `1399.98px`, `1199.98px`, `991.98px`, and `767.98px`.

## Icons & Assets
- Local SVG icons located in `assets/images/icons/` (categories, badges, arrows, socials, trust icons)
- Images in `assets/images/` (.webp format for performance)

## Libraries
- Bootstrap 5 Bundle (`assets/js/bootstrap/bootstrap.bundle.min.js`)
- jQuery (`assets/js/jquery/jquery.min.js`)
- Owl Carousel & Swiper available in assets directories

## Global Components & Utilities
- Primary Button: `.primary_btn` (multi-stop brand gradient)
- Secondary / Outline Button: `.primary_btn.white`
- Section Heading: `.sec_hdng`
- Spacing Utilities: `.pt_100`, `.pb_100`, `.pt_50`, `.pb_50`, `.mt_100`, `.mb_100`, `.mt_50`, `.mb_50` (using `--spc-100`, `--spc-50`)
- Custom Container: `.container` extended up to `1650px` on screens `>= 1500px`

## Implemented Sections & Pages
1. `header_section` (`#siteHeader`) - Sticky header with responsive mobile drawer & backdrop
2. `hero_section` - Headline, value propositions, 4.9 rating badge, hero collage, location postcode search form
3. `category_section` (`#services`) - Category card carousel with arrows & dot pagination
4. `how_it_works_section` (`#how-it-works`) - 3-step process cards with connective arrows
5. `popular_services_section` - Horizontal service cards carousel with prev/next navigation
6. `trust_section` - 4-pillar trust & warranty feature highlights
7. `footer_section` (`#help`) - Brand info, social links, categorized sitemap links, app download badges, legal footer
8. `inner_banner` - Reusable common inner page banner component with breadcrumbs, gradient typography & supporting text
9. `service_category_section` (`services.html`) - Category sidebar + search bar + strictly image & title service cards grid + empty state

## Existing JavaScript (assets/js/custom.js)
- Sticky header scroll handler (`.header_section--scrolled`)
- Mobile navigation toggle, backdrop click & escape key handler
- Popular services carousel scroll (`#popularServicesTrack`)
- Category slider scroll & synchronized dot pagination (`#categorySliderTrack`)
- Postcode search form validation & submit handler (`#postcodeSearchForm`)
- Service Category Landing Page (`services.html`): Design-only layout featuring all 18 main categories with functional tabs, max 9 service cards per category, WooCommerce-ready markup, and design-only search bar.

## Notes
- Strict adherence to `AGENTS.md` naming (`snake_case` with BEM)
- All section CSS scoped under their respective section parent classes in `assets/css/main-style.css`
- Global variables defined exclusively in `:root` of `assets/css/main-style.css`
