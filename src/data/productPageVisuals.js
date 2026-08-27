import { productFamilies } from './productFamilies.js';

const editorialProduct = (name) => `assets/images/editorial-products/${name}`;

export const productOverviewVisuals = {
  hero: editorialProduct('overview-hero-background.webp'),
  brandProgram: editorialProduct('brand-program-review-v2.webp'),
  marketResidential: editorialProduct('application-residential-installed-v2.webp'),
  marketHospitality: editorialProduct('application-hospitality-installed-v4.webp'),
  marketCommercial: editorialProduct('application-commercial-installed-v2.webp')
};

export const productOverviewVisualDimensions = {
  hero: { width: 2048, height: 1152 },
  brandProgram: { width: 1536, height: 1024 },
  marketResidential: { width: 1536, height: 1024 },
  marketHospitality: { width: 1536, height: 1024 },
  marketCommercial: { width: 1536, height: 1024 }
};

export const gfciSeriesVisuals = {
  applicationPoster: editorialProduct('gfci-application-installed-poster-v2-optimized.webp'),
  oemPoster: editorialProduct('gfci-oem-program-poster-v3-optimized.webp')
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
    id: 'usb',
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
    id: 'smart',
    scene: editorialProduct('family-smart-installed-v3-optimized.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024
  },
  {
    id: 'switches',
    scene: editorialProduct('family-switch-installed-v3-optimized.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024
  }
];

const productFamilyById = new Map(productFamilies.map((family) => [family.id, family]));

export const productFamilyVisuals = familyVisuals.map((visual) => {
  const { id } = visual;
  const { name, href } = productFamilyById.get(id);
  return { ...visual, name, href };
});
