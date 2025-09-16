import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SimpleTerminal from '../components/SimpleTerminal';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('SimpleTerminal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders terminal interface', async () => {
    render(<SimpleTerminal />);

    await waitFor(() => {
      expect(
        screen.getByText(/welcome to andrés encarnación/i)
      ).toBeInTheDocument();
    });
  });

  it('shows loading screen initially', () => {
    render(<SimpleTerminal />);

    expect(screen.getByText('Portfolio Terminal v2.0.0')).toBeInTheDocument();
    expect(screen.getByText('Initializing...')).toBeInTheDocument();
  });

  it('processes help command correctly', async () => {
    render(<SimpleTerminal />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('Available Commands:')).toBeInTheDocument();
    });
  });

  it('shows whoami information when command is executed', async () => {
    render(<SimpleTerminal />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'whoami' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('Andrés Encarnación')).toBeInTheDocument();
      expect(
        screen.getByText('Full-Stack Software Developer')
      ).toBeInTheDocument();
    });
  });

  it('handles unknown commands gracefully', async () => {
    render(<SimpleTerminal />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'unknown' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(
        screen.getByText(/command not found: unknown/i)
      ).toBeInTheDocument();
    });
  });

  it('changes theme when theme command is used', async () => {
    render(<SimpleTerminal />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'theme dark' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('Theme changed to: dark')).toBeInTheDocument();
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'terminal_theme',
      'dark'
    );
  });

  it('navigates command history with arrow keys', async () => {
    render(<SimpleTerminal />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');

    // Execute a command to add it to history
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    // Use arrow up to navigate to previous command
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('help');
  });
});
