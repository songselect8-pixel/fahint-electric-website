import { useState } from 'react';
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

export default function InquiryForm({ defaultModel = '', title = 'Send a message' }) {
  const [form, setForm] = useState({ ...EMPTY, model: defaultModel });
  const [sent, setSent] = useState(false);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Country: ${form.country}`,
      `Model of interest: ${form.model || 'Not specified'}`,
      `Estimated quantity: ${form.quantity || 'Not specified'}`,
      '',
      'Message:',
      form.message
    ];
    const subject = encodeURIComponent(`GFCI inquiry from ${form.company || form.name || 'website visitor'}`);
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form className="form-card" onSubmit={submit}>
      {title && <h3 className="form-card__title">{title}</h3>}
      {sent && (
        <div className="alert alert--ok">
          Your email app should now be open with the inquiry pre-filled. If nothing happened, email us directly at {company.email}.
        </div>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-name">Your name *</label>
          <input id="f-name" required value={form.name} onChange={update('name')} placeholder="John Miller" />
        </div>
        <div className="field">
          <label htmlFor="f-email">Business email *</label>
          <input
            id="f-email"
            type="email"
            required
            value={form.email}
            onChange={update('email')}
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-company">Company</label>
          <input id="f-company" value={form.company} onChange={update('company')} placeholder="Company name" />
        </div>
        <div className="field">
          <label htmlFor="f-country">Country / region</label>
          <input id="f-country" value={form.country} onChange={update('country')} placeholder="United States" />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="f-model">Model of interest</label>
          <select id="f-model" value={form.model} onChange={update('model')}>
            <option value="">Select a model</option>
            {products.map((p) => (
              <option key={p.sku} value={p.sku}>
                {p.sku} — {p.name}
              </option>
            ))}
            <option value="Mixed / multiple">Mixed / multiple models</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="f-qty">Estimated quantity</label>
          <input id="f-qty" value={form.quantity} onChange={update('quantity')} placeholder="e.g. 5,000 pcs" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-msg">Requirements *</label>
        <textarea
          id="f-msg"
          required
          value={form.message}
          onChange={update('message')}
          placeholder="Tell us about colours, packaging, private label, certification or delivery requirements."
        />
      </div>

      <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
        Send inquiry <Send size={16} />
      </button>

      <p className="form-note">
        This static site has no server-side database — submitting opens your own email client with the details pre-filled, so your
        message goes straight to our sales team. You can also write to {company.email} or message us on WhatsApp.
      </p>
    </form>
  );
}
