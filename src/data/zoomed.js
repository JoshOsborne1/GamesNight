// Zoomed game data - 20 zoomed-in images to guess
// Each entry has an SVG placeholder that represents the zoomed-in view

export const zoomed = [
  // ANIMALS (5 items)
  {
    id: 1,
    answer: "Cat",
    hint: "Furry pet that purrs and says meow",
    difficulty: "Easy",
    category: "Animals",
    description: "Close-up of orange tabby cat fur with whisker follicles visible",
    // SVG representing zoomed cat fur texture
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="fur1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#f4a460"/>
          <path d="M0,10 Q5,5 10,10 T20,10" stroke="#d2691e" stroke-width="2" fill="none"/>
          <path d="M0,15 Q5,10 10,15 T20,15" stroke="#cd853f" stroke-width="1.5" fill="none"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#fur1)"/>
      <circle cx="60" cy="80" r="3" fill="#8b4513" opacity="0.6"/>
      <circle cx="140" cy="120" r="2.5" fill="#8b4513" opacity="0.6"/>
      <circle cx="100" cy="60" r="3.5" fill="#8b4513" opacity="0.6"/>
      <circle cx="80" cy="150" r="2" fill="#8b4513" opacity="0.6"/>
      <circle cx="160" cy="90" r="3" fill="#8b4513" opacity="0.6"/>
    </svg>`
  },
  {
    id: 2,
    answer: "Dog",
    hint: "Loyal pet, man's best friend",
    difficulty: "Easy",
    category: "Animals",
    description: "Extreme close-up of a golden retriever's wet nose",
    // SVG representing zoomed dog nose
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="noseGrad" cx="50%" cy="40%">
          <stop offset="0%" stop-color="#4a4a4a"/>
          <stop offset="100%" stop-color="#1a1a1a"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="#2d2d2d"/>
      <ellipse cx="100" cy="100" rx="70" ry="60" fill="url(#noseGrad)"/>
      <ellipse cx="70" cy="90" rx="15" ry="20" fill="#0a0a0a"/>
      <ellipse cx="130" cy="90" rx="15" ry="20" fill="#0a0a0a"/>
      <path d="M85,140 Q100,150 115,140" stroke="#333" stroke-width="3" fill="none"/>
      <circle cx="50" cy="120" r="2" fill="#555" opacity="0.5"/>
      <circle cx="150" cy="110" r="2" fill="#555" opacity="0.5"/>
      <circle cx="100" cy="160" r="1.5" fill="#555" opacity="0.5"/>
    </svg>`
  },
  {
    id: 3,
    answer: "Butterfly",
    hint: "Colorful insect that starts as a caterpillar",
    difficulty: "Medium",
    category: "Animals",
    description: "Microscopic view of butterfly wing scales in blue and black",
    // SVG representing zoomed butterfly wing scales
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="scales" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
          <ellipse cx="7.5" cy="7.5" rx="6" ry="4" fill="#4169e1"/>
          <ellipse cx="7.5" cy="7.5" rx="4" ry="2.5" fill="#1e90ff"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="#000"/>
      <rect x="0" y="0" width="100" height="200" fill="url(#scales)"/>
      <rect x="100" y="0" width="100" height="200" fill="#191970"/>
      <circle cx="150" cy="50" r="15" fill="#ffd700" opacity="0.8"/>
      <circle cx="160" cy="150" r="10" fill="#ffd700" opacity="0.6"/>
      <circle cx="130" cy="100" r="8" fill="#ff8c00" opacity="0.7"/>
    </svg>`
  },
  {
    id: 4,
    answer: "Tiger",
    hint: "Big cat with orange and black stripes",
    difficulty: "Easy",
    category: "Animals",
    description: "Close-up of tiger stripe pattern on orange fur",
    // SVG representing zoomed tiger stripes
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#ff8c00"/>
      <path d="M0,30 Q50,10 100,30 T200,20" stroke="#000" stroke-width="12" fill="none"/>
      <path d="M0,70 Q60,50 120,70 T200,60" stroke="#000" stroke-width="10" fill="none"/>
      <path d="M0,110 Q40,90 80,110 T160,100 T200,110" stroke="#000" stroke-width="11" fill="none"/>
      <path d="M0,150 Q70,130 140,150 T200,140" stroke="#000" stroke-width="9" fill="none"/>
      <path d="M20,180 Q80,160 140,180" stroke="#000" stroke-width="8" fill="none"/>
      <path d="M30,0 Q50,50 30,100" stroke="#000" stroke-width="6" fill="none" opacity="0.7"/>
      <path d="M170,100 Q150,150 170,200" stroke="#000" stroke-width="7" fill="none" opacity="0.7"/>
    </svg>`
  },
  {
    id: 5,
    answer: "Bird",
    hint: "Creature with feathers that can fly",
    difficulty: "Medium",
    category: "Animals",
    description: "Macro shot of vibrant parrot feathers in red, blue, and yellow",
    // SVG representing zoomed bird feathers
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="feather1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff0000"/>
          <stop offset="50%" stop-color="#ff4500"/>
          <stop offset="100%" stop-color="#ff6347"/>
        </linearGradient>
        <linearGradient id="feather2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0000ff"/>
          <stop offset="100%" stop-color="#4169e1"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="#1a1a1a"/>
      <ellipse cx="60" cy="80" rx="40" ry="70" fill="url(#feather1)" transform="rotate(-20 60 80)"/>
      <ellipse cx="140" cy="90" rx="35" ry="60" fill="url(#feather2)" transform="rotate(15 140 90)"/>
      <ellipse cx="100" cy="150" rx="30" ry="50" fill="#ffd700" transform="rotate(-5 100 150)"/>
      <path d="M60,30 L60,130" stroke="#8b0000" stroke-width="2" transform="rotate(-20 60 80)"/>
      <path d="M140,40 L140,140" stroke="#000080" stroke-width="2" transform="rotate(15 140 90)"/>
      <path d="M100,110 L100,190" stroke="#b8860b" stroke-width="2" transform="rotate(-5 100 150)"/>
    </svg>`
  },

  // FOOD (5 items)
  {
    id: 6,
    answer: "Pizza",
    hint: "Italian dish with cheese and tomato sauce",
    difficulty: "Easy",
    category: "Food",
    description: "Close-up of melted cheese bubbles and pepperoni on pizza",
    // SVG representing zoomed pizza
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#d2691e"/>
      <circle cx="60" cy="70" r="35" fill="#cd5c5c" stroke="#8b0000" stroke-width="2"/>
      <circle cx="140" cy="60" r="40" fill="#cd5c5c" stroke="#8b0000" stroke-width="2"/>
      <circle cx="100" cy="140" r="38" fill="#cd5c5c" stroke="#8b0000" stroke-width="2"/>
      <circle cx="160" cy="130" r="30" fill="#cd5c5c" stroke="#8b0000" stroke-width="2"/>
      <circle cx="40" cy="150" r="28" fill="#cd5c5c" stroke="#8b0000" stroke-width="2"/>
      <circle cx="80" cy="50" r="25" fill="#cd5c5c" stroke="#8b0000" stroke-width="2"/>
      <circle cx="50" cy="65" r="4" fill="#8b0000" opacity="0.6"/>
      <circle cx="70" cy="75" r="3" fill="#8b0000" opacity="0.6"/>
      <circle cx="130" cy="55" r="5" fill="#8b0000" opacity="0.6"/>
      <circle cx="150" cy="50" r="3" fill="#8b0000" opacity="0.6"/>
      <circle cx="90" cy="145" r="4" fill="#8b0000" opacity="0.6"/>
      <circle cx="110" cy="135" r="3" fill="#8b0000" opacity="0.6"/>
      <ellipse cx="100" cy="100" rx="15" ry="10" fill="#ffd700" opacity="0.5"/>
    </svg>`
  },
  {
    id: 7,
    answer: "Strawberry",
    hint: "Red fruit with tiny seeds on the outside",
    difficulty: "Medium",
    category: "Food",
    description: "Extreme macro of strawberry surface showing seeds and texture",
    // SVG representing zoomed strawberry
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="berryGrad" cx="30%" cy="30%">
          <stop offset="0%" stop-color="#ff6b6b"/>
          <stop offset="100%" stop-color="#c92a2a"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#berryGrad)"/>
      <ellipse cx="50" cy="40" rx="8" ry="5" fill="#ffd43b"/>
      <ellipse cx="80" cy="60" rx="7" ry="4" fill="#ffd43b"/>
      <ellipse cx="120" cy="45" rx="8" ry="5" fill="#ffd43b"/>
      <ellipse cx="160" cy="70" rx="7" ry="4" fill="#ffd43b"/>
      <ellipse cx="40" cy="90" rx="6" ry="4" fill="#ffd43b"/>
      <ellipse cx="90" cy="100" rx="8" ry="5" fill="#ffd43b"/>
      <ellipse cx="140" cy="95" rx="7" ry="4" fill="#ffd43b"/>
      <ellipse cx="170" cy="120" rx="6" ry="4" fill="#ffd43b"/>
      <ellipse cx="60" cy="130" rx="8" ry="5" fill="#ffd43b"/>
      <ellipse cx="110" cy="140" rx="7" ry="4" fill="#ffd43b"/>
      <ellipse cx="150" cy="155" rx="6" ry="4" fill="#ffd43b"/>
      <ellipse cx="80" cy="170" rx="7" ry="4" fill="#ffd43b"/>
      <ellipse cx="130" cy="175" rx="8" ry="5" fill="#ffd43b"/>
      <ellipse cx="35" cy="160" rx="6" ry="4" fill="#ffd43b"/>
    </svg>`
  },
  {
    id: 8,
    answer: "Burger",
    hint: "Sandwich with a beef patty, popular fast food",
    difficulty: "Easy",
    category: "Food",
    description: "Cross-section showing layers of bun, lettuce, and patty",
    // SVG representing zoomed burger layers
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="45" fill="#f4a460"/>
      <ellipse cx="100" cy="45" rx="100" ry="15" fill="#d2691e"/>
      <rect x="0" y="45" width="200" height="25" fill="#90ee90"/>
      <path d="M0,55 Q25,45 50,55 T100,55 T150,55 T200,55" stroke="#228b22" stroke-width="3" fill="none"/>
      <path d="M0,65 Q30,55 60,65 T120,65 T180,65" stroke="#228b22" stroke-width="2" fill="none"/>
      <rect x="0" y="70" width="200" height="40" fill="#8b4513"/>
      <ellipse cx="60" cy="80" rx="8" ry="5" fill="#654321"/>
      <ellipse cx="120" cy="95" rx="10" ry="6" fill="#654321"/>
      <ellipse cx="160" cy="85" rx="7" ry="4" fill="#654321"/>
      <rect x="0" y="110" width="200" height="15" fill="#ffd700"/>
      <rect x="0" y="125" width="200" height="35" fill="#f4a460"/>
      <ellipse cx="100" cy="160" rx="100" ry="15" fill="#d2691e"/>
    </svg>`
  },
  {
    id: 9,
    answer: "Orange",
    hint: "Citrus fruit and also a color",
    difficulty: "Easy",
    category: "Food",
    description: "Close-up of orange peel texture showing pores and dimples",
    // SVG representing zoomed orange peel
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="orangePeel" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#ff8c00"/>
          <circle cx="10" cy="10" r="3" fill="#ffa500"/>
          <circle cx="30" cy="20" r="2.5" fill="#ffa500"/>
          <circle cx="15" cy="35" r="3.5" fill="#ffa500"/>
          <circle cx="35" cy="38" r="2" fill="#ffa500"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#orangePeel)"/>
      <circle cx="50" cy="50" r="4" fill="#ff7f00"/>
      <circle cx="150" cy="80" r="3" fill="#ff7f00"/>
      <circle cx="80" cy="150" r="5" fill="#ff7f00"/>
      <circle cx="170" cy="160" r="3.5" fill="#ff7f00"/>
      <circle cx="40" cy="120" r="4" fill="#ff7f00"/>
      <circle cx="130" cy="40" r="3" fill="#ff7f00"/>
    </svg>`
  },
  {
    id: 10,
    answer: "Pineapple",
    hint: "Tropical fruit with spiky skin and sweet yellow flesh",
    difficulty: "Medium",
    category: "Food",
    description: "Close-up of pineapple diamond pattern texture",
    // SVG representing zoomed pineapple
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#daa520"/>
      <g fill="none" stroke="#8b4513" stroke-width="2">
        <path d="M0,30 L30,0 M40,30 L70,0 M80,30 L110,0 M120,30 L150,0 M160,30 L190,0"/>
        <path d="M0,70 L30,40 M40,70 L70,40 M80,70 L110,40 M120,70 L150,40 M160,70 L190,40"/>
        <path d="M0,110 L30,80 M40,110 L70,80 M80,110 L110,80 M120,110 L150,80 M160,110 L190,80"/>
        <path d="M0,150 L30,120 M40,150 L70,120 M80,150 L110,120 M120,150 L150,120 M160,150 L190,120"/>
        <path d="M0,190 L30,160 M40,190 L70,160 M80,190 L110,160 M120,190 L150,160 M160,190 L190,160"/>
      </g>
      <g fill="none" stroke="#a0522d" stroke-width="2">
        <path d="M30,0 L0,30 M70,0 L40,30 M110,0 L80,30 M150,0 L120,30 M190,0 L160,30"/>
        <path d="M30,40 L0,70 M70,40 L40,70 M110,40 L80,70 M150,40 L120,70 M190,40 L160,70"/>
        <path d="M30,80 L0,110 M70,80 L40,110 M110,80 L80,110 M150,80 L120,110 M190,80 L160,110"/>
        <path d="M30,120 L0,150 M70,120 L40,150 M110,120 L80,150 M150,120 L120,150 M190,120 L160,150"/>
        <path d="M30,160 L0,190 M70,160 L40,190 M110,160 L80,190 M150,160 L120,190 M190,160 L160,190"/>
      </g>
      <circle cx="50" cy="50" r="4" fill="#556b2f"/>
      <circle cx="100" cy="90" r="5" fill="#556b2f"/>
      <circle cx="150" cy="50" r="4" fill="#556b2f"/>
      <circle cx="70" cy="130" r="5" fill="#556b2f"/>
      <circle cx="140" cy="140" r="4" fill="#556b2f"/>
    </svg>`
  },

  // OBJECTS (5 items)
  {
    id: 11,
    answer: "Phone",
    hint: "Device you use to call, text, and browse the internet",
    difficulty: "Easy",
    category: "Objects",
    description: "Extreme close-up of smartphone camera lens module",
    // SVG representing zoomed phone camera
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#2d2d2d"/>
      <circle cx="100" cy="100" r="60" fill="#1a1a1a" stroke="#444" stroke-width="3"/>
      <circle cx="100" cy="100" r="45" fill="#0a0a0a" stroke="#333" stroke-width="2"/>
      <circle cx="100" cy="100" r="30" fill="#1a1a2e"/>
      <circle cx="100" cy="100" r="20" fill="#16213e"/>
      <circle cx="100" cy="100" r="12" fill="#0f3460"/>
      <circle cx="100" cy="100" r="6" fill="#e94560"/>
      <circle cx="145" cy="55" r="15" fill="#1a1a1a" stroke="#444" stroke-width="2"/>
      <circle cx="145" cy="55" r="8" fill="#0a0a0a"/>
      <circle cx="55" cy="145" r="12" fill="#1a1a1a" stroke="#444" stroke-width="2"/>
      <circle cx="55" cy="145" r="6" fill="#0a0a0a"/>
      <circle cx="160" cy="100" r="3" fill="#666"/>
    </svg>`
  },
  {
    id: 12,
    answer: "Keyboard",
    hint: "You type on it to enter text into a computer",
    difficulty: "Medium",
    category: "Objects",
    description: "Close-up of mechanical keyboard key switches and keycaps",
    // SVG representing zoomed keyboard
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#1a1a1a"/>
      <rect x="10" y="10" width="50" height="50" rx="5" fill="#333" stroke="#555" stroke-width="2"/>
      <rect x="75" y="10" width="50" height="50" rx="5" fill="#333" stroke="#555" stroke-width="2"/>
      <rect x="140" y="10" width="50" height="50" rx="5" fill="#333" stroke="#555" stroke-width="2"/>
      <rect x="10" y="75" width="50" height="50" rx="5" fill="#333" stroke="#555" stroke-width="2"/>
      <rect x="75" y="75" width="50" height="50" rx="5" fill="#ff6b6b" stroke="#c92a2a" stroke-width="2"/>
      <rect x="140" y="75" width="50" height="50" rx="5" fill="#333" stroke="#555" stroke-width="2"/>
      <rect x="10" y="140" width="50" height="50" rx="5" fill="#333" stroke="#555" stroke-width="2"/>
      <rect x="75" y="140" width="50" height="50" rx="5" fill="#333" stroke="#555" stroke-width="2"/>
      <rect x="140" y="140" width="50" height="50" rx="5" fill="#51cf66" stroke="#2b8a3e" stroke-width="2"/>
      <text x="35" y="42" fill="#888" font-size="16" text-anchor="middle">Q</text>
      <text x="100" y="42" fill="#888" font-size="16" text-anchor="middle">W</text>
      <text x="165" y="42" fill="#888" font-size="16" text-anchor="middle">E</text>
      <text x="35" y="107" fill="#888" font-size="16" text-anchor="middle">A</text>
      <text x="100" y="107" fill="#fff" font-size="20" font-weight="bold" text-anchor="middle">Enter</text>
      <text x="165" y="107" fill="#888" font-size="16" text-anchor="middle">S</text>
    </svg>`
  },
  {
    id: 13,
    answer: "Car",
    hint: "Four-wheeled vehicle for transportation",
    difficulty: "Medium",
    category: "Objects",
    description: "Close-up of car paint metallic flake and reflection",
    // SVG representing zoomed car paint
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="carPaint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#c41e3a"/>
          <stop offset="50%" stop-color="#8b0000"/>
          <stop offset="100%" stop-color="#4a0000"/>
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#carPaint)"/>
      <circle cx="40" cy="50" r="3" fill="#ff6b6b" opacity="0.8"/>
      <circle cx="80" cy="80" r="4" fill="#ff8787" opacity="0.7"/>
      <circle cx="140" cy="40" r="2" fill="#ffa8a8" opacity="0.9"/>
      <circle cx="160" cy="90" r="3.5" fill="#ff6b6b" opacity="0.8"/>
      <circle cx="50" cy="130" r="2.5" fill="#ffc9c9" opacity="0.7"/>
      <circle cx="120" cy="120" r="4" fill="#ff8787" opacity="0.8"/>
      <circle cx="170" cy="150" r="3" fill="#ff6b6b" opacity="0.7"/>
      <circle cx="30" cy="170" r="3.5" fill="#ffa8a8" opacity="0.8"/>
      <circle cx="100" cy="160" r="2" fill="#ffc9c9" opacity="0.9"/>
      <ellipse cx="90" cy="60" rx="20" ry="10" fill="#fff" opacity="0.1" transform="rotate(-30 90 60)"/>
    </svg>`
  },
  {
    id: 14,
    answer: "Chair",
    hint: "Furniture you sit on",
    difficulty: "Easy",
    category: "Objects",
    description: "Close-up of woven fabric chair upholstery texture",
    // SVG representing zoomed chair fabric
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="weave" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill="#8b4513"/>
          <path d="M0,15 L30,15" stroke="#a0522d" stroke-width="12"/>
          <path d="M15,0 L15,30" stroke="#654321" stroke-width="12"/>
          <rect x="8" y="8" width="14" height="14" fill="#8b4513"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#weave)"/>
      <circle cx="45" cy="45" r="5" fill="#5d4037"/>
      <circle cx="105" cy="75" r="6" fill="#5d4037"/>
      <circle cx="165" cy="45" r="5" fill="#5d4037"/>
      <circle cx="75" cy="135" r="5" fill="#5d4037"/>
      <circle cx="155" cy="165" r="6" fill="#5d4037"/>
      <circle cx="35" cy="175" r="5" fill="#5d4037"/>
    </svg>`
  },
  {
    id: 15,
    answer: "Clock",
    hint: "Tells you what time it is",
    difficulty: "Hard",
    category: "Objects",
    description: "Extreme close-up of watch face showing gears and mechanism",
    // SVG representing zoomed clock mechanism
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#f5f5dc"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#8b7355" stroke-width="8"/>
      <circle cx="100" cy="100" r="60" fill="#fff"/>
      <line x1="100" y1="40" x2="100" y2="50" stroke="#333" stroke-width="3"/>
      <line x1="100" y1="160" x2="100" y2="150" stroke="#333" stroke-width="3"/>
      <line x1="40" y1="100" x2="50" y2="100" stroke="#333" stroke-width="3"/>
      <line x1="160" y1="100" x2="150" y2="100" stroke="#333" stroke-width="3"/>
      <line x1="58" y1="58" x2="65" y2="65" stroke="#666" stroke-width="2"/>
      <line x1="142" y1="58" x2="135" y2="65" stroke="#666" stroke-width="2"/>
      <line x1="58" y1="142" x2="65" y2="135" stroke="#666" stroke-width="2"/>
      <line x1="142" y1="142" x2="135" y2="135" stroke="#666" stroke-width="2"/>
      <line x1="100" y1="100" x2="100" y2="55" stroke="#000" stroke-width="4" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="130" y2="100" stroke="#000" stroke-width="3" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="5" fill="#c92a2a"/>
      <circle cx="100" cy="100" r="40" fill="none" stroke="#d4af37" stroke-width="1" stroke-dasharray="2,2"/>
      <circle cx="100" cy="100" r="25" fill="none" stroke="#d4af37" stroke-width="2"/>
    </svg>`
  },

  // NATURE (5 items)
  {
    id: 16,
    answer: "Tree",
    hint: "Tall plant with trunk, branches, and leaves",
    difficulty: "Easy",
    category: "Nature",
    description: "Close-up of tree bark texture showing ridges and grooves",
    // SVG representing zoomed tree bark
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#8b4513"/>
      <path d="M20,0 Q40,50 30,100 T20,200" stroke="#654321" stroke-width="15" fill="none"/>
      <path d="M60,0 Q80,60 70,120 T65,200" stroke="#654321" stroke-width="12" fill="none"/>
      <path d="M100,0 Q120,40 110,90 T100,200" stroke="#654321" stroke-width="18" fill="none"/>
      <path d="M140,0 Q160,70 150,140 T145,200" stroke="#654321" stroke-width="14" fill="none"/>
      <path d="M180,0 Q200,50 190,110 T185,200" stroke="#654321" stroke-width="16" fill="none"/>
      <path d="M0,40 Q30,30 60,45" stroke="#5d4037" stroke-width="4" fill="none"/>
      <path d="M0,90 Q40,80 80,95" stroke="#5d4037" stroke-width="5" fill="none"/>
      <path d="M120,60 Q160,50 200,65" stroke="#5d4037" stroke-width="4" fill="none"/>
      <path d="M100,150 Q140,140 180,155" stroke="#5d4037" stroke-width="5" fill="none"/>
      <ellipse cx="45" cy="70" rx="8" ry="5" fill="#3e2723"/>
      <ellipse cx="165" cy="120" rx="6" ry="4" fill="#3e2723"/>
    </svg>`
  },
  {
    id: 17,
    answer: "Flower",
    hint: "Colorful blooming plant, often given as a gift",
    difficulty: "Medium",
    category: "Nature",
    description: "Macro shot of flower petal showing delicate vein patterns",
    // SVG representing zoomed flower petal
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="petalGrad" cx="50%" cy="50%">
          <stop offset="0%" stop-color="#ff69b4"/>
          <stop offset="100%" stop-color="#c71585"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#petalGrad)"/>
      <path d="M100,20 L100,180" stroke="#ff1493" stroke-width="3" fill="none"/>
      <path d="M100,40 Q130,70 100,100" stroke="#db7093" stroke-width="2" fill="none"/>
      <path d="M100,40 Q70,70 100,100" stroke="#db7093" stroke-width="2" fill="none"/>
      <path d="M100,100 Q140,130 100,160" stroke="#db7093" stroke-width="2" fill="none"/>
      <path d="M100,100 Q60,130 100,160" stroke="#db7093" stroke-width="2" fill="none"/>
      <path d="M100,60 Q120,80 100,100" stroke="#ffb6c1" stroke-width="1.5" fill="none"/>
      <path d="M100,60 Q80,80 100,100" stroke="#ffb6c1" stroke-width="1.5" fill="none"/>
      <path d="M40,100 L160,100" stroke="#ff1493" stroke-width="2" fill="none"/>
      <path d="M60,100 Q80,80 100,100 T140,100" stroke="#db7093" stroke-width="1.5" fill="none"/>
      <path d="M20,100 Q50,85 80,100" stroke="#ffb6c1" stroke-width="1" fill="none"/>
      <path d="M120,100 Q150,85 180,100" stroke="#ffb6c1" stroke-width="1" fill="none"/>
    </svg>`
  },
  {
    id: 18,
    answer: "Mountain",
    hint: "Large natural elevation of the earth's surface",
    difficulty: "Hard",
    category: "Nature",
    description: "Aerial view of snow-capped mountain peak texture",
    // SVG representing zoomed mountain/snow
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#e8e8e8"/>
      <polygon points="50,150 100,50 150,150" fill="#fff" stroke="#ddd" stroke-width="2"/>
      <polygon points="20,180 80,80 140,180" fill="#f5f5f5" stroke="#ddd" stroke-width="2"/>
      <polygon points="120,160 160,70 200,160" fill="#fff" stroke="#ddd" stroke-width="2"/>
      <polygon points="80,50 100,20 120,50" fill="#fff"/>
      <path d="M60,120 L80,100 L100,120 L120,100" stroke="#ccc" stroke-width="1" fill="none"/>
      <path d="M140,100 L160,80 L180,100" stroke="#ccc" stroke-width="1" fill="none"/>
      <circle cx="90" cy="70" r="3" fill="#b0c4de"/>
      <circle cx="110" cy="60" r="2" fill="#b0c4de"/>
      <circle cx="150" cy="100" r="2.5" fill="#b0c4de"/>
      <path d="M30,160 Q50,140 70,160" stroke="#999" stroke-width="2" fill="none"/>
      <path d="M130,140 Q150,120 170,140" stroke="#999" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 19,
    answer: "Sunflower",
    hint: "Yellow flower that turns to face the sun",
    difficulty: "Easy",
    category: "Nature",
    description: "Close-up of sunflower center showing seed pattern",
    // SVG representing zoomed sunflower center
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#8b4513"/>
      <circle cx="40" cy="40" r="8" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="80" cy="30" r="7" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="120" cy="40" r="8" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="160" cy="35" r="6" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="30" cy="80" r="7" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="70" cy="70" r="9" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="110" cy="75" r="8" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="150" cy="70" r="7" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="190" cy="80" r="6" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="40" cy="120" r="8" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="85" cy="115" r="7" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="125" cy="110" r="9" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="165" cy="120" r="7" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="25" cy="160" r="6" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="70" cy="155" r="8" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="110" cy="150" r="7" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="155" cy="160" r="8" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="50" cy="190" r="5" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="95" cy="185" r="7" fill="#654321" stroke="#4a3728" stroke-width="1"/>
      <circle cx="140" cy="190" r="6" fill="#654321" stroke="#4a3728" stroke-width="1"/>
    </svg>`
  },
  {
    id: 20,
    answer: "Eye",
    hint: "The organ you use to see",
    difficulty: "Hard",
    category: "Nature",
    description: "Extreme macro of human iris showing detailed fiber patterns",
    // SVG representing zoomed eye/iris
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="irisGrad" cx="50%" cy="50%">
          <stop offset="0%" stop-color="#8b4513"/>
          <stop offset="30%" stop-color="#a0522d"/>
          <stop offset="60%" stop-color="#cd853f"/>
          <stop offset="100%" stop-color="#daa520"/>
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="#f5f5dc"/>
      <circle cx="100" cy="100" r="80" fill="url(#irisGrad)"/>
      <g stroke="#8b4513" stroke-width="1.5" fill="none">
        <line x1="100" y1="20" x2="100" y2="40"/>
        <line x1="100" y1="180" x2="100" y2="160"/>
        <line x1="20" y1="100" x2="40" y2="100"/>
        <line x1="180" y1="100" x2="160" y2="100"/>
        <line x1="44" y1="44" x2="58" y2="58"/>
        <line x1="156" y1="44" x2="142" y2="58"/>
        <line x1="44" y1="156" x2="58" y2="142"/>
        <line x1="156" y1="156" x2="142" y2="142"/>
      </g>
      <g stroke="#654321" stroke-width="1" fill="none">
        <path d="M100,25 Q130,40 100,55"/>
        <path d="M100,25 Q70,40 100,55"/>
        <path d="M175,100 Q160,130 145,100"/>
        <path d="M175,100 Q160,70 145,100"/>
        <path d="M100,175 Q130,160 100,145"/>
        <path d="M100,175 Q70,160 100,145"/>
        <path d="M25,100 Q40,70 55,100"/>
        <path d="M25,100 Q40,130 55,100"/>
      </g>
      <circle cx="100" cy="100" r="30" fill="#000"/>
      <circle cx="90" cy="85" r="8" fill="#fff" opacity="0.6"/>
      <circle cx="110" cy="110" r="4" fill="#fff" opacity="0.3"/>
    </svg>`
  }
]

export default zoomed
