import { log } from "/global/noevu.js";
import init3dCards from "/global/components/cards3d/cards3d.js";
import initSwipers from "../swiper/swiper.js";

/*export const loaderConfig = [
  {
    // Global configuration options
    not: "/touren/p/gutscheine",

    // Section-specific configurations
    "article.ProductItem .ProductItem-summary + section:not(.ProductItem-additional)":
      {
        source: "/tour",
        selector: "#infos",
        placement: "before",
      },
    ".ProductItem-quantity-add-to-cart": {
      source: "/tour",
      selector: "#form",
      placement: "replace",
    },
  },
  {
    target: "/touren/p/gutscheine",

    // Section-specific configurations
    "article.ProductItem .ProductItem-summary + section:not(.ProductItem-additional)":
      {
        source: "/gutscheine",
        selector: "#infos",
        placement: "before",
      },
    ".ProductItem-quantity-add-to-cart": {
      source: "/gutscheine",
      selector: "#form",
      placement: "replace",
    },
  },
];
/***/

export const loaderConfig = [
  {
    target: "/blog",
    "article section:last-child": {
      source: "/projects",
      selector: "",
      placement: "after",
    },
  },
];

window.addEventListener("ngs:section-loaded", function (event) {
  const { block, source, selector } = event.detail;
  log("👟 ngs:section-loaded – running init", block, source, selector);

  init3dCards(block);
  initSwipers(block);
});
