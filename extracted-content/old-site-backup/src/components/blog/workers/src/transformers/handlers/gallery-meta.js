/**
 * Handles gallery meta information for blog list items
 */
export class GalleryMetaHandler {
  element(element) {
    // Find all blog items in the list
    const blogItems = element.querySelectorAll('.blog-item');
    
    blogItems.forEach(item => {
      // Check if the blog item has a gallery
      const hasGallery = item.querySelector('.sqs-gallery');
      if (hasGallery) {
        // Add a gallery indicator
        const meta = document.createElement('div');
        meta.className = 'gallery-meta';
        meta.innerHTML = `
          <span class="gallery-indicator">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="14" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Gallery
          </span>
        `;
        
        // Insert the gallery indicator at the beginning of the blog item
        const header = item.querySelector('.blog-item-title') || item.firstElementChild;
        if (header) {
          header.insertAdjacentElement('afterend', meta);
        }
      }
    });
  }
}
