// 3d-cards.js
import noevu from "/global/noevu.js";

const THRESHOLD = 8;
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const init3dCards = (
  container = document.documentElement,
  customSelector = null
) => {
  noevu.log("🃏 init3dCards:", container.id);

  if (typeof container === "string") {
    container = document.querySelector(container);
    if (!container) {
      noevu.log("🃏 init3dCards: container not found");
      return;
    }
  }

  const selector =
    customSelector ||
    (container.matches("[id^='cards3d']")
      ? ".user-items-list-item-container[data-current-context*='\"isCardEnabled\": true'] > .list-item-basic-animation"
      : "[id^='cards3d'] .user-items-list-item-container[data-current-context*='\"isCardEnabled\": true'] > .list-item-basic-animation");

  container.querySelectorAll(selector).forEach((slide) => {
    //noevu.log("🃏 initSlide (" + selector + "):", container, slide);

    // Wrapper nur einmal pro Slide anlegen
    if (slide.querySelector(".card3d") || slide.classList.contains("card3d"))
      return;

    //slide.classList.add("card3d");

    // 2) 3D-Hover-Logik
    const handleHover = (e) => {
      const rect = slide.getBoundingClientRect();
      const hor = (e.clientX - rect.left) / rect.width;
      const ver = (e.clientY - rect.top) / rect.height;
      const ry = (THRESHOLD / 2 - hor * THRESHOLD).toFixed(2);
      const rx = (ver * THRESHOLD - THRESHOLD / 3).toFixed(2);
      slide.style.transform = `perspective(${rect.width}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const resetStyles = () => {
      const rect = slide.getBoundingClientRect();
      slide.style.transform = `perspective(${rect.width}px) rotateX(0deg) rotateY(0deg)`;
    };

    if (!motionQuery.matches) {
      slide.addEventListener("mousemove", handleHover);
      slide.addEventListener("mouseleave", resetStyles);
    }
  });
};

export default init3dCards;
