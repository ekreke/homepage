import fs from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..");

function read(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const site = read("config/site.ts");
const projects = read("config/projects.ts");
const layout = read("app/layout.tsx");
const homepage = read("app/page.tsx");
const darkSystems = read("components/styles/dark-systems/index.ts");

assert(site.includes('name: "Ekreke"'), "site identity must use Ekreke");
assert(site.includes("PostgreSQL") && site.includes("ClickHouse"), "site skills must include backend data systems");
assert(site.includes("https://github.com/ekreke"), "site CTA must lead to the GitHub profile");
assert(layout.includes("Ekreke — Backend Engineer"), "metadata must describe the career landing page");
assert(homepage.includes('getStyleComponents("dark-systems")'), "homepage must use the selected Dark Systems direction");
assert(darkSystems.includes('registerStyle("dark-systems"'), "Dark Systems must be registered as a complete style");

for (const navigation of [
  "components/styles/minimal/Navigation.tsx",
  "components/styles/card/Navigation.tsx",
  "components/styles/magazine/Navigation.tsx",
]) {
  assert(read(navigation).includes('href: "/chatgpt"'), `${navigation} must link to the available chat page`);
}

for (const project of ["TokCat", "gobase", "pi-extensions"]) {
  assert(projects.includes(`title: "${project}"`), `projects must include ${project}`);
  assert(projects.includes(`https://github.com/ekreke/${project}`), `${project} must link to its GitHub repository`);
}

for (const image of ["tokcat.svg", "gobase.svg", "pi-extensions.svg"]) {
  assert(projects.includes(`/images/projects/${image}`), `${image} must be a local project cover`);
  assert(fs.existsSync(path.join(root, "public/images/projects", image)), `${image} must exist`);
}

for (const locale of ["en", "zh", "zh-TW", "de"]) {
  const translations = read(`i18n/${locale}.json`);
  assert(translations.includes('"description"'), `${locale} must include the hero description`);
  assert(translations.includes('"site"'), `${locale} must include localized career content`);
  assert(translations.includes("Ekreke"), `${locale} must use the current site identity`);
  assert(translations.includes('"darkSystems"'), `${locale} must include Dark Systems copy`);
}

for (const projectSection of [
  "components/styles/minimal/ProjectsSection.tsx",
  "components/styles/card/ProjectsSection.tsx",
  "components/styles/magazine/ProjectsSection.tsx",
]) {
  assert(read(projectSection).includes("project.githubUrl"), `${projectSection} must link project cards to GitHub`);
}

console.log("Phase 12 career landing content checks passed.");
