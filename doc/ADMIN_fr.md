Le service tourne en tant qu'unité systemd (`systemctl status sveltia_auth`),
écoute sur un port local (`yunohost app settings sveltia_auth port`) et journalise
dans `/var/log/sveltia_auth/sveltia_auth.log`.

Les requêtes publiques passent d'abord par le SSO YunoHost (permission principale
restreinte aux administrateurs par défaut).
