import { ComponentType } from "react";

export const supportedStyles = ["minimal", "card", "magazine", "dark-systems"] as const;

export type StyleName = (typeof supportedStyles)[number];

export const defaultStyle: StyleName = "dark-systems";

export const styleLabels: Record<StyleName, string> = {
  minimal: "Minimal",
  card: "Card",
  magazine: "Magazine",
  "dark-systems": "Dark Systems",
};

export interface StyleComponents {
  Navigation: ComponentType;
  HeroSection: ComponentType;
  AboutSection: ComponentType;
  BlogSection: ComponentType;
  ProjectsSection: ComponentType;
  Footer: ComponentType;
}

const registry = new Map<StyleName, StyleComponents>();

export function registerStyle(name: StyleName, components: StyleComponents): void {
  registry.set(name, components);
}

export function getStyleComponents(name: StyleName): StyleComponents | undefined {
  return registry.get(name);
}
