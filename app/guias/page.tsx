import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { guides } from "@/lib/site";

export const metadata: Metadata = { title: "Guías", description: "Guías claras sobre cálculos laborales, impuestos, finanzas, vehículos y tipo de cambio en Costa Rica.", alternates: { canonical: "/guias" } };

export default function Page() {
  return <div className="container page"><Breadcrumbs items={[{ label: "Guías" }]} /><header className="page-title"><span className="badge">Contenido</span><h1>Guías para entender tus cálculos</h1><p className="lead">Explicaciones breves, ejemplos y enlaces oficiales para que el resultado de una calculadora tenga contexto.</p></header><div className="guide-list">{guides.map((guide) => <Link href={guide.href} className="guide-list-item" key={guide.href}><div><span className="tag">{guide.category}</span><h2>{guide.title}</h2><p>{guide.description}</p></div><div className="guide-meta"><span>{guide.minutes} min</span><span aria-hidden="true">→</span></div></Link>)}</div></div>;
}
