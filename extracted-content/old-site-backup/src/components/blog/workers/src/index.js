import { handleBlogPost } from './transformers/blog-post';
import { handleBlogList } from './transformers/blog-list';

// Main worker entry point
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Only process GET requests for HTML content
  if (request.method !== 'GET') {
    return fetch(request);
  }

  try {
    // Forward the request to the origin
    const response = await fetch(request);
    
    // Only process successful HTML responses
    if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) {
      return response;
    }

    // Clone the response so we can read it without consuming it
    const newResponse = new Response(response.body, response);
    
    // Apply transformations based on the URL path
    if (url.pathname.includes('/blog/') && !url.pathname.endsWith('/') && !url.pathname.endsWith('/blog')) {
      // This is a blog post page
      return handleBlogPost(newResponse, request);
    } else if (url.pathname.includes('/blog/')) {
      // This is the blog list page
      return handleBlogList(newResponse, request);
    }

    return newResponse;
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Error processing request', { status: 500 });
  }
}
