import "./reading-time.less";
import {
  getCachedReadingTime,
  cacheReadingTime,
  cleanupReadingTimeCache,
} from "./reading-time-cache";

// Re-export cache functions for use in other files
export { getCachedReadingTime, cacheReadingTime, cleanupReadingTimeCache };

const WORDS_PER_MINUTE = 200;

/**
 * Calculates reading time from content
 */
export const calculateReadingTime = (content) => {
  if (!content) return 0;
  const wordCount = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  return Math.ceil(wordCount / WORDS_PER_MINUTE);
};

/**
 * Creates a reading time element
 */
export const createReadingTimeElement = (minutes) => {
  const label = document.createElement("span");
  label.className = "reading-time";
  label.textContent = `${minutes} Minuten Lesezeit`;
  return label;
};

/**
 * Gets reading time from cache or calculates it
 * @param {string} content - The content to calculate reading time for
 * @param {string} [url] - Optional URL to use as cache key
 * @returns {number} Reading time in minutes
 */
export const getReadingTime = (content, url) => {
  // Try to get from cache if URL is provided
  if (url) {
    const cachedTime = getCachedReadingTime(url);
    if (cachedTime !== null) {
      return cachedTime;
    }
  }

  // Calculate and cache if not in cache
  const readingTime = calculateReadingTime(content);

  if (url) {
    cacheReadingTime(url, readingTime);
  }

  return readingTime;
};

/**
 * Adds reading time to a specific element with caching support
 * @param {HTMLElement} container - The container element
 * @param {string} content - The content to calculate reading time from
 * @param {Function} insertFn - Function to insert the reading time element
 * @param {string} [url] - Optional URL to use for caching
 */
export const addReadingTimeToItem = (container, content, insertFn, url) => {
  // Skip if reading time already exists
  if (container.querySelector(".reading-time")) return;

  const readingTime = getReadingTime(content, url);
  const label = createReadingTimeElement(readingTime);

  if (typeof insertFn === "function") {
    insertFn(container, label);
  } else {
    container.appendChild(label);
  }
};
