import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import CertCarousel from './CertCarousel.jsx';
import { certificates } from '../data/certificates.js';

describe('Certificate library', () => {
  const originalShowModal = HTMLDialogElement.prototype.showModal;
  const originalClose = HTMLDialogElement.prototype.close;
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function () {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function () {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    });
  });
  afterEach(() => {
    HTMLDialogElement.prototype.showModal = originalShowModal;
    HTMLDialogElement.prototype.close = originalClose;
  });

  it('provides a named preview and a real original PDF download for every certificate', () => {
    render(<CertCarousel />);
    certificates.forEach((certificate) => {
      expect(screen.getByRole('button', { name: `View ${certificate.name} certificate` })).toBeVisible();
      const link = screen.getByRole('link', { name: `Download ${certificate.name} PDF` });
      expect(link).toHaveAttribute('href', certificate.document);
      expect(link).toHaveAttribute('download');
      expect(readFileSync(`public/${certificate.document}`).subarray(0, 5).toString()).toBe('%PDF-');
      expect(certificate.issued).toBeTruthy();
      expect(certificate.scope).toBeTruthy();
    });
  });

  it('opens the selected scan with scope and bounded zoom, then restores focus', async () => {
    const user = userEvent.setup();
    render(<CertCarousel />);
    const trigger = screen.getByRole('button', { name: 'View UL — GFCI Receptacles certificate' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('UL — GFCI Receptacles');
    expect(within(dialog).getByText(/GF15, GF20/)).toBeVisible();
    expect(within(dialog).getByText(/2022/)).toBeVisible();
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', certificates[0].image);
    const zoom = within(dialog).getByRole('button', { name: 'Zoom in' });
    for (let i = 0; i < 5; i++) await user.click(zoom);
    expect(zoom).toBeDisabled();
    expect(within(dialog).getByText('200%')).toBeVisible();
    await user.click(within(dialog).getByRole('button', { name: 'Fit width' }));
    expect(within(dialog).getByText('100%')).toBeVisible();
    await user.click(within(dialog).getByRole('button', { name: 'Close certificate' }));
    expect(dialog).not.toHaveAttribute('open');
    expect(trigger).toHaveFocus();
  });

  it('supports Escape and backdrop dismissal and resets zoom for a new document', async () => {
    const user = userEvent.setup();
    render(<CertCarousel />);
    await user.click(screen.getByRole('button', { name: 'View UL — GFCI Receptacles certificate' }));
    const dialog = screen.getByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'Zoom in' }));
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(dialog).not.toHaveAttribute('open');
    await user.click(screen.getByRole('button', { name: 'View UL — USB Outlets certificate' }));
    expect(dialog).toHaveAccessibleName('UL — USB Outlets');
    expect(within(dialog).getByText('100%')).toBeVisible();
    fireEvent.click(dialog);
    expect(dialog).not.toHaveAttribute('open');
  });
});
