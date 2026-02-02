# Cookie Banner / Consent Manager

A GDPR-compliant cookie consent overlay with category toggles. Appears on first visit and can be reopened from footer link.

## Screenshot

![Cookie Settings Overlay](./x13.1%20CoolKey%20settings%20overlay.png)

## Purpose

- GDPR/Swiss data protection compliance
- Allow users to control cookie preferences
- Provide transparency about data collection
- Integrate with analytics and marketing tools

## Structure

```
┌─────────────────────────────────────────────────────┐
│                                              [×]    │
│                                                     │
│  Cookie-Einstellungen                               │
│                                                     │
│  [Description text about cookies...]                │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  ✓  Notwendig                    [Always On]│    │
│  │     Required for site function              │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  ○  Statistik                    [Toggle]   │    │
│  │     Analytics and performance               │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  ○  Marketing                    [Toggle]   │    │
│  │     Advertising and tracking                │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  [Alle akzeptieren]  [Auswahl speichern]           │
│                                                     │
│  [Links: Impressum | Datenschutz]                   │
└─────────────────────────────────────────────────────┘
```

## Design Details

### Overlay
- Centered modal on desktop
- Bottom sheet on mobile
- Dark semi-transparent backdrop
- White background with rounded corners
- Max-width ~500px

### Category Toggles
- List of cookie categories
- Each with title, description, toggle
- "Necessary" always on, disabled toggle
- Custom toggle switch design

### Buttons
- Primary: "Accept All" (prominent)
- Secondary: "Save Selection"
- Optional: "Reject All" (text link)

### Colors
- Background: White
- Text: Brand brown
- Toggles: Brand green when active
- Accent: Brand orange for primary CTA

## Tailwind Implementation

```astro
---
interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required?: boolean;
}

interface Props {
  categories: CookieCategory[];
}

const { categories } = Astro.props;

const defaultCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Notwendig',
    description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich.',
    required: true,
  },
  {
    id: 'statistics',
    name: 'Statistik',
    description: 'Helfen uns zu verstehen, wie Besucher mit der Website interagieren.',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Werden verwendet, um Besuchern relevante Werbung anzuzeigen.',
  },
];
---

<!-- Backdrop -->
<div id="cookie-banner" 
     class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm 
            flex items-center justify-center p-4
            hidden" 
     data-cookie-banner>
  
  <!-- Modal -->
  <div class="bg-white rounded-2xl shadow-elevated max-w-lg w-full 
              max-h-[90vh] overflow-y-auto">
    
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-brand-beige">
      <h2 class="font-heading text-2xl text-brand-green">
        Cookie-Einstellungen
      </h2>
      <button class="text-brand-brown/50 hover:text-brand-brown" 
              data-cookie-close>
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    
    <!-- Content -->
    <div class="p-6">
      <p class="text-brand-brown/80 mb-6">
        Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer 
        Website zu bieten. Sie können Ihre Einstellungen jederzeit anpassen.
      </p>
      
      <!-- Categories -->
      <div class="space-y-4">
        {(categories || defaultCategories).map((category) => (
          <div class="flex items-start justify-between p-4 bg-brand-beige/30 rounded-xl">
            <div class="flex-1 pr-4">
              <h3 class="font-semibold text-brand-brown">{category.name}</h3>
              <p class="text-sm text-brand-brown/70 mt-1">{category.description}</p>
            </div>
            
            {category.required ? (
              <div class="text-sm text-brand-green font-medium">Immer aktiv</div>
            ) : (
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" 
                       name={`cookie-${category.id}`}
                       class="sr-only peer" />
                <div class="w-11 h-6 bg-brand-brown/20 rounded-full 
                           peer-checked:bg-brand-green
                           after:content-[''] after:absolute after:top-0.5 after:left-0.5
                           after:bg-white after:rounded-full after:h-5 after:w-5
                           after:transition-transform peer-checked:after:translate-x-5">
                </div>
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
    
    <!-- Footer -->
    <div class="p-6 border-t border-brand-beige space-y-4">
      <div class="flex flex-col sm:flex-row gap-3">
        <button class="btn-primary flex-1" data-cookie-accept-all>
          Alle akzeptieren
        </button>
        <button class="btn-secondary flex-1" data-cookie-save>
          Auswahl speichern
        </button>
      </div>
      
      <div class="flex justify-center gap-4 text-sm text-brand-brown/60">
        <a href="/impressum" class="hover:underline">Impressum</a>
        <a href="/datenschutz" class="hover:underline">Datenschutz</a>
      </div>
    </div>
  </div>
</div>

<script>
  const banner = document.querySelector('[data-cookie-banner]');
  const closeBtn = document.querySelector('[data-cookie-close]');
  const acceptAllBtn = document.querySelector('[data-cookie-accept-all]');
  const saveBtn = document.querySelector('[data-cookie-save]');
  
  // Check if consent already given
  if (!localStorage.getItem('cookie-consent')) {
    banner?.classList.remove('hidden');
  }
  
  function hideBanner() {
    banner?.classList.add('hidden');
  }
  
  function saveConsent(all = false) {
    const consent = { necessary: true };
    
    if (all) {
      consent.statistics = true;
      consent.marketing = true;
    } else {
      document.querySelectorAll('[name^="cookie-"]').forEach((input) => {
        const key = input.name.replace('cookie-', '');
        consent[key] = input.checked;
      });
    }
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    hideBanner();
    
    // Trigger consent event for analytics
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: consent }));
  }
  
  closeBtn?.addEventListener('click', hideBanner);
  acceptAllBtn?.addEventListener('click', () => saveConsent(true));
  saveBtn?.addEventListener('click', () => saveConsent(false));
  
  // Reopen from footer link
  document.querySelector('[data-cookie-settings]')?.addEventListener('click', (e) => {
    e.preventDefault();
    banner?.classList.remove('hidden');
  });
</script>
```

## Props

```typescript
interface CookieBannerProps {
  categories?: CookieCategory[];
  privacyUrl?: string;
  imprintUrl?: string;
}

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required?: boolean;     // Always on, can't be disabled
  defaultEnabled?: boolean;
}
```

## Cookie Categories

| Category | ID | Required | Purpose |
|----------|-----|----------|---------|
| Necessary | `necessary` | Yes | Session, security, CSRF |
| Statistics | `statistics` | No | Google Analytics, etc. |
| Marketing | `marketing` | No | Facebook Pixel, ads |
| Preferences | `preferences` | No | Language, theme |

## Integration with Analytics

```javascript
// Listen for consent changes
window.addEventListener('cookie-consent', (e) => {
  const consent = e.detail;
  
  if (consent.statistics) {
    // Initialize Google Analytics
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  }
  
  if (consent.marketing) {
    // Initialize Facebook Pixel, etc.
  }
});
```

## Footer Trigger

Add to footer:
```html
<a href="#" data-cookie-settings>Cookie-Einstellungen</a>
```

## Accessibility

- Focus trap within modal
- Escape key closes modal
- Labels associated with toggles
- Screen reader announcements

## Legal Compliance

- GDPR (EU)
- Swiss DSG
- Stores consent in localStorage
- Allows withdrawal of consent
- Links to privacy policy

## Variants

1. **Modal (Default)** - Centered overlay
2. **Bottom Bar** - Fixed to bottom of screen
3. **Corner Widget** - Small corner notification
4. **Full Overlay** - Blocks entire page
