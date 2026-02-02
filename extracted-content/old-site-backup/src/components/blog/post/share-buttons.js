/**
 * Creates share buttons HTML
 */
export const createShareButtons = () => {
  const pageUrl = encodeURIComponent(window.location.href);
  const pagePostTitle = encodeURIComponent(document.title);

  return `
    <div class="sm-wrapper">
      <a href="https://www.facebook.com/sharer/sharer.php?u=${pageUrl}" id="fb-share" target="_blank" rel="noopener"></a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}" id="ln-share" target="_blank" rel="noopener"></a>
      <a href="https://twitter.com/intent/tweet?url=${pageUrl}&text=${pagePostTitle}" id="x-share" target="_blank" rel="noopener"></a>
    </div>`;
};

/**
 * Initializes share buttons in the blog post
 */
export const initShareButtons = (container) => {
  if (!container) return;
  container.insertAdjacentHTML("beforeend", createShareButtons());
};
