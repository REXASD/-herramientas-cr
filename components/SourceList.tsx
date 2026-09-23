export type Source = { label: string; href: string };

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <section className="sources" aria-labelledby="fuentes-title">
      <h2 id="fuentes-title">Fuentes oficiales</h2>
      <p>Usamos estas fuentes como referencia. Las normas, tarifas y porcentajes pueden cambiar.</p>
      <ul>
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
