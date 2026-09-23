import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand-block">
          <div className="brand">Herramientas<span>CR</span></div>
          <p>Calculadoras y guías claras para resolver consultas frecuentes en Costa Rica.</p>
        </div>
        <div className="footer-column"><strong>Explorar</strong><Link href="/#herramientas">Herramientas</Link><Link href="/guias">Guías</Link><Link href="/buscar">Buscar</Link><Link href="/acerca-de">Acerca de</Link></div>
        <div className="footer-column"><strong>Legal</strong><Link href="/privacidad">Privacidad</Link><Link href="/cookies">Cookies</Link><Link href="/terminos">Términos</Link><Link href="/contacto">Contacto</Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}.</span><span>Información orientativa · Costa Rica</span></div>
    </footer>
  );
}
