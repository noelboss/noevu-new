import "./timeline.less";

// --- Default configuration values ---
const DEFAULT_ANIMATION_START = 70; // percentage (1-100)
const DEFAULT_ENABLE_SCROLL = true;
// Global feature flag for horizontal text animation
const enableTimelineHorizontalTextAnimation = true;

// --- Polyfill for Element.closest() ---
if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }
  Element.prototype.closest = function (selector) {
    let el = this;
    do {
      if (el.matches(selector)) return el;
      el = el.parentElement;
    } while (el);
    return null;
  };
}

// --- Helper: run callback when DOM is ready ---
function onDomReady(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

// --- Parse per-timeline data-attribute for start percentage ---
function parseStartPercentage(el) {
  const raw = el.dataset.animationStartPercentage;
  const n = parseInt(raw, 10);
  if (!isNaN(n) && n >= 1 && n <= 100) return n;
  return DEFAULT_ANIMATION_START;
}

// --- Parse per-timeline data-attribute for scroll animation flag ---
function parseEnableScroll(el) {
  const raw = el.dataset.enableTimelineScrollAnimation;
  if (raw === undefined) return DEFAULT_ENABLE_SCROLL;
  return raw.toLowerCase() !== "false";
}

// --- Track viewport height for threshold calculations ---
let viewportHeight = 0;
function updateViewport() {
  viewportHeight = window.innerHeight;
}

// --- Vertical line animation update for one timeline ---
function updateTimelineLine(timeline) {
  const animatedLine = timeline.querySelector(".vertical-line-animated");
  if (!animatedLine) return;

  // nutze jetzt das data-Attribut
  const startPercent = parseStartPercentage(timeline);
  const thresholdPx = viewportHeight * (startPercent / 100);

  const lineTop = animatedLine.getBoundingClientRect().top;
  const timelineBottom = timeline.getBoundingClientRect().bottom;

  if (lineTop < thresholdPx && timelineBottom > thresholdPx) {
    animatedLine.style.height = `${thresholdPx - lineTop}px`;
  } else if (timelineBottom <= thresholdPx) {
    animatedLine.style.height = `${timelineBottom - lineTop}px`;
  } else {
    animatedLine.style.height = `0px`;
  }
}
// --- Horizontale Stop-Aktivierung (Side-Lines) ---
function checkStops() {
  // Für jede Section mit einer vertical-timeline…
  document.querySelectorAll(".vertical-timeline-section").forEach((section) => {
    const timeline = section.querySelector(".timeline-vertical");
    if (!timeline) return;

    // pro Timeline-Element den individuellen Start-Prozentsatz holen
    const startPercent = parseStartPercentage(timeline);
    const thresholdPx = viewportHeight * (startPercent / 100);

    // alle .sqs-block innerhalb dieser Section
    section.querySelectorAll(".sqs-block").forEach((block) => {
      const hasTimeline = block.querySelector(".timeline-vertical");
      if (hasTimeline) {
        return;
      }

      // Connector (horizontal-left/-right) oder der ganze Block
      const connector =
        block.querySelector(".horizontal-left, .horizontal-right") || block;
      const rect = connector.getBoundingClientRect();
      // wir nehmen die Mitte des Connectors als Referenz
      const pos = rect.top + 20;

      block.classList.toggle("timeline-stop-activated", pos < thresholdPx);
    });

    // und HR-Elemente in dieser Section
    section.querySelectorAll(".sqs-block hr").forEach((hr) => {
      const rect = hr.getBoundingClientRect();
      const pos = rect.top + 20;

      hr.classList.toggle("timeline-stop-activated", pos < thresholdPx);
    });
  });
}

// --- Horizontal text slide-in positioning ---
function runTimelineTextPositioning() {
  document.querySelectorAll(".html-block").forEach((block) => {
    const parent = block.closest(".fluid-engine");
    const timeline = parent && parent.querySelector(".timeline-vertical");
    if (!timeline) return;

    const bc = block.getBoundingClientRect();
    const tc = timeline.getBoundingClientRect();
    const isLeft = bc.left + bc.width / 2 < tc.left + tc.width / 2;

    block.classList.toggle("left-of-timeline", isLeft);
    block.classList.toggle("right-of-timeline", !isLeft);
  });
}

// --- Restliche Initialisierung wie gehabt ---
function initScrollAnimation() {
  updateViewport();
  window.addEventListener("resize", updateViewport);

  document.querySelectorAll(".timeline-vertical").forEach((timeline) => {
    if (!parseEnableScroll(timeline)) return;

    if (!timeline.querySelector(".vertical-line-animated")) {
      const line = document.createElement("div");
      line.className = "vertical-line-animated";
      timeline.prepend(line);
    }
  });

  // erster Durchlauf
  document.querySelectorAll(".timeline-vertical").forEach(updateTimelineLine);
  checkStops();

  window.addEventListener("scroll", () => {
    document.querySelectorAll(".timeline-vertical").forEach(updateTimelineLine);
    checkStops();
  });
  window.addEventListener("resize", () => {
    document.querySelectorAll(".timeline-vertical").forEach(updateTimelineLine);
    checkStops();
  });
}

// direkt nach allen Funktions-Definitionen
updateViewport();

// --- Main setup on DOM ready ---
onDomReady(() => {
  document.querySelectorAll(".timeline-vertical").forEach((timeline) => {
    const sec = timeline.closest("section.page-section");
    if (sec) sec.classList.add("vertical-timeline-section");
  });

  if (enableTimelineHorizontalTextAnimation) {
    document.documentElement.classList.add("timeline-text-animations-enabled");
    runTimelineTextPositioning();
    window.addEventListener("resize", runTimelineTextPositioning);
  }

  initScrollAnimation();
});
