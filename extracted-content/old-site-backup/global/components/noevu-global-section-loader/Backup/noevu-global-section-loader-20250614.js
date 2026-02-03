import noevu from "/global/noevu.js";

import "./noevu-global-section-loader.less";

// Main script execution
const log = function () {
  noevu.log("🌍 section →", ...arguments);
};

const CACHE_PREFIX = "ngs-cache:";
const TTL_NORMAL = 24 * 60 * 60 * 1000; // 1 day

const utils = {
  emitEvent(type, detail = {}, elem = document) {
    log("emitEvent", type, detail, elem);
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
  const seen = new Set();
  const promises = [];
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
            log("Script load error", e);
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

  window.Squarespace?.initializeWebsiteComponent(Y, Y.one(c));
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

async function fetchNodes(url, selector) {
  const key = CACHE_PREFIX + url + "::" + (selector || "");
  const now = Date.now();
  const ttl = TTL_NORMAL;

  // try to read cache
  if (!window.DEVMODE) {
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
        console.warn("ngs-cache parse error, refetching", e);
      }
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
  if (el.classList.contains("ngs-load-container")) {
    // already handled
    return;
  }
  // mark as handled
  el.classList.add("ngs-load-container");

  const nodes = await fetchNodes(src, selector);
  const isNaming = el.id?.startsWith("load-");
  const items = isNaming ? nodes : nodes.map(makeWrapper);

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
