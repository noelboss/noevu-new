/**
 * Handles click events on blog items
 */

export const initBlogItemClickHandler = () => {
  // Click on blog item links to open blog post
  document.body.addEventListener("click", (event) => {
    const blogItem = event.target.closest(".blog-item");
    if (!blogItem) return;

    const titleLink = blogItem.querySelector(".blog-title a");
    if (titleLink) {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = titleLink.href;
    }
  });
};
