"use client";

import { useMemo, useState } from "react";
import { convertCurrency } from "@/lib/calculations";
import { crc, usd } from "@/lib/format";

type Direction = "usd-crc" | "crc-usd";

export default function CurrencyCalculator() {
  const [direction, setDirection] = useState<Direction>("usd-crc");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const result = useMemo(() => convertCurrency(Number(amount) || 0, Number(rate) || 0, direction), [direction, amount, rate]);

  function swap() {
    setDirection((current) => current === "usd-crc" ? "crc-usd" : "usd-crc");
    setAmount("");
  }

  return (
    <div className="calculator">
      <div className="currency-switch">
        <div><span className="currency-code">{direction === "usd-crc" ? "USD" : "CRC"}</span><span>{direction === "usd-crc" ? "Dólares" : "Colones"}</span></div>
        <button className="swap-button" type="button" onClick={swap} aria-label="Cambiar sentido de conversión">⇄</button>
        <div><span className="currency-code">{direction === "usd-crc" ? "CRC" : "USD"}</span><span>{direction === "usd-crc" ? "Colones" : "Dólares"}</span></div>
      </div>
      <div className="form-grid two-columns">
        <div className="field"><label htmlFor="currency-amount">Monto en {direction === "usd-crc" ? "USD" : "CRC"}</label><input id="currency-amount" type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" /></div>
        <div className="field"><label htmlFor="exchange-rate">Tipo de cambio (₡ por $1)</label><div className="input-prefix"><span>₡</span><input id="exchange-rate" type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Ej. 500" /></div></div>
      </div>
      <p className="helper">Ingresa la tasa del BCCR o la tasa efectiva de compra/venta de tu entidad financiera. No fijamos una tasa automática para evitar mostrar un valor desactualizado.</p>
      <div className="result" aria-live="polite">
        <div><div className="result-label">Resultado</div><div className="result-value">{direction === "usd-crc" ? crc.format(result.converted) : usd.format(result.converted)}</div></div>
        <div className="result-breakdown"><span>Monto original <strong>{direction === "usd-crc" ? usd.format(result.amount) : crc.format(result.amount)}</strong></span><span>Tipo de cambio <strong>₡{result.rate.toLocaleString("es-CR", { maximumFractionDigits: 2 })}</strong></span></div>
      </div>
    </div>
  );
}
