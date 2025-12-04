/**
 * Triggers a reflow to ensure CSS transitions work properly
 */
export const forceReflow = (element) => {
  if (element) {
    void element.offsetHeight;
  }
};

/**
 * Animates text character by character
 * @param {string} text - The full text to animate
 * @param {function} setText - State setter function
 * @param {number} delay - Delay before starting animation (ms)
 * @param {number} interval - Delay between each character (ms)
 * @returns {function} Cleanup function
 */
export const animateText = (text, setText, delay = 0, interval = 150) => {
  let currentIndex = 0;
  let timeoutId;
  let intervalId;

  timeoutId = setTimeout(() => {
    intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, interval);
  }, delay);

  return () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
  };
};

/**
 * Checks if user has already scrolled past a section
 */
export const hasScrolledPastSection = (threshold = 0.5) => {
  const snapContainer = document.querySelector('.snap-container');
  return snapContainer && snapContainer.scrollTop > window.innerHeight * threshold;
};

/**
 * Generic element animation with delay
 */
export const animateElement = (element, styles, delay = 0) => {
  if (!element) return;

  forceReflow(element);

  setTimeout(() => {
    Object.entries(styles).forEach(([property, value]) => {
      element.style[property] = value;
    });
  }, delay);
};