import noevu from "/global/noevu.js";

import "./noevu-global-section-loader.less";

const log = noevu.log;

// Enable debug mode

const utils = {
  emitEvent(type, detail = {}, elem = document) {
    if (!type) return;
    const evt = new CustomEvent(type, {
      bubbles: true,
      cancelable: true,
      detail,
    });
    elem.dispatchEvent(evt);
  },
  async getHTML(url, selector = null) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw `Fetch error ${res.status} from ${url}`;
      const txt = await res.text();
      const frag = document.createRange().createContextualFragment(txt);
      if (!selector) {
        selector =
          utils.templateVersion === "7" ? "main > *:first-child" : "#sections";
      }
      const el = frag.querySelector(selector);
      if (!el) throw `Selector "${selector}" not found in ${url}`;
      return arguments[1] ? el.outerHTML : el.innerHTML;
    } catch (err) {
      console.error(err);
      log("getHTML error", err, { url, selector });
      return `<div class="load-plugin ngs-alert">
        <p>Error loading <code>${url}</code>. Check URL/selector.</p>
      </div>`;
    }
  },
  getPropertyValue(el, prop) {
    let v = getComputedStyle(el).getPropertyValue(prop).trim().toLowerCase();
    if (v === "true") return true;
    if (v === "false") return false;
    return v.replace(/^['"]|['"]$/g, "");
  },
  loaders: 0,
  loaded: 0,
  templateVersion: Static.SQUARESPACE_CONTEXT.templateVersion,
  loadScripts: [],
};

const loadScripts = () => {
  if (!utils.loadScripts.length) return;
  const seen = new Set(),
    promises = [];
  for (const el of utils.loadScripts) {
    const key = el.src || el.innerHTML;
    if (seen.has(key) || el.type === "application/json") continue;
    seen.add(key);
    promises.push(
      new Promise((res, rej) => {
        if (el.innerHTML.trim()) {
          try {
            const script = document.createElement("script");
            script.type = el.type || "text/javascript";
            script.text = el.innerHTML;
            document.head.appendChild(script);
            document.head.removeChild(script);
            res();
          } catch (e) {
            console.error(e);
            rej(e);
          }
        } else {
          const s = document.createElement("script");
          s.src = el.src;
          s.async = el.async;
          s.onload = res;
          s.onerror = rej;
          document.body.appendChild(s);
        }
      })
    );
  }
  Promise.allSettled(promises)
    .then(() => utils.emitEvent("ngsSectionLoader:scriptsLoaded"))
    .catch((e) => console.error("Script load error", e));
};

const initSQ = (c) => {
  window.Squarespace?.initializeLayoutBlocks(Y, Y.one(c));
  window.Squarespace?.initializeNativeVideo(Y, Y.one(c));
  window.Squarespace?.initializePageContent(Y, Y.one(c));
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
  if (
    c.querySelector('[data-definition-name="website.components.shape"]') &&
    !document.querySelector("#ngs-shape-block-styles")
  ) {
    const style = document.createElement("style");
    style.id = "ngs-shape-block-styles";
    style.textContent = `
      .sqs-block[data-definition-name="website.components.shape"] svg.sqs-shape{fill:var(--shape-block-background-color);stroke:var(--shape-block-stroke-color)}
      .sqs-block[data-definition-name="website.components.shape"] .sqs-shape-rectangle{background:var(--shape-block-background-color);border-color:var(--shape-block-stroke-color)}
      .sqs-block[data-definition-name="website.components.shape"] .sqs-block-content,
      .sqs-block[data-definition-name="website.components.shape"] .sqs-block-alignment-wrapper{height:100%}
      .sqs-block[data-definition-name="website.components.shape"] .sqs-shape{position:absolute;display:block;overflow:visible}
      .sqs-block[data-definition-name="website.components.shape"] .sqs-shape-block-container{position:relative;color:var(--shape-block-dropshadow-color)}
    `;
    document.head.appendChild(style);
  }
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

function processSection(container, url, selector) {
  initSQ(container);
  initWM();
  initCommerce(container);
  container
    .querySelectorAll("script")
    .forEach((s) => utils.loadScripts.push(s));
  pushSQSScripts(container);
  loadImages(container);
  if (++utils.loaded === utils.loaders) loadScripts();
  utils.emitEvent("ngsSectionLoader:loaded", {
    block: container,
    source: url,
    selector,
  });
}

const CACHE_PREFIX = "ngs-cache:";
const TTL_NORMAL = 24 * 60 * 60 * 1000; // 1 day
const TTL_DEV = 1 * 60 * 1000; // 1 minute

async function fetchNodes(url, selector) {
  const key = CACHE_PREFIX + url + "::" + (selector || "");
  const now = Date.now();
  const ttl = window.DEVMODE ? TTL_DEV : TTL_NORMAL;

  // try to read cache
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      const { ts, html } = JSON.parse(raw);
      if (now - ts < ttl) {
        // still fresh
        const frag = document.createRange().createContextualFragment(html);
        if (selector) {
          return Array.from(frag.querySelectorAll(selector)).map((n) =>
            n.cloneNode(true)
          );
        } else {
          const wrap = frag.querySelector("#sections");
          return Array.from(wrap.querySelectorAll("section")).map((s) =>
            s.cloneNode(true)
          );
        }
      }
    } catch (e) {
      // invalid JSON? fall through to re-fetch
      log("ngs-cache parse error, refetching", e);
    }
  }

  // cache miss or expired → fetch fresh
  const html = await utils.getHTML(url, selector);
  try {
    localStorage.setItem(key, JSON.stringify({ ts: now, html }));
  } catch (_) {
    /* quota exceeded? ignore */
  }

  const frag = document.createRange().createContextualFragment(html);
  if (selector) {
    return Array.from(frag.querySelectorAll(selector)).map((n) =>
      n.cloneNode(true)
    );
  } else {
    const wrap = frag.querySelector("#sections");
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

async function loadSection(
  el,
  { src, selector = null, placement = "replace" }
) {
  const nodes = await fetchNodes(src, selector);
  const items = nodes.map(makeWrapper);
  const insert = inserters[placement] || inserters.replace;
  items.forEach((item) => insert(item, el));
  items.forEach((item) => processSection(item, src, selector));
}

class ConfigRegistry {
  constructor() {
    this._config = {};
  }
  register(config) {
    if (!config || typeof config !== "object") return;
    this._config = config;
    log("Registered loader config", config);
    if (document.readyState !== "loading") initAll();
  }
  get() {
    return this._config;
  }
}

const configRegistry = new ConfigRegistry();
export function setLoaderConfig(cfg) {
  log("setLoaderConfig", cfg);
  configRegistry.register(cfg);
}

function gatherConfigs() {
  const items = [];
  const currentSlug = window.location.pathname;

  // Helper function to check if current slug matches a pattern
  const matchesSlug = (pattern) => {
    if (!pattern) return true; // If no pattern specified, allow all

    // Split patterns by comma and check each one
    return pattern.split(",").some((p) => {
      // Remove whitespace and trim
      p = p.trim();

      // Handle wildcard patterns
      if (p.endsWith("/*")) {
        const base = p.slice(0, -2);
        return currentSlug.startsWith(base);
      }

      // Exact match
      return currentSlug === p;
    });
  };

  // Process data attribute configurations
  document.querySelectorAll("[data-ngs-load]").forEach((el) => {
    const [src, ...sel] = el.getAttribute("data-ngs-load").split(" ");
    items.push([el, { src, selector: sel.join(" ") || null }]);
  });

  // Process ID-based configurations
  document.querySelectorAll('[id^="load-"]').forEach((el) => {
    const parts = el.id.replace(/^load-/, "").split("-");
    const slug = parts.shift();
    const selector = parts.length ? `#${parts.join("-")}` : null;
    items.push([el, { src: `/${slug}`, selector }]);
  });

  // Process configuration object
  const configArray = Array.isArray(configRegistry.get())
    ? configRegistry.get()
    : [configRegistry.get()];

  configArray.forEach((configGroup) => {
    log("Processing config group", configGroup);

    // Check if this group should be applied to the current page
    if (configGroup.target && !matchesSlug(configGroup.target)) {
      log(`Config group skipped: current slug doesn't match target patterns`);
      return;
    }

    if (configGroup.not && matchesSlug(configGroup.not)) {
      log(`Config group skipped: current slug matches exclusion patterns`);
      return;
    }

    // Process each selector in the group
    Object.entries(configGroup).forEach(([sel, val]) => {
      if (sel === "target" || sel === "not") return; // Skip the target/not patterns

      log("Processing selector", sel, val);

      // Each selector has its own config
      const config = {
        src: val.source || val.src,
        selector: val.selector,
        placement: val.placement || "replace",
      };

      document.querySelectorAll(sel).forEach((el) => {
        items.push([el, config]);
      });
    });
  });

  return items;
}

async function initAll() {
  const list = gatherConfigs();
  utils.loaders = list.length;
  utils.loaded = 0;
  list.forEach(([el, cfg]) => {
    // Only add ngs-load-container if placement is append or prepend
    if (cfg.placement === "append" || cfg.placement === "prepend") {
      el.classList.add("ngs-load-container");
    }
    loadSection(el, cfg).catch((err) => console.error(err));
  });
}

/*if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}
window.addEventListener("mercury:load", initAll);*/

noevu.init(initAll);
