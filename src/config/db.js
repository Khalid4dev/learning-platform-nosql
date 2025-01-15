// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Créer un module séparé pour les connexions aux bases de données permet de centraliser et de réutiliser le code de connexion. Cela facilite également la gestion des erreurs et des configurations spécifiques à chaque base de données.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Pour gérer proprement la fermeture des connexions, il est important d'écouter les événements de fermeture de l'application (comme 'SIGINT' ou 'SIGTERM') et de fermer les connexions de manière appropriée. Cela peut être fait en utilisant les méthodes de fermeture fournies par les clients de base de données, comme `mongoClient.close()` pour MongoDB et `redisClient.quit()` pour Redis.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  const uri =
    "mongodb+srv://khalid4dev:K813NdOlbU9WobX5@testcluster.s7utt.mongodb.net/?retryWrites=true&w=majority&appName=testCluster";

  try {
    mongoClient = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await mongoClient.connect();
    db = mongoClient.db(config.testCluster);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Retry logic can be implemented here if needed
    process.exit(1); // Exit process with failure
  }
}



async function connectRedis() {
  const redis = new Redis({
    host: "localhost", // Redis server host
    port: 6379, // Redis server port
    retryStrategy: (times) => {
      // reconnect after
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  });

  redis.on("connect", () => {
    console.log("Connected to Redis");
  });

  redis.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  return redis;
}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  mongoClient,
  redisClient,
  db,
};