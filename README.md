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



## Questions et Réponses

---

**1. Pourquoi créer un module séparé pour les connexions aux bases de données ?**

Réponse : Créer un module séparé pour les connexions aux bases de données permet de centraliser et de réutiliser le code de connexion. Cela facilite également la gestion des erreurs et des configurations spécifiques à chaque base de données.

---

**2. Comment gérer proprement la fermeture des connexions ?**

Réponse : Pour gérer proprement la fermeture des connexions, il est important d'écouter les événements de fermeture de l'application (comme `SIGINT` ou `SIGTERM`) et de fermer les connexions de manière appropriée. Cela peut être fait en utilisant les méthodes de fermeture fournies par les clients de base de données, comme `mongoClient.close()` pour MongoDB et `redisClient.quit()` pour Redis.

---

**3. Pourquoi est-il important de valider les variables d'environnement au démarrage ?**

Réponse : Il est important de valider les variables d'environnement au démarrage pour s'assurer que toutes les configurations nécessaires sont présentes et correctes. Cela permet d'éviter des erreurs au moment de l'exécution de l'application, qui pourraient être difficiles à diagnostiquer et à corriger.

---

**4. Que se passe-t-il si une variable requise est manquante ?**

Réponse : Si une variable requise est manquante, l'application peut ne pas fonctionner correctement. Cela peut entraîner des erreurs au moment de l'exécution, des comportements inattendus ou même des pannes complètes de l'application. Il est donc crucial de vérifier et de valider toutes les variables d'environnement nécessaires avant de démarrer l'application.

---

**5. Quelle est la différence entre un contrôleur et une route ?**

Réponse : Un contrôleur gère la logique métier et les interactions avec les services et les bases de données, tandis qu'une route définit les points de terminaison de l'API et les méthodes HTTP associées.

---

**6. Pourquoi séparer la logique métier des routes ?**

Réponse : Séparer la logique métier des routes permet de rendre le code plus modulaire, maintenable et testable. Cela facilite également la réutilisation de la logique métier dans différentes parties de l'application.

---

**7. Pourquoi séparer les routes dans différents fichiers ?**

Réponse : Séparer les routes dans différents fichiers permet de mieux organiser le code, de le rendre plus lisible et plus facile à maintenir. Cela permet également de séparer les préoccupations, en regroupant les routes par fonctionnalité ou par domaine d'application.

---

**8. Comment organiser les routes de manière cohérente ?**

Réponse : Pour organiser les routes de manière cohérente, il est recommandé de suivre une structure logique et intuitive. Par exemple, regrouper les routes par entité (utilisateurs, cours, etc.) et utiliser des noms de chemins clairs et descriptifs. Il est également utile de documenter les routes et de suivre les conventions RESTful pour les opérations CRUD (Create, Read, Update, Delete).

---

**9. Pourquoi créer des services séparés ?**

Réponse : Créer des services séparés permet de mieux organiser le code, de le rendre plus modulaire et réutilisable. Cela facilite également les tests unitaires et la maintenance du code en isolant les différentes responsabilités.

---

**10. Comment gérer efficacement le cache avec Redis ?**

Réponse : Pour gérer efficacement le cache avec Redis, il est important de définir une politique de gestion du cache, de choisir une stratégie d'expiration appropriée (comme LRU - Least Recently Used), et de surveiller les performances et l'utilisation de la mémoire. Utilisez également des clés structurées et des préfixes pour organiser les données en cache.

---

**11. Quelles sont les bonnes pratiques pour les clés Redis ?**

Réponse : Utilisez des noms de clés descriptifs et cohérents, évitez les clés trop longues, et utilisez des préfixes pour regrouper les clés par fonctionnalité ou par module. Pensez également à définir des expirations pour éviter l'accumulation de données obsolètes.

---

**12. Comment organiser le point d'entrée de l'application ?**

Réponse : On doit initialiser les configurations, établir les connexions aux bases de données, et démarrer le serveur.

---

**13. Quelle est la meilleure façon de gérer le démarrage de l'application ?**

Réponse : Utiliser des fonctions asynchrones, gérer les erreurs et fermer les connexions.

---

**14. Quelles sont les informations sensibles à ne jamais commiter ?**

Réponse : Les informations sensibles à ne jamais commiter incluent les mots de passe, les clés API, les jetons d'authentification, les informations de connexion à la base de données, et toute autre information qui pourrait compromettre la sécurité de l'application ou des utilisateurs.

---

**15. Pourquoi utiliser des variables d'environnement ?**

Réponse : Les variables d'environnement permettent de séparer la configuration de l'application du code source. Elles facilitent la gestion des différentes configurations pour les environnements de développement, de test et de production, et permettent de sécuriser les informations sensibles en les stockant en dehors du code source.

---
