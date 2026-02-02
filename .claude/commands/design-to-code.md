---
description: Convert a screenshot to HTML/CSS code
argument-hint: <screenshot-path> [--format astro|react|vue]
allowed-tools: [Read, Write, Glob]
---

# Screenshot to Code Conversion

Convert a design screenshot into production-ready front-end code.

## Arguments

Parse `$ARGUMENTS` for:
- **Screenshot path**: Path to the image file (required)
- **--format**: Output format - html (default), astro, react, vue
- **--output**: Where to write the generated code

## Supported Formats

- **html** (default): Complete HTML file with embedded CSS
- **astro**: Astro component with scoped styles
- **react**: React TypeScript component
- **vue**: Vue 3 SFC with script setup

## Examples

```
/design-to-code ./screenshots/stripe-desktop-viewport.png
/design-to-code ./screenshots/hero.png --format astro
/design-to-code ./screenshots/card.png --format react --output src/components/Card.tsx
```

## Workflow

1. **Read the screenshot** using the Read tool (Claude has vision)
2. **Analyze the design**:
   - Layout structure
   - Color palette
   - Typography
   - Spacing system
   - Components
3. **Generate code** in the requested format
4. **Write to file** if --output specified, otherwise display

## Quality Standards

The generated code must:
- Use semantic HTML elements
- Define colors/spacing as CSS custom properties
- Match the design exactly (no approximations)
- Include responsive breakpoints
- Be clean, minimal, and maintainable
- Avoid "AI slop" (generic Bootstrap/Tailwind look)

## Output

Provide:
1. Design analysis summary
2. Complete, ready-to-use code
3. Notes on any assumptions made

Arguments: $ARGUMENTS
