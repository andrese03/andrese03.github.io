import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page';

// Mock SimpleTerminal component since it has complex terminal functionality
jest.mock('../components/SimpleTerminal', () => {
  return function MockSimpleTerminal() {
    return <div data-testid='simple-terminal'>Mock Terminal</div>;
  };
});

describe('Home Page', () => {
  it('renders the SimpleTerminal component', () => {
    render(<Home />);

    const terminal = screen.getByTestId('simple-terminal');
    expect(terminal).toBeInTheDocument();
  });

  it('displays mock terminal content', () => {
    render(<Home />);

    expect(screen.getByText('Mock Terminal')).toBeInTheDocument();
  });
});
