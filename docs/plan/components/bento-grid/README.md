# Bento Grid

A modern grid layout featuring mixed-size cards with images, icons, and text content. Inspired by Apple's "Bento box" design pattern.

## Screenshot

![Bento Grid](./x03%20bento%20feature%20grid.png)

## Purpose

- Showcase multiple features or services in an engaging visual layout
- Break monotony of standard grids with varied card sizes
- Create visual hierarchy through size differentiation
- Display rich content (images, icons, text) in compact format

## Structure

```
┌──────────────────┬──────────┬──────────┐
│                  │          │          │
│   Large Card     │  Medium  │  Medium  │
│   (2x2 or 2x1)   │   Card   │   Card   │
│                  │          │          │
├──────────┬───────┴──────────┴──────────┤
│          │                             │
│  Medium  │        Large Card           │
│   Card   │        (2x1)                │
│          │                             │
└──────────┴─────────────────────────────┘
```

## Design Details

### Grid Layout
- CSS Grid with auto-fit columns
- Cards span 1x1, 2x1, 1x2, or 2x2 grid cells
- Gap between cards: 16-24px
- Rounded corners on all cards (10px / `rounded-xl`)

### Card Types

#### Image Card
- Full-bleed background image
- Optional gradient overlay for text readability
- Title overlay at bottom

#### Icon Card  
- Large centered Material Symbol icon
- Title below icon
- Optional description text
- Solid background color

#### Text Card
- Heading + body text
- Call-to-action link
- Solid background color

### Color Themes
- White cards with green text
- Green cards with white text
- Beige cards with brown text
- Orange accent cards

## Tailwind Implementation

```astro
---
interface BentoCard {
  type: 'image' | 'icon' | 'text';
  title: string;
  description?: string;
  icon?: string;
  image?: string;
  href?: string;
  span?: 'sm' | 'md' | 'lg' | 'xl';  // Grid span size
  theme?: 'white' | 'green' | 'beige' | 'orange';
}

interface Props {
  cards: BentoCard[];
}

const { cards } = Astro.props;

const spanClasses = {
  sm: '',                           // 1x1
  md: 'md:col-span-2',              // 2x1
  lg: 'md:row-span-2',              // 1x2
  xl: 'md:col-span-2 md:row-span-2' // 2x2
};

const themeClasses = {
  white: 'bg-white text-brand-brown',
  green: 'bg-brand-green text-white',
  beige: 'bg-brand-beige text-brand-brown',
  orange: 'bg-brand-orange text-white',
};
---

<section class="py-16 lg:py-24">
  <div class="container">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card) => (
        <div class:list={[
          'rounded-xl p-6 lg:p-8',
          spanClasses[card.span || 'sm'],
          themeClasses[card.theme || 'white'],
          card.type === 'image' && 'relative overflow-hidden bg-cover bg-center min-h-[200px]'
        ]}
        style={card.image ? `background-image: url(${card.image})` : undefined}
        >
          {card.type === 'icon' && (
            <span class="material-symbols-outlined text-5xl mb-4">
              {card.icon}
            </span>
          )}
          
          <h3 class="font-heading text-xl lg:text-2xl mb-2">
            {card.title}
          </h3>
          
          {card.description && (
            <p class="text-sm opacity-80">{card.description}</p>
          )}
          
          {card.href && (
            <a href={card.href} class="mt-4 inline-flex items-center gap-1 font-semibold">
              Learn more
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

## Props

```typescript
interface BentoGridProps {
  cards: BentoCard[];
  sectionTitle?: string;
  sectionDescription?: string;
}

interface BentoCard {
  type: 'image' | 'icon' | 'text';
  title: string;
  description?: string;
  icon?: string;           // Material Symbols icon name
  image?: string;          // Image URL for image cards
  href?: string;           // Optional link
  span?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'white' | 'green' | 'beige' | 'orange';
}
```

## Responsive Behavior

| Breakpoint | Columns | Card Spans |
|------------|---------|------------|
| Mobile | 1 | All cards full-width |
| Tablet | 2 | md spans 2 cols |
| Desktop | 4 | Full grid layout |

## Usage Context

- Service overview pages
- Feature highlights
- Homepage sections
- About page capabilities
