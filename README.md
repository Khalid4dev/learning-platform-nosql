# Projet de fin de module NoSQL

## Description

Ce projet est une implementation simple d'une API pour l'apprentissage basée sur NoSQL.

## Installation et Lancement du Projet

### Prérequis

- Node.js (version 14 ou supérieure)
- MongoDB
- Redis

### Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/learning-platform-template.git

   cd learning-platform-template
   git remote remove origin

   # Ajoutez votre dépôt comme nouvelle origine
   git remote add origin https://github.com/[votre-compte]/learning-platform-nosql

   # Poussez le code vers votre dépôt
   git push -u origin main
   ```
2. Installez les dépendances :

   ```bash
   npm install
   ```
3. Configurez les variables d'environnement : Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

```
MONGODB_URI=your_mongodb_uri
MONGODB_DB_NAME=your_database_name
REDIS_URI=your_redis_uri
PORT=3000
```

### Lancement

1. Démarrez le serveur :
   ```bash
   npm start
   ```
2. Le serveur sera accessible à l'adresse `http://localhost:3000`.

## Structure du Projet

```
learning-platform-template/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   ├── controllers/
│   │   ├── courseController.js
│   │   ├── studentController.js
│   ├── services/
│   │   ├── mongoService.js
│   │   ├── redisService.js
│   ├── app.js
│   ├── server.js
├── .env
├── package.json
├── README.md
```

* `src/config/`: Contient les fichiers de configuration pour la base de données et les variables d'environnement.
* `src/controllers/`: Contient les contrôleurs pour les différentes entités (cours, étudiants).
* `src/services/`: Contient les services utilitaires pour interagir avec MongoDB et Redis.
* `src/app.js`: Configure l'application Express.
* `src/server.js`: Démarre le serveur.

## Choix Techniques

* **Express.js** : Utilisé comme framework web pour sa simplicité et sa flexibilité.
* **MongoDB** : Base de données NoSQL choisie pour sa scalabilité et sa flexibilité dans la gestion des données.
* **Redis** : Utilisé pour la mise en cache afin d'améliorer les performances de l'application.
* **Modularité** : Le code est organisé en modules séparés (config, controllers, services) pour une meilleure maintenabilité et réutilisabilité.


