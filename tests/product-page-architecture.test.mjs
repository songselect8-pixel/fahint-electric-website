import fs from 'node:fs';
import assert from 'node:assert/strict';

const productsOverview = fs.readFileSync('src/pages/ProductsOverview.jsx', 'utf8');
const lineDetail = fs.readFileSync('src/pages/LineDetail.jsx', 'utf8');
const productTabs = fs.readFileSync('src/components/ProductTabs.jsx', 'utf8');
const catalogDataPath = 'src/data/overviewCatalog.js';

assert.ok(fs.existsSync(catalogDataPath), 'Product overview should use a verified catalogue data file.');
const catalogData = fs.existsSync(catalogDataPath) ? fs.readFileSync(catalogDataPath, 'utf8') : '';

assert.match(productsOverview, /className="products-hero"/, 'Products overview should use the compact products hero.');
assert.match(productsOverview, /className="series-mosaic"/, 'Products overview should include a visual series mosaic.');
assert.match(productsOverview, /catalog-showcase/, 'Products overview should include grouped catalog rows.');
assert.match(productsOverview, /className="sourcing-panel"/, 'Products overview should include an OEM/ODM sourcing panel.');
const visibleLineSlugs = productsOverview.match(/const OVERVIEW_PRODUCT_LINE_SLUGS = \[([\s\S]*?)\];/);
assert.ok(visibleLineSlugs, 'Products overview should define the product lines shown on the overview page.');
assert.doesNotMatch(visibleLineSlugs[1], /wallplates/, 'Products overview should not show Wallplates as a core product-line entry.');
assert.match(productsOverview, /overviewProductLines\.map/, 'Products overview should render from the filtered overview product lines.');
assert.doesNotMatch(productsOverview, /Shared Palette|One Finish Range Across Every Family|color-grid|colors\.map/, 'Products overview should not show a generic GFCI color palette.');
assert.doesNotMatch(productsOverview, /import \{ colors \}/, 'Products overview should not import GFCI color data.');
assert.match(productsOverview, /catalogRows/, 'Products overview should render model cards from verified catalogue rows.');
assert.doesNotMatch(productsOverview, /function getLineModels/, 'Products overview should not auto-generate model cards by cycling series gallery images.');
assert.doesNotMatch(lineDetail, /Available Across the Standard Palette|color-grid|colors\.map/, 'Product series pages should not show the generic GFCI color palette.');
assert.doesNotMatch(lineDetail, /import \{ products, categories, colors \}/, 'Line detail should not import color data.');
assert.match(lineDetail, /findCatalogRow/, 'Generic product series pages should reuse verified catalogue images.');
assert.doesNotMatch(lineDetail, /line\.gallery\.map/, 'Generic product series gallery should not render the old recycled line.gallery images.');

assert.match(productTabs, /HOME_PRODUCT_LINE_SLUGS/, 'Homepage product tabs should use an explicit five-family selection.');
const homeLineSlugs = productTabs.match(/HOME_PRODUCT_LINE_SLUGS = \[([\s\S]*?)\]/);
assert.ok(homeLineSlugs, 'Homepage product tabs should define visible product families.');
const homeLineList = homeLineSlugs[1];
['gfci', 'usb-outlets', 'receptacles', 'smart-switches', 'lighting-switches'].forEach((slug) => {
  assert.match(homeLineList, new RegExp(`['"]${slug}['"]`), `Homepage product tabs should keep ${slug}.`);
});
['dimmers', 'wallplates'].forEach((slug) => {
  assert.doesNotMatch(homeLineList, new RegExp(`['"]${slug}['"]`), `Homepage product tabs should not show ${slug}.`);
});

[
  'usb-ftr15-3100.webp',
  'usb-ftr15c-3100.webp',
  'usb-ftr15dc-3100.webp',
  'usb-ftr20-3100.webp',
  'receptacle-r15.webp',
  'receptacle-r15q.webp',
  'receptacle-r20.webp',
  'receptacle-rt15.webp',
  'dimmer-dm2010.webp',
  'dimmer-dm2010s.webp',
  'smart-usw8811.webp',
  'smart-usw8821.webp',
  'smart-usw8831.webp',
  'smart-usw8832.webp',
  'switch-ds15.webp',
  'switch-ds153.webp',
  'switch-2gang.webp',
  'switch-3gang.webp'
].forEach((filename) => {
  assert.match(catalogData, new RegExp(`/assets/images/catalog/${filename}`), `Verified catalogue data should use ${filename}.`);
});

console.log('Product page architecture checks passed.');
