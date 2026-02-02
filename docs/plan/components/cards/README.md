# Cards Component

## Screenshots

### 3D Effect Cards
![3D Cards](./x02%20cards%20with%203d%20effect.png)

### Card Grid
![Card Grid](./x06%20cards%20grid.png)

## Description

Versatile card components for displaying content in a grid layout. Multiple variants with different hover effects and layouts.

## Design

### Standard Card
- **Border radius:** 10-16px
- **Shadow:** Subtle drop shadow, increases on hover
- **Padding:** 24-32px internal
- **Background:** White or light color

### 3D Effect Card
- **Transform:** `perspective()` + `rotateX/Y` on hover
- **Shadow:** Dynamic shadow follows tilt direction
- **Reflection:** Optional glossy highlight effect
- **Transition:** Smooth 300ms ease-out

## Structure

```
card
├── card-image (optional, top)
│   └── img (aspect-ratio constrained)
├── card-body
│   ├── card-icon (optional)
│   ├── card-title (H3)
│   ├── card-description (paragraph)
│   └── card-link (optional, arrow link)
└── card-footer (optional)
```

## Variants

1. **Basic Card** - Image + title + description
2. **Icon Card** - Icon + title + description (no image)
3. **3D Card** - Interactive tilt effect on hover
4. **Link Card** - Entire card is clickable
5. **Horizontal Card** - Image left, content right

## Grid Layouts

- **3 columns** - Desktop default
- **2 columns** - Tablet
- **1 column** - Mobile
- Gap: 24-32px between cards

## Tailwind Implementation

### Basic Card
```html
<div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
  <img src="..." class="w-full aspect-square object-cover rounded-lg" />
  <h3 class="text-xl font-semibold mt-4">Title</h3>
  <p class="text-gray-600 mt-2">Description text...</p>
  <a href="#" class="text-green-600 mt-4 inline-flex items-center">
    Learn more <span class="ml-2">→</span>
  </a>
</div>
```

### 3D Effect (requires JS)
```html
<div class="card-3d" data-tilt data-tilt-max="10" data-tilt-speed="400">
  <!-- Card content -->
</div>
```

## Props

```typescript
interface CardProps {
  title: string;
  description?: string;
  image?: { src: string; alt: string };
  icon?: string;
  link?: { label: string; href: string };
  variant?: 'basic' | 'icon' | '3d' | 'horizontal';
}

interface CardGridProps {
  cards: CardProps[];
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}
```

## Reference

- Custom CSS: `_reference/src/components/card3d.less`
- HTML: `_reference/html/index.html` (user-items-list sections)
