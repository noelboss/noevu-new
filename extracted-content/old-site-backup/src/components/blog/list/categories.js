import noevu from "/global/noevu.js";
import { getElement } from "../utils/dom-helpers";
import {
  processCategories,
  createCategoriesContainer,
} from "../utils/categories";

const log = noevu.log;

/**
 * Initialize blog list categories
 */
export const initBlogListCategories = () => {
  try {
    log("Initializing blog list categories...");

    // Find all blog meta sections
    const blogMetaSections = document.querySelectorAll(".blog-meta-section");
    if (!blogMetaSections.length) {
      log("No blog meta sections found");
      return;
    }

    blogMetaSections.forEach((section) => {
      // Find the categories list in the primary section
      const primarySection = section.querySelector(".blog-meta-primary");
      const categoriesList = primarySection?.querySelector(
        ".blog-categories-list"
      );

      if (!categoriesList) {
        log("No categories list found in primary section");
        return;
      }

      // Process categories using shared utility
      const categoryLinks = categoriesList.querySelectorAll(".blog-categories");
      const categories = processCategories(categoryLinks);

      if (!categories.length) {
        log("No categories to process");
        return;
      }

      // Create and append category groups
      const container = createCategoriesContainer(categories);

      // Replace the original categories list with our new structure
      categoriesList.replaceWith(container);

      // Remove the duplicate categories from the secondary section if it exists
      const secondarySection = section.querySelector(".blog-meta-secondary");
      if (secondarySection) {
        const secondaryCategories = secondarySection.querySelector(
          ".blog-categories-list"
        );
        if (secondaryCategories) {
          secondaryCategories.remove();
        }
      }
    });

    log("Blog list categories initialized");
  } catch (error) {
    console.error("Error initializing blog list categories:", error);
    log(`Blog list categories error: ${error.message}`);
  }
};
