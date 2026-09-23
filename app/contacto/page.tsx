import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contacto", description: "Contacto para sugerencias, correcciones y consultas sobre HerramientasCR.", alternates: { canonical: "/contacto" } };

export default function Page() {
  return <div className="container page"><Breadcrumbs items={[{ label: "Contacto" }]} /><header className="page-title"><span className="badge">Contacto</span><h1>¿Encontraste algo que podamos mejorar?</h1><p className="lead">Recibimos sugerencias de nuevas herramientas, reportes de datos desactualizados y correcciones.</p></header><div className="contact-card content-card"><div><span className="eyebrow">Correo del proyecto</span><h2>{siteConfig.contactEmail}</h2><p>Escríbenos para sugerir herramientas, reportar información desactualizada o enviar correcciones.</p></div><a className="btn btn-primary" href={`mailto:${siteConfig.contactEmail}?subject=Contacto%20HerramientasCR`}>Enviar correo</a></div></div>;
}
