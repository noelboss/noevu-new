# Horizontal Scroll Component

## Screenshots

### Animation Demo
![Horizontal Scrolling Animation](./x08%20Horizontal%20scrolling%20animation.gif)

### Intro State
![Horizontal Scroll Intro](./x08.1%20Horizontal%20scroll%20intro.png)

### Section Panel
![Horizontal Scroll Section](./x08.2%20Horizontal%20scroll%20section%201.png)

## Description

Scroll-triggered horizontal sliding panels. As user scrolls vertically, content moves horizontally, creating an immersive storytelling experience. Often used for process flows, timelines, or feature showcases.

## Design

- **Container:** Full viewport height, pinned during scroll
- **Panels:** Full-width slides that move left as user scrolls down
- **Progress:** Optional progress indicator (dots or line)
- **Background:** Can change per panel (color or image)
- **Typography:** Large headlines, minimal text per panel

## Structure

```
horizontal-scroll-section
├── scroll-container (position: sticky, overflow: hidden)
│   ├── panels-track (transforms horizontally)
│   │   └── panel (repeated, 100vw each)
│   │       ├── panel-background
│   │       ├── panel-content
│   │       │   ├── panel-number (optional, "01")
│   │       │   ├── panel-title
│   │       │   ├── panel-description
│   │       │   └── panel-image (optional)
│   │       └── panel-media (image/video, opposite side)
│   └── progress-indicator (optional)
│       └── dots or progress-bar
```

## Behavior

1. **Pin Container:** Section becomes `position: sticky` when reaching viewport
2. **Scroll Progress:** Vertical scroll mapped to horizontal translation
3. **Panel Transition:** Each panel slides in from right as previous exits left
4. **Unpin:** After last panel, section unpins and normal scroll resumes
5. **Easing:** Smooth interpolation, not linear jump

## Technical Approach

### CSS Scroll-Snap (Simpler)
```html
<div class="flex overflow-x-auto snap-x snap-mandatory">
  <div class="snap-center shrink-0 w-screen">Panel 1</div>
  <div class="snap-center shrink-0 w-screen">Panel 2</div>
</div>
```

### JavaScript (Full Control)
```javascript
// Using GSAP ScrollTrigger or similar
gsap.to(".panels-track", {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll-section",
    pin: true,
    scrub: 1,
    end: () => "+=" + track.scrollWidth
  }
});
```

## Tailwind Implementation

```html
<section class="relative h-[400vh]"> <!-- Height = panels × 100vh -->
  <div class="sticky top-0 h-screen overflow-hidden">
    <div class="panels-track flex transition-transform duration-300"
         style="transform: translateX(calc(-100vw * var(--scroll-progress)))">
      
      <!-- Panel 1 -->
      <div class="shrink-0 w-screen h-screen flex items-center bg-green-900">
        <div class="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <span class="text-6xl font-bold text-green-400/30">01</span>
            <h2 class="text-4xl font-bold text-white mt-4">Panel Title</h2>
            <p class="text-white/70 mt-4">Description text...</p>
          </div>
          <div>
            <img src="..." class="rounded-lg" />
          </div>
        </div>
      </div>
      
      <!-- Panel 2, 3, etc. -->
    </div>
    
    <!-- Progress dots -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
      <div class="w-2 h-2 rounded-full bg-white"></div>
      <div class="w-2 h-2 rounded-full bg-white/30"></div>
      <div class="w-2 h-2 rounded-full bg-white/30"></div>
    </div>
  </div>
</section>
```

## Props

```typescript
interface HorizontalScrollPanel {
  number?: string;
  title: string;
  description?: string;
  image?: { src: string; alt: string };
  background?: 'dark' | 'light' | 'brand' | string;
}

interface HorizontalScrollProps {
  panels: HorizontalScrollPanel[];
  showProgress?: boolean;
  progressStyle?: 'dots' | 'line';
}
```

## Dependencies

- **Option 1:** Vanilla JS with Intersection Observer
- **Option 2:** GSAP + ScrollTrigger (recommended for smoothness)
- **Option 3:** Framer Motion (if using React islands)

## Reference

- Squarespace class: `horizontal-scroll-section`
- Section IDs: Multiple sections with this class on homepage
