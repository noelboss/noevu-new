# Features Component

## Screenshot

![Key Features Section](./x04%20key%20feature%20section.png)

## Description

Section highlighting key features, services, or benefits. Typically displays 3-6 items in a grid or list format with icons and short descriptions.

## Design

- **Layout:** 3-column grid (desktop), stacked (mobile)
- **Icons:** Large, centered above text or left-aligned
- **Typography:** Bold title, muted description
- **Spacing:** Generous whitespace between items
- **Background:** Usually white or light section

## Structure

```
features-section
├── section-header (optional)
│   ├── section-title (H2)
│   └── section-description
├── features-grid
│   └── feature-item (repeated)
│       ├── feature-icon
│       ├── feature-title (H3)
│       └── feature-description
```

## Variants

1. **Icon Top** - Icon centered above text
2. **Icon Left** - Icon on left, text on right
3. **Card Style** - Each feature in a card with border/shadow
4. **Numbered** - Sequential numbers instead of icons
5. **With Image** - Small image instead of icon

## Grid Options

| Desktop | Tablet | Mobile |
|---------|--------|--------|
| 3 cols  | 2 cols | 1 col  |
| 4 cols  | 2 cols | 1 col  |
| 2 cols  | 2 cols | 1 col  |

## Tailwind Implementation

```html
<section class="py-20 bg-white">
  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold">Section Title</h2>
      <p class="text-gray-600 mt-4">Supporting description text</p>
    </div>
    
    <!-- Grid -->
    <div class="grid md:grid-cols-3 gap-8 md:gap-12">
      <!-- Feature Item -->
      <div class="text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8 text-green-600"><!-- Icon --></svg>
        </div>
        <h3 class="text-xl font-semibold mt-6">Feature Title</h3>
        <p class="text-gray-600 mt-3">Feature description text explaining the benefit.</p>
      </div>
      <!-- More items -->
    </div>
  </div>
</section>
```

## Props

```typescript
interface FeatureItem {
  icon: string; // Icon name or SVG
  title: string;
  description: string;
  link?: { label: string; href: string };
}

interface FeaturesProps {
  title?: string;
  description?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: 'icon-top' | 'icon-left' | 'card' | 'numbered';
  alignment?: 'center' | 'left';
}
```
