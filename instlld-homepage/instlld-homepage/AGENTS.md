# Frontend Development Standards
Version: 1.0

## Role

You are a Senior Frontend Developer.

Generate clean, scalable, production-ready, maintainable and reusable frontend code.

Always analyze the existing project before writing any code.

---

# Project Inspection (Critical)

Before generating any code:

1. Inspect the existing project structure.
2. Inspect the existing `style.css` completely.
3. Identify all global CSS utilities.
4. Identify existing CSS variables.
5. Identify reusable components.
6. Identify existing JavaScript functions.
7. Reuse existing code wherever possible.
8. Never recreate anything that already exists.

---

# General Rules

- Generate only the requested section.
- Never modify unrelated code.
- Never regenerate the entire project unless requested.
- Analyze the design before coding.
- Reuse existing project structure whenever possible.
- Match the design as closely as possible.
- If any part of the design is unclear, ask before making assumptions.

---

# HTML Rules

- Use semantic HTML5.
- Use Bootstrap 5 as the primary framework.
- Keep HTML clean and minimal.
- Avoid unnecessary wrappers.
- Keep DOM size as small as possible.
- Use meaningful element hierarchy.

---

# Bootstrap Rules

- Bootstrap is the primary framework.
- Prefer Bootstrap Grid.
- Prefer Bootstrap utility classes.
- Write custom CSS only when Bootstrap cannot achieve the required design.
- Never recreate Bootstrap utilities using custom CSS.

---

# CSS Rules

## Scoping

- Every section must have a unique parent class.
- Scope every selector using the parent section class.
- Never write section CSS without a parent selector.
- Never modify global classes directly.
- If a global class requires customization, always scope it using the parent section class.

---

## Naming Convention

### HTML & CSS

- Always use snake_case.
- Follow BEM methodology with snake_case.

Examples:

```
hero_section
hero_section__content
hero_section__image
hero_section--dark
```

Never use generic class names such as:

```
wrapper
content
section
box
left
right
item
```

unless they are scoped inside a section.

---

## JavaScript Naming

- Variables → camelCase
- Functions → camelCase
- Constants → UPPER_SNAKE_CASE

---

# CSS Optimization

- Reuse existing global CSS.
- Reuse existing utility classes.
- Reuse existing buttons.
- Reuse existing typography.
- Reuse spacing utilities.
- Minimize duplicate CSS.
- Keep CSS modular.
- Keep CSS readable.
- Avoid unnecessary specificity.
- Never use `!important` unless explicitly requested.

---

# Reusable Components

Before creating any new component:

- Check whether a similar component already exists.
- Reuse existing HTML structure whenever possible.
- Reuse existing CSS classes.
- Promote repeated UI patterns into reusable global components.

---

# CSS Organization

Every section must follow this structure:

```
/* ==========================================
Section Name CSS Start
========================================== */

/* Section CSS */

/* ==========================================
Section Name CSS End
========================================== */
```

Keep that section's media queries immediately below it.

Never collect all media queries at the end of the stylesheet.

---

# Images

- Always use meaningful alt attributes.
- Never distort image aspect ratio.
- Images must remain responsive.
- Use lazy loading for non-critical images whenever appropriate.

---

# Typography Rules

- Always use existing font-size variables.
- Never hardcode font sizes if an existing variable can be reused.
- If a new font size is required:
  - Create a new variable inside `:root`.
  - Add its responsive values inside the existing responsive media queries.
- Never override responsive variable values unless absolutely necessary.

---

# CSS Variable Rules (Critical)

Maintain only these global CSS variable categories.

## Color Variables

Use:

```
--clr-
```

Rules:

- Never hardcode colors.
- Check whether the variable already exists.
- If it exists, reuse it.
- If not, create a new variable inside the existing `:root`.

Example:

```css
:root{

--clr-white:#ffffff;

--clr-black:#000000;

--clr-222d3c:#222d3c;

--clr-f3f4f6:#f3f4f6;

}
```

---

## Font Size Variables

Use:

```
--fs-
```

Rules:

- Always reuse existing font-size variables.
- If required, create a new one.
- Add responsive values inside existing media queries.

---

## Spacing Variables

Use:

```
--sp-
```

Rules:

- Reuse existing spacing variables whenever possible.
- If a new spacing value is required, create a new variable.
- Add responsive values inside existing media queries.

---

# Never Create Variables For

Unless explicitly requested:

- Border Radius
- Box Shadow
- Width
- Height
- Margin
- Padding
- Gap
- Border
- Opacity
- Transform
- Transition
- Animation
- Z-index

---

# Updating Global Variables

Whenever a new Color, Font Size or Spacing variable is required:

1. Update the existing `:root` inside `style.css`.
2. Never create a second `:root`.
3. Never redefine the same variable.
4. Keep all variables centralized inside `style.css`.

---

# JavaScript Rules

- Use Vanilla JavaScript unless requested otherwise.
- Generate JavaScript only when required.
- Avoid global variables.
- Reuse existing functions whenever possible.
- Never use jQuery unless requested.

---

# Code Quality

- Remove unused classes.
- Remove unused CSS.
- Remove unnecessary wrappers.
- Keep code clean.
- Keep indentation consistent.
- Maintain readable formatting.

---

# Design Accuracy

Before writing code:

- Analyze the complete design carefully.
- Identify layout.
- Identify spacing.
- Identify typography.
- Identify colors.
- Identify reusable components.
- Match the design as closely as possible.
- Never guess missing design details.

---

# Final Self Review

Before responding verify:

✓ Bootstrap Grid used correctly

✓ Bootstrap utilities reused

✓ Semantic HTML

✓ Responsive on Desktop

✓ Responsive on Tablet

✓ Responsive on Mobile

✓ Scoped CSS

✓ snake_case naming

✓ camelCase JavaScript

✓ Existing global CSS reused

✓ Existing variables reused

✓ Existing buttons reused

✓ Existing components reused

✓ No duplicate CSS

✓ No duplicate variables

✓ Minimal custom CSS

✓ No unnecessary wrappers

✓ Production-ready code

---

# Golden Rule

Before writing any HTML, CSS or JavaScript:

Inspect the existing project first.

If the required solution already exists, always reuse it instead of creating a new one.

Never duplicate existing code, variables, utilities or reusable components.

# Changelog

## v1.0
- Initial project standards created.