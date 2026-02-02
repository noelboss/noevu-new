/**
 * Handles reading time calculation and display
 */
export class ReadingTimeHandler {
  constructor() {
    // Average reading speed in words per minute
    this.wordsPerMinute = 200;
  }

  element(element) {
    // For single post view
    if (element.classList.contains('blog-item')) {
      this.handleSinglePost(element);
    } 
    // For blog list view
    else if (element.classList.contains('blog-item-content')) {
      this.handleBlogListItem(element);
    }
  }

  /**
   * Calculate reading time in minutes
   */
  calculateReadingTime(text) {
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / this.wordsPerMinute);
  }

  /**
   * Handle reading time for single post view
   */
  handleSinglePost(element) {
    // Get the main content
    const contentElement = element.querySelector('.blog-item-content, .entry-content');
    if (!contentElement) return;

    // Calculate reading time
    const text = contentElement.textContent || '';
    const readingTime = this.calculateReadingTime(text);
    
    // Create or update reading time element
    let readingTimeElement = element.querySelector('.reading-time');
    if (!readingTimeElement) {
      readingTimeElement = document.createElement('div');
      readingTimeElement.className = 'reading-time';
      
      // Insert after the post meta or at the beginning of the content
      const meta = element.querySelector('.blog-meta');
      if (meta) {
        meta.insertAdjacentElement('afterend', readingTimeElement);
      } else {
        contentElement.prepend(readingTimeElement);
      }
    }

    // Update reading time text
    readingTimeElement.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <span>${readingTime} min read</span>
    `;
  }

  /**
   * Handle reading time for blog list items
   */
  handleBlogListItem(element) {
    const text = element.textContent || '';
    const readingTime = this.calculateReadingTime(text);
    
    // Create reading time element
    const readingTimeElement = document.createElement('div');
    readingTimeElement.className = 'reading-time';
    readingTimeElement.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <span>${readingTime} min read</span>
    `;
    
    // Insert at the end of the blog item meta
    const meta = element.querySelector('.blog-meta');
    if (meta) {
      meta.appendChild(readingTimeElement);
    } else {
      element.prepend(readingTimeElement);
    }
  }
}
