import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HerramientasCR",
    short_name: "HerramientasCR",
    description: "Calculadoras y herramientas gratuitas para Costa Rica.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fb",
    theme_color: "#155eef",
    lang: "es-CR",
  };
}
