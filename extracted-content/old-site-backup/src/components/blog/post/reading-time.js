import { addReadingTimeToItem, getCachedReadingTime, cacheReadingTime } from "../utils/reading-time-utils";

const log = window.noevu?.log || console.log;

/**
 * Initialize reading time for a single blog post with caching support
 * @returns {void}
 */
export const initReadingTimeForSinglePost = () => {
  const blogWrapper = document.querySelector(".blog-item-wrapper");
  if (!blogWrapper) return;

  // Get the current post's content and URL
  const postContent = document.querySelector(".blog-item-content");
  const postUrl = window.location.pathname; // Current post URL for caching
  
  if (!postContent) return;

  // Check if we already processed this item
  if (blogWrapper.dataset.readingTimeProcessed) return;
  blogWrapper.dataset.readingTimeProcessed = 'true';

  // Try to get from cache first
  const cachedReadingTime = getCachedReadingTime(postUrl);
  if (cachedReadingTime !== null) {
    addReadingTimeToItem(
      blogWrapper,
      '', // Content not needed when using cache
      (container, label) => {
        const authorDateWrapper = container.querySelector(".blog-item-author-date-wrapper");
        if (authorDateWrapper) {
          authorDateWrapper.appendChild(label);
        }
      },
      postUrl // Pass URL for caching
    );
    return;
  }

  // If not in cache, calculate from the content
  const content = postContent.textContent || '';
  
  addReadingTimeToItem(
    blogWrapper,
    content,
    (container, label) => {
      const authorDateWrapper = container.querySelector(".blog-item-author-date-wrapper");
      if (authorDateWrapper) {
        authorDateWrapper.appendChild(label);
      }
    },
    postUrl // Pass URL for caching
  );
};
