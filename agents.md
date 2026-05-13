# AGENTS.md

## Commands

- `npm run dev` — dev server on localhost:3000
- `npm run build` — production build (SSG all pages)
- `npm run lint` — next lint
- Typecheck: `npx tsc --noEmit`
- Run a single test: `npx tsx tests/<file>` (e.g. `npx tsx tests/phase-1-setup.test.ts`)
- No test framework — tests are plain TS scripts using `fs` checks + `console.log`
- Always run `npm run lint` and `npx tsc --noEmit` before completing a task

## Architecture

- **Next.js 15 App Router** with SSG (no SSR pages). Route structure lives in `app/`.
- **Tailwind CSS v4** — uses `@tailwindcss/postcss` plugin in `postcss.config.mjs`, not the v3 `tailwindcss` PostCSS plugin. Config file is still `tailwind.config.ts`.
- **Path alias**: `@/*` → project root (configured in `tsconfig.json`).
- **No `src/` directory** — all code is at repo root (`app/`, `components/`, `config/`, `lib/`, etc.).

## Key Patterns

### Style system (in progress)
- Three visual styles: `minimal`, `card`, `magazine`, each under `components/styles/<name>/`.
- Every style must export the **same component set**: Navigation, HeroSection, AboutSection, BlogSection, ProjectsSection, Footer.
- Registry in `lib/style-registry.ts` maps style name → component set. Hook in `hooks/use-style.ts` persists choice to localStorage. Default: `minimal`.

### i18n
- Four languages: `en`, `zh`, `zh-TW`, `de`. Translation files in `i18n/<lang>.json`.
- `config/i18n.ts` defines supported list and default. Language persisted in localStorage.
- Provider: `components/shared/LanguageProvider.tsx`. Switcher: `components/shared/LanguageSwitcher.tsx`.

### Blog (planned)
- Source: Hashnode RSS (`https://blog.ekreke.cn/rss.xml`). Config in `config/blog-sources.ts`.
- `lib/blog.ts` — fetch RSS, parse XML, cache to `content/blog/*.md` with frontmatter.
- Blog pages use ISR (`revalidate: 3600`). Template routing in `lib/blog-templates.ts`.

### Data config
- `config/site.ts` — personal info (name, bio, skills, links). Single source of truth for all components.
- `config/projects.ts` — project data.
- **No hardcoded text in components** — all strings come from config or i18n files.

## Code Rules

- **No comments** in code unless explicitly requested.
- TypeScript strict mode is on (`tsconfig.json: strict: true`).
- `README.md` must keep the "Deploy with Vercel" button.
- When working on `main`, always sync changes to `dev` after pushing (push to both `origin/main` and `origin/dev`).

## Reference docs

- `spec.md` — full project rules and constraints
- `todo.md` — phased task list with progress
- `test.md` — verification criteria per phase
