"use client";

import { useMemo, useState } from "react";
import { calculateVacationPay, type VacationMode } from "@/lib/calculations";
import { crc } from "@/lib/format";

export default function VacacionesCalculator() {
  const [salary, setSalary] = useState("");
  const [mode, setMode] = useState<VacationMode>("mensual");
  const result = useMemo(() => calculateVacationPay(Number(salary) || 0, mode), [salary, mode]);

  return (
    <div className="calculator">
      <div className="form-grid two-columns">
        <div className="field">
          <label htmlFor="vacation-mode">Modalidad de pago</label>
          <select id="vacation-mode" value={mode} onChange={(e) => setMode(e.target.value as VacationMode)}>
            <option value="mensual">Mensual o quincenal</option>
            <option value="semanal">Semanal · actividad no comercial</option>
            <option value="comercio">Semanal · actividad comercial</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="vacation-salary">{mode === "mensual" ? "Salario mensual de referencia" : "Salario semanal de referencia"}</label>
          <div className="input-prefix"><span>₡</span><input id="vacation-salary" type="number" min="0" step="1000" inputMode="decimal" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="0" /></div>
        </div>
      </div>
      <p className="helper">Esta herramienta estima el valor de los días de vacaciones según la modalidad de pago. La base salarial aplicable puede depender de tu situación laboral concreta.</p>
      <div className="result" aria-live="polite">
        <div><div className="result-label">Pago estimado de vacaciones</div><div className="result-value">{crc.format(result.payment)}</div></div>
        <div className="result-breakdown">
          <span>Días considerados <strong>{result.days}</strong></span>
          <span>Valor diario estimado <strong>{crc.format(result.daily)}</strong></span>
          <span>Fórmula <strong>{result.formula}</strong></span>
        </div>
      </div>
    </div>
  );
}
