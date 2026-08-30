import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { catalogProducts, findCatalogProduct, getCatalogProducts, modelKey, productHref } from './catalogProducts.js';
import { products } from './products.js';
import { PUBLIC_ROUTES } from '../../scripts/prepare-pages.mjs';

const rows = (product) => new Map(product.specificationGroups.flatMap((group) => group.rows));
const model = (family, sku) => findCatalogProduct(family, sku);

describe('complete, model-specific catalogue', () => {
  it('covers each source model once without merging surface variants or product families', () => {
    const legacy = JSON.parse(readFileSync('src/data/catalog/legacy-products.json', 'utf8'));
    expect(legacy).toHaveLength(95);
    expect(catalogProducts).toHaveLength(150);
    expect(products.length + catalogProducts.length).toBe(157);
    expect(new Set(catalogProducts.map(productHref)).size).toBe(catalogProducts.length);
    expect(Object.fromEntries(['usb-outlets', 'receptacles', 'dimmers', 'smart-switches', 'lighting-switches', 'wallplates', 'gfci']
      .map((line) => [line, getCatalogProducts(line).length])))
      .toEqual({ 'usb-outlets': 37, receptacles: 30, dimmers: 2, 'smart-switches': 51, 'lighting-switches': 6, wallplates: 21, gfci: 2 });
    for (const record of legacy) {
      const existingGfci = record.family === 'gfci' && products.some((p) => p.sku === record.model);
      expect(existingGfci || catalogProducts.some((p) => p.sourceUrl === record.sourceUrl), record.sourceUrl).toBe(true);
    }
  });

  it('uses real, complete local images with dimensions and traceable sources', () => {
    for (const p of catalogProducts) {
      expect(p.name, p.sku).not.toMatch(/undefined|NaN|\bnull\b/);
      expect(p.sources.length, p.sku).toBeGreaterThan(0);
      expect(p.specificationGroups.length, p.sku).toBeGreaterThan(1);
      expect(p.assets.gallery, p.sku).toContain(p.assets.hero);
      const assets = [...p.assets.gallery, ...p.assets.drawings.map((image) => image.src), ...p.assets.presentation.map((image) => image.src)];
      for (const asset of assets) {
        expect(existsSync(`public/${asset}`), `${p.sku}: ${asset}`).toBe(true);
        expect(p.assets.imageSizes[asset]?.every((dimension) => dimension > 0), `${p.sku}: image dimensions`).toBe(true);
      }
      for (const group of p.specificationGroups) {
        expect(new Set(group.rows.map(([label]) => label)).size, `${p.sku}: duplicate specification labels`).toBe(group.rows.length);
        for (const [label, value] of group.rows) expect(Boolean(label && value), `${p.sku}: ${label}`).toBe(true);
      }
    }
  });

  it('binds genuine finish images for every published model instead of an empty color list', () => {
    for (const product of catalogProducts.filter((p) => !p.draft)) {
      const expected = product.line === 'smart-switches' ? 4 : product.line === 'gfci' ? 1 : 7;
      expect(product.finishes, product.sku).toHaveLength(expected);
      expect(new Set(product.finishes.map((f) => f.image)).size, product.sku).toBe(expected);
      for (const finish of product.finishes) {
        expect(finish.name && finish.hex, `${product.sku}: ${finish.slug}`).toBeTruthy();
        expect(product.assets.finishes[finish.slug]).toBe(finish.image);
        expect(existsSync(`public/${finish.image}`), `${product.sku}: ${finish.slug}`).toBe(true);
        expect(product.assets.imageSizes[finish.image]?.every((size) => size > 0)).toBe(true);
      }
    }
  });

  it('does not interchange color photos between amperages, ports or wall-plate surfaces', () => {
    const photo = (family, sku) => model(family, sku).assets.finishes.black;
    expect(photo('usb-outlets', 'FTR15C-3100')).toBeTruthy();
    expect(photo('usb-outlets', 'FTR15C-3100')).not.toBe(photo('usb-outlets', 'FTR20C-3100'));
    expect(photo('usb-outlets', 'FTR15C-3100')).not.toBe(photo('usb-outlets', 'FTR15DC-3100'));
    expect(photo('wallplates', 'BS1801')).not.toBe(photo('wallplates', 'BS1801-M'));
    expect(photo('wallplates', 'BS1803-G')).not.toBe(photo('wallplates', 'BS1803-M'));
  });

  it('makes all approved catalogue routes deployable, but excludes FLB20 from public listings', () => {
    const draft = catalogProducts.find((p) => p.sku === 'FLB20');
    expect(draft.draft).toBe(true);
    expect(draft.reviewNotice).toMatch(/voltage.*conflict/i);
    expect(getCatalogProducts('gfci').some((p) => p.sku === 'FLB20')).toBe(false);
    expect(PUBLIC_ROUTES).not.toContain('products/gfci/flb20');
    for (const p of catalogProducts.filter((p) => !p.draft)) expect(PUBLIC_ROUTES, p.sku).toContain(productHref(p).slice(1));
    expect(findCatalogProduct('receptacles', 'DM2010')).toBeUndefined();
    expect(findCatalogProduct('usb-outlets', 'GF15')).toBeUndefined();
  });

  it('keeps USB receptacle current, combined power and individual port limits separate', () => {
    expect(rows(model('usb-outlets', 'FTR15-3100')).get('Receptacle rating')).toMatch(/15A/);
    expect(rows(model('usb-outlets', 'FTR20-3100')).get('Receptacle rating')).toMatch(/20A/);
    expect(rows(model('usb-outlets', 'FTR15DC-3600')).get('USB-C port 1')).toMatch(/2\.4A/);
    expect(rows(model('usb-outlets', 'FTR15DC-5000')).get('USB-C port 1')).toBe('5V DC 3.0A');
    expect(rows(model('usb-outlets', 'F4P')).get('Combined USB output')).toBe('5V DC · 4.2A · 21W');
    expect(rows(model('usb-outlets', 'F4P')).has('Receptacle rating')).toBe(false);
    expect(rows(model('usb-outlets', 'FTR20QC-AC65W')).get('USB-A port 1')).toMatch(/18W/);
    expect(rows(model('usb-outlets', 'FTR20QC-AC65W')).get('USB-A port 1')).not.toMatch(/PD/);
    expect(model('usb-outlets', 'FTR20QC-DC65W').notes.join(' ')).toMatch(/not a promise.*both ports/);
  });

  it('keeps Q wiring, TR/WR variants and 250V receptacles distinct', () => {
    expect(rows(model('receptacles', 'R15Q')).get('Wiring method')).toMatch(/Push-In/);
    expect(rows(model('receptacles', 'R15')).get('Wiring method')).toMatch(/Back Wire/);
    expect(rows(model('receptacles', 'RT20')).get('Tamper-resistant')).toBe('Yes');
    expect(rows(model('receptacles', 'RT20')).get('Weather-resistant')).toBe('No');
    expect(rows(model('receptacles', 'RW20')).get('Weather-resistant')).toBe('Yes');
    expect(rows(model('receptacles', 'CR15')).get('NEMA')).toBe('6-15R');
    expect(rows(model('receptacles', 'CR20')).get('Device rating')).toMatch(/250V/);
    expect(model('receptacles', 'CR20').certificate).toBeNull();
    expect(model('receptacles', 'CD20').reviewNotice).toMatch(/conflict/);
  });

  it('does not interchange DM2010 and DM2010S load or control ratings', () => {
    expect(rows(model('dimmers', 'DM2010')).get('LED / CFL load')).toBe('5–200W');
    expect(rows(model('dimmers', 'DM2010')).get('Incandescent load')).toBe('20–600W');
    expect(rows(model('dimmers', 'DM2010S')).get('Operating voltage')).toMatch(/277V/);
    expect(rows(model('dimmers', 'DM2010S')).get('Control output')).toMatch(/0–10V/);
    expect(rows(model('dimmers', 'DM2010S')).has('Incandescent load')).toBe(false);
  });

  it('distinguishes smart-switch wiring, radios, formats and model-specific uncertainty', () => {
    expect(rows(model('smart-switches', 'EUW8811')).get('Operating voltage')).toMatch(/90–250/);
    expect(rows(model('smart-switches', 'EUW8811C')).get('Operating voltage')).toMatch(/160–240/);
    expect(rows(model('smart-switches', 'EUZ8811S')).get('Operating voltage')).toMatch(/110–240/);
    expect(rows(model('smart-switches', 'USW8811-S')).get('Wiring requirement')).toBe('Single live wire');
    expect(rows(model('smart-switches', 'UST8811')).get('Control mode')).toBe('Touch only');
    expect(rows(model('smart-switches', 'USW8832')).get('Function')).toBe('Dimming');
    expect(rows(model('smart-switches', 'USW8833')).get('Function')).toBe('Curtain control');
    expect(rows(model('smart-switches', 'UST8832')).get('Wiring requirement')).toMatch(/conflict/);
    expect(rows(model('smart-switches', 'EUZ8834')).get('Program status')).toMatch(/Sample-stage/);
    expect(model('smart-switches', 'USW8811').certificate).toBeNull();
    expect(model('smart-switches', 'EUW8811').finishes).toHaveLength(4);
  });

  it('preserves the lighting-switch voltage and UL/ETL differences', () => {
    expect(rows(model('lighting-switches', 'T15')).get('Device rating')).toMatch(/125V/);
    expect(rows(model('lighting-switches', 'DS15')).get('Device rating')).toMatch(/120\/277V/);
    expect(rows(model('lighting-switches', 'DS15')).get('Source model designation')).toBe('DS15');
    expect(model('lighting-switches', 'DS15.3').name).toMatch(/3-Way/);
    for (const sku of ['DS1502', 'DS1503']) {
      expect(rows(model('lighting-switches', sku)).get('Published certification')).toBe('ETL');
      expect(model('lighting-switches', sku).certificate.image).toBeNull();
      expect(model('lighting-switches', sku).name).not.toMatch(/Gang/);
    }
  });

  it('keeps glossy/matte and screw-fixed/screwless plate sizes separate', () => {
    const standard = model('wallplates', 'BS1801');
    const matte = model('wallplates', 'BS1801-M');
    const screwless = model('wallplates', 'BS1803-G');
    expect(standard.assets.hero).not.toBe(matte.assets.hero);
    expect(rows(standard).get('Surface finish')).toBe('Glossy');
    expect(rows(matte).get('Surface finish')).toBe('Matte');
    expect(rows(standard).get('Product width')).toBe('2.75 in (70mm)');
    expect(rows(screwless).get('Product width')).toBe('2.95 in (75mm)');
    expect(rows(model('wallplates', 'BS18014')).get('Number of gangs')).toBe('4');
    expect(rows(model('wallplates', 'BS18014')).get('Source model designation')).toBe('BS18014');
    expect(rows(model('wallplates', 'BS1805')).get('Thickness')).toBe('0.87 in (22mm)');
    expect(rows(standard).get('Warranty')).toBe('3 years limited');
  });

  it('uses industrial GFCI sources without copying residential feed-through or certificates', () => {
    for (const sku of ['GTN15', 'GTN20']) {
      const p = model('gfci', sku);
      expect(rows(p).get('Feed-through terminals')).toMatch(/^None/);
      expect(p.certificate.image).toBeNull();
      expect(p.summary).toMatch(/nylon/);
      expect(p.notes.join(' ')).toMatch(/does not establish coverage/);
      expect(rows(p).get('Weather-resistant')).toBe('No');
      expect(p.assets.drawings).toEqual([]);
      expect(p.notes.join(' ')).toMatch(/drawing.*20A Feed-Through.*withheld/);
    }
    expect(modelKey(model('gfci', 'GTN20').sku)).toBe('gtn20');
  });
});
