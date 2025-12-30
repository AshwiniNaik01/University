import { useLayoutEffect, useState } from "react";
import { sgbauLogoImage } from "../../access-assets/images";

const FullScreenLogoLoader = () => {
  const [hide, setHide] = useState(false);

  useLayoutEffect(() => {
    // Run synchronously before the browser paints → prevents hydration flicker
    const timer = setTimeout(() => setHide(true), 1300); // Duration matches logo animation
    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <img
        src={sgbauLogoImage}
        // fallback="/fallback-image.png"
        className="logo-loader-animation"
      />
    </div>
  );
};

export default FullScreenLogoLoader;
