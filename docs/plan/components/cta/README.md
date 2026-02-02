# CTA (Call-to-Action) Component

## Screenshot

![CTA Section with Form and Testimonial](./x09%20CTA%20section%20with%20form%20and%20testimonial.png)

## Description

Prominent call-to-action sections designed to convert visitors. Can include contact forms, testimonials, and clear value propositions. Typically placed at page bottoms or between content sections.

## Design

- **Background:** Accent color or contrasting from surrounding sections
- **Layout:** Often split (content + form) or centered
- **Typography:** Clear headline, supporting text, strong CTA
- **Social Proof:** Testimonial or trust badges alongside
- **Form:** Inline form for lead capture

## Structure

```
cta-section
├── background (solid color or subtle pattern)
├── container
│   ├── content-column
│   │   ├── headline (H2)
│   │   ├── description
│   │   ├── cta-buttons (if no form)
│   │   └── testimonial (optional)
│   │       ├── quote
│   │       ├── author-image
│   │       ├── author-name
│   │       └── author-title
│   └── form-column (optional)
│       └── contact-form
│           ├── form-fields
│           └── submit-button
```

## Variants

1. **Simple CTA** - Headline + buttons only
2. **With Form** - Split layout with inline form
3. **With Testimonial** - Quote + author alongside CTA
4. **Full-width Banner** - Centered, single column
5. **Floating Card** - CTA in elevated card over background

## Tailwind Implementation

### Split Layout (Form + Testimonial)
```html
<section class="py-20 bg-beige-100">
  <div class="container mx-auto px-4">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      
      <!-- Content Side -->
      <div>
        <h2 class="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
        <p class="text-gray-600 mt-4">Book a free consultation and let's discuss your project.</p>
        
        <!-- Testimonial -->
        <div class="mt-8 p-6 bg-white rounded-xl">
          <p class="text-gray-700 italic">"Amazing experience working with the team..."</p>
          <div class="flex items-center mt-4">
            <img src="..." class="w-12 h-12 rounded-full" />
            <div class="ml-4">
              <p class="font-semibold">John Doe</p>
              <p class="text-sm text-gray-500">CEO, Company</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Form Side -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h3 class="text-xl font-semibold mb-6">Get in touch</h3>
        <form>
          <div class="space-y-4">
            <input type="text" placeholder="Name" class="w-full border rounded-lg px-4 py-3" />
            <input type="email" placeholder="Email" class="w-full border rounded-lg px-4 py-3" />
            <textarea placeholder="Message" rows="4" class="w-full border rounded-lg px-4 py-3"></textarea>
          </div>
          <button type="submit" class="w-full btn btn-primary mt-6">Send Message</button>
        </form>
      </div>
      
    </div>
  </div>
</section>
```

### Centered Banner
```html
<section class="py-20 bg-green-900 text-white text-center">
  <div class="container mx-auto px-4 max-w-3xl">
    <h2 class="text-3xl md:text-4xl font-bold">Ready to transform your website?</h2>
    <p class="text-white/70 mt-4">Let's create something amazing together.</p>
    <div class="flex justify-center gap-4 mt-8">
      <a href="#" class="btn btn-white">Book Consultation</a>
      <a href="#" class="btn btn-outline-white">Learn More</a>
    </div>
  </div>
</section>
```

## Props

```typescript
interface CTAProps {
  headline: string;
  description?: string;
  variant: 'simple' | 'with-form' | 'with-testimonial' | 'banner';
  background?: 'light' | 'dark' | 'brand' | 'accent';
  buttons?: Array<{
    label: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline';
  }>;
  testimonial?: {
    quote: string;
    author: {
      name: string;
      title: string;
      company?: string;
      image?: string;
    };
  };
  form?: {
    fields: FormField[];
    submitLabel: string;
    action: string;
  };
}
```
