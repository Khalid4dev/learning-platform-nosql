// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Il est important de valider les variables d'environnement au démarrage pour s'assurer que toutes les configurations nécessaires sont présentes et correctes. Cela permet d'éviter des erreurs au moment de l'exécution de l'application, qui pourraient être difficiles à diagnostiquer et à corriger.
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Si une variable requise est manquante, l'application peut ne pas fonctionner correctement. Cela peut entraîner des erreurs au moment de l'exécution, des comportements inattendus ou même des pannes complètes de l'application. Il est donc crucial de vérifier et de valider toutes les variables d'environnement nécessaires avant de démarrer l'application.

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  });
}

// Call the validation function at the start
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};