# Peach - UI/UX Design Guidelines

## Design Philosophy

Peach should feel like **stepping into a warm, cozy 1960s kitchen**. Every element should evoke nostalgia while remaining functional and delightful to use.

**Core Principles:**
1. **Warm, not cold** - Soft edges, gentle colors, friendly typography
2. **Skeuomorphic touches** - Texture, depth, physical metaphors (envelopes, jars, paper)
3. **Character-driven** - Peach is always present, always reacting
4. **Playful, not juvenile** - Sophisticated nostalgia, not cartoonish
5. **Mobile-first** - The app should feel like holding a vintage object

---

## Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| **Peach** | `#FFCCB3` | Primary accent, buttons, highlights |
| **Peach Dark** | `#E8A88A` | Hover states, active elements |
| **Mint** | `#B8E0D2` | Secondary accent, positive states |
| **Cream** | `#FFF8F0` | Backgrounds, cards |
| **Charcoal** | `#3D3D3D` | Text, icons |

### Mood Colors
| Mood | Color | Hex |
|------|-------|-----|
| Happy | Soft Green | `#C8E6C9` |
| Neutral | Warm Cream | `#FFF8E1` |
| Anguished | Soft Coral | `#FFCDD2` |

### Semantic Colors
| Purpose | Color | Hex |
|---------|-------|-----|
| Success | Mint Green | `#81C784` |
| Warning | Warm Amber | `#FFB74D` |
| Danger | Soft Red | `#E57373` |
| Info | Sky Blue | `#64B5F6` |

---

## Typography

### Font Stack
```css
/* Headers - Vintage Serif */
font-family: 'Playfair Display', Georgia, serif;

/* Body - Friendly Sans */
font-family: 'Nunito', 'Avenir', sans-serif;

/* Accent/Script - Handwritten feel */
font-family: 'Pacifico', cursive;
```

### Scale
| Element | Size | Weight |
|---------|------|--------|
| H1 | 32px | 700 |
| H2 | 24px | 600 |
| H3 | 20px | 600 |
| Body | 16px | 400 |
| Small | 14px | 400 |
| Caption | 12px | 400 |

---

## Components

### Character Display (Peach)

The character should:
- Take up 30-40% of the screen height on mobile
- Be positioned at bottom-center or right
- Animate subtly (gentle bounce, blink) — not static
- Transition smoothly between moods
- Have a subtle shadow/glow

```
┌─────────────────────┐
│                     │
│    Chat bubble      │
│    from Peach       │
│                     │
│  ┌───────────────┐  │
│  │               │  │
│  │    PEACH      │  │
│  │   CHARACTER   │  │
│  │               │  │
│  └───────────────┘  │
│                     │
│  [Text input...]    │
└─────────────────────┘
```

### Chat Interface

**Peach's Messages:**
- Rounded bubble with cream background
- Subtle paper texture
- Small Peach avatar beside
- Mood indicator (emoji or colored dot)

**User's Messages:**
- Rounded bubble with peach/mint background
- Right-aligned

**Animations:**
- Messages should "typewriter" in character-by-character
- Or fade in with slight upward motion
- Peach should react (change expression) before responding

### Envelope System

Visual envelopes should:
- Look like real paper envelopes
- Show "cash" inside with varying fullness
- Use vintage patterns (subtle florals, stripes)
- Animate when money is added/removed
- Have tactile interactions (drag to transfer)

```
┌──────────────────┐
│ ✉️ GROCERIES     │  ← Envelope label
├──────────────────┤
│ ██████████░░░░░░ │  ← Cash level bar
│ $123 / $200      │  ← Amount / Budget
└──────────────────┘
```

### Cookie Jar (Savings)

- Actual jar visual with "coins" inside
- Coins accumulate visually as you save
- Satisfying animation when adding money
- Progress ring around the jar

### Kitchen Calendar

- Vintage wall calendar aesthetic
- Torn paper edge at top
- Handwritten-style font for dates
- Pins/thumbtacks for bill reminders
- Color-coded by category

### Sunday Paper

- Newspaper layout with columns
- "Headline" style typography
- Sections: Spending News, Savings Corner, Tips from Peach
- Scannable, skimmable format

---

## Animations & Micro-interactions

### Page Transitions
- Soft fade with slight scale (0.98 → 1.0)
- Duration: 200-300ms
- Easing: ease-out

### Button Press
- Slight scale down (0.97)
- Subtle shadow reduction
- Bounce back on release

### Loading States
- Peach character with "thinking" animation
- Cooking/baking metaphors ("Cooking up your numbers...")

### Success States
- Confetti for achievements
- Peach does a happy dance/clap
- Cheerful sound effect (optional)

### Error States
- Peach looks concerned (not anguished)
- Gentle shake animation
- Warm, helpful error messages

---

## Mobile Considerations

### Safe Areas
- Respect notch/dynamic island
- Bottom navigation should clear home indicator
- Input fields should scroll into view

### Touch Targets
- Minimum 44x44px
- Generous padding around interactive elements

### Navigation
- Bottom tab bar (3 tabs max)
- Swipe between main sections
- Pull-to-refresh for updates

### Gestures
- Long-press for quick actions
- Swipe to dismiss/delete
- Pinch-zoom on reports/charts

---

## Accessibility

- Color contrast: WCAG AA minimum
- Font sizes: Scalable with system settings
- Screen reader: Proper labels and announcements
- Reduced motion: Respect prefers-reduced-motion
- Touch: Large targets, clear focus states

---

## Dark Mode (Future)

If implemented:
- Warm dark tones (not pure black)
- Cream → Dark warm gray
- Peach accents remain
- Character assets may need dark variants

---

## Asset Requirements

### Character Sprites
- Happy, Neutral, Anguished (✓ done)
- Additional: Thinking, Celebrating, Sleeping
- High resolution (2x, 3x for retina)
- Transparent PNG or vector

### Icons
- Consistent line weight
- Vintage/hand-drawn style
- 24x24 base size
- Categories: Groceries, Dining, Transport, etc.

### Backgrounds
- Living room scene (✓ done)
- Kitchen scene (for planner)
- Newspaper texture (for Sunday Paper)
- Envelope paper texture

### Sounds (Optional)
- Page turn
- Cash register "cha-ching"
- Gentle notification chime
- Peach's reactions (gasps, approval sounds)
