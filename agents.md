# AGENTS.md - Project Index

## Documents

| File | Description |
|------|-------------|
| [spec.md](./spec.md) | Project rules, conventions, and constraints |
| [todo.md](./todo.md) | Task list and progress tracking |
| [test.md](./test.md) | Verification plan for each todo phase |
| [agents.md](./agents.md) | Project index (this file) |

## Tech Stack

- **Framework**: Next.js (App Router + SSG)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (one-click deploy)

## Project Structure

```
homepage/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── projects/page.tsx
├── components/
│   ├── styles/
│   │   ├── minimal/
│   │   ├── card/
│   │   └── magazine/
│   ├── shared/
│   └── ui/
├── config/
│   ├── site.ts
│   ├── blog-sources.ts
│   ├── projects.ts
│   └── i18n.ts
├── content/blog/
├── hooks/use-style.ts
├── i18n/
│   ├── en.json
│   ├── zh.json
│   ├── zh-TW.json
│   └── de.json
├── lib/
│   ├── blog.ts
│   └── style-registry.ts
├── public/images/
├── tests/
│   └── phase-*.test.ts
├── spec.md
├── test.md
├── todo.md
└── agents.md
```

## Key Files

### Entry Points
- `app/layout.tsx` - Root layout, wraps all pages
- `app/page.tsx` - Homepage, renders style-switchable sections

### Configuration
- `config/site.ts` - All personal info in one place (name, tagline, bio, skills, social links)
- `config/blog-sources.ts` - Third-party blog source adapters
- `config/i18n.ts` - Supported languages and default

### Style System
- `lib/style-registry.ts` - Registers available styles, maps to component sets
- `hooks/use-style.ts` - Persists user's style preference (localStorage)
- `components/styles/<style-name>/` - Each style exports a complete set of section components

### i18n
- `i18n/*.json` - Translation files per language
- `config/i18n.ts` - Language list and defaults
