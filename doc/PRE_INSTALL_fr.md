Cet applicatif doit être installé à la **racine d'un domaine** (chemin `/`) :
l'URL de rappel OAuth enregistrée auprès de GitHub est toujours
`https://<domaine>/callback`. Le script d'installation refuse tout autre chemin.

Il vous faudra une app OAuth GitHub (ID client + secret client), à créer sur
<https://github.com/settings/applications/new>.
