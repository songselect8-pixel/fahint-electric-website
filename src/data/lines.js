// The seven wiring-device families Fahint manufactures.
// Data traced to the FAHINT product catalogue; GFCI detail lives in products.js.

export const productLines = [
  {
    slug: 'gfci',
    name: 'GFCI Outlets',
    short: 'GFCI',
    cover: 'assets/images/products/gf15-plate.webp',
    tagline: 'Class A self-test ground fault protection',
    summary:
      'UL/cUL listed Class A GFCI receptacles in 15A and 20A, covering standard, tamper-resistant, weather-resistant, blank face and industrial grade.',
    ulFile: 'E504391',
    standard: 'UL 943 5th Edition 2018',
    highlights: ['Self-test every 15 minutes', 'Reverse-wiring lockout', 'Seven finishes'],
    models: ['GF15', 'GF20', 'GT15', 'GT20', 'GW15', 'GW20', 'GL20', 'GTN15', 'GTN20'],
    detailed: true
  },
  {
    slug: 'usb-outlets',
    name: 'USB Outlets',
    short: 'USB',
    cover: 'assets/images/lines/usb-3100-plate.webp',
    tagline: 'Type-A, Type-C and PD fast charging receptacles',
    summary:
      'Combination receptacles with integrated USB charging, from 3100 mA Type-A pairs up to 65 W GaN Power Delivery, in 15A and 20A NEMA faces.',
    ulFile: 'E498095',
    standard: 'UL listed',
    highlights: ['3100 - 5000 mA Type-A', 'PD 20W / 36W / 65W GaN', '15A and 20A faces'],
    groups: [
      { name: '3100 mA', items: ['FTR15-3100', 'FTR15C-3100', 'FTR15DC-3100', 'FTR20-3100', 'FTR20C-3100', 'FTR20DC-3100'] },
      { name: '3600 mA', items: ['FTR15-3600', 'FTR20-3600'] },
      { name: '4200 mA', items: ['FTR15-4200', 'FTR20-4200', '4-port 4200 mA'] },
      { name: '5000 mA', items: ['FTR15-5000', 'FTR20-5000'] },
      { name: 'Power Delivery', items: ['PD 20W', 'PD 36W', 'PD 65W GaN'] }
    ],
    gallery: ['assets/images/lines/usb-3100-plate.webp', 'assets/images/lines/usb-3100.webp', 'assets/images/lines/usb-pd65-plate.webp', 'assets/images/lines/usb-pd65.webp']
  },
  {
    slug: 'receptacles',
    name: 'Standard Receptacles',
    short: 'Receptacles',
    cover: 'assets/images/lines/recep-decora-plate.webp',
    tagline: 'Duplex, Decora, commercial and industrial grade',
    summary:
      'The full American standard receptacle range covers R series duplex, D series Decora, and C series commercial and industrial grade. Each is available in TR and WR variants.',
    standard: 'UL listed',
    highlights: ['R / D / C series', 'TR and WR variants', '15A and 20A'],
    groups: [
      { name: 'R series duplex', items: ['R15', 'R15Q', 'R20', 'RT15', 'RT15Q', 'RT20', 'RW15', 'RW15Q', 'RW20'] },
      { name: 'D series Decora', items: ['D15', 'D15Q', 'D20', 'DT15', 'DT15Q', 'DT20', 'DW15', 'DW15Q', 'DW20'] },
      { name: 'C series commercial', items: ['C15', 'C20', 'CR15', 'CR20', 'CD20'] }
    ],
    gallery: ['assets/images/lines/recep-decora-plate.webp', 'assets/images/lines/recep-decora.webp', 'assets/images/lines/recep-duplex.webp', 'assets/images/lines/recep-duplex-plate.webp']
  },
  {
    slug: 'dimmers',
    name: 'Dimmers',
    short: 'Dimmers',
    cover: 'assets/images/lines/dimmer-plate.webp',
    tagline: 'Digital slide dimmers and 0-10V control',
    summary:
      'Digital dimmer light switches for LED, CFL, halogen and incandescent loads, including a 0-10V variant for commercial lighting control.',
    standard: 'UL listed',
    highlights: ['DM2010 digital slide', 'DM2010S 0-10V', 'Seven finishes'],
    groups: [{ name: 'Digital dimmers', items: ['DM2010 - Digital Dimmer Light Switch', 'DM2010S - 0-10V Dimmer Light Switch'] }],
    gallery: ['assets/images/lines/dimmer-plate.webp', 'assets/images/lines/dimmer.webp']
  },
  {
    slug: 'smart-switches',
    name: 'Smart Switches',
    short: 'Smart',
    cover: 'assets/images/lines/smart-switch.webp',
    tagline: 'Wi-Fi, Zigbee and touch glass panels',
    summary:
      'Tempered glass touch switches with Wi-Fi and Zigbee connectivity, in both neutral-required and single-live-wire configurations, for US and EU standards.',
    standard: 'UL listed',
    highlights: ['Wi-Fi and Zigbee', 'Neutral or single live wire', 'Tempered glass touch panel'],
    groups: [
      { name: 'Wi-Fi neutral required', items: ['USW8811', 'USW8821', 'USW8831', 'USW8832', 'USW8833', 'USW8841'] },
      { name: 'Wi-Fi single live wire', items: ['1 gang', '2 gang', '3 gang'] },
      { name: 'Zigbee single live wire', items: ['1 gang', '2 gang', '3 gang'] },
      { name: 'Touch switch', items: ['Neutral required', 'Single live wire'] }
    ],
    gallery: ['assets/images/lines/smart-switch.webp', 'assets/images/lines/smart-switch-alt.webp']
  },
  {
    slug: 'lighting-switches',
    name: 'Lighting Switches',
    short: 'Switches',
    cover: 'assets/images/lines/switch-paddle.webp',
    tagline: 'Paddle rocker and toggle wall switches',
    summary:
      'Decorator paddle rocker and classic toggle switches in single pole, three-way and four-way configurations, matched to the same seven-finish palette.',
    standard: 'UL listed',
    highlights: ['1 / 2 / 3 gang', 'Single pole and 3-way', 'Paddle and toggle'],
    groups: [
      { name: 'Paddle rocker', items: ['DS15 single pole', 'DS15.3 three-way', '2 gang', '3 gang'] },
      { name: 'Toggle', items: ['T15', 'T15.3 three-way'] }
    ],
    gallery: ['assets/images/lines/switch-paddle.webp', 'assets/images/lines/switch-paddle-alt.webp']
  },
  {
    slug: 'wallplates',
    name: 'Wallplates',
    short: 'Wallplates',
    cover: 'assets/images/lines/wallplate.webp',
    tagline: 'Screwless and standard decorator plates',
    summary:
      'Screwless and standard decorator wallplates from 1 to 4 gang, in glossy and matte finishes, coordinated with every Fahint device family.',
    standard: 'UL listed',
    highlights: ['1 - 4 gang', 'Glossy and matte', 'Screwless and standard'],
    groups: [
      { name: 'Decorator plates', items: ['BS1801', 'BS1802', 'BS18012', 'BS18013', 'BS18014'] },
      { name: 'Screwless plates', items: ['BS1803', 'BS18032', 'BS18033', 'BS18034'] },
      { name: 'Specialty', items: ['BS1804 / BS1804M', 'BS1805 extension', 'BS1806', 'BS1807 blank'] }
    ],
    gallery: ['assets/images/lines/wallplate.webp', 'assets/images/lines/wallplate-matte.webp']
  }
];

export function findLine(slug) {
  return productLines.find((l) => l.slug === slug);
}
