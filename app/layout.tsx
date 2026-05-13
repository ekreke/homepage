import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/shared/LanguageProvider";
import { StyleProvider } from "@/hooks/use-style";

export const metadata: Metadata = {
  title: "Personal Homepage",
  description: "Personal homepage with switchable styles",
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
