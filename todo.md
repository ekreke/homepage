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
- [x] Create `config/i18n.ts` (supported languages, defaults)
- [x] Create translation files: `i18n/en.json`, `i18n/zh.json`, `i18n/zh-TW.json`, `i18n/de.json`
- [x] Implement language context provider
- [x] Create language switcher shared component

## Phase 3: Style System Core
- [x] Create `lib/style-registry.ts` (style name → component set mapping)
- [x] Create `hooks/use-style.tsx` (style preference + localStorage persistence)
- [x] Create style switcher shared component
- [x] Define shared section component interface (HeroSection, AboutSection, BlogSection, ProjectsSection, Footer)

## Phase 4: Minimal Style
- [x] Create `components/styles/minimal/Navigation.tsx`
- [x] Create `components/styles/minimal/HeroSection.tsx` (big name + tagline + CTA)
- [x] Create `components/styles/minimal/AboutSection.tsx` (bio + skills + story)
- [x] Create `components/styles/minimal/BlogSection.tsx` (article list, minimal layout)
- [x] Create `components/styles/minimal/ProjectsSection.tsx` (project list, minimal layout)
- [x] Create `components/styles/minimal/Footer.tsx`
- [x] Create `components/styles/minimal/index.ts` (export all)

## Phase 5: Card Style
- [x] Create `components/styles/card/Navigation.tsx`
- [x] Create `components/styles/card/HeroSection.tsx` (card-based intro)
- [x] Create `components/styles/card/AboutSection.tsx` (skill cards + bio card)
- [x] Create `components/styles/card/BlogSection.tsx` (blog card grid)
- [x] Create `components/styles/card/ProjectsSection.tsx` (project card grid)
- [x] Create `components/styles/card/Footer.tsx`
- [x] Create `components/styles/card/index.ts` (export all)

## Phase 6: Magazine Style
- [x] Create `components/styles/magazine/Navigation.tsx`
- [x] Create `components/styles/magazine/HeroSection.tsx` (editorial hero with large image)
- [x] Create `components/styles/magazine/AboutSection.tsx` (magazine-style feature layout)
- [x] Create `components/styles/magazine/BlogSection.tsx` (magazine article grid)
- [x] Create `components/styles/magazine/ProjectsSection.tsx` (featured project spread)
- [x] Create `components/styles/magazine/Footer.tsx`
- [x] Create `components/styles/magazine/index.ts` (export all)

## Phase 7: Blog System (Hashnode RSS + Local Cache)
- [x] Install `fast-xml-parser` dependency
- [x] Update `config/blog-sources.ts` with Hashnode RSS URL (`https://blog.ekreke.cn/rss.xml`)
- [x] Create `lib/blog.ts` (RSS fetch + XML parse + frontmatter extraction + local cache to `content/blog/`)
- [x] Create `lib/blog-templates.ts` (blog template registry, default + extensible by slug/tag)
- [x] Create `app/blog/page.tsx` (blog list page with ISR, `revalidate: 3600`)
- [x] Create `app/blog/[slug]/page.tsx` (full article rendering, ISR + `generateStaticParams`, route to template by slug/tag)
- [x] Add blog card component to all 3 style BlogSections (minimal done; card/magazine deferred to Phase 5-6)
- [x] Ensure each blog post generates a standalone HTML file
- [x] Verify RSS fetch and local cache write on first build

## Phase 8: Homepage Assembly
- [x] Create `app/page.tsx` (style switcher + dynamic section rendering)
- [x] Create `app/layout.tsx` (root layout with providers)
- [x] Create `app/projects/page.tsx` (projects page)
- [x] Wire up navigation links between pages

## Fix: Blog Not Displaying
- [x] Diagnose root cause: RSS feed blocked by Vercel WAF/Cloudflare challenge
- [x] Update `lib/blog.ts`: always enable cache, fallback to local markdown on fetch failure
- [x] Add `User-Agent` header to RSS fetch request
- [x] Create `scripts/import-rss.ts` for local RSS import (URL or file)
- [ ] Import actual blog posts from `https://blog.ekreke.cn/rss.xml`
- [ ] Verify blog section displays on homepage and `/blog` page

## Phase 9: Polish & Deploy
- [ ] Dark mode support across all styles
- [ ] Responsive design for all styles
- [ ] Verify SSG output (each blog post = independent HTML)
- [ ] Verify Vercel deployment
- [ ] Performance audit (Lighthouse)

## Phase 10: Personal AI Agent
- [ ] Create `config/ai-agent.ts` (system prompt, suggested questions, knowledge config)
- [ ] Create `lib/chat.ts` (AI interface abstraction, mock mode)
- [ ] Create `components/chat/ChatMessage.tsx` (message bubble component)
- [ ] Create `components/chat/ChatInput.tsx` (input field + send button)
- [ ] Create `components/chat/ChatWelcome.tsx` (welcome screen with suggested questions)
- [ ] Create `components/chat/ChatContainer.tsx` (message list + scroll + auto-resize)
- [ ] Create `app/chat/page.tsx` (standalone chat page)
- [ ] Add Chat link to all 3 style Navigation components
- [ ] Add chat message persistence (localStorage)
- [ ] Ensure chat UI adapts to current style (minimal/card/magazine)

## Phase 11: i18n Content Migration & Multilingual Generation
- [ ] Migrate `config/site.ts` personal content (bio, story, tagline, cta.label) to `i18n/<lang>.json` under new `site` key
- [ ] Add `site` and `projects` sections to all 4 i18n JSON files (en, zh, zh-TW, de)
- [ ] Update all components to read personal content from i18n instead of siteConfig
- [ ] Migrate `config/projects.ts` titles/descriptions to i18n (keep tags/urls/images in projects.ts)
- [ ] Create i18n content generation skill (`.opencode/skills/i18n-content-gen/`)
- [ ] Generate quality translations for all languages using the skill
- [ ] Verify all languages render correctly on homepage, about, projects pages
