// global/horizontal-scroll.js
// Transforms vertical scroll into horizontal for any consecutive #scroll-* sections
import "./horizontal-scroll.less";
import noevu from "/global/noevu.js";

const log = noevu.log;

// ——— Main entry ———
function runHorizontalScroll() {
  log("runHorizontalScroll start");

  if (!document.querySelector("section[id^='scroll-']")) {
    log("↳ no sections found, skipping");
    return;
  }

  // 1) check if we have a ".horizontal-section" on the page, if so, return
  if (document.querySelector(".horizontal-section")) {
    log("↳ we have a '.horizontal-section' on the page, skipping");
    return;
  }

  // 0) bail out in iframes
  if (window.frameElement) {
    log("↳ in iframe – skipping");
    return;
  }

  // 1) collect all <section>
  const allSections = Array.from(document.querySelectorAll("section"));
  log(
    "Found sections:",
    allSections.map((s) => s.id || "<no-id>")
  );

  // 2) group consecutive scroll- sections
  const groups = [];
  let current = [];
  allSections.forEach((sec) => {
    if (sec.id && sec.id.startsWith("scroll-")) {
      log(" ↳ adding to group:", sec.id);
      current.push(sec);
    } else {
      if (current.length > 1) {
        log(
          " ↳ closing group:",
          current.map((s) => s.id)
        );
        groups.push(current.slice());
      }
      current = [];
    }
  });
  if (current.length > 1) {
    log(
      " ↳ closing final group:",
      current.map((s) => s.id)
    );
    groups.push(current.slice());
  }
  log(
    "Groups to setup:",
    groups.map((g) => g.map((s) => s.id))
  );

  // 3) setup each group
  groups.forEach((sections, idx) => {
    log(
      `→ setupGroup #${idx}`,
      sections.map((s) => s.id)
    );
    setupGroup(sections);
  });
}

// ——— Per‐group setup ———
function setupGroup(sections) {
  log(
    "setupGroup:",
    sections.map((s) => s.id)
  );
  const first = sections[0];
  const parent = first.parentNode;

  // wrapper for height
  const wrapper = document.createElement("section");
  wrapper.classList.add("horizontal-section");
  log(" inserting wrapper before", first.id);
  parent.insertBefore(wrapper, first);

  // sticky container
  const container = document.createElement("div");
  container.classList.add("horizontal-container");
  wrapper.appendChild(container);

  // Add horizontal-scroll-section class to each section and move to container
  sections.forEach((sec) => {
    log("  ↳ moving section:", sec.id);
    sec.classList.add("horizontal-scroll-section");
    container.appendChild(sec);
  });

  // initial distance & wrapper height
  let scrollDistance = container.scrollWidth - window.innerWidth;
  // Only set height on desktop
  if (window.innerWidth >= 769) {
    wrapper.style.height = `${scrollDistance + window.innerHeight}px`;
  }
  log(" initial scrollDistance:", scrollDistance);

  // onScroll handler
  const onScroll = () => {
    const offset = window.pageYOffset - wrapper.offsetTop;
    const clamped = Math.min(Math.max(offset, 0), scrollDistance);
    const pct = scrollDistance > 0 ? clamped / scrollDistance : 0;
    log("  ↳ onScroll", { offset, clamped, pct });
    container.style.transform = `translateX(-${pct * scrollDistance}px)`;

    // Add class when scrolling starts, but never remove it
    if (offset > 0) {
      wrapper.classList.add("is-scrolling");
    } else {
      wrapper.classList.remove("is-scrolling");
    }
  };

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", () => {
    scrollDistance = container.scrollWidth - window.innerWidth;
    // Only update height on desktop
    if (window.innerWidth >= 769) {
      wrapper.style.height = `${scrollDistance + window.innerHeight}px`;
    } else {
      wrapper.style.height = ""; // Reset height on mobile
    }
    log("  ↳ resize recalculated scrollDistance:", scrollDistance);
    onScroll();
  });

  // fire once to position correctly if already scrolled
  onScroll();
}


noevu.init(runHorizontalScroll);


export default runHorizontalScroll;
