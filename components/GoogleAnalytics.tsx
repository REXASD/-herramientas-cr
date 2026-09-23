"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, readConsentPreferences } from "./ConsentManager";

export function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  useEffect(() => {
    if (!measurementId) return;

    const load = () => {
      const consent = readConsentPreferences();
      if (!consent?.analytics) return;
      if (document.querySelector(`script[data-hcr-ga="${measurementId}"]`)) return;

      const external = document.createElement("script");
      external.async = true;
      external.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      external.dataset.hcrGa = measurementId;
      document.head.appendChild(external);

      const inline = document.createElement("script");
      inline.dataset.hcrGaInline = measurementId;
      inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('config','${measurementId}',{anonymize_ip:true});`;
      document.head.appendChild(inline);
    };

    load();
    window.addEventListener(CONSENT_EVENT, load);
    return () => window.removeEventListener(CONSENT_EVENT, load);
  }, [measurementId]);

  return null;
}
