# Scrollable Timeline

A vertical scroll-triggered timeline that reveals steps/milestones as the user scrolls. Used to show processes, project phases, or company history.

## Animation Demo

![Timeline Animation](./x04%20Scrolling%20timeline%20animation.gif)

## Screenshots

| Start | Middle | End |
|-------|--------|-----|
| ![Timeline Start](./x04.1%20Scrollable%20timeline%20start.png) | ![Timeline Middle](./x04.2%20Scrollable%20timeline%20middle.png) | ![Timeline End](./x04.3%20Scrollable%20timeline%20end.png) |

## Purpose

- Visualize step-by-step processes
- Show project methodology or workflow
- Create engaging scroll-driven experience
- Guide users through sequential information

## Structure

```
┌─────────────────────────────────────────────────────┐
│  [Section Title]                                    │
│  [Section Description]                              │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │         STEP 1                               │   │
│  │  ●──────────────────────────────────────     │   │
│  │  │                                           │   │
│  │  │    [Title]                                │   │
│  │  │    [Description text]                     │   │
│  │  │                                           │   │
│  ├──────────────────────────────────────────────┤   │
│  │         STEP 2                               │   │
│  │  ○──────────────────────────────────────     │   │
│  │  │                                           │   │
│  │  │    [Title]                                │   │
│  │  │    [Description text - faded until        │   │
│  │  │     scrolled into view]                   │   │
│  │  │                                           │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Design Details

### Timeline Line
- Vertical line on left side (or centered on desktop)
- Line color: brand green or gray
- Active portion highlighted/filled
- Progress indicator moves with scroll

### Step Markers
- Circular dots on timeline
- Active: Filled with brand color
- Inactive: Outline only or faded
- Size: 16-24px diameter

### Step Content
- Step number/label (small, uppercase)
- Title (heading font)
- Description text
- Optional image or icon

### Animation
- Content fades in as scrolled into view
- Timeline fills progressively
- Smooth transitions (CSS or JS)

## Tailwind Implementation

```astro
---
interface TimelineStep {
  number: string | number;
  title: string;
  description: string;
  icon?: string;
}

interface Props {
  title: string;
  description?: string;
  steps: TimelineStep[];
}

const { title, description, steps } = Astro.props;
---

<section class="py-16 lg:py-24 bg-white">
  <div class="container max-w-4xl">
    <div class="text-center mb-12">
      <h2 class="font-heading text-3xl lg:text-4xl text-brand-green mb-4">
        {title}
      </h2>
      {description && (
        <p class="text-lg text-brand-brown/80">{description}</p>
      )}
    </div>
    
    <div class="relative">
      <!-- Timeline Line -->
      <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-green/20">
        <div class="timeline-progress w-full bg-brand-green origin-top scale-y-0" 
             data-timeline-progress></div>
      </div>
      
      <!-- Steps -->
      <div class="space-y-12">
        {steps.map((step, index) => (
          <div class="timeline-step relative pl-12 opacity-40 transition-opacity duration-500"
               data-timeline-step>
            <!-- Marker -->
            <div class="absolute left-0 w-8 h-8 rounded-full border-2 border-brand-green 
                        bg-white flex items-center justify-center
                        timeline-marker transition-all duration-300">
              <span class="text-sm font-semibold text-brand-green">
                {step.number}
              </span>
            </div>
            
            <!-- Content -->
            <div class="bg-brand-beige/50 rounded-xl p-6">
              <span class="text-xs uppercase tracking-wider text-brand-green font-semibold">
                Schritt {step.number}
              </span>
              <h3 class="font-heading text-xl text-brand-brown mt-2 mb-3">
                {step.title}
              </h3>
              <p class="text-brand-brown/80">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<script>
  // Intersection Observer for scroll animation
  const steps = document.querySelectorAll('[data-timeline-step]');
  const progressBar = document.querySelector('[data-timeline-progress]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-40');
        entry.target.classList.add('opacity-100');
        entry.target.querySelector('.timeline-marker')
          ?.classList.add('bg-brand-green', 'text-white');
      }
    });
  }, { threshold: 0.5 });
  
  steps.forEach(step => observer.observe(step));
</script>
```

## Props

```typescript
interface TimelineProps {
  title: string;
  description?: string;
  steps: TimelineStep[];
  animated?: boolean;       // Enable scroll animation (default: true)
  showNumbers?: boolean;    // Show step numbers (default: true)
}

interface TimelineStep {
  number: string | number;
  title: string;
  description: string;
  icon?: string;            // Optional Material Symbol
  image?: string;           // Optional image URL
}
```

## Animation Options

### CSS-only (Simple)
```css
.timeline-step {
  opacity: 0.4;
  transition: opacity 0.5s ease;
}

.timeline-step.active {
  opacity: 1;
}
```

### JavaScript (Scroll-driven)
- IntersectionObserver for triggering
- Progress bar follows scroll position
- Each step animates when 50% visible

## Variants

1. **Left-aligned** - Timeline on left, content on right (default)
2. **Centered** - Alternating left/right content
3. **Minimal** - No cards, just dots and text
4. **With Images** - Each step has accompanying image

## Usage Context

- Process/methodology pages
- Project case studies
- Company history/about
- How-it-works sections
- Onboarding flows
