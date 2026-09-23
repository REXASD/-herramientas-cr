import type { Metadata } from "next";
import PrestamoCalculator from "./PrestamoCalculator";
import { ToolLayout } from "@/components/ToolLayout";
import { Faq } from "@/components/Faq";
import { RelatedTools } from "@/components/RelatedTools";

export const metadata: Metadata = { title: "Calculadora de Préstamos", description: "Calcula cuota mensual, intereses, total pagado y amortización según monto, tasa anual y plazo.", alternates: { canonical: "/calculadora-prestamo" } };

export default function Page() {
  return <ToolLayout category="Finanzas" title="Calculadora de Préstamos" description="Simula una cuota mensual nivelada y revisa cómo se distribuyen capital e intereses a lo largo del plazo.">
    <section className="content-card calculator-card"><div className="card-heading"><div><span className="eyebrow">Finanzas</span><h2>Simula tu crédito</h2></div></div><PrestamoCalculator /></section>
    <article className="article content-card"><h2>Qué significa esta simulación</h2><p>Se utiliza un modelo de cuota nivelada con tasa fija. Sirve para comparar escenarios, pero una oferta real puede incorporar seguros, comisiones, gastos administrativos, tasas variables u otros cargos.</p><Faq items={[{ question: "¿Una tasa de 0% funciona?", answer: "Sí. En ese caso el principal se divide de forma uniforme entre el número de meses." }, { question: "¿La tabla de amortización es exacta para cualquier banco?", answer: "No. Es una simulación matemática; cada producto financiero puede usar condiciones y cargos distintos." }]} /></article><RelatedTools exclude="/calculadora-prestamo" />
  </ToolLayout>;
}
