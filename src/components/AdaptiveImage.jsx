import { useEffect, useRef, useState } from "react";

function AdaptiveImage({ alt, fallbackSrc, src, className = "", ...props }) {
  const imgRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Cached images can be complete before onLoad fires.
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [currentSrc]);

  return (
    <img
      {...props}
      alt={alt}
      className={`adaptive-img ${loaded ? "adaptive-img--loaded" : ""} ${className}`.trim()}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setLoaded(false);
          setCurrentSrc(fallbackSrc);
        }
      }}
      onLoad={() => setLoaded(true)}
      ref={imgRef}
      src={currentSrc}
    />
  );
}

export default AdaptiveImage;
