/**
 * Handles gallery meta positioning for image galleries
 */

export const initGalleryMeta = () => {
  document
    .querySelectorAll(".sqs-gallery-block-stacked > .sqs-gallery .meta")
    .forEach((meta) => {
      const gallery = meta.previousElementSibling;
      if (gallery?.classList?.contains("image-wrapper")) {
        // Find the thumb image
        const thumbImage = gallery.querySelector(".thumb-image");
        if (thumbImage) {
          // Create wrapper
          const wrapper = document.createElement("div");
          wrapper.className = "image-block-wrapper";

          // Wrap the thumb image
          thumbImage.parentNode.insertBefore(wrapper, thumbImage);
          wrapper.appendChild(thumbImage);

          // Move meta into the wrapper instead of the gallery
          wrapper.appendChild(meta);
        } else {
          // Fallback: if no thumb image, append to gallery as before
          gallery.appendChild(meta);
        }
      }
    });
};
