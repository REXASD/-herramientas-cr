"use client";

import { useMemo, useState } from "react";
import { calculateLoan } from "@/lib/calculations";
import { crc } from "@/lib/format";

export default function PrestamoCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [showTable, setShowTable] = useState(false);
  const result = useMemo(() => calculateLoan(Number(amount) || 0, Number(rate) || 0, Number(term) || 0), [amount, rate, term]);

  return (
    <div className="calculator">
      <div className="form-grid three-columns">
        <div className="field"><label htmlFor="loan-amount">Monto</label><div className="input-prefix"><span>₡</span><input id="loan-amount" type="number" min="0" step="10000" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" /></div></div>
        <div className="field"><label htmlFor="loan-rate">Tasa anual</label><div className="input-suffix"><input id="loan-rate" type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="0" /><span>%</span></div></div>
        <div className="field"><label htmlFor="loan-term">Plazo</label><div className="input-suffix"><input id="loan-term" type="number" min="1" max="600" step="1" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="60" /><span>meses</span></div></div>
      </div>
      <div className="result" aria-live="polite">
        <div><div className="result-label">Cuota mensual estimada</div><div className="result-value">{crc.format(result.monthlyPayment)}</div></div>
        <div className="result-breakdown"><span>Principal <strong>{crc.format(result.principal)}</strong></span><span>Intereses estimados <strong>{crc.format(result.interestPaid)}</strong></span><span>Total pagado <strong>{crc.format(result.totalPaid)}</strong></span></div>
      </div>
      {result.schedule.length > 0 && <div className="calculator-actions"><button className="btn btn-secondary" type="button" onClick={() => setShowTable((value) => !value)}>{showTable ? "Ocultar amortización" : "Ver amortización"}</button></div>}
      {showTable && result.schedule.length > 0 && <div className="table-scroll" role="region" aria-label="Tabla de amortización" tabIndex={0}><table className="amortization-table"><thead><tr><th>Mes</th><th>Cuota</th><th>Interés</th><th>Capital</th><th>Saldo</th></tr></thead><tbody>{result.schedule.map((row) => <tr key={row.month}><td>{row.month}</td><td>{crc.format(row.payment)}</td><td>{crc.format(row.interest)}</td><td>{crc.format(row.principal)}</td><td>{crc.format(row.balance)}</td></tr>)}</tbody></table></div>}
      <p className="helper">Modelo de cuota nivelada con tasa fija. No incluye comisiones, seguros, gastos administrativos ni variaciones de tasa.</p>
    </div>
  );
}
