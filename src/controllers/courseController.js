// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Un contrôleur gère la logique métier et les interactions avec les services et les bases de données, tandis qu'une route définit les points de terminaison de l'API et les méthodes HTTP associées.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Séparer la logique métier des routes permet de rendre le code plus modulaire, maintenable et testable. Cela facilite également la réutilisation de la logique métier dans différentes parties de l'application.

const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createCourse(req, res) {
  try {
    const course = req.body;
    const result = await mongoService.insertOne(
      db.getDatabase().collection("courses"),
      course
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création du cours." });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    const cacheKey = `course:${courseId}`;
    const objectId = ObjectId(courseId);

    const cachedData = await redisService.getData(
      db.getRedisInstance(),
      cacheKey
    );
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    const course = await mongoService.findOneById(
      db.getDatabase().collection("courses"),
      objectId
    );
    if (!course) {
      return res.status(404).json({ error: "Cours non trouvé." });
    }

    await redisService.cacheData(db.getRedisInstance(), cacheKey, course, 3600);
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération du cours." });
  }
}

async function getCourseStats(req, res) {
  try {
    const cacheKey = "courseStats";

    const cachedStats = await redisService.getData(
      db.getRedisInstance(),
      cacheKey
    );
    if (cachedStats) {
      return res.json(JSON.parse(cachedStats));
    }

    const stats = await db
      .getDatabase()
      .collection("courses")
      .aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
      .toArray();

    await redisService.cacheData(db.getRedisInstance(), cacheKey, stats, 3600);
    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des statistiques." });
  }
}

module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
};