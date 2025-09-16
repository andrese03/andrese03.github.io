export type Project = {
    slug: string;
    title: string;
    summary: string;
    stack: string;
    status: string;
    year: string;
    url: string;
    image: string;
    tags: string;
};

export type Photo = {
    id: string;
    title: string;
    location: string;
    date: string;
    url: string;
    thumb?: string;
    tags?: string;
};

export type LinkRef = {
    name: string;
    url: string;
    label?: string;
};

export type Theme = 'dark' | 'light' | 'matrix';

export type CommandOutput = {
    text: string;
    type?: 'error' | 'success' | 'info';
};

export type TerminalHistory = {
    command: string;
    output: CommandOutput[];
    timestamp: number;
};
