import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { BlogSection } from "./BlogSection";
import { ProjectsSection } from "./ProjectsSection";
import { Footer } from "./Footer";
import { registerStyle } from "@/lib/style-registry";

export { Navigation, HeroSection, AboutSection, BlogSection, ProjectsSection, Footer };

registerStyle("card", {
  Navigation,
  HeroSection,
  AboutSection,
  BlogSection,
  ProjectsSection,
  Footer,
});
