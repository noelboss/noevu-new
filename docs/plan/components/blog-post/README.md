# Blog Post Template

Complete blog post/article page layout with all sub-components.

## Screenshots

### Full Header with Categories
![Blog Post Header](./Portfolio%20and%20blog%20post%20header%20-%20with%20main%20industry%20and%20service%20categories.png)

### Entry with TOC and Meta
![Blog Entry](./Portfolio%20and%20blog%20entry%20with%20category%2C%20tags%2C%20title%20and%20subtitle%2C%20author%2C%20and%20table%20of%20content.png)

### Author Header
![Author Header](./blog%20post%20header%20author.png)

### Table of Contents & Social Sharing
![TOC and Social](./Blog%20post%20table%20of%20content%20and%20social%20sharing%20icons.png)

### Call to Action Section
![CTA Section](./Blog%20post%20call%20to%20action%20section.png)

### Footer with Author & Navigation
![Post Footer](./Blog%20post%20footer%20with%20author%20information%20and%20navigation.png)

---

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  [Top Bar - Announcement]                                   │
│  [Header Navigation]                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Category Badges]  Branche: Industry | Service: Type       │
│                                                             │
│  # Article Title (H1)                                       │
│  Subtitle / Lead text                                       │
│                                                             │
│  [Author Avatar] Author Name • Date • Reading Time          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Featured Image - Full Width]                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ## Das Wichtigste in Kürze                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ • Key takeaway 1                                    │    │
│  │ • Key takeaway 2                                    │    │
│  │ • Key takeaway 3                                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│  STICKY  │  ## Section Heading                              │
│  SIDEBAR │                                                  │
│          │  Article content...                              │
│  ┌─────┐ │                                                  │
│  │ TOC │ │  [Images, quotes, lists...]                      │
│  │     │ │                                                  │
│  │•Sec1│ │  ## Another Section                              │
│  │•Sec2│ │                                                  │
│  │•Sec3│ │  More content...                                 │
│  └─────┘ │                                                  │
│          │                                                  │
│  ┌─────┐ │                                                  │
│  │Share│ │                                                  │
│  │Icons│ │                                                  │
│  └─────┘ │                                                  │
│          │                                                  │
├──────────┴──────────────────────────────────────────────────┤
│                                                             │
│  ## Häufige Fragen (FAQ)                                    │
│  [Accordion Component]                                      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [CTA Section - Contact Form + Testimonial]                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Author Box]                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ [Large Photo]  Noel Bossart                         │    │
│  │                Founder & Lead Designer               │    │
│  │                [Bio text...]                         │    │
│  │                [LinkedIn] [Email] [Calendar]         │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Post Navigation]                                          │
│  ← Previous Post          Next Post →                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Related Posts Carousel]                                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [Footer]                                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Sub-Components

### 1. Category Header

Displays primary category badges (Industry + Service).

```astro
---
interface Props {
  categories: string[];
}

const { categories } = Astro.props;

// Separate industry and service categories
const industry = categories.find(c => c.startsWith('Branche:'));
const service = categories.find(c => c.startsWith('Service:'));
---

<div class="flex flex-wrap gap-2 mb-4">
  {industry && (
    <span class="px-3 py-1 bg-brand-orange/10 text-brand-orange text-sm font-medium rounded-full">
      {industry.replace('Branche:', '').trim()}
    </span>
  )}
  {service && (
    <span class="px-3 py-1 bg-brand-green/10 text-brand-green text-sm font-medium rounded-full">
      {service.replace('Service:', '').trim()}
    </span>
  )}
</div>
```

### 2. Post Meta (Author, Date, Reading Time)

```astro
---
interface Props {
  author: {
    name: string;
    avatar: string;
  };
  publishDate: Date;
  readingTime: number;
}

const { author, publishDate, readingTime } = Astro.props;
---

<div class="flex items-center gap-4 text-sm text-brand-brown/70">
  <img 
    src={author.avatar} 
    alt={author.name}
    class="w-10 h-10 rounded-full object-cover"
  />
  <div class="flex items-center gap-2 flex-wrap">
    <span class="font-medium text-brand-brown">{author.name}</span>
    <span>•</span>
    <time datetime={publishDate.toISOString()}>
      {publishDate.toLocaleDateString('de-CH', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })}
    </time>
    <span>•</span>
    <span>{readingTime} Min. Lesezeit</span>
  </div>
</div>
```

### 3. Sticky Table of Contents

Left sidebar navigation with scroll spy.

```astro
---
interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface Props {
  items: TOCItem[];
}

const { items } = Astro.props;
---

<aside class="sticky top-24 w-56 shrink-0 hidden lg:block">
  <nav class="space-y-1">
    <h4 class="text-xs uppercase tracking-wider text-brand-brown/50 mb-3">
      Inhalt
    </h4>
    {items.map((item) => (
      <a 
        href={`#${item.id}`}
        class:list={[
          'block py-1 text-sm transition-colors hover:text-brand-green',
          'data-[active]:text-brand-green data-[active]:font-medium',
          item.level === 3 && 'pl-4 text-brand-brown/60'
        ]}
        data-toc-item={item.id}
      >
        {item.text}
      </a>
    ))}
  </nav>
  
  <!-- Social sharing -->
  <div class="mt-8 pt-6 border-t border-brand-beige">
    <h4 class="text-xs uppercase tracking-wider text-brand-brown/50 mb-3">
      Teilen
    </h4>
    <div class="flex gap-2">
      <a href="#" class="p-2 rounded-full bg-brand-beige hover:bg-brand-green hover:text-white transition-colors">
        <Icon name="share" size="sm" />
      </a>
      <a href="#" class="p-2 rounded-full bg-brand-beige hover:bg-[#0077b5] hover:text-white transition-colors">
        <Icon name="linkedin" size="sm" />
      </a>
      <a href="#" class="p-2 rounded-full bg-brand-beige hover:bg-[#1877f2] hover:text-white transition-colors">
        <Icon name="facebook" size="sm" />
      </a>
    </div>
  </div>
</aside>

<script>
  // Scroll spy for TOC highlighting
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const tocItem = document.querySelector(`[data-toc-item="${entry.target.id}"]`);
      if (entry.isIntersecting) {
        document.querySelectorAll('[data-toc-item]').forEach(el => {
          delete el.dataset.active;
        });
        tocItem?.setAttribute('data-active', '');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  document.querySelectorAll('h2[id], h3[id]').forEach(heading => {
    observer.observe(heading);
  });
</script>
```

### 4. Author Box

Full author bio section at end of post.

```astro
---
interface Props {
  author: {
    name: string;
    title: string;
    avatar: string;
    bio: string;
    linkedin?: string;
    email?: string;
    calendar?: string;
  };
}

const { author } = Astro.props;
---

<section class="bg-brand-beige rounded-2xl p-8 my-12">
  <div class="flex flex-col md:flex-row gap-6">
    <img 
      src={author.avatar}
      alt={author.name}
      class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
    />
    <div class="flex-1">
      <h3 class="font-heading text-2xl text-brand-green mb-1">
        {author.name}
      </h3>
      <p class="text-brand-brown/70 mb-4">{author.title}</p>
      <div class="prose prose-sm text-brand-brown/80" set:html={author.bio} />
      
      <div class="flex flex-wrap gap-3 mt-4">
        {author.linkedin && (
          <a href={author.linkedin} class="inline-flex items-center gap-1 text-sm text-brand-green hover:underline">
            <Icon name="link" size="sm" /> LinkedIn
          </a>
        )}
        {author.email && (
          <a href={`mailto:${author.email}`} class="inline-flex items-center gap-1 text-sm text-brand-green hover:underline">
            <Icon name="email" size="sm" /> E-Mail
          </a>
        )}
        {author.calendar && (
          <a href={author.calendar} class="inline-flex items-center gap-1 text-sm text-brand-green hover:underline">
            <Icon name="calendar_today" size="sm" /> Termin buchen
          </a>
        )}
      </div>
    </div>
  </div>
</section>
```

### 5. Post Navigation

Previous/Next post links.

```astro
---
interface Props {
  prev?: { title: string; slug: string };
  next?: { title: string; slug: string };
}

const { prev, next } = Astro.props;
---

<nav class="flex justify-between items-center py-8 border-t border-brand-beige">
  {prev ? (
    <a href={`/blog/${prev.slug}`} class="group flex items-center gap-2 text-brand-brown hover:text-brand-green">
      <Icon name="arrow_back" class="group-hover:-translate-x-1 transition-transform" />
      <div class="text-right">
        <span class="text-xs uppercase tracking-wider text-brand-brown/50">Vorheriger</span>
        <p class="font-medium line-clamp-1">{prev.title}</p>
      </div>
    </a>
  ) : <div />}
  
  {next ? (
    <a href={`/blog/${next.slug}`} class="group flex items-center gap-2 text-brand-brown hover:text-brand-green text-right">
      <div>
        <span class="text-xs uppercase tracking-wider text-brand-brown/50">Nächster</span>
        <p class="font-medium line-clamp-1">{next.title}</p>
      </div>
      <Icon name="arrow_forward" class="group-hover:translate-x-1 transition-transform" />
    </a>
  ) : <div />}
</nav>
```

---

## Layout Implementation

```astro
---
// layouts/BlogPostLayout.astro
import BaseLayout from './BaseLayout.astro';
import CategoryHeader from '@/components/blog/CategoryHeader.astro';
import PostMeta from '@/components/blog/PostMeta.astro';
import TableOfContents from '@/components/blog/TableOfContents.astro';
import QuickSummary from '@/components/blog/QuickSummary.astro';
import AuthorBox from '@/components/blog/AuthorBox.astro';
import PostNavigation from '@/components/blog/PostNavigation.astro';
import FAQ from '@/components/FAQ.astro';
import CTA from '@/components/sections/CTA.astro';
import RelatedPosts from '@/components/blog/RelatedPosts.astro';

const { frontmatter, headings } = Astro.props;
---

<BaseLayout title={frontmatter.title} description={frontmatter.description}>
  <article>
    <!-- Header -->
    <header class="container max-w-4xl py-12">
      <CategoryHeader categories={frontmatter.categories} />
      
      <h1 class="font-heading text-4xl lg:text-5xl text-brand-green mb-4">
        {frontmatter.title}
      </h1>
      
      {frontmatter.subtitle && (
        <p class="text-xl text-brand-brown/80 mb-6">{frontmatter.subtitle}</p>
      )}
      
      <PostMeta 
        author={frontmatter.author}
        publishDate={frontmatter.publishDate}
        readingTime={frontmatter.readingTime}
      />
    </header>
    
    <!-- Featured Image -->
    {frontmatter.image && (
      <div class="w-full aspect-video mb-12">
        <img 
          src={frontmatter.image.src}
          alt={frontmatter.image.alt}
          class="w-full h-full object-cover"
        />
      </div>
    )}
    
    <!-- Main Content with Sidebar -->
    <div class="container">
      <div class="flex gap-12">
        <!-- Sidebar (TOC + Social) -->
        <TableOfContents items={headings} />
        
        <!-- Content -->
        <div class="flex-1 max-w-3xl">
          {frontmatter.quickSummary && (
            <QuickSummary items={frontmatter.quickSummary} />
          )}
          
          <div class="prose prose-lg">
            <slot />
          </div>
          
          {frontmatter.faqs && (
            <FAQ items={frontmatter.faqs} />
          )}
        </div>
      </div>
    </div>
    
    <!-- CTA Section -->
    <CTA />
    
    <!-- Author Box -->
    <div class="container max-w-4xl">
      <AuthorBox author={frontmatter.author} />
      <PostNavigation prev={frontmatter.prev} next={frontmatter.next} />
    </div>
    
    <!-- Related Posts -->
    <RelatedPosts posts={frontmatter.relatedPosts} />
  </article>
</BaseLayout>
```

---

## Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| TOC Sidebar | Hidden | Sticky left sidebar |
| Social Icons | Bottom of post | In sidebar |
| Author Box | Stacked | Side-by-side |
| Navigation | Full width | Side-by-side |

---

## Related Components

- [Accordion (FAQ)](../accordion/README.md)
- [CTA Section](../cta/README.md)
- [Blog List](../blog-list/README.md)
- [Device Mockups](../device-mockups/README.md)
