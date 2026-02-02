import { GalleryMetaHandler } from './handlers/gallery-meta';
import { BlogListCategoriesHandler } from './handlers/blog-list-categories';
import { ReadingTimeHandler } from './handlers/reading-time';

export async function handleBlogList(response, request) {
  // Create a rewriter instance with our element handlers
  const rewriter = new HTMLRewriter()
    // Handle gallery meta for blog list items
    .on('.blog-list', new GalleryMetaHandler())
    
    // Handle blog list categories
    .on('.blog-list', new BlogListCategoriesHandler())
    
    // Add reading time to blog list items
    .on('.blog-item', new ReadingTimeHandler());

  // Apply the transformations
  return rewriter.transform(response);
}
