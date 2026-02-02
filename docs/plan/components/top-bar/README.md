# Top Bar Component

## Screenshot

![Top Bar](./x00%20top%20bar.png)

## Description

A slim announcement bar that sits above the main header. Used for promotions, notices, or quick links.

## Design

- **Height:** ~40px fixed
- **Background:** Solid color (dark green brand color)
- **Text:** Centered, small white text
- **Optional:** Dismissible with close button (×)
- **Optional:** Link/CTA integrated in text

## Structure

```
top-bar
├── container (centered, max-width)
│   ├── icon (optional, left)
│   ├── text (centered)
│   │   └── link (inline, underlined)
│   └── close-button (optional, right)
```

## Behavior

- Fixed at top of viewport (above header)
- Can be dismissed (stores preference in localStorage)
- Hidden on scroll down, shown on scroll up (optional)
- Responsive: Text may truncate or wrap on mobile

## Tailwind Implementation

```html
<div class="bg-green-900 text-white text-sm py-2">
  <div class="container mx-auto px-4 flex items-center justify-center">
    <span>Your announcement text with <a href="#" class="underline">link</a></span>
    <button class="absolute right-4 hover:opacity-70">×</button>
  </div>
</div>
```

## Props

```typescript
interface TopBarProps {
  text: string;
  link?: { label: string; href: string };
  dismissible?: boolean;
  icon?: string;
}
```
