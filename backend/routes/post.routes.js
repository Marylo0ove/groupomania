const express = require('express'); // Importation d'express 
const router = express.Router(); // Création du routeur

const postCtrl = require('../controllers/post.controller'); // Controler associe les fonctions aux différentes routes

router.get('/',postCtrl.readPost);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/id', postCtrl.deletePost);


module.exports = router; // Exportation du router
