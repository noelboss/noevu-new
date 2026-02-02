# Accordion (FAQ Section)

An expandable accordion component used primarily for FAQ sections. Features smooth expand/collapse animations with icon indicators.

## Screenshot

![FAQ Section](./x12%20FAQ%20Section.png)

## Purpose

- Display frequently asked questions
- Reduce page length by collapsing content
- Improve scannability of long content
- Provide structured data for SEO (FAQPage schema)

## Structure

```
┌─────────────────────────────────────────────────────┐
│  [Section Title: "Häufige Fragen"]                  │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Question 1                              [+]  │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Question 2 (expanded)                   [-]  │  │
│  │  ─────────────────────────────────────────    │  │
│  │  Answer text goes here with full              │  │
│  │  explanation and details...                   │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │  Question 3                              [+]  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Design Details

### Accordion Item
- Full-width clickable header
- Question text in semi-bold body font
- Plus/minus icon or chevron on right
- Subtle background or border separation
- Rounded corners (10px)

### Expanded State
- Answer revealed with slide-down animation
- Icon rotates or changes to minus
- Optional divider between question and answer

### Spacing
- Gap between items: 12-16px
- Padding inside items: 16-24px
- Answer text has top padding when expanded

### Colors
- Background: White or light beige
- Text: Brand brown
- Icon: Brand green
- Border: Light gray or none

## Tailwind Implementation

```astro
---
interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  title?: string;
  items: FAQItem[];
}

const { title = "Häufige Fragen", items } = Astro.props;
---

<section class="py-16 lg:py-24 bg-brand-beige">
  <div class="container max-w-3xl">
    <h2 class="font-heading text-3xl lg:text-4xl text-brand-green text-center mb-12">
      {title}
    </h2>
    
    <div class="space-y-4">
      {items.map((item, index) => (
        <details class="group bg-white rounded-xl shadow-card" data-faq-item>
          <summary class="flex items-center justify-between p-6 cursor-pointer 
                         list-none font-semibold text-brand-brown
                         hover:bg-brand-beige/30 transition-colors rounded-xl">
            <span>{item.question}</span>
            <span class="material-symbols-outlined text-brand-green 
                        transition-transform duration-300 group-open:rotate-45">
              add
            </span>
          </summary>
          
          <div class="px-6 pb-6 text-brand-brown/80 animate-accordion-down">
            <div class="pt-4 border-t border-brand-beige">
              <Fragment set:html={item.answer} />
            </div>
          </div>
        </details>
      ))}
    </div>
  </div>
</section>

<!-- JSON-LD for SEO -->
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": items.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
})} />

<style>
  /* Hide default marker */
  details summary::-webkit-details-marker {
    display: none;
  }
  
  /* Animation */
  @keyframes accordion-down {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-accordion-down {
    animation: accordion-down 0.2s ease-out;
  }
</style>
```

## Props

```typescript
interface AccordionProps {
  title?: string;
  items: FAQItem[];
  allowMultiple?: boolean;  // Allow multiple open (default: true)
  defaultOpen?: number;     // Index of initially open item
  theme?: 'white' | 'beige';
}

interface FAQItem {
  question: string;
  answer: string;           // Can include HTML
}
```

## Accessibility

- Uses native `<details>` and `<summary>` elements
- Keyboard navigable (Enter/Space to toggle)
- Screen reader friendly
- Focus states visible

## SEO (FAQPage Schema)

The component automatically generates JSON-LD structured data:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text..."
      }
    }
  ]
}
```

## Variants

1. **Default** - White cards on beige background
2. **Bordered** - Border instead of shadow
3. **Minimal** - No cards, just dividers
4. **Numbered** - With step numbers

## Animation Options

### CSS-only (using `<details>`)
- Simple show/hide with no animation
- Rotate icon on open

### Enhanced (JavaScript)
- Smooth height animation
- Staggered opening
- Single-open mode (close others when one opens)

## Usage Context

- FAQ sections on service pages
- Product detail pages
- Help/support pages
- Terms and conditions
