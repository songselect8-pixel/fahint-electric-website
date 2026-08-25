import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import Home from './Home.jsx';

function renderHome() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Home />
    </MemoryRouter>
  );
}

describe('Home', () => {
  it('uses the selected image-led homepage story from hero through OEM', () => {
    renderHome();

    expect(screen.getByRole('heading', { name: 'Safer Power. Smarter Control.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'One platform. Six focused product systems.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Engineering shared across every device platform.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Built for the places power matters most.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Quality is checked on the line, not promised after it.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'From market requirement to production-ready program.' })).toBeInTheDocument();
  });

  it('shows all six product systems in the editorial product mosaic', () => {
    renderHome();

    [
      'GFCI Outlets',
      'USB & Type-C Outlets',
      'Receptacles',
      'Switches & Dimmers',
      'Smart Home Controls',
      'Wall Plates & Accessories'
    ].forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    });
  });

  it('makes each editorial product card a full-card link', () => {
    renderHome();

    [
      ['GFCI Outlets', '/products/gfci'],
      ['USB & Type-C Outlets', '/products/usb-outlets'],
      ['Receptacles', '/products/receptacles'],
      ['Switches & Dimmers', '/products/dimmers'],
      ['Smart Home Controls', '/products/smart-switches'],
      ['Wall Plates & Accessories', '/products/wallplates']
    ].forEach(([name, href]) => {
      const heading = screen.getByRole('heading', { name });
      expect(heading.closest('a')).toHaveAttribute('href', href);
    });
  });

  it('balances brand, engineering and OEM customization in the editorial front half', () => {
    renderHome();

    expect(screen.getByRole('heading', { name: 'A wiring-device brand built as one system.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Engineering shared across every device platform.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Your brand, specified down to the last detail.' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'GFCI protection made easier to specify and install.' })
    ).not.toBeInTheDocument();
  });

  it('makes each application panel a full-card link', () => {
    renderHome();

    [
      ['Kitchens & Wet Areas', '/products/gfci'],
      ['Hospitality & Multifamily', '/products/usb-outlets'],
      ['Commercial Fit-Out', '/capabilities'],
      ['Bathrooms & Renovation', '/products/receptacles']
    ].forEach(([name, href]) => {
      const heading = screen.getByRole('heading', { name });
      expect(heading.closest('a')).toHaveAttribute('href', href);
    });
  });

  it('keeps certificates, project CTA, blog, FAQ and the full inquiry form below the new front half', () => {
    renderHome();

    [
      'Certificates Your Compliance Team Can Verify.',
      'Build the Line Your Market Needs.',
      'Latest From Fahint.',
      'Buyer Questions, Answered.',
      'Tell Us What You Want to Build.',
      'Send a Project Brief'
    ].forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    });
    expect(screen.getByLabelText('Your name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Business email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Requirements *')).toBeInTheDocument();
  });

  it('links the primary hero actions into the existing product and capability routes', () => {
    renderHome();

    expect(screen.getByRole('link', { name: /Explore Products/i })).toHaveAttribute('href', '/products');
    expect(screen.getByRole('link', { name: /See our manufacturing capability/i })).toHaveAttribute('href', '/capabilities');
  });

  it('keeps the lower homepage title rhythm after the editorial front half', () => {
    renderHome();

    [
      ['Certificates Your Compliance Team Can Verify.', 'left'],
      ['Build the Line Your Market Needs.', 'right'],
      ['Latest From Fahint.', 'left'],
      ['Buyer Questions, Answered.', 'right'],
      ['Tell Us What You Want to Build.', 'left']
    ].forEach(([name, alignment]) => {
      const section = screen.getByRole('heading', { name }).closest('section');
      expect(section).toHaveAttribute('data-title-align', alignment);
    });
  });

  it('keeps separate floating actions in a vertical mobile safe-area stack', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(
      /@media \(max-width:\s*700px\)[\s\S]*?\.rail\s*\{[\s\S]*?bottom:\s*calc\(16px \+ env\(safe-area-inset-bottom, 0px\)\)[\s\S]*?flex-direction:\s*column/
    );
    expect(styles).toMatch(/@media \(max-width:\s*700px\)[\s\S]*?\.rail__icon\s*\{[\s\S]*?width:\s*46px;[\s\S]*?height:\s*46px/);
  });

  it('keeps homepage chapters stable and limits reveal motion to media and groups', () => {
    renderHome();

    [
      'A wiring-device brand built as one system.',
      'One platform. Six focused product systems.',
      'Engineering shared across every device platform.',
      'Built for the places power matters most.',
      'Your brand, specified down to the last detail.',
      'Quality is checked on the line, not promised after it.',
      'From market requirement to production-ready program.',
      'Certificates Your Compliance Team Can Verify.',
      'Build the Line Your Market Needs.',
      'Latest From Fahint.',
      'Buyer Questions, Answered.',
      'Tell Us What You Want to Build.'
    ].forEach((name) => {
      const section = screen.getByRole('heading', { name }).closest('section');
      expect(section).not.toHaveClass('reveal--from-left');
      expect(section).not.toHaveClass('reveal--from-right');
    });

    expect(screen.getByAltText('Fahint coordinated wiring-device product family').parentElement).toHaveClass(
      'reveal--media'
    );
    expect(screen.getByAltText('Coordinated Fahint receptacle and switch range').parentElement).toHaveClass(
      'reveal--media'
    );
  });

  it('uses the compact asymmetric heading layout for the applications chapter', () => {
    renderHome();

    const heading = screen.getByRole('heading', { name: 'Built for the places power matters most.' });
    expect(heading.parentElement?.parentElement).toHaveClass('editorial-heading--applications');

    const styles = readFileSync('src/styles.css', 'utf8');
    expect(styles).toMatch(
      /\.editorial-heading--applications\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(620px,\s*760px\)[\s\S]*?margin-bottom:\s*clamp\(48px,\s*4vw,\s*56px\)/
    );
  });

  it('centers the certificate strip and balances the OEM CTA at wide desktop widths', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(
      /@media \(min-width:\s*1500px\)[\s\S]*?\.home-certificates \.certcar__track\s*\{[\s\S]*?display:\s*grid;[\s\S]*?grid-template-columns:\s*repeat\(6,\s*minmax\(0,\s*1fr\)\)/
    );
    expect(styles).toMatch(
      /\.home-cta\[data-title-align='right'\] \.container\.home-cta__inner\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/
    );
  });

  it('includes reduced-motion and compact mobile editorial cards', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(styles).toMatch(/\.editorial-product-mosaic\s*\{\s*grid-auto-rows:\s*(?:410|420|430)px;/);
    expect(styles).toMatch(/\.editorial-application-grid\s*\{\s*grid-auto-rows:\s*(?:350|360|370|380)px;/);
  });

  it('uses one short hero sequence and restrained interaction timings', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(
      /\.editorial-hero__image\s*\{[\s\S]*?animation:\s*editorial-hero-image-in\s+800ms/
    );
    expect(styles).toMatch(
      /\.editorial-hero__content\s*>\s*\*\s*\{[\s\S]*?animation:\s*editorial-hero-copy-in\s+520ms/
    );
    expect(styles).toMatch(/transform:\s*scale\(1\.016\)/);
    expect(styles).toMatch(/\.reveal--media\[data-motion='ready'\]/);
    expect(styles).toMatch(/\.reveal--group\[data-motion='ready'\]/);
  });
});
