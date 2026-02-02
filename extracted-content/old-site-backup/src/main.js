import "/global/components/devmode/devmode.js";

// Import global components
import "/global/components/lazy-summaries/lazy-summaries.js";
import "/global/components/horizontal-scroll/horizontal-scroll.js";
import "/global/components/timeline/timeline.js";
import "/global/components/animate-slides/animate-slides.js";

import { observeNewsletterElements } from "/global/components/update-newsletter-elements/update-newsletter-elements.js";
observeNewsletterElements();

// Import the loader config and the global component's setLoaderConfig function
import { loaderConfig } from "./components/noevu-global-section-loader/config.js";
import { setLoaderConfig } from "/global/components/noevu-global-section-loader/noevu-global-section-loader.js";

// Set the project-specific loader configuration with a descriptive name
setLoaderConfig(loaderConfig, "loaderConfig", 30);

// Import project-specific components
import "./base/";

import "./components/pages/comparison-table.less";

import "./components/blog/blog-list.js";
import "./components/blog/blog-post.js";
import "./components/blog/blog-portfolio-summary.js";
import "./components/devmode/devmode.less";

import "./components/card3d/card3d.js";
import "./components/forms/forms.js";
import "./components/filter/filter.js";
import "./components/language-switcher/language-switcher.js";
import "./components/material-icons/material-icons.less";
import "./components/perfect-buttons/perfect-buttons.js";
import "./components/social-proof/social-proof.less";
import "./components/summary-item/summary-item.js";
import "./components/underline/underline.less";
import "./components/list-section/list-section.less";
import "./components/navigation/navigation.js";
import "./components/swiper/swiper.js";
import "./components/logoslider/logoslider.js";