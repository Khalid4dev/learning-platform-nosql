const { ObjectId } = require("mongodb");
const db = require("../config/db");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

// Function to add a new student to the database
async function addStudent(req, res) {
  try {
    const studentData = req.body;
    const result = await mongoService.insertOne(
      db.getDatabase().collection("students"),
      studentData
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error creating student." });
  }
}

// Function to fetch a student by ID
async function fetchStudent(req, res) {
  try {
    const studentId = req.params.id;
    const cacheKey = `student:${studentId}`;

    // Check if the student data is in Redis cache
    const cachedData = await redisService.getData(
      db.getRedisInstance(),
      cacheKey
    );
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // If not in cache, fetch from MongoDB
    const student = await mongoService.findOneById(
      db.getDatabase().collection("students"),
      ObjectId(studentId)
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    // Cache the result in Redis
    await redisService.cacheData(
      db.getRedisInstance(),
      cacheKey,
      student,
      3600
    );
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Error fetching student." });
  }
}

// Function to update a student's information
async function modifyStudent(req, res) {
  try {
    const studentId = req.params.id;
    const studentData = req.body;
    const result = await db
      .getDatabase()
      .collection("students")
      .updateOne({ _id: ObjectId(studentId) }, { $set: studentData });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Student not found." });
    }
    res.json({ message: "Student updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error updating student." });
  }
}

// Function to fetch student statistics
async function fetchStudentStats(req, res) {
  try {
    const cacheKey = "studentStats";

    // Check if stats are in Redis cache
    const cachedStats = await redisService.getData(
      db.getRedisInstance(),
      cacheKey
    );
    if (cachedStats) {
      return res.json(JSON.parse(cachedStats));
    }

    // Compute stats and cache the result
    const stats = await db
      .getDatabase()
      .collection("students")
      .aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
      .toArray();

    await redisService.cacheData(db.getRedisInstance(), cacheKey, stats, 3600);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching student statistics." });
  }
}

module.exports = {
  addStudent,
  fetchStudent,
  modifyStudent,
  fetchStudentStats,
};
