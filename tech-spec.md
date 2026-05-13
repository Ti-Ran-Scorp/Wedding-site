# Tech Spec — Alina & Kirill Wedding Invitation

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | React DOM renderer |
| typescript | ^5.7.0 | Type safety |
| vite | ^6.0.0 | Build tool |
| tailwindcss | ^3.4.0 | Utility-first CSS |
| gsap | ^3.12.0 | Animation engine (includes ScrollTrigger, all plugins free) |
| @gsap/react | ^2.1.0 | useGSAP hook for React lifecycle safety |

No Lenis — smooth scroll omitted to reduce bundle size. Native `scroll-behavior: smooth` on anchor links is sufficient.

## Component Inventory

### Layout

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed header, transparent→white on scroll, mobile hamburger |
| OpeningCurtain | Custom | Fixed overlay, removed from DOM after animation |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroCoupleReveal | Custom | 2 portrait cards with speech bubbles, triggered after curtain removal |
| Invitation | Custom | 3-photo fan layout + centered text |
| DateCalendar | Custom | SVG decorative frame + CSS grid calendar + pulsing heart |
| Venue | Custom | Full-width parallax bg image + gradient overlay + text block |
| Timeline | Custom | Vertical alternating timeline + 2 rotating flower SVGs |
| DressCode | Custom | 6 color swatches + 2 CSS scroll-snap carousels (women/men) |
| Wishes | Custom | Quote text block |
| GuestForm | Custom | Controlled form with conditional field, custom radio/checkbox |
| Contacts | Custom | 3 contact cards with tel: links |
| CountdownTimer | Custom | Live timer, counts up from 0 on first scroll view |
| Closing | Custom | Couple photo + speech bubble |
| Footer | Custom | Simple text footer |

### Reusable

| Component | Source | Used By |
|-----------|--------|---------|
| ScrollReveal | Custom (wrapper) | Invitation, DateCalendar, Venue, Wishes, Contacts, Closing, Footer |
| SpeechBubble | Custom | HeroCoupleReveal, Closing |
| SectionTitle | Custom | Invitation, DateCalendar, Timeline, DressCode, GuestForm, Contacts, CountdownTimer |

No shadcn/ui components used — the design is fully custom with no standard UI patterns that would benefit from shadcn.

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Opening curtain sequence | GSAP Timeline | Multi-step timeline: clapperboard snap (rotation + flash overlay), then simultaneous dispersal of flowers (translate + rotate + opacity) and clapperboard shrink, finally overlay fade-out and DOM removal. `onComplete` callback triggers hero entrance. | 🔒 High |
| Hero couple entrance | GSAP Timeline | Sequential: bride photo from left, groom photo from right, then speech bubbles scale in with `back.out`. Triggered by curtain `onComplete`. | Medium |
| Scroll-triggered section reveals | GSAP ScrollTrigger | Reusable `ScrollReveal` wrapper — elements animate once when entering viewport (opacity 0→1, y: 30→0). Applied to all sections below hero. | Low |
| Photo fan fly-in | GSAP ScrollTrigger | 3 photos stagger from right (x: 100→0, opacity, stagger: 0.15s). Separate triggers for title and body text. | Low |
| Calendar frame draw-in | GSAP ScrollTrigger | SVG `stroke-dasharray` / `stroke-dashoffset` animation on the floral border path. | Medium |
| Calendar scale-in | GSAP ScrollTrigger | Scale 0.85→1, opacity 0→1, delay 0.3s after frame starts. | Low |
| Pulsing heart | CSS @keyframes | `scale(1)→scale(1.35)→scale(1)` + opacity oscillation, 1.8s infinite. Pure CSS, no JS needed. | Low |
| Venue parallax | GSAP ScrollTrigger | `scrub: true`, translateY on background image based on scroll progress. Range limited to prevent image exit. | Medium |
| Venue text stagger | GSAP ScrollTrigger | Label→name→address→button, each y: 40→0 with 0.15s stagger. | Low |
| Timeline line grow | GSAP ScrollTrigger | `scaleY: 0→1`, `transformOrigin: top`, duration 1s. | Low |
| Timeline items stagger | GSAP ScrollTrigger | Items alternate left/right (x: ±30→0), stagger 0.2s, opacity 0→1. | Low |
| Rotating timeline flowers | GSAP ScrollTrigger | `scrub: true`, rotation linked to scrollY * 0.1. Two ScrollTrigger instances, one per flower. | Medium |
| Color swatches pop-in | GSAP ScrollTrigger | `scale: 0→1`, `back.out(1.7)`, stagger 0.08s. | Low |
| Carousel entrance | GSAP ScrollTrigger | Labels fade up, photos slide up with 0.1s stagger. | Low |
| Wishes quote reveal | GSAP ScrollTrigger | Quote mark opacity + scale, then text y: 20→0. | Low |
| Form fields stagger | GSAP ScrollTrigger | Fields y: 30→0, opacity, stagger 0.1s. | Low |
| Contact cards stagger | GSAP ScrollTrigger | Cards y: 20→0, opacity, stagger 0.15s. | Low |
| Timer count-up | GSAP ScrollTrigger | On first view, digits animate from 0 to target value over 1.5s with `power2.out`. | Medium |
| Closing photo + bubble | GSAP ScrollTrigger | Photo scale 0.95→1 + opacity, bubble y: 30→0 with 0.4s delay. | Low |
| Start button pulse | GSAP | `yoyo: true`, `repeat: -1`, opacity 0.7→1, 2s sine. Part of curtain idle state. | Low |
| Mobile nav slide | CSS transition | `max-height` or `transform` transition, 0.4s ease. | Low |

## State & Logic Plan

### Opening Curtain → Hero Orchestration

The opening curtain overlay controls the entry point of the entire page. It must:
1. Render first (z-index: 100, position: fixed)
2. Block all scroll and interaction until dismissed
3. Run a GSAP timeline on click
4. On timeline completion: set a React state flag (`isCurtainOpen: true`)
5. This flag conditionally renders the hero entrance animation (useGSAP with `dependencies: [isCurtainOpen]`)
6. After fade-out completes (0.5s delay), remove overlay from DOM entirely

### Guest Form Conditional Field

The "additional guests" textarea is conditionally rendered based on the attendance radio selection. Form state managed with React `useState`. When "С удовольствием приду" is selected → show textarea. When "К сожалению, не смогу" → hide and clear textarea value.

### Form Submission Flow

Three-state UI: `idle` | `submitting` | `success`. On success: fade out form, fade in thank-you message with pulsing heart. No actual backend — form data can be logged to console or sent to a configurable endpoint.

### Countdown Timer

`useEffect` with `setInterval(1000)` calculates diff between `now` and target date (Sept 6, 2026 16:00). Cleanup on unmount. On first scroll into view (ScrollTrigger `onEnter`), run GSAP count-up animation from 0 to current values.

### Timeline Scroll-Rotation Flowers

Two separate GSAP ScrollTrigger instances with `scrub: true`. Each targets a flower SVG ref and applies rotation based on scroll position. Use `transformOrigin: center center`.

### Navigation Scroll State

`useEffect` with scroll listener (throttled). When `scrollY > 50`, add `scrolled` class for white background + blur. Close mobile menu on scroll.

## Other Key Decisions

**Carousels**: CSS scroll-snap (`scroll-snap-type: x mandatory`, `scroll-snap-align: center`) with overflow-x auto. No JS carousel library needed — this keeps bundle small and provides native touch/swipe behavior. Arrow buttons use `scrollBy` or `scrollTo` on the container ref.

**SVG Assets**: Flower bouquets, clapperboard, timeline flowers, decorative elements — all inline SVG components (not external files). This enables GSAP targeting of individual SVG elements and avoids HTTP requests.

**Parallax**: Transform-based (not `background-attachment: fixed`). GSAP ScrollTrigger `scrub: true` on a background image div inside an `overflow: hidden` container. The image is oversized (120% height) and translateY shifts it within the container bounds.

**No routing**: Single page, all sections on one scrollable document. Anchor links with `scroll-behavior: smooth`.

**Responsive strategy**: Mobile-first with Tailwind breakpoints. Key breakpoint at 600px (sm) for layout changes, 768px (md) for nav, 1024px (lg) for desktop layouts.
