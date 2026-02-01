# Architecture Principles & Compliance Checklist

Use this document as a permanent reference to validate every implementation decision, refactor, CMS change, or AI automation against the core architecture.

---

## 1. Canonical Truth = Structured Data

**Principle**
All content, structure, navigation, and configuration live in structured, schema-validated data (JSON). No business logic or layout decisions live in freeform documents.

**Must be true:**

* Pages are data objects, not component files
* Sections are typed data, not JSX/MDX
* Navigation, SEO, i18n, tokens are JSON
* Markdown is only used inside string fields, never for composition

**Red flags:**

* JSX or MDX used to place sections
* Layout controlled inside Markdown
* Multiple competing sources of truth

---

## 2. Schemas Are the Contract

**Principle**
Every content type is defined by a strict, versioned schema (Zod or equivalent). Builds fail on invalid data.

**Must be true:**

* All pages validate against PageSchema
* All sections validate against discriminated unions
* Schema changes are explicit and migratable
* Tina uses the same schemas for form generation

**Red flags:**

* Untyped blobs
* Optional-any fields
* CMS fields that are not schema-backed

---

## 3. Astro Is a Compiler, Not an App

**Principle**
Astro renders deterministic static HTML. No runtime state unless strictly required.

**Must be true:**

* Zero JS by default
* Islands only for real interaction
* No client-side routing logic for content pages
* No data fetching in the browser for core content

**Red flags:**

* Hydrating entire pages
* Client-side content composition
* React state controlling layout

---

## 4. Components Are Pure Renderers

**Principle**
Components map typed data to semantic HTML. They do not decide structure, order, or business rules.

**Must be true:**

* Components receive already-validated data
* No fetching inside components
* No cross-section orchestration logic
* Variants are visual, not structural

**Red flags:**

* Components deciding which section comes next
* Components loading other sections
* Logic branches that belong in data, not UI

---

## 5. Pages Are Orchestration Graphs

**Principle**
Pages only define composition and order of sections. They do not contain presentation logic.

**Must be true:**

* Page = list of section entries (inline or reference)
* Order is explicit and data-driven
* No visual assumptions baked into pages

**Red flags:**

* Page templates with hardcoded section layouts
* Conditional rendering logic in page files

---

## 6. Reuse vs Specialization Is Explicit

**Principle**
Shared content is referenced. Page-specific content is inline. The distinction is modeled, not implicit.

**Must be true:**

* Global sections live in a sections collection
* Inline sections are embedded objects
* Zod union distinguishes inline vs reference

**Red flags:**

* Copy-pasted JSON without provenance
* Global content edited in page files

---

## 7. CMS Is a UI, Not the Model

**Principle**
Tina is a form and preview layer over Git. It never defines structure; it only reflects schemas.

**Must be true:**

* No CMS-only fields
* No hidden data logic in Tina
* Schema is the source, CMS is a view

**Red flags:**

* Tina templates diverging from Zod
* CMS constraints not mirrored in code

---

## 8. AI Is a First-Class System Operator

**Principle**
The site is a traversable content graph. AI can reason over it deterministically.

**Must be true:**

* No structure encoded in prose
* No layout encoded in JSX
* No hidden coupling between files
* Clear graph: Pages → Sections → Fields → Schemas

**Red flags:**

* Structure embedded in freeform text
* Implicit conventions without schema
* Hard-to-diff, non-normalized data

---

## 9. SEO & Performance Are Structural

**Principle**
Search and speed are guaranteed by architecture, not tuning.

**Must be true:**

* Static HTML for all routes
* Deterministic heading hierarchy
* Structured data at build time
* Zero CLS, minimal JS

**Red flags:**

* Client-rendered content
* Hydration for layout
* SEO logic in runtime JS

---

## 10. Migration & Evolution Safety

**Principle**
The system must survive schema evolution, design system changes, and AI-driven refactors.

**Must be true:**

* Versioned schemas
* Scriptable migrations
* No content locked in component APIs
* No layout encoded in CMS-specific syntax

**Red flags:**

* MDX with component calls
* Hardcoded JSX in content
* Data that cannot be batch-transformed

---

### Final Check

Before approving any change, ask:

1. Is this represented as structured data?
2. Is it validated by schema?
3. Is rendering deterministic and static?
4. Is layout decided by renderer, not content?
5. Can an AI agent refactor this safely?
6. Can we migrate this in 5 years?

If any answer is "no", the change violates the architecture.
