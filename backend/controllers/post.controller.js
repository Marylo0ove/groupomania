const Post = require ('../models/post.model');
const User = require('../models/user.model'); // Importation du model
const ObjectId = require ('mongoose').Types.ObjectId;

// Affichage de toutes les sauces
exports.readPost = (req, res, next) => {
    Post.find()
    .then((posts) => {
        res.status(200).json(posts);
      })
    .catch(
        (error) => {res.status(400).json({error: error});}
    );
   }

// Création d'une sauce
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post); // Converti la réponse de string à JSON
    delete postObject._userId; // Supprime userId pour le récup depuis le token -> plus sécurisé
    const post = new Post({ 
        ...postObject, // spread copie les champs du body de la requête
        userId: req.auth.userId, // UserId récupéré depuis le token
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Génération de l'url de l'image

    });
    post.save()// Méthode save enregistre dans la base de donnée, renvoie une promise
    .then(() => { res.status(201).json({message: 'Post créé !'})}) // réponse si ok sinon expiration de la requête
    .catch(error => { res.status(400).json( { error })})
  };


module.exports.updatePost = (req, res, next) =>{
    
}
module.exports.deletePost = (req, res, next) =>{
    
}
