import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from '../app/not-found';

describe('NotFound Page', () => {
  it('renders 404 message', () => {
    render(<NotFound />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('renders complete error message', () => {
    render(<NotFound />);

    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/)).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
    render(<NotFound />);

    const textContainer = screen.getByText('404 - Page Not Found');
    const centerContainer = textContainer.closest('.text-center');
    expect(centerContainer).toHaveClass('text-center');
  });

  it('has correct layout structure', () => {
    render(<NotFound />);

    const mainContainer = document.querySelector('.min-h-screen');
    expect(mainContainer).toHaveClass(
      'bg-black',
      'text-green-400',
      'font-mono'
    );
  });
});
