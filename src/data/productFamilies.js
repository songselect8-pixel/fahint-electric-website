const editorialAsset = (name) => `assets/images/editorial-home/${name}`;

export const productFamilies = [
  {
    id: 'gfci',
    name: 'GFCI Outlets',
    href: '/products/gfci',
    image: editorialAsset('product-gfci.jpg'),
    label: 'Ground-fault protection',
    summary: 'Self-test protection for residential, commercial and demanding installation environments.'
  },
  {
    id: 'usb',
    name: 'USB & Type-C Outlets',
    href: '/products/usb-outlets',
    image: editorialAsset('product-usb.jpg'),
    label: 'In-wall charging',
    summary: 'Integrated charging devices for homes, hospitality and workplace projects.'
  },
  {
    id: 'receptacles',
    name: 'Receptacles',
    href: '/products/receptacles',
    image: editorialAsset('product-receptacle.jpg'),
    label: 'Wiring devices',
    summary: 'Duplex and decorator receptacles with coordinated plates and finish options.'
  },
  {
    id: 'smart',
    name: 'Smart Home Controls',
    href: '/products/smart-switches',
    image: editorialAsset('product-smart.jpg'),
    label: 'Connected control',
    summary: 'Wi-Fi and Zigbee controls designed for coordinated connected-home programs.'
  },
  {
    id: 'switches',
    name: 'Switches & Dimmers',
    href: '/products/dimmers',
    image: editorialAsset('category-switches.jpg'),
    label: 'Lighting control',
    summary: 'Switching and dimming platforms for residential and commercial specifications.'
  }
];
