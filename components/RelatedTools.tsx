import { ToolCard } from "./ToolCard";
import { tools } from "@/lib/site";

export function RelatedTools({ exclude, limit = 3 }: { exclude?: string; limit?: number }) {
  const related = tools.filter((tool) => tool.href !== exclude).slice(0, limit);
  return (
    <section className="related-section">
      <div className="section-heading compact">
        <div>
          <span className="eyebrow">También te puede servir</span>
          <h2>Más herramientas</h2>
        </div>
      </div>
      <div className="tool-grid">{related.map((tool) => <ToolCard key={tool.href} tool={tool} />)}</div>
    </section>
  );
}
