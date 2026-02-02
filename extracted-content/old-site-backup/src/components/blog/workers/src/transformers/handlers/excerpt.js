/**
 * Handles excerpt injection for blog posts
 */
export class ExcerptHandler {
  element(element) {
    // Get the first paragraph after the title
    const firstParagraph = element.nextElementSibling;
    
    if (firstParagraph && firstParagraph.tagName === 'P') {
      const excerptText = firstParagraph.textContent.substring(0, 200);
      if (excerptText) {
        firstParagraph.insertAdjacentHTML(
          'beforebegin',
          `<div class="blog-excerpt">${excerptText}...</div>`
        );
      }
    }
  }
}
