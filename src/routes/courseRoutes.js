// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Séparer les routes dans différents fichiers permet de mieux organiser le code, de le rendre plus lisible et plus facile à maintenir. Cela permet également de séparer les préoccupations, en regroupant les routes par fonctionnalité ou par domaine d'application.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse : Pour organiser les routes de manière cohérente, il est recommandé de suivre une structure logique et intuitive. Par exemple, regrouper les routes par entité (utilisateurs, cours, etc.) et utiliser des noms de chemins clairs et descriptifs. Il est également utile de documenter les routes et de suivre les conventions RESTful pour les opérations CRUD (Create, Read, Update, Delete).

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;