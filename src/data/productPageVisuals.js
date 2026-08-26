const editorialProduct = (name) => `assets/images/editorial-products/${name}`;

export const productOverviewVisuals = {
  hero: editorialProduct('overview-hero-background.webp'),
  brandProgram: editorialProduct('brand-program-background.webp'),
  marketResidential: editorialProduct('application-residential-background.webp'),
  marketHospitality: editorialProduct('application-hospitality-background.webp'),
  marketCommercial: editorialProduct('application-commercial-background.webp'),
  gfciApplication: editorialProduct('gfci-application-background.webp')
};

export const productFamilyVisuals = [
  {
    id: 'gfci',
    name: 'GFCI Outlets',
    href: '/products/gfci',
    scene: editorialProduct('family-gfci-background.webp'),
    product: 'assets/images/products/gf15-main.webp'
  },
  {
    id: 'usb',
    name: 'USB & Type-C Outlets',
    href: '/products/usb-outlets',
    scene: editorialProduct('family-usb-background.webp'),
    product: 'assets/images/catalog/usb-ftr15dc-3100.webp'
  },
  {
    id: 'receptacles',
    name: 'Receptacles',
    href: '/products/receptacles',
    scene: editorialProduct('family-receptacle-background.webp'),
    product: 'assets/images/catalog/receptacle-r15.webp'
  },
  {
    id: 'smart',
    name: 'Smart Home Controls',
    href: '/products/smart-switches',
    scene: editorialProduct('family-smart-background.webp'),
    product: 'assets/images/catalog/smart-usw8811.webp'
  },
  {
    id: 'switches',
    name: 'Switches & Dimmers',
    href: '/products/dimmers',
    scene: editorialProduct('family-switch-background.webp'),
    product: 'assets/images/catalog/dimmer-dm2010.webp'
  }
];
