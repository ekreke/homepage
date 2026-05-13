# TODO - Task List

## Phase 1: Project Setup
- [x] Migrate from Vite to Next.js (App Router)
- [x] Configure TypeScript strict mode
- [x] Configure Tailwind CSS
- [x] Set up `config/site.ts` with personal data
- [x] Set up `config/projects.ts` with project data
- [x] Create placeholder configs (`blog-sources.ts`, `i18n.ts`)
- [x] Verify Vercel one-click deploy still works

## Phase 2: i18n System
- [ ] Create `config/i18n.ts` (supported languages, defaults)
- [ ] Create translation files: `i18n/en.json`, `i18n/zh.json`, `i18n/zh-TW.json`, `i18n/de.json`
- [ ] Implement language context provider
- [ ] Create language switcher shared component

## Phase 3: Style System Core
- [ ] Create `lib/style-registry.ts` (style name → component set mapping)
- [ ] Create `hooks/use-style.ts` (style preference + localStorage persistence)
- [ ] Create style switcher shared component
- [ ] Define shared section component interface (HeroSection, AboutSection, BlogSection, ProjectsSection, Footer)

## Phase 4: Minimal Style
- [ ] Create `components/styles/minimal/Navigation.tsx`
- [ ] Create `components/styles/minimal/HeroSection.tsx` (big name + tagline + CTA)
- [ ] Create `components/styles/minimal/AboutSection.tsx` (bio + skills + story)
- [ ] Create `components/styles/minimal/BlogSection.tsx` (article list, minimal layout)
- [ ] Create `components/styles/minimal/ProjectsSection.tsx` (project list, minimal layout)
- [ ] Create `components/styles/minimal/Footer.tsx`
- [ ] Create `components/styles/minimal/index.ts` (export all)

## Phase 5: Card Style
- [ ] Create `components/styles/card/Navigation.tsx`
- [ ] Create `components/styles/card/HeroSection.tsx` (card-based intro)
- [ ] Create `components/styles/card/AboutSection.tsx` (skill cards + bio card)
- [ ] Create `components/styles/card/BlogSection.tsx` (blog card grid)
- [ ] Create `components/styles/card/ProjectsSection.tsx` (project card grid)
- [ ] Create `components/styles/card/Footer.tsx`
- [ ] Create `components/styles/card/index.ts` (export all)

## Phase 6: Magazine Style
- [ ] Create `components/styles/magazine/Navigation.tsx`
- [ ] Create `components/styles/magazine/HeroSection.tsx` (editorial hero with large image)
- [ ] Create `components/styles/magazine/AboutSection.tsx` (magazine-style feature layout)
- [ ] Create `components/styles/magazine/BlogSection.tsx` (magazine article grid)
- [ ] Create `components/styles/magazine/ProjectsSection.tsx` (featured project spread)
- [ ] Create `components/styles/magazine/Footer.tsx`
- [ ] Create `components/styles/magazine/index.ts` (export all)

## Phase 7: Blog System
- [ ] Create `content/blog/` with sample markdown posts
- [ ] Create `config/blog-sources.ts` (adapter pattern, initial: local markdown)
- [ ] Create `lib/blog.ts` (markdown parsing, frontmatter extraction)
- [ ] Create `app/blog/page.tsx` (blog list page)
- [ ] Create `app/blog/[slug]/page.tsx` (individual post, SSG with generateStaticParams)
- [ ] Ensure each blog post generates a standalone HTML file

## Phase 8: Homepage Assembly
- [ ] Create `app/page.tsx` (style switcher + dynamic section rendering)
- [ ] Create `app/layout.tsx` (root layout with providers)
- [ ] Create `app/projects/page.tsx` (projects page)
- [ ] Wire up navigation links between pages

## Phase 9: Polish & Deploy
- [ ] Dark mode support across all styles
- [ ] Responsive design for all styles
- [ ] Verify SSG output (each blog post = independent HTML)
- [ ] Verify Vercel deployment
- [ ] Performance audit (Lighthouse)
