import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { AdSlot } from "./AdSlot";

export function ToolLayout({
  category,
  title,
  description,
  children,
}: {
  category: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  const adsenseEnabled = process.env.NEXT_PUBLIC_ENABLE_ADSENSE === "true";
  const preview = process.env.NEXT_PUBLIC_SHOW_AD_PREVIEWS !== "false";
  const topSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP?.trim();
  const bottomSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM?.trim();

  return (
    <div className="container page tool-page">
      <Breadcrumbs items={[{ label: title }]} />
      <header className="page-title">
        <span className="badge">{category}</span>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
      </header>
      <AdSlot label="Debajo de la introducción" clientId={adsenseClient} slotId={topSlot} enabled={adsenseEnabled} preview={preview} />
      {children}
      <AdSlot label="Final de la herramienta" clientId={adsenseClient} slotId={bottomSlot} enabled={adsenseEnabled} preview={preview} />
    </div>
  );
}
