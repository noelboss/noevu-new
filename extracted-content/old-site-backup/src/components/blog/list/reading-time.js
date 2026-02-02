import { addReadingTimeToItem, getCachedReadingTime } from "../utils/reading-time-utils";

const log = window.noevu?.log || console.log;

/**
 * Initialize reading time for blog list items with caching support
 * @returns {void}
 */
export const initReadingTimeForList = () => {
  const blogItems = document.querySelectorAll(".blog-item");
  if (!blogItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const blogItem = entry.target;
        
        // Get the post URL for caching
        const postLink = blogItem
          .querySelector(".blog-title a")
          ?.getAttribute("href");
        
        if (!postLink) return;

        // Check if we already processed this item
        if (blogItem.dataset.readingTimeProcessed) return;
        blogItem.dataset.readingTimeProcessed = 'true';

        // Try to get from cache first
        const cachedReadingTime = getCachedReadingTime(postLink);
        if (cachedReadingTime !== null) {
          addReadingTimeToItem(
            blogItem,
            '', // Content not needed when using cache
            (container, label) => {
              const metaSecondary = container.querySelector(".blog-meta-secondary");
              if (metaSecondary) metaSecondary.appendChild(label);
            },
            postLink // Pass URL for caching
          );
          return;
        }

        // If not in cache, fetch the full content
        fetch(`${postLink}?format=json-pretty`)
          .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
          })
          .then((blogPostData) => {
            if (!blogPostData.item?.body) return;
            
            addReadingTimeToItem(
              blogItem,
              blogPostData.item.body,
              (container, label) => {
                const metaSecondary = container.querySelector(".blog-meta-secondary");
                if (metaSecondary) metaSecondary.appendChild(label);
              },
              postLink // Pass URL for caching
            );
          })
          .catch((error) => {
            console.error("Error fetching blog content:", error);
            // Fallback to just calculating from excerpt if available
            const excerpt = blogItem.querySelector(".excerpt");
            if (excerpt) {
              addReadingTimeToItem(
                blogItem,
                excerpt.textContent || '',
                (container, label) => {
                  const metaSecondary = container.querySelector(".blog-meta-secondary");
                  if (metaSecondary) metaSecondary.appendChild(label);
                },
                postLink
              );
            }
          });
      });
    },
    { rootMargin: "100px 0px", threshold: 0.1 }
  );

  blogItems.forEach((item) => observer.observe(item));
};
