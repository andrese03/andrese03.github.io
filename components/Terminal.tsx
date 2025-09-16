'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { CommandProcessor } from '@/lib/commands';
import { Theme, TerminalHistory, CommandOutput } from '@/types';

export default function Terminal() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<TerminalHistory[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [theme, setTheme] = useState<Theme>('matrix');
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const commandProcessor = useRef<CommandProcessor>(new CommandProcessor());

    // Focus input on mount and when clicking terminal
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Load theme from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('terminal_theme') as Theme;
            if (savedTheme && ['dark', 'light', 'matrix'].includes(savedTheme)) {
                setTheme(savedTheme);
            }
        }
    }, []);

    // Scroll to bottom when new content is added
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = async (command: string) => {
        if (!command.trim()) return;

        setIsLoading(true);
        const output = await commandProcessor.current.processCommand(command);

        // Handle special commands
        const clearCommand = output.find(o => o.text === '__CLEAR__');
        if (clearCommand) {
            setHistory([]);
            setIsLoading(false);
            return;
        }

        const themeCommand = output.find(o => o.text.startsWith('__THEME_CHANGE__:'));
        if (themeCommand) {
            const newTheme = themeCommand.text.split(':')[1] as Theme;
            setTheme(newTheme);
            if (typeof window !== 'undefined') {
                localStorage.setItem('terminal_theme', newTheme);
            }
            setHistory(prev => [...prev, {
                command,
                output: [{ text: `Theme changed to ${newTheme}`, type: 'success' }],
                timestamp: Date.now()
            }]);
            setIsLoading(false);
            return;
        }

        // Add to history
        setHistory(prev => [...prev, {
            command,
            output,
            timestamp: Date.now()
        }]);

        // Update command history
        setCommandHistory(prev => {
            const newHistory = [command, ...prev.filter(h => h !== command)];
            return newHistory.slice(0, 50); // Keep last 50 commands
        });

        setIsLoading(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(input);
            setInput('');
            setHistoryIndex(-1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const suggestions = commandProcessor.current.getAutoCompleteOptions(input);
            if (suggestions.length === 1) {
                setInput(suggestions[0]);
            } else if (suggestions.length > 1) {
                // Show suggestions
                const output: CommandOutput[] = [
                    { text: 'Suggestions:', type: 'info' },
                    ...suggestions.map(s => ({ text: `  ${s}` }))
                ];
                setHistory(prev => [...prev, {
                    command: `autocomplete: ${input}`,
                    output,
                    timestamp: Date.now()
                }]);
            }
        }
    };

    const getThemeClasses = () => {
        switch (theme) {
            case 'light':
                return 'bg-gray-100 text-gray-900';
            case 'dark':
                return 'bg-gray-900 text-gray-100';
            case 'matrix':
            default:
                return 'bg-black text-green-400';
        }
    };

    const getPromptColor = () => {
        switch (theme) {
            case 'light':
                return 'text-blue-600';
            case 'dark':
                return 'text-cyan-400';
            case 'matrix':
            default:
                return 'text-green-500';
        }
    };

    const getOutputColor = (type?: string) => {
        if (!type) return '';

        switch (theme) {
            case 'light':
                return type === 'error' ? 'text-red-600' :
                    type === 'success' ? 'text-green-600' :
                        type === 'info' ? 'text-blue-600' : '';
            case 'dark':
                return type === 'error' ? 'text-red-400' :
                    type === 'success' ? 'text-green-400' :
                        type === 'info' ? 'text-cyan-400' : '';
            case 'matrix':
            default:
                return type === 'error' ? 'text-red-500' :
                    type === 'success' ? 'text-green-300' :
                        type === 'info' ? 'text-yellow-400' : '';
        }
    };

    return (
        <div
            className={`min-h-screen font-mono ${getThemeClasses()}`}
            onClick={() => inputRef.current?.focus()}
        >
            <div
                ref={terminalRef}
                className="h-screen overflow-y-auto p-4 pb-20"
            >
                {/* Welcome message */}
                <div className="mb-4">
                    <div className={`text-lg font-bold ${getPromptColor()}`}>
                        Welcome to Andrés Encarnación&apos;s Portfolio Terminal
                    </div>
                    <div className="text-sm opacity-75">
                        Type &apos;help&apos; for available commands. Use ↑/↓ for history, Tab for autocomplete.
                    </div>
                    <div className="text-sm opacity-75">
                        Current theme: {theme} (change with: theme &lt;dark|light|matrix&gt;)
                    </div>
                </div>

                {/* Command history */}
                {history.map((entry, index) => (
                    <div key={index} className="mb-2">
                        <div className={`${getPromptColor()}`}>
                            <span>guest@andrese03.me</span>
                            <span className="opacity-75">:~$ </span>
                            <span>{entry.command}</span>
                        </div>
                        {entry.output.map((output, outputIndex) => (
                            <div
                                key={outputIndex}
                                className={`ml-0 ${getOutputColor(output.type)} whitespace-pre-wrap`}
                            >
                                {output.text}
                            </div>
                        ))}
                    </div>
                ))}

                {/* Current input line */}
                <div className={`flex items-center ${getPromptColor()}`}>
                    <span>guest@andrese03.me</span>
                    <span className="opacity-75">:~$ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        className="flex-1 bg-transparent outline-none border-none"
                        autoComplete="off"
                        spellCheck={false}
                    />
                    {isLoading && (
                        <span className="ml-2 animate-pulse">...</span>
                    )}
                </div>
            </div>
        </div>
    );
}
