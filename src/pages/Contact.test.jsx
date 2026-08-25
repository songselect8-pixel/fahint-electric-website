import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Contact from './Contact.jsx';

function renderContact(entry) {
  return render(
    <MemoryRouter initialEntries={[entry]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/contact" element={<><Contact /><Link to="/contact?model=GT20">Select GT20</Link></>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Contact model query', () => {
  it('prefills a validated public product from the query without unsafe response promises', () => {
    renderContact('/contact?model=gw15');

    expect(screen.getByLabelText('Model of interest')).toHaveValue('GW15');
    expect(screen.queryByText(/within 6 hours/i)).not.toBeInTheDocument();
  });

  it('ignores an unknown model query', () => {
    renderContact('/contact?model=unknown');

    expect(screen.getByLabelText('Model of interest')).toHaveValue('');
  });

  it('synchronizes a changed query while preserving the rest of the brief', async () => {
    const user = userEvent.setup();
    renderContact('/contact?model=GF15');

    await user.type(screen.getByLabelText('Company'), 'Northstar');
    await user.click(screen.getByRole('link', { name: 'Select GT20' }));

    expect(screen.getByLabelText('Model of interest')).toHaveValue('GT20');
    expect(screen.getByLabelText('Company')).toHaveValue('Northstar');
  });
});
