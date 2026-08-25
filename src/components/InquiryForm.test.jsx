import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import InquiryForm, { buildMailtoUrl, validateInquiry } from './InquiryForm.jsx';

const validForm = {
  name: 'Avery Chen',
  email: 'avery@example.com',
  company: 'Northstar',
  country: 'Canada',
  model: 'GF15',
  quantity: '5,000 pcs',
  message: 'Please quote private-label packaging.'
};

async function completeRequiredFields(user) {
  await user.type(screen.getByLabelText('Your name *'), validForm.name);
  await user.type(screen.getByLabelText('Business email *'), validForm.email);
  await user.type(screen.getByLabelText('Requirements *'), validForm.message);
}

describe('InquiryForm helpers', () => {
  it('returns the exact errors for trimmed required fields and an invalid email', () => {
    expect(
      validateInquiry({
        ...validForm,
        name: '   ',
        email: 'not-an-email',
        message: '\n  '
      })
    ).toEqual({
      name: 'Enter your name.',
      email: 'Enter a valid business email.',
      message: 'Describe the product or project you need.'
    });

    expect(validateInquiry({ ...validForm, name: ' Avery ', email: ' a@b.co ', message: ' Need samples ' })).toEqual({});
  });

  it('builds an encoded mailto containing all fields and preserves special characters and newlines', () => {
    const url = buildMailtoUrl({
      ...validForm,
      name: 'Ana & Luis',
      email: 'buyers+gfci@example.com',
      company: 'A&B / Lighting',
      country: 'México',
      model: '',
      quantity: '',
      message: 'Need white & black.\nShip to México?'
    });
    const [address, query = ''] = url.split('?');
    const params = new URLSearchParams(query);

    expect(address).toBe('mailto:louis@fahint.com');
    expect(params.get('subject')).toBe('Product inquiry from A&B / Lighting');
    expect(params.get('body')).toBe(
      'Name: Ana & Luis\n' +
        'Email: buyers+gfci@example.com\n' +
        'Company: A&B / Lighting\n' +
        'Country: México\n' +
        'Model of interest: Not specified\n' +
        'Estimated quantity: Not specified\n\n' +
        'Requirements:\n' +
        'Need white & black.\nShip to México?'
    );
  });
});

describe('InquiryForm', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (callback) => setTimeout(callback, 0));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('preselects the requested product model', () => {
    render(<InquiryForm defaultModel="GF15" />);

    expect(screen.getByLabelText('Model of interest')).toHaveValue('GF15');
  });

  it('updates the model when defaultModel changes without clearing other fields', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<InquiryForm defaultModel="GF15" />);

    await user.type(screen.getByLabelText('Your name *'), 'Avery Chen');
    await user.type(screen.getByLabelText('Company'), 'Northstar');
    rerender(<InquiryForm defaultModel="GT20" />);

    expect(screen.getByLabelText('Model of interest')).toHaveValue('GT20');
    expect(screen.getByLabelText('Your name *')).toHaveValue('Avery Chen');
    expect(screen.getByLabelText('Company')).toHaveValue('Northstar');
  });

  it('validates explicitly, announces errors, connects field errors, and focuses the first invalid field', async () => {
    const user = userEvent.setup();
    render(<InquiryForm delivery={vi.fn()} />);

    const form = screen.getByRole('button', { name: 'Send inquiry' }).closest('form');
    expect(form).toHaveAttribute('novalidate');

    await user.click(screen.getByRole('button', { name: 'Send inquiry' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Please correct the highlighted fields.');
    const name = screen.getByLabelText('Your name *');
    const email = screen.getByLabelText('Business email *');
    const message = screen.getByLabelText('Requirements *');
    await waitFor(() => expect(name).toHaveFocus());
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAttribute('aria-describedby', 'f-name-error');
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(email).toHaveAttribute('aria-describedby', 'f-email-error');
    expect(message).toHaveAttribute('aria-invalid', 'true');
    expect(message).toHaveAttribute('aria-describedby', 'f-msg-error');
    expect(screen.getByText('Enter your name.')).toHaveAttribute('id', 'f-name-error');
    expect(screen.getByText('Enter a valid business email.')).toHaveAttribute('id', 'f-email-error');
    expect(screen.getByText('Describe the product or project you need.')).toHaveAttribute('id', 'f-msg-error');

    await user.type(name, 'Avery');
    expect(name).not.toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByText('Enter your name.')).not.toBeInTheDocument();
  });

  it('delivers a valid mailto once while pending and announces the successful handoff', async () => {
    let finishDelivery;
    const delivery = vi.fn(
      () =>
        new Promise((resolve) => {
          finishDelivery = resolve;
        })
    );
    const user = userEvent.setup();
    render(<InquiryForm delivery={delivery} />);
    await completeRequiredFields(user);

    const button = screen.getByRole('button', { name: 'Send inquiry' });
    const form = button.closest('form');
    await user.click(button);

    expect(delivery).toHaveBeenCalledTimes(1);
    expect(delivery.mock.calls[0][0]).toMatch(/^mailto:louis@fahint\.com\?/);
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Opening email app…');
    fireEvent.submit(form);
    expect(delivery).toHaveBeenCalledTimes(1);

    finishDelivery();
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Your email app should now be open with the inquiry pre-filled.'
    );
  });

  it('shows a direct email fallback after failure and allows a retry', async () => {
    const delivery = vi.fn().mockRejectedValueOnce(new Error('blocked')).mockResolvedValueOnce(undefined);
    const user = userEvent.setup();
    render(<InquiryForm delivery={delivery} />);
    await completeRequiredFields(user);

    await user.click(screen.getByRole('button', { name: 'Send inquiry' }));

    const failure = await screen.findByRole('alert');
    expect(failure).toHaveTextContent('We could not open your email app.');
    expect(failure).toHaveTextContent(/try again\./i);
    expect(screen.getByRole('link', { name: 'Email us directly' })).toHaveAttribute('href', 'mailto:louis@fahint.com');

    await user.click(screen.getByRole('button', { name: 'Send inquiry' }));

    await waitFor(() => expect(delivery).toHaveBeenCalledTimes(2));
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Your email app should now be open with the inquiry pre-filled.'
    );
  });

  it('provides useful autocomplete attributes', () => {
    render(<InquiryForm />);

    expect(screen.getByLabelText('Your name *')).toHaveAttribute('autocomplete', 'name');
    expect(screen.getByLabelText('Business email *')).toHaveAttribute('autocomplete', 'email');
    expect(screen.getByLabelText('Company')).toHaveAttribute('autocomplete', 'organization');
    expect(screen.getByLabelText('Country / region')).toHaveAttribute('autocomplete', 'country-name');
  });

  it('explains that the customer still sends the composed email', () => {
    render(<InquiryForm />);

    expect(screen.getByText(/You can review and send the message from there\./)).toBeInTheDocument();
  });
});
