const express = require('express'); // Importation d'express 
const router = express.Router(); // Création du routeur

const postCtrl = require('../controllers/post'); // Controler associe les fonctions aux différentes routes
const Post = require('../models/post'); // Importation du model de sauce
const auth = require('../middleware/auth'); // Importation du middleware d'authentification
const multer = require('../middleware/multer-config'); // Importation de multer pour la gestion des images

router.post('/', auth, multer, postCtrl.createPost); // Création d'une sauce
router.get('/:id', auth, postCtrl.getOnePost); // Affichage d'une sauce
router.put('/:id', auth, multer, postCtrl.updatePost); // Modification sauce
router.delete('/:id', auth, postCtrl.deletePost); // Suppression d'une sauce
router.get('/' + '', auth, postCtrl.getAllPosts); // Affichage de toutes les sauces
router.post('/:id/like', auth, postCtrl.likePost); // Like / Dislike

module.exports = router; // Exportation du router
