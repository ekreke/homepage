export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    title: "TokCat",
    description:
      "A desktop companion for AI coding agents that visualizes local token-consumption rates, offers agent chat through ACP, and supports multiple local data sources without uploading usage data.",
    tags: ["Swift", "SwiftUI", "ACP", "Windows"],
    image: "/images/projects/tokcat.svg",
    githubUrl: "https://github.com/ekreke/TokCat",
  },
  {
    title: "gobase",
    description:
      "A reusable Go utility library with focused packages for collections, strings, maps, formatting, and operating-system helpers.",
    tags: ["Go", "Libraries", "Testing"],
    image: "/images/projects/gobase.svg",
    githubUrl: "https://github.com/ekreke/gobase",
  },
  {
    title: "pi-extensions",
    description:
      "Personal extensions for the Pi coding agent, packaged for direct installation and focused on making day-to-day agent workflows more pleasant.",
    tags: ["TypeScript", "AI Agents", "Developer Experience"],
    image: "/images/projects/pi-extensions.svg",
    githubUrl: "https://github.com/ekreke/pi-extensions",
  },
];
