# Project Memory

## Project Type
Commercial Kitchen & Food Processing Automation Solution Provider Homepage HTML Demo (SEJONG HITECH / 韩国世宗高科技)

## Design Source
- Project Brief: `Homepage_HTML_Demo_Brief_for_Developer.docx`
- Reference Site: `http://mediumturquoise-hummingbird-491885.hostingersite.com/`

## Framework
Bootstrap 5

## Fonts
- Primary: `"DM Sans", sans-serif`
- Typography variables available: Yes
  - `--fs-120`, `--fs-80`, `--fs-52`, `--fs-40`, `--fs-34`, `--fs-30`, `--fs-28`, `--fs-25`, `--fs-24`, `--fs-22`, `--fs-20`, `--fs-18`, `--fs-16`, `--fs-14`, `--fs-12`

## CSS Variables
- Spacing: `--spc-100`, `--spc-50`, `--spc-40`, `--spc-30`, `--spc-20` (responsive via media queries)
- Colors:
  - Brand Red: `--clr-c8161d`, `--clr-a50e14`
  - Dark/Charcoal/Navy: `--clr-141414`, `--clr-1c1c1c`, `--clr-27272a`, `--clr-0f141c`, `--clr-222d3c`, `--clr-2a374a`, `--clr-1d1e1f`
  - Slate/Muted: `--clr-71717a`, `--clr-8892b0`, `--clr-cbd5e1`, `--clr-e2e8f0`
  - Light/Background: `--clr-white`, `--clr-f4f4f5`, `--clr-f3f4f6`, `--clr-f2e9d5`
  - Accent/Status: `--clr-dcb978`, `--clr-10b981`, `--clr-black`

## Icons
- Clean, semantic inline SVG icons (stroke-based engineering aesthetic)

## Libraries
- jQuery 3.x
- Bootstrap 5.x Bundle
- Owl Carousel 2
- AOS (Animate On Scroll) 2.3.4

## Global Components & Utilities
- `.primary_btn`: Primary red interactive button with hover states
- Scroll reveal animations (`initScrollAnimations` in `function.js` using AOS and native IntersectionObserver)
- Responsive container (`max-width: 1440px` on `min-width: 1500px`)

## Sections in index.html
1. `site_header`: Sticky header with logo, navigation, and CTA
2. `hero_section`: Carousel banner with engineering badges, headlines, and dual CTAs
3. `what_we_do_section`: 4 direction entry points
4. `industries_section`: Targeted industry solution cards
5. `process_flow_section`: Interactive workflow / system connection process with exploded view / component highlights
6. `featured_products_section`: Machinery showcase with tabs and spec cards
7. `why_us_section`: 4 core strengths (Experience, Engineering, Integration, Global Network)
8. `projects_section`: Delivery cases and project showcases
9. `final_cta_section`: High-impact consultation / trial booking form and contact cards
10. `site_footer`: Executive engineering console footer with complete company credentials

## Notes
- Strict BEM naming with `snake_case` (e.g. `hero_section__title`, `process_flow_section__item`)
- All CSS scoped under parent section classes
- Reusable CSS structure with defined section comment blocks
