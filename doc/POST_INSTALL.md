After installation, finish the wiring:

1. Create (or edit) a GitHub OAuth app at
   <https://github.com/settings/applications/new> and set its
   **Authorization callback URL** to `https://YOUR_DOMAIN/callback`.
   Copy the generated **Client ID** and **Client Secret** into this app's
   settings panel (web admin, or `yunohost app config set sveltia_auth ...`).
2. In your Sveltia/Decap CMS `config.yml`, point the GitHub backend at:

   ```yaml
   backend:
     name: github
     auth_endpoint: https://YOUR_DOMAIN/auth
   ```

3. Make sure your CMS site's hostname is listed in the app's `site_hosts`
   setting (comma-separated) — the authenticator refuses other origins.

Verify the endpoint answers (a portal login will be demanded first):

```bash
curl -I https://YOUR_DOMAIN/auth?provider=github
```
