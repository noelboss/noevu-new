import "./author-box.less";

/**
 * Adds author image to the meta wrapper
 */
const addAuthorImage = () => {
  const authorAvatar = document.querySelector(".author-avatar img");
  const authorImageUrl = authorAvatar?.dataset.image || "";
  const metaWrapper = document.querySelector(".blog-item-meta-wrapper");

  if (metaWrapper && authorImageUrl) {
    const authorImgDiv = document.createElement("div");
    authorImgDiv.className = "author-img";
    authorImgDiv.innerHTML = `<img src="${authorImageUrl}" alt="Author">`;
    metaWrapper.prepend(authorImgDiv);
  }
};

/**
 * Moves author information to the appropriate location
 */
const moveAuthorInfo = () => {
  const authorWrapper = document.querySelector(".blog-meta-item--author");
  const authorDateWrapper = document.querySelector(
    ".blog-item-top-wrapper .blog-item-author-date-wrapper"
  );

  if (authorWrapper && authorDateWrapper) {
    authorDateWrapper.appendChild(authorWrapper);
  }
};

/**
 * Moves the last paragraph from author bio to author name
 */
const moveAuthorLinks = () => {
  const authorBio = document.querySelector(".author-bio");
  const authorName = document.querySelector(".author-name");

  if (authorBio && authorName) {
    const paragraphs = authorBio.querySelectorAll("p");
    if (paragraphs.length > 0) {
      const lastParagraph = paragraphs[paragraphs.length - 1];
      authorName.appendChild(lastParagraph);
    }
  }
};

/**
 * Replaces the anchor tag with a div in the author profile wrapper
 */
const replaceAuthorLinkWithDiv = () => {
  const authorProfileWrapper = document.querySelector(
    ".blog-item-author-profile-wrapper"
  );
  if (!authorProfileWrapper) return;

  const anchor = authorProfileWrapper.querySelector("a");
  if (!anchor) return;

  // Create a new div with the same classes and content
  const div = document.createElement("div");
  div.className = "author-name-content";

  // Move all child nodes from anchor to the new div
  while (anchor.firstChild) {
    div.appendChild(anchor.firstChild);
  }

  // Replace the anchor with the new div
  anchor.parentNode.replaceChild(div, anchor);
};

/**
 * Initializes author information section
 */
export const initAuthorInfo = () => {
  addAuthorImage();
  moveAuthorInfo();
  replaceAuthorLinkWithDiv();
  moveAuthorLinks();
};
