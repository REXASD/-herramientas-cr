const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

export const siteConfig = {
  name: "HerramientasCR",
  shortName: "HerramientasCR",
  description: "Calculadoras, guías y herramientas gratuitas para Costa Rica.",
  url: explicitUrl || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000"),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "herramientascrinfo@gmail.com",
  contactConfigured: true,
  updatedAt: "22 de septiembre de 2026",
};

export type ToolItem = {
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  href: string;
  icon: string;
  keywords: string[];
};

export const tools: ToolItem[] = [
  { title: "Calculadora de aguinaldo", shortTitle: "Aguinaldo", category: "Trabajo", description: "Suma los salarios del período y estima cuánto aguinaldo te corresponde.", href: "/calculadora-aguinaldo", icon: "₡", keywords: ["aguinaldo", "salario", "diciembre", "noviembre", "trabajo"] },
  { title: "Calculadora de vacaciones", shortTitle: "Vacaciones", category: "Trabajo", description: "Estima el pago de vacaciones según la modalidad de pago indicada por el MTSS.", href: "/calculadora-vacaciones", icon: "☀", keywords: ["vacaciones", "pago", "salario", "trabajo"] },
  { title: "Calculadora de salario neto", shortTitle: "Salario neto", category: "Trabajo", description: "Estima salario neto con cargas obreras e impuesto sobre salarios para 2026.", href: "/calculadora-salario-neto", icon: "↘", keywords: ["salario", "neto", "ccss", "renta", "planilla"] },
  { title: "Calculadora de IVA", shortTitle: "IVA", category: "Impuestos", description: "Agrega o extrae IVA con tarifa general, reducida o personalizada.", href: "/calculadora-iva", icon: "%", keywords: ["iva", "impuesto", "factura", "13%", "hacienda"] },
  { title: "Calculadora de préstamos", shortTitle: "Préstamos", category: "Finanzas", description: "Calcula cuota mensual, intereses, total pagado y una tabla de amortización.", href: "/calculadora-prestamo", icon: "▤", keywords: ["prestamo", "cuota", "interes", "finanzas", "credito"] },
  { title: "Estimador de traspaso de vehículo", shortTitle: "Traspaso", category: "Vehículos", description: "Estima los principales impuestos y timbres de un traspaso vehicular.", href: "/traspaso-vehiculo", icon: "▰", keywords: ["traspaso", "carro", "vehiculo", "registro", "notario"] },
  { title: "Conversor dólar a colón", shortTitle: "USD ↔ CRC", category: "Conversores", description: "Convierte dólares y colones usando el tipo de cambio que indiques.", href: "/conversor-dolar-colon", icon: "$", keywords: ["dolar", "colon", "tipo de cambio", "usd", "crc"] },
];

export type GuideItem = {
  title: string;
  description: string;
  href: string;
  category: string;
  minutes: number;
  keywords: string[];
};

export const guides: GuideItem[] = [
  { title: "Cómo calcular el aguinaldo", description: "Periodo, fórmula y ejemplo práctico para Costa Rica.", href: "/guias/como-calcular-aguinaldo", category: "Trabajo", minutes: 4, keywords: ["aguinaldo", "salarios"] },
  { title: "Cómo se calculan las vacaciones", description: "Diferencias entre pago mensual, semanal y actividad comercial.", href: "/guias/calculo-vacaciones-costa-rica", category: "Trabajo", minutes: 5, keywords: ["vacaciones", "trabajo"] },
  { title: "Cargas sociales y salario neto", description: "Cuota obrera CCSS y tramos del impuesto sobre salarios 2026.", href: "/guias/cargas-sociales-salario-neto", category: "Trabajo", minutes: 6, keywords: ["salario", "ccss", "renta"] },
  { title: "IVA en Costa Rica", description: "Tarifa general, reducidas y cómo agregar o extraer el impuesto.", href: "/guias/iva-costa-rica", category: "Impuestos", minutes: 5, keywords: ["iva", "impuestos"] },
  { title: "Cómo funciona una cuota de préstamo", description: "Interés, plazo, cuota nivelada y amortización explicados de forma simple.", href: "/guias/como-calcular-cuota-prestamo", category: "Finanzas", minutes: 6, keywords: ["prestamo", "interes", "cuota"] },
  { title: "Traspaso de vehículos", description: "Principales rubros registrales y cómo se define la base imponible.", href: "/guias/traspaso-vehiculo-costa-rica", category: "Vehículos", minutes: 6, keywords: ["traspaso", "vehiculo", "registro"] },
  { title: "Dólar y colón: qué tipo de cambio usar", description: "Referencia del BCCR, compra, venta y por qué tu banco puede mostrar otra tasa.", href: "/guias/tipo-cambio-dolar-colon", category: "Conversores", minutes: 4, keywords: ["dolar", "colon", "bccr"] },
];

export const officialSources = {
  mtssAguinaldo: "https://www.mtss.go.cr/temas-laborales/aguinaldo/aguinaldo.html",
  mtssAguinaldoFaq: "https://www.mtss.go.cr/temas-laborales/aguinaldo/preguntas_frecuentes.pdf",
  mtssLaboral: "https://www.mtss.go.cr/temas-laborales/",
  ccssPatronos: "https://aissfa.ccss.sa.cr/patronos",
  haciendaRenta2026: "https://www.hacienda.go.cr/docs/TramosRenta2026.pdf",
  haciendaIva: "https://www.hacienda.go.cr/docs/PresentacionIVACRTEx.pdf",
  registroAranceles: "https://registronacional.go.cr/tramites_servicios/tramitesregistros/bienes%20muebles/bienes_muebles_aranceles.htm",
  bccrTipoCambio: "https://gee.bccr.fi.cr/indicadoreseconomicos/IndicadoresEconomicos/frmEstructuraInformacion.aspx?DesTitulo=Tipos+de+Cambio&codMenu=+71&idioma=1",
};
