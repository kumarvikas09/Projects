# 4Care Homepage

A pixel-perfect, highly responsive, and accessible static HTML implementation of the 4Care homepage based on the Figma design.

---

## Folder Structure

```text
/
│
├── index.html                  # Main semantic HTML5 homepage
│
├── assets/
│   ├── css/
│   │     style.css             # Main stylesheet using CSS variables & parent selectors
│   │
│   ├── js/
│   │     main.js              # Custom interactions & accessibility functions
│   │
│   ├── images/                 # Placeholder WebP graphics
│   │
│   ├── fonts/                  # Local fonts (if applicable)
│   │
│   └── vendor/                 # Local vendor libraries
│         ├─ bootstrap/         # Bootstrap 5.3.3 stylesheet & bundle
│         └─ owl-carousel/      # Owl Carousel 2 & jQuery
│
└── README.md                   # Project and setup instructions
```

---

## Technical Stack & Libraries Used

* **HTML5**: Structured semantically (`<header>`, `<nav>`, `<main>`, `<section>`, `<figure>`, `<footer>`) following SEO & accessibility rules.
* **Bootstrap v5.3.3**: Used for layout grid system and offcanvas navigation.
* **Owl Carousel v2.3.4**: For client testimonials.
* **jQuery v3.7.1**: Required dependency for Owl Carousel.
* **Google Fonts**:
  * *Atkinson Hyperlegible*: A typeface designed for readers with low vision.
  * *Lexend*: Designed to improve reading fluency.
* **Bootstrap Icons v1.11.3**: For standard UI icons.

---

## Key Features

1. **Pixel-Perfect Figma Adaptation**: Exact grid coordinates, border radiuses, and color variables parsed directly from the Figma canvas.
2. **SOC 2 & Accessibility Friendly**:
   * **Text Resizer**: Options (`A-` and `A+`) to scale the base font size to help visually impaired users.
   * **High Contrast Toggle**: Standard-compliant theme swap to black background and high contrast text elements.
   * **Read Aloud Helper**: Leverages the browser Web Speech API `SpeechSynthesis` to read headings, lists, and paragraph items.
   * **Keyboard Friendly**: Clear visible focus states on links, buttons, and input components.
3. **Optimized Performance**: All images include `loading="lazy"`, `decoding="async"`, and explicit dimensions to avoid layout shifts.

---

## Setup & Running Instructions

Simply open the `index.html` file in any modern web browser or serve it using a lightweight local web server.

### Local HTTP Server (Python)
If you wish to run a local server:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## Browser Support

* Google Chrome (Latest)
* Mozilla Firefox (Latest)
* Apple Safari (Latest)
* Microsoft Edge (Latest)
* Mobile iOS & Android Browsers
