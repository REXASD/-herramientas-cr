"use client";

import { useMemo, useState } from "react";
import { calculateAguinaldo } from "@/lib/calculations";
import { crc } from "@/lib/format";

const months = ["Diciembre", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"];

export default function AguinaldoCalculator() {
  const [salaries, setSalaries] = useState<string[]>(Array(12).fill(""));
  const parsed = useMemo(() => salaries.map((value) => Math.max(0, Number(value) || 0)), [salaries]);
  const result = useMemo(() => calculateAguinaldo(parsed), [parsed]);
  const monthsWithSalary = parsed.filter((value) => value > 0).length;

  function update(index: number, value: string) {
    if (value !== "" && Number(value) < 0) return;
    setSalaries((current) => current.map((item, i) => i === index ? value : item));
  }

  return (
    <div className="calculator">
      <div className="form-grid months-grid">
        {months.map((month, index) => (
          <div className="field" key={month}>
            <label htmlFor={`salary-${index}`}>{month}</label>
            <div className="input-prefix">
              <span>₡</span>
              <input id={`salary-${index}`} type="number" min="0" step="1000" inputMode="decimal" placeholder="0" value={salaries[index]} onChange={(event) => update(index, event.target.value)} />
            </div>
          </div>
        ))}
      </div>
      <div className="calculator-actions">
        <button className="btn btn-secondary" type="button" onClick={() => setSalaries(Array(12).fill(""))}>Limpiar</button>
      </div>
      <div className="result" aria-live="polite">
        <div><div className="result-label">Aguinaldo estimado</div><div className="result-value">{crc.format(result.aguinaldo)}</div></div>
        <div className="result-breakdown">
          <span>Total de salarios <strong>{crc.format(result.total)}</strong></span>
          <span>Meses con monto <strong>{monthsWithSalary}</strong></span>
          <span>Fórmula <strong>Total ÷ 12</strong></span>
        </div>
      </div>
    </div>
  );
}
