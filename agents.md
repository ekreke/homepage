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
│   ├── chat/
│   │   └── page.tsx
│   └── projects/page.tsx
├── components/
│   ├── styles/
│   │   ├── minimal/
│   │   ├── card/
│   │   └── magazine/
│   ├── chat/
│   │   ├── ChatContainer.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   └── ChatWelcome.tsx
│   ├── shared/
│   └── ui/
├── config/
│   ├── site.ts
│   ├── blog-sources.ts
│   ├── projects.ts
│   ├── i18n.ts
│   └── ai-agent.ts
├── content/blog/          # Cached blog posts synced from Hashnode RSS
├── hooks/use-style.ts
├── i18n/
│   ├── en.json
│   ├── zh.json
│   ├── zh-TW.json
│   └── de.json
├── lib/
│   ├── blog.ts            # RSS fetch + XML parse + local cache
│   ├── blog-templates.ts  # Blog template registry (default + per slug/tag)
│   ├── chat.ts
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

### Blog System
- `config/blog-sources.ts` - Hashnode RSS feed URL and adapter config
- `lib/blog.ts` - RSS fetch, XML parse, frontmatter extraction, local cache to `content/blog/`
- `lib/blog-templates.ts` - Blog template registry (default + extensible by slug/tag)
- `content/blog/` - Cached markdown files synced from Hashnode RSS (ISR refresh every hour)
- `app/blog/page.tsx` - Blog list page with ISR
- `app/blog/[slug]/page.tsx` - Full article rendering with template routing

### Style System
- `lib/style-registry.ts` - Registers available styles, maps to component sets
- `hooks/use-style.ts` - Persists user's style preference (localStorage)
- `components/styles/<style-name>/` - Each style exports a complete set of section components

### i18n
- `i18n/*.json` - Translation files per language
- `config/i18n.ts` - Language list and defaults

### AI Agent
- `config/ai-agent.ts` - System prompt, suggested questions, knowledge config
- `lib/chat.ts` - AI interface abstraction (mock mode, swap to real API later)
- `components/chat/` - Chat UI components (ChatContainer, ChatMessage, ChatInput, ChatWelcome)
- `app/chat/page.tsx` - Standalone chat page at `/chat`
