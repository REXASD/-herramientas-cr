import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <Link className="brand" href="/" aria-label="HerramientasCR - Inicio">Herramientas<span>CR</span></Link>
        <nav className="navlinks" aria-label="Navegación principal"><Link href="/#herramientas">Herramientas</Link><Link href="/guias">Guías</Link><Link href="/buscar">Buscar</Link><Link href="/acerca-de">Acerca de</Link><Link href="/contacto">Contacto</Link></nav>
        <details className="mobile-menu"><summary aria-label="Abrir menú">Menú</summary><div className="mobile-menu-panel"><Link href="/#herramientas">Herramientas</Link><Link href="/guias">Guías</Link><Link href="/buscar">Buscar</Link><Link href="/acerca-de">Acerca de</Link><Link href="/contacto">Contacto</Link></div></details>
      </div>
    </header>
  );
}
