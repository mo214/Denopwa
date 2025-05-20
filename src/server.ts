import { extname, join } from "https://deno.land/std@0.224.0/path/mod.ts";

console.log("HTTP server is running on http://localhost:8000");

const PUBLIC_DIR = "../public";

const contentTypes: Record<string, string> = {
  ".html": "text/html",
  ".webmanifest": "application/manifest+json",
  ".js": "application/javascript",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
};

Deno.serve({ port: 8000 }, (req) => {
  const url = new URL(req.url);
  const filePath = url.pathname === "/" ? "/index.html" : url.pathname;
  const ext = extname(filePath);
  const contentType = contentTypes[ext] || "application/octet-stream";
  const fullPath = join(PUBLIC_DIR, filePath);

  try {
    const file = Deno.readFileSync(fullPath);
    return new Response(file, {
      headers: { "content-type": contentType },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
});