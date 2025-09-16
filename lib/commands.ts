import { Project, Photo, LinkRef, CommandOutput } from '@/types';
import { getProjects, getPhotos, getLinks } from '@/lib/api';

export class CommandProcessor {
  private projects: Project[] = [];
  private photos: Photo[] = [];
  private links: LinkRef[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData() {
    try {
      [this.projects, this.photos, this.links] = await Promise.all([
        getProjects(),
        getPhotos(),
        getLinks(),
      ]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load data:', error);
    }
  }

  async processCommand(input: string): Promise<CommandOutput[]> {
    const trimmed = input.trim();
    if (!trimmed) return [];

    const [command, ...args] = trimmed.toLowerCase().split(' ');

    switch (command) {
      case 'help':
        return this.helpCommand();
      case 'whoami':
        return this.whoamiCommand();
      case 'projects':
        return await this.projectsCommand(args);
      case 'project':
        return await this.projectCommand(args);
      case 'photos':
        return await this.photosCommand(args);
      case 'open':
        return await this.openCommand(args);
      case 'contact':
        return this.contactCommand();
      case 'clear':
        return [{ text: '__CLEAR__', type: 'info' }];
      case 'theme':
        return this.themeCommand(args);
      case 'random':
        return this.randomCommand();
      default:
        return [
          {
            text: `Command not found: ${command}. Type 'help' for available commands.`,
            type: 'error',
          },
        ];
    }
  }

  private helpCommand(): CommandOutput[] {
    return [
      { text: 'Available Commands:', type: 'info' },
      { text: '' },
      { text: '  help                     - Show this help message' },
      { text: '  whoami                   - About Andrés Encarnación' },
      {
        text: '  projects [--tag X] [--year YYYY] - List projects (optional filters)',
      },
      { text: '  project <slug>           - Show detailed project info' },
      {
        text: '  photos [--tag X]         - List photos (optional tag filter)',
      },
      {
        text: '  open <linkName>          - Open social links (github, linkedin, twitter, email)',
      },
      { text: '  contact                  - Show contact information' },
      { text: '  clear                    - Clear terminal' },
      { text: '  theme <dark|light|matrix> - Change terminal theme' },
      { text: '  random                   - Show a random fact or quote' },
      { text: '' },
      {
        text: 'Navigation: Use ↑/↓ arrow keys for command history, Tab for autocomplete',
      },
    ];
  }

  private whoamiCommand(): CommandOutput[] {
    return [
      { text: 'Andrés Encarnación', type: 'success' },
      { text: 'Web Developer | Software Engineer', type: 'info' },
      { text: '' },
      {
        text: 'Code lover with 6+ years working as Software Developer in software companies',
      },
      {
        text: 'and particular projects of different areas. Specializes in JavaScript, C#,',
      },
      {
        text: 'and modern web technologies. Has strong knowledge of the software development',
      },
      {
        text: 'cycle, agile methodologies, best software practices and architecture patterns.',
      },
      { text: '' },
      { text: 'Currently focused on:' },
      { text: '• Full-stack JavaScript (React, Next.js, Node.js)' },
      { text: '• TypeScript development' },
      { text: '• Cloud platforms (AWS, Salesforce)' },
      { text: '• Agile methodologies' },
      { text: '' },
      { text: 'Education:' },
      { text: '• Degree in Systems Engineering - UNAPEC (2011-2018)' },
      { text: '• Software Developer - INFOTEP (2013-2014)' },
      { text: '' },
      {
        text: 'Languages: Spanish (Native), English (Professional), Portuguese (Reading/Writing)',
      },
    ];
  }

  private async projectsCommand(args: string[]): Promise<CommandOutput[]> {
    if (this.projects.length === 0) {
      await this.loadData();
    }

    let filtered = [...this.projects];
    let tagFilter = '';
    let yearFilter = '';

    // Parse arguments
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--tag' && args[i + 1]) {
        tagFilter = args[i + 1].toLowerCase();
        i++;
      } else if (args[i] === '--year' && args[i + 1]) {
        yearFilter = args[i + 1];
        i++;
      }
    }

    // Apply filters
    if (tagFilter) {
      filtered = filtered.filter(p => p.tags.toLowerCase().includes(tagFilter));
    }
    if (yearFilter) {
      filtered = filtered.filter(p => p.year === yearFilter);
    }

    if (filtered.length === 0) {
      return [
        { text: 'No projects found matching the criteria.', type: 'info' },
      ];
    }

    const output: CommandOutput[] = [
      {
        text: `Projects${tagFilter ? ` (tag: ${tagFilter})` : ''}${yearFilter ? ` (year: ${yearFilter})` : ''}:`,
        type: 'success',
      },
      { text: '' },
    ];

    filtered.forEach(project => {
      output.push(
        { text: `${project.title} (${project.year})` },
        { text: `  Slug: ${project.slug}` },
        { text: `  Status: ${project.status}` },
        { text: `  Stack: ${project.stack}` },
        { text: `  Summary: ${project.summary}` },
        { text: `  URL: ${project.url}` },
        { text: `  Tags: ${project.tags}` },
        { text: '' }
      );
    });

    output.push({ text: `Use 'project <slug>' for detailed information.` });
    return output;
  }

  private async projectCommand(args: string[]): Promise<CommandOutput[]> {
    if (args.length === 0) {
      return [
        {
          text: "Please specify a project slug. Use 'projects' to see available options.",
          type: 'error',
        },
      ];
    }

    if (this.projects.length === 0) {
      await this.loadData();
    }

    const slug = args[0].toLowerCase();
    const project = this.projects.find(p => p.slug.toLowerCase() === slug);

    if (!project) {
      return [
        {
          text: `Project '${slug}' not found. Use 'projects' to see available options.`,
          type: 'error',
        },
      ];
    }

    return [
      { text: project.title, type: 'success' },
      { text: `Year: ${project.year}` },
      { text: `Status: ${project.status}` },
      { text: `URL: ${project.url}` },
      { text: '' },
      { text: 'Summary:' },
      { text: project.summary },
      { text: '' },
      { text: `Technology Stack: ${project.stack}` },
      { text: `Tags: ${project.tags}` },
    ];
  }

  private async photosCommand(args: string[]): Promise<CommandOutput[]> {
    if (this.photos.length === 0) {
      await this.loadData();
    }

    let filtered = [...this.photos];
    let tagFilter = '';

    // Parse tag filter
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--tag' && args[i + 1]) {
        tagFilter = args[i + 1].toLowerCase();
        i++;
      }
    }

    if (tagFilter) {
      filtered = filtered.filter(p =>
        p.tags?.toLowerCase().includes(tagFilter)
      );
    }

    if (filtered.length === 0) {
      return [{ text: 'No photos found matching the criteria.', type: 'info' }];
    }

    const output: CommandOutput[] = [
      {
        text: `Photos${tagFilter ? ` (tag: ${tagFilter})` : ''}:`,
        type: 'success',
      },
      { text: '' },
    ];

    filtered.forEach(photo => {
      output.push(
        { text: `${photo.title}` },
        { text: `  Location: ${photo.location}` },
        { text: `  Date: ${photo.date}` },
        { text: `  URL: ${photo.url}` },
        { text: `  Tags: ${photo.tags || 'None'}` },
        { text: '' }
      );
    });

    return output;
  }

  private async openCommand(args: string[]): Promise<CommandOutput[]> {
    if (args.length === 0) {
      return [
        {
          text: 'Please specify a link name. Available: github, linkedin, twitter, email',
          type: 'error',
        },
      ];
    }

    if (this.links.length === 0) {
      await this.loadData();
    }

    const linkName = args[0].toLowerCase();
    const link = this.links.find(l => l.name.toLowerCase() === linkName);

    if (!link) {
      const available = this.links.map(l => l.name).join(', ');
      return [
        {
          text: `Link '${linkName}' not found. Available: ${available}`,
          type: 'error',
        },
      ];
    }

    // Open the link
    if (typeof window !== 'undefined') {
      window.open(link.url, '_blank');
    }

    return [
      {
        text: `Opening ${link.label || link.name}: ${link.url}`,
        type: 'success',
      },
    ];
  }

  private contactCommand(): CommandOutput[] {
    return [
      { text: 'Contact Information:', type: 'success' },
      { text: '' },
      { text: '📧 Email: andresencarnacion03@gmail.com' },
      { text: '📱 Phone: +1 829-918-4981' },
      { text: '💼 LinkedIn: linkedin.com/in/andres-encarnacion' },
      { text: '🐙 GitHub: github.com/andrese03' },
      { text: '🐦 Twitter: @andrese03' },
      { text: '' },
      { text: 'Feel free to reach out for collaboration opportunities!' },
    ];
  }

  private themeCommand(args: string[]): CommandOutput[] {
    if (args.length === 0) {
      return [
        { text: 'Current theme options:', type: 'info' },
        { text: '• dark - Dark terminal theme' },
        { text: '• light - Light terminal theme' },
        { text: '• matrix - Classic green-on-black matrix theme' },
        { text: '' },
        { text: 'Usage: theme <theme-name>' },
      ];
    }

    const theme = args[0].toLowerCase();
    const validThemes = ['dark', 'light', 'matrix'];

    if (!validThemes.includes(theme)) {
      return [
        {
          text: `Invalid theme '${theme}'. Valid options: ${validThemes.join(', ')}`,
          type: 'error',
        },
      ];
    }

    // Theme change will be handled by the terminal component
    return [{ text: `__THEME_CHANGE__:${theme}`, type: 'info' }];
  }

  private randomCommand(): CommandOutput[] {
    const facts = [
      'I once debugged a production issue at 3 AM using only my phone! 📱',
      'My first programming language was QBasic on a 486 computer 💾',
      'I can write "Hello World" in over 10 programming languages 🌍',
      'Coffee consumption is directly proportional to code quality ☕',
      'I believe unicorns are just horses with a single commit ahead 🦄',
      'The best code is code that explains itself... but comments help too 📝',
      "I've been coding since 2014 and still get excited about new features 🚀",
      'My favorite debugging method? Rubber duck debugging 🦆',
      'I learned Portuguese just by reading Brazilian tech blogs 🇧🇷',
      'Photography and coding are similar - both capture moments in time 📸',
    ];

    const quotes = [
      '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
      '"The best error message is the one that never shows up." - Thomas Fuchs',
      '"Programs must be written for people to read, and only incidentally for machines to execute." - Harold Abelson',
      '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
      '"First, solve the problem. Then, write the code." - John Johnson',
    ];

    const all = [...facts, ...quotes];
    const random = all[Math.floor(Math.random() * all.length)];

    return [
      { text: 'Random fact/quote:', type: 'info' },
      { text: '' },
      { text: random },
    ];
  }

  getAutoCompleteOptions(input: string): string[] {
    const commands = [
      'help',
      'whoami',
      'projects',
      'project',
      'photos',
      'open',
      'contact',
      'clear',
      'theme',
      'random',
    ];
    const [command, ...args] = input.toLowerCase().split(' ');

    if (args.length === 0) {
      return commands.filter(cmd => cmd.startsWith(command));
    }

    // Autocomplete for specific commands
    switch (command) {
      case 'project':
        return this.projects
          .filter(p => p.slug.toLowerCase().startsWith(args[0] || ''))
          .map(p => `project ${p.slug}`);

      case 'open':
        return this.links
          .filter(l => l.name.toLowerCase().startsWith(args[0] || ''))
          .map(l => `open ${l.name}`);

      case 'theme':
        const themes = ['dark', 'light', 'matrix'];
        return themes
          .filter(t => t.startsWith(args[0] || ''))
          .map(t => `theme ${t}`);

      default:
        return [];
    }
  }
}
