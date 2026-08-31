import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import LineDetail from './LineDetail.jsx';

function renderSeries(line = 'usb-outlets') {
  return render(
    <MemoryRouter initialEntries={[`/products/${line}`]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes><Route path="/products/:line" element={<LineDetail />} /></Routes>
    </MemoryRouter>
  );
}

describe('model catalogue', () => {
  it('links USB models to their own detail pages instead of the series landing page', () => {
    renderSeries();
    expect(screen.getByRole('link', { name: /View FTR15-3100 details/i }))
      .toHaveAttribute('href', '/products/usb-outlets/ftr15-3100');
    expect(screen.getByRole('link', { name: /View FTR20QC-DC65W details/i }))
      .toHaveAttribute('href', '/products/usb-outlets/ftr20qc-dc65w');
    expect(screen.queryByText(/Full specifications and datasheets for any model below are available on request/i))
      .not.toBeInTheDocument();
  });

  it('lists all US smart switches before EU models, including after searching', async () => {
    const user = userEvent.setup();
    renderSeries('smart-switches');
    const listedModels = () => screen.getAllByRole('link', { name: /^View (?:US|EU).* details$/ })
      .map((link) => link.getAttribute('aria-label').slice(5, -8));
    const expectUSFirst = (models) => {
      const us = models.filter((sku) => sku.startsWith('US'));
      const eu = models.filter((sku) => sku.startsWith('EU'));
      expect(us.length).toBeGreaterThan(0);
      expect(eu.length).toBeGreaterThan(0);
      expect(models).toEqual([...us, ...eu]);
    };
    expect(listedModels()).toHaveLength(51);
    expectUSFirst(listedModels());
    await user.type(screen.getByRole('searchbox', { name: /Search models/i }), '8811');
    expectUSFirst(listedModels());
  });

  it('searches across models and can reset an empty result', async () => {
    const user = userEvent.setup();
    renderSeries();
    const search = screen.getByRole('searchbox', { name: /Search models/i });
    await user.type(search, 'FTR20QC DC65W');
    expect(screen.getByRole('link', { name: /View FTR20QC-DC65W details/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /View FTR15-3100 details/i })).not.toBeInTheDocument();
    await user.clear(search);
    await user.type(search, 'not-a-real-model');
    expect(screen.getByRole('status')).toHaveTextContent(/No models match/i);
    await user.click(screen.getByRole('button', { name: /Clear filters/i }));
    expect(search).toHaveValue('');
    expect(screen.getByRole('link', { name: /View FTR15-3100 details/i })).toBeInTheDocument();
  });
});
