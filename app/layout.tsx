import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsentManager } from "@/components/ConsentManager";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { AdSenseScript } from "@/components/AdSenseScript";
import { siteConfig } from "@/lib/site";

const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim();
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
const adsenseEnabled = process.env.NEXT_PUBLIC_ENABLE_ADSENSE === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "HerramientasCR | Calculadoras para Costa Rica", template: "%s | HerramientasCR" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "utilities",
  keywords: ["Costa Rica", "calculadoras", "aguinaldo", "salario neto", "IVA", "traspaso vehículo", "préstamos", "dólar colón"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "es_CR", url: siteConfig.url, siteName: siteConfig.name, title: "HerramientasCR | Calculadoras para Costa Rica", description: siteConfig.description },
  twitter: { card: "summary", title: siteConfig.name, description: siteConfig.description },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CR">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <ConsentManager />
        <GoogleAnalytics measurementId={gaId} />
        <AdSenseScript clientId={adsenseClient} enabled={adsenseEnabled} />
      </body>
    </html>
  );
}
