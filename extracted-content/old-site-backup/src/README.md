**Live URL:** https://noevu.ch

# Squarespace Integration for noevu

To integrate the noevu project with your Squarespace site, you need to add the following code to your Squarespace Code Injection. This single script handles both production loading and development mode switching.

Please replace `YOUR_PROJECT_NAME` with `noevu` in the snippet below.

```html
<!-- Production Styles -->
<link
  id="noevu-styles"
  rel="stylesheet"
  href="https://assets.noevu.ch/noevu/styles.min.css"
/>

<!-- Production Script (includes devmode logic) -->
<script
  id="noevu-app"
  defer
  src="https://assets.noevu.ch/noevu/app.min.js"
  data-project="noevu"
></script>
```

**Explanation:**

* **`styles.min.css`**: Contains the compiled and minified CSS for your project. It's included in the `<head>` for optimal loading performance.
* **`app.min.js`**: Contains the compiled and minified JavaScript for your project, including the `devmode` logic. It's included in the `<footer>` to ensure the DOM is ready before execution. The `id="noevu-app"` and `data-project="noevu"` attributes are crucial for the `devmode` functionality to work correctly.

**Development Mode:**

When `devmode` is active (e.g., via `?devmode=true` URL parameter or Squarespace editor), the `app.min.js` script will automatically:

* Remove these production `<link>` and `<script>` tags from the DOM.
* Inject the local development files (`main.js` and `styles.css`) from your Vite development server.
* Show a visual development indicator.
* Enable hot module replacement for instant updates as you develop.