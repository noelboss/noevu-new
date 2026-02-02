# Component Usage Examples

Complete JSON examples for all 10 new section types, ready to copy into page JSON files.

---

## HIGH PRIORITY Components

### 1. Team Grid

**Use case:** Display team member profiles with photos, roles, and bios
**Reference:** webdesign-agentur.md (lines 70-109), ueber-uns.md

```json
{
  "type": "teamGrid",
  "theme": "white",
  "title": "Unser Team",
  "subtitle": "Die Menschen hinter Noevu",
  "layout": "4-column",
  "members": [
    {
      "name": "Noel Bossart",
      "role": "Gründer & Creative Director",
      "image": {
        "src": "https://images.squarespace-cdn.com/content/v1/team/noel-bossart.jpg",
        "alt": "Noel Bossart Portrait",
        "width": 400,
        "height": 400
      },
      "bio": "Noel ist Gründer und Creative Director von Noevu. Mit über 15 Jahren Erfahrung im Webdesign und einer Leidenschaft für klare, funktionale Gestaltung unterstützt er KMU bei der digitalen Transformation.",
      "linkedin": "https://linkedin.com/in/noelbossart",
      "email": "noel@noevu.ch"
    },
    {
      "name": "Tobias Morf",
      "role": "Lead Developer",
      "image": {
        "src": "https://images.squarespace-cdn.com/content/v1/team/tobias-morf.jpg",
        "alt": "Tobias Morf Portrait",
        "width": 400,
        "height": 400
      },
      "bio": "Tobias ist unser Full-Stack Entwickler mit Expertise in modernen Web-Technologien. Er sorgt dafür, dass unsere Websites nicht nur gut aussehen, sondern auch technisch perfekt funktionieren.",
      "linkedin": "https://linkedin.com/in/tobiasmorf"
    },
    {
      "name": "Michael Karrer",
      "role": "UX Designer",
      "image": {
        "src": "https://images.squarespace-cdn.com/content/v1/team/michael-karrer.jpg",
        "alt": "Michael Karrer Portrait",
        "width": 400,
        "height": 400
      },
      "bio": "Michael bringt seine Expertise in User Experience Design ein. Mit einem Fokus auf Nutzerzentriertheit entwickelt er intuitive Interfaces, die Besucher begeistern.",
      "linkedin": "https://linkedin.com/in/michaelkarrer"
    },
    {
      "name": "Anabel Hafstad",
      "role": "Content Strategist",
      "image": {
        "src": "https://images.squarespace-cdn.com/content/v1/team/anabel-hafstad.jpg",
        "alt": "Anabel Hafstad Portrait",
        "width": 400,
        "height": 400
      },
      "bio": "Anabel ist unsere Content-Strategin. Sie hilft unseren Kunden, ihre Botschaft klar und wirkungsvoll zu kommunizieren – auf allen Kanälen.",
      "linkedin": "https://linkedin.com/in/anabelhafstad"
    }
  ]
}
```

---

### 2. Bento Grid

**Use case:** Modern feature grid with Material Icons, varied card sizes
**Reference:** squarespace-agentur.md (lines 128-201), ai-beratung-kmu-schweiz.md

```json
{
  "type": "bentoGrid",
  "theme": "dark",
  "title": "Unsere Squarespace Leistungen",
  "subtitle": "Alles aus einer Hand – von der Strategie bis zum laufenden Betrieb",
  "columns": "3",
  "items": [
    {
      "icon": "web_traffic",
      "iconDisplay": "icon",
      "title": "SEO & Traffic Optimierung",
      "subtitle": "Mehr Sichtbarkeit",
      "description": "Wir optimieren Ihre Squarespace-Website für Suchmaschinen und sorgen dafür, dass Sie von Ihrer Zielgruppe gefunden werden.",
      "size": "large"
    },
    {
      "icon": "ads_click",
      "iconDisplay": "icon",
      "title": "Marketing Integration",
      "subtitle": "Nahtlose Verbindung",
      "description": "Integration von Google Analytics, Facebook Pixel, Mailchimp und weiteren Marketing-Tools.",
      "size": "medium"
    },
    {
      "icon": "mobile_layout",
      "iconDisplay": "icon",
      "title": "Responsive Design",
      "subtitle": "Perfekt auf allen Geräten",
      "description": "Ihre Website sieht auf Desktop, Tablet und Smartphone perfekt aus.",
      "size": "medium"
    },
    {
      "icon": "phone",
      "iconDisplay": "icon",
      "title": "Persönlicher Support",
      "subtitle": "Wir sind für Sie da",
      "description": "Bei Fragen oder Problemen erreichen Sie uns jederzeit per Telefon oder E-Mail.",
      "size": "small"
    },
    {
      "icon": "add_shopping_cart",
      "iconDisplay": "icon",
      "title": "E-Commerce Setup",
      "subtitle": "Online verkaufen",
      "description": "Wir richten Ihren Squarespace Shop ein – mit Payment, Versand und allem was dazu gehört.",
      "size": "medium"
    },
    {
      "icon": "data_loss_prevention",
      "iconDisplay": "icon",
      "title": "Datenschutz & Sicherheit",
      "subtitle": "DSGVO-konform",
      "description": "Ihre Website erfüllt alle rechtlichen Anforderungen für den Schweizer und EU-Markt.",
      "size": "small"
    }
  ]
}
```

---

### 3. Image Text Alternating

**Use case:** Full-width alternating image/text sections for process or features
**Reference:** webdesign-agentur.md (lines 211-257), ai-beratung-kmu-schweiz.md

```json
{
  "type": "imageTextAlternating",
  "theme": "white",
  "title": "Unser Prozess",
  "subtitle": "In vier Schritten zur perfekten Website",
  "items": [
    {
      "eyebrow": "Schritt 1",
      "title": "Strategie & Konzept",
      "description": "Wir beginnen mit einer gründlichen Analyse Ihrer Bedürfnisse, Ziele und Zielgruppe. Gemeinsam entwickeln wir eine Strategie, die Ihre Botschaft klar kommuniziert und Ihre Kunden überzeugt.\n\n**Was wir klären:**\n- Wer ist Ihre Zielgruppe?\n- Was sind Ihre wichtigsten Botschaften?\n- Welche Ziele verfolgen Sie mit der Website?",
      "image": {
        "src": "https://images.squarespace-cdn.com/content/v1/process/strategy.jpg",
        "alt": "Strategie Workshop",
        "width": 1200,
        "height": 800
      },
      "imagePosition": "auto"
    },
    {
      "eyebrow": "Schritt 2",
      "title": "Design & Entwicklung",
      "description": "Basierend auf der Strategie entwickeln wir ein Design, das Ihre Marke perfekt repräsentiert. Wir legen Wert auf klare Strukturen, intuitive Navigation und ansprechendes visuelles Design.\n\n**Unser Fokus:**\n- Responsive Design für alle Geräte\n- Barrierefreiheit und Usability\n- Markenkonformes Design",
      "image": {
        "src": "https://images.squarespace-cdn.com/content/v1/process/design.jpg",
        "alt": "Design Mockups",
        "width": 1200,
        "height": 800
      },
      "imagePosition": "auto"
    },
    {
      "eyebrow": "Schritt 3",
      "title": "Content & Testing",
      "description": "Während der Entwicklung integrieren wir Ihre Inhalte und testen die Website ausführlich. Wir achten auf Performance, Browser-Kompatibilität und Suchmaschinen-Optimierung.\n\n**Qualitätssicherung:**\n- Performance-Tests\n- Browser-Testing\n- Mobile Optimierung\n- SEO Basis-Setup",
      "image": {
        "src": "https://images.squarespace-cdn.com/content/v1/process/testing.jpg",
        "alt": "Testing und QA",
        "width": 1200,
        "height": 800
      },
      "imagePosition": "auto",
      "cta": {
        "label": "Mehr zum Prozess",
        "href": "/prozess",
        "variant": "secondary"
      }
    },
    {
      "eyebrow": "Schritt 4",
      "title": "Launch & Support",
      "description": "Nach dem Launch sind wir weiterhin für Sie da. Wir bieten Training, Support und bei Bedarf laufende Wartung und Weiterentwicklung Ihrer Website.\n\n**Langfristige Partnerschaft:**\n- Schulung für Ihr Team\n- Technischer Support\n- Updates und Erweiterungen\n- Performance-Monitoring",
      "image": {
        "src": "https://images.squarespace-cdn.com/content/v1/process/launch.jpg",
        "alt": "Website Launch",
        "width": 1200,
        "height": 800
      },
      "imagePosition": "auto",
      "cta": {
        "label": "Projekt starten",
        "href": "/termin",
        "variant": "primary"
      }
    }
  ]
}
```

---

## MEDIUM PRIORITY Components

### 4. Social Responsibility

**Use case:** Showcase company values and social initiatives
**Reference:** webdesign-agentur.md (lines 112-122), ueber-uns.md

```json
{
  "type": "socialResponsibility",
  "theme": "light",
  "eyebrow": "Soziales Engagement",
  "title": "Wir geben zurück",
  "description": "Bei Noevu glauben wir daran, dass Erfolg verpflichtet. Deshalb unterstützen wir das Projekt **familyboss.art** in Brasilien, das sozial benachteiligten Jugendlichen durch Kunst und Bildung neue Perspektiven eröffnet.\n\nEin Teil unserer Einnahmen fliesst direkt in dieses Projekt. Mit jedem Website-Projekt, das Sie bei uns beauftragen, tragen Sie zu einer besseren Zukunft bei.",
  "image": {
    "src": "https://images.squarespace-cdn.com/content/v1/social/familyboss-art.jpg",
    "alt": "familyboss.art Projekt in Brasilien",
    "width": 1200,
    "height": 800
  },
  "cta": {
    "label": "Mehr über familyboss.art",
    "href": "https://familyboss.art",
    "variant": "secondary",
    "external": true
  }
}
```

---

### 5. Stats Banner

**Use case:** Display key statistics as trust signals
**Reference:** Multiple pages showing ratings and experience

```json
{
  "type": "statsBanner",
  "theme": "bright-inverse",
  "title": "Noevu in Zahlen",
  "backgroundColor": "orange",
  "layout": "horizontal",
  "stats": [
    {
      "value": "4.9",
      "label": "Sterne auf Google",
      "icon": "star"
    },
    {
      "value": "25+",
      "label": "Jahre Erfahrung",
      "icon": "workspace_premium"
    },
    {
      "value": "200+",
      "label": "Erfolgreiche Projekte",
      "icon": "rocket_launch"
    },
    {
      "value": "100%",
      "label": "Kundenzufriedenheit",
      "icon": "thumb_up"
    }
  ]
}
```

---

### 6. Rating Display

**Use case:** Inline rating display in hero sections
**Reference:** home.md (lines 19-22)

```json
{
  "type": "ratingDisplay",
  "theme": "white",
  "score": 4.9,
  "maxScore": 5,
  "reviewCount": 47,
  "source": "Google",
  "label": "Sterne Bewertungen auf Google",
  "cta": {
    "label": "Bewertungen lesen",
    "href": "https://g.page/r/CaBC6DsVTxOGEBM/review",
    "variant": "text",
    "external": true
  }
}
```

---

### 7. Certification Badge

**Use case:** Display Squarespace Gold Partner badge
**Reference:** Various pages showing partner status

```json
{
  "type": "certificationBadge",
  "theme": "white",
  "badge": {
    "src": "https://images.squarespace-cdn.com/content/v1/badges/squarespace-gold-partner.png",
    "alt": "Squarespace Gold Partner Badge",
    "width": 200,
    "height": 200
  },
  "title": "Squarespace Gold Partner",
  "description": "Noevu ist offizieller Squarespace Gold Partner – ausgezeichnet für herausragende Qualität und Expertise.",
  "link": "https://www.squarespace.com/circle/member/noevu",
  "inline": false
}
```

Inline version (for use within content):

```json
{
  "type": "certificationBadge",
  "badge": {
    "src": "https://images.squarespace-cdn.com/content/v1/badges/squarespace-gold-partner.png",
    "alt": "Squarespace Gold Partner",
    "width": 120,
    "height": 120
  },
  "link": "https://www.squarespace.com/circle/member/noevu",
  "inline": true
}
```

---

### 8. Timeline Process

**Use case:** Numbered process timeline with detailed descriptions
**Reference:** webdesign-agentur.md, squarespace-agentur.md (4 steps)

```json
{
  "type": "timelineProcess",
  "theme": "dark",
  "title": "Wie wir arbeiten",
  "subtitle": "Unser bewährter 4-Schritte-Prozess",
  "layout": "vertical",
  "steps": [
    {
      "number": "01",
      "eyebrow": "Erstgespräch",
      "title": "Kennenlernen & Bedarfsanalyse",
      "description": "In einem kostenlosen Erstgespräch lernen wir uns kennen und analysieren Ihre Bedürfnisse. Wir besprechen Ihre Ziele, Zielgruppe und Budget.\n\n**Dauer:** 30-60 Minuten\n**Format:** Videocall oder vor Ort",
      "image": {
        "src": "https://images.squarespace-cdn.com/content/v1/timeline/step-1.jpg",
        "alt": "Erstgespräch",
        "width": 600,
        "height": 400
      }
    },
    {
      "number": "02",
      "eyebrow": "Konzeption",
      "title": "Strategie & Wireframes",
      "description": "Wir entwickeln eine Strategie und erstellen erste Wireframes. Sie erhalten ein detailliertes Angebot mit Timeline und Meilensteinen.\n\n**Deliverables:**\n- Strategiedokument\n- Wireframes\n- Detailliertes Angebot",
      "image": {
        "src": "https://images.squarespace-cdn.com/content/v1/timeline/step-2.jpg",
        "alt": "Wireframes",
        "width": 600,
        "height": 400
      }
    },
    {
      "number": "03",
      "eyebrow": "Umsetzung",
      "title": "Design & Entwicklung",
      "description": "Wir setzen das Design um und entwickeln Ihre Website. Sie erhalten regelmässige Updates und können jederzeit Feedback geben.\n\n**Ihre Rolle:**\n- Feedback zu Design\n- Content-Bereitstellung\n- Freigabe von Meilensteinen"
    },
    {
      "number": "04",
      "eyebrow": "Abschluss",
      "title": "Launch & Training",
      "description": "Nach finalen Tests geht Ihre Website live. Wir schulen Sie im Umgang mit dem CMS und stehen für Fragen zur Verfügung.\n\n**Inklusive:**\n- Live-Training (2h)\n- Dokumentation\n- 30 Tage Support"
    }
  ]
}
```

---

## LOW PRIORITY Components

### 9. Icon Grid

**Use case:** Simple feature list with checkmarks or icons
**Reference:** Service offering sections

```json
{
  "type": "iconGrid",
  "theme": "white",
  "title": "Was Sie erhalten",
  "subtitle": "Alles inklusive – keine versteckten Kosten",
  "columns": "3",
  "items": [
    {
      "icon": "check",
      "label": "Responsive Design"
    },
    {
      "icon": "check",
      "label": "SEO Optimierung"
    },
    {
      "icon": "check",
      "label": "SSL Zertifikat"
    },
    {
      "icon": "check",
      "label": "Content Migration"
    },
    {
      "icon": "check",
      "label": "Google Analytics"
    },
    {
      "icon": "check",
      "label": "Cookie Banner (DSGVO)"
    },
    {
      "icon": "check",
      "label": "Training & Support"
    },
    {
      "icon": "check",
      "label": "Performance Optimierung"
    },
    {
      "icon": "check",
      "label": "30 Tage Garantie"
    }
  ]
}
```

---

### 10. Content Showcase

**Use case:** Mid-page content highlight with full-width background image
**Reference:** Various showcase sections

```json
{
  "type": "contentShowcase",
  "theme": "black-bold",
  "backgroundImage": {
    "src": "https://images.squarespace-cdn.com/content/v1/showcase/hero-background.jpg",
    "alt": "Team bei der Arbeit",
    "width": 1920,
    "height": 1080
  },
  "eyebrow": "Bereit durchzustarten?",
  "title": "Lassen Sie uns gemeinsam Ihre digitale Präsenz aufbauen",
  "description": "Vereinbaren Sie jetzt ein kostenloses Erstgespräch und erfahren Sie, wie wir Ihr Unternehmen online erfolgreich machen.",
  "overlay": true,
  "textPosition": "center",
  "ctas": [
    {
      "label": "Termin vereinbaren",
      "href": "/termin",
      "variant": "primary"
    },
    {
      "label": "Portfolio ansehen",
      "href": "/projekte",
      "variant": "secondary"
    }
  ]
}
```

---

## Integration in Page JSON

To add these sections to a page, include them in the `sections` array:

```json
{
  "slug": "ueber-uns",
  "locale": "de",
  "seo": {
    "title": "Über uns – Das Noevu Team",
    "description": "Lernen Sie das Team hinter Noevu kennen..."
  },
  "layout": "default",
  "sections": [
    {
      "type": "hero",
      "headline": "Das Noevu Team",
      "description": "Wir sind eine Schweizer Webdesign Agentur..."
    },
    {
      "type": "teamGrid",
      "title": "Unser Team",
      "members": [
        // ... team members
      ]
    },
    {
      "type": "socialResponsibility",
      "title": "Wir geben zurück",
      // ... content
    },
    {
      "type": "cta",
      "title": "Projekt starten",
      // ... CTA content
    }
  ]
}
```

---

## Material Icons Reference

Icons used in examples (Material Icons names):

- `star` - Rating/reviews
- `workspace_premium` - Premium/quality
- `rocket_launch` - Projects/launches
- `thumb_up` - Satisfaction/approval
- `web_traffic` - SEO/traffic
- `ads_click` - Marketing/advertising
- `mobile_layout` - Responsive design
- `phone` - Support/contact
- `add_shopping_cart` - E-commerce
- `data_loss_prevention` - Security/privacy
- `check` - Checkmark/included feature

Full icon list: https://fonts.google.com/icons

---

## Theme System Quick Reference

Choose appropriate theme for each section:

- `dark` - Default, dark green background
- `white` - Clean white background
- `bright-inverse` - Orange accent background
- `black-bold` - Strong hero sections
- `light` - Light beige/cream

Match themes to create visual hierarchy and rhythm on the page.

---

## Next Steps

1. ✅ Schemas created (`sections-new-components.ts`)
2. ⏳ Integrate into `sections.ts` and `tina/config.ts`
3. ⏳ Create Astro UI components for each section
4. ⏳ Use these JSON examples to populate pages
5. ⏳ Verify visual match with original site

Refer to `SCHEMA-IMPLEMENTATION.md` for detailed integration guide.
