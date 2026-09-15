import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { company } from '../data/company.js';
import FloatingRail from './FloatingRail.jsx';

afterEach(() => vi.unstubAllGlobals());

describe('FloatingRail', () => {
  it('does not let Studio homepage styles hide the shared mobile contact and top actions', () => {
    const studio = readFileSync('src/styles/studio.css', 'utf8');
    expect(studio).not.toMatch(/body:has\(\.studio-(?:page|home)\)\s+\.rail\s*\{[^}]*display:\s*none/);
  });

  it('offers direct WhatsApp and email links with accessible contact names', () => {
    render(<FloatingRail />);
    expect(screen.getByRole('link', { name: `WhatsApp ${company.phone}` })).toHaveAttribute('href', `https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`);
    expect(screen.getByRole('link', { name: `Email ${company.email}` })).toHaveAttribute('href', `mailto:${company.email}`);
  });

  it('shows the top action immediately when the page mounts already scrolled', () => {
    vi.stubGlobal('scrollY', 800);
    render(<FloatingRail />);
    expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument();
  });

  it.each([false, true])('returns to the top while honoring reduced motion: %s', (reducedMotion) => {
    vi.stubGlobal('scrollY', 0);
    vi.stubGlobal('scrollTo', vi.fn());
    vi.stubGlobal('matchMedia', () => ({ matches: reducedMotion }));
    render(<FloatingRail />);
    expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument();
    vi.stubGlobal('scrollY', 800);
    fireEvent.scroll(window);
    fireEvent.click(screen.getByRole('button', { name: 'Back to top' }));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    vi.stubGlobal('scrollY', 0);
    fireEvent.scroll(window);
    expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument();
  });
});
