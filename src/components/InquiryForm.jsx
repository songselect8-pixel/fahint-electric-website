import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { company } from '../data/company.js';
import { products } from '../data/products.js';

const EMPTY = {
  name: '',
  email: '',
  company: '',
  country: '',
  model: '',
  quantity: '',
  message: ''
};

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const SUCCESS_MESSAGE = 'Your email app should now be open with the inquiry pre-filled.';

const clean = (value) => String(value ?? '').trim();

export function validateInquiry(form) {
  const errors = {};

  if (!clean(form.name)) errors.name = 'Enter your name.';
  if (!EMAIL_PATTERN.test(clean(form.email))) errors.email = 'Enter a valid business email.';
  if (!clean(form.message)) errors.message = 'Describe the product or project you need.';

  return errors;
}

export function buildMailtoUrl(form) {
  const values = Object.fromEntries(Object.entries(EMPTY).map(([key]) => [key, clean(form[key])]));
  const sender = values.company || values.name || 'website visitor';
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company}`,
    `Country: ${values.country}`,
    `Model of interest: ${values.model || 'Not specified'}`,
    `Estimated quantity: ${values.quantity || 'Not specified'}`,
    '',
    'Requirements:',
    values.message
  ];
  const subject = encodeURIComponent(`Product inquiry from ${sender}`);
  const body = encodeURIComponent(lines.join('\n'));

  return `mailto:${company.email}?subject=${subject}&body=${body}`;
}

const defaultDelivery = (url) => window.location.assign(url);

export default function InquiryForm({ defaultModel = '', title = 'Send a message', delivery = defaultDelivery }) {
  const [form, setForm] = useState({ ...EMPTY, model: defaultModel });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    setForm((current) => ({ ...current, model: defaultModel }));
  }, [defaultModel]);

  const update = (key) => (event) => {
    const nextValue = event.target.value;
    const nextErrors = validateInquiry({ ...form, [key]: nextValue });

    setForm((current) => ({ ...current, [key]: nextValue }));
    setErrors((currentErrors) => {
      if (!currentErrors[key]) return currentErrors;
      if (nextErrors[key]) return { ...currentErrors, [key]: nextErrors[key] };

      const { [key]: _clearedError, ...remainingErrors } = currentErrors;
      return remainingErrors;
    });
    setStatus('');
  };

  const submit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;

    const nextErrors = validateInquiry(form);
    setErrors(nextErrors);
    setStatus('');

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    inFlightRef.current = true;
    setIsSubmitting(true);

    try {
      await delivery(buildMailtoUrl(form));
      setStatus('success');
    } catch {
      setStatus('failure');
    } finally {
      inFlightRef.current = false;
      setIsSubmitting(false);
    }
  };

  const validationProps = (key, errorId) => ({
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? errorId : undefined
  });

  return (
    <form ref={formRef} className="form-card" noValidate onSubmit={submit}>
      {title && <h3 className="form-card__title">{title}</h3>}

      {Object.keys(errors).length > 0 && (
        <div className="alert alert--error" role="alert">
          Please correct the highlighted fields.
        </div>
      )}
      {status === 'success' && (
        <div className="alert alert--ok" role="status">
          {SUCCESS_MESSAGE}
        </div>
      )}
      {status === 'failure' && (
        <div className="alert alert--error" role="alert">
          We could not open your email app. <a href={`mailto:${company.email}`}>Email us directly</a> or try again.
        </div>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-name">Your name *</label>
          <input
            id="f-name"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={update('name')}
            placeholder="John Miller"
            {...validationProps('name', 'f-name-error')}
          />
          {errors.name && (
            <p className="field__error" id="f-name-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="f-email">Business email *</label>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update('email')}
            placeholder="john@company.com"
            {...validationProps('email', 'f-email-error')}
          />
          {errors.email && (
            <p className="field__error" id="f-email-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-company">Company</label>
          <input
            id="f-company"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={update('company')}
            placeholder="Company name"
          />
        </div>
        <div className="field">
          <label htmlFor="f-country">Country / region</label>
          <input
            id="f-country"
            name="country"
            autoComplete="country-name"
            value={form.country}
            onChange={update('country')}
            placeholder="United States"
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-model">Model of interest</label>
          <select id="f-model" name="model" value={form.model} onChange={update('model')}>
            <option value="">Select a model</option>
            {products.map((product) => (
              <option key={product.sku} value={product.sku}>
                {product.sku} — {product.name}
              </option>
            ))}
            <option value="Mixed / multiple">Mixed / multiple models</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-qty">Estimated quantity</label>
          <input
            id="f-qty"
            name="quantity"
            value={form.quantity}
            onChange={update('quantity')}
            placeholder="e.g. 5,000 pcs"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-msg">Requirements *</label>
        <textarea
          id="f-msg"
          name="message"
          required
          value={form.message}
          onChange={update('message')}
          placeholder="Tell us about colours, packaging, private label, certification or delivery requirements."
          {...validationProps('message', 'f-msg-error')}
        />
        {errors.message && (
          <p className="field__error" id="f-msg-error">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn--primary"
        style={{ width: '100%', justifyContent: 'center' }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Opening email app…' : 'Send inquiry'} <Send size={16} aria-hidden="true" />
      </button>

      <p className="form-note">
        This static site has no server-side database — submitting opens your own email client with the details pre-filled. You can
        review and send the message from there. You can also write to {company.email} or message us on WhatsApp.
      </p>
    </form>
  );
}
