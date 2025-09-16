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

  it('handles all available commands', async () => {
    render(<SimpleTerminal />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    const commands = ['contact', 'projects', 'clear'];

    for (const command of commands) {
      fireEvent.change(input, { target: { value: command } });
      fireEvent.keyDown(input, { key: 'Enter' });

      await waitFor(() => {
        expect(screen.getByDisplayValue('')).toBeInTheDocument();
      });
    }
  });

  it('handles empty command input', async () => {
    render(<SimpleTerminal />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // Should not add anything to history for empty commands
    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });
  });

  it('handles theme command variations', async () => {
    render(<SimpleTerminal />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');

    // Test theme without arguments
    fireEvent.change(input, { target: { value: 'theme' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/current theme options/i)).toBeInTheDocument();
    });

    // Test invalid theme
    fireEvent.change(input, { target: { value: 'theme invalid' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText(/invalid theme/i)).toBeInTheDocument();
    });
  });

  it('handles arrow down navigation in command history', async () => {
    render(<SimpleTerminal />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');

    // Execute multiple commands
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: 'whoami' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    // Navigate up then down
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('whoami');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('help');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('whoami');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('');
  });

  it('loads saved theme from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('dark');

    render(<SimpleTerminal />);

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('terminal_theme');
  });

  it('focuses input when clicking on terminal', async () => {
    render(<SimpleTerminal />);

    const terminal = screen.getByRole('textbox').closest('div');

    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument();
    });

    if (terminal) {
      fireEvent.click(terminal);
    }

    expect(screen.getByRole('textbox')).toHaveFocus();
  });
});
