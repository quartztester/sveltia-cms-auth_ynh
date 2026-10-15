# Sveltia CMS Auth for YunoHost

![Sveltia CMS Auth logo](./logos/sveltia_auth.png)

A YunoHost package for [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth), the tiny OAuth authenticator used by [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (and Decap CMS) to sign editors in against GitHub.

Instead of pointing your CMS at a third-party-hosted authenticator, this package runs the upstream worker code **unmodified** as a local Node.js service behind YunoHost's SSO: the GitHub OAuth client secret and the exchanged tokens never leave your server, and the endpoint can only be reached by portal users you authorize.

## What it does

- Serves the upstream `/auth` and `/callback` endpoints (the standard GitHub OAuth authorization-code flow).
- Validates the requesting site against an allowlist of hostnames (`site_hosts`).
- Is protected by YunoHost SSO: visitors without portal access are bounced to the login page before the OAuth flow can even start.

## Requirements to use it

1. A GitHub **OAuth app** whose *Authorization callback URL* is `https://your-auth-domain/callback`.
2. Its client ID and secret, provided at install time (or later in the app's settings panel).
3. In your CMS `config.yml`: `auth_endpoint: https://your-auth-domain/auth`.

See the post-install notes for the exact steps.

## Screenshots

This is a headless endpoint (it answers a browser popup opened by the CMS and otherwise emits redirect/error pages only). There is no UI to screenshot; see `doc/ADMIN.md` for verification commands instead.

## Limitations / caveats

- Must be installed at the **root of a domain** (`/`): GitHub registers a single fixed callback URL per OAuth app.
- GitHub only; GitLab env support exists upstream but is not exposed by this package.
- The app is stateless by design — no database, no data dir; upgrades only swap the pinned worker source.
