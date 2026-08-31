import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Faq from './Faq.jsx';

describe('FAQ disclosure', () => {
  it('connects each question to its answer and hides collapsed answers from assistive technology', () => {
    render(<Faq items={[{ q: 'First question', a: 'First answer' }, { q: 'Second question', a: 'Second answer' }]} />);
    const first = screen.getByRole('button', { name: 'First question' });
    const second = screen.getByRole('button', { name: 'Second question' });
    expect(document.getElementById(first.getAttribute('aria-controls'))).toHaveTextContent('First answer');
    expect(screen.getByText('Second answer')).toHaveAttribute('hidden');
    fireEvent.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Second answer')).not.toHaveAttribute('hidden');
    expect(screen.getByText('First answer')).toHaveAttribute('hidden');
    fireEvent.click(second);
    expect(second).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Second answer')).toHaveAttribute('hidden');
  });
});
