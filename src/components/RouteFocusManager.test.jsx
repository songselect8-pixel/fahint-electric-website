import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RouteFocusManager from './RouteFocusManager.jsx';

function RouteChangeButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/products/gfci')}>Open GFCI series</button>;
}

function ClearHashButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/products/gfci')}>Clear hash</button>;
}

describe('RouteFocusManager', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      callback();
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal('scrollTo', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('scrolls to the top and focuses main content after a route change', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RouteFocusManager />
        <RouteChangeButton />
        <main id="main-content" tabIndex={-1}>Main content</main>
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: 'Open GFCI series' });
    button.focus();
    await user.click(button);

    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0 });
    expect(screen.getByText('Main content')).toHaveFocus();
  });

  it('scrolls to and focuses a hash target while respecting reduced motion', async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));

    render(
      <MemoryRouter
        initialEntries={['/products/gfci#engineering-proof']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <RouteFocusManager />
        <main id="main-content" tabIndex={-1}>Main content</main>
        <ClearHashButton />
        <section id="engineering-proof" ref={(node) => { if (node) node.scrollIntoView = scrollIntoView; }}>
          Engineering proof
        </section>
      </MemoryRouter>
    );

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' });
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(screen.getByText('Engineering proof')).toHaveFocus();
    expect(screen.getByText('Engineering proof')).toHaveAttribute('tabindex', '-1');

    await user.click(screen.getByRole('button', { name: 'Clear hash' }));

    expect(screen.getByText('Engineering proof')).not.toHaveAttribute('tabindex');
    expect(screen.getByText('Main content')).toHaveFocus();
  });

  it('falls back to the main content when a hash is not a valid selector', () => {
    render(
      <MemoryRouter
        initialEntries={['/products/gfci#%invalid']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <RouteFocusManager />
        <main id="main-content" tabIndex={-1}>Main content</main>
      </MemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
    expect(screen.getByText('Main content')).toHaveFocus();
  });
});
