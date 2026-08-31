import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Capabilities from './Capabilities.jsx';
import About from './About.jsx';
import { certificates } from '../data/certificates.js';
import { publicAsset } from '../utils/publicAsset.js';

function renderPage(Page) {
  return render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Page /></MemoryRouter>);
}

describe('Manufacturing and company information', () => {
  it('introduces manufacturing with actual factory images and an OEM anchor', () => {
    renderPage(Capabilities);
    expect(screen.getByRole('heading', { level: 1, name: 'Your product. Our production.' })).toBeInTheDocument();
    expect(screen.getByAltText('GFCI assembly and functional testing at FAHINT')).toHaveAttribute('src', publicAsset('assets/images/editorial-home/factory-optimized.webp'));
    expect(document.getElementById('oem')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Discuss your OEM / ODM project' })).toHaveAttribute('href', '/contact?topic=oem');
  });
  it('provides a sequenced cooperation process and model-scoped documentation', () => {
    renderPage(Capabilities);
    const process = screen.getByRole('list', { name: 'From brief to production' });
    expect(within(process).getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByRole('link', { name: /Review certificates/ })).toHaveAttribute('href', '/about#certifications');
    expect(document.body).not.toHaveTextContent(/400 cartons|within 6 hours|98%|3-day shipment|10-day delivery|exceeds the UL/i);
  });
  it('distinguishes the FAHINT brand from private-label manufacturing', () => {
    renderPage(About);
    expect(screen.getByRole('heading', { level: 1, name: 'Everyday power. Made by FAHINT.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'FAHINT products' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Your brand, our manufacturing' })).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(/400 cartons|6-hour|3-year warranty|ALDI|zero Category A|98%/i);
  });
  it('provides every original certificate with model scope and PDF access', () => {
    renderPage(About);
    const library = document.getElementById('certifications');
    expect(library).toBeInTheDocument();
    for (const certificate of certificates) {
      expect(within(library).getByRole('link', { name: `Open ${certificate.name} PDF` })).toHaveAttribute('href', publicAsset(certificate.document));
      expect(within(library).getByRole('link', { name: `Download ${certificate.name} PDF` })).toHaveAttribute('download');
      expect(within(library).getByText(certificate.scope)).toBeInTheDocument();
    }
  });
  it('explains the company background, actual manufacturing stages and export relationships', () => {
    renderPage(About);
    expect(screen.getByText('2015')).toBeInTheDocument();
    expect(screen.getByText('Yueqing, Wenzhou, Zhejiang, China')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'From components to a finished device.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Built in Wenzhou. Working across markets.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'A conversation around real products.' })).toBeInTheDocument();
    expect(screen.getByText(/United States, Canada and Mexico/)).toBeInTheDocument();
    expect(screen.getByAltText('Electronic assembly equipment shown in the FAHINT product catalog')).toBeInTheDocument();
    expect(screen.getByAltText('A product discussion at the FAHINT exhibition display')).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(/70,000|2,400|5500|100\+|20\+ patents|2005/);
  });
  it('keeps section navigation on the About route when a deployment base URL is present', () => {
    render(<MemoryRouter initialEntries={['/about']} future={{ v7_startTransition:true, v7_relativeSplatPath:true }}><About /></MemoryRouter>);
    const nav = screen.getByRole('navigation', { name:'About FAHINT sections' });
    expect(within(nav).getByRole('link', { name:'Our markets' })).toHaveAttribute('href','/about#our-markets');
    expect(within(nav).getByRole('link', { name:'Inside FAHINT' })).toHaveAttribute('href','/about#inside-fahint');
  });
});
