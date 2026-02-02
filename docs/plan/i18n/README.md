# Internationalization (i18n) Strategy

Multi-language support for noevu.ch using Astro's native i18n features.

## Languages

| Language | Code | Status | Priority |
|----------|------|--------|----------|
| German | `de` | Base language | MVP |
| English | `en` | Secondary | MVP |
| Portuguese (Brazil) | `pt-br` | Future | Later |

---

## URL Structure

### Pattern

```
noevu.ch/                     → German (default, no prefix)
noevu.ch/en/                  → English
noevu.ch/pt-br/               → Portuguese (future)
```

### Examples

| German (default) | English |
|------------------|---------|
| `/` | `/en/` |
| `/squarespace-agentur` | `/en/squarespace-agency` |
| `/kontakt` | `/en/contact` |
| `/blog/post-slug` | `/en/blog/post-slug` |
| `/blog/category/squarespace` | `/en/blog/category/squarespace` |

---

## Astro i18n Configuration

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false, // German has no prefix
    },
  },
  // ...
});
```

---

## Content Structure

### File Naming Convention

Content files use language suffix:

```
src/content/
├── blog/
│   ├── my-post.de.mdx      # German version
│   └── my-post.en.mdx      # English version
├── pages/
│   ├── home.de.mdx
│   └── home.en.mdx
└── ...
```

### Alternative: Folder Structure

```
src/content/
├── de/
│   ├── blog/
│   └── pages/
└── en/
    ├── blog/
    └── pages/
```

**Recommendation:** Use file suffix (`.de.mdx`, `.en.mdx`) for easier content management in Tina CMS.

---

## UI Translations

### Translation Files

```
src/i18n/
├── de.json
├── en.json
└── index.ts
```

### de.json

```json
{
  "nav": {
    "home": "Startseite",
    "services": "Leistungen",
    "portfolio": "Projekte",
    "blog": "Blog",
    "about": "Über uns",
    "contact": "Kontakt"
  },
  "common": {
    "readMore": "Mehr lesen",
    "viewAll": "Alle ansehen",
    "learnMore": "Mehr erfahren",
    "getStarted": "Jetzt starten",
    "bookCall": "Termin buchen",
    "sendMessage": "Nachricht senden"
  },
  "blog": {
    "readingTime": "{minutes} Min. Lesezeit",
    "publishedOn": "Veröffentlicht am",
    "updatedOn": "Aktualisiert am",
    "author": "Autor",
    "categories": "Kategorien",
    "relatedPosts": "Ähnliche Beiträge",
    "noPosts": "Keine Beiträge gefunden"
  },
  "contact": {
    "name": "Name",
    "email": "E-Mail",
    "phone": "Telefon",
    "message": "Nachricht",
    "submit": "Absenden",
    "success": "Vielen Dank! Wir melden uns bald.",
    "error": "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
  },
  "footer": {
    "copyright": "© {year} Noevu GmbH. Alle Rechte vorbehalten.",
    "privacy": "Datenschutz",
    "imprint": "Impressum",
    "terms": "AGB",
    "cookieSettings": "Cookie-Einstellungen"
  },
  "errors": {
    "404": {
      "title": "Seite nicht gefunden",
      "description": "Die gesuchte Seite existiert nicht.",
      "backHome": "Zurück zur Startseite"
    }
  }
}
```

### en.json

```json
{
  "nav": {
    "home": "Home",
    "services": "Services",
    "portfolio": "Portfolio",
    "blog": "Blog",
    "about": "About",
    "contact": "Contact"
  },
  "common": {
    "readMore": "Read more",
    "viewAll": "View all",
    "learnMore": "Learn more",
    "getStarted": "Get started",
    "bookCall": "Book a call",
    "sendMessage": "Send message"
  },
  "blog": {
    "readingTime": "{minutes} min read",
    "publishedOn": "Published on",
    "updatedOn": "Updated on",
    "author": "Author",
    "categories": "Categories",
    "relatedPosts": "Related posts",
    "noPosts": "No posts found"
  },
  "contact": {
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "message": "Message",
    "submit": "Submit",
    "success": "Thank you! We'll be in touch soon.",
    "error": "Something went wrong. Please try again."
  },
  "footer": {
    "copyright": "© {year} Noevu GmbH. All rights reserved.",
    "privacy": "Privacy Policy",
    "imprint": "Imprint",
    "terms": "Terms",
    "cookieSettings": "Cookie Settings"
  },
  "errors": {
    "404": {
      "title": "Page not found",
      "description": "The page you're looking for doesn't exist.",
      "backHome": "Back to home"
    }
  }
}
```

### Translation Helper

```typescript
// src/i18n/index.ts
import de from './de.json';
import en from './en.json';

const translations = { de, en } as const;

type Locale = keyof typeof translations;
type TranslationKey = keyof typeof de;

export function useTranslations(locale: Locale) {
  return function t(key: string, params?: Record<string, string | number>) {
    // Get nested key like "nav.home"
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') {
      console.warn(`Missing translation: ${key} for locale ${locale}`);
      return key;
    }
    
    // Replace params like {minutes} with actual values
    if (params) {
      return value.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`));
    }
    
    return value;
  };
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locale === 'en') return 'en';
  return 'de';
}
```

---

## Language Switcher Component

```astro
---
// src/components/LanguageSwitcher.astro
import { getLocaleFromUrl } from '@/i18n';

const currentLocale = getLocaleFromUrl(Astro.url);
const currentPath = Astro.url.pathname;

// Calculate alternate language path
function getAlternatePath(targetLocale: string): string {
  if (currentLocale === 'de') {
    // Going from German to English: add /en/ prefix
    return `/en${currentPath}`;
  } else {
    // Going from English to German: remove /en/ prefix
    return currentPath.replace(/^\/en/, '') || '/';
  }
}
---

<div class="flex items-center gap-2 text-sm">
  <a 
    href={currentLocale === 'de' ? currentPath : getAlternatePath('de')}
    class:list={[
      'px-2 py-1 rounded transition-colors',
      currentLocale === 'de' 
        ? 'bg-brand-green text-white' 
        : 'text-brand-brown hover:bg-brand-beige'
    ]}
    aria-current={currentLocale === 'de' ? 'page' : undefined}
  >
    DE
  </a>
  <span class="text-brand-brown/30">|</span>
  <a 
    href={currentLocale === 'en' ? currentPath : getAlternatePath('en')}
    class:list={[
      'px-2 py-1 rounded transition-colors',
      currentLocale === 'en' 
        ? 'bg-brand-green text-white' 
        : 'text-brand-brown hover:bg-brand-beige'
    ]}
    aria-current={currentLocale === 'en' ? 'page' : undefined}
  >
    EN
  </a>
</div>
```

---

## SEO for Multi-language

### hreflang Tags

```astro
---
// In <head> of each page
const currentLocale = getLocaleFromUrl(Astro.url);
const canonicalUrl = new URL(Astro.url.pathname, Astro.site);
const alternateDeUrl = new URL(Astro.url.pathname.replace(/^\/en/, '') || '/', Astro.site);
const alternateEnUrl = new URL(`/en${Astro.url.pathname.replace(/^\/en/, '')}`, Astro.site);
---

<link rel="canonical" href={canonicalUrl} />
<link rel="alternate" hreflang="de" href={alternateDeUrl} />
<link rel="alternate" hreflang="en" href={alternateEnUrl} />
<link rel="alternate" hreflang="x-default" href={alternateDeUrl} />
```

### HTML lang Attribute

```astro
---
const locale = getLocaleFromUrl(Astro.url);
---
<html lang={locale === 'de' ? 'de-CH' : 'en'}>
```

---

## Content Translation Workflow

### 1. Create German Content First
All content is authored in German as the primary language.

### 2. Translate to English
- Create `.en.mdx` version of the file
- Translate frontmatter (title, description, etc.)
- Translate body content

### 3. Keep Slugs Consistent
Same slug for both languages enables automatic language switching:
- `my-post.de.mdx` → `/blog/my-post`
- `my-post.en.mdx` → `/en/blog/my-post`

### 4. Fallback Strategy
If English translation doesn't exist:
- Option A: Show German version (with language indicator)
- Option B: Redirect to German version
- Option C: Show 404

**Recommendation:** Option B - redirect to German version with notification.

---

## Tina CMS Language Support

### Field Configuration

```typescript
// In Tina collection
{
  type: 'string',
  name: 'language',
  label: 'Language',
  options: [
    { value: 'de', label: 'Deutsch' },
    { value: 'en', label: 'English' },
  ],
  required: true,
}
```

### Filtering by Language

In Tina admin, filter content list by language field for easier management.

---

## Route Mapping

For pages with different slugs per language:

```typescript
// src/i18n/routes.ts
export const routes = {
  de: {
    home: '/',
    contact: '/kontakt',
    about: '/ueber-uns',
    services: '/leistungen',
    portfolio: '/webseiten-projekte',
    blog: '/blog',
  },
  en: {
    home: '/en/',
    contact: '/en/contact',
    about: '/en/about',
    services: '/en/services',
    portfolio: '/en/portfolio',
    blog: '/en/blog',
  },
};

export function getLocalizedPath(key: keyof typeof routes.de, locale: 'de' | 'en'): string {
  return routes[locale][key];
}
```

---

## Implementation Checklist

- [ ] Configure Astro i18n in `astro.config.mjs`
- [ ] Create translation JSON files
- [ ] Implement `useTranslations` helper
- [ ] Create LanguageSwitcher component
- [ ] Add hreflang tags to layout
- [ ] Set up content file naming convention
- [ ] Configure Tina CMS for multi-language
- [ ] Test language switching
- [ ] Implement fallback strategy
- [ ] Add language preference to cookie/localStorage
