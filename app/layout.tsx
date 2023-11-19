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
  const title = "Restaurantes, Cafés y Bares en Playas Tijuana";
  const description =
    "Qué comer en Playas de Tijuana? Descubre los mejores Restaurantes, Cafés y Bares. La mejor comida de Tijuana se cocina en Playas de Tijuana.";

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/webp" href="/favicon.webp" />
        <link rel="apple-touch-icon" type="image/webp" href="/favicon.webp" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://www.playami.com/banner.webp"
        />
        <meta property="og:url" content="https://www.playami.com/" />
        <meta name="description" content={description} />
        <link href="https://www.google-analytics.com" rel="dns-prefetch" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
