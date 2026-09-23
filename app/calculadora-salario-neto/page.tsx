import type { Metadata } from "next";
import SalarioNetoCalculator from "./SalarioNetoCalculator";
import { ToolLayout } from "@/components/ToolLayout";
import { SourceList } from "@/components/SourceList";
import { Faq } from "@/components/Faq";
import { RelatedTools } from "@/components/RelatedTools";
import { officialSources } from "@/lib/site";

export const metadata: Metadata = { title: "Calculadora de Salario Neto Costa Rica 2026", description: "Estima tu salario neto mensual en Costa Rica con cargas obreras 2026 e impuesto sobre salarios.", alternates: { canonical: "/calculadora-salario-neto" } };

export default function Page() {
  return <ToolLayout category="Trabajo" title="Calculadora de Salario Neto 2026" description="Estima cuánto recibirías después de cargas obreras e impuesto sobre salarios usando parámetros oficiales de 2026.">
    <section className="content-card calculator-card"><div className="card-heading"><div><span className="eyebrow">Cálculo 2026</span><h2>De salario bruto a neto</h2></div><span className="formula-pill">Carga obrera 10,83%</span></div><SalarioNetoCalculator /></section>
    <div className="notice"><strong>Estimación:</strong> la CCSS muestra para 2026 un total de 10,83% a cargo de la persona trabajadora en su calculadora patronal.</div>
    <article className="article content-card"><h2>Impuesto sobre salarios 2026</h2><p>La herramienta aplica progresivamente los tramos publicados por Hacienda: hasta ₡918.000 exento; 10% sobre el exceso hasta ₡1.347.000; 15% hasta ₡2.364.000; 20% hasta ₡4.727.000 y 25% sobre el exceso de ese monto.</p><Faq items={[{ question: "¿Incluye asociación solidarista o préstamos?", answer: "No. Solo estima cargas obreras generales e impuesto sobre salarios." }, { question: "¿Aplica créditos fiscales?", answer: "Puedes indicar hijos y cónyuge para estimar los créditos mensuales publicados por Hacienda para 2026, siempre que cumplas los requisitos legales." }]} /><SourceList sources={[{ label: "CCSS · Calculadora patronal y cargas sociales", href: officialSources.ccssPatronos }, { label: "Ministerio de Hacienda · Tramos de renta 2026", href: officialSources.haciendaRenta2026 }]} /><p className="last-updated">Revisado: septiembre de 2026.</p></article><RelatedTools exclude="/calculadora-salario-neto" />
  </ToolLayout>;
}
