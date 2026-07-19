# Lifi Studio — Design System

## Design Philosophy
Premium, intentional, human. Inspired by only.digital's restrained minimalism but with Lifi Studio's own identity: warm, creative, technically confident.

## Brand Personality
- **Professional** but not cold
- **Creative** but not chaotic  
- **Technical** but accessible
- **Indonesian** roots, global quality

## Color Palette
```css
/* Neutral — warm, not sterile */
--color-white: #FAFAF8;
--color-cream: #F5F0EB;
--color-stone-50: #E8E2DA;
--color-stone-100: #D4CCC2;
--color-stone-200: #B8AFA3;
--color-stone-300: #9C9387;
--color-stone-400: #7A7268;
--color-stone-500: #5C554C;
--color-stone-600: #403A34;
--color-stone-700: #2C2824;
--color-stone-800: #1C1A17;
--color-stone-900: #0F0E0C;

/* Brand Accent — warm terracotta / clay (unik, beda dari biru/hijau biasa) */
--accent-50: #FDF2ED;
--accent-100: #F9DDD1;
--accent-200: #F2BFA8;
--accent-300: #E89878;
--accent-400: #DD7A52;
--accent-500: #D0603A;
--accent-600: #B34C2C;
--accent-700: #953B22;
--accent-800: #7A2F1B;
--accent-900: #5E2313;

/* Gold accent — untuk premium touches */
--gold-400: #D4A853;
--gold-500: #C4953A;
--gold-600: #A87A2C;

/* Semantic */
--success: #2D7D46;
--warning: #B8860B;
--error: #B33A3A;
--info: #2C6B8A;
```

## Typography
```css
--font-heading: 'DM Sans', sans-serif;
--font-body: 'Outfit', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', monospace;
```

### Type Scale
```
---text-xs:   0.75rem  (12px)  — captions, metadata
---text-sm:   0.875rem (14px)  — small text, nav
---text-base: 1rem     (16px)  — body
---text-lg:   1.125rem (18px)  — large body
---text-xl:   1.25rem  (20px)  — subheading small
---text-2xl:  1.5rem   (24px)  — subheading
---text-3xl:  1.875rem (30px)  — section heading
---text-4xl:  2.25rem  (36px)  — page heading
---text-5xl:  3rem     (48px)  — hero heading
---text-6xl:  3.75rem  (60px)  — large hero
---text-7xl:  4.5rem   (72px)  — display
```

### Font Weights
- DM Sans: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Outfit: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- JetBrains Mono: 400 (regular), 500 (medium)

## Spacing System
Based on 4px grid:
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
```

## Border Radius
```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px — subtle */
--radius-full: 9999px;
```
Rule: minimal border radius, not oversized. Max radius on cards is 12px.

## Shadows
```css
--shadow-sm: 0 1px 2px rgba(15, 14, 12, 0.05);
--shadow-md: 0 4px 6px -1px rgba(15, 14, 12, 0.07), 0 2px 4px -2px rgba(15, 14, 12, 0.05);
--shadow-lg: 0 10px 15px -3px rgba(15, 14, 12, 0.08), 0 4px 6px -4px rgba(15, 14, 12, 0.04);
--shadow-xl: 0 20px 25px -5px rgba(15, 14, 12, 0.1), 0 8px 10px -6px rgba(15, 14, 12, 0.05);
--shadow-2xl: 0 40px 60px -15px rgba(15, 14, 12, 0.15);
```

## Motion (Framer Motion)
```css
/* Duration */
--dur-fast: 150ms;
--dur-normal: 300ms;
--dur-slow: 500ms;
--dur-reveal: 800ms;

/* Easing */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-spring: spring(1, 80, 10, 0);
```

### Animation Principles
1. **Purposeful** — every animation must clarify (state change, hierarchy, continuity)
2. **Subtle** — never faster than 150ms, never slower than 800ms for entrance
3. **Reduced motion** — respect `prefers-reduced-motion` on ALL animations
4. **Stagger** — children enter with 50-100ms delay, not all at once
5. **Scroll-triggered** — use `useInView` from framer-motion, not scroll event listeners

## Component Design Rules

### Cards
- No glassmorphism
- Subtle border (1px, --stone-50 or --stone-100)
- Padding: --space-6 minimum
- Border radius: --radius-lg (12px)
- Hover: subtle lift (translateY -2px) + shadow-md
- No icon by default unless content requires it

### Buttons
- **Primary:** filled accent-500 → hover accent-600
- **Secondary:** outlined with 1px border
- **Ghost:** no border, subtle bg on hover
- **Size:** px-6 py-3 default, px-4 py-2 small, px-8 py-4 large
- Border radius: --radius-md (8px)
- Font: Inter 500, --text-sm or --text-base

### Navigation
- Clean top nav with generous letter-spacing
- Active state: subtle underline or dot indicator
- Mobile: full-screen overlay with smooth transition
- No hamburger animation gimmicks

### Typography Elements
- Headings: Playfair Display, regular or semibold weight
- Body: Inter 400, leading-relaxed (1.7)
- Pull quotes: Playfair Display italic, large, with decorative opening quote
- Links: accent-500 underline on hover, transition 200ms

### Grid
- Portfolio: Masonry or 3-column grid
- Services: 2x2 or 2-column alternating layout
- Blog: 3-column card grid
- Stats: Horizontal row with numbers

## Page-Specific Design

### Hero Section
- Full-viewport height but not full-screen (90vh)
- Big heading (text-6xl to text-7xl) with Playfair Display
- Subtle animated element (floating shape or particle, not stock video)
- CTA button with arrow animation on hover
- Minimal text, maximum impact

### Portfolio Page
- Filter bar (All, Web, UI/UX, Graphic, Automation)
- Hover: overlay with project info + "View Project" link
- Click → detail page with full case study
- Detail: hero image, problem, solution, tech stack, results, testimonial

### Services Page
- Each service as a distinct section with its own visual identity
- Icon/illustration left, text right (odd) / reversed (even)
- Pricing or "starting from" section if applicable
- CTA to contact at the bottom

### About Page
- Founder story (NurlChl)
- Timeline of journey (4+ years, 30+ clients, 100+ projects)
- Skills/technologies grid
- Philosophy / approach section
- Team section (even if solo — "network of experts")

### Blog
- Clean reading experience
- Category tags
- Estimated read time
- Share buttons
- Related posts at bottom

### Contact
- Clean form with validation
- Map (optional)
- Direct contact info: email, social links, WhatsApp
- Response time guarantee

## Dashboard Design (CMS)
- Minimal, functional, not decorative
- Dark sidebar with white content area (inspired by Linear/Raycast)
- Tables for data with inline actions
- Modal/drawer for create/edit forms
- Status badges: published (green), draft (yellow), archived (gray)
- Toast notifications for success/error feedback

## Icon Strategy
- **Lucide React** as the primary icon library (clean, consistent, MIT)
- Custom SVG icons for Lifi Studio logo and brand-specific graphics
- Use icons sparingly — only where they aid scanning or comprehension
- Max 2 icon sizes: 16px (inline) and 20px (UI elements)
