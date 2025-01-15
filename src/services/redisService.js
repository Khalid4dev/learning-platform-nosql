// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : Pour gérer efficacement le cache avec Redis, il est important de définir une politique de gestion du cache, de choisir une stratégie d'expiration appropriée (comme LRU - Least Recently Used), et de surveiller les performances et l'utilisation de la mémoire. Utilisez également des clés structurées et des préfixes pour organiser les données en cache.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utilisez des noms de clés descriptifs et cohérents, évitez les clés trop longues, et utilisez des préfixes pour regrouper les clés par fonctionnalité ou par module. Pensez également à définir des expirations pour éviter l'accumulation de données obsolètes.

// Fonctions utilitaires pour Redis
async function cacheData(client, key, data, ttl) {
  try {
    await client.setEx(key, ttl, JSON.stringify(data));
    console.log("Data cached successfully.");
  } catch (error) {
    console.error("Error caching data:", error);
  }
}

async function getData(client, key) {
  try {
    return await client.get(key);
  } catch (error) {
    console.error("Error retrieving data from Redis:", error);
    return null;
  }
}

async function deleteData(client, key) {
  try {
    await client.del(key);
    console.log(`Key deleted: ${key}`);
  } catch (error) {
    console.error("Error deleting Redis key:", error);
  }
}

module.exports = {
  cacheData,
  getData,
  deleteData,
};