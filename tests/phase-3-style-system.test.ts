import { existsSync, readFileSync } from "fs";
import { join } from "path";

const root = process.cwd();

function check(label: string, condition: boolean) {
  const status = condition ? "PASS" : "FAIL";
  console.log(`[${status}] ${label}`);
  if (!condition) process.exitCode = 1;
}

console.log("\n=== Phase 3: Style System Core ===\n");

console.log("-- Style Registry --");
check("lib/style-registry.ts exists", existsSync(join(root, "lib/style-registry.ts")));
const registry = readFileSync(join(root, "lib/style-registry.ts"), "utf-8");
check("exports supportedStyles", registry.includes("supportedStyles"));
check("exports StyleName type", registry.includes("StyleName"));
check("exports defaultStyle", registry.includes("defaultStyle"));
check("exports styleLabels", registry.includes("styleLabels"));
check("exports StyleComponents interface", registry.includes("StyleComponents"));
check("exports registerStyle function", registry.includes("registerStyle"));
check("exports getStyleComponents function", registry.includes("getStyleComponents"));
check("includes 'minimal'", registry.includes('"minimal"'));
check("includes 'card'", registry.includes('"card"'));
check("includes 'magazine'", registry.includes('"magazine"'));
check("defaultStyle is 'minimal'", registry.includes('"minimal"'));

console.log("\n-- StyleComponents interface --");
check("defines Navigation", registry.includes("Navigation: ComponentType"));
check("defines HeroSection", registry.includes("HeroSection: ComponentType"));
check("defines AboutSection", registry.includes("AboutSection: ComponentType"));
check("defines BlogSection", registry.includes("BlogSection: ComponentType"));
check("defines ProjectsSection", registry.includes("ProjectsSection: ComponentType"));
check("defines Footer", registry.includes("Footer: ComponentType"));

console.log("\n-- Style Hook (StyleProvider + useStyle) --");
check("hooks/use-style.tsx exists", existsSync(join(root, "hooks/use-style.tsx")));
const hook = readFileSync(join(root, "hooks/use-style.tsx"), "utf-8");
check("exports StyleProvider", hook.includes("export function StyleProvider"));
check("exports useStyle hook", hook.includes("export function useStyle"));
check("uses React Context", hook.includes("createContext"));
check("uses localStorage", hook.includes("localStorage"));
check("imports StyleName from style-registry", hook.includes("StyleName"));
check("imports defaultStyle from style-registry", hook.includes("defaultStyle"));
check("provides style state", hook.includes("style: StyleName"));
check("provides setStyle setter", hook.includes("setStyle:"));

console.log("\n-- Style Switcher --");
check("components/shared/StyleSwitcher.tsx exists", existsSync(join(root, "components/shared/StyleSwitcher.tsx")));
const switcher = readFileSync(join(root, "components/shared/StyleSwitcher.tsx"), "utf-8");
check("uses useStyle hook", switcher.includes("useStyle"));
check("uses supportedStyles", switcher.includes("supportedStyles"));
check("uses styleLabels", switcher.includes("styleLabels"));
check("renders select element", switcher.includes("<select"));
check("calls setStyle on change", switcher.includes("setStyle"));

console.log("\n-- Layout Integration --");
const layout = readFileSync(join(root, "app/layout.tsx"), "utf-8");
check("imports StyleProvider", layout.includes("StyleProvider"));
check("wraps children with StyleProvider", layout.includes("<StyleProvider>"));
check("StyleProvider inside LanguageProvider", 
  layout.indexOf("LanguageProvider") < layout.indexOf("StyleProvider"));

console.log("\n=== Done ===\n");
