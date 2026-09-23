"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { guides, tools } from "@/lib/site";

const items = [
  ...tools.map((item) => ({ type: "Herramienta", title: item.title, description: item.description, href: item.href, keywords: [...item.keywords, item.category] })),
  ...guides.map((item) => ({ type: "Guía", title: item.title, description: item.description, href: item.href, keywords: [...item.keywords, item.category] })),
];

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function SearchClient() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = normalize(query.trim());
    if (!needle) return items;
    return items.filter((item) => normalize(`${item.title} ${item.description} ${item.keywords.join(" ")}`).includes(needle));
  }, [query]);

  return (
    <div>
      <label className="search-box" htmlFor="site-search"><span aria-hidden="true">⌕</span><input id="site-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ej. aguinaldo, IVA, traspaso..." autoComplete="off" /></label>
      <p className="search-count" aria-live="polite">{results.length} resultado{results.length === 1 ? "" : "s"}</p>
      <div className="search-results">
        {results.map((item) => <Link href={item.href} key={item.href} className="search-result"><span className="tag">{item.type}</span><div><h2>{item.title}</h2><p>{item.description}</p></div><span aria-hidden="true">→</span></Link>)}
        {results.length === 0 && <div className="content-card empty-state"><h2>No encontramos resultados</h2><p>Prueba con otra palabra o vuelve a la lista de herramientas.</p></div>}
      </div>
    </div>
  );
}
