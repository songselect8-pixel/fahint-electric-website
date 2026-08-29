import { render, screen, within } from '@testing-library/react';
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
  it('reserves the correct aspect ratio for every homepage image', () => {
    const { container } = renderHome();

    const imagesWithoutDimensions = [...container.querySelectorAll('img')]
      .filter((image) => !image.hasAttribute('width') || !image.hasAttribute('height'))
      .map((image) => image.getAttribute('src'));

    expect(imagesWithoutDimensions).toEqual([]);
  });

  it('identifies the manufacturer and exposes both buyer routes in the first chapter', () => {
    renderHome();

    expect(screen.getByText('North American wiring devices · OEM/ODM manufacturing')).toBeInTheDocument();
    const hero = screen.getByRole('heading', { name: 'Wiring-device programs built for your market.' }).closest('section');
    expect(hero).toBeInTheDocument();
    expect(within(hero).getByRole('link', { name: /Browse certified models/i })).toHaveAttribute('href', '/products');
    expect(within(hero).getByRole('link', { name: /Start an OEM brief/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByText('Selected listed models')).toBeInTheDocument();
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

  it('orders the homepage as a concise B2B purchasing path', () => {
    renderHome();

    const headings = [
      'Wiring-device programs built for your market.',
      'One platform. Six focused product systems.',
      'One coordinated system—from product platform to program support.',
      'Quality is checked on the line, not promised after it.',
      'Manufacturing and compliance, documented for review.',
      'Configure a production-ready program around your market.',
      'Built for the places power matters most.',
      'Buyer Questions, Answered.',
      'Tell Us What You Want to Build.'
    ].map((name) => screen.getByRole('heading', { name }));

    headings.slice(1).forEach((heading, index) => {
      expect(headings[index].compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });
  });

  it('keeps the factory-area proof consistent with the company profile', () => {
    renderHome();

    expect(screen.getByText('70,000')).toBeInTheDocument();
    expect(screen.getByText('Factory area (sq ft)')).toBeInTheDocument();
    expect(screen.queryByText('2,400m²')).not.toBeInTheDocument();
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

  it('keeps compliance, FAQ and the full inquiry form in the shortened homepage', () => {
    renderHome();

    [
      'Manufacturing and compliance, documented for review.',
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

  it('removes repeated homepage sales chapters without removing their destination routes', () => {
    renderHome();

    expect(screen.queryByRole('heading', { name: 'Engineering shared across every device platform.' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Build the Line Your Market Needs.' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Latest From Fahint.' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Discover Fahint/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /View certification details/i })).toHaveAttribute('href', '/about#certifications');
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
      'One platform. Six focused product systems.',
      'One coordinated system—from product platform to program support.',
      'Quality is checked on the line, not promised after it.',
      'Manufacturing and compliance, documented for review.',
      'Configure a production-ready program around your market.',
      'Built for the places power matters most.',
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

  it('includes reduced-motion and complete-image mobile editorial cards', () => {
    const styles = readFileSync('src/styles.css', 'utf8');
    const phone = styles.slice(styles.lastIndexOf('@media (max-width: 760px)'));

    expect(styles).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(phone).toMatch(/\.editorial-product-mosaic\s*\{[^}]*grid-auto-rows:\s*auto/);
    expect(phone).toMatch(
      /\.editorial-product-panel\s*>\s*img\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9[^}]*object-fit:\s*contain/
    );
    expect(phone).toMatch(/\.editorial-application-grid\s*\{[^}]*grid-auto-rows:\s*auto/);
  });

  it('labels application scenes for phone focal positioning', () => {
    const { container } = renderHome();
    const scenes = [...container.querySelectorAll('.editorial-application')];

    expect(scenes.map((scene) => scene.dataset.mobileFocal)).toEqual([
      'right',
      'left',
      'center',
      'center'
    ]);
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

  it('keeps product-card hover zoom free of a flashing divider seam', () => {
    const styles = readFileSync('src/styles.css', 'utf8');
    const imageRule = styles.match(/\.editorial-product-panel\s*>\s*img,\s*\.editorial-application\s*>\s*img\s*\{([^}]*)\}/)?.[1] ?? '';
    const metaRule = styles.match(/\.editorial-panel__meta\s*\{([^}]*)\}/)?.[1] ?? '';

    expect(imageRule).toMatch(/backface-visibility:\s*hidden/);
    expect(imageRule).toMatch(/will-change:\s*transform/);
    expect(metaRule).not.toMatch(/border-top/);
  });

});
