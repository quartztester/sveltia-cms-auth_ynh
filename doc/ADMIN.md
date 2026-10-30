The service runs as a systemd unit (`systemctl status sveltia_auth`), listens

This app is headless (a CORS/OAuth callback shim with no UI of its own),
so it ships no screenshots by design; screenshots of Sveltia CMS itself live in
the upstream Sveltia project docs.
on a loopback port (`yunohost app settings sveltia_auth port`) and logs to
`/var/log/sveltia_auth/sveltia_auth.log`.

Verify the OAuth endpoints without a browser (bypasses SSO by hitting the loopback port directly):

```bash
port=$(yunohost app settings sveltia_auth get port)
curl -s -o /dev/null -D - "http://127.0.0.1:$port/auth?provider=github&site_id=YOUR_CMS_HOST"
# expect: 302 + Location: https://github.com/login/oauth/authorize?... + csrf-token cookie

curl -s "http://127.0.0.1:$port/auth?provider=github&site_id=evil.example"
# expect: an error page mentioning the domain is not allowed
```

Public requests first pass through YunoHost SSO (main permission defaults to
admins); adjust access with `yunohost user permission update sveltia_auth.main`.

Rotating the GitHub client secret from the CLI:

```bash
yunohost app config set sveltia_auth -a "github_client_secret=***"
```
