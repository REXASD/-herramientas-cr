"use client";

import { useMemo, useState } from "react";
import { calculateIva } from "@/lib/calculations";
import { crc } from "@/lib/format";

type Mode = "agregar" | "extraer";

export default function IvaCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("13");
  const [customRate, setCustomRate] = useState("");
  const [mode, setMode] = useState<Mode>("agregar");
  const activeRate = rate === "custom" ? Number(customRate) || 0 : Number(rate);
  const result = useMemo(() => calculateIva(Number(amount) || 0, activeRate, mode), [amount, activeRate, mode]);

  return (
    <div className="calculator">
      <div className="segmented" role="group" aria-label="Tipo de cálculo">
        <button type="button" className={mode === "agregar" ? "active" : ""} onClick={() => setMode("agregar")}>Agregar IVA</button>
        <button type="button" className={mode === "extraer" ? "active" : ""} onClick={() => setMode("extraer")}>Extraer IVA</button>
      </div>
      <div className="form-grid three-columns">
        <div className="field"><label htmlFor="iva-amount">{mode === "agregar" ? "Monto antes de IVA" : "Monto con IVA incluido"}</label><div className="input-prefix"><span>₡</span><input id="iva-amount" type="number" min="0" step="100" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" /></div></div>
        <div className="field"><label htmlFor="iva-rate">Tarifa</label><select id="iva-rate" value={rate} onChange={(e) => setRate(e.target.value)}><option value="13">13% · general</option><option value="4">4%</option><option value="2">2%</option><option value="1">1%</option><option value="0.5">0,5%</option><option value="custom">Otra tarifa</option></select></div>
        {rate === "custom" && <div className="field"><label htmlFor="custom-iva-rate">Tarifa personalizada</label><div className="input-suffix"><input id="custom-iva-rate" type="number" min="0" max="100" step="0.1" value={customRate} onChange={(e) => setCustomRate(e.target.value)} placeholder="0" /><span>%</span></div></div>}
      </div>
      <div className="result" aria-live="polite">
        <div><div className="result-label">{mode === "agregar" ? "Precio final" : "Monto antes de IVA"}</div><div className="result-value">{crc.format(mode === "agregar" ? result.total : result.base)}</div></div>
        <div className="result-breakdown"><span>Base <strong>{crc.format(result.base)}</strong></span><span>IVA ({activeRate.toLocaleString("es-CR")}%) <strong>{crc.format(result.tax)}</strong></span><span>Total <strong>{crc.format(result.total)}</strong></span></div>
      </div>
      <p className="helper">Seleccionar una tarifa no determina si legalmente aplica a un producto o servicio. Verifica la clasificación tributaria correspondiente.</p>
    </div>
  );
}
