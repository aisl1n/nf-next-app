import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import MenuNavigation from "@/components/MenuNavigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ComprasAPP",
  description: "App gerenciador de compras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="flex flex-row justify-end p-2">
            <ThemeToggle />
          </header>
          {children}
          <MenuNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
