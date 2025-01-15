// Question: Comment organiser le point d'entrée de l'application ?
// On doit initialiser les configurations, établir les connexions aux bases de données, et démarrer le serveur.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Utiliser des fonctions asynchrones, gérer les erreurs et fermer les connexions.

require("dotenv").config();
const express = require("express");
const config = require("./config/env");
const db = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());
app.use("/courses", courseRoutes);
app.use("/students", studentRoutes);

async function startServer() {
  try {
    await db.connectMongo();
    await db.connectRedis();

    const port = config.port || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Cleaning up...");
  await db.closeConnections();
  process.exit(0);
});

startServer();