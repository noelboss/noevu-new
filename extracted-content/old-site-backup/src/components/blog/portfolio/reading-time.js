import { addReadingTimeToItem, getCachedReadingTime } from "../utils/reading-time-utils";

const log = window.noevu?.log || console.log;

/**
 * Initialize reading time for portfolio summary items with caching support
 * @returns {void}
 */
export const initReadingTimeForSummaryItems = () => {
  const summaryItems = document.querySelectorAll(".summary-item");
  if (!summaryItems.length) {
    log("No portfolio summary items found for reading time");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const summaryItem = entry.target;
        
        // Get the post URL for caching
        const postLink = summaryItem
          .querySelector(".summary-title a")
          ?.getAttribute("href");
        
        if (!postLink) return;

        // Check if we already processed this item
        if (summaryItem.dataset.readingTimeProcessed) return;
        summaryItem.dataset.readingTimeProcessed = 'true';

        // Try to get from cache first
        const cachedReadingTime = getCachedReadingTime(postLink);
        if (cachedReadingTime !== null) {
          addReadingTimeToItem(
            summaryItem,
            '', // Content not needed when using cache
            (container, label) => {
              const metadataContainer = container.querySelector(".summary-metadata-container");
              if (metadataContainer) {
                metadataContainer.appendChild(label);
              } else {
                // Fallback to excerpt if metadata container not found
                const excerpt = container.querySelector(".summary-excerpt");
                if (excerpt) {
                  excerpt.insertAdjacentElement("afterend", label);
                }
              }
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
              summaryItem,
              blogPostData.item.body,
              (container, label) => {
                const metadataContainer = container.querySelector(".summary-metadata-container");
                if (metadataContainer) {
                  metadataContainer.appendChild(label);
                } else {
                  // Fallback to excerpt if metadata container not found
                  const excerpt = container.querySelector(".summary-excerpt");
                  if (excerpt) {
                    excerpt.insertAdjacentElement("afterend", label);
                  }
                }
              },
              postLink // Pass URL for caching
            );
          })
          .catch((error) => {
            console.error("Error fetching blog content:", error);
            // Fallback to just calculating from excerpt if available
            const excerpt = summaryItem.querySelector(".summary-excerpt");
            if (excerpt) {
              addReadingTimeToItem(
                summaryItem,
                excerpt.textContent || '',
                (container, label) => {
                  const metadataContainer = container.querySelector(".summary-metadata-container");
                  if (metadataContainer) {
                    metadataContainer.appendChild(label);
                  } else {
                    // Fallback to excerpt if metadata container not found
                    excerpt.insertAdjacentElement("afterend", label);
                  }
                },
                postLink
              );
            }
          });
      });
    },
    { rootMargin: "100px 0px", threshold: 0.1 }
  );

  summaryItems.forEach((item) => observer.observe(item));
};
