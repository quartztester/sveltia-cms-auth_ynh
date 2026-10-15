# Sveltia CMS Auth pour YunoHost

![Logo Sveltia CMS Auth](./logos/sveltia_auth.png)

Un paquet YunoHost pour [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth), le petit authentificateur OAuth utilisé par [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (et Decap CMS) pour connecter les éditeurs à GitHub.

Plutôt que de pointer votre CMS vers un authentificateur hébergé par un tiers, ce paquet exécute le code en amont **sans modification** comme service Node.js local derrière le SSO YunoHost : le secret client OAuth GitHub et les jetons échangés ne quittent jamais votre serveur.

## Prérequis

1. Une **app OAuth** GitHub dont l'*URL de rappel* est `https://votre-domaine-auth/callback`.
2. Son ID client et son secret client, fournis à l'installation (ou plus tard dans le panneau de configuration).
3. Dans le `config.yml` de votre CMS : `auth_endpoint: https://votre-domaine-auth/auth`.

## Captures d'écran

Service sans interface : il répond à la popup OAuth ouverte par le CMS. Voir `doc/ADMIN.md` pour les commandes de vérification.
