# THE ARCAM PROJECT — Design System & Creative Direction

**Premium Digital Agency Homepage**  
**EST. 2026 | Timeless By Design**

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Layout & Spacing](#layout--spacing)
5. [Component Architecture](#component-architecture)
6. [Animation & Motion](#animation--motion)
7. [Section-by-Section Breakdown](#section-by-section-breakdown)
8. [Responsive Design](#responsive-design)
9. [Interaction Patterns](#interaction-patterns)
10. [Implementation Specifications](#implementation-specifications)

---

## Design Philosophy

### Visual Identity

The Arcam Project embodies **timeless luxury** through:

- **Cinematic Excellence** — Every frame feels like a high-end film sequence
- **Minimal Intentionality** — Only essential elements; nothing decorative
- **Futuristic Elegance** — Modern without being trendy
- **Editorial Refinement** — Premium fashion magazine aesthetic
- **Premium Craftsmanship** — Every pixel carefully considered

### Brand Personality

- Sophisticated, not flashy
- Powerful, not aggressive
- Elegant, not ornate
- Modern, not trendy
- Exclusive, not exclusive-feeling

### Design Inspiration

- Apple's restraint and refinement
- Awwwards premium motion design
- Framer's interactive elegance
- Linear's minimal interface design
- Webflow's production capability
- Luxury architecture studio websites

---

## Color System

### Primary Palette

#### Deep Matte Black
- **Hex:** #050505
- **RGB:** 5, 5, 5
- **Usage:** Primary background, text, structural elements
- **Psychology:** Authority, luxury, sophistication

#### Warm Ivory / Champagne Gold
- **Hex:** #E8DDD0
- **RGB:** 232, 221, 208
- **Usage:** Primary text, headings, accents, highlights
- **Psychology:** Premium, timeless, elegant

### Secondary Palette

#### Soft Muted Gold
- **Hex:** #D4AF77
- **RGB:** 212, 175, 119
- **Usage:** Subtle accents, hover states, premium highlights
- **Psychology:** Luxury, refinement, elegance

#### Deep Charcoal
- **Hex:** #1A1A1A
- **RGB:** 26, 26, 26
- **Usage:** Secondary backgrounds, subtle depth
- **Psychology:** Depth, elegance, refinement

#### Barely White
- **Hex:** #F9F8F6
- **RGB:** 249, 248, 246
- **Usage:** Light accents, hover states, premium cards
- **Psychology:** Cleanliness, premium, breathing room

### Accent Colors (Use Sparingly)

#### Muted Copper
- **Hex:** #A67C52
- **Usage:** Sophisticated accent in specific components

#### Soft Sage
- **Hex:** #8B9D83
- **Usage:** Trust-building accent

### Color Applications

| Element | Color | Hex |
|---------|-------|-----|
| Primary Background | Deep Matte Black | #050505 |
| Primary Text | Warm Ivory | #E8DDD0 |
| Headings | Champagne Gold | #E8DDD0 |
| Primary CTA | Warm Ivory | #E8DDD0 |
| CTA Hover | Soft Gold | #D4AF77 |
| Borders | Soft Gold | #D4AF77 |
| Secondary Background | Deep Charcoal | #1A1A1A |
| Card Background | #0F0F0F | |
| Text Muted | Soft Gold (40% opacity) | #D4AF77 |
| Accent Highlights | Muted Copper | #A67C52 |

### Gradients (Minimal Use Only)

**Subtle Entrance Gradient**
```
from: rgba(232, 221, 208, 0)
to: rgba(232, 221, 208, 0.1)
direction: 135deg
```

**Premium Overlay**
```
from: rgba(5, 5, 5, 0.8)
to: rgba(5, 5, 5, 0)
direction: 180deg
```

---

## Typography System

### Typeface Selection

#### Headings — Editorial Serif
**Font:** Playfair Display (or similar luxury serif)
- Weight: 400 (Regular), 600 (Semibold)
- Character Spacing: 0.08em (high letter spacing)
- Line Height: 1.1
- Purpose: Authority, prestige, editorial luxury

#### Body & UI — Modern Sans-Serif
**Font:** Inter or Poppins
- Weight: 400 (Regular), 500 (Medium), 600 (Semibold)
- Character Spacing: 0
- Line Height: 1.6 (body), 1.2 (UI)
- Purpose: Readability, modernity, premium minimalism

### Typography Scale

| Role | Size | Weight | Line Height | Letter Spacing | Use Case |
|------|------|--------|-------------|-----------------|----------|
| **Hero Headline** | 72px | 400 | 1.1 | 0.08em | Main headline (desktop) |
| **Section Title** | 56px | 400 | 1.1 | 0.08em | Section headings |
| **Subheading Large** | 36px | 400 | 1.2 | 0.06em | Feature headings |
| **Subheading Medium** | 28px | 500 | 1.2 | 0.04em | Card titles |
| **Subheading Small** | 20px | 600 | 1.3 | 0 | UI headings |
| **Body Large** | 18px | 400 | 1.6 | 0 | Feature descriptions |
| **Body Regular** | 16px | 400 | 1.6 | 0 | Primary body text |
| **Body Small** | 14px | 400 | 1.6 | 0 | Secondary text |
| **Caption** | 12px | 500 | 1.4 | 0.05em | Captions, labels |
| **CTA Button** | 16px | 600 | 1.4 | 0.02em | Call-to-action |

### Mobile Typography

| Role | Mobile Size | Adjustments |
|------|-------------|-------------|
| **Hero Headline** | 48px | Reduce letter spacing to 0.04em |
| **Section Title** | 36px | Reduce letter spacing to 0.04em |
| **Subheading Large** | 24px | Maintain proportions |
| **Body Regular** | 16px | Maintain proportions |

### Typography Hierarchy

**Hierarchy Principle:** Each level is distinct and purposeful

1. **Hero Headline** — Largest, most prominent, serif
2. **Section Titles** — Large serif, secondary emphasis
3. **Subheadings** — Medium serif/sans-serif, category emphasis
4. **Body Text** — Standard sans-serif, editorial flow
5. **Secondary Text** — Smaller sans-serif, supporting information
6. **Captions** — Smallest, support and context

---

## Layout & Spacing

### Spacing System

**Base Unit: 8px**

| Scale | Size | Usage |
|-------|------|-------|
| xs | 4px | Micro adjustments |
| sm | 8px | Tight spacing |
| md | 16px | Standard padding |
| lg | 24px | Component spacing |
| xl | 32px | Section spacing |
| 2xl | 48px | Large gaps |
| 3xl | 64px | Hero spacing |
| 4xl | 96px | Between major sections |

### Padding & Margins

**Container:**
- Desktop: 64px horizontal, 96px vertical
- Tablet: 48px horizontal, 64px vertical
- Mobile: 24px horizontal, 48px vertical

**Cards:**
- Large: 48px
- Medium: 32px
- Small: 24px

**Text Spacing:**
- Paragraph margin-bottom: 24px
- Section margin-top: 96px
- Section margin-bottom: 96px

### Grid System

**12-column grid** with:
- Desktop gutter: 24px
- Tablet gutter: 20px
- Mobile gutter: 16px

---

## Component Architecture

### Button System

#### Primary CTA Button
```
Style: Outlined border
Color: Warm Ivory (#E8DDD0)
Border: 2px solid
Padding: 16px 48px
Text: CTA Regular / 600 weight
Hover: 
  - Background: Warm Ivory
  - Text Color: Deep Black
  - Border: Soft Gold
Transition: 300ms ease
```

#### Secondary CTA Button
```
Style: Ghost / Transparent
Color: Soft Gold (#D4AF77)
Border: 1px solid
Padding: 12px 32px
Hover:
  - Border Color: Warm Ivory
  - Color: Warm Ivory
Transition: 300ms ease
```

#### Icon Button
```
Size: 44x44px
Background: Deep Charcoal (#1A1A1A)
Icon: Warm Ivory (#E8DDD0)
Hover: Background transitions to #2A2A2A
Transition: 200ms ease
Border Radius: 2px
```

### Card Components

#### Premium Feature Card
```
Background: Deep Charcoal (#1A1A1A)
Border: 1px solid Soft Gold (#D4AF77)
Padding: 48px
Border Radius: 0px (sharp luxury)
Hover Effects:
  - Scale: 1.02
  - Shadow: 0 20px 60px rgba(212, 175, 119, 0.1)
  - Border Color: Warm Ivory
Transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)
```

#### Image Card
```
Background: #0F0F0F
Aspect Ratio: 16/9
Overlay: Linear gradient (top to bottom, transparent to black)
Hover Effects:
  - Image Scale: 1.05
  - Overlay Opacity: Increase 20%
Transition: 400ms ease-out
```

### Input Components

#### Form Input
```
Background: #1A1A1A
Border: 1px solid #D4AF77
Color: #E8DDD0
Padding: 12px 16px
Border Radius: 0px
Font: Body Regular
Placeholder Color: #D4AF77 (60% opacity)
Focus: 
  - Border Color: #E8DDD0
  - Box Shadow: 0 0 0 3px rgba(212, 175, 119, 0.1)
Transition: 200ms ease
```

---

## Animation & Motion

### Animation Philosophy

- **Purpose-driven:** Every animation serves the user experience
- **Elegant:** Motion is smooth and refined
- **Intentional:** No unnecessary movement
- **Responsive:** Animations respect motion preferences
- **Performance-first:** 60fps on all devices

### Motion Timing

| Duration | Use Case |
|----------|----------|
| 200ms | Quick interactions, hover states, close animations |
| 300ms | Standard interactions, transitions |
| 500ms | Page transitions, significant changes |
| 800ms | Hero animations, major reveals |
| 1000ms+ | Long-form animations, cinematics |

### Easing Functions

```
Standard Easing: cubic-bezier(0.4, 0, 0.2, 1)
Entrance: cubic-bezier(0, 0, 0.2, 1)
Exit: cubic-bezier(0.4, 0, 1, 1)
Bounce (subtle): cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Core Animation Patterns

#### Fade In
- Duration: 600ms
- Delay: Stagger by 100ms for multiple elements
- Easing: Standard
- From: opacity 0
- To: opacity 1

#### Slide Up
- Duration: 600ms
- From: transform translateY(40px), opacity 0
- To: transform translateY(0), opacity 1
- Easing: Standard

#### Scale Entrance
- Duration: 500ms
- From: transform scale(0.95), opacity 0
- To: transform scale(1), opacity 1
- Easing: Standard

#### Parallax Scroll
- Subtle depth effect
- Y offset: 10-20% of viewport height
- Applied to: Background elements, hero images
- Performance: Use transform/scale, not position

#### Text Reveal
- Duration: 800ms
- Pattern: Word by word or line by line
- Delay: 50ms stagger between elements
- From: opacity 0, blur(4px)
- To: opacity 1, blur(0)

#### Magnetic Button
- On hover, button attracts cursor subtly
- Duration: 300ms
- Scale: 1.05
- Shadow: Increase elevation

#### Image Scale on Hover
- Duration: 400ms
- From: scale(1)
- To: scale(1.05)
- Applied to: Card images, gallery items

#### Scroll Trigger Animations
- Elements animate when they enter viewport
- Used for: Section headlines, cards, images
- Trigger threshold: 50% visibility

### Preloader Animation

```
Duration: 2-3 seconds total
Sequence:
1. Logo opacity fade-in (400ms)
2. Logo scale entrance (600ms)
3. Subtle grain/texture animation (continuous)
4. Blur effect on background (600ms)
5. Page fade-in begins at 2s mark
6. Preloader fades out while content fades in

Should feel like entering a luxury studio space.
```

### Page Transition Animation

```
Exit animation:
- Current page fades out (400ms)
- Content blurs slightly
- Opacity reduces to 0

Entry animation:
- New page starts at opacity 0, blur(4px)
- Fades and unblurs over 500ms
- Hero elements stagger in
```

### Scroll-based Animations

#### Sticky Scroll Timeline
```
Hero: Fixed until scroll 300px
Section 1: Fade in when 50% visible
Section 2: Parallax offset -30px
Timeline: Progress bar animates with scroll
```

#### Lazy Load Images
```
Placeholder: Blur-up effect
Load duration: 600ms
Transition: Blur to sharp + opacity

from: filter blur(20px), opacity 0
to: filter blur(0), opacity 1
```

---

## Section-by-Section Breakdown

### 1. PRELOADER EXPERIENCE

**Duration:** 2-3 seconds

**Visual Direction:**
- Black background (#050505)
- Centered logo
- Elegant entrance animation
- Subtle grain texture (optional)
- Smooth fade transition to content

**Animation Sequence:**
1. **Stage 1 (0-400ms):** Logo fades in
2. **Stage 2 (400-1000ms):** Logo scales and settles
3. **Stage 3 (1000-2000ms):** Subtle ambient animation
4. **Stage 4 (2000-2400ms):** Page content fades in underneath
5. **Stage 5 (2400+):** Preloader fades to transparent

**Code Pattern:**
```javascript
// Framer Motion variant
const preloaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 2 } }
}
```

**Mobile Consideration:** Same duration, but may be skipped on repeat visits (store in localStorage).

---

### 2. HERO SECTION

**Height:** 100vh (full viewport)

**Layout:**
- Asymmetrical composition
- Content left-aligned (desktop)
- Visual element right (desktop) or full-width background (mobile)

**Visual Elements:**

**Headline:**
- Font: Playfair Display, 72px (desktop), 48px (mobile)
- Color: Warm Ivory (#E8DDD0)
- Letter Spacing: 0.08em
- Max Width: 60% of container

**Subheading:**
- Font: Inter, 18px, Regular
- Color: Soft Gold (#D4AF77)
- Line Height: 1.6
- Max Width: 50%

**CTA Buttons:**
- Two buttons (desktop), stacked (mobile)
- Button 1: "Start Your Project" (Primary)
- Button 2: "View Our Work" (Secondary)
- Placement: Below subheading, 24px gap

**Background Visual:**
- Subtle gradient overlay
- Abstract geometric shapes (optional)
- Video background (optional, muted)
- Parallax effect on scroll

**Animation:**
- Headline: Fade in + Slide up (600ms, stagger 100ms)
- Subheading: Fade in + Slide up (600ms, delay 200ms)
- Buttons: Fade in (600ms, delay 300ms)
- Background: Subtle parallax (-20px offset by 200px scroll)

**Scroll Indicator:**
- Mouse icon animation
- Bounce effect
- Disappears after 300px scroll
- Color: Soft Gold (#D4AF77)

**Responsive:**
- Desktop: Side-by-side layout
- Tablet: Centered, full-width
- Mobile: Full-width, centered, stacked elements

---

### 3. BRAND PHILOSOPHY SECTION

**Layout:** Asymmetrical editorial

**Content Structure:**
- Section title on left (desktop)
- Philosophy statement spans full width
- 3-4 core principles below

**Visual Design:**
- Minimal color palette (Black + Gold only)
- Large typography blocks
- Generous whitespace
- Dividing lines between principles

**Components:**

**Section Title:**
- Font: Playfair Display, 56px
- Color: Warm Ivory (#E8DDD0)
- Alignment: Left (desktop), Center (mobile)

**Philosophy Statement:**
- Font: Inter, 18px
- Color: #E8DDD0
- Line Height: 1.8
- Max Width: 90%
- Bottom Margin: 64px

**Principles Grid:**
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column

**Principle Card:**
```
Title: Bold, 20px, #E8DDD0
Description: 14px, #D4AF77
Icon: 32x32, minimalist line art
Border-bottom: 1px solid #D4AF77
Padding: 24px 0
Hover: Border expands, text color brightens
```

**Animation:**
- Title: Fade in + Slide up on load
- Statement: Text reveal (line by line)
- Principle cards: Stagger fade-in (100ms between each)

---

### 4. SERVICES SECTION

**Layout:** Premium card grid

**Structure:**
- Section title
- 6 service cards in 3x2 grid (desktop), 2x3 (tablet), 1x6 (mobile)
- Optional: Horizontal scroll on tablet

**Service Card Design:**
```
Layout: Vertical
Background: Deep Charcoal (#1A1A1A)
Border: 1px solid Soft Gold (#D4AF77)
Padding: 48px
Border Radius: 0px

Elements:
- Icon: 64x64px, line art, #D4AF77
- Title: 24px, #E8DDD0, Playfair Display
- Description: 16px, #D4AF77, 1.6 line height
- Arrow Icon: Appears on hover, animate right 8px

Hover State:
- Scale: 1.02
- Border: 2px solid #E8DDD0
- Shadow: 0 20px 60px rgba(212, 175, 119, 0.15)
- Arrow: Color change to #E8DDD0
- Text description: Color change to #E8DDD0
Transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)
```

**Services Listed:**
1. Premium Websites — Luxurious, conversion-focused digital experiences
2. Digital Systems — Scalable, intelligent business infrastructure
3. Brand Identity — Strategic visual and narrative positioning
4. Conversion Optimization — High-performing customer journeys
5. Business Automation — Intelligent workflow integration
6. High-End Platforms — Custom-built solutions for visionary brands

**Section Animation:**
- Title: Fade in + Slide up
- Cards: Stagger in from bottom (50ms between each)
- Use IntersectionObserver for trigger

---

### 5. FEATURED PROJECTS / CASE STUDIES

**Layout:** Alternating carousel + featured showcase

**Structure:**
- Hero case study (full width, featured project)
- 3-4 project cards below
- Optional: Carousel navigation

**Case Study Card:**
```
Desktop Layout:
- Left: Project image (60% width)
- Right: Content (40% width)

Content:
- Client name: 12px, all caps, #D4AF77
- Project title: 36px, #E8DDD0
- Description: 16px, #D4AF77
- Metrics: 3 columns
  - Metric: 24px bold, #E8DDD0
  - Label: 12px, #D4AF77
- CTA: "View Case Study"

Image Effects:
- Aspect ratio: 4/3
- Overlay: Gradient overlay (transparent to dark)
- Hover: Scale 1.05, overlay opacity increase
```

**Secondary Project Cards:**
```
Grid: 3 columns (desktop), 2 (tablet), 1 (mobile)

Layout: Image top, content below
Image Aspect: 16/9
Padding: 24px
Border: 1px solid #D4AF77

Title: 20px, #E8DDD0
Category: 12px, #D4AF77
Hover Effects:
- Border color change to #E8DDD0
- Image scale 1.05
- Shadow increase
```

**Animation:**
- Hero image: Parallax on scroll (25px offset)
- Cards: Fade in on scroll trigger
- Titles: Text reveal animation

---

### 6. PROCESS SECTION

**Layout:** Vertical timeline (desktop), horizontal scroll (tablet), vertical (mobile)

**Structure:**
- Section title
- 5-step timeline
- Description for each step
- Optional: Animated progress indicator

**Timeline Design:**
```
Desktop:
- Vertical layout
- Left column: Step numbers + titles
- Right column: Descriptions
- Connected by animated line

Mobile:
- Horizontal scroll
- Cards stack horizontally
- Swipe to navigate

Each Step:
- Number: 72px, bold, #D4AF77
- Title: 28px, #E8DDD0
- Description: 16px, #D4AF77, max-width 400px
- Icon: Optional, 48x48px line art

Timeline Connection:
- Line: 2px solid #D4AF77
- Animated progress: #E8DDD0 fills based on scroll
- Dot indicators: 16x16px, animate between steps
```

**Steps:**
1. **Discovery** — Understanding your vision, market, and business objectives
2. **Strategy** — Defining positioning, architecture, and growth framework
3. **Design** — Crafting premium experiences with intentional interactions
4. **Development** — Building robust, scalable technical infrastructure
5. **Launch** — Deploying with precision and measuring impact

**Animation:**
- Line animation: Draws from top as page scrolls
- Dot animation: Transitions between steps with scale effect
- Text reveal: Line by line as step comes into view

---

### 7. WHY CHOOSE US

**Layout:** Trust-building benefit grid

**Structure:**
- Section title: 56px, #E8DDD0
- 6 benefit cards in 2x3 grid (desktop), 1x6 (mobile)

**Benefit Card:**
```
Layout: Icon + Title + Description (vertical)
Icon: 48x48px, line art, #D4AF77
Title: 20px, bold, #E8DDD0
Description: 14px, #D4AF77, 1.6 line height

Background: Minimal (transparent or subtle)
Border: Optional subtle bottom border
Hover:
- Icon color: #E8DDD0
- Title color: Soft Gold highlight
- Shadow: Subtle elevation
```

**Benefits:**
1. **Premium Craftsmanship** — Every detail purposefully designed
2. **Conversion Focus** — Strategy-driven results, not just aesthetics
3. **Scalable Systems** — Built for growth and evolution
4. **Modern Technology** — Cutting-edge tools and methodologies
5. **Strategic Partnership** — We invest in your success
6. **Timeless Results** — Work that endures beyond trends

**Animation:**
- Cards: Fade in + slight scale on scroll trigger
- Stagger: 100ms between each card

---

### 8. TESTIMONIALS

**Layout:** Carousel or grid reveal

**Structure:**
- Section title
- 3-4 testimonials visible (desktop)
- Scrollable carousel (mobile)

**Testimonial Card:**
```
Layout: Quote + Author stack

Quote:
- Font: 18px, italic, #E8DDD0
- Line height: 1.8
- Margin bottom: 24px
- Opening quote mark: Large, #D4AF77

Author Section:
- Name: 16px, bold, #E8DDD0
- Title: 14px, #D4AF77
- Company: 12px, #D4AF77

Background: Deep Charcoal (#1A1A1A)
Border: 1px solid Soft Gold (#D4AF77)
Padding: 48px
Border radius: 0px

Hover:
- Shadow increase
- Border color: #E8DDD0
- Background subtle lighten
```

**Animation:**
- Cards: Fade in on scroll trigger
- Quote mark: Separate animation, scale entrance
- Content: Staggered reveal

---

### 9. FINAL CTA SECTION

**Height:** 70vh minimum

**Layout:** Centered, cinematic

**Design:**
```
Background: Deep black with subtle pattern or gradient
Content Centered: 80% max width

Headline:
- Font: Playfair Display, 72px (desktop), 48px (mobile)
- Color: Warm Ivory (#E8DDD0)
- Text: "Build Something Timeless."
- Alignment: Center
- Letter spacing: 0.08em

Subtext:
- Font: Inter, 18px
- Color: Soft Gold (#D4AF77)
- Optional supporting copy
- Margin top: 24px

CTA Button:
- Large primary button
- Padding: 20px 64px
- Text: "Start Your Project"
- Centered below subtext
- Margin top: 48px

Hover Effects:
- Button: Scale 1.05, shadow increase
- Text: All elements brightens slightly
```

**Animation:**
- Headline: Fade in + Scale entrance (600ms)
- Subtext: Fade in (400ms, delay 200ms)
- Button: Fade in (400ms, delay 400ms)
- Background: Subtle parallax or grain animation
- Continuous: Subtle floating animation on button

**Visual Effects:**
- Parallax background on scroll
- Optional: Animated particles or subtle shapes
- Blur entrance from previous section

---

### 10. FOOTER

**Layout:** Minimal, premium

**Design:**
```
Background: #0F0F0F (slightly lighter than main black)
Padding: 64px 32px
Border top: 1px solid #D4AF77

Grid Structure (Desktop):
- Left (30%): Logo + tagline
- Center (40%): Navigation
- Right (30%): Socials + contact

Elements:

Logo Section:
- Logo: 32x32px
- Text: "The Arcam Project"
- Font: 12px, all caps, #D4AF77
- Tagline: 12px, italic, #D4AF77

Navigation:
- Link list
- Font: 14px, #E8DDD0
- Hover: Color change to #D4AF77
- Links: Services, About, Work, Contact

Social Links:
- Icons: 20x20px line art
- Color: #D4AF77
- Hover: Scale 1.2, color change to #E8DDD0
- Spacing: 16px between icons

Copyright:
- Font: 12px, #D4AF77 (60% opacity)
- Text: "© 2026 The Arcam Project. All rights reserved."
- Positioned: Bottom center or bottom right

Contact Info:
- Email: hello@thearcamproject.com
- Phone: Optional

Mobile Footer:
- Vertical stack
- Centered alignment
- Same styling, responsive spacing
```

**Animation:**
- On scroll into view: Fade in
- Links: Hover effect with smooth transition
- Socials: Hover scale + color change

---

## Responsive Design

### Breakpoints

```
Mobile: 375px - 767px
Tablet: 768px - 1023px
Desktop: 1024px+
Large Desktop: 1440px+
```

### Responsive Adjustments

#### Mobile (375px - 767px)

- Hero Height: 90vh (not full 100vh for mobile nav)
- Hero Font Size: 48px headings, 16px body
- Section Padding: 24px
- Service Cards: 1 column
- Timeline: Horizontal scroll or full width
- Case Study: Full width, stacked layout
- Testimonials: Single column carousel
- Button Size: Larger touch targets (44px min height)

#### Tablet (768px - 1023px)

- Hero Height: 100vh
- Hero Font Size: 56px headings
- Section Padding: 48px
- Service Cards: 2 columns
- Grid Cards: 2 columns
- Image Aspect Ratios: Maintain but responsive width

#### Desktop (1024px+)

- Full design as specified
- Optimal line lengths (45-75 characters)
- Spacing optimized for larger screens

### Responsive Typography

```javascript
// CSS Example
@media (max-width: 768px) {
  .hero-headline {
    font-size: 48px;
    letter-spacing: 0.04em;
  }
}

@media (max-width: 480px) {
  .hero-headline {
    font-size: 36px;
  }
}
```

---

## Interaction Patterns

### Hover States

**Standard Hover (300ms):**
- Scale: 1.02
- Shadow: Increase 0-20px
- Color: Primary to secondary (if text)
- Border: Increase weight or brighten

**Button Hover:**
- Magnetic effect: Attract cursor
- Scale: 1.05
- Shadow: 0 20px 60px rgba(212, 175, 119, 0.15)
- Text opacity: Increase

**Link Hover:**
- Underline: Appears smoothly (width 0 to 100%)
- Color: Soft Gold (#D4AF77)
- Duration: 200ms

### Focus States

**Keyboard Focus:**
- Outline: 2px solid Soft Gold (#D4AF77)
- Outline offset: 2px
- All interactive elements support focus

### Active States

**Button Active:**
- Scale: 0.98 (slight press effect)
- Shadow: Reduce elevation
- Duration: 50ms

### Scroll Interactions

**Scroll Trigger:**
- Elements fade/slide in when 50% visible
- No animation if prefers-reduced-motion
- Smooth scroll behavior enabled

### Mobile Interactions

**Touch Targets:**
- Minimum 44x44px for buttons
- Minimum 48x48px for icon buttons
- Padding between targets: 8px minimum

**Gestures:**
- Swipe to navigate carousels
- Tap to interact with cards
- Long press: Optional context menu

---

## Implementation Specifications

### Technology Stack

- **Framework:** Next.js 14+
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion + GSAP
- **State Management:** React Context or Zustand
- **Performance:** Image optimization, code splitting

### Performance Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **Page Load:** < 3s (3G network)
- **Animation FPS:** 60fps minimum

### Accessibility

- **Color Contrast:** WCAG AA minimum (4.5:1)
- **Motion:** Respects prefers-reduced-motion
- **Keyboard Navigation:** Full support
- **Screen Readers:** Semantic HTML, ARIA labels
- **Mobile:** Touch-friendly, proper touch targets

### Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 13+
- Chrome Android: Latest 2 versions

### File Structure

```
src/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   └── components/
│       ├── ui/
│       │   ├── Preloader.jsx
│       │   ├── Hero.jsx
│       │   ├── Philosophy.jsx
│       │   ├── Services.jsx
│       │   ├── Projects.jsx
│       │   ├── Process.jsx
│       │   ├── WhyChooseUs.jsx
│       │   ├── Testimonials.jsx
│       │   ├── FinalCTA.jsx
│       │   └── Footer.jsx
│       ├── common/
│       │   ├── Button.jsx
│       │   ├── Card.jsx
│       │   └── Navigation.jsx
│       └── animations/
│           ├── useScrollAnimation.js
│           ├── variants.js
│           └── transitions.js
```

---

## Design Assets & Resources

### Icons
- **Source:** Feather Icons or Heroicons
- **Style:** Line art, 2px stroke
- **Color:** #D4AF77 (primary), #E8DDD0 (hover)
- **Size:** 24px - 64px depending on context

### Images
- **Format:** WebP with JPEG fallback
- **Optimization:** Compressed, responsive sizes
- **Aspect Ratios:** 16:9 (hero), 4:3 (projects), 1:1 (testimonials)
- **Photography Style:** Premium, clean, cinematic

### Fonts Loading

```html
<!-- Preload for performance -->
<link rel="preload" href="/fonts/PlayfairDisplay-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>
```

---

## Quality Assurance Checklist

- [ ] All animations run at 60fps
- [ ] No layout shifts (CLS < 0.1)
- [ ] All buttons keyboard accessible
- [ ] Color contrast passes WCAG AA
- [ ] Prefers-reduced-motion respected
- [ ] Mobile responsive tested on real devices
- [ ] Touch interactions tested
- [ ] Form accessibility verified
- [ ] Links have proper underlines
- [ ] Focus states visible
- [ ] Fonts load correctly
- [ ] Images optimized
- [ ] Performance targets met
- [ ] Cross-browser tested
- [ ] 404/error states designed
- [ ] Loading states shown

---

## Creative Direction Summary

**The Arcam Project homepage is a masterclass in luxury digital design.** Every element serves the brand's promise of premium, timeless digital experiences. The design achieves emotional impact through:**

1. **Restraint** — Using negative space powerfully
2. **Precision** — Every pixel intentional
3. **Elegance** — Refinement over decoration
4. **Motion** — Purposeful, smooth animations
5. **Hierarchy** — Clear information structure
6. **Luxury** — Premium materials and craft
7. **Modernity** — Cutting-edge without trends
8. **Conversion** — Guiding users toward action

This is a website that *feels* like working with The Arcam Project: sophisticated, capable, and committed to excellence.

---

**Design Document Version:** 1.0  
**Last Updated:** May 12, 2026  
**Prepared for:** Next.js Development Team
