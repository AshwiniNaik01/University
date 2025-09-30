import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom React hook that scrolls smoothly to an element on the page
 * when the URL contains a hash (e.g., `#section-id`).
 *
 * It waits for the DOM to be ready, calculates the position of the target element,
 * and scrolls to it, accounting for a fixed offset (such as a sticky navbar).
 *
 * @example
 * // In your main layout or page component
 * useScrollToHash();
 *
 * // URL: /about#team
 * // Scrolls smoothly to element: <div id="team"></div>
 *
 * @returns {void}
 */
const useScrollToHash = () => {
  const location = useLocation();
  const NAVBAR_OFFSET = 70; // Adjust based on your header height

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.substring(1);

    const scrollToElement = () => {
      const el = document.getElementById(id);
      if (el) {
        const y =
          el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    const timeout = setTimeout(scrollToElement, 50); // Wait briefly to ensure DOM is ready

    return () => clearTimeout(timeout);
  }, [location]);
};

export default useScrollToHash;
