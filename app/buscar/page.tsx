import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchClient } from "@/components/SearchClient";

export const metadata: Metadata = { title: "Buscar", description: "Busca calculadoras y guías de HerramientasCR.", alternates: { canonical: "/buscar" } };

export default function Page() {
  return <div className="container page"><Breadcrumbs items={[{ label: "Buscar" }]} /><header className="page-title"><span className="badge">Buscador</span><h1>Encuentra una herramienta o guía</h1><p className="lead">Busca por tema, cálculo o palabra clave.</p></header><SearchClient /></div>;
}
