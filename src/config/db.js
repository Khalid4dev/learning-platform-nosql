// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Créer un module séparé pour les connexions aux bases de données permet de centraliser et de réutiliser le code de connexion. Cela facilite également la gestion des erreurs et des configurations spécifiques à chaque base de données.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : Pour gérer proprement la fermeture des connexions, il est important d'écouter les événements de fermeture de l'application (comme 'SIGINT' ou 'SIGTERM') et de fermer les connexions de manière appropriée. Cela peut être fait en utilisant les méthodes de fermeture fournies par les clients de base de données, comme `mongoClient.close()` pour MongoDB et `redisClient.quit()` pour Redis.

const { MongoClient } = require("mongodb");
const redis = require("redis");
const config = require("./env");

let mongoClientInstance;
let redisClientInstance;
let database;

// Function to connect to MongoDB server
async function initializeMongo() {
  try {
    mongoClientInstance = new MongoClient(config.mongodb.uri);
    await mongoClientInstance.connect();
    database = mongoClientInstance.db(config.mongodb.dbName);
    console.log("Successfully connected to MongoDB");
    return database;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

// Function to close MongoDB connection
async function terminateMongo() {
  if (mongoClientInstance) {
    await mongoClientInstance.close();
    console.log("MongoDB connection terminated");
  }
}

// Function to get MongoDB database instance
function getDatabase() {
  if (!database)
    throw new Error("Database not initialized. Call initializeMongo first");
  return database;
}

// Function to connect to Redis server
async function initializeRedis() {
  try {
    redisClientInstance = redis.createClient({ url: config.redis.uri });
    await redisClientInstance.connect();
    await redisClientInstance.ping();
    console.log("Successfully connected to Redis");
  } catch (error) {
    console.error("Redis connection error:", error);
    throw error;
  }
}

// Function to get Redis client instance
function getRedisInstance() {
  if (!redisClientInstance)
    throw new Error("Redis not connected yet. Call initializeRedis first");
  return redisClientInstance;
}

// Function to close Redis connection
async function terminateRedis() {
  try {
    if (redisClientInstance) await redisClientInstance.quit();
    console.log("Redis connection terminated");
  } catch (error) {
    console.error("Error terminating Redis connection", error);
    throw error;
  }
}

module.exports = {
  getDatabase,
  initializeMongo,
  terminateMongo,
  initializeRedis,
  getRedisInstance,
  terminateRedis,
};