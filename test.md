# Test - Verification Plan

Each phase in `todo.md` maps to testable criteria below. Tests live in `tests/` directory.

## Phase 1: Project Setup

### 1.1 Framework Migration
- **File**: `tests/phase-1-setup.test.ts`
- **Verify**:
  - [ ] `package.json` contains `next` as dependency
  - [ ] `app/layout.tsx` exists and is valid Next.js layout
  - [ ] `app/page.tsx` exists and exports default component
  - [ ] `tsconfig.json` has `"strict": true`
  - [ ] `tailwind.config.ts` exists with correct content paths
  - [ ] `npm run build` succeeds without errors
  - [ ] All required directories exist: `app/`, `components/`, `config/`, `content/`, `hooks/`, `i18n/`, `lib/`, `public/`
  - [ ] `config/site.ts` exports site metadata (name, tagline, bio, skills, links)
  - [ ] `config/blog-sources.ts` exists (placeholder)
  - [ ] `config/i18n.ts` exists (placeholder)
  - [ ] `config/projects.ts` exports project data
  - [ ] `src/` directory does NOT exist (migrated to app/)
  - [ ] `vite.config.ts` does NOT exist
  - [ ] `index.html` (root level) does NOT exist
  - [ ] `README.md` contains "Deploy with Vercel" button link

### 1.2 Build Verification
- **Command**: `npm run build && npm run start`
- **Verify**:
  - [ ] `npm run build` completes successfully
  - [ ] `.next/` directory is generated
  - [ ] Homepage loads at `http://localhost:3000`

---

## Phase 2: i18n System

### 2.1 Configuration
- **File**: `tests/phase-2-i18n.test.ts`
- **Verify**:
  - [ ] `config/i18n.ts` exports supported languages array: `['en', 'zh', 'zh-TW', 'de']`
  - [ ] `config/i18n.ts` exports a default language
  - [ ] All 4 translation files exist: `i18n/en.json`, `i18n/zh.json`, `i18n/zh-TW.json`, `i18n/de.json`
  - [ ] Each translation file contains the same top-level keys

### 2.2 Runtime Behavior
- **File**: `tests/phase-2-i18n.test.ts`
- **Verify**:
  - [ ] Language context provider wraps the app in `app/layout.tsx`
  - [ ] Language switcher component exists in `components/shared/`
  - [ ] Switching language updates visible text on the page

---

## Phase 3: Style System Core

### 3.1 Style Registry
- **File**: `tests/phase-3-style-system.test.ts`
- **Verify**:
  - [ ] `lib/style-registry.ts` exports a registry mapping style names to component sets
  - [ ] Registry contains entries for: `minimal`, `card`, `magazine`
  - [ ] Each entry exports: Navigation, HeroSection, AboutSection, BlogSection, ProjectsSection, Footer

### 3.2 Style Hook
- **File**: `tests/phase-3-style-system.test.ts`
- **Verify**:
  - [ ] `hooks/use-style.ts` exports a hook that returns current style name
  - [ ] Hook reads from localStorage on mount
  - [ ] Hook provides a setter that persists to localStorage
  - [ ] Default style is `minimal`

### 3.3 Style Switcher
- **File**: `tests/phase-3-style-system.test.ts`
- **Verify**:
  - [ ] Style switcher component exists in `components/shared/`
  - [ ] Clicking a different style updates the page layout immediately
  - [ ] Selected style persists after page reload

---

## Phase 4: Minimal Style

### 4.1 Component Existence
- **File**: `tests/phase-4-minimal.test.ts`
- **Verify**:
  - [ ] `components/styles/minimal/` directory exists
  - [ ] All 7 files exist: Navigation, HeroSection, AboutSection, BlogSection, ProjectsSection, Footer, index.ts
  - [ ] `index.ts` re-exports all 6 section components

### 4.2 Component Interface
- **File**: `tests/phase-4-minimal.test.ts`
- **Verify**:
  - [ ] Each component accepts `language` prop (string)
  - [ ] HeroSection renders name and tagline from `config/site.ts`
  - [ ] AboutSection renders bio and skills from `config/site.ts`
  - [ ] BlogSection renders blog post list
  - [ ] ProjectsSection renders project list from `config/projects.ts`
  - [ ] Footer renders copyright text

### 4.3 Visual Snapshot
- **Verify**:
  - [ ] Homepage renders with minimal style by default
  - [ ] Layout uses large whitespace and typography-focused design
  - [ ] No card/grid elements (those belong to Card/Magazine styles)

---

## Phase 5: Card Style

### 5.1 Component Existence
- **File**: `tests/phase-5-card.test.ts`
- **Verify**:
  - [ ] `components/styles/card/` directory exists
  - [ ] All 7 files exist: Navigation, HeroSection, AboutSection, BlogSection, ProjectsSection, Footer, index.ts
  - [ ] `index.ts` re-exports all 6 section components

### 5.2 Component Interface
- **File**: `tests/phase-5-card.test.ts`
- **Verify**:
  - [ ] Each component accepts `language` prop (string)
  - [ ] Same data props as Minimal style (shared config/site.ts)
  - [ ] Blog section uses card grid layout
  - [ ] Projects section uses card grid layout

### 5.3 Style Switching
- **Verify**:
  - [ ] Switching to Card style changes page layout visually
  - [ ] Card grid is visible for blog and projects sections

---

## Phase 6: Magazine Style

### 6.1 Component Existence
- **File**: `tests/phase-6-magazine.test.ts`
- **Verify**:
  - [ ] `components/styles/magazine/` directory exists
  - [ ] All 7 files exist: Navigation, HeroSection, AboutSection, BlogSection, ProjectsSection, Footer, index.ts
  - [ ] `index.ts` re-exports all 6 section components

### 6.2 Component Interface
- **File**: `tests/phase-6-magazine.test.ts`
- **Verify**:
  - [ ] Each component accepts `language` prop (string)
  - [ ] HeroSection features large editorial image
  - [ ] Sections use magazine-style mixed layout (text + images)

### 6.3 Style Switching
- **Verify**:
  - [ ] Switching to Magazine style changes page layout visually
  - [ ] Layout differs visually from both Minimal and Card styles

---

## Phase 7: Blog System

### 7.1 Content & Config
- **File**: `tests/phase-7-blog.test.ts`
- **Verify**:
  - [ ] `content/blog/` directory exists with at least 1 `.md` file
  - [ ] Each markdown file has valid frontmatter (title, date, slug)
  - [ ] `config/blog-sources.ts` exports an adapter configuration
  - [ ] `lib/blog.ts` exports functions: `getAllPosts()`, `getPostBySlug(slug)`

### 7.2 Pages
- **File**: `tests/phase-7-blog.test.ts`
- **Verify**:
  - [ ] `app/blog/page.tsx` exists and renders post list
  - [ ] `app/blog/[slug]/page.tsx` exists with `generateStaticParams` export

### 7.3 SSG Output
- **Command**: `npm run build`
- **Verify**:
  - [ ] Build succeeds
  - [ ] Each blog post has a corresponding `.html` file in `.next/server/app/blog/`
  - [ ] Each HTML file contains post title in `<title>` or `<h1>` tag
  - [ ] Each HTML file is a standalone page with metadata

---

## Phase 8: Homepage Assembly

### 8.1 Page Composition
- **File**: `tests/phase-8-assembly.test.ts`
- **Verify**:
  - [ ] `app/page.tsx` renders all sections in order: Hero → About → Blog → Projects → Footer
  - [ ] `app/layout.tsx` includes providers (style, language, theme)
  - [ ] `app/projects/page.tsx` exists and renders projects

### 8.2 Navigation
- **File**: `tests/phase-8-assembly.test.ts`
- **Verify**:
  - [ ] Navigation links scroll to correct sections on homepage
  - [ ] Blog link navigates to `/blog`
  - [ ] Projects link navigates to `/projects`
  - [ ] All links work across all 3 styles

---

## Phase 9: Polish & Deploy

### 9.1 Dark Mode
- **File**: `tests/phase-9-polish.test.ts`
- **Verify**:
  - [ ] Dark mode toggle exists in navigation for all 3 styles
  - [ ] Toggling dark mode changes background and text colors
  - [ ] Dark mode preference persists after page reload

### 9.2 Responsive Design
- **File**: `tests/phase-9-polish.test.ts`
- **Verify**:
  - [ ] Homepage renders correctly at 320px viewport width
  - [ ] Homepage renders correctly at 768px viewport width
  - [ ] Homepage renders correctly at 1440px viewport width
  - [ ] All 3 styles are responsive

### 9.3 SSG Verification
- **Command**: `npm run build`
- **Verify**:
  - [ ] Build produces static HTML for all pages
  - [ ] No server-side rendering required (all pages are SSG)
  - [ ] Blog posts are independent HTML files

### 9.4 Vercel Deployment
- **Verify**:
  - [ ] `vercel --prod` deploys successfully (or GitHub push triggers deployment)
  - [ ] Live site loads without errors
  - [ ] All 3 styles work on deployed site
  - [ ] Blog posts are accessible via direct URL

### 9.5 Performance
- **Command**: `npx lighthouse http://localhost:3000 --output=json`
- **Verify**:
  - [ ] Performance score >= 90
  - [ ] Accessibility score >= 90
  - [ ] Best Practices score >= 90
  - [ ] SEO score >= 90
