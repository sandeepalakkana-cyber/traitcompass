/**
 * Color Vision Test & TraitCompass Platform Engine
 * Upgraded 20-Plate Ishihara Medical Battery & Authentic Dot-Packing Algorithm
 */

// ============================================================================
// 1. GLOBAL STATE & THEME MANAGEMENT
// ============================================================================
const AppState = {
  theme: localStorage.getItem('tc_theme') || 'light',
  contrast: localStorage.getItem('tc_contrast') || 'normal',
};

function initTheme() {
  document.documentElement.setAttribute('data-theme', AppState.theme);
  document.documentElement.setAttribute('data-contrast', AppState.contrast);

  const themeToggle = document.getElementById('themeToggle');
  const contrastToggle = document.getElementById('contrastToggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', AppState.theme);
      localStorage.setItem('tc_theme', AppState.theme);
      themeToggle.setAttribute('aria-label', `Switch to ${AppState.theme === 'light' ? 'dark' : 'light'} theme`);
    });
  }

  if (contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      AppState.contrast = AppState.contrast === 'normal' ? 'high' : 'normal';
      document.documentElement.setAttribute('data-contrast', AppState.contrast);
      localStorage.setItem('tc_contrast', AppState.contrast);
      contrastToggle.classList.toggle('active', AppState.contrast === 'high');
    });
  }

  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ============================================================================
// 2. ISHIHARA COLOR PALETTES & 20-PLATE TEST BATTERY
// ============================================================================

/**
 * Authentic Ishihara Palettes calibrated from Dr. Shinobu Ishihara's plates
 * Matches the reference image: Berry/Magenta background + Tangerine/Coral figures
 */
const ColorPalettes = {
  // REFERENCE IMAGE EXACT MATCH: Deep Velvet Berry Background + Glowing Tangerine/Coral Figure
  berryBg: [
    '#540024', '#68002e', '#7c0038', '#8f0042', '#a0004c', 
    '#48001e', '#62002b', '#730034', '#84003d', '#3d0018'
  ],
  tangerineFigure: [
    '#ff3b00', '#ff5100', '#ff6600', '#ff7a14', '#ff8d29', 
    '#ff9f3d', '#ffb052', '#ff5a0a', '#ff6f1a', '#ff842e', '#ffa85c'
  ],

  // CLASSIC ISHIHARA OLIVE & ORANGE/RED: Deep Dark Moss BG + Electric Fiery Red/Orange Figure
  classicRedFigure: [
    '#ff2200', '#ff380a', '#ff4d14', '#ff611e', '#ff7429', 
    '#e61a00', '#ff440a', '#ff5914', '#ff853d'
  ],
  classicOliveBg: [
    '#344d1e', '#426028', '#4f7231', '#2c4219', '#5a8239', 
    '#243714', '#395322', '#48682c', '#1c2c0e'
  ],

  // INVERTED PALETTE: Deep Roasted Brown BG + Luminous Emerald Neon Figure
  emeraldFigure: [
    '#00e676', '#00c853', '#10b981', '#22c55e', '#34d399', 
    '#059669', '#16a34a', '#4ade80', '#00ff80'
  ],
  warmOrangeBrownBg: [
    '#5c2000', '#702800', '#853000', '#993800', '#4d1a00', 
    '#632300', '#782b00', '#3b1400'
  ],

  // DEMO PLATE 1 (12) - Maximum High-Luminance Contrast
  demoFigure: [
    '#ff2200', '#ff3d0a', '#ff5614', '#ff6e1e', '#e61800', '#ff480f'
  ],
  demoBg: [
    '#3a5423', '#49682d', '#577c37', '#2e441b', '#648e40', '#253815'
  ],

  // TRANSFORMATION PLATE 2 (8 vs 3)
  transBase3: [
    '#ff2200', '#ff3d0a', '#ff5614', '#ff6e1e', '#e61800'
  ],
  transExtra8: [
    '#5c6628', '#6a7530', '#4e5720', '#566024', '#788438'
  ],
  transOliveBg: [
    '#344d1e', '#426028', '#4f7231', '#2c4219', '#5a8239'
  ],

  // DIFFERENTIAL PLATES 17 & 18 (26 & 42)
  protanRedPart: [
    '#ff2200', '#ff3d0a', '#ff5614', '#ff6e1e', '#ff7f2e'
  ],
  deutanPurplePart: [
    '#802a6b', '#94337d', '#6d215a', '#a63d8d', '#5c194c'
  ],
  diffNeutralBg: [
    '#445336', '#526442', '#3a472d', '#5f734d', '#313c25'
  ],

  // TRITAN PLATE 19 (35) - Electric Violet on Deep Dark Oceanic Teal
  tritanVioletFigure: [
    '#c084fc', '#a855f7', '#9333ea', '#7c3aed', '#d8b4fe', '#b266ff'
  ],
  tritanTurquoiseBg: [
    '#042f2e', '#0f766e', '#115e59', '#134e4a', '#0d423f', '#072423'
  ],

  // ACHROMATOPSIA PLATE 20 (96) - Isoluminant
  achromaFigure: [
    '#ea580c', '#f97316', '#c2410c', '#fb923c'
  ],
  achromaBg: [
    '#0d9488', '#14b8a6', '#047857', '#0f766e'
  ]
};

/**
 * 20 Comprehensive Diagnostic Ishihara Test Plates
 */
const TestPlates = [
  // 1. Demonstration
  {
    id: 1,
    type: 'demonstration',
    display: '12',
    maskType: 'text',
    text: '12',
    palette: { figure: ColorPalettes.demoFigure, bg: ColorPalettes.demoBg },
    options: ['12', '72', 'Nothing', '21'],
    correctNormal: '12',
    colorBlindSees: '12',
    significance: 'Demonstration Plate. Both normal trichromats and all colorblind individuals read "12" due to high luminance contrast.'
  },
  // 2. Transformation (8 -> 3)
  {
    id: 2,
    type: 'transformation',
    display: '8 (or 3)',
    maskType: 'transformation',
    textBase: '3',
    textExtra: '8',
    palette: {
      base: ColorPalettes.transBase3,
      extra: ColorPalettes.transExtra8,
      bg: ColorPalettes.transOliveBg
    },
    options: ['8', '3', 'Nothing', '5'],
    correctNormal: '8',
    colorBlindSees: '3',
    significance: 'Transformation Plate. Normal vision reads "8". Red-green deficient individuals read "3".'
  },
  // 3. Transformation (5 -> 2)
  {
    id: 3,
    type: 'vanishing',
    display: '5',
    maskType: 'text',
    text: '5',
    palette: { figure: ColorPalettes.classicRedFigure, bg: ColorPalettes.classicOliveBg },
    options: ['5', '2', 'Nothing', '3'],
    correctNormal: '5',
    colorBlindSees: '2',
    significance: 'Transformation / Vanishing Plate. Normal vision reads "5". Red-green defects read "2" or nothing.'
  },
  // 4. Transformation (29 -> 70)
  {
    id: 4,
    type: 'vanishing',
    display: '29',
    maskType: 'text',
    text: '29',
    palette: { figure: ColorPalettes.classicRedFigure, bg: ColorPalettes.classicOliveBg },
    options: ['29', '70', 'Nothing', '20'],
    correctNormal: '29',
    colorBlindSees: '70',
    significance: 'Transformation Plate. Normal vision reads "29". Red-green color blindness often reads "70".'
  },
  // 5. EXACT MATCH TO USER'S REFERENCE IMAGE (74 with Berry/Magenta Background!)
  {
    id: 5,
    type: 'transformation',
    display: '74',
    maskType: 'text',
    text: '74',
    palette: { figure: ColorPalettes.tangerineFigure, bg: ColorPalettes.berryBg },
    options: ['74', '21', '71', 'Nothing'],
    correctNormal: '74',
    colorBlindSees: '21',
    significance: 'Iconic Ishihara Plate (Matching Reference Image). Tangerine "74" on Berry/Magenta background. Normal reads "74"; red-green deficiency perceives "21" or nothing.'
  },
  // 6. Transformation (7 -> 1)
  {
    id: 6,
    type: 'vanishing',
    display: '7',
    maskType: 'text',
    text: '7',
    palette: { figure: ColorPalettes.tangerineFigure, bg: ColorPalettes.berryBg },
    options: ['7', '1', 'Nothing', '4'],
    correctNormal: '7',
    colorBlindSees: '1',
    significance: 'Normal vision reads "7". Red-green deficient individuals frequently read "1" or perceive no numeral.'
  },
  // 7. Transformation (45)
  {
    id: 7,
    type: 'vanishing',
    display: '45',
    maskType: 'text',
    text: '45',
    palette: { figure: ColorPalettes.classicRedFigure, bg: ColorPalettes.classicOliveBg },
    options: ['45', '4', '5', 'Nothing'],
    correctNormal: '45',
    colorBlindSees: 'Nothing',
    significance: 'Normal vision clearly perceives "45". Red-green deficient individuals usually cannot discern the digits.'
  },
  // 8. Vanishing (2)
  {
    id: 8,
    type: 'vanishing',
    display: '2',
    maskType: 'text',
    text: '2',
    palette: { figure: ColorPalettes.classicRedFigure, bg: ColorPalettes.classicOliveBg },
    options: ['2', '8', 'Nothing', '3'],
    correctNormal: '2',
    colorBlindSees: 'Nothing',
    significance: 'Vanishing Plate. High sensitivity for red-green discrimination differences; typically disappears for individuals with red-green deficiencies.'
  },
  // 9. Vanishing (6)
  {
    id: 9,
    type: 'vanishing',
    display: '6',
    maskType: 'text',
    text: '6',
    palette: { figure: ColorPalettes.tangerineFigure, bg: ColorPalettes.berryBg },
    options: ['6', '5', 'Nothing', '8'],
    correctNormal: '6',
    colorBlindSees: 'Nothing',
    significance: 'Vanishing Plate. Tangerine on Berry field. Normal reads "6"; red-green deficient sees only an unstructured dot field.'
  },
  // 10. Vanishing (97)
  {
    id: 10,
    type: 'vanishing',
    display: '97',
    maskType: 'text',
    text: '97',
    palette: { figure: ColorPalettes.classicRedFigure, bg: ColorPalettes.classicOliveBg },
    options: ['97', '87', 'Nothing', '91'],
    correctNormal: '97',
    colorBlindSees: 'Nothing',
    significance: 'Vanishing Plate. Normal vision reads "97". Red-green deficient observers fail to discern either digit.'
  },
  // 11. Transformation (15 -> 17)
  {
    id: 11,
    type: 'vanishing',
    display: '15',
    maskType: 'text',
    text: '15',
    palette: { figure: ColorPalettes.classicRedFigure, bg: ColorPalettes.classicOliveBg },
    options: ['15', '17', 'Nothing', '13'],
    correctNormal: '15',
    colorBlindSees: '17',
    significance: 'Transformation Plate. Normal vision reads "15"; red-green colorblindness frequently misreads as "17".'
  },
  // 12. Transformation (57 -> 35) Reversed Polarity
  {
    id: 12,
    type: 'vanishing',
    display: '57',
    maskType: 'text',
    text: '57',
    palette: { figure: ColorPalettes.emeraldFigure, bg: ColorPalettes.warmOrangeBrownBg },
    options: ['57', '35', 'Nothing', '67'],
    correctNormal: '57',
    colorBlindSees: '35',
    significance: 'Reversed Polarity Plate. Emerald green figure on Orange/Brown background. Normal reads "57"; red-green reads "35".'
  },
  // 13. Vanishing Green on Orange (5)
  {
    id: 13,
    type: 'vanishing',
    display: '5',
    maskType: 'text',
    text: '5',
    palette: { figure: ColorPalettes.emeraldFigure, bg: ColorPalettes.warmOrangeBrownBg },
    options: ['5', '2', 'Nothing', '8'],
    correctNormal: '5',
    colorBlindSees: 'Nothing',
    significance: 'Green-on-Orange Vanishing Plate. Evaluates M-cone sensitivity against long-wavelength background.'
  },
  // 14. Vanishing Green on Orange (3)
  {
    id: 14,
    type: 'vanishing',
    display: '3',
    maskType: 'text',
    text: '3',
    palette: { figure: ColorPalettes.emeraldFigure, bg: ColorPalettes.warmOrangeBrownBg },
    options: ['3', '5', 'Nothing', '8'],
    correctNormal: '3',
    colorBlindSees: 'Nothing',
    significance: 'Green-on-Orange Vanishing Plate. Invisible to individuals with deuteranopic or protanopic deficits.'
  },
  // 15. Vanishing (16)
  {
    id: 15,
    type: 'vanishing',
    display: '16',
    maskType: 'text',
    text: '16',
    palette: { figure: ColorPalettes.tangerineFigure, bg: ColorPalettes.berryBg },
    options: ['16', '10', 'Nothing', '18'],
    correctNormal: '16',
    colorBlindSees: 'Nothing',
    significance: 'Vanishing Plate. High screening value for identifying marked red-green cone discrimination differences.'
  },
  // 16. Vanishing (73)
  {
    id: 16,
    type: 'vanishing',
    display: '73',
    maskType: 'text',
    text: '73',
    palette: { figure: ColorPalettes.classicRedFigure, bg: ColorPalettes.classicOliveBg },
    options: ['73', '23', 'Nothing', '78'],
    correctNormal: '73',
    colorBlindSees: 'Nothing',
    significance: 'Vanishing Plate. Tests compound numeral recognition along the deutan confusion vector.'
  },
  // 17. Differential Screening Plate (26: Protan vs Deutan)
  {
    id: 17,
    type: 'protan_deutan_diff',
    display: '26',
    maskType: 'differential',
    textLeft: '2',
    textRight: '6',
    palette: {
      partLeft: ColorPalettes.deutanPurplePart,  // '2' visible to deutan
      partRight: ColorPalettes.protanRedPart,    // '6' visible to protan
      bg: ColorPalettes.diffNeutralBg
    },
    options: ['26', '6', '2', 'Nothing'],
    correctNormal: '26',
    protanSees: '6',
    deutanSees: '2',
    significance: 'Differential Screening Plate. Normal reads "26". Protan tendencies read "6"; Deuteran tendencies read "2".'
  },
  // 18. Differential Screening Plate (42: Protan vs Deutan)
  {
    id: 18,
    type: 'protan_deutan_diff',
    display: '42',
    maskType: 'differential',
    textLeft: '4',
    textRight: '2',
    palette: {
      partLeft: ColorPalettes.deutanPurplePart,  // '4' visible to deutan
      partRight: ColorPalettes.protanRedPart,    // '2' visible to protan
      bg: ColorPalettes.diffNeutralBg
    },
    options: ['42', '2', '4', 'Nothing'],
    correctNormal: '42',
    protanSees: '2',
    deutanSees: '4',
    significance: 'Differential Screening Plate. Normal reads "42". Protan tendencies read "2"; Deuteran tendencies read "4".'
  },
  // 19. Blue-Yellow (Tritan) Screening Plate (35)
  {
    id: 19,
    type: 'tritan',
    display: '35',
    maskType: 'text',
    text: '35',
    palette: { figure: ColorPalettes.tritanVioletFigure, bg: ColorPalettes.tritanTurquoiseBg },
    options: ['35', '55', 'Nothing', '38'],
    correctNormal: '35',
    colorBlindSees: 'Nothing',
    significance: 'Blue-Yellow (Tritan) Screening Plate. Violet "35" on Turquoise background. S-cone defects fail to distinguish the figure.'
  },
  // 20. Total Color Blindness / Achromatopsia Plate (96)
  {
    id: 20,
    type: 'achromatopsia',
    display: '96',
    maskType: 'text',
    text: '96',
    palette: { figure: ColorPalettes.achromaFigure, bg: ColorPalettes.achromaBg },
    options: ['96', '86', 'Nothing', '90'],
    correctNormal: '96',
    colorBlindSees: 'Nothing',
    significance: 'Achromatopsia / Monochromacy Check. Isoluminant hues: completely invisible if cone color perception is absent.'
  }
];

// ============================================================================
// 3. HIGH-DENSITY AUTHENTIC ISHIHARA DOT PACKING ALGORITHM
// ============================================================================

class SeededRandom {
  constructor(seed = 12345) {
    this.seed = seed;
  }
  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  range(min, max) {
    return min + this.next() * (max - min);
  }
  choice(array) {
    return array[Math.floor(this.next() * array.length)];
  }
}

// Memory cache for generated plate dot lattices
const PlateDotsCache = new Map();

/**
 * Generates an authentic, high-density stochastic circle packing matching
 * physical Ishihara plates (~950 to 1,150 non-overlapping varied dots).
 */
function generateAuthenticIshiharaDots(canvasSize = 340, plateId = 1) {
  if (PlateDotsCache.has(plateId)) {
    return PlateDotsCache.get(plateId);
  }

  const rng = new SeededRandom(plateId * 7919 + 137);
  const cx = canvasSize / 2;
  const cy = canvasSize / 2;
  const outerR = canvasSize * 0.468; // ~159px radius for 340px canvas
  const dots = [];

  // Spatial partitioning grid for O(1) collision queries
  const cellSize = 12;
  const gridDim = Math.ceil(canvasSize / cellSize);
  const grid = Array.from({ length: gridDim * gridDim }, () => []);

  function getCellIdx(x, y) {
    const gx = Math.floor(x / cellSize);
    const gy = Math.floor(y / cellSize);
    if (gx < 0 || gx >= gridDim || gy < 0 || gy >= gridDim) return -1;
    return gy * gridDim + gx;
  }

  function canPlace(x, y, r) {
    // Check boundary circle
    const distToCenter = Math.hypot(x - cx, y - cy);
    if (distToCenter + r > outerR) return false;

    // Check neighboring cells
    const gx = Math.floor(x / cellSize);
    const gy = Math.floor(y / cellSize);
    const searchRadius = 2;

    for (let dy = -searchRadius; dy <= searchRadius; dy++) {
      const ny = gy + dy;
      if (ny < 0 || ny >= gridDim) continue;
      for (let dx = -searchRadius; dx <= searchRadius; dx++) {
        const nx = gx + dx;
        if (nx < 0 || nx >= gridDim) continue;

        const cellDots = grid[ny * gridDim + nx];
        for (let i = 0; i < cellDots.length; i++) {
          const other = cellDots[i];
          const distSq = (x - other.x) * (x - other.x) + (y - other.y) * (y - other.y);
          const minDist = r + other.radius + 1.25; // 1.25px gap
          if (distSq < minDist * minDist) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function addDot(x, y, r) {
    const dot = { x, y, radius: r, rngVal: rng.next() };
    dots.push(dot);
    const cIdx = getCellIdx(x, y);
    if (cIdx !== -1) grid[cIdx].push(dot);
  }

  // PASS 1: Large dots (~240 dots, radius 5.0 to 6.2)
  for (let i = 0; i < 2400; i++) {
    const angle = rng.range(0, Math.PI * 2);
    const dist = Math.sqrt(rng.next()) * (outerR - 7);
    const x = cx + dist * Math.cos(angle);
    const y = cy + dist * Math.sin(angle);
    const r = rng.range(5.0, 6.2);
    if (canPlace(x, y, r)) {
      addDot(x, y, r);
    }
  }

  // PASS 2: Medium dots (~580 dots, radius 3.5 to 4.8)
  for (let i = 0; i < 5200; i++) {
    const angle = rng.range(0, Math.PI * 2);
    const dist = Math.sqrt(rng.next()) * (outerR - 5);
    const x = cx + dist * Math.cos(angle);
    const y = cy + dist * Math.sin(angle);
    const r = rng.range(3.5, 4.8);
    if (canPlace(x, y, r)) {
      addDot(x, y, r);
    }
  }

  // PASS 3: Small filler dots (~480 dots, radius 2.0 to 3.0)
  for (let i = 0; i < 5500; i++) {
    const angle = rng.range(0, Math.PI * 2);
    const dist = Math.sqrt(rng.next()) * (outerR - 3);
    const x = cx + dist * Math.cos(angle);
    const y = cy + dist * Math.sin(angle);
    const r = rng.range(2.0, 3.0);
    if (canPlace(x, y, r)) {
      addDot(x, y, r);
    }
  }

  PlateDotsCache.set(plateId, dots);
  return dots;
}

/**
 * Creates high-contrast rasterized text masks for dot sampling.
 * Uses bold 32px thick strokes with generous horizontal separation
 * so numbers are solid, bold, unbroken, and crystal-clear.
 */
function createTextMask(canvasSize, text) {
  const offCanvas = document.createElement('canvas');
  offCanvas.width = canvasSize;
  offCanvas.height = canvasSize;
  const ctx = offCanvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.textBaseline = 'middle';

  const cy = canvasSize / 2 + 5;

  if (text.length === 1) {
    // Single digit: centered, bold, robust
    ctx.font = '900 168px "Arial Black", "Arial", "Impact", "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.strokeText(text, canvasSize / 2, cy);
    ctx.fillText(text, canvasSize / 2, cy);
  } else if (text.length === 2) {
    // Two digits: explicitly separated so they NEVER touch or bridge!
    ctx.font = '900 148px "Arial Black", "Arial", "Impact", "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    const spacing = 52; // 52px offset creates a wide, clean gutter between the two digits
    
    // Left digit
    ctx.strokeText(text[0], canvasSize / 2 - spacing, cy);
    ctx.fillText(text[0], canvasSize / 2 - spacing, cy);
    
    // Right digit
    ctx.strokeText(text[1], canvasSize / 2 + spacing, cy);
    ctx.fillText(text[1], canvasSize / 2 + spacing, cy);
  } else {
    // 3 digits
    ctx.font = '900 120px "Arial Black", "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.strokeText(text, canvasSize / 2, cy);
    ctx.fillText(text, canvasSize / 2, cy);
  }

  return ctx.getImageData(0, 0, canvasSize, canvasSize);
}

/**
 * Creates dual masks for differential plates with separated spacing
 */
function createSplitTextMasks(canvasSize, textLeft, textRight) {
  const cLeft = document.createElement('canvas');
  cLeft.width = canvasSize;
  cLeft.height = canvasSize;
  const ctxL = cLeft.getContext('2d');
  ctxL.fillStyle = '#000000';
  ctxL.fillRect(0, 0, canvasSize, canvasSize);
  ctxL.fillStyle = '#ffffff';
  ctxL.strokeStyle = '#ffffff';
  ctxL.lineWidth = 8;
  ctxL.lineCap = 'round';
  ctxL.lineJoin = 'round';
  ctxL.textAlign = 'center';
  ctxL.textBaseline = 'middle';
  ctxL.font = '900 148px "Arial Black", "Arial", "Impact", sans-serif';
  ctxL.strokeText(textLeft, canvasSize / 2 - 52, canvasSize / 2 + 5);
  ctxL.fillText(textLeft, canvasSize / 2 - 52, canvasSize / 2 + 5);

  const cRight = document.createElement('canvas');
  cRight.width = canvasSize;
  cRight.height = canvasSize;
  const ctxR = cRight.getContext('2d');
  ctxR.fillStyle = '#000000';
  ctxR.fillRect(0, 0, canvasSize, canvasSize);
  ctxR.fillStyle = '#ffffff';
  ctxR.strokeStyle = '#ffffff';
  ctxR.lineWidth = 8;
  ctxR.lineCap = 'round';
  ctxR.lineJoin = 'round';
  ctxR.textAlign = 'center';
  ctxR.textBaseline = 'middle';
  ctxR.font = '900 148px "Arial Black", "Arial", "Impact", sans-serif';
  ctxR.strokeText(textRight, canvasSize / 2 + 52, canvasSize / 2 + 5);
  ctxR.fillText(textRight, canvasSize / 2 + 52, canvasSize / 2 + 5);

  return {
    maskLeft: ctxL.getImageData(0, 0, canvasSize, canvasSize),
    maskRight: ctxR.getImageData(0, 0, canvasSize, canvasSize)
  };
}

/**
 * Solid, non-eroding dot classification:
 * Any dot whose center falls on the stroke is preserved, keeping all terminals,
 * corners, and full width intact without erosion.
 */
function isDotInMask(maskData, size, dot) {
  const ix = Math.floor(dot.x);
  const iy = Math.floor(dot.y);
  if (ix < 0 || ix >= size || iy < 0 || iy >= size) return false;

  // Primary check: Dot center touches the stroke
  const center = maskData[(iy * size + ix) * 4];
  if (center > 70) return true;

  // Edge check: If center is 1px outside, check cardinal points
  function sample(x, y) {
    const sx = Math.floor(x);
    const sy = Math.floor(y);
    if (sx < 0 || sx >= size || sy < 0 || sy >= size) return 0;
    return maskData[(sy * size + sx) * 4];
  }

  const t = sample(dot.x, dot.y - dot.radius * 0.5) > 70 ? 1 : 0;
  const b = sample(dot.x, dot.y + dot.radius * 0.5) > 70 ? 1 : 0;
  const l = sample(dot.x - dot.radius * 0.5, dot.y) > 70 ? 1 : 0;
  const r = sample(dot.x + dot.radius * 0.5, dot.y) > 70 ? 1 : 0;

  return (t + b + l + r) >= 3;
}

/**
 * Renders an Ishihara plate onto the specified HTML5 Canvas
 */
function renderIshiharaPlate(canvas, plate) {
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  const size = 340;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  // Background white disk
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.47, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.clip();

  const dots = generateAuthenticIshiharaDots(size, plate.id);
  const rng = new SeededRandom(plate.id * 1009 + 23);

  if (plate.maskType === 'text') {
    const mask = createTextMask(size, plate.text);

    dots.forEach(dot => {
      const isFigure = isDotInMask(mask.data, size, dot);
      const palette = isFigure ? plate.palette.figure : plate.palette.bg;
      const color = rng.choice(palette);

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  } else if (plate.maskType === 'transformation') {
    // 8 vs 3: '3' is base mask; extra is left loops of '8'
    const baseMask = createTextMask(size, plate.textBase);
    const fullMask = createTextMask(size, plate.textExtra);

    dots.forEach(dot => {
      const inBase = isDotInMask(baseMask.data, size, dot);
      const inFull = isDotInMask(fullMask.data, size, dot);

      let color;
      if (inBase) {
        color = rng.choice(plate.palette.base);
      } else if (inFull) {
        color = rng.choice(plate.palette.extra);
      } else {
        color = rng.choice(plate.palette.bg);
      }

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  } else if (plate.maskType === 'differential') {
    // Dual numbers: Left (Deutan visible) vs Right (Protan visible)
    const split = createSplitTextMasks(size, plate.textLeft, plate.textRight);

    dots.forEach(dot => {
      const isLeft = isDotInMask(split.maskLeft.data, size, dot);
      const isRight = isDotInMask(split.maskRight.data, size, dot);

      let color;
      if (isLeft) {
        color = rng.choice(plate.palette.partLeft);
      } else if (isRight) {
        color = rng.choice(plate.palette.partRight);
      } else {
        color = rng.choice(plate.palette.bg);
      }

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  ctx.restore();
}

// ============================================================================
// 4. TEST CONTROLLER & 20-PLATE STATE MACHINE
// ============================================================================

class ColorVisionTestEngine {
  constructor() {
    this.plates = TestPlates;
    this.currentIndex = 0;
    this.userAnswers = [];
    this.startTime = null;
    this.plateStartTime = null;

    // DOM Elements
    this.canvas = document.getElementById('ishiharaCanvas');
    this.introScreen = document.getElementById('testIntroScreen');
    this.activeScreen = document.getElementById('testActiveScreen');
    this.resultsScreen = document.getElementById('testResultsScreen');

    this.progressFill = document.getElementById('testProgressFill');
    this.progressText = document.getElementById('testProgressText');
    this.plateTypeBadge = document.getElementById('plateTypeBadge');
    this.platePrompt = document.getElementById('platePrompt');
    this.optionsGrid = document.getElementById('optionsGrid');
    this.skipBtn = document.getElementById('skipBtn');
    this.manualInput = document.getElementById('manualAnswerInput');
    this.manualSubmitBtn = document.getElementById('manualSubmitBtn');

    this.initEventListeners();
  }

  initEventListeners() {
    const startBtn = document.getElementById('startTestBtn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.start());
    }

    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', () => this.handleAnswer('Nothing'));
    }

    if (this.manualSubmitBtn && this.manualInput) {
      const submitManual = () => {
        const val = this.manualInput.value.trim();
        if (val) {
          this.handleAnswer(val);
          this.manualInput.value = '';
        }
      };
      this.manualSubmitBtn.addEventListener('click', submitManual);
      this.manualInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitManual();
      });
    }

    const retakeBtn = document.getElementById('retakeTestBtn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => this.restart());
    }

    const printBtn = document.getElementById('printResultsBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }
  }

  start() {
    this.currentIndex = 0;
    this.userAnswers = [];
    this.startTime = Date.now();

    if (this.introScreen) this.introScreen.style.display = 'none';
    if (this.resultsScreen) this.resultsScreen.style.display = 'none';
    if (this.activeScreen) this.activeScreen.style.display = 'block';

    this.loadPlate(this.currentIndex);
  }

  restart() {
    this.start();
    window.scrollTo({ top: this.activeScreen.offsetTop - 80, behavior: 'smooth' });
  }

  loadPlate(index) {
    const plate = this.plates[index];
    this.plateStartTime = Date.now();

    // Update Progress
    const pct = Math.round(((index + 1) / this.plates.length) * 100);
    if (this.progressFill) this.progressFill.style.width = `${pct}%`;
    if (this.progressText) {
      this.progressText.textContent = `Plate ${index + 1} of ${this.plates.length}`;
    }

    if (this.plateTypeBadge) {
      const typeLabels = {
        demonstration: 'Demonstration Plate',
        transformation: 'Transformation Plate',
        vanishing: 'Vanishing Plate',
        protan_deutan_diff: 'Differential Screening Plate',
        tritan: 'Tritan (Blue-Yellow) Plate',
        achromatopsia: 'Achromatopsia Plate'
      };
      this.plateTypeBadge.textContent = typeLabels[plate.type] || 'Screening Plate';
    }

    // Render Canvas
    renderIshiharaPlate(this.canvas, plate);

    // Build Option Buttons
    if (this.optionsGrid) {
      this.optionsGrid.innerHTML = '';
      plate.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.setAttribute('aria-label', `Select option ${opt}`);
        btn.addEventListener('click', () => this.handleAnswer(opt));
        this.optionsGrid.appendChild(btn);
      });
    }

    if (this.manualInput) {
      this.manualInput.value = '';
      this.manualInput.focus();
    }
  }

  handleAnswer(selectedOption) {
    const plate = this.plates[this.currentIndex];
    const duration = (Date.now() - this.plateStartTime) / 1000;

    const isNormal = selectedOption === plate.correctNormal;
    const isColorBlind = selectedOption === plate.colorBlindSees ||
      (plate.protanSees && selectedOption === plate.protanSees) ||
      (plate.deutanSees && selectedOption === plate.deutanSees);

    this.userAnswers.push({
      plateId: plate.id,
      plateType: plate.type,
      selected: selectedOption,
      correctNormal: plate.correctNormal,
      colorBlindSees: plate.colorBlindSees,
      protanSees: plate.protanSees,
      deutanSees: plate.deutanSees,
      isNormal: isNormal,
      isColorBlind: isColorBlind,
      duration: duration,
      significance: plate.significance
    });

    if (this.currentIndex < this.plates.length - 1) {
      this.currentIndex++;
      this.loadPlate(this.currentIndex);
    } else {
      this.finish();
    }
  }

  finish() {
    if (this.activeScreen) this.activeScreen.style.display = 'none';
    if (this.resultsScreen) this.resultsScreen.style.display = 'block';

    const results = this.analyzeResults();
    this.renderResults(results);

    window.scrollTo({ top: this.resultsScreen.offsetTop - 80, behavior: 'smooth' });
  }

  analyzeResults() {
    let normalCount = 0;
    let protanScore = 0;
    let deutanScore = 0;
    let tritanScore = 0;
    let achromaScore = 0;

    this.userAnswers.forEach(ans => {
      if (ans.isNormal) {
        normalCount++;
      } else {
        // Red-Green errors across transformation and vanishing plates
        if (['transformation', 'vanishing'].includes(ans.plateType)) {
          deutanScore += 1;
          protanScore += 1;
        }
        // Differential Plates (17 & 18)
        if (ans.plateType === 'protan_deutan_diff') {
          if (ans.selected === ans.protanSees) protanScore += 3;
          if (ans.selected === ans.deutanSees) deutanScore += 3;
        }
        // Tritan plate (Plate 19)
        if (ans.plateType === 'tritan') {
          tritanScore += 3;
        }
        // Achromatopsia plate (Plate 20)
        if (ans.plateType === 'achromatopsia') {
          achromaScore += 3;
        }
      }
    });

    const scorePct = Math.round((normalCount / this.plates.length) * 100);

    let classification = '';
    let verdictClass = 'verdict-normal';
    let detailedDesc = '';

    if (scorePct >= 85) { // 17-20 correct
      classification = 'Typical Color Discrimination Indicated';
      verdictClass = 'verdict-normal';
      detailedDesc = 'Your responses on this screening test align with typical trichromatic color discrimination. You accurately identified the majority of plates. Note that this online screening cannot substitute for a standardized clinical eye examination, and display calibration differences may mask subtle color vision variations.';
    } else if (tritanScore >= 3 && scorePct < 75) {
      classification = 'Potential Blue-Yellow Screening Variation Indicated';
      verdictClass = 'verdict-tritan';
      detailedDesc = 'Your selections indicate difficulty distinguishing blue-yellow spectrum plates. While tritan variations are less common and often acquired rather than inherited, monitor color temperature, night light filters, and ambient room lighting can also produce this result. An eye-care professional can perform a comprehensive clinical assessment.';
    } else if (protanScore > deutanScore + 1) {
      classification = 'Potential Red-Green (Protan-Type) Variation Indicated';
      verdictClass = 'verdict-protan';
      detailedDesc = 'Your response pattern suggests reduced sensitivity along the red-green color vector with protan tendencies (often associated with long-wavelength L-cone sensitivity differences). However, an uncalibrated digital display cannot definitively distinguish or diagnose protanopia vs. protanomaly. A consultation with an optometrist or ophthalmologist is recommended for clinical confirmation.';
    } else if (deutanScore >= protanScore && scorePct < 75) {
      classification = 'Potential Red-Green (Deutan-Type) Variation Indicated';
      verdictClass = 'verdict-deutan';
      detailedDesc = 'Your response pattern suggests reduced sensitivity along the red-green color vector with deutan tendencies (often associated with medium-wavelength M-cone sensitivity differences). Because display color gamuts and ambient lighting vary, this screening tool cannot definitively diagnose deuteranomaly or deuteranopia. We advise consulting an eye-care professional for formal testing.';
    } else if (achromaScore >= 3 && scorePct < 40) {
      classification = 'Significant Color Perception Variation Indicated';
      verdictClass = 'verdict-mono';
      detailedDesc = 'Your selections show notable difficulty distinguishing numerals across multiple chromatic and luminance plates. Online screens cannot diagnose conditions such as achromatopsia or other visual impairments. We strongly recommend scheduling an in-person examination with a licensed optometrist or ophthalmologist.';
    } else {
      classification = 'Inconclusive or Borderline Screening Variation';
      verdictClass = 'verdict-deutan';
      detailedDesc = 'You missed a small number of plates. This may reflect mild color discrimination differences, or could simply be due to screen glare, non-standard display color profiles, or viewing angle. If you have concerns about your color perception, a formal eye examination will provide definitive guidance.';
    }

    return {
      normalCount,
      total: this.plates.length,
      scorePct,
      classification,
      verdictClass,
      detailedDesc,
      protanScore,
      deutanScore,
      tritanScore,
      userAnswers: this.userAnswers
    };
  }

  renderResults(res) {
    const gaugeWrap = document.getElementById('resultGaugeWrap');
    const scoreNum = document.getElementById('resultScoreNumber');
    const verdictEl = document.getElementById('resultVerdict');
    const summaryText = document.getElementById('resultSummaryText');
    const tableBody = document.getElementById('breakdownTableBody');

    if (gaugeWrap) {
      gaugeWrap.style.setProperty('--score-pct', res.scorePct);
    }
    if (scoreNum) {
      scoreNum.textContent = `${res.scorePct}%`;
    }
    if (verdictEl) {
      verdictEl.textContent = res.classification;
      verdictEl.className = `result-verdict ${res.verdictClass}`;
    }
    if (summaryText) {
      summaryText.textContent = res.detailedDesc;
    }

    // Diagnostic Axis Bars
    const rgBar = document.getElementById('rgAxisBar');
    const rgLabel = document.getElementById('rgAxisLabel');
    const byBar = document.getElementById('byAxisBar');
    const byLabel = document.getElementById('byAxisLabel');

    if (rgBar && rgLabel) {
      const rgPct = Math.max(0, 100 - (res.protanScore + res.deutanScore) * 8);
      rgBar.style.width = `${rgPct}%`;
      rgBar.style.backgroundColor = rgPct > 70 ? 'var(--success)' : 'var(--danger)';
      rgLabel.textContent = `${rgPct}% Normal`;
    }

    if (byBar && byLabel) {
      const byPct = Math.max(0, 100 - res.tritanScore * 25);
      byBar.style.width = `${byPct}%`;
      byBar.style.backgroundColor = byPct > 70 ? 'var(--info)' : 'var(--accent)';
      byLabel.textContent = `${byPct}% Normal`;
    }

    // Render 20-Plate Detailed Breakdown Table
    if (tableBody) {
      tableBody.innerHTML = '';
      res.userAnswers.forEach((ans, idx) => {
        const tr = document.createElement('tr');
        const isOk = ans.isNormal;

        tr.innerHTML = `
          <td><strong>Plate ${idx + 1}</strong></td>
          <td><span class="badge ${isOk ? 'badge-success' : 'badge-danger'}">${ans.selected}</span></td>
          <td>${ans.correctNormal}</td>
          <td>${ans.colorBlindSees || (ans.protanSees ? `${ans.protanSees} / ${ans.deutanSees}` : 'None')}</td>
          <td>
            <span class="status-pill ${isOk ? 'correct' : 'incorrect'}">
              ${isOk ? '✓ Match' : '✕ Variance'}
            </span>
          </td>
          <td><small>${ans.significance}</small></td>
        `;
        tableBody.appendChild(tr);
      });
    }

    // Initialize Simulator Demo Canvas with Plate 5 (The 74 plate!)
    this.initSimulatorCanvas();
  }

  initSimulatorCanvas() {
    const simCanvas = document.getElementById('simSampleCanvas');
    if (!simCanvas) return;

    // Draw Plate 5 (The iconic "74" Plate) on simulator canvas
    renderIshiharaPlate(simCanvas, this.plates[4]);

    const simButtons = document.querySelectorAll('.sim-btn');
    simButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        simButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterType = btn.getAttribute('data-sim');

        simCanvas.className = '';
        if (filterType !== 'normal') {
          simCanvas.classList.add(`sim-${filterType}`);
        }
      });
    });
  }
}

// ============================================================================
// 5. TRAITCOMPASS ASSESSMENTS ENGINE (Interactive Self-Assessments)
// ============================================================================

const TraitCompassAssessments = {
  initQuiz(containerId, quizData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let currentQ = 0;
    let scores = new Array(quizData.questions.length).fill(null);

    const render = () => {
      if (currentQ < quizData.questions.length) {
        const q = quizData.questions[currentQ];
        const pct = Math.round((currentQ / quizData.questions.length) * 100);

        container.innerHTML = `
          <div class="quiz-widget">
            <div class="quiz-widget-header">
              <span class="quiz-progress-text">Question ${currentQ + 1} of ${quizData.questions.length} (${pct}%)</span>
              <div class="progress-track" style="margin: 0.5rem 0 1.25rem;">
                <div class="progress-fill" style="width: ${pct}%"></div>
              </div>
            </div>

            <div class="quiz-question-box">
              <h3 class="quiz-question-title">${q.title}</h3>
              <p class="text-muted" style="margin-bottom: 1.2rem; font-size: 0.9rem;">${q.scenario || 'Reflect on your typical experience over the past 6 months:'}</p>
              
              <div class="quiz-options-list">
                ${q.options.map((opt, i) => `
                  <label class="quiz-option-label">
                    <input type="radio" name="quiz_opt_${currentQ}" value="${opt.points}" ${scores[currentQ] === opt.points ? 'checked' : ''}>
                    <span>${opt.label}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center;">
              <button class="btn btn-secondary btn-sm" id="prevQBtn" ${currentQ === 0 ? 'disabled' : ''}>
                ← Previous
              </button>
              <button class="btn btn-primary" id="nextQBtn" ${scores[currentQ] === null ? 'disabled' : ''}>
                ${currentQ === quizData.questions.length - 1 ? 'Calculate Results →' : 'Next Question →'}
              </button>
            </div>
          </div>
        `;

        const radios = container.querySelectorAll(`input[name="quiz_opt_${currentQ}"]`);
        radios.forEach(radio => {
          radio.addEventListener('change', (e) => {
            scores[currentQ] = parseInt(e.target.value, 10);
            const nextBtn = document.getElementById('nextQBtn');
            if (nextBtn) nextBtn.disabled = false;
          });
        });

        const prevBtn = document.getElementById('prevQBtn');
        const nextBtn = document.getElementById('nextQBtn');

        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            if (currentQ > 0) {
              currentQ--;
              render();
            }
          });
        }
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            if (scores[currentQ] !== null) {
              currentQ++;
              render();
            }
          });
        }
      } else {
        const total = scores.reduce((a, b) => a + b, 0);
        const maxScore = quizData.questions.length * 3;
        const resultTier = quizData.tiers.find(t => total >= t.min && total <= t.max) || quizData.tiers[0];

        container.innerHTML = `
          <div class="quiz-widget">
            <div class="quiz-result-box">
              <span class="badge ${resultTier.badgeClass || 'badge-primary'}" style="margin-bottom: 0.8rem;">
                Self-Reflection Complete
              </span>
              <div class="quiz-score-meter">${total} / ${maxScore}</div>
              <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem;">${resultTier.title}</h3>
              <p style="max-width: 600px; margin: 0 auto 1.5rem; font-size: 0.95rem;">${resultTier.description}</p>
              
              <div class="callout-box" style="text-align: left; margin: 1.5rem 0;">
                <h4 style="margin-bottom: 0.5rem; font-size: 1.05rem;">Educational Insights & Suggested Next Steps:</h4>
                <ul style="margin-left: 1.2rem; font-size: 0.9rem;">
                  ${resultTier.recommendations.map(r => `<li>${r}</li>`).join('')}
                </ul>
              </div>

              <!-- Mandatory Educational Disclaimer -->
              <div class="clinical-notice" role="note" style="margin: 1.5rem auto 1rem; text-align: left; max-width: 620px; font-size: 0.88rem;">
                <div class="notice-icon">ℹ️</div>
                <div>
                  <strong>Educational Disclaimer:</strong>
                  This content is provided for educational purposes and is not a substitute for professional mental health advice, assessment, or treatment. An online questionnaire cannot diagnose a mental health condition. If you are concerned about your well-being, consider speaking with a qualified mental health professional.
                </div>
              </div>

              <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap;">
                <button class="btn btn-outline" id="retakeQuizBtn">↺ Retake Questionnaire</button>
                <a href="index.html" class="btn btn-primary">Take 20-Plate Color Vision Test →</a>
              </div>
            </div>
          </div>
        `;

        const retakeBtn = document.getElementById('retakeQuizBtn');
        if (retakeBtn) {
          retakeBtn.addEventListener('click', () => {
            currentQ = 0;
            scores = new Array(quizData.questions.length).fill(null);
            render();
          });
        }
      }
    };

    render();
  }
};

// ============================================================================
// 6. INITIALIZATION DISPATCHER
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  if (document.getElementById('ishiharaCanvas')) {
    window.colorVisionApp = new ColorVisionTestEngine();
  }
});
