import React, { useState, useEffect } from "react";

const Image = ({
    src = "",
    alt = "image",
    className = "",
    width,
    height,
    fallback = "/fallback-image.png",
    ...rest
}) => {
    // ✅ Use the same initial render on server & client
    const initialSrc = src || fallback;
    const [imgSrc, setImgSrc] = useState(initialSrc);

    // ✅ Update only when the `src` changes on the client
    useEffect(() => {
        setImgSrc(src || fallback);
    }, [src, fallback]);

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={`object-contain ${className}`}
            width={width}
            height={height}
            loading="lazy"
            onError={() => setImgSrc(fallback)}
            {...rest}
        />
    );
};

export default Image;
