# Color Vision Screening & TraitCompass Health Platform

A lightweight, responsive, multi-page interactive web application combining an online **Ishihara Color Vision Screening Test** with an educational health content platform (**TraitCompass**).

Built exclusively with clean, standard-compliant **HTML5, CSS3, and modern JavaScript (ES6+)** with zero third-party dependencies or heavy frameworks.

---

## 🚀 Key Features

### 1. Interactive Color Vision Test (`index.html` & `script.js`)
- **Authentic Ishihara Dot-Packing Canvas Generator**: Renders medical-grade, high-density pseudo-isochromatic dot plates (~1,000 multi-scale dots per plate) directly on HTML5 Canvas using a 3-pass circle packing spatial algorithm matching clinical Ishihara plates.
- **Visual Reproduction of Reference Plate**: Plate 5 faithfully reproduces the uploaded reference Ishihara plate (Tangerine/Coral "74" numeral embedded within a dense Berry/Magenta/Violet dot field).
- **20 Comprehensive Diagnostic Plates Battery**:
  - **Plate 1**: Demonstration Plate ("12") visible to both trichromats and dichromats.
  - **Plate 2**: Transformation Plate ("8" vs "3").
  - **Plate 3**: Transformation / Vanishing Plate ("5" vs "2").
  - **Plate 4**: Transformation Plate ("29" vs "70").
  - **Plate 5**: Iconic Reference Plate ("74" vs "21") — *Tangerine on Berry/Magenta field*.
  - **Plate 6**: Transformation Plate ("7" vs "1").
  - **Plate 7**: Vanishing Plate ("45").
  - **Plate 8**: Vanishing Plate ("2").
  - **Plate 9**: Vanishing Plate ("6") — *Tangerine on Berry field*.
  - **Plate 10**: Vanishing Plate ("97").
  - **Plate 11**: Transformation Plate ("15" vs "17").
  - **Plate 12**: Reversed Polarity Plate ("57" vs "35") — *Emerald on Tangerine/Brown*.
  - **Plate 13**: Green-on-Orange Vanishing Plate ("5").
  - **Plate 14**: Green-on-Orange Vanishing Plate ("3").
  - **Plate 15**: Vanishing Plate ("16") — *Tangerine on Berry field*.
  - **Plate 16**: Vanishing Plate ("73").
  - **Plate 17**: Diagnostic Differential Plate ("26") separating Protanopia (sees 6) from Deuteranopia (sees 2).
  - **Plate 18**: Diagnostic Differential Plate ("42") separating Protanopia (sees 2) from Deuteranopia (sees 4).
  - **Plate 19**: Blue-Yellow (Tritan) Screening Plate ("35") — *Violet on Turquoise*.
  - **Plate 20**: Achromatopsia / Monochromacy Plate ("96") — *Isoluminant hues*.
- **Streamlined Test Flow**:
  - Pre-test calibration guidance (screen brightness, lighting, viewing distance).
  - 4 multiple-choice option buttons per plate + "Can't see anything / Nothing" button.
  - Keyboard-accessible direct numeric input field with Enter key.
  - Live progress tracking bar and plate step counter ("Plate 5 of 20").
- **Diagnostic Result Analysis**:
  - Circular animated accuracy score gauge (out of 20 plates).
  - Categorization into Normal Trichromacy, Deuteranopia / Deuteranomaly, Protanopia / Protanomaly, Tritanopia, or Achromatopsia.
  - Dual axis sensitivity meters (Red-Green L/M cones vs. Blue-Yellow S cones).
  - **Interactive Vision Simulator**: Preview how test plates appear under Protanopia, Deuteranopia, Tritanopia, and Achromatopsia using real-time SVG matrix filters.
  - Plate-by-plate diagnostic breakdown table.
  - "Print Clinical Summary" print stylesheet for medical consultations.

### 2. TraitCompass Health Articles & Interactive Self-Assessment Hub
- **`social-anxiety-triggers.html`**:
  - Neurobiology of social anxiety (amygdala hyper-reactivity, spotlight effect, safety behaviors).
  - 6 common trigger clusters and coping toolkits.
  - **Interactive 6-Item Liebowitz-Inspired Screener** with real-time scoring and clinical action steps.
- **`sociopath-traits.html`**:
  - In-depth clinical breakdown of DSM-5 Antisocial Personality Disorder (ASPD) vs. colloquial sociopathy and PCL-R psychopathy.
  - Cognitive vs. affective empathy divergence.
  - **Interactive 6-Item Toxic Manipulation & Boundary Assessment**.
- **`high-functioning-depression.html`**:
  - The "Smiling Depression" paradox: Persistent Depressive Disorder (Dysthymia) vs. workplace burnout.
  - 5 masking signs, somatic fatigue, and perfectionism traps.
  - **Interactive 6-Item Vitality & Burnout Screener** with crisis lifeline notices.

### 3. Supporting Pages & Infrastructure
- **`learn.html`**: The neurobiology and optics of human vision. Detailed breakdown of S, M, and L cones, rods, X-linked genetics, and an interactive real-time color swatch comparator.
- **`about.html`**: History of Dr. Shinobu Ishihara (1917), CIE 1931 chromaticity confusion lines, digital RGB display limitations vs. pigment plates, and medical disclaimers.
- **`privacy.html`**: GDPR/CCPA compliant privacy policy detailing 100% client-side execution and a strict **Zero-Health-Data Storage** architecture.
- **`style.css`**: Accessible design system with CSS custom properties, responsive mobile navigation, dark theme (`[data-theme="dark"]`), and high-contrast mode (`[data-contrast="high"]`).
- **`ads.js` & `ads.txt`**: Clean, non-intrusive monetization placeholder units (leaderboard, sidebar box, native units) compliant with standard publisher networks.

---

## 📂 File Directory

```
color-vision-traitcompass/
├── index.html                    # Color Vision Test primary page & hub
├── learn.html                    # Educational vision science & cone photoreceptors
├── about.html                    # Scientific methodology, history & disclaimers
├── privacy.html                  # Privacy policy & client-side data guarantee
├── social-anxiety-triggers.html  # Social anxiety guide & interactive quiz
├── sociopath-traits.html         # ASPD traits guide & boundary assessment
├── high-functioning-depression.html # Dysthymia guide & burnout screener
├── style.css                     # Complete responsive design system & themes
├── script.js                     # Canvas plate renderer, test engine & quiz engine
├── ads.js                        # Lightweight mock ad unit system
├── ads.txt                       # Programmatic publisher authorization
└── README.md                     # Documentation
```

---

## 💻 How to Run Locally

Because the application is built entirely with pure vanilla HTML5, CSS3, and ES6+ JavaScript:
1. Open the folder `C:\Users\sandeepaj\.gemini\antigravity\scratch\color-vision-traitcompass` in your file explorer.
2. Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).
3. Alternatively, you can serve it via any static local server (e.g., VS Code Live Server, Python `python -m http.server 8000`, or Node `npx serve`).
