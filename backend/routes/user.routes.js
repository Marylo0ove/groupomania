const express = require('express'); // Importation d'express
const router = express.Router(); // Création du routeur

const userCtrl = require('../controllers/user.controller'); // Controler associe les fonctions aux différentes routes
const password = require('../middleware/password'); // Importation de password-validator

// Routes post car le front-end envoie e-mail et mdp
// Segments de routes finaux, le reste est déclaré dans l'application express
router.post('/signup',password, userCtrl.signup); // Enregistrement de la route signup
router.post('/login', userCtrl.login); // Enregistrement de la route login
router.put('/:id', userCtrl.updateUser);// Enregistrement de la route update user
router.get('/logout', userCtrl.logout);// Enregistrement de la route logout
 
module.exports = router; // Exportation du router