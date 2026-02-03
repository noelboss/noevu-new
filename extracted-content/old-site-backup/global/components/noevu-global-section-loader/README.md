# Noevu Global Section Loader

A powerful and flexible section loading system for Squarespace websites that enables dynamic content loading, caching, and section management.

## Features

- **Dynamic Section Loading**: Load sections from any URL or route
- **Smart Caching**: Built-in caching with IndexedDB/WebSQL/LocalStorage fallback
- **Multiple Loading Methods**:
  - Data attributes
  - ID-based loading
  - Programmatic configuration
- **URL Pattern Matching**: Target specific pages using URL patterns
- **Automatic Script Handling**: Properly loads and executes scripts in loaded content
- **Squarespace Integration**: Handles Squarespace-specific components and blocks
- **Responsive Image Loading**: Optimized image loading with focal point support

## Installation

1. Add the component to your project:

```javascript
import "/global/components/noevu-global-section-loader/noevu-global-section-loader.js";
```

2. Include the required dependencies in your project:
   - `localforage` (for caching)
   - `noevu.js` (core utilities)

## Usage

### Method 1: Data Attributes

Add a `data-ngs-load` attribute to any element:

```html
<div data-ngs-load="/source-page.html #section-id"></div>
```

### Method 2: ID-based Loading

Add an ID starting with `load-` followed by the route and optional selector:

```html
<div id="load-about-team"></div>
```
This will load content from `/about` and look for an element with ID `team`.

### Method 3: Programmatic Configuration

Add a configuration object to `window.loaderConfig`:

```javascript
window.loaderConfig = [
  {
    target: "/blog/*",  // Target specific URLs
    not: "/blog/archive",  // Exclude specific URLs
    "#section1": {  // Target element selector
      source: "/source-page",  // Source URL
      selector: "#content",  // Optional: element selector in source
      placement: "replace"  // 'replace', 'before', 'after', 'prepend', 'append'
    }
  }
];
```

## Configuration Options

### Global Configuration

#### Cache Settings
- **TTL**: 24 hours (configurable via `TTL` constant)
- **Storage**: Uses IndexedDB with WebSQL/LocalStorage fallback
- **Cache Invalidation**: Automatically invalidates on:
  - Content modification (`contentModifiedOn` change)
  - Plugin version change
  - Cache entry expiration

#### Debugging
- Enable debug mode: `noevu.setDebug(true)`
- Debug prefix: `🌍 section →`

### Loader Configuration

#### Method 1: Data Attributes
```html
<div data-ngs-load="/source-page #section-id"></div>
```
- **First part**: Source URL (e.g., `/source-page`)
- **Second part (optional)**: CSS selector for specific element (e.g., `#section-id`)

#### Method 2: ID-based Loading
```html
<div id="load-{path}-{selector}"></div>
```
- `{path}`: URL path (e.g., `about` for `/about`)
- `{selector}`: (Optional) CSS selector for specific element (e.g., `team` for `#team`)

#### Method 3: Programmatic Configuration
```javascript
window.loaderConfig = [
  {
    // URL Patterns (supports wildcards with /*)
    target: "/blog/*",  // Target specific URLs
    not: "/blog/archive,/drafts/*",  // Exclude specific URLs (comma-separated)
    
    // Section configurations (key = CSS selector, value = config object)
    ".section-class": {
      source: "/source-page",  // Source URL (required)
      selector: "#content",    // Optional: element selector in source
      placement: "replace"     // One of: 'replace', 'before', 'after', 'prepend', 'append'
    },
    
    // Multiple sections can be configured
    "#another-section": {
      source: "/another-page",
      placement: "append"
    }
  }
];
```

### Advanced Configuration

#### Custom Cache Settings
```javascript
// Configure localforage instance
const store = localforage.createInstance({
  name: "noevu-section-loader",  // Database name
  storeName: "sections",         // Object store name
  description: "Noevu section loader cache",
  driver: [
    localforage.INDEXEDDB, 
    localforage.WEBSQL, 
    localforage.LOCALSTORAGE
  ]
});
```

#### Custom Events
Listen for these events on the `document`:
- `ngs:section-loaded`: Fires when a section is loaded
  ```javascript
  document.addEventListener('ngs:section-loaded', (e) => {
    console.log('Section loaded:', e.detail);
    // e.detail contains: { element, url, selector }
  });
  ```

- `ngsSectionLoader:scriptsLoaded`: Fires when all scripts are loaded
  ```javascript
  document.addEventListener('ngsSectionLoader:scriptsLoaded', () => {
    console.log('All scripts loaded');
  });
  ```

#### Development Mode
Set `window.DEVMODE = true` to bypass caching during development.

#### Custom Error Handling
```javascript
const handleError = (context, error, data = {}) => {
  console.error(`[NGS] ${context}`, error, data);
  return null; // Return null to use default error handling
};
```

### Events

The loader emits several custom events you can listen for:

```javascript
document.addEventListener('ngs:section-loaded', (e) => {
  console.log('Section loaded:', e.detail);
  // e.detail contains: { element, url, selector }
});

document.addEventListener('ngsSectionLoader:scriptsLoaded', () => {
  console.log('All scripts loaded');
});
```

## API Reference

### `window.noevuSectionLoader.setLoaderConfig(config)`

Programmatically add or update loader configurations.

```javascript
window.noevuSectionLoader.setLoaderConfig({
  target: "/products/*",
  ".product-section": {
    source: "/featured-products",
    selector: "#featured",
    placement: "replace"
  }
});
```

## Advanced Usage

### Custom Cache TTL

You can modify the cache TTL by setting:

```javascript
const TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
```

### Development Mode

Set `window.DEVMODE = true` to bypass caching during development.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Mobile browsers (iOS, Android)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
