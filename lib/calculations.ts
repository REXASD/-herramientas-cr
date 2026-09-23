export const CUOTA_OBRERA_2026 = 0.1083;

export type SalaryTaxResult = {
  gross: number;
  socialSecurity: number;
  incomeTaxBeforeCredits: number;
  taxCredits: number;
  incomeTax: number;
  net: number;
};

export function clampMoney(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

export function calculateAguinaldo(salaries: number[]) {
  const total = salaries.reduce((sum, value) => sum + clampMoney(value), 0);
  return { total, aguinaldo: total / 12 };
}

export type VacationMode = "mensual" | "semanal" | "comercio";

export function calculateVacationPay(amount: number, mode: VacationMode) {
  const salary = clampMoney(amount);
  if (mode === "mensual") {
    return { days: 14, daily: salary / 30, payment: (salary / 30) * 14, formula: "salario mensual ÷ 30 × 14" };
  }
  if (mode === "comercio") {
    return { days: 14, daily: salary / 7, payment: (salary / 7) * 14, formula: "salario semanal ÷ 7 × 14" };
  }
  return { days: 12, daily: salary / 6, payment: (salary / 6) * 12, formula: "salario semanal ÷ 6 × 12" };
}

export function incomeTax2026(grossSalary: number) {
  const salary = clampMoney(grossSalary);
  const brackets = [
    { from: 918_000, to: 1_347_000, rate: 0.10 },
    { from: 1_347_000, to: 2_364_000, rate: 0.15 },
    { from: 2_364_000, to: 4_727_000, rate: 0.20 },
    { from: 4_727_000, to: Number.POSITIVE_INFINITY, rate: 0.25 },
  ];

  return brackets.reduce((tax, bracket) => {
    if (salary <= bracket.from) return tax;
    const taxable = Math.min(salary, bracket.to) - bracket.from;
    return tax + Math.max(0, taxable) * bracket.rate;
  }, 0);
}

export function calculateNetSalary2026(grossSalary: number, children = 0, spouseCredit = false): SalaryTaxResult {
  const gross = clampMoney(grossSalary);
  const socialSecurity = gross * CUOTA_OBRERA_2026;
  const incomeTaxBeforeCredits = incomeTax2026(gross);
  const requestedCredits = Math.max(0, Math.floor(children)) * 1_710 + (spouseCredit ? 2_590 : 0);
  const taxCredits = Math.min(requestedCredits, incomeTaxBeforeCredits);
  const incomeTax = Math.max(0, incomeTaxBeforeCredits - taxCredits);
  const net = Math.max(0, gross - socialSecurity - incomeTax);
  return { gross, socialSecurity, incomeTaxBeforeCredits, taxCredits, incomeTax, net };
}

export function calculateIva(amount: number, ratePercent: number, mode: "agregar" | "extraer") {
  const input = clampMoney(amount);
  const rate = clampMoney(ratePercent) / 100;
  if (mode === "extraer") {
    const base = rate >= 0 ? input / (1 + rate) : input;
    return { base, tax: input - base, total: input };
  }
  return { base: input, tax: input * rate, total: input * (1 + rate) };
}

export type LoanResult = {
  principal: number;
  annualRate: number;
  months: number;
  monthlyPayment: number;
  totalPaid: number;
  interestPaid: number;
  schedule: Array<{ month: number; payment: number; interest: number; principal: number; balance: number }>;
};

export function calculateLoan(principalInput: number, annualRatePercent: number, monthsInput: number): LoanResult {
  const principal = clampMoney(principalInput);
  const annualRate = clampMoney(annualRatePercent) / 100;
  const months = Math.max(0, Math.floor(monthsInput));
  if (!principal || !months) {
    return { principal, annualRate, months, monthlyPayment: 0, totalPaid: 0, interestPaid: 0, schedule: [] };
  }

  const monthlyRate = annualRate / 12;
  const monthlyPayment = monthlyRate === 0
    ? principal / months
    : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));

  let balance = principal;
  const schedule = Array.from({ length: months }, (_, index) => {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPart = index === months - 1 ? balance : Math.min(balance, monthlyPayment - interest);
    const payment = principalPart + interest;
    balance = Math.max(0, balance - principalPart);
    return { month: index + 1, payment, interest, principal: principalPart, balance };
  });

  const totalPaid = schedule.reduce((sum, row) => sum + row.payment, 0);
  return { principal, annualRate, months, monthlyPayment, totalPaid, interestPaid: totalPaid - principal, schedule };
}

export function lawyersStamp(baseInput: number) {
  const base = clampMoney(baseInput);
  if (base <= 250_000) return 0;
  if (base <= 1_000_000) return 1_100;
  if (base <= 5_000_000) return 2_200;
  if (base <= 25_000_000) return 5_500;
  if (base <= 50_000_000) return 11_000;
  if (base <= 100_000_000) return 16_500;
  if (base <= 500_000_000) return 27_500;
  return 55_000;
}

export function calculateVehicleTransfer(
  contractValueInput: number,
  fiscalValueInput: number,
  fiscalStampInput = 0,
  notaryAndOtherInput = 0,
) {
  const contractValue = clampMoney(contractValueInput);
  const fiscalValue = clampMoney(fiscalValueInput);
  const base = Math.max(contractValue, fiscalValue);
  if (!base) {
    return {
      base: 0, transferTax: 0, registry: 0, agrarianStamp: 0, lawyersStamp: 0,
      parksStamp: 0, redCrossStamp: 0, archiveStamp: 0, automaticSubtotal: 0,
      fiscalStamp: 0, notaryAndOther: 0, total: 0,
    };
  }

  const registry = Math.max(2_000, Math.ceil(base / 1_000) * 5);
  const agrarianStamp = Math.ceil(base / 1_000) * 3;
  const transferTax = base * 0.025;
  const parksStamp = 500;
  const redCrossStamp = 500;
  const archiveStamp = base < 100_000 ? 10 : 20;
  const lawyer = lawyersStamp(base);
  const fiscalStamp = clampMoney(fiscalStampInput);
  const notaryAndOther = clampMoney(notaryAndOtherInput);
  const automaticSubtotal = registry + agrarianStamp + transferTax + parksStamp + redCrossStamp + archiveStamp + lawyer;

  return {
    base,
    transferTax,
    registry,
    agrarianStamp,
    lawyersStamp: lawyer,
    parksStamp,
    redCrossStamp,
    archiveStamp,
    automaticSubtotal,
    fiscalStamp,
    notaryAndOther,
    total: automaticSubtotal + fiscalStamp + notaryAndOther,
  };
}

export function convertCurrency(amountInput: number, crcPerUsdInput: number, direction: "usd-crc" | "crc-usd") {
  const amount = clampMoney(amountInput);
  const rate = clampMoney(crcPerUsdInput);
  const converted = direction === "usd-crc" ? amount * rate : rate ? amount / rate : 0;
  return { amount, rate, converted };
}
