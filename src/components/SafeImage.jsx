import { useEffect, useState } from 'react';
import { publicAsset } from '../utils/publicAsset.js';

const PRODUCT_PLACEHOLDER = 'assets/images/products/product-placeholder.svg';

export default function SafeImage({ src, alt, onError, ...imgProps }) {
  const placeholder = publicAsset(PRODUCT_PLACEHOLDER);
  const resolvedSrc = publicAsset(src || PRODUCT_PLACEHOLDER);
  const [displayedSrc, setDisplayedSrc] = useState(resolvedSrc);

  useEffect(() => {
    setDisplayedSrc(resolvedSrc);
  }, [resolvedSrc]);

  function handleError(event) {
    onError?.(event);
    setDisplayedSrc(placeholder);
  }

  return (
    <img
      decoding="async"
      {...imgProps}
      src={displayedSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
