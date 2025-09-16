# Andrés Encarnación - Portfolio Terminal

A modern, terminal-based portfolio website built with Next.js, TypeScript, and deployed as a static site to GitHub Pages.

## 🚀 Live Demo

Visit the live portfolio at: [https://andrese03.github.io](https://andrese03.github.io)

## 🎯 Features

- **Terminal Interface**: Fully interactive terminal with command history and autocomplete
- **Multiple Themes**: Dark, Light, and Matrix themes with localStorage persistence
- **Responsive Design**: Works on desktop and mobile devices
- **Static Export**: Optimized for GitHub Pages deployment
- **Data Layer**: Extensible API layer with Google Sheets integration support
- **SEO Optimized**: Complete metadata, OpenGraph, and Twitter cards
- **TypeScript**: Fully typed for better development experience

## 🛠 Available Commands

Type these commands in the terminal:

- `help` - Show available commands
- `whoami` - About Andrés Encarnación
- `projects` - List all projects
- `contact` - Show contact information
- `clear` - Clear the terminal

## 🏗 Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Deployment**: GitHub Pages (Static Export)
- **Package Manager**: npm

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/andrese03/andrese03.github.io.git
   cd andrese03.github.io
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Serve static files locally**:
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SHEET_API_BASE=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Google Sheets Integration

To set up dynamic data from Google Sheets:

1. **Create a Google Apps Script** with the following code:
   ```javascript
   function doGet(e) {
     const tab = e.parameter.t || 'projects';
     const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
     const data = sheet.getSheetByName(tab);
     const rows = data.getDataRange().getValues();
     const headers = rows[0];
     const result = rows.slice(1).map(row => {
       const obj = {};
       headers.forEach((header, index) => {
         obj[header] = row[index];
       });
       return obj;
     });
     return ContentService
       .createTextOutput(JSON.stringify(result))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

2. **Deploy as Web App** with execute permissions for "Anyone"

3. **Update your environment** with the deployment URL

4. **Create sheets** with these tabs and columns:
   - **projects**: slug, title, summary, stack, status, year, url, image, tags
   - **photos**: id, title, location, date, url, thumb, tags
   - **links**: name, url, label

### GitHub Pages Deployment

The project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** (for production deployment)
2. **GitHub Actions** will automatically build and deploy
3. **Static files** are served from the `out/` directory

For manual deployment:
```bash
npm run build
# Commit and push the generated files
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles with Tailwind
├── components/            # React components
│   └── SimpleTerminal.tsx # Terminal interface
├── lib/                   # Utility libraries
│   ├── api.ts            # Data layer with Google Sheets integration
│   └── commands.ts       # Command processor (advanced version)
├── types/                 # TypeScript type definitions
│   └── index.ts          # Project types
├── public/               # Static assets
│   ├── images/          # Images and icons
│   ├── favicon.ico      # Favicon
│   └── manifest.json    # Web app manifest
└── out/                  # Generated static files (after build)
```

## 🎨 Customization

### Adding New Commands

Edit `components/SimpleTerminal.tsx` and add to the `processCommand` function:

```typescript
case 'newcommand':
  return [
    'Your command output here',
    'Multiple lines supported'
  ];
```

### Changing Themes

Themes are defined in the terminal component. Modify the `getThemeClasses` function to add new color schemes.

### Adding Data Sources

The API layer in `lib/api.ts` supports multiple data sources. Add new endpoints or modify the mock data as needed.

## 🚀 Deployment Branches

- **`development`**: Active development branch
- **`main`**: Production branch for GitHub Pages deployment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: andresencarnacion03@gmail.com
- **LinkedIn**: [linkedin.com/in/andres-encarnacion](https://linkedin.com/in/andres-encarnacion)
- **GitHub**: [github.com/andrese03](https://github.com/andrese03)
- **Twitter**: [@andrese03](https://twitter.com/andrese03)

---

Built with ❤️ by Andrés Encarnación