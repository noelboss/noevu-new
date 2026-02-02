import "./portfolio/list.less";

// Import components
import { initPortfolioListCategories } from "./portfolio/categories";
import { initReadingTimeForSummaryItems } from "./portfolio/reading-time";

// Initialize blog functionality
const initBlogPortfolioSummaries = () => {
  // Initialize reading time for summary items
  // initReadingTimeForSummaryItems();

  // Initialize portfolio list categories
  initPortfolioListCategories();
};

window.customLazySummaries = {
  general: {
    allItemsRenderedFunction: function () {
      initBlogPortfolioSummaries();
      initReadingTimeForSummaryItems();
    },
  },
};
