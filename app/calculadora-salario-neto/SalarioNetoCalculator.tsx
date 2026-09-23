"use client";

import { useMemo, useState } from "react";
import { calculateNetSalary2026, CUOTA_OBRERA_2026 } from "@/lib/calculations";
import { crc } from "@/lib/format";

export default function SalarioNetoCalculator() {
  const [salary, setSalary] = useState("");
  const [children, setChildren] = useState("0");
  const [spouse, setSpouse] = useState(false);
  const result = useMemo(() => calculateNetSalary2026(Number(salary) || 0, Number(children) || 0, spouse), [salary, children, spouse]);

  return (
    <div className="calculator">
      <div className="form-grid three-columns">
        <div className="field"><label htmlFor="gross-salary">Salario bruto mensual</label><div className="input-prefix"><span>₡</span><input id="gross-salary" type="number" min="0" step="1000" inputMode="decimal" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="0" /></div></div>
        <div className="field"><label htmlFor="children-credit">Hijos con crédito fiscal</label><input id="children-credit" type="number" min="0" max="20" step="1" value={children} onChange={(e) => setChildren(e.target.value)} /></div>
        <div className="field checkbox-field"><label><input type="checkbox" checked={spouse} onChange={(e) => setSpouse(e.target.checked)} /> Aplicar crédito por cónyuge</label></div>
      </div>
      <div className="result" aria-live="polite">
        <div><div className="result-label">Salario neto estimado</div><div className="result-value">{crc.format(result.net)}</div></div>
        <div className="result-breakdown">
          <span>Salario bruto <strong>{crc.format(result.gross)}</strong></span>
          <span>Cargas obreras 2026 ({(CUOTA_OBRERA_2026 * 100).toLocaleString("es-CR", { maximumFractionDigits: 2 })}%) <strong>− {crc.format(result.socialSecurity)}</strong></span>
          <span>Renta antes de créditos <strong>{crc.format(result.incomeTaxBeforeCredits)}</strong></span>
          {result.taxCredits > 0 && <span>Créditos fiscales <strong>− {crc.format(result.taxCredits)}</strong></span>}
          <span>Impuesto retenido estimado <strong>− {crc.format(result.incomeTax)}</strong></span>
        </div>
      </div>
      <p className="helper">No incluye deducciones personales como préstamos, asociación solidarista, embargos, pensiones, seguros u otros descuentos de planilla.</p>
    </div>
  );
}
