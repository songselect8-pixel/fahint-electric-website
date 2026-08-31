import { productLines } from './lines.js';

const editorialProduct = (name) => `assets/images/editorial-products/${name}`;

export const productOverviewVisuals = {
  hero: editorialProduct('overview-hero-background.webp'),
  marketResidential: editorialProduct('application-residential-installed-v2.webp'),
  marketHospitality: editorialProduct('application-hospitality-installed-v4.webp'),
  marketCommercial: editorialProduct('application-commercial-installed-v2.webp'),
  factory: 'assets/images/editorial-home/factory-optimized.webp'
};

export const productOverviewVisualDimensions = {
  hero: { width: 2048, height: 1152 },
  marketResidential: { width: 1536, height: 1024 },
  marketHospitality: { width: 1536, height: 1024 },
  marketCommercial: { width: 1536, height: 1024 },
  factory: { width: 1600, height: 900 }
};

export const gfciSeriesVisuals = {
  applicationPoster: editorialProduct('gfci-application-installed-poster-v2-optimized.webp'),
  oemPoster: 'assets/images/products/gf15-package-standard-white-v1.jpg'
};

export const gfciSeriesHeroVisual = {
  scene: editorialProduct('family-gfci-background.webp'),
  sceneWidth: 2048,
  sceneHeight: 1365,
  product: 'assets/images/products/gf15-main.webp',
  productWidth: 800,
  productHeight: 800
};

const familyVisuals = [
  {
    id: 'gfci',
    scene: editorialProduct('family-gfci-installed-v3-optimized.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024
  },
  {
    id: 'usb-outlets',
    scene: editorialProduct('family-usb-installed-v3-optimized.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024
  },
  {
    id: 'receptacles',
    scene: editorialProduct('family-receptacle-installed-v3-optimized.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024
  },
  {
    id: 'smart-switches',
    scene: editorialProduct('family-smart-installed-v3-optimized.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024
  },
  {
    id: 'dimmers',
    scene: editorialProduct('family-switch-installed-v3-optimized.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024
  },
  {
    id: 'lighting-switches',
    scene: 'assets/images/editorial-home/product-receptacle-optimized.webp',
    sceneWidth: 1600,
    sceneHeight: 888
  },
  {
    id: 'wallplates',
    scene: 'assets/images/editorial-home/category-wallplates-scene.webp',
    sceneWidth: 1600,
    sceneHeight: 900
  }
];

const visualByLine = new Map(familyVisuals.map((visual) => [visual.id, visual]));

// Names, order and destinations follow the same seven lines as the model catalogue.
export const productFamilyVisuals = productLines.map(({ slug, name, tagline }) => ({
  ...visualByLine.get(slug),
  id: slug,
  name,
  tagline,
  href: `/products/${slug}`
}));
