import Link from "next/link";
import type { ToolItem } from "@/lib/site";

export function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link className="tool-card" href={tool.href}>
      <div className="tool-card-top">
        <span className="tool-icon" aria-hidden="true">{tool.icon}</span>
        <span className="tag">{tool.category}</span>
      </div>
      <h3>{tool.title}</h3>
      <p>{tool.description}</p>
      <span className="tool-link">Abrir herramienta <span aria-hidden="true">→</span></span>
    </Link>
  );
}
