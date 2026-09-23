import type { Metadata } from "next";
import TraspasoCalculator from "./TraspasoCalculator";
import { ToolLayout } from "@/components/ToolLayout";
import { SourceList } from "@/components/SourceList";
import { Faq } from "@/components/Faq";
import { RelatedTools } from "@/components/RelatedTools";
import { officialSources } from "@/lib/site";

export const metadata: Metadata = { title: "Calculadora de Traspaso de Vehículo Costa Rica", description: "Estima impuesto de traspaso y principales timbres registrales de un vehículo en Costa Rica.", alternates: { canonical: "/traspaso-vehiculo" } };

export default function Page() {
  return <ToolLayout category="Vehículos" title="Estimador de Traspaso de Vehículo" description="Calcula los principales rubros registrales sobre el mayor valor entre el precio declarado y el valor fiscal.">
    <section className="content-card calculator-card"><div className="card-heading"><div><span className="eyebrow">Vehículos</span><h2>Estima los costos de traspaso</h2></div><span className="formula-pill">Impuesto 2,5%</span></div><TraspasoCalculator /></section>
    <article className="article content-card"><h2>Qué incluye automáticamente</h2><p>La herramienta estima impuesto de traspaso, arancel del Registro Nacional, timbre agrario, Colegio de Abogados, Parques Nacionales, Archivo Nacional y Cruz Roja según la información publicada por el Registro Nacional. El timbre fiscal, honorarios notariales y otros costos se dejan como campos manuales para no presentar una cifra incompleta como exacta.</p><Faq items={[{ question: "¿Sobre qué valor se calcula?", answer: "Se usa como base el monto mayor entre el valor declarado y el valor fiscal ingresado." }, { question: "¿Es una cotización oficial?", answer: "No. Es una estimación orientativa. El monto definitivo debe confirmarse al formalizar el acto." }]} /><SourceList sources={[{ label: "Registro Nacional · Aranceles de Bienes Muebles", href: officialSources.registroAranceles }]} /><p className="last-updated">Revisado: septiembre de 2026.</p></article><RelatedTools exclude="/traspaso-vehiculo" />
  </ToolLayout>;
}
