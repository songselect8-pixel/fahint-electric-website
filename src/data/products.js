export const colors = [
  { slug: 'white', name: 'White', hex: '#F5F5F2' },
  { slug: 'ivory', name: 'Ivory', hex: '#EDE4CE' },
  { slug: 'almond', name: 'Light Almond', hex: '#E4D8C3' },
  { slug: 'black', name: 'Black', hex: '#232323' },
  { slug: 'grey', name: 'Grey', hex: '#8C9095' },
  { slug: 'brown', name: 'Brown', hex: '#5A4433' }
];

export const categories = [
  { slug: 'all', name: 'All GFCI' },
  { slug: 'standard', name: 'Standard' },
  { slug: 'tr', name: 'Tamper-Resistant' },
  { slug: 'wr', name: 'TR + Weather-Resistant' },
  { slug: 'blank', name: 'Blank Face' },
  { slug: 'industrial', name: 'Industrial Grade' }
];

const GALLERY_ROLES = ['plate', 'main', 'sides', 'back', 'lifestyle'];
const PRODUCT_PLACEHOLDER = 'assets/images/products/product-placeholder.svg';
const PRODUCT_IMAGE_ROLE_MAP = new Map([
  ['card', 'plate'],
  ['hero', 'main'],
  ['feature', 'features'],
  ['installation', 'install'],
  ['plate', 'plate'],
  ['main', 'main'],
  ['sides', 'sides'],
  ['back', 'back'],
  ['lifestyle', 'lifestyle'],
  ['features', 'features'],
  ['install', 'install'],
  ['dimensions', 'dimensions'],
  ['mcu', 'mcu'],
  ['back-angle', 'back-angle'],
  ['detail', 'detail']
]);

function assetPath(sku, role) {
  return `assets/images/products/${String(sku).toLowerCase()}-${role}.webp`;
}

function buildAssets(sku) {
  return {
    hero: assetPath(sku, 'main'),
    card: assetPath(sku, 'plate'),
    gallery: GALLERY_ROLES.map((role) => assetPath(sku, role)),
    feature: assetPath(sku, 'features'),
    installation: assetPath(sku, 'install'),
    dimensions: assetPath(sku, 'dimensions'),
    finishes: Object.fromEntries(colors.map((finish) => [finish.slug, assetPath(sku, finish.slug)]))
  };
}

const VERIFIED_LISTING = Object.freeze({
  status: 'verified',
  file: 'E504391',
  reportReference: 'E504391-20210212'
});
const CERTIFICATION_FEATURE = `UL / cUL certified under GFCI report reference ${VERIFIED_LISTING.reportReference}`;
const REVIEW_LISTING = Object.freeze({
  status: 'review',
  file: null,
  reportReference: null
});

const SHARED_FEATURES = [
  'Self-test every 15 minutes; initial self-test within 3 seconds of power up',
  'No power to the receptacle face or downstream receptacle if line-load is reversed',
  'Dual-colour status indicator for power and protection state',
  'Thermoplastic face and body with a UL 94 V-1 flammability rating',
  '0.8 mm high-precision phosphor bronze and 1.2 mm galvanized steel yoke',
  '4–6 mA trip level with tripping time under 25 ms'
];

function verifiedFeatures(variantFeatures = []) {
  return [CERTIFICATION_FEATURE, ...variantFeatures, ...SHARED_FEATURES];
}

export const products = [
  {
    sku: 'GF15',
    name: '15A Self-Test GFCI Receptacle',
    category: 'standard',
    rating: '15A, 125V',
    nema: '5-15R',
    feature: 'Standard',
    grade: 'Residential & Commercial Grade',
    listing: VERIFIED_LISTING,
    summary:
      '15A, 125V self-test GFCI receptacle with 20A feed-through, back and side wiring, and a self-grounding clip.',
    highlights: ['Self-test every 15 min', '20A feed-through', 'Reverse-wiring lockout'],
    features: verifiedFeatures(),
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' },
    assets: buildAssets('GF15')
  },
  {
    sku: 'GF20',
    name: '20A Self-Test GFCI Receptacle',
    category: 'standard',
    rating: '20A, 125V',
    nema: '5-20R',
    feature: 'Standard',
    grade: 'Residential & Commercial Grade',
    listing: VERIFIED_LISTING,
    summary:
      '20A, 125V self-test GFCI receptacle with 20A feed-through, back and side wiring, and a self-grounding clip.',
    highlights: ['20A T-slot face', 'Self-test every 15 min', 'Reverse-wiring lockout'],
    features: verifiedFeatures(),
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' },
    assets: buildAssets('GF20')
  },
  {
    sku: 'GT15',
    name: '15A Tamper-Resistant GFCI',
    category: 'tr',
    rating: '15A, 125V',
    nema: '5-15R',
    feature: 'TR',
    grade: 'Residential & Commercial Grade',
    listing: VERIFIED_LISTING,
    summary:
      '15A, 125V tamper-resistant self-test GFCI receptacle with 20A feed-through, back and side wiring, and a self-grounding clip.',
    highlights: ['Tamper-resistant', 'Self-test every 15 min', '20A feed-through'],
    features: verifiedFeatures(['Tamper-resistant receptacle face']),
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' },
    assets: buildAssets('GT15')
  },
  {
    sku: 'GT20',
    name: '20A Tamper-Resistant GFCI',
    category: 'tr',
    rating: '20A, 125V',
    nema: '5-20R',
    feature: 'TR',
    grade: 'Residential & Commercial Grade',
    listing: VERIFIED_LISTING,
    summary:
      '20A, 125V tamper-resistant self-test GFCI receptacle with 20A feed-through, back and side wiring, and a self-grounding clip.',
    highlights: ['Tamper-resistant', '20A T-slot face', 'Self-test every 15 min'],
    features: verifiedFeatures(['Tamper-resistant receptacle face']),
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' },
    assets: buildAssets('GT20')
  },
  {
    sku: 'GW15',
    name: '15A Weather-Resistant GFCI (TR + WR)',
    category: 'wr',
    rating: '15A, 125V',
    nema: '5-15R',
    feature: 'TR & WR',
    grade: 'Residential & Commercial Grade',
    listing: VERIFIED_LISTING,
    summary:
      '15A, 125V tamper-resistant and weather-resistant self-test GFCI receptacle with 20A feed-through and a self-grounding clip.',
    highlights: ['Tamper-resistant', 'Weather-resistant', 'Self-test every 15 min'],
    features: verifiedFeatures([
      'Tamper-resistant and weather-resistant receptacle face',
      'Coated circuit board protects critical components from moisture'
    ]),
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' },
    assets: buildAssets('GW15')
  },
  {
    sku: 'GW20',
    name: '20A Weather-Resistant GFCI (TR + WR)',
    category: 'wr',
    rating: '20A, 125V',
    nema: '5-20R',
    feature: 'TR & WR',
    grade: 'Residential & Commercial Grade',
    listing: VERIFIED_LISTING,
    summary:
      '20A, 125V tamper-resistant and weather-resistant self-test GFCI receptacle with 20A feed-through and a self-grounding clip.',
    highlights: ['Tamper-resistant', 'Weather-resistant', '20A T-slot face'],
    features: verifiedFeatures([
      'Tamper-resistant and weather-resistant receptacle face',
      'Coated circuit board protects critical components from moisture'
    ]),
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' },
    assets: buildAssets('GW20')
  },
  {
    sku: 'GL20',
    name: '20A Blank Face GFCI Module',
    category: 'blank',
    rating: '20A, 125V',
    nema: 'Blank face',
    feature: 'Blank face',
    grade: 'Residential & Commercial Grade',
    listing: REVIEW_LISTING,
    summary:
      '20A, 125V blank-face self-test GFCI with back and side wiring and a self-grounding clip.',
    highlights: ['Blank face', 'Self-test every 15 min', 'Reverse-wiring lockout'],
    features: ['Blank-face GFCI configuration', ...SHARED_FEATURES],
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' },
    assets: buildAssets('GL20')
  }
];

export const productReviewQueue = [
  {
    sku: 'FLB20',
    publish: false,
    reason: 'Archived website model has no verified matching local image folder or complete specification set.'
  }
];

export function productGallery(sku) {
  return findProduct(sku)?.assets.gallery || [];
}

export function productImage(sku, role = 'card') {
  const product = findProduct(sku);
  const assetRole = PRODUCT_IMAGE_ROLE_MAP.get(role);
  if (!product || !assetRole) return PRODUCT_PLACEHOLDER;

  return assetPath(product.sku, assetRole);
}

export function productFinishImage(sku, finishSlug) {
  return findProduct(sku)?.assets.finishes?.[finishSlug]
    || PRODUCT_PLACEHOLDER;
}

export function colorImage(sku, finishSlug) {
  return productFinishImage(sku, finishSlug);
}

export function filterGfciProducts(list, filters = {}) {
  const query = String(filters.query ?? '').trim().toLowerCase();
  const application = String(filters.application ?? '').toLowerCase();
  const classification = String(filters.classification ?? '').toLowerCase();
  const source = Array.isArray(list) ? list : [];

  return source.filter((product) => {
    const matchesQuery = !query || [product.sku, product.name, product.feature, product.grade]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(query);
    const matchesAmperage = !filters.amperage || product.rating?.startsWith(filters.amperage);
    const matchesVariant = !filters.variant || product.category === filters.variant;
    const matchesApplication = !application || product.grade?.toLowerCase().includes(application);
    const matchesClassification = !classification || product.category === classification;

    return matchesQuery && matchesAmperage && matchesVariant && matchesApplication && matchesClassification;
  });
}

export function findProduct(sku) {
  return products.find((p) => p.sku.toLowerCase() === String(sku).toLowerCase());
}

export function isVerifiedListing(product) {
  return product?.listing?.status === 'verified' && Boolean(product.listing.file);
}

export const otherLines = [
  {
    title: 'USB Outlets',
    body: 'Type-A / Type-C combinations from 3100 mA to PD 65 W GaN, in 15A and 20A NEMA faces.',
    items: ['3100 / 3600 / 4200 / 5000 mA', 'PD 20W / 36W / 65W GaN', '4-port 4200 mA', 'UL file E498095']
  },
  {
    title: 'Standard Receptacles',
    body: 'Duplex, Decora, commercial and industrial grade receptacles in TR and WR variants.',
    items: ['R15 / R20 duplex', 'D15 / D20 Decora', 'C15 / C20 commercial', 'CR15 / CR20 / CD20 industrial']
  },
  {
    title: 'Dimmers & Sensor Switches',
    body: 'Slide and push-button dimmers, PIR occupancy sensors and smart Wi-Fi variants.',
    items: ['DM2010 slide dimmer', 'DM2010S 0-10V', 'SD3030 / SP3020 PIR', 'SSM2010 smart push button']
  },
  {
    title: 'Switches & Wallplates',
    body: 'Toggle, rocker and paddle switches plus screwless and standard decorator wallplates.',
    items: ['T15 / T15.3 toggle', 'DS15 paddle rocker', 'BS1801–BS18034 wallplates', 'Glossy and matte finishes']
  }
];
