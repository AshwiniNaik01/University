import {
    LazyMotion,
    domAnimation,
    m,
    useAnimationControls,
} from "framer-motion";
import * as React from "react";

export function RevealOnView({
  children,
  from = "right", // "right" | "left"
  once = true,
}) {
  const ref = (React.useRef < HTMLDivElement) | (null > null);
  const controls = useAnimationControls();

  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
            if (once) io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [controls, once]);

  const variants = {
    hidden: from === "right" ? { opacity: 0, x: 100 } : { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div ref={ref} initial="hidden" animate={controls} variants={variants}>
        {children}
      </m.div>
    </LazyMotion>
  );
}
