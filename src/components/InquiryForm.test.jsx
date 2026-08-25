import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import InquiryForm from './InquiryForm.jsx';

describe('InquiryForm default model synchronization', () => {
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
});
