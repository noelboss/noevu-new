# Navigation Component

## Screenshots

### Desktop
![Header Desktop](../../screenshots/header/header-desktop.png)

### Mobile
![Header Mobile](../../screenshots/header/header-mobile.png)

## Overview

The navigation is a fixed header with:
- Logo (left)
- Centered navigation with dropdowns
- Language switcher + CTA button (right)
- Mobile hamburger menu

## Structure

```
header
├── header-inner (container)
│   ├── header-background
│   ├── header-display-desktop
│   │   ├── header-title (logo)
│   │   ├── header-nav (navigation links)
│   │   │   └── header-nav-list
│   │   │       ├── header-nav-item (regular link)
│   │   │       └── header-nav-item--folder (dropdown)
│   │   └── header-actions (language + CTA)
│   └── header-burger (mobile menu toggle)
```

## Navigation Items

| Label | Type | URL | Children |
|-------|------|-----|----------|
| Services | Dropdown | - | 4 items |
| Projekte | Link | `/webseiten-projekte` | - |
| Agentur | Dropdown | - | 6 items |
| Ressourcen | Dropdown | - | 4 items |
| Infos für LLMs | Link | `/en/llms.txt` | - |

### Services Dropdown
- Website erstellen lassen → `/services`
- Webseiten Beratung und Hilfe → `/webseiten-beratung-hilfe`
- Squarespace Agentur → `/squarespace-agentur`
- AI Beratung für Schweizer KMU → `/ai-beratung-kmu-schweiz`

### Agentur Dropdown
- Über uns → `/ueber-uns`
- Warum Noevu? → `/ueber-uns#why`
- Unser Team → `/ueber-uns#team`
- Soziale Verantwortung → `/ueber-uns#social`
- Squarespace Experte & Circle Gold Partner → `/schweizer-squarespace-experte`
- Kontakt → `/kontakt`

### Ressourcen Dropdown
- Webseiten Tipps & Insights → `/ressourcen`
- Squarespace Anleitung → `/blog/squarespace-webseite-erstellen-anleitung`
- Kostenlose online CMS-Evaluation → `/blog/cms-check-schweiz`
- AI für KMU – Jetzt loslegen → `/blog/warum-schweizer-kmu-jetzt-ai-brauchen`

## HTML Structure

### Desktop Header
```html
<header data-test="header" id="header" 
  class="white header theme-col--primary" 
  data-section-theme="white" 
  data-controller="Header" 
  data-header-style="dynamic">
  
  <div class="header-inner container--fluid 
    header-mobile-layout-logo-left-nav-right 
    header-layout-nav-center">
    
    <div class="header-background theme-bg--primary"></div>
    
    <div class="header-display-desktop">
      <!-- Logo -->
      <div class="header-title">
        <div class="header-title-logo">
          <a href="/">
            <img src="..." alt="Noevu GmbH...">
          </a>
        </div>
      </div>
      
      <!-- Navigation -->
      <div class="header-nav">
        <nav class="header-nav-list">
          <!-- Nav items here -->
        </nav>
      </div>
      
      <!-- Actions (Language + CTA) -->
      <div class="header-actions header-actions--right">
        <!-- Language picker -->
        <!-- CTA button -->
      </div>
    </div>
    
    <!-- Mobile burger -->
    <div class="header-burger">
      <button class="header-burger-btn burger">
        <div class="burger-box">
          <div class="burger-inner header-menu-icon-halfLineHamburger">
            <div class="top-bun"></div>
            <div class="patty"></div>
            <div class="bottom-bun"></div>
          </div>
        </div>
      </button>
    </div>
  </div>
</header>
```

### Dropdown Item
```html
<div class="header-nav-item header-nav-item--folder">
  <button class="header-nav-folder-title" 
    data-href="/services" 
    aria-expanded="false" 
    aria-controls="services">
    <span class="header-nav-folder-title-text">Services</span>
  </button>
  <div class="header-nav-folder-content" id="services">
    <div class="header-nav-folder-item">
      <a href="...">
        <span class="header-nav-folder-item-content">Item Text</span>
      </a>
    </div>
    <!-- More items -->
  </div>
</div>
```

### Regular Link
```html
<div class="header-nav-item header-nav-item--collection">
  <a href="/webseiten-projekte" data-animation-role="header-element">
    Projekte
  </a>
</div>
```

### CTA Button
```html
<div class="header-actions-action header-actions-action--cta">
  <a class="btn btn--border theme-btn--primary-inverse 
    sqs-button-element--secondary" 
    href="/kontakt#termin">
    Termin buchen
  </a>
</div>
```

## Behavior

### Desktop
- Fixed at top of page
- Transparent on hero, white background on scroll
- Dropdowns open on hover
- Smooth scroll transitions

### Mobile
- Hamburger menu (3-line icon)
- Full-screen overlay menu
- Accordion-style dropdowns
- Logo centered or left-aligned

## Configuration

From Squarespace context:
```json
{
  "tweak-fixed-header": "true",
  "tweak-fixed-header-style": "Basic",
  "tweak-transparent-header": "true",
  "header-logo-height": "57px",
  "header-mobile-logo-max-height": "41px",
  "menuIconStyle": "halfLineHamburger",
  "menuIconThickness": "2px"
}
```

## Tailwind Implementation Notes

Key classes to create:
- `.header` - Fixed positioning, z-index
- `.header-nav-item--folder` - Dropdown trigger
- `.header-nav-folder-content` - Dropdown panel (hidden by default)
- `.burger-inner` - Animated hamburger icon
- Responsive breakpoint at `768px`

## Reference Files

- HTML: `_reference/html/index.html` (lines 230-800)
- Custom CSS: `_reference/src/components/navigation.less`
- Custom CSS: `_reference/src/components/sub-navigation.less`
