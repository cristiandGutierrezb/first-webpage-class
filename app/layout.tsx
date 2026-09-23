import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi primera pagina web",
  description: "Bienvenidos a mi primer pagina web",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
