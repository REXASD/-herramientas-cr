"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="container page not-found"><span className="badge">Error</span><h1>Algo salió mal.</h1><p className="lead">Puedes intentar cargar esta sección nuevamente.</p><button className="btn btn-primary" type="button" onClick={reset}>Intentar de nuevo</button></div>;
}
