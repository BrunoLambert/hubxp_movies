import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import HubXPAppProvider from "./providers/hubxpapp-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HubXP - Filmes",
  description: "A melhor seleção de filmes que você só achar por aqui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-4 md:px-0`}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <HubXPAppProvider>
            {children}
          </HubXPAppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
