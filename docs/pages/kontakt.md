# Contact Page (/kontakt)

## SEO Metadata
- **Title:** Kontakt mit Schweizer Webdesigner — Noevu GmbH
- **Description:** Ihr wollt direkt über Euere Webseite und Ziele mit einem Experten sprechen? Jetzt kostenloses & unverbindliches 15-Minuten-Gespräch buchen!

---

## Section Structure

### Section 1: Hero
**Type:** `hero`
**Theme:** `white`
**Background:** Parallax effect (rotation: 180°, intensity: 7)

**Content:**
- Headline (H1): "Kontakt mit KMU Webseiten und Squarespace Experten"
- Subheading (H2): "Eine grossartige **Idee** beginnt mit einem **Gespräch**. Ganz unverbindlich."
- Body text about contacting directly
- CTA Button: "Video Termin buchen" → #termin

**Layout:** Single centered column, grid-based (8 cols mobile, 24 cols desktop)

---

### Section 2: Contact Info + Form
**Type:** `contactSection`
**Theme:** `white-bold`
**Layout:** Two-column grid with section divider

**Left Column (Info):**
- Decorative shape block (accent circle)
- Team photo: Noel Bossart (circular)
- Personal intro card:
  - Heading: "Hallo, ich bin Noël"
  - Subheading: "Gründer & CEO von Noevu"
- Bio/Contact card:
  - 25+ years experience narrative
  - Email: noel@noevu.ch
  - Phone: +41 44 505 10 20
  - Calendar booking link
  - LinkedIn profile

**Right Column (Form):**
- Form name: "Kontaktanfrage 2"
- Fields:
  1. Name (not required)
  2. Email (required, with mailing list option)
  3. Textarea: "Wie können wir helfen?" (required)
- Submit button: "Anfrage senden"
- Success message:
  - H4: "Nachricht gesendet"
  - H3: "Hallo, danke für die Nachricht!"
  - Body: "Innerhalb eines Werktages melden wir uns persönlich..."
- reCAPTCHA enabled

---

### Section 3: Calendar Booking
**Type:** `calendarSection`
**Theme:** `dark`
**ID:** `#termin`
**Layout:** Two-column with section divider

**Left Column (Text):**
- Subheading (H4): "Kostenloser Webseiten Beratungs-Termin"
- Headline (H2): "Der **schnellste** Weg zu Klarheit: Bucht ein Online-Gespräch."
- Body text about 15-minute consultation

**Right Column (Calendar):**
- Provider: Cal.com
- Embed type: Inline calendar widget
- Container ID: `terminview`
- Cal Link: `noevu/15min`
- Configuration:
  - Title: "Anfrage für ein unverbindliches Gespräch"
  - Layout: month_view
  - Theme: light
  - Brand color: #236053 (dark green)

---

### Section 4: Footer
**Type:** `footer`
**Theme:** `dark`
**Height:** Small
**Image overlay opacity:** 0.15

**Elements:**
1. Social links (LinkedIn, Facebook)
2. Company branding: "Noevu."
3. Address block:
   - Noevu GmbH
   - Zürichstrasse 131
   - 8600 Dübendorf, Zürich
   - Schweiz
4. Language switcher: Deutsch | English
5. Partner badge: Squarespace Gold Partner
6. Legal/Copyright:
   - © Noevu. Alle Rechte Vorbehalten.
   - Datenschutz | Impressum | LLMs Info

---

## Components Required
1. Hero section with parallax
2. Two-column contact info + form
3. Cal.com calendar embed
4. Footer with social icons

## Images Required
- Noel Bossart photo (circular)
- Squarespace Gold Partner badge

---

## Status
- [ ] JSON content created
- [ ] Form integration configured
- [ ] Cal.com embed setup
- [ ] Page implemented
