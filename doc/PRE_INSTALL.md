This app must be installed at the **root of a domain** (path `/`): the OAuth
callback URL registered with GitHub is always `https://<domain>/callback`, and
the upstream worker matches that exact path. The install script refuses any
other path.

You will need a GitHub OAuth app (client ID + secret). Create one at
<https://github.com/settings/applications/new> — see the post-install notes for
the exact values to use.
