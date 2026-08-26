import { productFamilies } from './productFamilies.js';

const editorialProduct = (name) => `assets/images/editorial-products/${name}`;

export const productOverviewVisuals = {
  hero: editorialProduct('overview-hero-background.webp'),
  brandProgram: editorialProduct('brand-program-background.webp'),
  marketResidential: editorialProduct('application-residential-background.webp'),
  marketHospitality: editorialProduct('application-hospitality-background.webp'),
  marketCommercial: editorialProduct('application-commercial-background.webp')
};

export const gfciSeriesVisuals = {
  application: editorialProduct('gfci-application-background.webp')
};

const familyVisuals = [
  {
    id: 'gfci',
    scene: editorialProduct('family-gfci-background.webp'),
    product: 'assets/images/products/gf15-main.webp'
  },
  {
    id: 'usb',
    scene: editorialProduct('family-usb-background.webp'),
    product: 'assets/images/catalog/usb-ftr15dc-3100.webp'
  },
  {
    id: 'receptacles',
    scene: editorialProduct('family-receptacle-background.webp'),
    product: 'assets/images/catalog/receptacle-r15.webp'
  },
  {
    id: 'smart',
    scene: editorialProduct('family-smart-background.webp'),
    product: 'assets/images/catalog/smart-usw8811.webp'
  },
  {
    id: 'switches',
    scene: editorialProduct('family-switch-background.webp'),
    product: 'assets/images/catalog/dimmer-dm2010.webp'
  }
];

const productFamilyById = new Map(productFamilies.map((family) => [family.id, family]));

export const productFamilyVisuals = familyVisuals.map(({ id, scene, product }) => {
  const { name, href } = productFamilyById.get(id);
  return { id, name, href, scene, product };
});
