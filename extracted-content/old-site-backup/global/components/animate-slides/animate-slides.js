// animate-slides.js
import "./animate-slides.less";

const slideStep = 0.3; // Sek. Abstand zwischen den Slides
const titleOffset = 0.3; // Sek. nach Slide-Start bis H2
const pStep = 0.2; // Sek. Abstand zwischen den <p>

function initAnimationDelays() {
  document
    .querySelectorAll(".user-items-list-carousel__slide")
    .forEach((slide, idx) => {
      // 1) Slide-Delay
      slide.style.setProperty("--slide-delay", `${idx * slideStep}s`);

      // 2) Title-Delay
      const title = slide.querySelector(".list-item-content__title");
      if (title) {
        title.style.setProperty(
          "--title-delay",
          `${idx * slideStep + titleOffset}s`
        );
      }

      // 3) P-Delays
      slide
        .querySelectorAll(".list-item-content__description p")
        .forEach((p, pi) => {
          const delay = idx * slideStep + titleOffset + pi * pStep;
          p.style.setProperty("--p-delay", `${delay}s`);
        });
    });
}

// DOM-Ready abfangen
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimationDelays);
} else {
  initAnimationDelays();
}
