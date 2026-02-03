/**
 * NOEVU GLOBAL SECTION LOADER
 * ==========================
 *
 * Table of Contents:
 * 1. Imports & Configuration
 * 2. Constants & State
 * 3. Cache Management
 * 4. Core Utilities
 * 5. Script Loading
 * 6. Section Processing
 * 7. DOM Manipulation
 * 8. URL Pattern Matching
 * 9. Configuration Registry
 * 10. Initialization
 */

// ========================
// 1. Imports & Configuration
// ========================
import noevu from "/global/noevu.js";
import localforage from "localforage";
import "./noevu-global-section-loader.less";

// ========================
// 2. Constants & State
// ========================

const pluginVersion = "v5";
const contentModifiedOn = Static.SQUARESPACE_CONTEXT.website.contentModifiedOn;
const TTL = 24 * 60 * 60 * 1000; // 1 day

// Configure localforage
const store = localforage.createInstance({
  name: "noevu-section-loader",
  storeName: "sections",
  description: "Noevu section loader cache",
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
});

// Main script execution
const log = function (...args) {
  noevu.log("🌍 section →", ...args);
};

const handleError = (context, error, data = {}) => {
  console.error(`[NGS] ${context}`, error, data);
  return null;
};

// State
let loadersCount = 0;
let loadedCount = 0;
let cleanupScheduled = false;

// ========================
// 3. Cache Management
// ========================

/**
 * Clean up old cache entries
 * Removes expired, outdated, or invalid cache entries
 */
async function cleanupOldCache() {
  try {
    const now = Date.now();
    let removedCount = 0;

    await store.iterate(async (value, key) => {
      try {
        const isExpired = now - (value.ts || 0) > TTL;
        const isWrongVersion = value.version !== pluginVersion;
        const isOldContent = value.contentModifiedOn !== contentModifiedOn;

        if (isExpired || isWrongVersion || isOldContent) {
          await store.removeItem(key);
          removedCount++;
        }
      } catch (e) {
        await store.removeItem(key);
        removedCount++;
      }
    });

    if (removedCount > 0) {
      log(`Cleaned up ${removedCount} old cache entries`);
    }
  } catch (e) {
    handleError("Cache cleanup failed", e);
  } finally {
    cleanupScheduled = false;
  }
}

// Schedule cleanup with debouncing
function scheduleCleanup() {
  if (!cleanupScheduled) {
    cleanupScheduled = true;
    setTimeout(cleanupOldCache, Math.random() < 0.1 ? 1000 : 5000);
  }
}

// Initial cleanup
setTimeout(scheduleCleanup, 5000);

// ========================
// 4. Core Utilities
// ========================

/**
 * Emit a custom event
 * @param {string} type - Event type
 * @param {Object} detail - Event detail object
 * @param {HTMLElement} elem - Target element (defaults to document)
 */
function emitEvent(type, detail = {}, elem = document) {
  if (!type) return;
  log("emitEvent", type, detail, elem);
  const evt = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
    detail,
  });
  elem.dispatchEvent(evt);
}

function getPropertyValue(el, prop) {
  if (!el || !prop) return "";
  const v = getComputedStyle(el).getPropertyValue(prop).trim().toLowerCase();
  return v === "true"
    ? true
    : v === "false"
    ? false
    : v.replace(/^['"]|['"]$/g, "");
}

const utils = {
  emitEvent,
  getPropertyValue,
  templateVersion: Static.SQUARESPACE_CONTEXT.templateVersion,
  loadScripts: [],

  async getHTML(url, selector = null) {
    try {
      const res = await fetch(url, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!res.ok) throw new Error(`Fetch error ${res.status} from ${url}`);

      const txt = await res.text();
      const frag = document.createRange().createContextualFragment(txt);

      const targetSelector =
        selector ||
        (utils.templateVersion === "7" ? "main > *:first-child" : "#sections");

      const el = frag.querySelector(targetSelector);
      if (!el)
        throw new Error(`Selector "${targetSelector}" not found in ${url}`);

      return selector ? el.outerHTML : el.innerHTML;
    } catch (err) {
      handleError("getHTML failed", err, { url, selector });
      return `<div class="load-plugin ngs-alert">
        <p>Error loading <code>${url}</code>. Check URL/selector.</p>
      </div>`;
    }
  },
};

// ========================
// 5. Script Loading
// ========================

/**
 * Load all queued scripts
 * Handles both inline and external scripts with error handling
 */
async function loadScripts() {
  if (!utils.loadScripts.length) return;

  const seen = new Set();
  const promises = [];

  for (const el of utils.loadScripts) {
    const key = el.src || el.innerHTML;
    if (seen.has(key) || el.type === "application/json") continue;
    seen.add(key);

    promises.push(
      new Promise((resolve, reject) => {
        try {
          if (el.innerHTML.trim()) {
            // Inline script
            const script = document.createElement("script");
            script.type = el.type || "text/javascript";
            script.text = el.innerHTML;
            document.head.appendChild(script);
            document.head.removeChild(script);
            resolve();
          } else {
            // External script
            const script = document.createElement("script");
            script.src = el.src;
            script.async = el.async !== false;
            script.onload = () => resolve();
            script.onerror = (err) => {
              handleError("Script load failed", err, { src: el.src });
              resolve(); // Don't reject to prevent Promise.all from failing
            };
            document.body.appendChild(script);
          }
        } catch (e) {
          handleError("Script initialization failed", e, { src: el.src });
          resolve(); // Continue with other scripts
        }
      })
    );
  }

  try {
    await Promise.allSettled(promises);
    emitEvent("ngsSectionLoader:scriptsLoaded");
  } catch (e) {
    handleError("Script loading failed", e);
  }
}

/*function initializeSectionDividers(container) {
  const dividers = container.querySelectorAll(
    '[data-controller="SectionDivider"]:not([data-divider-initialized])'
  );

  class SectionDivider {
    constructor(node) {
      this.node = node;
      this.section = this.node.closest("section");
      this.display = this.section.querySelector(".section-divider-display");
      this.currentContext = JSON.parse(
        this.section.getAttribute("data-current-context") || "{}"
      );
      this.sectionId = this.section.getAttribute("data-section-id");

      // Initialize references
      this.ref = {
        style: this.display.querySelector("[data-section-divider-style]"),
        block: this.display.querySelector(".section-divider-block"),
        svgClipPath: this.display.querySelector("clipPath"),
        svgClipPathContainer: this.display.querySelector(
          ".section-divider-svg-clip"
        ),
        svgPath: this.display.querySelector(".section-divider-clip"),
        svgPathStroke: this.display.querySelector(".section-divider-stroke"),
      };

      // Initialize ResizeObserver
      try {
        this.resizeObserver = new ResizeObserver(() => {
          if (!this.isDestroyed) {
            this.update();
            this.refreshStyles();
          }
        });
        this.resizeObserver.observe(this.node);
      } catch (e) {
        console.error("Error initializing ResizeObserver:", e);
      }

      // Initial update
      this.update();
      this.refreshStyles();
    }

    update() {
      if (!this.currentContext?.divider) return;

      const { enabled, type, width, height, offset, isFlipX, isFlipY, stroke } =
        this.currentContext.divider;

      if (!enabled) {
        this.node.style.clipPath = "";
        return;
      }

      // Calculate dimensions
      const containerWidth = this.node.offsetWidth;
      const containerHeight = this.node.offsetHeight;
      const dividerHeight = this.parseUnit(height);

      // Generate SVG path
      const path = this.generatePath(
        type,
        containerWidth,
        dividerHeight,
        isFlipX,
        isFlipY
      );

      // Update SVG
      if (this.ref.svgPath) {
        this.ref.svgPath.setAttribute("d", path);
      }
      if (this.ref.svgPathStroke) {
        this.ref.svgPathStroke.setAttribute("d", path);
      }

      // Update clip path
      this.node.style.clipPath = `url(#section-divider-${this.sectionId})`;
    }

    refreshStyles() {
      if (!this.currentContext?.divider) return;

      const { height, stroke } = this.currentContext.divider;
      const dividerHeight = this.parseUnit(height);

      // Update CSS variables
      document.documentElement.style.setProperty(
        `--divider-height-${this.sectionId}`,
        `${dividerHeight}px`
      );

      // Update divider block height
      if (this.ref.block) {
        this.ref.block.style.height = `${dividerHeight}px`;
      }

      // Update stroke styles if needed
      if (stroke && stroke.style !== "none") {
        const strokeWidth = this.parseUnit(stroke.thickness);
        document.documentElement.style.setProperty(
          `--divider-stroke-${this.sectionId}`,
          `${strokeWidth}px`
        );
      }
    }

    parseUnit(value) {
      if (!value) return 0;
      const { value: num, unit } = value;
      switch (unit) {
        case "vw":
          return (window.innerWidth * num) / 100;
        case "vh":
          return (window.innerHeight * num) / 100;
        case "vmin":
          return (Math.min(window.innerWidth, window.innerHeight) * num) / 100;
        case "vmax":
          return (Math.max(window.innerWidth, window.innerHeight) * num) / 100;
        default:
          return num || 0;
      }
    }

    generatePath(type, width, height, isFlipX = false, isFlipY = false) {
      const flipX = isFlipX ? -1 : 1;
      const flipY = isFlipY ? -1 : 1;

      switch (type) {
        case "pointed":
          return `M0,0 L${width / 2},${height * flipY} L${width},0`;
        case "rounded":
          return `M0,0 C${width / 4},${height * flipY} ${(width * 3) / 4},${
            height * flipY
          } ${width},0`;
        case "wavy":
          return `M0,0 C${width / 4},${height * flipY} ${
            (width * 3) / 4
          },0 ${width},${height * flipY}`;
        case "scalloped":
          return `M0,0 Q${width / 4},${height * flipY} ${
            width / 2
          },0 T${width},0`;
        default:
          return `M0,0 L${width},0`;
      }
    }

    destroy() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      this.isDestroyed = true;
    }
  }

  // Initialize dividers
  dividers.forEach((divider) => {
    try {
      divider.setAttribute("data-divider-initialized", "true");
      new SectionDivider(divider);
    } catch (e) {
      console.error("Error initializing section divider:", e);
    }
  });
}*/

const initSQ = (c) => {
  const Squarespace = window.Squarespace;
  const container = window.Y.one(c);

  //initializeSectionDividers(c);

  if (!Squarespace) return;

  const initializers = [
    {
      name: "initializeLayoutBlocks",
      fn: () => {
        try {
          // Bind initializeSummaryV2Block if it exists
          if (Squarespace.initializeSummaryV2Block) {
            Squarespace.initializeSummaryV2Block =
              Squarespace.initializeSummaryV2Block.bind(Squarespace);
          }
          return Squarespace.initializeLayoutBlocks?.(Y, container);
        } catch (e) {
          console.error("Error initializing layout blocks:", e);
          return null;
        }
      },
    },
    {
      name: "initializeNativeVideo",
      fn: () => Squarespace.initializeNativeVideo?.(Y, container),
    },
    {
      name: "initializeImageBlockDynamicElements",
      fn: () => {
        try {
          // Store the original function
          const originalFn = Squarespace.initializeImageBlockDynamicElements;
          if (!originalFn) return null;

          // Create a safe wrapper
          Squarespace.initializeImageBlockDynamicElements = function (ie) {
            // Make sure ie.Squarespace has ResizeEmitter
            if (ie && !ie.Squarespace) {
              ie.Squarespace = window.Y.Squarespace;
            } else if (ie && ie.Squarespace && !ie.Squarespace.ResizeEmitter) {
              ie.Squarespace.ResizeEmitter = window.Y.Squarespace.ResizeEmitter;
            }

            // Now it's safe to call the original function
            return originalFn.apply(this, arguments);
          };

          // Call the wrapped function
          return Squarespace.initializeImageBlockDynamicElements(Y);
        } catch (e) {
          console.error("Error in initializeImageBlockDynamicElements:", e);
          return null;
        }
      },
    },
    {
      name: "initializePageContent",
      fn: () => Squarespace.initializePageContent?.(Y, container),
    },
    {
      name: "initializeAspectRatioBlocks",
      fn: () => Squarespace.initializeAspectRatioBlocks?.(Y),
    },
    {
      name: "initializeContainerStyles",
      fn: (Y, container) => {
        try {
          const domNode = container?.getDOMNode?.();
          if (domNode && domNode.nodeType === Node.ELEMENT_NODE) {
            return Squarespace.initializeContainerStyles?.(domNode);
          }
        } catch (e) {
          console.error("Error in initializeContainerStyles:", e);
        }
        return null;
      },
    },
    /*{
      name: "initializeAudioPlayer",
      fn: () => Squarespace.initializeAudioPlayer?.(Y, container),
    },*/
    {
      name: "initializeCommerce",
      fn: () => Squarespace.initializeCommerce?.(Y, container),
    },
    {
      name: "initializeFormBlocks",
      fn: () => {
        // Pass Y as the first parameter (ie) and an object with config.win as the second parameter (We)
        return Squarespace.initializeFormBlocks?.(Y, {
          config: {
            win: window,
            doc: document,
          },
          Global: Y.Global,
          Squarespace: window.Squarespace,
        });
      },
    },
    {
      name: "initializeAccordionBlock",
      fn: () => {
        // Find all accordion blocks in the document
        const accordionBlocks = document.querySelectorAll(
          ".sqs-block-accordion"
        );
        if (accordionBlocks.length === 0) {
          log("No accordion blocks found to initialize");
          return null;
        }

        // Initialize each accordion block
        let initializedCount = 0;
        accordionBlocks.forEach((block) => {
          try {
            if (Squarespace.initializeAccordionBlock) {
              Squarespace.initializeAccordionBlock(block);
              initializedCount++;
            }
          } catch (e) {
            console.error("Error initializing accordion block:", e);
          }
        });

        log(`Initialized ${initializedCount} accordion blocks`);
        return initializedCount;
      },
    },
    {
      name: "initializeNewsletterBlock",
      fn: () => Squarespace.initializeNewsletterBlock?.(Y, container),
    },
    /*{
      name: "initializeMap",
      fn: () => Squarespace.initializeMap?.(Y, container),
    },*/
    /*{
      name: "initializeMenu",
      fn: () => Squarespace.initializeMenu?.(Y, container),
    },*/
    /*{
      name: "initializeSearch",
      fn: () => Squarespace.initializeSearch?.(Y, container),
    },*/
    {
      name: "initializeSocialLinks",
      fn: () => Squarespace.initializeSocialLinks?.(Y, container),
    },
    /*{
      name: "initializeTabs",
      fn: () => Squarespace.initializeTabs?.(Y, container),
    },*/
    /*{
      name: "initializeTestimonial",
      fn: () => Squarespace.initializeTestimonial?.(Y, container),
    },*/
  ];

  for (const { name, fn } of initializers) {
    try {
      // First check if the function exists
      const funcName = name.replace(/^initialize/, "");
      const func = Squarespace[`initialize${funcName}`];

      if (typeof func === "function") {
        try {
          // Call the function with the parameters it needs
          const result = fn(); // Use the fn from the initializer array
          if (result !== undefined) {
            // If the function returns a result, use it
            log(`✅ Successfully initialized: ${name}`, result);
          } else {
            log(`✅ Successfully initialized: ${name}`);
          }
        } catch (e) {
          console.error(`❌ Runtime error in ${name}:`, e);
        }
      }
    } catch (e) {
      console.error(`⚠️ Unexpected error processing ${name}:`, e);
    }
  }
};

const initCommerce = (c) => {
  if (!c.querySelector(".sqs-add-to-cart-button")) return;
  document.querySelectorAll(".sqs-add-to-cart-button").forEach((b) => {
    const clone = b.cloneNode(true);
    b.parentNode.replaceChild(clone, b);
  });
  Y.Squarespace.Commerce.initializeCommerce();
};
const initWM = () => window.wmListSectionSync?.init();
const pushSQSScripts = (c) => {
  if (
    c.querySelector(".sqs-video-background-native") ||
    c.querySelector(".gallery-section") ||
    c.querySelector(".user-items-list-section") ||
    c.querySelector(".background-fx-canvas") ||
    c.querySelector(".ProductItem-summary")
  ) {
    const sqs = document.querySelector(
      'body > [src*="static1.squarespace.com/static/vta"]'
    );
    if (sqs) utils.loadScripts.push(sqs);
  }
  const shapes = c.querySelectorAll(
    '[data-definition-name="website.components.shape"]'
  );
  shapes.forEach((shape, index) => {
    const shapeId = `ngs-shape-${c.id}-${index}`;
    if (!document.getElementById(shapeId)) {
      const style = document.createElement("style");
      style.id = shapeId;

      // Get shape-specific styles or use defaults
      const bgColor =
        shape.getAttribute("data-background-color") ||
        "var(--shape-block-background-color)";
      const strokeColor =
        shape.getAttribute("data-stroke-color") ||
        "var(--shape-block-stroke-color)";

      style.textContent = `
      #${shape.id} svg.sqs-shape {
        fill: ${bgColor};
        stroke: ${strokeColor};
      }
      #${shape.id} .sqs-shape-rectangle {
        background: ${bgColor};
        border-color: ${strokeColor};
      }
      #${shape.id} .sqs-block-content,
      #${shape.id} .sqs-block-alignment-wrapper {
        height: 100%;
      }
      #${shape.id} .sqs-shape {
        position: absolute;
        display: block;
        overflow: visible;
      }
      #${shape.id} .sqs-shape-block-container {
        position: relative;
        color: ${
          shape.getAttribute("data-dropshadow-color") ||
          "var(--shape-block-dropshadow-color)"
        };
      }
    `;
      document.head.appendChild(style);
    }
  });
};
const loadImages = (c) => {
  c.querySelectorAll("img.section-background:not(.ngs-image-loaded)").forEach(
    (img) => {
      img.classList.add("ngs-image-loaded");
      const [x, y] = img.dataset.imageFocalPoint
        .split(",")
        .map((n) => parseFloat(n) * 100 + "%");
      img.style.setProperty("--x", x);
      img.style.setProperty("--y", y);
      img.src = img.dataset.src;
    }
  );
};

// ========================
// 6. Section Processing
// ========================

/**
 * Process a loaded section
 * @param {HTMLElement} item - The section element to process
 * @param {string} url - Source URL of the section
 * @param {string} selector - CSS selector used to extract the section
 */
async function processSection(item, url, selector) {
  try {
    // Initialize components
    await Promise.all([
      Promise.resolve().then(() => initSQ(item)),
      Promise.resolve().then(() => initWM()),
      Promise.resolve().then(() => initCommerce(item)),
    ]);

    // Process scripts
    const scripts = Array.from(item.querySelectorAll("script"));
    scripts.forEach((s) => utils.loadScripts.push(s));
    await loadScripts();

    // Process other elements
    await Promise.all([pushSQSScripts(item), loadImages(item)]);

    // Mark as loaded after everything is done
    item.classList.add("ngs-section-loaded");

    // Emit event to notify other components
    emitEvent("ngs:section-loaded", { block: item, source: url, selector });
  } catch (error) {
    console.error("Error processing section:", error);
    // Optionally add an error class
    item.classList.add("ngs-section-error");
  }
}

// Schedule occasional cleanup
scheduleCleanup();

async function fetchNodes(url, selector) {
  const key = `${url}::${selector || ""}`;
  const now = Date.now();
  let html;

  try {
    // Try to read from cache
    if (!window.DEVMODE) {
      try {
        const cached = await store.getItem(key);
        if (cached) {
          const {
            ts,
            html: cachedHtml,
            version,
            contentModifiedOn: cachedContentModifiedOn,
          } = cached;
          const isCacheValid =
            version === pluginVersion &&
            cachedContentModifiedOn === contentModifiedOn &&
            now - ts < TTL;

          if (isCacheValid) {
            html = cachedHtml;
            const frag = document.createRange().createContextualFragment(html);
            if (selector) {
              return Array.from(frag.querySelectorAll(selector)).map((n) =>
                n.cloneNode(true)
              );
            } else {
              const wrap = frag.querySelector("#sections");
              if (!wrap) {
                console.warn(
                  "No #sections element found in cached HTML, refetching"
                );
                throw new Error("Invalid cached HTML structure");
              }
              return Array.from(wrap.querySelectorAll("section")).map((s) =>
                s.cloneNode(true)
              );
            }
          }
        }
      } catch (e) {
        console.warn("Cache read error, refetching", e);
      }
    }

    // Cache miss or expired → fetch fresh
    html = await utils.getHTML(url, selector);

    // Store in cache (fire and forget)
    store
      .setItem(key, {
        ts: now,
        html,
        version: pluginVersion,
        contentModifiedOn,
      })
      .catch((e) => console.warn("Failed to cache response:", e));
  } catch (e) {
    console.error("Error in fetchNodes:", e);
    throw e;
  }

  const frag = document.createRange().createContextualFragment(html);
  if (selector) {
    return Array.from(frag.querySelectorAll(selector)).map((n) =>
      n.cloneNode(true)
    );
  } else {
    // instead of querying "#sections" blindly…
    const wrap = frag.querySelector("#sections") || frag;
    return Array.from(wrap.querySelectorAll("section")).map((s) =>
      s.cloneNode(true)
    );
  }
}

function makeWrapper(node) {
  const w = document.createElement("div");
  w.classList.add("ngs-load-container");
  w.appendChild(node);
  return w;
}
// ========================
// 7. DOM Manipulation
// ========================

/**
 * DOM insertion methods
 * Defines various ways to insert content relative to a target element
 */
const inserters = {
  before: (w, el) => el.parentNode.insertBefore(w, el),
  after: (w, el) => el.parentNode.insertBefore(w, el.nextSibling),
  prepend: (w, el) => el.insertAdjacentElement("afterbegin", w),
  append: (w, el) => el.insertAdjacentElement("beforeend", w),
  replace: (w, el) => {
    el.parentNode.insertBefore(w, el);
    el.remove();
  },
};

const loadedElements = new WeakSet();

async function loadSection(
  el,
  { src, selector = null, placement = "replace" }
) {
  if (loadedElements.has(el)) return;
  loadedElements.add(el);

  const nodes = await fetchNodes(src, selector);
  const isNaming = el.id?.startsWith("load-");
  const items = isNaming ? nodes : nodes.map(makeWrapper);

  // Mark all items as loaded
  items.forEach((item) => loadedElements.add(item));

  if (placement === "replace") {
    const parent = el.parentNode;
    items.forEach((item) => parent.insertBefore(item, el));
    parent.removeChild(el);
  } else {
    const fn = inserters[placement] || inserters.replace;
    items.forEach((item) => fn(item, el));
  }

  items.forEach((item) => processSection(item, src, selector));
}

//
// ─── URL PATTERN MATCHER ───────────────────────────────────────────────────────
//
// ========================
// 8. URL Pattern Matching
// ========================

/**
 * Match URL path against a pattern
 * Supports exact matches and wildcard patterns (e.g., "/tour/*")
 * @param {string} path - Path to test
 * @param {string} pattern - Pattern to match against
 * @returns {boolean} True if path matches pattern
 */
function matchesPattern(path, pattern) {
  pattern = pattern.trim();
  // wildcard at end? e.g. "/tour/*"
  if (pattern.endsWith("/*")) {
    const base = pattern.slice(0, -2); // remove "/*"
    return path === base || path.startsWith(base + "/");
  }
  // exact match
  return path === pattern;
}

//
// ─── CONFIG REGISTRY ──────────────────────────────────────────────────────────
//
// ========================
// 9. Configuration Registry
// ========================

/**
 * Manages loader configurations and overrides
 * Allows programmatic control of the section loading behavior
 */
class ConfigRegistry {
  constructor() {
    this._overrides = [];
  }

  // allow programmatic overrides as before
  register(config) {
    if (typeof config !== "object") return;
    this._overrides.push(config);
    noevu.log(
      "noevu-global-section-loader → Registered loader override",
      config
    );
    if (document.readyState !== "loading") initAll();
  }

  get() {
    const path = window.location.pathname;
    const merged = {};

    // take loaderConfig array first, then any programmatic overrides
    const groups = [];
    if (Array.isArray(window.loaderConfig)) {
      groups.push(...window.loaderConfig);
    }
    // in case someone called setLoaderConfig({ ... }) with an object,
    // treat that as one group with no target/not filtering
    this._overrides.forEach((cfg) => {
      if (Array.isArray(cfg)) groups.push(...cfg);
      else if (typeof cfg === "object") groups.push(cfg);
    });

    // iterate each group in order, merging their selectors if active
    for (const group of groups) {
      const { target, not, ...sections } = group;

      // parse CSV of patterns, if provided
      const targets = target ? target.split(",").map((s) => s.trim()) : null;
      const nots = not ? not.split(",").map((s) => s.trim()) : null;

      // skip if a target list exists but none match
      if (targets && !targets.some((p) => matchesPattern(path, p))) continue;
      // skip if a not list exists and any matches
      if (nots && nots.some((p) => matchesPattern(path, p))) continue;

      // merge this group's selectors into the final map
      Object.assign(merged, sections);
    }

    return merged;
  }
}

// ========================
// 10. Initialization
// ========================

// Initialize global state
const configRegistry = new ConfigRegistry();

export function setLoaderConfig(cfg) {
  configRegistry.register(cfg);
}

// Make the function available globally
window.noevuSectionLoader = { setLoaderConfig };

//
// ─── GATHER + APPLY CONFIGS ───────────────────────────────────────────────────
//
function gatherConfigs() {
  const items = [];

  // 1) data-ngs-load attributes
  document.querySelectorAll("[data-ngs-load]").forEach((el) => {
    const [src, ...sel] = el.getAttribute("data-ngs-load").split(" ");
    items.push([el, { src, selector: sel.join(" ") || null }]);
  });

  // 2) #load-… ids
  document.querySelectorAll('[id^="load-"]').forEach((el) => {
    const parts = el.id.replace(/^load-/, "").split("-");
    const src = "/" + parts.shift();
    const selector = parts.length ? `#${parts.join("-")}` : null;
    items.push([el, { src, selector }]);
  });

  // 3) window.loaderConfig array + overrides
  const cfgMap = configRegistry.get();
  Object.entries(cfgMap).forEach(([sel, cfg]) => {
    document.querySelectorAll(sel).forEach((el) => {
      const obj =
        typeof cfg === "string"
          ? { src: cfg, selector: null, placement: "replace" }
          : {
              src: cfg.source || cfg.src,
              selector: cfg.selector || null,
              placement: cfg.placement || "replace",
            };
      items.push([el, obj]);
    });
  });

  return items;
}

async function initAll() {
  const list = gatherConfigs();
  utils.loaders = list.length;
  utils.loaded = 0;
  list.forEach(([el, cfg]) => {
    if (!el.classList.contains("ngs-load-container")) {
      loadSection(el, cfg).catch((err) => console.error(err));
    }
  });
}

noevu.init(initAll, true);
