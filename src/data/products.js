export const colors = [
  { slug: 'white', name: 'White', hex: '#F5F5F2', note: 'Core volume colour — always in stock' },
  { slug: 'ivory', name: 'Ivory', hex: '#EDE4CE', note: 'Standard for modern minimalist apartments' },
  { slug: 'almond', name: 'Light Almond', hex: '#E4D8C3', note: 'The renovation-market favourite' },
  { slug: 'black', name: 'Black', hex: '#232323', note: 'High-end commercial and smart residential' },
  { slug: 'grey', name: 'Grey', hex: '#8C9095', note: 'Commercial and industrial specification' },
  { slug: 'brown', name: 'Brown', hex: '#5A4433', note: 'Classic elegance upgrade option' }
];

export const categories = [
  { slug: 'all', name: 'All GFCI' },
  { slug: 'standard', name: 'Standard' },
  { slug: 'tr', name: 'Tamper-Resistant' },
  { slug: 'wr', name: 'TR + Weather-Resistant' },
  { slug: 'blank', name: 'Blank Face' },
  { slug: 'industrial', name: 'Industrial Grade' }
];

const SHARED_FEATURES = [
  'UL/cUL listed E504391, patent protected in the US and China',
  'Class A trip threshold meets or exceeds UL 943 5th Edition 2018',
  'Mechanical structure allows the GFCI to be tripped and powered off in any state',
  'No power to the receptacle face if line-load is reversed; resettable once corrected',
  'Dual-colour status indicator for power and protection state',
  'Impact-resistant thermoplastic cover and body',
  'Thickened silver contacts to reduce temperature rise',
  'Self-test every 15 minutes; initial self-test within 3 seconds of power up',
  'Self-grounding clip and 1.2 mm zinc-plated steel yoke',
  'Fed Spec rated in both 15A and 20A'
];

const INDUSTRIAL_FEATURES = [
  'UL/cUL listed E504391, patent protected in the US and China',
  'Anti-vibration PCB layout designed for generators and outdoor lighting',
  'Nylon front cover, base and buttons for gasoline and solvent resistance',
  'Special PCB shielding against high-frequency electromagnetic interference',
  'No feed-through terminals — dedicated point-of-use protection',
  'Class A trip threshold meets or exceeds UL 943 5th Edition 2018',
  'Reverse-wiring lockout with resettable recovery',
  'Dual-colour status indicator for power and protection state',
  'Thickened silver contacts to reduce temperature rise'
];

export const products = [
  {
    sku: 'GF15',
    name: '15A Self-Test GFCI Receptacle',
    category: 'standard',
    rating: '15A, 125V',
    nema: '5-15R',
    feature: 'Standard',
    grade: 'Residential / Commercial',
    hasImages: true,
    summary:
      'The volume workhorse. Class A self-test protection for kitchens, bathrooms and general residential circuits, with 20A feed-through capacity.',
    highlights: ['Self-test every 15 min', '20A feed-through', 'Reverse-wiring lockout'],
    features: SHARED_FEATURES,
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' }
  },
  {
    sku: 'GF20',
    name: '20A Self-Test GFCI Receptacle',
    category: 'standard',
    rating: '20A, 125V',
    nema: '5-20R',
    feature: 'Standard',
    grade: 'Residential / Commercial',
    hasImages: true,
    summary:
      'T-slot 20A version for kitchen small-appliance branch circuits, laundry and commercial counters requiring higher continuous load.',
    highlights: ['20A T-slot face', 'Self-test every 15 min', 'Fed Spec rated'],
    features: SHARED_FEATURES,
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' }
  },
  {
    sku: 'GT15',
    name: '15A Tamper-Resistant GFCI',
    category: 'tr',
    rating: '15A, 125V',
    nema: '5-15R',
    feature: 'TR',
    grade: 'Residential',
    hasImages: true,
    summary:
      'Adds an NEC-compliant shutter system that blocks single-prong access while keeping normal plug insertion easy. Required in dwelling units.',
    highlights: ['NEC tamper-resistant', 'Child safety shutter', 'Self-test every 15 min'],
    features: [
      'TR shutter mechanism blocks contact access unless a two- or three-prong plug is inserted',
      'Complies with the NEC requirement that 15A and 20A receptacles in dwelling units be tamper-resistant',
      ...SHARED_FEATURES
    ],
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' }
  },
  {
    sku: 'GT20',
    name: '20A Tamper-Resistant GFCI',
    category: 'tr',
    rating: '20A, 125V',
    nema: '5-20R',
    feature: 'TR',
    grade: 'Residential',
    hasImages: true,
    summary:
      '20A tamper-resistant variant for dwelling-unit small-appliance and laundry circuits where higher amperage is specified.',
    highlights: ['NEC tamper-resistant', '20A T-slot face', 'Self-test every 15 min'],
    features: [
      'TR shutter mechanism blocks contact access unless a two- or three-prong plug is inserted',
      'Complies with the NEC requirement that 15A and 20A receptacles in dwelling units be tamper-resistant',
      ...SHARED_FEATURES
    ],
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' }
  },
  {
    sku: 'GW15',
    name: '15A Weather-Resistant GFCI (TR + WR)',
    category: 'wr',
    rating: '15A, 125V',
    nema: '5-15R',
    feature: 'TR & WR',
    grade: 'Outdoor / Damp locations',
    hasImages: true,
    summary:
      'Built for wet and damp locations per NEC 406.8. UV- and cold-impact-resistant materials with conformal-coated boards protecting critical components from moisture.',
    highlights: ['NEC 406.8 wet location', 'UV + cold impact resistant', 'Moisture-shielded PCB'],
    features: [
      'Designed for wet and damp locations to meet NEC Section 406.8',
      'UV-resistant and cold-impact-resistant plastics on face and buttons',
      'Special circuit board coating protects critical components from moisture',
      'TR shutter system included',
      ...SHARED_FEATURES
    ],
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' }
  },
  {
    sku: 'GW20',
    name: '20A Weather-Resistant GFCI (TR + WR)',
    category: 'wr',
    rating: '20A, 125V',
    nema: '5-20R',
    feature: 'TR & WR',
    grade: 'Outdoor / Damp locations',
    hasImages: true,
    summary:
      '20A outdoor-rated GFCI for patios, pool equipment, RV hookups and exterior commercial circuits exposed to weather.',
    highlights: ['NEC 406.8 wet location', '20A T-slot face', 'Moisture-shielded PCB'],
    features: [
      'Designed for wet and damp locations to meet NEC Section 406.8',
      'UV-resistant and cold-impact-resistant plastics on face and buttons',
      'Special circuit board coating protects critical components from moisture',
      'TR shutter system included',
      ...SHARED_FEATURES
    ],
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' }
  },
  {
    sku: 'GL20',
    name: '20A Blank Face GFCI Module',
    category: 'blank',
    rating: '20A, 125V',
    nema: 'Blank face',
    feature: 'Blank face',
    grade: 'Commercial',
    hasImages: true,
    summary:
      'Dead-front GFCI module that protects downstream receptacles and hardwired equipment without exposing a plug face — ideal for spas, HVAC and dedicated circuits.',
    highlights: ['Dead-front protection', 'Protects downstream loads', 'Self-test every 15 min'],
    features: SHARED_FEATURES,
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' }
  },
  {
    sku: 'GTN15',
    name: '15A Industrial Grade GFCI (Anti-Gasoline & Anti-Vibrate)',
    category: 'industrial',
    rating: '15A, 125V',
    nema: '5-15R',
    feature: 'Anti-Gasoline & Anti-Vibrate',
    grade: 'Industrial',
    hasImages: false,
    summary:
      'Nylon-bodied industrial GFCI engineered for generators, outdoor lighting and vibration-heavy equipment, with EMI-hardened PCB and no feed-through terminals.',
    highlights: ['Nylon body', 'Anti-vibration PCB', 'EMI hardened'],
    features: INDUSTRIAL_FEATURES,
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' }
  },
  {
    sku: 'GTN20',
    name: '20A Industrial Grade GFCI (Anti-Gasoline & Anti-Vibrate)',
    category: 'industrial',
    rating: '20A, 125V',
    nema: '5-20R',
    feature: 'Anti-Gasoline & Anti-Vibrate',
    grade: 'Industrial',
    hasImages: false,
    summary:
      '20A industrial variant for portable generators, jobsite power and equipment exposed to fuel, solvents and continuous vibration.',
    highlights: ['Nylon body', 'Anti-vibration PCB', 'No feed-through terminals'],
    features: INDUSTRIAL_FEATURES,
    dimensions: { face: '4.53 in (115 mm)', width: '2.75 in (70 mm)', depth: '1.56 in (39.7 mm)' }
  }
];

const FALLBACK = 'gf15';

export function productImage(sku, shot) {
  const key = String(sku).toLowerCase();
  const base = products.find((p) => p.sku === sku)?.hasImages ? key : FALLBACK;
  return `assets/images/products/${base}-${shot}.webp`;
}

export function productGallery(sku) {
  return ['plate', 'main', 'sides', 'back', 'lifestyle'].map((shot) => productImage(sku, shot));
}

export function colorImage(sku, colorSlug) {
  const key = String(sku).toLowerCase();
  const base = products.find((p) => p.sku === sku)?.hasImages ? key : FALLBACK;
  return `assets/images/products/${base}-${colorSlug}.webp`;
}

export function findProduct(sku) {
  return products.find((p) => p.sku.toLowerCase() === String(sku).toLowerCase());
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
