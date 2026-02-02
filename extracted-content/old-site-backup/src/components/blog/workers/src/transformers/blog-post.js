import { AuthorInfoHandler } from './handlers/author-info';
import { TableOfContentsHandler } from './handlers/table-of-contents';
import { ExcerptHandler } from './handlers/excerpt';
import { CategoriesHandler } from './handlers/categories';
import { ShareButtonsHandler } from './handlers/share-buttons';

export async function handleBlogPost(response, request) {
  // Create a rewriter instance with our element handlers
  const rewriter = new HTMLRewriter()
    // Add author image to meta wrapper
    .on('.blog-item-meta-wrapper', new AuthorInfoHandler())
    
    // Handle table of contents
    .on('article', new TableOfContentsHandler())
    
    // Inject excerpt after title
    .on('h1.blog-title', new ExcerptHandler())
    
    // Handle categories
    .on('.blog-item-top-wrapper', new CategoriesHandler())
    
    // Add share buttons
    .on('article', new ShareButtonsHandler());

  // Apply the transformations
  return rewriter.transform(response);
}
