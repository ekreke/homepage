import { ComponentType } from "react";

export const supportedStyles = ["minimal", "card", "magazine"] as const;

export type StyleName = (typeof supportedStyles)[number];

export const defaultStyle: StyleName = "minimal";

export const styleLabels: Record<StyleName, string> = {
  minimal: "Minimal",
  card: "Card",
  magazine: "Magazine",
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
