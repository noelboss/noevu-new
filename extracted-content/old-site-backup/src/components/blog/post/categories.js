import { getElement } from "../utils/dom-helpers";
import noevu from "/global/noevu.js";
import { processCategories, createCategoriesContainer } from "../utils/categories";

const log = noevu.log;

/**
 * Handles blog post categories formatting and display
 */
export const initCategories = () => {
  const blogMetaItem = getElement(".blog-meta-item.blog-meta-item--categories");
  if (!blogMetaItem) {
    log("No category meta item found");
    return;
  }

  // Get the top container for later use
  const topContainer = getElement(".blog-item-top-wrapper");
  if (!topContainer) {
    log("No top container found for category handling");
    return;
  }

  try {
    // Categorize links
    const categoryLinks = blogMetaItem.querySelectorAll("a");
    log(`Found ${categoryLinks.length} category links`);

    // Process categories using shared utility
    const categories = processCategories(categoryLinks);
    if (categories.length === 0) {
      log("No categories to process");
      return;
    }

    // Clear the container
    blogMetaItem.innerHTML = "";

    // Create and append category groups
    const container = createCategoriesContainer(categories);
    blogMetaItem.appendChild(container);

    // Move categories to the top of the post
    topContainer.prepend(blogMetaItem);
    log("Categories processed and moved to top of post");

  } catch (error) {
    console.error("Error processing categories:", error);
    log(`Category processing error: ${error.message}`);
  }
};
