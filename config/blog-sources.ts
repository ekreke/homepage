export type BlogSource = "local" | "rss" | "api";

export interface BlogSourceConfig {
  type: BlogSource;
  endpoint?: string;
}

export const blogSources: BlogSourceConfig[] = [
  {
    type: "local",
  },
];
