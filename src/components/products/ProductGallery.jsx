import { useEffect, useRef, useState } from 'react';
import { Expand, X } from 'lucide-react';
import { colors, productFinishImage } from '../../data/products.js';
import SafeImage from '../SafeImage.jsx';

const GALLERY_IMAGE_SIZE = 800;
const FINISH_IMAGE_SIZE = 620;

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.assets.hero);
  const [selectedFinish, setSelectedFinish] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const selectedImageSize = selectedFinish ? FINISH_IMAGE_SIZE : GALLERY_IMAGE_SIZE;

  useEffect(() => {
    setSelectedImage(product.assets.hero);
    setSelectedFinish(null);
  }, [product.sku, product.assets.hero]);

  function selectGalleryImage(image) {
    setSelectedImage(image);
    setSelectedFinish(null);
  }

  function selectFinish(finish) {
    setSelectedImage(productFinishImage(product.sku, finish.slug));
    setSelectedFinish(finish.slug);
  }

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) closeDialog();
  }

  function handleCancel(event) {
    event.preventDefault();
    closeDialog();
  }

  return (
    <div className="product-gallery">
      <button
        ref={triggerRef}
        type="button"
        className="product-gallery__main product-media-square"
        data-testid="product-gallery-main"
        onClick={openDialog}
      >
        <SafeImage
          src={selectedImage}
          alt={`${product.sku} selected product view`}
          width={selectedImageSize}
          height={selectedImageSize}
          loading="eager"
          fetchpriority="high"
        />
        <span className="product-gallery__enlarge">
          <Expand size={16} aria-hidden="true" /> Enlarge
        </span>
      </button>

      <div className="product-gallery__thumbs" aria-label={`${product.sku} product views`}>
        {product.assets.gallery.map((image, index) => (
          <button
            key={image}
            type="button"
            className="product-gallery__thumb product-media-square"
            data-testid="product-gallery-thumb"
            aria-label={`View ${product.sku} image ${index + 1}`}
            aria-pressed={selectedFinish === null && selectedImage === image}
            onClick={() => selectGalleryImage(image)}
          >
            <SafeImage
              src={image}
              alt=""
              width={GALLERY_IMAGE_SIZE}
              height={GALLERY_IMAGE_SIZE}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <div className="product-gallery__finishes" aria-label={`${product.sku} available finishes`}>
        {colors.map((finish) => (
          <button
            key={finish.slug}
            type="button"
            className="product-gallery__finish"
            aria-label={`Show ${product.sku} in ${finish.name}`}
            aria-pressed={selectedFinish === finish.slug}
            onClick={() => selectFinish(finish)}
          >
            <span
              className="product-gallery__finish-dot"
              style={{ '--finish-color': finish.hex }}
              aria-hidden="true"
            />
            <span>{finish.name}</span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="product-gallery__dialog"
        aria-label={`Enlarged ${product.sku} product image`}
        onClick={handleBackdropClick}
        onCancel={handleCancel}
        onClose={() => triggerRef.current?.focus()}
      >
        <div className="product-gallery__dialog-inner">
          <button
            type="button"
            className="product-gallery__dialog-close"
            aria-label="Close enlarged product image"
            onClick={closeDialog}
            autoFocus
          >
            <X size={20} aria-hidden="true" />
          </button>
          <SafeImage
            src={selectedImage}
            alt={`${product.sku} enlarged product view`}
            width={selectedImageSize}
            height={selectedImageSize}
          />
        </div>
      </dialog>
    </div>
  );
}
