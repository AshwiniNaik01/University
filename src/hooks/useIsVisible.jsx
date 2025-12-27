import { useEffect, useState } from "react";

function useIsVisible(ref, threshold = 0.9, intialVisibility = false) {
  const [isVisible, setIsVisible] = useState(intialVisibility);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let [entry] = entries;
        setIsVisible(!entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}

export default useIsVisible;
