// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés permet de mieux organiser le code, de le rendre plus modulaire et réutilisable. 
// Cela facilite également les tests unitaires et la maintenance du code en isolant les différentes responsabilités.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  try {
   return await collection.findOne({ _id: ObjectId(id) });
  } catch (error) {
    console.error("Error finding document by ID:", error);
    throw error;
  }
}

async function insertOne(collection, document) {
  try {
    const result = await collection.insertOne(document);
    return result.ops[0];
  } catch (error) {
    console.error("Error inserting document:", error);
    throw error;
  }
}

// Export des services
module.exports = {
  findOneById,
  insertOne,
};
