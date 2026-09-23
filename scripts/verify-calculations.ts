import assert from "node:assert/strict";
import {
  calculateAguinaldo,
  calculateIva,
  calculateLoan,
  calculateNetSalary2026,
  calculateVehicleTransfer,
  calculateVacationPay,
  convertCurrency,
} from "../lib/calculations.ts";

const close = (actual: number, expected: number, tolerance = 0.02) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `Expected ${expected}, received ${actual}`);
};

close(calculateAguinaldo(Array(12).fill(500_000)).aguinaldo, 500_000);
close(calculateVacationPay(900_000, "mensual").payment, 420_000);
close(calculateNetSalary2026(900_000).socialSecurity, 97_470);
close(calculateIva(100_000, 13, "agregar").total, 113_000);
close(calculateIva(113_000, 13, "extraer").base, 100_000);
close(calculateLoan(1_200_000, 0, 12).monthlyPayment, 100_000);
assert.equal(calculateVehicleTransfer(8_000_000, 8_440_000).base, 8_440_000);
close(convertCurrency(100, 500, "usd-crc").converted, 50_000);
close(convertCurrency(50_000, 500, "crc-usd").converted, 100);

console.log("✓ Cálculos base verificados correctamente");
