/**
 * Handles share buttons for blog posts
 */
export class ShareButtonsHandler {
  element(element) {
    // Only add share buttons once
    if (element.querySelector(".share-buttons")) return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = encodeURIComponent("Check out this blog post: ");

    const shareButtons = `
      <div class="share-buttons">
        <div class="share-buttons-label">Share:</div>
        <a href="https://twitter.com/intent/tweet?url=${url}&text=${text}${title}" 
           target="_blank" 
           rel="noopener noreferrer"
           class="share-button twitter"
           aria-label="Share on Twitter">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M23.44 4.83c-.8.36-1.66.6-2.56.71.92-.55 1.62-1.42 1.96-2.45-.86.51-1.82.88-2.83 1.08-.81-.86-1.97-1.4-3.25-1.4-2.46 0-4.45 2-4.45 4.46 0 .35.04.69.12 1.01-3.7-.19-6.98-1.96-9.17-4.65-.38.66-.6 1.42-.6 2.24 0 1.54.79 2.9 1.98 3.7-.73-.02-1.42-.22-2.02-.56v.06c0 2.16 1.54 3.96 3.58 4.37-.37.1-.77.15-1.18.15-.29 0-.57-.03-.85-.08.58 1.8 2.26 3.12 4.25 3.16-1.56 1.22-3.52 1.95-5.65 1.95-.37 0-.73-.02-1.09-.06 2.02 1.3 4.42 2.06 6.99 2.06 8.39 0 12.98-6.9 12.98-12.89 0-.2 0-.39-.01-.59.89-.65 1.66-1.46 2.28-2.38z"></path></svg>
        </a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" 
           target="_blank" 
           rel="noopener noreferrer"
           class="share-button linkedin"
           aria-label="Share on LinkedIn">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9.21h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.06zM5.7 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06 1.13 0 2.06.92 2.06 2.06 0 1.14-.93 2.07-2.06 2.07zM7.27 20.45H4.1V9.21h3.17v11.24zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56c0 .95.8 1.72 1.77 1.72h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z"></path></svg>
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" 
           target="_blank" 
           rel="noopener noreferrer"
           class="share-button facebook"
           aria-label="Share on Facebook">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"></path></svg>
        </a>
      </div>
    `;

    // Add share buttons after the post content
    element.insertAdjacentHTML("beforeend", shareButtons);
  }
}
