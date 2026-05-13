# Spec - Project Rules

## 1. Tech Stack
- Framework: Next.js (App Router, SSG)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- Deployment: Vercel

## 2. Style System
- Three styles: Minimal / Card / Magazine
- Each style is a COMPLETELY INDEPENDENT layout, sharing only data and i18n
- Styles are stored under `components/styles/<style-name>/`
- Each style folder exports the same set of section components:
  - HeroSection, AboutSection, BlogSection, ProjectsSection, Footer
- Style registry in `lib/style-registry.ts` maps style name → component set
- User's choice is persisted in localStorage, default is "minimal"
- Style switcher is a shared component rendered in every style's Navigation

## 3. Blog System
- Each blog post is SSG-generated as an independent HTML page
- Blog data sources are configurable in `config/blog-sources.ts`
- Initial implementation: local markdown files in `content/blog/`
- Future: adapter pattern to pull from third-party platforms
- Blog post page at `/blog/[slug]` generates static params at build time
- Each post page is a standalone HTML with own metadata (SEO-friendly)

## 4. Internationalization (i18n)
- Supported languages: en, zh, zh-TW, de
- Translation files: `i18n/<lang>.json`
- Language preference persisted in localStorage
- Language switcher is a shared component in navigation

## 5. Data Configuration
- All personal data centralized in `config/site.ts`
- Projects data in `config/projects.ts`
- Blog sources in `config/blog-sources.ts`
- No hardcoded text in components

## 6. Component Rules
- NO comments in code unless explicitly requested
- Each style folder must export the exact same component interface
- Shared components (style switcher, language switcher) live in `components/shared/`
- UI primitives live in `components/ui/`

## 7. Build & Deploy
- `npm run dev` - development server
- `npm run build` - production build with SSG
- All blog pages are statically generated
- Deploy to Vercel with zero configuration
- README.md must preserve the "Deploy with Vercel" button

## 8. Code Style
- Use `pip3` and `python3` when writing python projects
- Always run lint and typecheck commands before completing a task

## 9. Testing & Verification
- Every feature MUST include a verifiable test in `tests/` directory
- Tests are organized by phase, matching `todo.md` structure
- Each test file is named `phase-<N>-<feature>.test.ts`
- Verification methods include:
  - File existence checks (config, components, pages)
  - Export interface validation (style components)
  - Build output validation (SSG HTML files)
  - Runtime behavior checks (style switching, i18n)
- Run `npx tsx tests/<file>` to execute individual tests
- All tests must pass before marking a todo item as complete
