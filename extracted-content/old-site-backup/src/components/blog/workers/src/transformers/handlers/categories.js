/**
 * Handles categories display in blog posts
 */
export class CategoriesHandler {
  element(element) {
    // Find the categories container
    const categoriesContainer = element.querySelector('.blog-meta-item--categories');
    if (!categoriesContainer) return;

    // Move categories to the top of the post
    const postHeader = element.querySelector('.blog-item-header');
    if (postHeader) {
      postHeader.prepend(categoriesContainer);
      categoriesContainer.classList.add('moved-to-top');
    }

    // Style the categories
    const categoryLinks = categoriesContainer.querySelectorAll('a');
    categoryLinks.forEach(link => {
      link.classList.add('category-tag');
    });
  }
}
