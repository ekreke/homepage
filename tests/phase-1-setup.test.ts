import { existsSync, readFileSync } from "fs";
import { join } from "path";

const root = process.cwd();

function check(label: string, condition: boolean) {
  const status = condition ? "PASS" : "FAIL";
  console.log(`[${status}] ${label}`);
  if (!condition) process.exitCode = 1;
}

const dirs = [
  "app",
  "app/blog",
  "app/blog/[slug]",
  "app/projects",
  "components",
  "components/styles",
  "components/styles/minimal",
  "components/styles/card",
  "components/styles/magazine",
  "components/shared",
  "components/ui",
  "config",
  "content",
  "content/blog",
  "hooks",
  "i18n",
  "lib",
  "public",
  "public/images",
  "tests",
];

console.log("\n=== Phase 1: Project Setup ===\n");

console.log("-- Directories --");
for (const dir of dirs) {
  check(`Directory exists: ${dir}/`, existsSync(join(root, dir)));
}

console.log("\n-- Old files removed --");
check("src/ does NOT exist", !existsSync(join(root, "src")));
check("vite.config.ts does NOT exist", !existsSync(join(root, "vite.config.ts")));
check("index.html does NOT exist", !existsSync(join(root, "index.html")));

console.log("\n-- Framework --");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf-8"));
check("package.json has 'next' dependency", "next" in pkg.dependencies);
check("package.json has 'react' dependency", "react" in pkg.dependencies);
check("dev script is 'next dev'", pkg.scripts.dev === "next dev");
check("build script is 'next build'", pkg.scripts.build === "next build");

console.log("\n-- TypeScript --");
const tsconfig = JSON.parse(readFileSync(join(root, "tsconfig.json"), "utf-8"));
check("tsconfig.json has strict: true", tsconfig.compilerOptions.strict === true);
check("tsconfig.json has @/* path alias", tsconfig.compilerOptions.paths?.["@/*"]?.[0] === "./*");
check("tsconfig.json has next plugin", tsconfig.compilerOptions.plugins?.some((p: { name: string }) => p.name === "next"));

console.log("\n-- Config files --");
check("next.config.ts exists", existsSync(join(root, "next.config.ts")));
check("tailwind.config.ts exists", existsSync(join(root, "tailwind.config.ts")));
check("postcss.config.mjs exists", existsSync(join(root, "postcss.config.mjs")));

console.log("\n-- App pages --");
check("app/layout.tsx exists", existsSync(join(root, "app/layout.tsx")));
check("app/page.tsx exists", existsSync(join(root, "app/page.tsx")));
check("app/globals.css exists", existsSync(join(root, "app/globals.css")));

console.log("\n-- Config data --");
check("config/site.ts exists", existsSync(join(root, "config/site.ts")));
check("config/projects.ts exists", existsSync(join(root, "config/projects.ts")));
check("config/blog-sources.ts exists", existsSync(join(root, "config/blog-sources.ts")));
check("config/i18n.ts exists", existsSync(join(root, "config/i18n.ts")));

const siteContent = readFileSync(join(root, "config/site.ts"), "utf-8");
check("config/site.ts exports siteConfig", siteContent.includes("export const siteConfig"));
check("siteConfig has name", siteContent.includes("name:"));
check("siteConfig has tagline", siteContent.includes("tagline:"));
check("siteConfig has bio", siteContent.includes("bio:"));
check("siteConfig has skills", siteContent.includes("skills:"));
check("siteConfig has links", siteContent.includes("links:"));

const projectsContent = readFileSync(join(root, "config/projects.ts"), "utf-8");
check("config/projects.ts exports projects array", projectsContent.includes("export const projects"));

console.log("\n-- README --");
const readme = readFileSync(join(root, "README.md"), "utf-8");
check("README.md has Vercel deploy button", readme.includes("vercel.com/button"));

console.log("\n=== Done ===\n");
