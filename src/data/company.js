export const company = {
  name: 'Wenzhou Fahint Electric Co., Ltd.',
  shortName: 'Fahint Electric',
  brand: 'FAHINT',
  tagline: 'Crafting Quality, Delivering Value',
  since: 2015,
  email: 'louis@fahint.com',
  phone: '+86 188 5734 9189',
  whatsapp: '+8618857349189',
  website: 'www.fahint.com',
  location: 'Wenzhou, Zhejiang Province, China',
  address: 'Wenzhou, Zhejiang Province, China — 25 minutes from Wenzhou International Airport',
  ulFile: 'E504391',
  hours: 'Mon – Sat, 08:30 – 18:00 (GMT+8)'
};

export const stats = [
  { value: '2015', label: 'Year established', suffix: '' },
  { value: '70,000', label: 'Factory area (sq ft)', suffix: '' },
  { value: '12', label: 'Automated inspection lines', suffix: '' },
  { value: '98', label: 'First pass yield', suffix: '%' }
];

export const services = [
  {
    tone: 'navy',
    title: 'OEM & ODM Manufacturing',
    body:
      'Individual color box, logo on wall plate, logo on top/bottom body, color customization for wall plates, covers and bases, plus bracket customization. MOQ from 400 cartons.',
    link: { label: 'Start a custom project', to: '/contact' }
  },
  {
    tone: 'light',
    title: '6-Hour Engineering Response',
    body:
      'Our in-house engineering team returns customized design solutions within 6 hours, backed by US and China patents on our GFCI mechanism and PCB architecture.',
    link: { label: 'Talk to an engineer', to: '/contact' }
  },
  {
    tone: 'medium',
    title: 'US Warehouse, 10-Day Delivery',
    body:
      'Overseas warehouses serving North American customers enable shipment within 3 days and delivery in as fast as 10 days, with a decade of zero Category A complaints.',
    link: { label: 'See logistics options', to: '/about' }
  }
];

export const certifications = [
  { code: 'UL / cUL', detail: 'Listed under file E504391, UL 943 5th Edition 2018' },
  { code: 'ETL', detail: 'Verified production system' },
  { code: 'ISO 9001', detail: 'Certified quality management system' },
  { code: 'SGS', detail: 'Verified supplier audit' },
  { code: 'US Patent', detail: 'Patented GFCI mechanism' },
  { code: 'CN Patent', detail: 'Patented PCB architecture' }
];

export const capabilities = [
  {
    title: 'In-House Tooling & Injection',
    body: 'Precision molds and injection lines for thermoplastic and nylon housings.',
    image: '/assets/images/products/gf15-back-angle.webp'
  },
  {
    title: '12 Automated Inspection Lines',
    body: 'Every unit is dielectric, trip-threshold and continuity tested before packing.',
    image: '/assets/images/products/gf15-mcu.webp'
  },
  {
    title: 'Thickened Silver Contacts',
    body: 'Reduced temperature rise and longer mechanical life under commercial duty.',
    image: '/assets/images/products/gf15-sides.webp'
  },
  {
    title: 'Approved ALDI Supplier',
    body: 'Ten years of retail-grade compliance with zero Category A complaints.',
    image: '/assets/images/products/gf15-lifestyle.webp'
  }
];

export const faqs = [
  {
    q: 'Are your GFCI outlets UL listed?',
    a:
      'Yes. All Fahint GFCI receptacles are UL/cUL listed under file number E504391 and meet or exceed the Class A trip threshold and tripping-time requirements of UL 943 5th Edition (2018).'
  },
  {
    q: 'What is your MOQ for a customized order?',
    a:
      'Standard MOQ for customization — individual color box, logo on wall plate, logo on body, or custom colors for plates, covers and bases — is 400 cartons. Standard catalog items ship at lower volumes; contact us with your target quantity.'
  },
  {
    q: 'How fast can you deliver to the United States?',
    a:
      'We maintain overseas warehouses in North America. Stocked items ship within 3 days and can reach the customer in as fast as 10 days. Factory-direct production orders typically run 25–35 days depending on volume and customization.'
  },
  {
    q: 'What is the difference between TR, WR and Self-Test?',
    a:
      'TR (tamper-resistant) adds a shutter system required by the NEC for dwelling units. WR (weather-resistant) adds UV- and cold-impact-resistant materials plus conformal-coated boards for wet and damp locations per NEC 406.8. Self-Test means the GFCI automatically tests its own protection every 15 minutes.'
  },
  {
    q: 'Do you offer a warranty?',
    a: 'Every product carries a 3-year warranty. Our first pass yield exceeds 98% across 12 automated inspection lines.'
  },
  {
    q: 'Can you supply neutral or private-label packaging?',
    a:
      'Yes. We produce both neutral packaging and full private-label programs, including custom color boxes, printed wall plates and branded body markings.'
  }
];

export const applications = [
  'Bathrooms, kitchens, basements, garages and laundry rooms',
  'Outdoor and wet locations per NEC Section 406.8',
  'School classrooms, laboratories, restrooms and commercial kitchens',
  'Airports, offices, shopping centers, restaurants and hotels',
  'Generators, outdoor lighting and industrial equipment (Anti-Gasoline series)'
];
