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
    title: "EcoShop - Sustainable E-commerce",
    description:
      "A complete e-commerce platform focused on sustainable products with advanced filtering and recommendation systems.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?w=800",
  },
  {
    title: "HealthTracker Mobile App",
    description:
      "Cross-platform mobile app for tracking health metrics with AI-powered insights and personalized recommendations.",
    tags: ["React Native", "Firebase", "AI/ML", "HealthKit"],
    image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=800",
  },
  {
    title: "Analytics Dashboard Pro",
    description:
      "Modern analytics dashboard with real-time data visualization and customizable widgets for business intelligence.",
    tags: ["Vue.js", "D3.js", "WebSocket", "MongoDB"],
    image: "https://images.unsplash.com/photo-1554098415-788601c80aef?w=800",
  },
];
