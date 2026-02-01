# Booking Page (/termin)

## SEO Metadata
- **Title:** Termin mit KMU Webseiten und Squarespace Experten — Noevu GmbH
- **Description:** Kostenloser Video-Termin buchen. Bucht ein unverbindliches 15-Minuten-Gespräch mit unserem Webseiten-Experten.

---

## Section Structure

### Section 1: Hero with Calendar
**Type:** `hero`
**Theme:** `white-bold`
**Background:** Generative conic animation
**Height:** Small
**Content Width:** Wide (50% custom)
**Alignment:** Center, middle
**Divider:** Rounded (rotation 180°, intensity 7)

**Content:**
- Headline (H1): "Termin mit KMU Webseiten und Squarespace Experten"
- Subheading (H2): "Kostenloser Video-Termin buchen. Ganz einfach…"

**Layout:** Two-column with decorative frame
- Left column: Profile section
- Right column: Calendar embed

**Left Column Content:**
- Decorative shape block (rounded rectangle, accent color border)
- Profile image: Noel Bossart (circular mask)
- H3: "Hallo, ich bin Noël"
- Role: "Gründer & CEO von Noevu"
- Description text with contact info
- Email: noel@noevu.ch
- Phone: +41 44 505 10 20
- Calendar booking link
- LinkedIn profile link

**Right Column Content:**
- Cal.com inline embed
- Container ID: `my-cal-inline`
- Max width: 1040px
- Scrollable content

**Cal.com Configuration:**
- Namespace: "15min"
- Calendar Link: `noevu/15min`
- Layout: Month view
- Theme: Light
- Brand Colors:
  - Light: `#236053` (green)
  - Dark: `#ED7442` (orange)
- Event details: Hidden

**Social Proof Component:**
- 3 person avatars with circular masks
- Quote: "Kunden lieben die Zusammenarbeit"
- Subtext: "100% Fünf-Sterne Bewertungen auf Google"
- Link to: `https://go.noevu.ch/review`

---

### Section 2: Spacer
**Type:** `spacer`
**Theme:** `dark`
**Height:** Minimal

---

### Section 3: Footer
**Type:** `footer`
**Theme:** `dark`
**Height:** Small
**Image overlay opacity:** 0.15

---

## Background Effects

**Generative Conic Effect:**
- Colors: Light Accent, rgb(253, 246, 238), White
- Speed: 20
- Noise: Intensity 9, Scale 14
- Distortion: ScaleY 66, Speed 50, Intensity 47
- Blur: 34
- Curve: X 61, Y 46, Funnel 92
- Fog Intensity: 53
- Repeat: 3
- Rotation: 280°

---

## Components Required
- Hero with generative background
- Profile card with circular image
- Decorative shape/frame element
- Cal.com calendar embed
- Social proof component with avatars
- Section divider (rounded)
- Footer

## Images Required
- CEO portrait (Noel Bossart) - circular
- Avatar images for social proof (3)

---

## Grid Layout Details

**Desktop (24-column):**
- Title Block: grid-area 1/6/11/22
- Shape/Border: grid-area 11/4/40/24
- Profile Image: grid-area 12/5/16/6
- Profile Text: grid-area 12/6/16/12
- Description: grid-area 16/5/37/12
- Calendar: grid-area 12/13/39/23
- Social Proof: grid-area 41/10/44/18

---

## Status
- [ ] JSON content created
- [ ] Cal.com embed configured
- [ ] Images collected
- [ ] Page implemented
