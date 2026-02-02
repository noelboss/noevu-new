import "./swiper.less";

import noevu from "/global/noevu.js";
const log = noevu.log;

// core version + navigation, pagination modules:
//import Swiper from "swiper/bundle";
import Swiper from "swiper";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/pagination";

const initSwipers = (root = document, customSwipers = null) => {
  if (noevu.isEditing()) return;

  log("🛝 init on:", root, customSwipers);

  // Use provided swipers or default to the   standard configuration
  const swipers =
    Array.isArray(customSwipers) && customSwipers.length
      ? customSwipers
      : [
          // lists at the bottom of pages
          {
            containers: (() => {
              // Otherwise, get containers from both sections
              return root.querySelectorAll(
                ".sqs-block-summary-v2:not([data-block-json*='no-swiper']) .summary-block-setting-design-autogrid > .summary-item-list-container, .sqs-block-summary-v2:not([data-block-json*='no-swiper']) .summary-block-setting-design-carousel > .summary-item-list-container"
              );
            })(),
            getList(container) {
              return container?.querySelector(".summary-item-list");
            },
            getItems(list) {
              return list
                ? Array.from(list.querySelectorAll(".summary-item"))
                : [];
            },
            itemSetup: function (item) {
              const link = item
                .querySelector(".summary-title a")
                ?.getAttribute("href");
              if (link) {
                item
                  .querySelector(".summary-content")
                  ?.insertAdjacentHTML(
                    "beforeend",
                    `<a href="${link}" data-material-icon="arrow_outward" class="readmore"></a>`
                  );
              }
            },
            setupContainer(swiper) {
              // Create and append pagination element
              const paginationEl = document.createElement("div");
              paginationEl.className = "swiper-pagination";
              swiper.container.appendChild(paginationEl);

              // Configure pagination if needed
              if (swiper.settings.pagination) {
                swiper.settings.pagination.el = paginationEl;
              }
            },
            settings: {
              centeredSlides: false,
              loop: true,
              pagination: {
                clickable: true,
                type: "bullets",
              },
              slidesPerView: 1,
              spaceBetween: 10,
              breakpoints: {
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                900: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                769: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
              },
              keyboard: { enabled: true, onlyInViewport: true },
              modules: [Pagination, Keyboard],
            },
          },
          // single featured list
          /*{
            containers: (() => {
              // If root is a specific section (blog/portfolio), get its containers directly
              if (["featured"].includes(root.id)) {
                return root.querySelectorAll(".summary-item-list-container");
              }

              // Otherwise, get containers from both sections
              return root.querySelectorAll(
                "#featured .summary-item-list-container"
              );
            })(),
            getList(container) {
              return container?.querySelector(".summary-item-list");
            },
            getItems(list) {
              return list
                ? Array.from(list.querySelectorAll(".summary-item"))
                : [];
            },
            itemSetup: function (item) {
              const link = item
                .querySelector(".summary-title a")
                ?.getAttribute("href");
              if (link) {
                item
                  .querySelector(".summary-content")
                  ?.insertAdjacentHTML(
                    "beforeend",
                    `<a href="${link}" data-material-icon="arrow_outward" class="readmore"></a>`
                  );
              }
            },
            setupContainer(swiper) {
              // Create and append pagination element
              const paginationEl = document.createElement("div");
              paginationEl.className = "swiper-pagination";
              swiper.container.appendChild(paginationEl);

              // Configure pagination if needed
              if (swiper.settings.pagination) {
                swiper.settings.pagination.el = paginationEl;
              }
            },
            settings: {
              centeredSlides: true,
              loop: true,
              pagination: {
                clickable: true,
                type: "bullets",
              },
              slidesPerView: 1,
              spaceBetween: 0,
              keyboard: { enabled: true, onlyInViewport: true },
              modules: [Pagination, Keyboard],
            },
          },
          */
          /*  // Blog overview 
          {
            containers: root.querySelectorAll(
              ".blog-item-wrapper .sqs-gallery-block-grid"
            ),
            getList(container) {
              return container?.querySelector(".sqs-gallery-design-grid");
            },
            getItems(list) {
              return list
                ? Array.from(
                    list.querySelectorAll(".sqs-gallery-design-grid-slide")
                  )
                : [];
            },
            setupContainer(swiper) {
              // Create and append pagination element
              const paginationEl = document.createElement("div");
              paginationEl.className = "swiper-pagination";
              swiper.container.appendChild(paginationEl);

              // Configure pagination if needed
              if (swiper.settings.pagination) {
                swiper.settings.pagination.el = paginationEl;
              }
            },
            settings: {
              slidesPerView: 1,
              spaceBetween: 10,
              breakpoints: {
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                900: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                769: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
              },
              centeredSlides: true,
              initialSlide: 1,
              loop: true,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
              pagination: {
                clickable: true,
                type: "bullets",
              },

              keyboard: { enabled: true, onlyInViewport: true },

              modules: [Pagination, Autoplay, Keyboard],
            },
          },*/
        ];

  // Define your target sections with their specific settings

  swipers.forEach((swiper) => {
    const {
      containers,
      settings,
      getList,
      getItems,
      setupContainer,
      itemSetup,
    } = swiper;
    // Skip if container, list, or items are not found
    log("🛝 container: ", containers);
    // Skip if no containers found
    if (!containers || !containers.length) return;

    // Iterate over each container
    containers.forEach((container) => {
      // Skip if container is already initialized
      if (!container || container.classList.contains("swiper")) return;

      try {
        // Get list and items using separate methods
        const list = getList?.(container);
        if (!list) return;

        const items = getItems?.(list) || [];

        // Add Swiper classes
        container.classList.add("swiper");
        list.classList.add("swiper-wrapper");

        // Create a swiper instance for this container
        const instance = { container, settings: { ...swiper.settings } };
        setupContainer?.(instance);

        // Initialize slides
        items.forEach((item) => {
          item.classList.add("swiper-slide");
          item.style.removeProperty("style");
          itemSetup?.(item);
        });

        // Initialize Swiper with settings
        new Swiper(container, {
          ...instance.settings, // Use the potentially modified settings

          grabCursor: true,
          touchEventsTarget: "container",
        });
      } catch (error) {
        log("🛝⚠️ Error initializing swiper:", error);
      }
    });
  });
};

noevu.init(initSwipers);

export default initSwipers;
