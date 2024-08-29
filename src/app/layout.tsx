import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import MenuNavigation from "@/components/MenuNavigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { House } from "lucide-react";

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
          <header className="flex flex-row justify-between p-2">
            <Link href="/">
              <Button variant="outline" className="mr-2">
                <House size={"19px"} />
              </Button>
            </Link>
            <ThemeToggle />
          </header>
          {children}
          <div className="p-20">
            <MenuNavigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
