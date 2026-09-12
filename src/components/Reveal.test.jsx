import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Reveal from './Reveal.jsx';

afterEach(() => vi.unstubAllGlobals());

describe('Reveal enhancement', () => {
  it('keeps content visible when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<Reveal as="section" aria-label="Chapter"><a href="#details">Explore</a></Reveal>);
    expect(screen.getByRole('region', { name: 'Chapter' })).toHaveAttribute('data-visible', 'true');
    expect(screen.getByRole('link', { name: 'Explore' })).toHaveAttribute('href', '#details');
  });

  it('reveals on entry once and disconnects when unmounted', () => {
    let notify;
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) { notify = callback; }
      observe() {}
      unobserve = unobserve;
      disconnect = disconnect;
    });
    const { unmount } = render(<Reveal as="section" aria-label="Chapter">Content</Reveal>);
    const section = screen.getByRole('region', { name: 'Chapter' });
    expect(section).not.toHaveAttribute('data-visible');
    act(() => notify([{ target: section, isIntersecting: true }]));
    expect(section).toHaveAttribute('data-visible', 'true');
    expect(unobserve).toHaveBeenCalledWith(section);
    act(() => notify([{ target: section, isIntersecting: false }]));
    expect(section).toHaveAttribute('data-visible', 'true');
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });

  it('reveals immediately on keyboard focus and preserves the caller focus handler', () => {
    vi.stubGlobal('IntersectionObserver', class {
      observe() {}
      disconnect() {}
    });
    const onFocus = vi.fn();
    render(<Reveal as="section" aria-label="Chapter" onFocusCapture={onFocus}><a href="#details">Explore</a></Reveal>);
    const section = screen.getByRole('region', { name: 'Chapter' });
    expect(section).not.toHaveAttribute('data-visible');
    fireEvent.focus(screen.getByRole('link', { name: 'Explore' }));
    expect(section).toHaveAttribute('data-visible', 'true');
    expect(onFocus).toHaveBeenCalledOnce();
  });
});
