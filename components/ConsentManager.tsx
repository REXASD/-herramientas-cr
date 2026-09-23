"use client";

import { useEffect, useState } from "react";

export type ConsentPreferencesValue = {
  analytics: boolean;
  ads: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "hcr-consent-preferences";
export const CONSENT_EVENT = "hcr-consent-changed";
export const OPEN_CONSENT_EVENT = "hcr-open-consent";

export function readConsentPreferences(): ConsentPreferencesValue | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentPreferencesValue>;
    return {
      analytics: parsed.analytics === true,
      ads: parsed.ads === true,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return null;
  }
}

function writeConsentPreferences(value: Omit<ConsentPreferencesValue, "updatedAt">) {
  const payload: ConsentPreferencesValue = { ...value, updatedAt: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: payload }));
}

export function ConsentManager() {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const existing = readConsentPreferences();
    if (!existing) setVisible(true);
    else {
      setAnalytics(existing.analytics);
      setAds(existing.ads);
    }

    const open = () => {
      const current = readConsentPreferences();
      setAnalytics(current?.analytics ?? false);
      setAds(current?.ads ?? false);
      setCustomize(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const save = (value: { analytics: boolean; ads: boolean }) => {
    writeConsentPreferences(value);
    setAnalytics(value.analytics);
    setAds(value.ads);
    setVisible(false);
    setCustomize(false);
  };

  if (!visible) return null;

  return (
    <aside className="consent-panel" role="dialog" aria-modal="true" aria-labelledby="consent-title">
      <div className="consent-copy">
        <span className="eyebrow">Privacidad</span>
        <strong id="consent-title">Cookies y tecnologías opcionales</strong>
        <p>
          Las herramientas funcionan sin cookies publicitarias ni analíticas. Puedes aceptar todo, rechazar lo opcional o elegir por categoría. Consulta la <a href="/cookies">política de cookies</a>.
        </p>
      </div>

      {customize && (
        <div className="consent-options">
          <label className="consent-option disabled-option">
            <span><strong>Necesarias</strong><small>Preferencias básicas y seguridad del sitio.</small></span>
            <input type="checkbox" checked disabled aria-label="Cookies necesarias activadas" />
          </label>
          <label className="consent-option">
            <span><strong>Analítica</strong><small>Permite medir uso y rendimiento cuando configuremos Google Analytics.</small></span>
            <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
          </label>
          <label className="consent-option">
            <span><strong>Publicidad</strong><small>Permite cargar tecnologías publicitarias cuando AdSense esté oficialmente activado.</small></span>
            <input type="checkbox" checked={ads} onChange={(event) => setAds(event.target.checked)} />
          </label>
        </div>
      )}

      <div className="consent-actions">
        {!customize ? (
          <>
            <button className="btn btn-secondary" type="button" onClick={() => save({ analytics: false, ads: false })}>Rechazar opcionales</button>
            <button className="btn btn-secondary" type="button" onClick={() => setCustomize(true)}>Personalizar</button>
            <button className="btn btn-primary" type="button" onClick={() => save({ analytics: true, ads: true })}>Aceptar todo</button>
          </>
        ) : (
          <>
            <button className="btn btn-secondary" type="button" onClick={() => save({ analytics: false, ads: false })}>Rechazar opcionales</button>
            <button className="btn btn-primary" type="button" onClick={() => save({ analytics, ads })}>Guardar preferencias</button>
          </>
        )}
      </div>
      <p className="consent-note">Esta capa controla las integraciones propias del sitio. Cuando activemos AdSense, también configuraremos una CMP certificada por Google para las regiones donde sea obligatoria.</p>
    </aside>
  );
}

export function ConsentSettingsButton() {
  return <button className="text-button" type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>Cambiar preferencias de cookies</button>;
}
