# Timeline Component

A responsive, animated vertical timeline component for Squarespace that provides an engaging way to display chronological content.

## Features

- Animated vertical line with scroll-based progress
- Horizontal text animations for content blocks
- Responsive design that works across all device sizes
- Customizable animation start points
- Automatic positioning of content blocks

## Installation

1. Ensure both component files are in your project:
   - `timeline.js` - Core functionality
   - `timeline.less` - Styling (import in your main stylesheet)

2. Import the JavaScript in your main JS file:
   ```javascript
   import "./components/timeline/timeline";
   ```

## Basic Usage

```html
<section class="vertical-timeline-section">
  <div class="timeline-vertical"></div>
  <!-- Your content blocks will go here -->
  <div class="sqs-block html-block">
    <!-- Your content -->
  </div>
</section>
```

## Configuration Options

### Data Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-animation-start-percentage` | Number (1-100) | 70 | When the animation should start (percentage of viewport height) |
| `data-enable-timeline-scroll-animation` | Boolean | true | Enable/disable scroll animation |

Example:
```html
<div class="timeline-vertical" 
     data-animation-start-percentage="50"
     data-enable-timeline-scroll-animation="true">
</div>
```

## Styling

The component includes default styles in `timeline.less`. You can customize the following classes:

- `.vertical-line-animated` - The animated vertical line
- `.timeline-stop-activated` - Active state for timeline stops
- `.left-of-timeline` - Content blocks positioned to the left
- `.right-of-timeline` - Content blocks positioned to the right
- `.horizontal-left` - Left side connector lines
- `.horizontal-right` - Right side connector lines

## How It Works

1. The timeline creates a vertical line that animates as you scroll
2. Content blocks are automatically positioned left or right of the timeline
3. The animation starts when the timeline enters the viewport (configurable via `data-animation-start-percentage`)
4. Horizontal lines connect content blocks to the timeline
5. The `timeline-stop-activated` class is toggled on elements as they enter the viewport

## Best Practices

- Place the timeline in a full-width section
- Keep content blocks concise for better mobile display
- Test different `animation-start-percentage` values for your specific layout
- Use the `timeline-stop-activated` class to trigger animations on connected elements
- For best results, ensure the parent section has sufficient vertical space

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Includes a polyfill for `Element.closest()` for IE11 support

## Troubleshooting

If animations don't trigger:
- Verify the `.timeline-vertical` element exists in the DOM
- Check for JavaScript errors in the console
- Ensure the parent section has the `vertical-timeline-section` class
- Verify the viewport height is being calculated correctly
- Check if any parent elements have `overflow: hidden` that might be clipping the timeline

## Dependencies

- None (vanilla JavaScript)
- Included polyfill for `Element.closest()`

## License

[MIT](LICENSE)
