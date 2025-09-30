import React, { useState, useEffect } from "react";
import { noImageAvailableFallback } from "../../access-assets/fallbackImages";

/**
 * Reusable Image component with fallback support and graceful error handling.
 */

const Image = ({
  src = "",
  alt = "image",
  className = "",
  width,
  height,
  fallback,
  loading = "lazy",
  ...rest
}) => {
  // ✅ Use the same initial render on server & client

  const [imgSrc, setImgSrc] = useState(src);

  // ✅ Update only when the `src` changes on the client
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`object-contain ${className}`}
      width={width}
      height={height}
      loading={loading}
      onError={() => setImgSrc(fallback || noImageAvailableFallback)}
      {...rest}
    />
  );
};

export default Image;
