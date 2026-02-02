/**
 * Reading Time Cache Utility
 * ==========================
 * 
 * Provides caching for reading time calculations to improve performance.
 * Uses localStorage with fallback to in-memory cache.
 */

const CACHE_KEY_PREFIX = 'noevu-reading-time';
const CACHE_VERSION = 'v1';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// In-memory cache fallback
const memoryCache = new Map();

/**
 * Get cache key for a URL
 * @param {string} url - The URL to get cache key for
 * @returns {string} Cache key
 */
const getCacheKey = (url) => {
  return `${CACHE_KEY_PREFIX}:${CACHE_VERSION}:${url}`;
};

/**
 * Get reading time from cache
 * @param {string} url - The URL to get reading time for
 * @returns {number|null} Cached reading time in minutes or null if not found/expired
 */
export const getCachedReadingTime = (url) => {
  if (!url) return null;
  
  const cacheKey = getCacheKey(url);
  
  // Try memory cache first
  if (memoryCache.has(cacheKey)) {
    const { expires, readingTime } = memoryCache.get(cacheKey);
    if (expires > Date.now()) {
      return readingTime;
    }
    memoryCache.delete(cacheKey);
    return null;
  }
  
  // Try localStorage
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { expires, readingTime } = JSON.parse(cached);
      if (expires > Date.now()) {
        // Update memory cache
        memoryCache.set(cacheKey, { expires, readingTime });
        return readingTime;
      }
      // Remove expired entry
      localStorage.removeItem(cacheKey);
    }
  } catch (e) {
    console.warn('Failed to read from reading time cache', e);
  }
  
  return null;
};

/**
 * Save reading time to cache
 * @param {string} url - The URL to cache reading time for
 * @param {number} readingTime - Reading time in minutes
 */
export const cacheReadingTime = (url, readingTime) => {
  if (!url || typeof readingTime !== 'number') return;
  
  const cacheKey = getCacheKey(url);
  const cacheData = {
    readingTime,
    expires: Date.now() + CACHE_TTL,
    cachedAt: new Date().toISOString()
  };
  
  // Update memory cache
  memoryCache.set(cacheKey, { ...cacheData });
  
  // Update localStorage
  try {
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (e) {
    console.warn('Failed to write to reading time cache', e);
  }
};

/**
 * Clear expired cache entries
 */
export const cleanupReadingTimeCache = () => {
  const now = Date.now();
  
  // Clean up memory cache
  for (const [key, { expires }] of memoryCache.entries()) {
    if (expires <= now) {
      memoryCache.delete(key);
    }
  }
  
  // Clean up localStorage
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(`${CACHE_KEY_PREFIX}:`)) {
        try {
          const cached = localStorage.getItem(key);
          if (cached) {
            const { expires } = JSON.parse(cached);
            if (expires <= now) {
              localStorage.removeItem(key);
            }
          }
        } catch (e) {
          // Remove invalid entries
          localStorage.removeItem(key);
        }
      }
    });
  } catch (e) {
    console.warn('Failed to clean up reading time cache', e);
  }
};

// Clean up expired entries on load and periodically
if (typeof window !== 'undefined') {
  cleanupReadingTimeCache();
  // Clean up every hour
  setInterval(cleanupReadingTimeCache, 60 * 60 * 1000);
}
