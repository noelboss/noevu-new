# Blog List (Swiper Cards)

A horizontal scrollable carousel of blog post cards, typically used on the homepage or at the end of pages to showcase recent articles and case studies.

## Screenshot

![Blog List with Swiper](./x11%20Blog%20section%20with%20swiper%20cards.png)

## Purpose

- Showcase recent blog posts/articles
- Display portfolio items and case studies
- Encourage content discovery
- Drive traffic to blog section

## Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  [Section Title]                          [View All →]          │
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐            │
│  │ ░░░░░░░ │  │ ░░░░░░░ │  │ ░░░░░░░ │  │ ░░░░░░░ │  → scroll  │
│  │ ░Image░ │  │ ░Image░ │  │ ░Image░ │  │ ░Image░ │            │
│  │ ░░░░░░░ │  │ ░░░░░░░ │  │ ░░░░░░░ │  │ ░░░░░░░ │            │
│  ├─────────┤  ├─────────┤  ├─────────┤  ├─────────┤            │
│  │Category │  │Category │  │Category │  │Category │            │
│  │Title    │  │Title    │  │Title    │  │Title    │            │
│  │Date     │  │Date     │  │Date     │  │Date     │            │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘            │
│                                                                 │
│            ○ ○ ● ○ ○  (pagination dots)                         │
└─────────────────────────────────────────────────────────────────┘
```

## Design Details

### Card Design
- Vertical card layout
- Featured image at top (16:9 or square aspect ratio)
- Rounded corners (10px)
- Subtle shadow on hover
- Content padding below image

### Card Content
- Category tag (small, colored badge)
- Post title (heading font, 2-3 lines max)
- Date or reading time
- Optional excerpt

### Carousel Behavior
- Horizontal scroll with snap points
- 3-4 cards visible on desktop
- 1.5-2 cards visible on mobile (peek effect)
- Optional navigation arrows
- Pagination dots below

### Spacing
- Gap between cards: 16-24px
- Section padding: standard
- Overflow visible for peek effect

## Tailwind Implementation

```astro
---
interface BlogPost {
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  excerpt?: string;
}

interface Props {
  title?: string;
  posts: BlogPost[];
  viewAllHref?: string;
}

const { title = "Aktuelle Beiträge", posts, viewAllHref = "/blog" } = Astro.props;
---

<section class="py-16 lg:py-24 bg-white overflow-hidden">
  <div class="container">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-heading text-3xl lg:text-4xl text-brand-green">
        {title}
      </h2>
      <a href={viewAllHref} 
         class="hidden sm:flex items-center gap-1 text-brand-green font-semibold hover:underline">
        Alle ansehen
        <span class="material-symbols-outlined text-base">arrow_forward</span>
      </a>
    </div>
    
    <!-- Carousel -->
    <div class="blog-carousel flex gap-6 overflow-x-auto snap-x snap-mandatory 
                scrollbar-hide pb-4 -mx-4 px-4 lg:-mx-0 lg:px-0">
      {posts.map((post) => (
        <a href={`/blog/${post.slug}`} 
           class="blog-card flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[calc(25%-18px)]
                  snap-start group">
          <article class="bg-white rounded-xl overflow-hidden shadow-card 
                         hover:shadow-elevated transition-shadow">
            <!-- Image -->
            <div class="aspect-video overflow-hidden">
              <img src={post.image} 
                   alt={post.title}
                   class="w-full h-full object-cover group-hover:scale-105 
                          transition-transform duration-300" />
            </div>
            
            <!-- Content -->
            <div class="p-5">
              <span class="inline-block text-xs font-semibold uppercase tracking-wider 
                          text-brand-green bg-brand-green/10 px-2 py-1 rounded mb-3">
                {post.category}
              </span>
              
              <h3 class="font-heading text-lg text-brand-brown line-clamp-2 mb-2
                        group-hover:text-brand-green transition-colors">
                {post.title}
              </h3>
              
              <time class="text-sm text-brand-brown/60">
                {post.date}
              </time>
            </div>
          </article>
        </a>
      ))}
    </div>
    
    <!-- Mobile View All -->
    <div class="mt-6 text-center sm:hidden">
      <a href={viewAllHref} class="btn-secondary">
        Alle Beiträge ansehen
      </a>
    </div>
  </div>
</section>

<style>
  /* Hide scrollbar */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Line clamp for title */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
```

## Props

```typescript
interface BlogListProps {
  title?: string;
  posts: BlogPost[];
  viewAllHref?: string;
  variant?: 'carousel' | 'grid';  // Layout type
  showExcerpt?: boolean;
  showDate?: boolean;
  maxPosts?: number;              // Limit displayed posts
}

interface BlogPost {
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  excerpt?: string;
  readingTime?: string;
  tag?: 'Portfolio' | 'Artikel' | 'Anleitung';
}
```

## Variants

### 1. Carousel (Default)
- Horizontal scroll
- Best for 4+ posts
- Mobile-friendly swipe

### 2. Grid
- Static 2-4 column grid
- Better for exactly 3-4 posts
- No scrolling needed

### 3. Featured + List
- One large featured card
- Smaller cards in list below

## Category Badges

| Category | Color |
|----------|-------|
| Squarespace | Green background |
| AI & KI | Orange background |
| WordPress | Blue background |
| Portfolio | Beige background |
| Artikel | Gray background |

## Responsive Behavior

| Breakpoint | Cards Visible | Card Width |
|------------|---------------|------------|
| Mobile | 1.2 | 280px |
| Tablet | 2.5 | 320px |
| Desktop | 4 | 25% - gap |

## Optional Enhancements

### Navigation Arrows
```html
<button class="carousel-prev">←</button>
<button class="carousel-next">→</button>
```

### Pagination Dots
```html
<div class="flex gap-2 justify-center mt-4">
  {posts.map((_, i) => (
    <button class="w-2 h-2 rounded-full bg-brand-green/30 
                   data-[active]:bg-brand-green" />
  ))}
</div>
```

## Usage Context

- Homepage "Latest Articles" section
- Service pages "Related Case Studies"
- Blog category pages
- Author pages
