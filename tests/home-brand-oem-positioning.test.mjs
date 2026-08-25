import fs from 'node:fs';
import assert from 'node:assert/strict';

const home = fs.readFileSync('src/pages/Home.jsx', 'utf8');
const hero = fs.readFileSync('src/components/home/BrandHero.jsx', 'utf8');
const oemPoster = fs.readFileSync('src/components/home/OemPoster.jsx', 'utf8');
const flow = fs.readFileSync('src/components/home/ManufacturingFlow.jsx', 'utf8');
const styles = fs.readFileSync('src/styles.css', 'utf8');
const productTabs = fs.readFileSync('src/components/ProductTabs.jsx', 'utf8');

[
  'Wiring Devices, Built for Your Brand.',
  'Five coordinated product platforms',
  'Start an OEM/ODM project'
].forEach((phrase) => {
  assert.match(hero, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `Hero should include: ${phrase}`);
});

assert.match(home, /One Platform\. Five Product Families\./, 'Homepage should present five product families.');
assert.match(oemPoster, /From Certified Platforms to Your Private-label Line\./, 'Homepage should include the OEM poster.');

['Select', 'Customize', 'Approve', 'Produce'].forEach((stage) => {
  assert.match(flow, new RegExp(`title: '${stage}'`), `Manufacturing flow should include ${stage}.`);
});

['BrandHero', 'ProductTabs', 'BrandApplicationStory', 'OemPoster', 'ManufacturingFlow', 'TrustStrip', 'HomepageCta'].forEach(
  (component) => {
    assert.match(home, new RegExp(component), `Homepage should render ${component}.`);
  }
);

assert.match(productTabs, /HOME_PRODUCT_LINE_SLUGS = \[[\s\S]*?['"]gfci['"][\s\S]*?\]/, 'Homepage tabs should include GFCI.');
assert.doesNotMatch(productTabs.match(/HOME_PRODUCT_LINE_SLUGS = \[([\s\S]*?)\]/)[1], /wallplates|dimmers/, 'Homepage tabs should exclude Wallplates and Dimmers.');

['Class A GFCI Receptacles for Every Specification', 'Buyer questions, answered', 'Standards, specification and sourcing'].forEach(
  (phrase) => {
    assert.doesNotMatch(home, new RegExp(phrase), `Homepage should not render the removed long-form module: ${phrase}`);
  }
);

['.home-hero', '.home-products', '.home-brand-story', '.home-oem-poster', '.home-flow', '.home-trust', '.home-cta'].forEach(
  (selector) => {
    assert.match(styles, new RegExp(selector.replace('.', '\\.')), `Styles should support ${selector}.`);
  }
);

console.log('Homepage brand + OEM positioning checks passed.');
