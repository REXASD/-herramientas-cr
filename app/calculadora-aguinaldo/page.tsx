import type { Metadata } from "next";
import AguinaldoCalculator from "./AguinaldoCalculator";
import { ToolLayout } from "@/components/ToolLayout";
import { SourceList } from "@/components/SourceList";
import { Faq } from "@/components/Faq";
import { RelatedTools } from "@/components/RelatedTools";
import { JsonLd } from "@/components/JsonLd";
import { officialSources, siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Calculadora de Aguinaldo Costa Rica 2026", description: "Calcula tu aguinaldo en Costa Rica sumando los salarios recibidos entre diciembre y noviembre.", alternates: { canonical: "/calculadora-aguinaldo" } };

const faq = [
  { question: "¿Cómo se calcula el aguinaldo en Costa Rica?", answer: "Se suman los salarios ordinarios y extraordinarios recibidos entre el 1 de diciembre del año anterior y el 30 de noviembre del año actual y el total se divide entre 12." },
  { question: "¿Debo haber trabajado todo el año?", answer: "No. Si trabajaste solo parte del período, se suman únicamente los salarios devengados y el total igualmente se divide entre 12." },
  { question: "¿Esta calculadora guarda mis salarios?", answer: "No. Los valores se procesan localmente en tu navegador y no se envían a una cuenta del sitio." },
];

export default function Page() {
  return <ToolLayout category="Trabajo" title="Calculadora de Aguinaldo Costa Rica" description="Ingresa los salarios del 1 de diciembre al 30 de noviembre y obtén una estimación inmediata de tu aguinaldo.">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Calculadora de Aguinaldo Costa Rica", url: `${siteConfig.url}/calculadora-aguinaldo`, applicationCategory: "FinanceApplication", operatingSystem: "Web", inLanguage: "es-CR", offers: { "@type": "Offer", price: "0", priceCurrency: "CRC" } }} />
    <section className="content-card calculator-card"><div className="card-heading"><div><span className="eyebrow">Cálculo</span><h2>Salarios del período</h2></div><span className="formula-pill">Total ÷ 12</span></div><AguinaldoCalculator /></section>
    <article className="article content-card"><h2>Cómo funciona</h2><p>La fórmula oficial de referencia suma los salarios ordinarios y extraordinarios devengados durante el período aplicable y divide el total entre doce.</p><Faq items={faq} /><SourceList sources={[{ label: "MTSS · Aguinaldo", href: officialSources.mtssAguinaldo }, { label: "MTSS · Preguntas frecuentes de aguinaldo", href: officialSources.mtssAguinaldoFaq }]} /><p className="last-updated">Revisado: septiembre de 2026.</p></article><RelatedTools exclude="/calculadora-aguinaldo" />
  </ToolLayout>;
}
