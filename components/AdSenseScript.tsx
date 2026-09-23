"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, readConsentPreferences } from "./ConsentManager";

export function AdSenseScript({ clientId, enabled }: { clientId?: string; enabled: boolean }) {
  useEffect(() => {
    if (!enabled || !clientId) return;

    const load = () => {
      const consent = readConsentPreferences();
      if (!consent?.ads) return;
      if (document.querySelector(`script[data-hcr-adsense="${clientId}"]`)) return;
      const script = document.createElement("script");
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
      script.dataset.hcrAdsense = clientId;
      document.head.appendChild(script);
    };

    load();
    window.addEventListener(CONSENT_EVENT, load);
    return () => window.removeEventListener(CONSENT_EVENT, load);
  }, [clientId, enabled]);

  return null;
}
