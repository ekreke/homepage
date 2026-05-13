import { ComponentType } from "react";

export interface BlogTemplateProps {
  title: string;
  date: string;
  content: string;
  tags: string[];
  coverImage: string;
  originalUrl: string;
  backLabel: string;
}

export type BlogTemplate = ComponentType<BlogTemplateProps>;

interface TemplateEntry {
  match: (slug: string, tags: string[]) => boolean;
  template: BlogTemplate;
}

const templates: TemplateEntry[] = [];

export function registerBlogTemplate(
  match: (slug: string, tags: string[]) => boolean,
  template: BlogTemplate
): void {
  templates.push({ match, template });
}

export function getTemplate(slug: string, tags: string[]): BlogTemplate | null {
  const entry = templates.find((t) => t.match(slug, tags));
  return entry?.template ?? null;
}
