/**
 * Handles author information injection into blog posts
 */
export class AuthorInfoHandler {
  constructor() {
    this.authorImageUrl = '';
  }

  element(element) {
    // Find the author avatar image URL from the page
    const authorAvatar = element.querySelector('.author-avatar img');
    if (authorAvatar) {
      this.authorImageUrl = authorAvatar.getAttribute('src') || '';
    }

    // If we have an image URL, add the author image
    if (this.authorImageUrl) {
      element.prepend(`
        <div class="author-img">
          <img src="${this.authorImageUrl}" alt="Author" loading="lazy">
        </div>
      `, { html: true });
    }

    // Move author info to date wrapper if it exists
    const authorDateWrapper = element.closest('.blog-item-top-wrapper')
      ?.querySelector('.blog-item-author-date-wrapper');
    const authorWrapper = element.querySelector('.blog-meta-item--author');
    
    if (authorDateWrapper && authorWrapper) {
      authorDateWrapper.appendChild(authorWrapper);
    }
  }
}
