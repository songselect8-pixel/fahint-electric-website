import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import Header from './Header.jsx';

function renderHeader(path = '/') {
  return render(
    <MemoryRouter
      initialEntries={[path]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Header />
    </MemoryRouter>
  );
}

describe('Header', () => {
  it('uses the official archived Fahint logo without the synthetic mark', () => {
    renderHeader();

    const logo = screen.getByRole('img', { name: 'Fahint' });
    expect(logo).toHaveAttribute('src', 'assets/images/brand/fahint-logo-navy.png');
    expect(document.querySelector('.logo__mark')).not.toBeInTheDocument();
    expect(document.querySelector('.logo__text')).not.toBeInTheDocument();
  });

  it('keeps the existing navigation and inquiry action', () => {
    renderHeader();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Send Inquiry/i })).toHaveAttribute('href', '/contact');
  });

  it('uses a rounded frosted inner surface instead of a full-width solid header', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(
      /\.header__inner\s*\{[\s\S]*?border-radius:\s*24px;[\s\S]*?backdrop-filter:\s*blur\(22px\)\s+saturate\(145%\)/
    );
    expect(styles).toMatch(
      /\.header--solid\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none/
    );
  });

  it('uses explicit compact desktop gaps instead of auto-pushing the menu', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(
      /\.header__inner\s*\{[\s\S]*?grid-template-columns:\s*200px\s+max-content\s+190px;[\s\S]*?column-gap:\s*48px/
    );
    expect(styles).not.toMatch(/\.nav\s*\{[^}]*margin-left:\s*auto/);
    expect(styles).toMatch(/\.logo__image\s*\{[\s\S]*?width:\s*170px/);
  });

  it('keeps an expanded mobile product menu scrollable inside the viewport', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(
      /@media\s*\(max-width:\s*900px\)[\s\S]*?\.mobile-menu\s*\{[^}]*max-height:\s*calc\(100dvh\s*-\s*calc\(var\(--header-h\)\s*\+\s*22px\)\);[^}]*overflow-y:\s*auto/
    );
  });
});
