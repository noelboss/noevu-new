# Blog HTML Rewriter - Cloudflare Worker

This Cloudflare Worker handles server-side HTML transformations for the blog section of your Squarespace site, improving performance by moving client-side DOM manipulation to the edge.

## Features

- **Author Information**: Adds author images and positions author info correctly
- **Table of Contents**: Generates a TOC from headings
- **Excerpts**: Injects post excerpts after titles
- **Categories**: Styles and positions category tags
- **Share Buttons**: Adds social sharing functionality
- **Reading Time**: Calculates and displays estimated reading time
- **Gallery Indicators**: Adds visual indicators for posts with galleries

## Prerequisites

1. [Node.js](https://nodejs.org/) (v16 or later)
2. [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (Cloudflare's CLI tool)
3. A Cloudflare account with Workers enabled

## Setup

1. **Install Dependencies**:
   ```bash
   cd projects/noevu/components/blog/workers
   npm install
   ```

2. **Configure Wrangler**:
   - Run `npx wrangler login` to authenticate with your Cloudflare account
   - Update `wrangler.toml` with your domain and routes

3. **Environment Variables**:
   Create a `.dev.vars` file for local development:
   ```
   # .dev.vars
   NODE_ENV=development
   ```

## Development

To run the worker locally:

```bash
npm run dev
```

This will start a local development server at `http://localhost:8787`.

## Deployment

1. **Build the Worker**:
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare**:
   ```bash
   npx wrangler deploy
   ```

3. **Configure Routes**:
   Update the `wrangler.toml` file with your production routes:
   ```toml
   [env.production]
   route = "yourdomain.com/blog/*"
   ```

## How It Works

The worker intercepts requests to your blog pages and applies transformations using Cloudflare's HTMLRewriter API. Here's what happens for each page type:

### Blog Posts (`/blog/post-slug`)
1. Adds author image and info
2. Generates a table of contents
3. Injects post excerpt
4. Styles and positions categories
5. Adds share buttons
6. Calculates and displays reading time

### Blog List (`/blog/`)
1. Adds gallery indicators to posts with galleries
2. Styles category tags
3. Adds reading time estimates

## Customization

### Adding New Transformations
1. Create a new handler in `src/transformers/handlers/`
2. Import and add it to the appropriate transformer in `src/transformers/`

### Styling
Add your CSS in the Squarespace Custom CSS panel or link to an external stylesheet in your site's header.

## Troubleshooting

- **Changes not appearing**: Clear your Cloudflare cache
- **Errors in production**: Check the Cloudflare Workers dashboard for error logs
- **Local development issues**: Ensure you're using the latest version of Wrangler

## Performance Impact

This worker is designed to be lightweight and fast. All transformations happen at the edge, reducing the amount of JavaScript that needs to be downloaded and executed by the browser.

## License

MIT
