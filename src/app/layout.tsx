import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "./globals.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { cssResolver, theme } from "@/theme";
import { Header } from "@/components/header";
import { FooterSocial } from "@/components/footer";

export const metadata: Metadata = {
  title: "Ruffle - Flash Emulator",
  description:
    "Ruffle is a Flash Player emulator written in Rust. Ruffle targets both desktop and the web using WebAssembly.",
  applicationName: "Ruffle",
  creator: "Ruffle Contributors",
  icons: [
    { url: "/favicon-32.png", sizes: "32x32" },
    { url: "/favicon-64.png", sizes: "64x64" },
    { url: "/favicon-180.png", sizes: "180x180" },
  ],
  alternates: {
    types: {
      "application/atom+xml": [{ url: "/feed.xml", title: "Ruffle Blog" }],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        {/*<link rel="shortcut icon" href="/favicon.svg" />*/}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
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
