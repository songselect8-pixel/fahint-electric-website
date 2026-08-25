import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Footer from './Footer.jsx';

function renderFooter(pathname) {
  return render(
    <MemoryRouter initialEntries={[pathname]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer product certification context', () => {
  it('marks only product-detail footers for mobile quote clearance', () => {
    const { container, unmount } = renderFooter('/products/gfci/gf15');

    expect(container.querySelector('footer')).toHaveClass('footer--product-detail');

    unmount();
    const unrelated = renderFooter('/about');
    expect(unrelated.container.querySelector('footer')).not.toHaveClass('footer--product-detail');
  });

  it('does not apply the GFCI file reference to the GL20 detail route', () => {
    renderFooter('/products/gfci/gl20');

    expect(screen.queryByText(/E504391/)).not.toBeInTheDocument();
    expect(screen.getByText(/model-specific certification review required/i)).toBeInTheDocument();
  });

  it('keeps the company file reference on verified product routes', () => {
    renderFooter('/products/gfci/gf15');

    expect(screen.getByText(/E504391/)).toBeInTheDocument();
  });
});
