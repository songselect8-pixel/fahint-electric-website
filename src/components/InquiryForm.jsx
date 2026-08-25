import { useEffect, useId, useRef, useState } from 'react';
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
const MINIMUM_HANDOFF_LOCK_MS = 1_500;
const MAX_MAILTO_URL_LENGTH = 1_800;

const clean = (value) => String(value ?? '').trim();
const normalizeInquiry = (form) =>
  Object.fromEntries(Object.entries(EMPTY).map(([key]) => [key, clean(form[key])]));

const buildInquiryBody = (form) => {
  const values = normalizeInquiry(form);

  return [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company}`,
    `Country: ${values.country}`,
    `Model of interest: ${values.model || 'Not specified'}`,
    `Estimated quantity: ${values.quantity || 'Not specified'}`,
    '',
    'Requirements:',
    values.message
  ].join('\n');
};

export function validateInquiry(form) {
  const errors = {};

  if (!clean(form.name)) errors.name = 'Enter your name.';
  if (!EMAIL_PATTERN.test(clean(form.email))) errors.email = 'Enter a valid business email.';
  if (!clean(form.message)) errors.message = 'Describe the product or project you need.';

  return errors;
}

export function buildMailtoUrl(form) {
  const values = normalizeInquiry(form);
  const sender = values.company || values.name || 'website visitor';
  const subject = encodeURIComponent(`Product inquiry from ${sender}`);
  const body = encodeURIComponent(buildInquiryBody(values));

  return `mailto:${company.email}?subject=${subject}&body=${body}`;
}

export function buildInquiryText(form) {
  return `To: ${company.email}\n\n${buildInquiryBody(form)}`;
}

const defaultDelivery = (url) => window.location.assign(url);
const defaultClipboardWriter = (text) => {
  if (!navigator.clipboard?.writeText) return Promise.reject(new Error('Clipboard unavailable'));
  return navigator.clipboard.writeText(text);
};

export default function InquiryForm({
  defaultModel = '',
  title = 'Send a message',
  delivery = defaultDelivery,
  clipboardWriter = defaultClipboardWriter
}) {
  const [form, setForm] = useState({ ...EMPTY, model: defaultModel });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const formRef = useRef(null);
  const inFlightRef = useRef(false);
  const copyInFlightRef = useRef(false);
  const cooldownRef = useRef(null);
  const mountedRef = useRef(true);
  const modelVersionRef = useRef(0);
  const idPrefix = useId();
  const ids = {
    name: `${idPrefix}-name`,
    nameError: `${idPrefix}-name-error`,
    email: `${idPrefix}-email`,
    emailError: `${idPrefix}-email-error`,
    company: `${idPrefix}-company`,
    country: `${idPrefix}-country`,
    model: `${idPrefix}-model`,
    quantity: `${idPrefix}-quantity`,
    message: `${idPrefix}-message`,
    messageError: `${idPrefix}-message-error`
  };

  useEffect(() => {
    modelVersionRef.current += 1;
    setForm((current) => ({ ...current, model: defaultModel }));
    setErrors({});
    setStatus('');
    setCopyStatus('');
  }, [defaultModel]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      if (cooldownRef.current) {
        window.clearTimeout(cooldownRef.current.id);
        cooldownRef.current.resolve();
        cooldownRef.current = null;
      }
    };
  }, []);

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
    setCopyStatus('');
  };

  const copyInquiryDetails = async () => {
    if (copyInFlightRef.current) return;

    const modelVersion = modelVersionRef.current;
    copyInFlightRef.current = true;
    setIsCopying(true);
    setCopyStatus('');

    try {
      await clipboardWriter(buildInquiryText(form));
      if (mountedRef.current && modelVersionRef.current === modelVersion) setCopyStatus('copied');
    } catch {
      if (mountedRef.current && modelVersionRef.current === modelVersion) setCopyStatus('copy-failure');
    } finally {
      copyInFlightRef.current = false;
      if (mountedRef.current) setIsCopying(false);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;

    const nextErrors = validateInquiry(form);
    setErrors(nextErrors);
    setStatus('');
    setCopyStatus('');

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => {
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    const mailtoUrl = buildMailtoUrl(form);
    if (mailtoUrl.length > MAX_MAILTO_URL_LENGTH) {
      setStatus('too-long');
      return;
    }

    inFlightRef.current = true;
    setIsSubmitting(true);
    const handoffStartedAt = Date.now();
    const modelVersion = modelVersionRef.current;

    try {
      await delivery(mailtoUrl);
      if (mountedRef.current && modelVersionRef.current === modelVersion) setStatus('success');
    } catch {
      if (mountedRef.current && modelVersionRef.current === modelVersion) setStatus('failure');
    } finally {
      const remainingLockMs = Math.max(0, MINIMUM_HANDOFF_LOCK_MS - (Date.now() - handoffStartedAt));
      if (remainingLockMs > 0) {
        await new Promise((resolve) => {
          const id = window.setTimeout(() => {
            cooldownRef.current = null;
            resolve();
          }, remainingLockMs);
          cooldownRef.current = { id, resolve };
        });
      }
      inFlightRef.current = false;
      if (mountedRef.current) setIsSubmitting(false);
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
      {status === 'too-long' && (
        <div className="alert alert--error" role="alert">
          This inquiry is too long to open reliably in an email app. Copy the inquiry details instead.
        </div>
      )}
      {(status === 'success' || status === 'failure' || status === 'too-long') && (
        <div className="form-card__recovery">
          <p>
            If it did not open, copy the inquiry details and send them to <strong>{company.email}</strong>.
          </p>
          <button type="button" className="btn btn--ghost" onClick={copyInquiryDetails} disabled={isCopying}>
            {isCopying ? 'Copying…' : 'Copy inquiry details'}
          </button>
        </div>
      )}
      {copyStatus === 'copied' && (
        <p className="form-card__copy-status form-card__copy-status--ok" role="status">
          Inquiry details copied.
        </p>
      )}
      {copyStatus === 'copy-failure' && (
        <p className="form-card__copy-status form-card__copy-status--error" role="alert">
          We could not copy the inquiry details. Please copy them manually.
        </p>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor={ids.name}>Your name *</label>
          <input
            id={ids.name}
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={update('name')}
            placeholder="John Miller"
            {...validationProps('name', ids.nameError)}
          />
          {errors.name && (
            <p className="field__error" id={ids.nameError}>
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor={ids.email}>Business email *</label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            required
            value={form.email}
            onChange={update('email')}
            placeholder="john@company.com"
            {...validationProps('email', ids.emailError)}
          />
          {errors.email && (
            <p className="field__error" id={ids.emailError}>
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor={ids.company}>Company</label>
          <input
            id={ids.company}
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={update('company')}
            placeholder="Company name"
          />
        </div>
        <div className="field">
          <label htmlFor={ids.country}>Country / region</label>
          <input
            id={ids.country}
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
          <label htmlFor={ids.model}>Model of interest</label>
          <select id={ids.model} name="model" value={form.model} onChange={update('model')}>
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
          <label htmlFor={ids.quantity}>Estimated quantity</label>
          <input
            id={ids.quantity}
            name="quantity"
            value={form.quantity}
            onChange={update('quantity')}
            placeholder="e.g. 5,000 pcs"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor={ids.message}>Requirements *</label>
        <textarea
          id={ids.message}
          name="message"
          required
          value={form.message}
          onChange={update('message')}
          placeholder="Tell us about colours, packaging, private label, certification or delivery requirements."
          {...validationProps('message', ids.messageError)}
        />
        {errors.message && (
          <p className="field__error" id={ids.messageError}>
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
