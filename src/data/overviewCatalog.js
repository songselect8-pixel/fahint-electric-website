import { productImage } from './products.js';

export const catalogRows = [
  {
    slug: 'gfci',
    models: [
      {
        key: 'GF15',
        title: '15A Self-Test GFCI Receptacle',
        meta: 'GF15 · 15A, 125V',
        image: productImage('GF15', 'plate'),
        to: '/products/gfci/gf15'
      },
      {
        key: 'GF20',
        title: '20A Self-Test GFCI Receptacle',
        meta: 'GF20 · 20A, 125V',
        image: productImage('GF20', 'plate'),
        to: '/products/gfci/gf20'
      },
      {
        key: 'GT15',
        title: '15A Tamper-Resistant GFCI',
        meta: 'GT15 · 15A, 125V',
        image: productImage('GT15', 'plate'),
        to: '/products/gfci/gt15'
      },
      {
        key: 'GT20',
        title: '20A Tamper-Resistant GFCI',
        meta: 'GT20 · 20A, 125V',
        image: productImage('GT20', 'plate'),
        to: '/products/gfci/gt20'
      }
    ]
  },
  {
    slug: 'usb-outlets',
    models: [
      {
        key: 'FTR15-3100',
        title: 'FTR15-3100',
        meta: '3100 mA · Type-A USB receptacle',
        image: '/assets/images/catalog/usb-ftr15-3100.webp',
        to: '/products/usb-outlets'
      },
      {
        key: 'FTR15C-3100',
        title: 'FTR15C-3100',
        meta: '3100 mA · Type-C USB receptacle',
        image: '/assets/images/catalog/usb-ftr15c-3100.webp',
        to: '/products/usb-outlets'
      },
      {
        key: 'FTR15DC-3100',
        title: 'FTR15DC-3100',
        meta: '3100 mA · Dual USB-C receptacle',
        image: '/assets/images/catalog/usb-ftr15dc-3100.webp',
        to: '/products/usb-outlets'
      },
      {
        key: 'FTR20-3100',
        title: 'FTR20-3100',
        meta: '3100 mA · 20A USB receptacle',
        image: '/assets/images/catalog/usb-ftr20-3100.webp',
        to: '/products/usb-outlets'
      }
    ]
  },
  {
    slug: 'receptacles',
    models: [
      {
        key: 'R15',
        title: 'R15',
        meta: 'R series duplex · 15A',
        image: '/assets/images/catalog/receptacle-r15.webp',
        to: '/products/receptacles'
      },
      {
        key: 'R15Q',
        title: 'R15Q',
        meta: 'R series duplex · 15A quick-wire',
        image: '/assets/images/catalog/receptacle-r15q.webp',
        to: '/products/receptacles'
      },
      {
        key: 'R20',
        title: 'R20',
        meta: 'R series duplex · 20A',
        image: '/assets/images/catalog/receptacle-r20.webp',
        to: '/products/receptacles'
      },
      {
        key: 'RT15',
        title: 'RT15',
        meta: 'R series duplex · Tamper-resistant',
        image: '/assets/images/catalog/receptacle-rt15.webp',
        to: '/products/receptacles'
      }
    ]
  },
  {
    slug: 'dimmers',
    models: [
      {
        key: 'DM2010',
        title: 'DM2010',
        meta: 'Digital dimmer light switch',
        image: '/assets/images/catalog/dimmer-dm2010.webp',
        to: '/products/dimmers'
      },
      {
        key: 'DM2010S',
        title: 'DM2010S',
        meta: '0-10V digital dimmer light switch',
        image: '/assets/images/catalog/dimmer-dm2010s.webp',
        to: '/products/dimmers'
      }
    ]
  },
  {
    slug: 'smart-switches',
    models: [
      {
        key: 'USW8811',
        title: 'USW8811',
        meta: 'Wi-Fi neutral required · 1 gang',
        image: '/assets/images/catalog/smart-usw8811.webp',
        to: '/products/smart-switches'
      },
      {
        key: 'USW8821',
        title: 'USW8821',
        meta: 'Wi-Fi neutral required · 2 gang',
        image: '/assets/images/catalog/smart-usw8821.webp',
        to: '/products/smart-switches'
      },
      {
        key: 'USW8831',
        title: 'USW8831',
        meta: 'Wi-Fi neutral required · 3 gang',
        image: '/assets/images/catalog/smart-usw8831.webp',
        to: '/products/smart-switches'
      },
      {
        key: 'USW8832',
        title: 'USW8832',
        meta: 'Wi-Fi neutral required · scene switch',
        image: '/assets/images/catalog/smart-usw8832.webp',
        to: '/products/smart-switches'
      }
    ]
  },
  {
    slug: 'lighting-switches',
    models: [
      {
        key: 'DS15',
        title: 'DS15 single pole',
        meta: 'Paddle rocker · single pole',
        image: '/assets/images/catalog/switch-ds15.webp',
        to: '/products/lighting-switches'
      },
      {
        key: 'DS15.3',
        title: 'DS15.3 three-way',
        meta: 'Paddle rocker · three-way',
        image: '/assets/images/catalog/switch-ds153.webp',
        to: '/products/lighting-switches'
      },
      {
        key: '2-gang-switch',
        title: '2 Gang Paddle Switch',
        meta: 'Paddle rocker · 2 gang',
        image: '/assets/images/catalog/switch-2gang.webp',
        to: '/products/lighting-switches'
      },
      {
        key: '3-gang-switch',
        title: '3 Gang Paddle Switch',
        meta: 'Paddle rocker · 3 gang',
        image: '/assets/images/catalog/switch-3gang.webp',
        to: '/products/lighting-switches'
      }
    ]
  }
];

export function findCatalogRow(slug) {
  return catalogRows.find((row) => row.slug === slug);
}
