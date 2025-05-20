import { serve } from "https://deno.land/std/http/server.ts";

console.log("HTTP server is running on http://localhost:8000");

serve((req) => {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    return new Response(Deno.readTextFileSync("./src/index.html"), {
      headers: { "content-type": "text/html" },
    });
  }
  if (url.pathname === "/manifest.webmanifest") {
    return new Response(Deno.readTextFileSync("./src/manifest.webmanifest"), {
      headers: { "content-type": "application/manifest+json" },
    });
  }
  if (url.pathname === "/sw.js") {
    return new Response(Deno.readTextFileSync("./src/sw.js"), {
      headers: { "content-type": "application/javascript" },
    });
  }
  return new Response("Not found", { status: 404 });
}, { port: 8000 });