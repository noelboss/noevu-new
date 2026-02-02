# Comparison Table Component

## Screenshot

![Comparison Table](./x07%20Comparison%20table%20with%20CTA%20Primary%20and%20Secondary.png)

## Description

Feature comparison table showing differences between options (e.g., pricing tiers, product comparison, CMS comparison). Includes checkmarks, x-marks, and CTA buttons.

## Design

- **Layout:** Multi-column table with sticky header
- **Highlighting:** Recommended column often highlighted
- **Icons:** ✓ (check) and ✗ (x) for feature availability
- **CTAs:** Button at bottom of each column
- **Mobile:** Horizontal scroll or accordion transform

## Structure

```
comparison-table
├── table-header
│   └── header-row
│       ├── feature-label-column (empty or "Features")
│       └── option-column (repeated)
│           ├── option-name
│           ├── option-price (optional)
│           └── recommended-badge (optional)
├── table-body
│   └── feature-row (repeated)
│       ├── feature-name
│       └── feature-value (repeated per column)
│           └── check / x / text / partial
└── table-footer
    └── footer-row
        ├── empty-cell
        └── cta-button (repeated per column)
```

## Variants

1. **Simple** - Just checkmarks/x-marks
2. **Detailed** - Text values in cells
3. **Pricing** - With price and billing period
4. **Highlighted** - One column emphasized (recommended)

## Cell Types

| Type | Display |
|------|---------|
| `true` | ✓ Green checkmark |
| `false` | ✗ Gray/red x-mark |
| `partial` | ~ or "Limited" |
| `text` | Custom text value |

## Tailwind Implementation

```html
<section class="py-20">
  <div class="container mx-auto px-4 overflow-x-auto">
    <table class="w-full min-w-[600px]">
      <!-- Header -->
      <thead>
        <tr class="border-b">
          <th class="text-left py-4 pr-4">Features</th>
          <th class="text-center py-4 px-4">Basic</th>
          <th class="text-center py-4 px-4 bg-green-50 rounded-t-lg">
            <span class="text-xs bg-green-600 text-white px-2 py-1 rounded">Recommended</span>
            <div class="font-bold mt-2">Pro</div>
          </th>
          <th class="text-center py-4 px-4">Enterprise</th>
        </tr>
      </thead>
      
      <!-- Body -->
      <tbody>
        <tr class="border-b">
          <td class="py-4 pr-4">Feature Name</td>
          <td class="text-center py-4 px-4">
            <svg class="w-5 h-5 text-green-600 mx-auto"><!-- Check --></svg>
          </td>
          <td class="text-center py-4 px-4 bg-green-50">
            <svg class="w-5 h-5 text-green-600 mx-auto"><!-- Check --></svg>
          </td>
          <td class="text-center py-4 px-4">
            <svg class="w-5 h-5 text-gray-300 mx-auto"><!-- X --></svg>
          </td>
        </tr>
      </tbody>
      
      <!-- Footer with CTAs -->
      <tfoot>
        <tr>
          <td></td>
          <td class="text-center py-6 px-4">
            <a href="#" class="btn btn-secondary">Get Started</a>
          </td>
          <td class="text-center py-6 px-4 bg-green-50 rounded-b-lg">
            <a href="#" class="btn btn-primary">Get Started</a>
          </td>
          <td class="text-center py-6 px-4">
            <a href="#" class="btn btn-secondary">Contact Us</a>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</section>
```

## Props

```typescript
interface ComparisonColumn {
  name: string;
  price?: string;
  period?: string; // "per month"
  recommended?: boolean;
  cta: { label: string; href: string; variant: 'primary' | 'secondary' };
}

interface ComparisonFeature {
  name: string;
  values: Array<boolean | string | 'partial'>;
  tooltip?: string;
}

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  features: ComparisonFeature[];
  featureGroups?: Array<{
    name: string;
    features: ComparisonFeature[];
  }>;
}
```

## Reference

- Custom CSS: `_reference/src/components/comparison-table.less`
