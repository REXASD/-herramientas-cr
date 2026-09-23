import type { Metadata } from "next";
import CurrencyCalculator from "./CurrencyCalculator";
import { ToolLayout } from "@/components/ToolLayout";
import { SourceList } from "@/components/SourceList";
import { Faq } from "@/components/Faq";
import { RelatedTools } from "@/components/RelatedTools";
import { officialSources } from "@/lib/site";

export const metadata: Metadata = { title: "Conversor Dólar a Colón Costa Rica", description: "Convierte dólares estadounidenses y colones costarricenses con el tipo de cambio que indiques.", alternates: { canonical: "/conversor-dolar-colon" } };

export default function Page() {
  return <ToolLayout category="Conversores" title="Conversor Dólar ↔ Colón" description="Convierte USD y CRC utilizando la tasa del BCCR, de tu banco o de otra referencia que quieras comparar.">
    <section className="content-card calculator-card"><div className="card-heading"><div><span className="eyebrow">Conversión</span><h2>USD ↔ CRC</h2></div></div><CurrencyCalculator /></section>
    <article className="article content-card"><h2>¿Por qué ingresas la tasa manualmente?</h2><p>El tipo de cambio varía y las entidades pueden aplicar tasas distintas para compra y venta. Al ingresar la tasa exacta que te interesa, el resultado corresponde a tu referencia y no a un dato posiblemente desactualizado.</p><Faq items={[{ question: "¿Qué tasa debo usar?", answer: "Depende de la operación. Puedes usar la referencia del BCCR o la tasa de compra/venta que aplique la entidad con la que vas a cambiar el dinero." }, { question: "¿La compra y la venta son iguales?", answer: "Normalmente no. Una entidad puede mostrar una tasa para comprar dólares y otra para venderlos." }]} /><SourceList sources={[{ label: "BCCR · Tipos de cambio", href: officialSources.bccrTipoCambio }]} /><p className="last-updated">Revisado: septiembre de 2026.</p></article><RelatedTools exclude="/conversor-dolar-colon" />
  </ToolLayout>;
}
