# Footer Component

## Screenshots

### Desktop
![Footer Desktop](../../screenshots/footer/footer-desktop.png)

### Mobile
![Footer Mobile](../../screenshots/footer/footer-mobile.png)

## Overview

Dark-themed footer with:
- Multi-column link sections
- Contact information
- Social media links
- Legal/copyright links
- Language switcher
- Squarespace Partner badge

## Structure

```
footer.sections
└── section (dark theme)
    └── fluid-engine (24-column grid)
        ├── Column 1: Services links
        ├── Column 2: About links
        ├── Column 3: Contact info
        ├── Column 4: Social + Legal
        └── Column 5: Logo + Partner badge
```

## Link Sections

### Column 1: Dienstleistungen (Services)
- Neue KMU Webseite entwickeln
- AI-Beratung & Implementierung
- Webseiten Beratung & Hilfe
- Squarespace Webseiten Entwicklung

**Ressourcen (Resources)**
- Projekte & Portfolio
- Artikel, Anleitungen & Tipps für KMU Websites
- Gratis CMS-Test für KMUs
- Häufige Fragen (FAQ)

### Column 2: Über uns (About)
- Kontakt
- Kostenlose Beratung
- Warum Noevu
- Team
- Soziale Verantwortung

**Squarespace**
- Schweizer Squarespace Agentur
- Squarespace Experte & Goldpartner

### Column 3: Kontakt (Contact)
- Phone: +41 44 505 10 20
- Email: hello@noevu.ch
- "Termin buchen" (Book Appointment)

**Address:**
```
Noevu GmbH
Zürichstrasse 131
8600 Dübendorf, Zürich
Schweiz
```

### Column 4: Social & Legal
**Social Links:**
- LinkedIn
- Facebook

**Legal:**
- © Noevu. Alle Rechte Vorbehalten.
- Datenschutz (Privacy)
- Impressum (Imprint)
- Infos für LLMs

## HTML Structure

```html
<footer class="sections" id="footer-sections">
  <section data-section-theme="dark" 
    class="page-section full-bleed-section layout-engine-section 
      background-width--full-bleed section-height--small 
      content-width--wide dark">
    
    <div class="content-wrapper">
      <div class="content">
        <div data-fluid-engine="true">
          <div class="fluid-engine fe-[ID]">
            
            <!-- Link Column -->
            <div class="fe-block">
              <div class="sqs-block html-block sqs-block-html">
                <div class="sqs-html-content">
                  <p><strong>Dienstleistungen</strong></p>
                  <p><a href="...">Link text</a></p>
                  <!-- More links -->
                </div>
              </div>
            </div>
            
            <!-- Contact Column -->
            <div class="fe-block">
              <div class="sqs-block html-block">
                <p class="sqsrte-small">
                  Noevu GmbH<br>
                  Zürichstrasse 131<br>
                  8600 Dübendorf, Zürich<br>
                  Schweiz
                </p>
              </div>
            </div>
            
            <!-- Social Icons -->
            <div class="fe-block">
              <div class="sqs-svg-icon--outer social-icon-alignment-left 
                social-icons-size-medium social-icons-style-regular">
                <nav class="sqs-svg-icon--list">
                  <a href="https://linkedin.com/..." 
                    class="sqs-svg-icon--wrapper linkedin-unauth">
                    <svg class="sqs-svg-icon--social" viewBox="0 0 64 64">
                      <use xlink:href="#linkedin-unauth-icon"></use>
                    </svg>
                  </a>
                  <!-- Facebook icon -->
                </nav>
              </div>
            </div>
            
            <!-- Copyright -->
            <div class="fe-block">
              <p class="sqsrte-small" style="color: #769F97">
                © Noevu. Alle Rechte Vorbehalten.<br>
                <a href="/datenschutz-impressum">Datenschutz</a> & 
                <a href="/datenschutz-impressum#...">Impressum</a>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>
</footer>
```

## Social Icon Structure

```html
<a href="https://www.linkedin.com/company/noevu-swiss/" 
  target="_blank" 
  class="sqs-svg-icon--wrapper linkedin-unauth" 
  aria-label="LinkedIn">
  <div>
    <svg class="sqs-svg-icon--social" viewBox="0 0 64 64">
      <use class="sqs-use--icon" xlink:href="#linkedin-unauth-icon"></use>
      <use class="sqs-use--mask" xlink:href="#linkedin-unauth-mask"></use>
    </svg>
  </div>
</a>
```

## Styling Notes

### Colors
- Background: Dark theme (from design system)
- Text: Light/white
- Links: Light with hover state
- Copyright text: `#769F97` (teal/muted green)

### Grid Layout
- Desktop: 24-column fluid grid
- Mobile: 8-column grid, stacked layout
- Responsive at `768px` breakpoint

### Typography
- Headings: Bold, standard size
- Links: `sqsrte-small` class
- Address: Small text with line breaks

## Tailwind Implementation Notes

Key considerations:
- Dark background section
- Multi-column grid (responsive)
- SVG social icons (inline or sprite)
- Small text for legal/copyright
- Proper link hover states

## Content Schema (for Tina CMS)

```typescript
const footerSchema = {
  columns: [
    {
      title: string,
      links: [{ label: string, href: string }]
    }
  ],
  contact: {
    phone: string,
    email: string,
    address: {
      company: string,
      street: string,
      city: string,
      country: string
    }
  },
  social: [
    { platform: 'linkedin' | 'facebook', url: string }
  ],
  legal: {
    copyright: string,
    links: [{ label: string, href: string }]
  }
}
```

## Reference Files

- HTML: `_reference/html/index.html` (lines 13740-14587)
- Section ID: `67fe953a29835a475f4fe955`
