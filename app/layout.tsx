import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/shared/LanguageProvider";
import { StyleProvider } from "@/hooks/use-style";

export const metadata: Metadata = {
  title: "Ekreke — Backend Engineer",
  description:
    "Backend engineer specializing in Go, data-intensive systems, and developer tooling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <StyleProvider>{children}</StyleProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
