import noevu from "/global/noevu.js";
import "./categories.less";
import {
  processCategories,
  createCategoriesContainer,
} from "../utils/categories";

const log = noevu.log;

/**
 * Initialize portfolio list categories for summary items
 */
export const initPortfolioListCategories = () => {
  try {
    log("Initializing portfolio list categories...");

    // Find all summary items with categories
    const summaryItems = document.querySelectorAll("#artikel .summary-item");

    if (!summaryItems.length) return log("No portfolio summary items found");

    summaryItems.forEach((summaryItem) => {
      // Find the categories container in the summary item
      const categoriesContainer = summaryItem.querySelector(
        ".summary-metadata-item--cats"
      );

      if (!categoriesContainer)
        return log("No categories container found in summary item");

      const categoryLinks = categoriesContainer.querySelectorAll("a");

      if (!categoryLinks.length)
        return log("No category links found in summary item");

      // Process categories using shared utility
      const categories = processCategories(categoryLinks);
      if (!categories.length) return log("No categories to process");

      // Create and append category groups
      const container = createCategoriesContainer(categories);

      // Replace the original categories with our new structure
      categoriesContainer.replaceWith(container);

      // Check if there are any duplicate categories in the secondary section
      const secondarySection = summaryItem.querySelector(
        ".summary-metadata--secondary .summary-metadata-item--cats"
      );

      if (secondarySection) {
        secondarySection.remove();
      }
    });

    log("Portfolio list categories initialized");
  } catch (error) {
    console.error("Error initializing portfolio list categories:", error);
    log(`Portfolio list categories error: ${error.message}`);
  }
};
