# Testimonials Component

## Screenshot

![Testimonials Standalone](./x10%20Testimonials%20standalone.png)

## Description

Customer testimonials section displaying quotes, ratings, and author information. Builds trust and social proof through real customer feedback.

## Design

- **Layout:** Grid of testimonial cards or carousel
- **Cards:** Quote, author photo, name, title, company
- **Rating:** Optional star rating (1-5)
- **Style:** Clean cards with subtle shadows
- **Background:** Usually neutral to let quotes stand out

## Structure

```
testimonials-section
├── section-header
│   ├── title (H2)
│   └── description (optional)
├── testimonials-grid / carousel
│   └── testimonial-card (repeated)
│       ├── quote-icon (") (optional)
│       ├── quote-text
│       ├── rating (optional, stars)
│       └── author
│           ├── author-image
│           ├── author-name
│           ├── author-title
│           └── author-company
```

## Variants

1. **Grid** - 2-3 column static grid
2. **Carousel** - Swipeable cards
3. **Single Featured** - One large testimonial
4. **Wall** - Masonry layout with varying sizes
5. **Minimal** - Quote + name only, no photos

## Card Styles

| Style | Description |
|-------|-------------|
| **Card** | White background, shadow, rounded |
| **Bordered** | Border only, no shadow |
| **Flat** | No border or shadow |
| **Highlighted** | Accent background for featured |

## Tailwind Implementation

### Grid Layout
```html
<section class="py-20 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold">What our clients say</h2>
    </div>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Testimonial Card -->
      <div class="bg-white rounded-xl p-6 shadow-sm">
        <!-- Quote -->
        <p class="text-gray-700 leading-relaxed">
          "Excellent work! The team delivered beyond our expectations..."
        </p>
        
        <!-- Rating -->
        <div class="flex gap-1 mt-4">
          <svg class="w-5 h-5 text-yellow-400"><!-- Star --></svg>
          <svg class="w-5 h-5 text-yellow-400"><!-- Star --></svg>
          <svg class="w-5 h-5 text-yellow-400"><!-- Star --></svg>
          <svg class="w-5 h-5 text-yellow-400"><!-- Star --></svg>
          <svg class="w-5 h-5 text-yellow-400"><!-- Star --></svg>
        </div>
        
        <!-- Author -->
        <div class="flex items-center mt-6">
          <img src="..." class="w-12 h-12 rounded-full object-cover" />
          <div class="ml-4">
            <p class="font-semibold">Jane Smith</p>
            <p class="text-sm text-gray-500">CEO, TechCorp</p>
          </div>
        </div>
      </div>
      
      <!-- More cards -->
    </div>
  </div>
</section>
```

### Single Featured
```html
<section class="py-20">
  <div class="container mx-auto px-4 max-w-4xl text-center">
    <svg class="w-12 h-12 text-green-600 mx-auto mb-6"><!-- Quote icon --></svg>
    <blockquote class="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
      "Working with Noevu transformed our online presence completely. The strategic 
      approach and attention to detail exceeded all our expectations."
    </blockquote>
    <div class="mt-8">
      <img src="..." class="w-16 h-16 rounded-full mx-auto" />
      <p class="font-semibold mt-4">Michael Johnson</p>
      <p class="text-gray-500">Founder, StartupXYZ</p>
    </div>
  </div>
</section>
```

## Props

```typescript
interface Testimonial {
  quote: string;
  rating?: number; // 1-5
  author: {
    name: string;
    title: string;
    company?: string;
    image?: string;
  };
  featured?: boolean;
}

interface TestimonialsProps {
  title?: string;
  description?: string;
  testimonials: Testimonial[];
  variant: 'grid' | 'carousel' | 'featured' | 'wall';
  columns?: 2 | 3;
  showRating?: boolean;
}
```

## Structured Data

For SEO, testimonials should include Review schema:

```json
{
  "@type": "Review",
  "author": { "@type": "Person", "name": "Jane Smith" },
  "reviewRating": { "@type": "Rating", "ratingValue": "5" },
  "reviewBody": "Excellent work! The team delivered..."
}
```

## Reference

- Related: [social-proof/](../social-proof/) - Compact rating widget
- Related: [quote-block/](../quote-block/) - Inline quote component
