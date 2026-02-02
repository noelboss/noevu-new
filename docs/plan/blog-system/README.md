# Blog System

Documentation for the blog/articles system including post structure, categories, and special features.

## Blog Post Types

| Type | Tag | Purpose | Count |
|------|-----|---------|-------|
| **Portfolio** | `Portfolio` | Case studies, client projects | ~11 |
| **Artikel** | `Artikel` | Educational articles, guides | ~7 |
| **Anleitung** | `Anleitung` | Step-by-step tutorials | ~2 |

---

## Blog Post Structure

### Standard Article Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Category Badge]                                           │
│                                                             │
│  # Main Title (H1)                                          │
│                                                             │
│  [Author] • [Date] • [Reading Time]                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Featured Image - Full Width]                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ## Das Wichtigste in Kürze (Quick Summary)                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ • Key point 1                                         │  │
│  │ • Key point 2                                         │  │
│  │ • Key point 3                                         │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│  STICKY  │  ## Section 1                                    │
│  TABLE   │                                                  │
│  OF      │  Content paragraph...                            │
│  CONTENTS│                                                  │
│          │  ### Subsection                                  │
│  • Intro │                                                  │
│  • Sect1 │  More content...                                 │
│  ● Sect2 │                                                  │
│  • Sect3 │  [Image with caption]                            │
│  • FAQ   │                                                  │
│          │  ## Section 2                                    │
│          │                                                  │
│          │  ...                                             │
│          │                                                  │
├──────────┴──────────────────────────────────────────────────┤
│                                                             │
│  ## Häufige Fragen (FAQ)                                    │
│  [Accordion with JSON-LD]                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Author Box]                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ [Photo]  Noel Bossart                               │    │
│  │          Founder & Lead Designer                     │    │
│  │          [Bio text...]                               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [CTA Section]                                              │
│  "Ready to start your project?"                             │
│  [Contact Button]                                           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Related Posts Carousel]                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Portfolio/Case Study Layout

Additional sections for portfolio posts:

```
┌─────────────────────────────────────────────────────────────┐
│  [Project Hero Image]                                       │
│                                                             │
│  # Client Name: Project Title                               │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ## Projekt Details                                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Kunde:     [Client Name]                              │  │
│  │ Branche:   [Industry]                                 │  │
│  │ Services:  [List of services provided]                │  │
│  │ Website:   [Link to live site]                        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ## Die Herausforderung                                     │
│  [Problem description]                                      │
│                                                             │
│  ## Unsere Lösung                                           │
│  [Solution description with screenshots]                    │
│                                                             │
│  ## Das Ergebnis                                            │
│  [Results, testimonial, metrics]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Special Blog Components

### Sticky Table of Contents

Left-sidebar navigation that follows scroll and highlights current section.

```astro
---
interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface Props {
  items: TOCItem[];
}
---

<nav class="sticky top-24 hidden lg:block w-48 shrink-0">
  <h4 class="text-sm font-semibold text-brand-brown mb-4">Inhalt</h4>
  <ul class="space-y-2 text-sm">
    {items.map((item) => (
      <li>
        <a href={`#${item.id}`} 
           class="text-brand-brown/60 hover:text-brand-green transition-colors
                  data-[active]:text-brand-green data-[active]:font-semibold"
           data-toc-link={item.id}>
          {item.text}
        </a>
      </li>
    ))}
  </ul>
</nav>

<script>
  // Highlight active section on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`[data-toc-link="${entry.target.id}"]`);
      if (entry.isIntersecting) {
        document.querySelectorAll('[data-toc-link]').forEach(l => delete l.dataset.active);
        link?.setAttribute('data-active', '');
      }
    });
  }, { rootMargin: '-20% 0px -80% 0px' });
  
  document.querySelectorAll('h2[id], h3[id]').forEach(h => observer.observe(h));
</script>
```

### Device Mockups

From `blog-imagestyles.less` - displays screenshots in device frames.

#### iPhone Mockup

```html
<div class="iphone-mockup">
  <div class="device-frame">
    <div class="notch"></div>
    <div class="screen scrollable">
      <img src="screenshot.png" alt="App screenshot" />
    </div>
  </div>
  <figcaption>Screenshot caption</figcaption>
</div>
```

```css
.iphone-mockup {
  .device-frame {
    background: #1a1a1a;
    border-radius: 40px;
    padding: 12px;
    position: relative;
    
    .notch {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 28px;
      background: #000;
      border-radius: 20px;
    }
    
    .screen {
      border-radius: 32px;
      overflow: hidden;
      aspect-ratio: 9/19.5;
      
      &.scrollable {
        overflow-y: auto;
      }
    }
  }
}
```

#### Laptop Mockup

```html
<div class="laptop-mockup">
  <div class="screen">
    <div class="content scrollable">
      <img src="full-page.png" alt="Website screenshot" />
    </div>
  </div>
  <div class="base"></div>
</div>
```

### Quick Summary Box

Highlighted box at the start of articles with key takeaways.

```astro
---
interface Props {
  items: string[];
}

const { items } = Astro.props;
---

<aside class="bg-brand-beige rounded-xl p-6 my-8">
  <h2 class="font-heading text-xl text-brand-green mb-4">
    Das Wichtigste in Kürze
  </h2>
  <ul class="space-y-2">
    {items.map((item) => (
      <li class="flex items-start gap-2">
        <span class="material-symbols-outlined text-brand-orange text-lg mt-0.5">
          check_circle
        </span>
        <span class="text-brand-brown">{item}</span>
      </li>
    ))}
  </ul>
</aside>
```

### Reading Time & Last Updated

```astro
---
interface Props {
  publishDate: Date;
  updatedDate?: Date;
  readingTime: number; // minutes
}

const { publishDate, updatedDate, readingTime } = Astro.props;

const formatDate = (date: Date) => 
  date.toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' });
---

<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-brand-brown/60">
  <time datetime={publishDate.toISOString()}>
    {formatDate(publishDate)}
  </time>
  
  {updatedDate && (
    <span class="flex items-center gap-1">
      <span class="material-symbols-outlined text-base">update</span>
      Aktualisiert: {formatDate(updatedDate)}
    </span>
  )}
  
  <span class="flex items-center gap-1">
    <span class="material-symbols-outlined text-base">schedule</span>
    {readingTime} Min. Lesezeit
  </span>
</div>
```

---

## Category System

### Category Types

1. **Topic Categories** - Platform/technology focus
   - Squarespace, WordPress, AI & Künstliche Intelligenz, Notion

2. **Service Categories** - Prefixed with "Service:"
   - Service: Squarespace Website
   - Service: Webdesign
   - Service: KI-Bildwelt
   - etc.

3. **Industry Categories** - Prefixed with "Branche:"
   - Branche: Tourismus & Hotellerie
   - Branche: Handwerker
   - Branche: Startup
   - etc.

### Category Badges

```astro
---
interface Props {
  category: string;
}

const { category } = Astro.props;

const getCategoryColor = (cat: string) => {
  if (cat.startsWith('Service:')) return 'bg-brand-green/10 text-brand-green';
  if (cat.startsWith('Branche:')) return 'bg-brand-orange/10 text-brand-orange';
  if (cat === 'Squarespace') return 'bg-brand-green/10 text-brand-green';
  if (cat.includes('AI') || cat.includes('KI')) return 'bg-purple-100 text-purple-700';
  return 'bg-brand-beige text-brand-brown';
};

const displayName = category.replace(/^(Service:|Branche:)\s*/, '');
---

<span class:list={[
  'inline-block text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded',
  getCategoryColor(category)
]}>
  {displayName}
</span>
```

---

## Blog Listing Page

### Filtering

Filter posts by:
- Category (multi-select)
- Tag (Portfolio, Artikel, Anleitung)
- Search (title, content)

### Sorting

- Newest first (default)
- Oldest first
- Alphabetical

### Layout Options

- Grid (3-4 columns)
- List (full-width cards)

---

## SEO Features

### Structured Data (JSON-LD)

#### Article Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Post title",
  "description": "Post description",
  "image": "featured-image-url",
  "author": {
    "@type": "Person",
    "name": "Noel Bossart",
    "url": "https://noevu.ch/ueber-uns"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Noevu GmbH",
    "logo": {
      "@type": "ImageObject",
      "url": "https://noevu.ch/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-06-20",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://noevu.ch/blog/post-slug"
  }
}
```

#### FAQPage Schema

Automatically generated from FAQ accordion sections.

### Meta Tags

- Unique title with brand suffix
- Description from post excerpt
- Open Graph image (featured image)
- Canonical URL
- hreflang for language variants

---

## Content Migration

### Source Files

- `_reference/blog.json` - All blog posts with full content
- `_reference/html/blog/*.html` - HTML exports for reference

### Migration Steps

1. Parse blog.json for post data
2. Convert HTML content to MDX
3. Extract frontmatter (title, date, categories, etc.)
4. Download and optimize images
5. Create MDX files in `content/blog/`

### Frontmatter Schema

```yaml
---
title: "Post Title"
slug: "post-slug"
description: "Brief description for SEO"
publishDate: 2024-01-15
updatedDate: 2024-06-20
author: "Noel Bossart"
image:
  src: "/images/blog/post-slug/featured.jpg"
  alt: "Featured image description"
tag: "Portfolio" # or "Artikel", "Anleitung"
categories:
  - "Service: Squarespace Website"
  - "Branche: Startup"
# Portfolio-specific
client:
  name: "Client Company"
  industry: "Industry Name"
  website: "https://client-website.ch"
# Optional
quickSummary:
  - "Key point 1"
  - "Key point 2"
faqs:
  - question: "Question 1?"
    answer: "Answer 1..."
---
```

---

## Source Files

- Blog styles: `_reference/src/components/blog/`
- Image styles: `_reference/src/components/blog/post/blog-imagestyles.less`
- Author box: `_reference/src/components/blog/post/author-box.less`
- Blog listing: `_reference/src/components/blog/list/`
