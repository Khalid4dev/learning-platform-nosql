const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Routes pour les étudiants
router.post("/create", studentController.addStudent);
router.get("/:id", studentController.fetchStudent);
router.put("/:id", studentController.modifyStudent);
router.get("/stats", studentController.fetchStudentStats);

module.exports = router;
