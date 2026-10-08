"use client";

import { getStyleComponents } from "@/lib/style-registry";
import { useLanguage } from "@/components/shared/LanguageProvider";
import "@/components/styles/dark-systems";

export default function Home() {
  const { t } = useLanguage();
  const components = getStyleComponents("dark-systems");

  if (!components) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">{t.common.loading}</p>
      </main>
    );
  }

  const {
    Navigation,
    HeroSection,
    AboutSection,
    ProjectsSection,
    BlogSection,
    Footer,
  } = components;

  return (
    <div className="min-h-screen bg-[#08090c] text-[#f2f4f7]">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
