import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurantes, Cafés y Bares en Playas Tijuana",
  description:
    "Qué comer en Playas de Tijuana? Descubre los mejores Restaurantes, Cafés y Bares. La mejor comida de Tijuana se cocina en Playas de Tijuana.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
