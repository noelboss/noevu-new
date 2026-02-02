/**
 * Handles table of contents generation for blog posts
 */
export class TableOfContentsHandler {
  constructor() {
    this.headings = [];
    this.tocHtml = '';
  }

  element(element) {
    // Find all h2 and h3 headings in the article
    this.headings = Array.from(element.querySelectorAll('h2, h3'));
    
    if (this.headings.length === 0) return;

    // Generate TOC HTML
    this.tocHtml = `
      <div class="toc-wrapper">
        <div class="toc-header">Table of Contents</div>
        <ul class="toc-list">
          ${this.headings.map((heading, index) => {
            const id = heading.getAttribute('id') || `section-${index}`;
            if (!heading.id) heading.setAttribute('id', id);
            const level = heading.tagName.toLowerCase() === 'h2' ? 'toc-level-1' : 'toc-level-2';
            return `<li class="toc-item ${level}"><a href="#${id}">${heading.textContent}</a></li>`;
          }).join('')}
        </ul>
      </div>
    `;

    // Insert TOC after the first paragraph or the first heading
    const firstParagraph = element.querySelector('p');
    if (firstParagraph) {
      firstParagraph.insertAdjacentHTML('afterend', this.tocHtml);
    } else if (this.headings[0]) {
      this.headings[0].insertAdjacentHTML('afterend', this.tocHtml);
    }
  }
}
