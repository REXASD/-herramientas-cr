export const dynamic = "force-static";

export function GET() {
  const publisherId = process.env.ADSENSE_PUBLISHER_ID?.trim();
  const body = publisherId ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n` : "# AdSense pendiente de configurar\n";
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
