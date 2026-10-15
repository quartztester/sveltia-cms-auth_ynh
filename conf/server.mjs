// Minimal node:http adapter for the (unmodified) Cloudflare Worker handler
// in ./worker.js. Reconstructs the absolute request URL from proxy headers so
// the worker sees the public https origin behind nginx.
import http from "node:http";
import { webcrypto } from "node:crypto";

// Node < 19 lacks the global WebCrypto object the worker uses (crypto.randomUUID).
globalThis.crypto ??= webcrypto;

const worker = (await import("./worker.js")).default;

const port = Number(process.env.PORT || 8080);
const host = process.env.BIND || "127.0.0.1";

const server = http.createServer(async (req, res) => {
  try {
    const proto = req.headers["x-forwarded-proto"] || "http";
    const authority = req.headers["x-forwarded-host"] || req.headers.host;
    const url = new URL(req.url, `${proto}://${authority}`);

    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
      if (k === "connection" || k === "keep-alive" || k === "transfer-encoding" || k === "upgrade") continue;
      for (const item of Array.isArray(v) ? v : [v]) headers.append(k, item);
    }

    const request = new Request(url, {
      method: req.method,
      headers,
      body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
      duplex: req.method === "GET" || req.method === "HEAD" ? undefined : "half",
    });

    const response = await worker.fetch(request, process.env);

    res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    if (response.body) {
      for await (const chunk of response.body) res.write(chunk);
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("internal error");
  }
});

server.listen(port, host, () => console.log(`sveltia-cms-auth listening on http://${host}:${port}`));
