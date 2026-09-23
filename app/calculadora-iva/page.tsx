import type { Metadata } from "next";
import IvaCalculator from "./IvaCalculator";
import { ToolLayout } from "@/components/ToolLayout";
import { SourceList } from "@/components/SourceList";
import { Faq } from "@/components/Faq";
import { RelatedTools } from "@/components/RelatedTools";
import { officialSources } from "@/lib/site";

export const metadata: Metadata = { title: "Calculadora de IVA Costa Rica", description: "Calcula IVA en Costa Rica: agrega o extrae la tarifa general del 13%, tarifas reducidas o una tarifa personalizada.", alternates: { canonical: "/calculadora-iva" } };

export default function Page() {
  return <ToolLayout category="Impuestos" title="Calculadora de IVA Costa Rica" description="Agrega IVA a un precio o descubre cuánto impuesto está incluido en un monto final.">
    <section className="content-card calculator-card"><div className="card-heading"><div><span className="eyebrow">Impuestos</span><h2>Calcula o extrae el IVA</h2></div><span className="formula-pill">General 13%</span></div><IvaCalculator /></section>
    <article className="article content-card"><h2>Tarifa general y otras tarifas</h2><p>Hacienda publica una tarifa general del 13% y contempla otras tarifas para operaciones específicas. La calculadora permite seleccionar tasas comunes o escribir otra tasa, pero no determina la clasificación tributaria del producto o servicio.</p><Faq items={[{ question: "¿Cómo agrego 13% de IVA?", answer: "Multiplica la base por 0,13 y suma ese impuesto a la base." }, { question: "¿Cómo saco el IVA de un precio final?", answer: "Con 13%, divide el total entre 1,13. La diferencia entre el total y esa base es el IVA incluido." }, { question: "¿Todo paga 13%?", answer: "No. Existen otras tarifas, exenciones y operaciones no sujetas; la tarifa correcta depende de la operación." }]} /><SourceList sources={[{ label: "Ministerio de Hacienda · Información sobre tarifas del IVA", href: officialSources.haciendaIva }]} /><p className="last-updated">Revisado: septiembre de 2026.</p></article><RelatedTools exclude="/calculadora-iva" />
  </ToolLayout>;
}
