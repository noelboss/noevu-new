import "./logoslider.less";

/**
  * Builds and prepends a slider inside a Squarespace section after its images render.
  * @param {string} sectionIdOrSelector - Either the section data-section-id (e.g. "66fa072e23d86426fe669fb9")
  *                                       or a full CSS selector (e.g. 'section[data-section-id="..."]').
  * @param {number} repeatCount - How many times to repeat the image list to create the marquee-like track.
  * @param {number} pollIntervalMs - How often to check for images in the section.
  * @param {number} maxWaitMs - Maximum time to poll before giving up.
  * @param {string} sliderId - The id attribute to assign to the slider container (default: "slider-left").
  * @param {string} trackId - The id attribute to assign to the slide track (default: "slides-left").
  */


  function buildSliderWhenReady(options = {}) {
    const {
      sectionIdOrSelector = 'section#logoslider',
      repeatCount = 3,
      pollIntervalMs = 200,
      maxWaitMs = 10000,
      sliderId = 'slider-left',
      trackId = 'slides-left',
      // Optional CSS variable overrides; if omitted, sensible defaults are applied
      slideHeight = '40px',
      slideWidthPerItem = '180px', // if not provided, computed from first slide width
      slidePadding = '40px',
      scrollSpeed = '70s',
      logoOpacity = 0.75,
    } = options;
    if (!sectionIdOrSelector || typeof sectionIdOrSelector !== 'string') {
      console.error('buildSliderWhenReady: sectionIdOrSelector is required and must be a string.');
      return;
    }

    // Normalize to a CSS selector. If the user passed a raw section ID, convert it.
    const sectionSelector = sectionIdOrSelector.includes('[') || sectionIdOrSelector.includes('#') || sectionIdOrSelector.includes('.')
      ? sectionIdOrSelector
      : `section[data-section-id="${sectionIdOrSelector}"]`;

    const poll = () => {
      const sectionEl = document.querySelector(sectionSelector);
      if (!sectionEl) return; // Section not yet in DOM, keep polling

      // Avoid duplicate insertion
      if (sectionEl.querySelector(`#${sliderId}`)) {
        clearInterval(intervalId);
        return;
      }

      const imgs = sectionEl.querySelectorAll('img');
      if (imgs.length === 0) return; // Images not yet rendered, keep polling

      // Build the slider markup
      let html = `<div id="${sliderId}" class="slider"><div class="slide-track" id="${trackId}">`;

      // Repeat the images repeatCount times
      for (let j = 0; j < repeatCount; j++) {
        for (let i = 0; i < imgs.length; i++) {
          const img = imgs[i];
          // Prefer data-src (Squarespace lazy-loaded), fallback to src
          const src = img.getAttribute('data-src') || img.getAttribute('src') || '';
          if (!src) continue; // Skip images without a source
          const alt = img.getAttribute('alt') || '';
          const srcset = img.getAttribute('data-srcset') || img.getAttribute('srcset') || '';
          const sizes = img.getAttribute('data-sizes') || img.getAttribute('sizes') || '';
          const srcsetAttr = srcset ? ` srcset="${srcset}"` : '';
          const sizesAttr = sizes ? ` sizes="${sizes}"` : '';
          html += `<div class="slide"><img src="${src}" alt="${alt}" loading="lazy" decoding="async"${srcsetAttr}${sizesAttr} /></div>`;
        }
      }

      html += `</div></div>`;

      // Prepend the slider to the section
      sectionEl.insertAdjacentHTML('afterbegin', html);

      // After insertion, sync CSS variables so CSS/JS stay in lockstep
      const sliderEl = sectionEl.querySelector(`#${sliderId}`);
      const trackEl = sectionEl.querySelector(`#${trackId}`);
      if (sliderEl) {
        // repeat count must match DOM duplication count
        sliderEl.style.setProperty('--repeat-count', String(repeatCount));
        // set height and padding if provided
        if (slideHeight) sliderEl.style.setProperty('--slide-height', slideHeight);
        if (slidePadding) sliderEl.style.setProperty('--slide-padding', slidePadding);

        // determine width per item: provided override or measure first slide
        let effectiveSlideWidth = slideWidthPerItem;
        if (!effectiveSlideWidth) {
          const firstSlide = trackEl?.querySelector('.slide');
          const measured = firstSlide ? Math.round(firstSlide.getBoundingClientRect().width) : 0;
          effectiveSlideWidth = measured > 0 ? `${measured}px` : '180px';
        }
        sliderEl.style.setProperty('--slide-width-per-item', `${effectiveSlideWidth}`);

        // set scroll speed variable used by LESS (or fallback inline duration)
        sliderEl.style.setProperty('--scroll-speed', scrollSpeed);
        sliderEl.style.setProperty('--logo-opacity', logoOpacity);

        // Compute the actual loop distance from the rendered track width so
        // the animation resets seamlessly even when padding/margins vary.
        // The track contains imgs.length * repeatCount slides, so a single
        // set width is total width divided by repeatCount.
        if (trackEl) {
          // Force a reflow to ensure scrollWidth is accurate after insertion
          // (accessing offsetHeight triggers layout)
          void trackEl.offsetHeight; 
          const totalTrackWidth = trackEl.scrollWidth;
          if (totalTrackWidth > 0 && repeatCount > 0) {
            const loopDistance = Math.round(totalTrackWidth / repeatCount);
            sliderEl.style.setProperty('--loop-distance', `${loopDistance}px`);
          }
        }
      }

      // Fallback: also set inline animationDuration to ensure effect even if LESS isn't updated
      const trackForDuration = sectionEl.querySelector(`#${trackId}`);
      if (trackForDuration) {
        trackForDuration.style.animationDuration = scrollSpeed;
      }

      // Stop polling once done
      clearInterval(intervalId);
    };

    // If DOM is ready, start polling; otherwise wait for DOMContentLoaded
    const startPolling = () => {
      intervalId = setInterval(poll, pollIntervalMs);
      if (maxWaitMs > 0) {
        timeoutId = setTimeout(() => {
          clearInterval(intervalId);
          if (!document.querySelector(sectionSelector)?.querySelector(`#${sliderId}`)) {
            console.warn(`buildSliderWhenReady: timed out after ${maxWaitMs}ms waiting for images in ${sectionSelector}`);
          }
        }, maxWaitMs);
      }
    };

    let intervalId;
    let timeoutId;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startPolling, { once: true });
    } else {
      startPolling();
    }
  }


export default buildSliderWhenReady;