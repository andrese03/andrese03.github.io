import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './lib/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'mono': ['Cascadia Code', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'monospace'],
            },
            animation: {
                'pulse': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'blink': 'blink 1s infinite',
            },
            keyframes: {
                blink: {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' },
                },
            },
            colors: {
                'terminal': {
                    'green': '#00ff41',
                    'green-bright': '#00ff65',
                    'matrix-bg': '#000000',
                    'matrix-dim': '#003b00',
                }
            }
        },
    },
    plugins: [],
}
export default config
