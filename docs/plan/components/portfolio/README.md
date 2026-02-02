# Portfolio Components

Components for displaying portfolio/case study content.

## Screenshots

### Portfolio Overview with Filter
![Portfolio Overview](./Portfolio%20overview%20with%20filter.png)

### Portfolio Entry Characteristics
![Portfolio Characteristics](./Portfolio%20entry%20characteristics%20(Client%20project%20and%20%20special%20features%3D.png)

---

## Overview

Portfolio pages showcase client work/case studies. The system consists of:
1. **Portfolio List** - Filterable grid of portfolio entries
2. **Portfolio Entry** - Individual case study page (uses Blog Post layout with additions)

---

## 1. Portfolio List Page

### Structure

```
┌─────────────────────────────────────────────────────────────┐
│  [Header Navigation]                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  # Webseiten Projekte                                       │
│  Subtitle description text                                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Filter Bar]                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Alle │ Tourismus │ Startup │ Gesundheit │ Handwerk  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Portfolio Grid - 2-3 columns]                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   [Image]    │  │   [Image]    │  │   [Image]    │       │
│  │              │  │              │  │              │       │
│  │  Industry    │  │  Industry    │  │  Industry    │       │
│  │  Title       │  │  Title       │  │  Title       │       │
│  │  Description │  │  Description │  │  Description │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   ...        │  │   ...        │  │   ...        │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [Footer]                                                   │
└─────────────────────────────────────────────────────────────┘
```

### Filter Component

Horizontal category filter for portfolio items.

```astro
---
interface Props {
  categories: string[];
  activeCategory?: string;
}

const { categories, activeCategory = 'all' } = Astro.props;
---

<div class="flex flex-wrap gap-2 mb-8">
  <button 
    class:list={[
      'px-4 py-2 rounded-full text-sm font-medium transition-colors',
      activeCategory === 'all' 
        ? 'bg-brand-green text-white' 
        : 'bg-brand-beige text-brand-brown hover:bg-brand-green/10'
    ]}
    data-filter="all"
  >
    Alle
  </button>
  
  {categories.map((category) => (
    <button 
      class:list={[
        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
        activeCategory === category 
          ? 'bg-brand-green text-white' 
          : 'bg-brand-beige text-brand-brown hover:bg-brand-green/10'
      ]}
      data-filter={category}
    >
      {category.replace('Branche:', '').trim()}
    </button>
  ))}
</div>

<script>
  const buttons = document.querySelectorAll('[data-filter]');
  const items = document.querySelectorAll('[data-category]');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button
      buttons.forEach(b => {
        b.classList.remove('bg-brand-green', 'text-white');
        b.classList.add('bg-brand-beige', 'text-brand-brown');
      });
      button.classList.remove('bg-brand-beige', 'text-brand-brown');
      button.classList.add('bg-brand-green', 'text-white');
      
      // Filter items
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category?.includes(filter)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
</script>
```

### Portfolio Card

Individual portfolio item in the grid.

```astro
---
interface Props {
  title: string;
  description: string;
  image: string;
  industry: string;
  slug: string;
}

const { title, description, image, industry, slug } = Astro.props;
---

<a 
  href={`/webseiten-projekte/${slug}`}
  class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
  data-category={industry}
>
  <div class="aspect-[4/3] overflow-hidden">
    <img 
      src={image}
      alt={title}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  
  <div class="p-6">
    <span class="text-xs uppercase tracking-wider text-brand-orange font-medium">
      {industry.replace('Branche:', '').trim()}
    </span>
    
    <h3 class="font-heading text-xl text-brand-green mt-2 group-hover:text-brand-green/80">
      {title}
    </h3>
    
    <p class="text-brand-brown/70 mt-2 line-clamp-2">
      {description}
    </p>
  </div>
</a>
```

---

## 2. Portfolio Entry Page

Portfolio entries use the **Blog Post Layout** with additional portfolio-specific sections.

### Additional Sections

#### Client Info Block

Displayed near the top of the post, shows project metadata.

```astro
---
interface Props {
  client: {
    name: string;
    industry: string;
    website?: string;
  };
}

const { client } = Astro.props;
---

<div class="bg-brand-beige/50 rounded-xl p-6 mb-8">
  <h4 class="text-xs uppercase tracking-wider text-brand-brown/50 mb-4">
    Kundenprojekt
  </h4>
  
  <dl class="grid grid-cols-2 gap-4 text-sm">
    <div>
      <dt class="text-brand-brown/60">Kunde</dt>
      <dd class="font-medium text-brand-brown">{client.name}</dd>
    </div>
    
    <div>
      <dt class="text-brand-brown/60">Branche</dt>
      <dd class="font-medium text-brand-brown">
        {client.industry.replace('Branche:', '').trim()}
      </dd>
    </div>
    
    {client.website && (
      <div class="col-span-2">
        <dt class="text-brand-brown/60">Website</dt>
        <dd>
          <a 
            href={client.website}
            target="_blank"
            rel="noopener"
            class="text-brand-green hover:underline inline-flex items-center gap-1"
          >
            {new URL(client.website).hostname}
            <span class="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </dd>
      </div>
    )}
  </dl>
</div>
```

#### Special Features List

Highlights key project achievements/features.

```astro
---
interface Props {
  features: string[];
}

const { features } = Astro.props;
---

<div class="bg-brand-green/5 rounded-xl p-6 my-8">
  <h4 class="font-heading text-lg text-brand-green mb-4 flex items-center gap-2">
    <span class="material-symbols-outlined">stars</span>
    Besondere Merkmale
  </h4>
  
  <ul class="space-y-3">
    {features.map((feature) => (
      <li class="flex items-start gap-3">
        <span class="material-symbols-outlined text-brand-orange mt-0.5">
          check_circle
        </span>
        <span class="text-brand-brown">{feature}</span>
      </li>
    ))}
  </ul>
</div>
```

### Portfolio Entry Structure

```
┌─────────────────────────────────────────────────────────────┐
│  [Header - Same as Blog Post]                               │
│  Category Badges (Industry + Service)                       │
│  H1 Title                                                   │
│  Author, Date, Reading Time                                 │
├─────────────────────────────────────────────────────────────┤
│  [Featured Image]                                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Client Info Block] ← Portfolio-specific                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Kundenprojekt                                       │    │
│  │ Kunde: Company Name                                 │    │
│  │ Branche: Industry                                   │    │
│  │ Website: example.com ↗                              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
├──────────┬──────────────────────────────────────────────────┤
│  TOC     │  Content (same as blog)                          │
│  Sidebar │                                                  │
│          │  [Special Features Block] ← Portfolio-specific   │
│          │  ┌─────────────────────────────────────────┐     │
│          │  │ ⭐ Besondere Merkmale                   │     │
│          │  │ ✓ Feature 1                             │     │
│          │  │ ✓ Feature 2                             │     │
│          │  │ ✓ Feature 3                             │     │
│          │  └─────────────────────────────────────────┘     │
│          │                                                  │
│          │  [Device Mockups - Screenshots]                  │
│          │                                                  │
├──────────┴──────────────────────────────────────────────────┤
│  [Rest - Same as Blog Post: FAQ, CTA, Author, Nav]          │
└─────────────────────────────────────────────────────────────┘
```

---

## Content Schema

Portfolio entries extend the blog schema:

```typescript
// In content/config.ts
const portfolioSchema = blogSchema.extend({
  // Tag is always "Portfolio"
  tag: z.literal('Portfolio'),
  
  // Client info (required for portfolio)
  client: z.object({
    name: z.string(),
    industry: z.string(),
    website: z.string().url().optional(),
  }),
  
  // Special features list
  specialFeatures: z.array(z.string()).default([]),
});
```

---

## Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| Filter Bar | Horizontal scroll | Wrap to multiple lines |
| Portfolio Grid | 1 column | 2-3 columns |
| Client Info | Full width | Full width |
| Features List | Full width | Full width |

---

## Related Components

- [Blog Post](../blog-post/README.md) - Base layout used for portfolio entries
- [Blog List](../blog-list/README.md) - Similar grid layout
- [Device Mockups](../device-mockups/README.md) - Used in portfolio content
- [Filter](../filter/README.md) - Reusable filter component
