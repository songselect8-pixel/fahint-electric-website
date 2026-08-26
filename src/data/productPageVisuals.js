import { productFamilies } from './productFamilies.js';

const editorialProduct = (name) => `assets/images/editorial-products/${name}`;

export const productOverviewVisuals = {
  hero: editorialProduct('overview-hero-background.webp'),
  brandProgram: editorialProduct('brand-program-background.webp'),
  marketResidential: editorialProduct('application-residential-background.webp'),
  marketHospitality: editorialProduct('application-hospitality-background.webp'),
  marketCommercial: editorialProduct('application-commercial-background.webp')
};

export const productOverviewVisualDimensions = {
  hero: { width: 2048, height: 1152 },
  brandProgram: { width: 1536, height: 1024 },
  marketResidential: { width: 1535, height: 1024 },
  marketHospitality: { width: 1536, height: 1024 },
  marketCommercial: { width: 1536, height: 1024 }
};

export const gfciSeriesVisuals = {
  application: editorialProduct('gfci-application-background.webp')
};

const familyVisuals = [
  {
    id: 'gfci',
    scene: editorialProduct('family-gfci-background.webp'),
    sceneWidth: 2048,
    sceneHeight: 1365,
    product: 'assets/images/products/gf15-main.webp',
    productWidth: 800,
    productHeight: 800
  },
  {
    id: 'usb',
    scene: editorialProduct('family-usb-background.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024,
    product: 'assets/images/catalog/usb-ftr15dc-3100.webp',
    productWidth: 800,
    productHeight: 800
  },
  {
    id: 'receptacles',
    scene: editorialProduct('family-receptacle-background.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024,
    product: 'assets/images/catalog/receptacle-r15.webp',
    productWidth: 800,
    productHeight: 800
  },
  {
    id: 'smart',
    scene: editorialProduct('family-smart-background.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024,
    product: 'assets/images/catalog/smart-usw8811.webp',
    productWidth: 800,
    productHeight: 800
  },
  {
    id: 'switches',
    scene: editorialProduct('family-switch-background.webp'),
    sceneWidth: 1536,
    sceneHeight: 1024,
    product: 'assets/images/catalog/dimmer-dm2010.webp',
    productWidth: 800,
    productHeight: 800
  }
];

const productFamilyById = new Map(productFamilies.map((family) => [family.id, family]));

export const productFamilyVisuals = familyVisuals.map((visual) => {
  const { id } = visual;
  const { name, href } = productFamilyById.get(id);
  return { ...visual, name, href };
});
