Self-hosted OAuth authenticator for Sveltia/Decap CMS, so editors can sign in
to GitHub-based content workflows without routing credentials through a
third-party service. The upstream worker (a Cloudflare Worker by design) runs
unmodified on a bundled Node.js runtime; the app is stateless — its only
configuration is the OAuth client credentials and the site allowlist.
