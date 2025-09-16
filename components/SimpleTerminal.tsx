'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';

type Theme = 'matrix' | 'dark' | 'light';

export default function SimpleTerminal() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [theme, setTheme] = useState<Theme>('matrix');
    const [isLoaded, setIsLoaded] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

    // Focus input on mount and load theme from localStorage
    useEffect(() => {
        // Load saved theme or default to matrix
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('terminal_theme') as Theme;
            if (savedTheme && ['matrix', 'dark', 'light'].includes(savedTheme)) {
                setTheme(savedTheme);
            }
        }

        // Simulate terminal loading
        const timer = setTimeout(() => {
            setIsLoaded(true);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    // Update cursor position when input changes or cursor moves
    useEffect(() => {
        const updateCursorPosition = () => {
            if (inputRef.current && cursorRef.current) {
                const input = inputRef.current;
                const cursor = cursorRef.current;

                // Get cursor position
                const selectionStart = input.selectionStart || 0;
                setCursorPosition(selectionStart);

                // Create a temporary span to measure text width
                const tempSpan = document.createElement('span');
                tempSpan.style.font = window.getComputedStyle(input).font;
                tempSpan.style.visibility = 'hidden';
                tempSpan.style.position = 'absolute';
                tempSpan.textContent = input.value.substring(0, selectionStart);
                document.body.appendChild(tempSpan);

                const textWidth = tempSpan.getBoundingClientRect().width;
                document.body.removeChild(tempSpan);

                // Position cursor
                cursor.style.left = `${textWidth}px`;
            }
        };

        // Update cursor position on input change
        updateCursorPosition();

        // Also update when clicking or using arrow keys
        const handleSelectionChange = () => {
            setTimeout(updateCursorPosition, 0);
        };

        if (inputRef.current) {
            inputRef.current.addEventListener('click', handleSelectionChange);
            inputRef.current.addEventListener('keyup', handleSelectionChange);
            inputRef.current.addEventListener('select', handleSelectionChange);
        }

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('click', handleSelectionChange);
                inputRef.current.removeEventListener('keyup', handleSelectionChange);
                inputRef.current.removeEventListener('select', handleSelectionChange);
            }
        };
    }, [input, isLoaded]);

    // Scroll to bottom when new content is added
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const processCommand = (command: string): string[] => {
        const parts = command.toLowerCase().trim().split(' ');
        const cmd = parts[0];
        const args = parts.slice(1);

        switch (cmd) {
            case 'help':
                return [
                    'Available Commands:',
                    '',
                    '  help                     - Show this help message',
                    '  whoami                   - About Andrés Encarnación',
                    '  contact                  - Show contact information',
                    '  projects                 - List projects',
                    '  theme <matrix|dark|light> - Change terminal theme',
                    '  clear                    - Clear terminal',
                    '',
                    'Examples:',
                    '  theme matrix             - Classic green-on-black matrix style',
                    '  theme dark               - Modern dark theme with cyan accents',
                    '  theme light              - Clean light theme with dark text',
                    '',
                    'Navigation: Use ↑/↓ arrows for command history',
                    'Font: Cascadia Code • Themes persist in localStorage'
                ];
            case 'whoami':
                return [
                    'Andrés Encarnación',
                    'Full-Stack Software Developer',
                    '',
                    'Specializing in JavaScript, TypeScript, React, and Node.js',
                    '6+ years of experience in software development',
                    'Currently available for new opportunities'
                ];
            case 'contact':
                return [
                    'Contact Information:',
                    '',
                    'Email: andresencarnacion03@gmail.com',
                    'Phone: +1 829-918-4981',
                    'LinkedIn: linkedin.com/in/andres-encarnacion',
                    'GitHub: github.com/andrese03',
                    'Twitter: @andrese03'
                ];
            case 'projects':
                return [
                    'Featured Projects:',
                    '',
                    '1. ERP System - Lightweight ERP for SMBs (2018)',
                    '   Stack: MongoDB, Express, Angular, Node.js',
                    '   URL: softdevmanager.herokuapp.com',
                    '',
                    '2. Media Watch - Social media monitoring tool (2019)',
                    '   Stack: React, Node.js, MySQL',
                    '   URL: mediawatch.com.do',
                    '',
                    '3. Health Care Application (2017)',
                    '   Stack: C#, ASP.NET, MSSQL',
                    '   URL: medicalcore.net',
                    '',
                    '4. Plastilap - Medical services website (2016)',
                    '   Stack: PHP, CodeIgniter, MySQL',
                    '   URL: plastilap.com'
                ];
            case 'theme':
                if (args.length === 0) {
                    return [
                        'Current theme options:',
                        '',
                        '  matrix - Classic green-on-black matrix theme (default)',
                        '  dark   - Modern dark theme with cyan accents',
                        '  light  - Light theme with dark text',
                        '',
                        `Current theme: ${theme}`,
                        'Usage: theme <theme-name>'
                    ];
                }

                const newTheme = args[0] as Theme;
                if (['matrix', 'dark', 'light'].includes(newTheme)) {
                    setTheme(newTheme);
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('terminal_theme', newTheme);
                    }
                    return [`Theme changed to: ${newTheme}`];
                } else {
                    return [`Invalid theme '${newTheme}'. Valid options: matrix, dark, light`];
                }

            case 'clear':
                return ['__CLEAR__'];
            case '':
                return [];
            default:
                return [`Command not found: ${command}. Type 'help' for available commands.`];
        }
    };

    const handleCommand = (command: string) => {
        if (!command.trim()) return;

        const output = processCommand(command);

        if (output.includes('__CLEAR__')) {
            setHistory([]);
        } else {
            setHistory(prev => [
                ...prev,
                `guest@andrese03.me:~$ ${command}`,
                ...output,
                ''
            ]);

            // Add to command history
            setCommandHistory(prev => {
                const newHistory = [command, ...prev.filter(h => h !== command)];
                return newHistory.slice(0, 50); // Keep last 50 commands
            });
        }

        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommand(input);
            setInput('');
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
        }
    };

    const getThemeClasses = () => `theme-${theme}`;
    const getPromptClasses = () => `prompt-${theme}`;

    return (
        <div
            className={`min-h-screen font-mono ${getThemeClasses()} cursor-text`}
            onClick={() => inputRef.current?.focus()}
        >
            <div
                ref={terminalRef}
                className={`h-screen overflow-y-auto p-4 pb-20 ${getThemeClasses()}`}
            >
                {/* Boot sequence and welcome message */}
                {isLoaded ? (
                    <div className="mb-4">
                        <div className={`text-lg font-bold ${getPromptClasses()}`}>
                            Welcome to Andrés Encarnación&apos;s Portfolio Terminal
                        </div>
                        <div className="text-sm opacity-75">
                            Type &apos;help&apos; for available commands. Current theme: {theme}
                        </div>
                        <div className="text-xs opacity-50 mt-2">
                            Connected to portfolio@andrese03.me • Font: Cascadia Code • Use ↑↓ for history
                        </div>
                    </div>
                ) : (
                    <div className="mb-4">
                        <div className="text-sm opacity-75">
                            <div>Portfolio Terminal v2.0.0</div>
                            <div>Initializing...</div>
                            <div className="flex items-center mt-2">
                                <span>Loading theme: {theme}</span>
                                <span className="ml-2 terminal-cursor"></span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Command history */}
                {history.map((line, index) => (
                    <div key={index} className="whitespace-pre-wrap">
                        {line}
                    </div>
                ))}

                {/* Current input line */}
                <div className={`flex items-baseline ${getPromptClasses()}`}>
                    <span className="shrink-0 select-none">guest@andrese03.me:~$ </span>
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full terminal-input terminal-input-hidden-cursor"
                            autoComplete="off"
                            spellCheck={false}
                            style={{
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                lineHeight: 'inherit'
                            }}
                        />
                        <span ref={cursorRef} className="terminal-input-cursor"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
