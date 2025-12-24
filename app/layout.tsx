import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-white bg-gradient-to-b from-purple-900/15 via-black/90 to-black font-sans antialiased bg-fixed",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-900/5 via-black/80 to-blue-950/5 bg-fixed">
            
            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="container mx-auto max-w-7xl px-6 flex-grow flex flex-col gap-8">
              
              {/* Optional inner background glow effect */}
              <div className="fixed inset-0 pointer-events-none bg-gradient-to-tr from-purple-800/10 via-black/5 to-blue-400/5 rounded-xl bg-fixed"></div>

              {/* Page content */}
              <div className="relative z-10 flex flex-col gap-8">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
