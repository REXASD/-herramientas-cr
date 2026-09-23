import type { Metadata } from "next";
import VacacionesCalculator from "./VacacionesCalculator";
import { ToolLayout } from "@/components/ToolLayout";
import { SourceList } from "@/components/SourceList";
import { Faq } from "@/components/Faq";
import { RelatedTools } from "@/components/RelatedTools";
import { officialSources } from "@/lib/site";

export const metadata: Metadata = { title: "Calculadora de Vacaciones Costa Rica", description: "Estima el pago de vacaciones en Costa Rica según modalidad mensual, quincenal o semanal.", alternates: { canonical: "/calculadora-vacaciones" } };

export default function Page() {
  return <ToolLayout category="Trabajo" title="Calculadora de Vacaciones Costa Rica" description="Estima el valor de los días de vacaciones según la modalidad de pago utilizada.">
    <section className="content-card calculator-card"><div className="card-heading"><div><span className="eyebrow">Cálculo</span><h2>Pago de vacaciones</h2></div></div><VacacionesCalculator /></section>
    <div className="notice"><strong>Referencia:</strong> el MTSS explica que el mínimo general es de dos semanas de vacaciones por cada 50 semanas de labores continuas para el mismo empleador.</div>
    <article className="article content-card"><h2>Fórmulas de referencia</h2><ul><li>Pago mensual o quincenal: salario mensual ÷ 30 × 14.</li><li>Pago semanal en actividad no comercial: salario semanal ÷ 6 × 12.</li><li>Pago semanal en actividad comercial: salario semanal ÷ 7 × 14.</li></ul><Faq items={[{ question: "¿Por qué unas modalidades usan 12 días y otras 14?", answer: "El MTSS distingue si el día de descanso semanal ya está incluido en la modalidad de pago." }, { question: "¿El resultado siempre coincide con una liquidación?", answer: "No necesariamente. La base salarial y las circunstancias concretas del contrato pueden requerir una revisión adicional." }]} /><SourceList sources={[{ label: "MTSS · Asuntos laborales · Vacaciones", href: officialSources.mtssLaboral }]} /><p className="last-updated">Revisado: septiembre de 2026.</p></article><RelatedTools exclude="/calculadora-vacaciones" />
  </ToolLayout>;
}
