/**
 * Handles categories display in blog list view
 */
export class BlogListCategoriesHandler {
  element(element) {
    // Find all blog items in the list
    const blogItems = element.querySelectorAll('.blog-item');
    
    blogItems.forEach(item => {
      // Find the categories container for this item
      const categoriesContainer = item.querySelector('.blog-meta-item--categories');
      if (!categoriesContainer) return;

      // Style the category links
      const categoryLinks = categoriesContainer.querySelectorAll('a');
      categoryLinks.forEach(link => {
        link.classList.add('category-tag');
      });

      // Move categories to the top of the blog item
      const itemHeader = item.querySelector('.blog-item-title') || item.firstElementChild;
      if (itemHeader) {
        itemHeader.insertAdjacentElement('afterend', categoriesContainer);
        categoriesContainer.classList.add('moved-to-top');
      }
    });
  }
}
