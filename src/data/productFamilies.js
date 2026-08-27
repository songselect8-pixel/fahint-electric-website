const editorialAsset = (name) => `assets/images/editorial-home/${name}`;

export const productFamilies = [
  {
    id: 'gfci',
    name: 'GFCI Outlets',
    href: '/products/gfci',
    image: editorialAsset('product-gfci-optimized.webp'),
    label: 'Ground-fault protection',
    summary: 'Self-test protection for residential, commercial and demanding installation environments.'
  },
  {
    id: 'usb',
    name: 'USB & Type-C Outlets',
    href: '/products/usb-outlets',
    image: editorialAsset('product-usb-optimized.webp'),
    label: 'In-wall charging',
    summary: 'Integrated charging devices for homes, hospitality and workplace projects.'
  },
  {
    id: 'receptacles',
    name: 'Receptacles',
    href: '/products/receptacles',
    image: editorialAsset('product-receptacle-optimized.webp'),
    label: 'Wiring devices',
    summary: 'Duplex and decorator receptacles with coordinated plates and finish options.'
  },
  {
    id: 'smart',
    name: 'Smart Home Controls',
    href: '/products/smart-switches',
    image: editorialAsset('product-smart-optimized.webp'),
    label: 'Connected control',
    summary: 'Wi-Fi and Zigbee controls designed for coordinated connected-home programs.'
  },
  {
    id: 'switches',
    name: 'Switches & Dimmers',
    href: '/products/dimmers',
    image: editorialAsset('category-switches-optimized.webp'),
    label: 'Lighting control',
    summary: 'Switching and dimming platforms for residential and commercial specifications.'
  }
];
