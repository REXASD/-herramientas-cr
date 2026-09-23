"use client";

import { useMemo, useState } from "react";
import { calculateVehicleTransfer } from "@/lib/calculations";
import { crc } from "@/lib/format";

export default function TraspasoCalculator() {
  const [contractValue, setContractValue] = useState("");
  const [fiscalValue, setFiscalValue] = useState("");
  const [fiscalStamp, setFiscalStamp] = useState("");
  const [otherCosts, setOtherCosts] = useState("");
  const result = useMemo(() => calculateVehicleTransfer(Number(contractValue) || 0, Number(fiscalValue) || 0, Number(fiscalStamp) || 0, Number(otherCosts) || 0), [contractValue, fiscalValue, fiscalStamp, otherCosts]);

  return (
    <div className="calculator">
      <div className="form-grid two-columns">
        <div className="field"><label htmlFor="contract-value">Valor de compraventa</label><div className="input-prefix"><span>₡</span><input id="contract-value" type="number" min="0" step="10000" value={contractValue} onChange={(e) => setContractValue(e.target.value)} placeholder="0" /></div></div>
        <div className="field"><label htmlFor="fiscal-value">Valor fiscal</label><div className="input-prefix"><span>₡</span><input id="fiscal-value" type="number" min="0" step="10000" value={fiscalValue} onChange={(e) => setFiscalValue(e.target.value)} placeholder="0" /></div></div>
        <div className="field"><label htmlFor="fiscal-stamp">Timbre fiscal (si ya conoces el monto)</label><div className="input-prefix"><span>₡</span><input id="fiscal-stamp" type="number" min="0" step="1" value={fiscalStamp} onChange={(e) => setFiscalStamp(e.target.value)} placeholder="0" /></div></div>
        <div className="field"><label htmlFor="other-costs">Honorarios y otros costos</label><div className="input-prefix"><span>₡</span><input id="other-costs" type="number" min="0" step="1000" value={otherCosts} onChange={(e) => setOtherCosts(e.target.value)} placeholder="0" /></div></div>
      </div>
      <p className="helper">La base utilizada es el monto mayor entre compraventa y valor fiscal. El timbre fiscal y los honorarios se dejan como entrada manual porque pueden depender del acto y del profesional.</p>
      <div className="result result-large" aria-live="polite">
        <div><div className="result-label">Estimación total</div><div className="result-value">{crc.format(result.total)}</div><div className="small">Base imponible usada: {crc.format(result.base)}</div></div>
        <div className="result-breakdown detailed">
          <span>Impuesto de traspaso · 2,5% <strong>{crc.format(result.transferTax)}</strong></span>
          <span>Registro Nacional · ₡5/₡1.000 o fracción <strong>{crc.format(result.registry)}</strong></span>
          <span>Timbre agrario · ₡3/₡1.000 o fracción <strong>{crc.format(result.agrarianStamp)}</strong></span>
          <span>Timbre Colegio de Abogados <strong>{crc.format(result.lawyersStamp)}</strong></span>
          <span>Parques Nacionales <strong>{crc.format(result.parksStamp)}</strong></span>
          <span>Cruz Roja <strong>{crc.format(result.redCrossStamp)}</strong></span>
          <span>Archivo Nacional <strong>{crc.format(result.archiveStamp)}</strong></span>
          <span>Subtotal automático <strong>{crc.format(result.automaticSubtotal)}</strong></span>
          <span>Timbre fiscal ingresado <strong>{crc.format(result.fiscalStamp)}</strong></span>
          <span>Honorarios / otros ingresados <strong>{crc.format(result.notaryAndOther)}</strong></span>
        </div>
      </div>
      <p className="helper warning-text">Es una estimación orientativa, no una cotización notarial. Confirma el monto definitivo con el Registro Nacional y el notario que formalice el traspaso.</p>
    </div>
  );
}
