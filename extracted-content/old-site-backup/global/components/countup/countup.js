import { init, log } from "/global/noevu.js";

/**
 * Count Up Animation Parameters:
 *
 * data-plugin="countup" (Required for elements to be recognized by the script)
 * data-speed: Animation duration in milliseconds (default: 3000)
 * data-start: Starting number for the animation (default: 0)
 * data-fps: Frames per second for the animation (default: 60)
 * data-locale: Locale string for number formatting (e.g., "en-US", "de-CH"). 
 * (Default: document.documentElement.lang or "de-CH")
 * data-separator: "true" or "false". Controls whether thousands separators are used.
 * (Default: true - effectively forces formatting even if input is "85000000")
 * data-delay: Delay before the animation starts (default: 0)
 * data-stagger: Stagger delay between multiple count-up elements (default: 0)
 *
 * For anchor tags (<a>) with href="#countup?start=X&speed=Y":
 * The 'start' and 'speed' parameters can be passed via the URL query string.
 * The anchor tag will be replaced by a <span> element with the corresponding data attributes.
 *
 * CSS Variables (can be used on the element instead of data attributes):
 * --speed: Animation duration in milliseconds
 * --fps: Frames per second
 * --start: Starting number
 * --delay: Delay before the animation starts
 * --stagger: Stagger delay between multiple count-up elements
 * --locale-string: Locale string for number formatting
 */


/* Count Up Animation Config */
const defaultParams = {
  speed: 3000,
  start: 1,
  fps: 30,
  locale: document.documentElement.lang || "de-CH",
  delay: 500,
  stagger: 250,
};

const ps = {
  cssId: 'countup-animation',
  uniqueId: 1,
};

const utils = {
  endsWithNumber: function (str) {
    str = str.trim();
    return isNaN(str.slice(-1)) ? str.slice(-1) : '';
  },
  isScaledText: function (el) {
    let answer = false;
    if (el.closest('.sqsrte-scaled-text')) {
      answer = el.closest('.sqs-block');
    }
    return answer;
  },
  getPropertyValue: function (el, prop) {
    let styles = window.getComputedStyle(el),
      value = styles.getPropertyValue(prop);
    return value;
  },
  // Detects the specific separator characters for the current locale.
  // This is run once per animation to improve performance during parsing.
  getSeparators: function (localeString) {
    const thousandParams = { useGrouping: true };
    const decimalParams = { minimumFractionDigits: 1 };

    // Format test numbers
    const thousandTest = (1000).toLocaleString(localeString, thousandParams);
    const decimalTest = (1.1).toLocaleString(localeString, decimalParams);

    // Extract characters
    // For 1000 -> 1'000 or 1.000 -> find the character between 1 and 0
    const thousandSeparator = thousandTest.replace(/\d/g, '').trim().charAt(0);

    // For 1.1 -> 1.1 or 1,1 -> find the character that is not a number
    const decimalSeparator = decimalTest.replace(/\d/g, '').trim().charAt(0);

    return { thousand: thousandSeparator, decimal: decimalSeparator };
  }
};

let CountUpAnimation = (function () {

  function buildAnimation(instance) {
    let el = instance.settings.el,
      suffix = utils.endsWithNumber(el.innerText),
      // Clean locale string of quotes
      localeString = instance.settings.localeString.replace(/['"]/g, '');

    // Is Scaled Text Logic (Squarespace specific)
    let block = null;
    if (utils.isScaledText(el)) {
      block = utils.isScaledText(el);
      utils.isScaledText(el).classList.add('has-countup-animation');
      let styles = document.createElement('style');
      styles.textContent = `
.has-countup-animation .preSlide,
.has-countup-animation .preFlex{
  transform: translate(0,0) !important;
  opacity: 1 !important;
}`;
      // el.style.opacity = '0'; // Keep visible to show start number
      // Construct placeholder string
      let str = '0';
      let count = instance.settings.el.innerText.length;
      for (let i = 1; i < count; i++) {
        str += '0'
      }
      el.dataset['startingNumber'] = str;
      let scaledTextEl = block.querySelector('.sqsrte-scaled-text-container');
      let hasPrevElementSibling = scaledTextEl.previousElementSibling != null;
      let hasNextElementSibling = scaledTextEl.nextElementSibling != null;
      if (!hasNextElementSibling && !hasPrevElementSibling) {
        let id = block.id;
        if (id) {
          styles.textContent += `
body:not(.sqs-edit-mode-active) .fluid-engine #${id}.has-countup-animation .sqs-block-content {
  position: absolute;
  height: 100% !important;
  width: 100% !important;
}`;
        }
      }
      document.head.append(styles);
    }

    // 1. Get separators for parsing (Input -> Number)
    const separators = utils.getSeparators(localeString);

    // 2. Function to parse the input string into a valid JS Number
    function convertToNumber(str) {
      if (!str) return 0;
      str = str.trim();

      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

      // Remove thousand separators (e.g. ' or , or .)
      if (separators.thousand) {
        const separatorRegExp = new RegExp(escapeRegExp(separators.thousand), 'g');
        str = str.replace(separatorRegExp, '');
      }

      // Normalize decimal separator to '.'
      if (separators.decimal && separators.decimal !== '.') {
        str = str.replace(separators.decimal, '.');
      }

      // Remove anything that isn't a digit, dot, or minus sign
      str = str.replace(/[^\d.-]/g, '');

      return parseFloat(str);
    }

    // Calculate decimal places based on input string
    function getDecimals(numStr) {
      if (!separators.decimal || !numStr.includes(separators.decimal)) return 0;
      let split = numStr.split(separators.decimal);
      let decimalsPart = split[1] ? split[1].match(/^\d+/) : null;
      return decimalsPart ? decimalsPart[0].length : 0;
    }

    // Initialize values
    let originalText = instance.settings.el.innerText;
    let countTo = convertToNumber(originalText);
    let start = instance.settings.startingNumber ? parseFloat(instance.settings.startingNumber) : 0;
    let duration = instance.settings.duration;

    // Determine if grouping (thousands separator) should be used. Defaults to TRUE.
    let useGrouping = instance.settings.useGrouping;
    let decimals = getDecimals(originalText);

    // 3. Create High Performance Formatter (Intl.NumberFormat)
    // This is created ONCE and reused in the loop for efficiency.
    const formatter = new Intl.NumberFormat(localeString, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: useGrouping
    });

    instance.settings.el.innerText = formatter.format(start) + suffix;

    // Frame setup
    let frame = 0,
      fps = instance.settings.fps,
      frameDuration = 1000 / fps,
      totalFrames = Math.round(duration / frameDuration);

    // Easing Function
    let ease = x => Math.sin((x * Math.PI) / 2);

    let animateCountUp = el => {
      el.style.opacity = '';

      let counter = setInterval(() => {
        frame++;

        // Easing calculation
        let easingProgress = ease(frame / totalFrames);

        // Calculate current raw number
        let currentRawCount = ((countTo - start) * easingProgress) + start;

        // Format the number using the cached formatter
        let formattedCount = formatter.format(currentRawCount);

        // If Scaled Text, Re-initialize
        if (block) { Squarespace?.initializeScaledText(block) }

        // Update Element
        if (frame === totalFrames) {
          // Ensure the final number is exact and correctly formatted
          el.innerText = formatter.format(countTo) + suffix;
          clearInterval(counter);
        } else {
          el.innerText = formattedCount + suffix;
        }

      }, frameDuration);
    };

    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              animateCountUp(instance.settings.el);
            }, instance.settings.delay);
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px 0px 0px" });

    observer.observe(el)
  }

  function Constructor(el, options = {}) {
    let instance = this;

    // Settings Object
    this.settings = {
      el: el,
      get duration() {
        return el.dataset['speed'] || el.dataset['duration'] || utils.getPropertyValue(this.el, '--speed') || defaultParams.speed;
      },
      get fps() {
        return el.dataset['fps'] || utils.getPropertyValue(this.el, '--fps') || defaultParams.fps;
      },
      get startingNumber() {
        return el.dataset['start'] || utils.getPropertyValue(this.el, '--start') || defaultParams.start;
      },
      // Logic changed: Default to TRUE unless explicitly set to false.
      // This ensures raw numbers like 85000000 get formatted to 8'500'000 automatically.
      get useGrouping() {
        if (el.dataset.separator === 'false') return false;
        return true;
      },
      get localeString() {
        return el.dataset['locale'] || utils.getPropertyValue(this.el, '--locale-string') || document.documentElement.lang || defaultParams.locale;
      },
      get delay() {
        if (options.totalDelay !== undefined) return options.totalDelay;
        return parseInt(el.dataset['delay'] || utils.getPropertyValue(this.el, '--delay') || defaultParams.delay);
      },
      get stagger() {
        return parseInt(el.dataset['stagger'] || utils.getPropertyValue(this.el, '--stagger') || defaultParams.stagger);
      }
    };

    // Build the animation
    buildAnimation(this)

    el.countupAnimation = {
      initilized: true,
      settings: this.settings,
    };
    el.classList.add('loaded')
  }

  return Constructor;
}());

let BuildCountUp = (function () {

  function replaceAnchor(instance) {
    let el = instance.settings.el,
      index = instance.settings.index,
      parentEl = el.parentElement,
      id = ps.uniqueId,
      customColor = el.querySelector('span[class*="sqsrte-text-color"]'),
      newEl = `<span data-plugin="countup" 
                       data-unique-id="${id}"
                       data-speed="${instance.settings.speed}"
                       data-start=${instance.settings.startingNumber}
                       ${customColor ? `style="${customColor.style.cssText}" class="${customColor.classList.value}" ` : ''}>
                           ${el.innerHTML}
                 </span>`;

    el.insertAdjacentHTML('afterend', newEl);
    el.remove();
    ps.uniqueId++;
    return document.querySelector(`[data-plugin="countup"][data-unique-id="${id}"]`);
  }

  function parseURL(instance, url) {
    const params = new URLSearchParams(url.slice(url.indexOf("?") + 1));
    let start = params.get("start");
    let speed = params.get("speed");

    var defaultStart = 0;
    var defaultSpeed = 3000;

    start = start ? parseInt(start) : defaultStart;
    speed = speed ? parseInt(speed) : defaultSpeed;

    instance.settings.speed = speed
    instance.settings.startingNumber = start;
  }

  function Constructor(el, options = {}) {
    let instance = this;

    this.settings = {
      el: el,
      get index() {
        return Array.from(el.parentElement.children).indexOf(el);
      }
    };
    parseURL(instance, el.getAttribute('href'))

    this.settings.el = replaceAnchor(this);

    new CountUpAnimation(instance.settings.el, options)
  }

  return Constructor;
}());

const initCounter = () => {
  let countupsFromCode = document.querySelectorAll('[data-plugin="countup"]');
  let countupsFromAnchors = document.querySelectorAll('a[href*="#countup"]');
  let allCountups = [...countupsFromCode, ...countupsFromAnchors];

  allCountups.forEach((el, index) => {
    try {
      if (el.classList.contains('loaded')) return;

      const delay = parseInt(el.dataset.delay || defaultParams.delay);
      const stagger = parseInt(el.dataset.stagger || defaultParams.stagger);
      const totalDelay = delay + (index * stagger);

      if (el.tagName === 'A') {
        new BuildCountUp(el, { totalDelay });
      } else {
        new CountUpAnimation(el, { totalDelay });
      }
    } catch (err) {
      log('error with', el);
      log(err);
    }
  });
};

init(initCounter);