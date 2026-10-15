Authentificateur OAuth auto-hébergé pour Sveltia/Decap CMS : les éditeurs se
connectent à GitHub sans faire transiter leurs identifiants par un service
tiers. Le worker en amont (conçu comme Cloudflare Worker) tourne sans
modification sur un runtime Node.js fourni ; l'app est sans état — seule
configuration, les identifiants OAuth client et la liste de sites autorisés.
