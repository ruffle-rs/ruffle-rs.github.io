import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { cssResolver, theme } from "@/theme";
import { Header } from "@/components/header";
import { FooterSocial } from "@/components/footer";

export const metadata: Metadata = {
  // TODO: This is the title we currently use... it's a bit long.
  title:
    "Ruffle is a Flash Player emulator written in Rust. Ruffle targets both desktop and the web using WebAssembly.",
  description:
    "Ruffle is a Flash Player emulator written in Rust. Ruffle targets both desktop and the web using WebAssembly.",
  icons: [
    { url: "/favicon-32.png", sizes: "32x32" },
    { url: "/favicon-64.png", sizes: "64x64" },
    { url: "/favicon-180.png", sizes: "180x180" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        {/*<link rel="shortcut icon" href="/favicon.svg" />*/}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://unpkg.com/@ruffle-rs/ruffle" />
      </head>
      <body>
        <MantineProvider theme={theme} cssVariablesResolver={cssResolver}>
          <Header />
          {children}
          <FooterSocial />
        </MantineProvider>
      </body>
    </html>
  );
}
