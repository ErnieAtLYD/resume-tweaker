# Resume Analysis Application

A smart career tool that helps users optimize their resumes for specific job applications by leveraging AI to provide professional feedback and suggestions for improvement.

## Features

- Upload and parse resume documents (Markdown support)
- Input job descriptions
- AI-powered resume optimization and cover letter generation
- Section-by-section resume breakdown
- Detailed feedback and improvement suggestions
- Modern, responsive user interface
- Server-side processing with AI integration

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API
- **PDF Generation**: html2canvas, jsPDF
- **Font**: Geist Font Family
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:

```bash
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
pnpm dev
```

5. Open the application in your browser at [http://localhost:3000](http://localhost:3000)

## Project Structure
```
├── src/
│   ├── app/
│   │   ├── fonts/
│   │   │   ├── GeistVF.woff
│   │   │   └── GeistMonoVF.woff
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── results/
│   │   │   ├── DocumentSection.tsx
│   │   │   └── HiddenMarkdownContent.tsx
│   │   ├── JobDescriptionInput.tsx
│   │   ├── ResumeInput.tsx
│   │   └── Results.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── pdf.ts
│   │   └── prompts.ts
│   └── actions.ts
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Core Components

- **ResumeInput**: Handles resume text input and loading sample data
- **JobDescriptionInput**: Manages job description text input
- **Results**: Displays optimized resume and cover letter, and provides download options
- **DocumentSection**: Renders individual sections of the analysis
- **HiddenMarkdownContent**: Manages markdown content display

## Development

### Available Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build production application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

### Environment Variables

Required environment variables:

```bash
OPENAI_API_KEY=your_openai_api_key
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Next.js team for the amazing framework
- OpenAI for their powerful API
- Vercel for Geist font family
- Contributors and maintainers

## Support

For support, please open an issue in the GitHub repository or contact [your-contact-info].
