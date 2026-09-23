import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { JsonLd } from "@/components/JsonLd";
import { AdSlot } from "@/components/AdSlot";
import { guides, siteConfig, tools } from "@/lib/site";

export default function Home() {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  const adsenseEnabled = process.env.NEXT_PUBLIC_ENABLE_ADSENSE === "true";
  const preview = process.env.NEXT_PUBLIC_SHOW_AD_PREVIEWS !== "false";
  const midSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_MID?.trim();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, inLanguage: "es-CR" }} />
      <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="badge">Herramientas para Costa Rica 🇨🇷</span><h1>Calcula rápido.<br /><span className="accent-text">Entiende el resultado.</span></h1><p className="lead">Calculadoras gratuitas y guías claras para trabajo, impuestos, finanzas, vehículos y conversiones. Sin registro.</p><div className="actions"><Link className="btn btn-primary" href="#herramientas">Ver herramientas</Link><Link className="btn btn-secondary" href="/guias">Leer guías</Link></div><div className="hero-proof" aria-label="Características del sitio"><span><strong>{tools.length}</strong> herramientas</span><span><strong>{guides.length}</strong> guías</span><span><strong>0</strong> registros</span></div></div><div className="hero-panel"><div className="hero-panel-header"><span className="live-dot" aria-hidden="true" /><span>Herramientas disponibles</span></div><div className="quick-list">{tools.slice(0, 5).map((tool) => <Link href={tool.href} key={tool.href} className="quick-item"><span className="quick-icon">{tool.icon}</span><span><strong>{tool.shortTitle}</strong><small>{tool.category}</small></span><span aria-hidden="true">→</span></Link>)}</div></div></div></section>
      <section className="section" id="herramientas"><div className="container"><div className="section-heading"><div><span className="eyebrow">Calculadoras</span><h2>Herramientas disponibles</h2></div><p>Diseñadas para darte una estimación rápida y explicarte qué se está calculando.</p></div><div className="tool-grid">{tools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}</div></div></section>
      <div className="container"><AdSlot label="Entre calculadoras y contenido informativo" clientId={adsenseClient} slotId={midSlot} enabled={adsenseEnabled} preview={preview} /></div>
      <section className="section section-alt"><div className="container trust-grid"><div className="trust-copy"><span className="eyebrow">Información verificable</span><h2>No queremos darte solo un número.</h2><p>En cálculos laborales, tributarios y registrales mostramos la metodología y enlazamos fuentes oficiales cuando corresponde.</p><Link href="/acerca-de" className="text-link">Cómo trabajamos →</Link></div><div className="trust-points"><div><span>01</span><strong>Fuentes oficiales</strong><p>MTSS, CCSS, Hacienda, Registro Nacional y BCCR cuando aplica.</p></div><div><span>02</span><strong>Privacidad simple</strong><p>Las calculadoras funcionan en el navegador y no requieren una cuenta.</p></div><div><span>03</span><strong>Diseño móvil</strong><p>Calcula desde teléfono, tableta o computadora.</p></div></div></div></section>
      <section className="section"><div className="container"><div className="section-heading"><div><span className="eyebrow">Aprende</span><h2>Guías rápidas</h2></div><Link href="/guias" className="text-link">Ver todas →</Link></div><div className="guide-grid">{guides.slice(0, 4).map((guide) => <Link className="guide-card" key={guide.href} href={guide.href}><span className="tag">{guide.category}</span><h3>{guide.title}</h3><p>{guide.description}</p><span className="tool-link">Leer guía →</span></Link>)}</div></div></section>
      <section className="cta-section"><div className="container cta-card"><div><span className="eyebrow">¿Falta una herramienta?</span><h2>Queremos construir lo que realmente sea útil.</h2></div><Link className="btn btn-light" href="/contacto">Enviar sugerencia</Link></div></section>
    </>
  );
}
