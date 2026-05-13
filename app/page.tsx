"use client";

import { useStyle } from "@/hooks/use-style";
import { getStyleComponents, defaultStyle } from "@/lib/style-registry";
import { useLanguage } from "@/components/shared/LanguageProvider";

export default function Home() {
  const { style } = useStyle();
  const { t } = useLanguage();
  const components = getStyleComponents(style) ?? getStyleComponents(defaultStyle);

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
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
