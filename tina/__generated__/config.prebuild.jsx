// tina/config.ts
import { defineConfig } from "tinacms";
var imageFields = [
  { type: "image", name: "src", label: "Bild", required: true },
  { type: "string", name: "alt", label: "Alt Text", required: true },
  { type: "number", name: "width", label: "Breite" },
  { type: "number", name: "height", label: "H\xF6he" }
];
var linkFields = [
  { type: "string", name: "label", label: "Label", required: true },
  { type: "string", name: "href", label: "URL", required: true },
  {
    type: "string",
    name: "variant",
    label: "Variante",
    options: ["primary", "secondary", "text"]
  },
  { type: "boolean", name: "external", label: "Externer Link" }
];
var heroSection = {
  type: "object",
  name: "hero",
  label: "Hero",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    { type: "string", name: "headline", label: "Headline", required: true },
    { type: "string", name: "subheadline", label: "Subheadline" },
    { type: "rich-text", name: "description", label: "Beschreibung" },
    { type: "object", name: "image", label: "Bild", fields: imageFields },
    { type: "object", name: "backgroundImage", label: "Hintergrundbild", fields: imageFields },
    { type: "object", name: "ctas", label: "CTAs", list: true, fields: linkFields },
    {
      type: "object",
      name: "rating",
      label: "Bewertung",
      fields: [
        { type: "number", name: "score", label: "Score" },
        { type: "number", name: "count", label: "Anzahl" },
        { type: "string", name: "label", label: "Label" }
      ]
    },
    {
      type: "string",
      name: "alignment",
      label: "Ausrichtung",
      options: ["left", "center", "right"]
    }
  ]
};
var logoGallerySection = {
  type: "object",
  name: "logoGallery",
  label: "Logo Gallery",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    { type: "string", name: "title", label: "Titel" },
    {
      type: "object",
      name: "logos",
      label: "Logos",
      list: true,
      fields: [
        { type: "string", name: "name", label: "Name", required: true },
        { type: "object", name: "image", label: "Logo", fields: imageFields },
        { type: "string", name: "href", label: "Link" }
      ]
    }
  ]
};
var valuePropositionSection = {
  type: "object",
  name: "valueProposition",
  label: "Value Proposition",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    { type: "string", name: "title", label: "Titel" },
    {
      type: "object",
      name: "items",
      label: "Items",
      list: true,
      fields: [
        { type: "string", name: "icon", label: "Icon (SVG)" },
        { type: "string", name: "title", label: "Titel", required: true },
        { type: "rich-text", name: "description", label: "Beschreibung", required: true }
      ]
    }
  ]
};
var servicesGridSection = {
  type: "object",
  name: "servicesGrid",
  label: "Services Grid",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    { type: "string", name: "title", label: "Titel" },
    { type: "string", name: "subtitle", label: "Untertitel" },
    {
      type: "object",
      name: "services",
      label: "Services",
      list: true,
      fields: [
        { type: "string", name: "icon", label: "Icon (SVG)" },
        { type: "string", name: "title", label: "Titel", required: true },
        { type: "rich-text", name: "description", label: "Beschreibung", required: true },
        { type: "object", name: "cta", label: "CTA", fields: linkFields }
      ]
    },
    {
      type: "string",
      name: "columns",
      label: "Spalten",
      options: ["2", "3", "4"]
    }
  ]
};
var comparisonTableSection = {
  type: "object",
  name: "comparisonTable",
  label: "Vergleichstabelle",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    { type: "string", name: "title", label: "Titel" },
    {
      type: "object",
      name: "leftColumn",
      label: "Linke Spalte",
      fields: [
        { type: "string", name: "header", label: "\xDCberschrift", required: true },
        { type: "string", name: "items", label: "Punkte", list: true },
        { type: "boolean", name: "highlighted", label: "Hervorgehoben" }
      ]
    },
    {
      type: "object",
      name: "rightColumn",
      label: "Rechte Spalte",
      fields: [
        { type: "string", name: "header", label: "\xDCberschrift", required: true },
        { type: "string", name: "items", label: "Punkte", list: true },
        { type: "boolean", name: "highlighted", label: "Hervorgehoben" }
      ]
    }
  ]
};
var processSection = {
  type: "object",
  name: "process",
  label: "Prozess",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    { type: "string", name: "title", label: "Titel" },
    { type: "string", name: "subtitle", label: "Untertitel" },
    {
      type: "object",
      name: "steps",
      label: "Schritte",
      list: true,
      fields: [
        { type: "number", name: "number", label: "Nummer" },
        { type: "string", name: "title", label: "Titel", required: true },
        { type: "rich-text", name: "description", label: "Beschreibung", required: true },
        { type: "object", name: "image", label: "Bild", fields: imageFields }
      ]
    },
    {
      type: "string",
      name: "layout",
      label: "Layout",
      options: ["horizontal", "vertical", "alternating"]
    }
  ]
};
var ctaSection = {
  type: "object",
  name: "cta",
  label: "Call to Action",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    { type: "string", name: "title", label: "Titel", required: true },
    { type: "rich-text", name: "description", label: "Beschreibung" },
    { type: "object", name: "ctas", label: "Buttons", list: true, fields: linkFields },
    {
      type: "string",
      name: "backgroundColor",
      label: "Hintergrundfarbe",
      options: ["green", "orange", "beige"]
    },
    { type: "object", name: "image", label: "Bild", fields: imageFields }
  ]
};
var waveDividerSection = {
  type: "object",
  name: "waveDivider",
  label: "Wave Divider",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    {
      type: "string",
      name: "topColor",
      label: "Obere Farbe",
      options: ["beige", "white", "green"]
    },
    {
      type: "string",
      name: "bottomColor",
      label: "Untere Farbe",
      options: ["beige", "white", "green"]
    },
    {
      type: "string",
      name: "height",
      label: "H\xF6he",
      options: ["small", "medium", "large"]
    }
  ]
};
var testimonialsSection = {
  type: "object",
  name: "testimonials",
  label: "Testimonials",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    { type: "string", name: "title", label: "Titel" },
    {
      type: "object",
      name: "rating",
      label: "Gesamtbewertung",
      fields: [
        { type: "number", name: "average", label: "Durchschnitt" },
        { type: "number", name: "count", label: "Anzahl" },
        { type: "string", name: "source", label: "Quelle" }
      ]
    },
    {
      type: "object",
      name: "testimonials",
      label: "Testimonials",
      list: true,
      fields: [
        { type: "string", name: "quote", label: "Zitat", required: true, ui: { component: "textarea" } },
        { type: "string", name: "author", label: "Autor", required: true },
        { type: "string", name: "role", label: "Rolle" },
        { type: "string", name: "company", label: "Firma" },
        { type: "object", name: "image", label: "Bild", fields: imageFields },
        { type: "number", name: "rating", label: "Bewertung (1-5)" }
      ]
    }
  ]
};
var featuresListSection = {
  type: "object",
  name: "featuresList",
  label: "Features Liste",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    { type: "string", name: "title", label: "Titel" },
    {
      type: "object",
      name: "features",
      label: "Features",
      list: true,
      fields: [
        { type: "string", name: "icon", label: "Icon (SVG)" },
        { type: "string", name: "title", label: "Titel", required: true },
        { type: "string", name: "description", label: "Beschreibung" }
      ]
    },
    {
      type: "string",
      name: "columns",
      label: "Spalten",
      options: ["2", "3"]
    }
  ]
};
var faqSection = {
  type: "object",
  name: "faq",
  label: "FAQ",
  fields: [
    { type: "string", name: "type", label: "Type", required: true, ui: { component: "hidden" } },
    { type: "string", name: "title", label: "Titel" },
    {
      type: "object",
      name: "items",
      label: "Fragen",
      list: true,
      fields: [
        { type: "string", name: "question", label: "Frage", required: true },
        { type: "rich-text", name: "answer", label: "Antwort", required: true }
      ]
    }
  ]
};
var sectionTemplates = {
  hero: heroSection,
  logoGallery: logoGallerySection,
  valueProposition: valuePropositionSection,
  servicesGrid: servicesGridSection,
  comparisonTable: comparisonTableSection,
  process: processSection,
  cta: ctaSection,
  waveDivider: waveDividerSection,
  testimonials: testimonialsSection,
  featuresList: featuresListSection,
  faq: faqSection
};
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Seiten",
        path: "src/content/pages",
        format: "json",
        fields: [
          { type: "string", name: "slug", label: "Slug", required: true },
          {
            type: "string",
            name: "locale",
            label: "Sprache",
            options: ["de", "en"]
          },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "description", label: "Beschreibung", required: true, ui: { component: "textarea" } },
              { type: "object", name: "image", label: "OG Image", fields: imageFields },
              { type: "boolean", name: "noIndex", label: "Nicht indexieren" }
            ]
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
            options: ["default", "blog", "landing"]
          },
          {
            type: "object",
            name: "sections",
            label: "Sektionen",
            list: true,
            templates: Object.values(sectionTemplates).map((template) => ({
              ...template,
              label: template.label,
              name: template.name
            }))
          }
        ],
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.slug || "new-page"
          }
        }
      },
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Titel", required: true, isTitle: true },
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "string", name: "excerpt", label: "Auszug", required: true, ui: { component: "textarea" } },
          { type: "image", name: "featuredImage", label: "Featured Image" },
          { type: "string", name: "categories", label: "Kategorien", list: true },
          {
            type: "object",
            name: "author",
            label: "Autor",
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "image", name: "image", label: "Bild" },
              { type: "string", name: "bio", label: "Bio" }
            ]
          },
          { type: "datetime", name: "publishedAt", label: "Ver\xF6ffentlicht am", required: true },
          { type: "rich-text", name: "body", label: "Inhalt", isBody: true }
        ],
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => values?.slug || "new-post"
          }
        }
      },
      {
        name: "navigation",
        label: "Navigation",
        path: "src/content",
        format: "json",
        match: {
          include: "navigation"
        },
        fields: [
          {
            type: "object",
            name: "main",
            label: "Hauptnavigation",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "URL" },
              { type: "boolean", name: "external", label: "Externer Link" },
              {
                type: "object",
                name: "children",
                label: "Untermen\xFC",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Label", required: true },
                  { type: "string", name: "href", label: "URL", required: true },
                  { type: "boolean", name: "external", label: "Externer Link" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "CTA Button",
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "URL", required: true }
            ]
          }
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        }
      },
      {
        name: "site",
        label: "Site Einstellungen",
        path: "src/content",
        format: "json",
        match: {
          include: "site"
        },
        fields: [
          { type: "string", name: "url", label: "Site URL", required: true },
          {
            type: "object",
            name: "company",
            label: "Firma",
            fields: [
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "legalName", label: "Rechtlicher Name", required: true },
              { type: "string", name: "tagline", label: "Tagline" },
              { type: "string", name: "description", label: "Beschreibung", required: true, ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "Kontakt",
            fields: [
              { type: "string", name: "phone", label: "Telefon", required: true },
              { type: "string", name: "email", label: "E-Mail", required: true },
              {
                type: "object",
                name: "address",
                label: "Adresse",
                fields: [
                  { type: "string", name: "street", label: "Strasse", required: true },
                  { type: "string", name: "city", label: "Stadt", required: true },
                  { type: "string", name: "zip", label: "PLZ", required: true },
                  { type: "string", name: "country", label: "Land", required: true }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "defaultSeo",
            label: "Standard SEO",
            fields: [
              { type: "string", name: "titleTemplate", label: "Titel Template", required: true },
              { type: "string", name: "defaultTitle", label: "Standard Titel", required: true },
              { type: "string", name: "defaultDescription", label: "Standard Beschreibung", required: true, ui: { component: "textarea" } }
            ]
          }
        ],
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        }
      }
    ]
  }
});
export {
  config_default as default
};
