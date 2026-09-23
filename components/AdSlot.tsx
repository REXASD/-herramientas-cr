"use client";

import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsentPreferences } from "./ConsentManager";

declare global {
  interface Window { adsbygoogle?: unknown[]; }
}

export function AdSlot({
  label,
  clientId,
  slotId,
  enabled,
  preview = true,
}: {
  label: string;
  clientId?: string;
  slotId?: string;
  enabled: boolean;
  preview?: boolean;
}) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const refresh = () => setConsented(Boolean(readConsentPreferences()?.ads));
    refresh();
    window.addEventListener(CONSENT_EVENT, refresh);
    return () => window.removeEventListener(CONSENT_EVENT, refresh);
  }, []);

  useEffect(() => {
    if (!enabled || !consented || !clientId || !slotId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense puede no estar listo todavía durante desarrollo o bloqueadores de anuncios.
    }
  }, [enabled, consented, clientId, slotId]);

  if (enabled && consented && clientId && slotId) {
    return (
      <div className="ad-slot" aria-label="Publicidad">
        <span className="ad-label">Publicidad</span>
        <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={clientId} data-ad-slot={slotId} data-ad-format="auto" data-full-width-responsive="true" />
      </div>
    );
  }

  if (!preview) return null;
  return (
    <div className="ad-placeholder" aria-label={`Vista previa de publicidad: ${label}`}>
      <div><strong>Espacio publicitario</strong><span>{label}</span><small>Se reemplazará por AdSense cuando la cuenta y los bloques estén aprobados.</small></div>
    </div>
  );
}
