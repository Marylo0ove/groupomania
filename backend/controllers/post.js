const Post = require ('../models/post');
const fs = require('fs');// Importation de package fs file system


// Affichage de tous les posts
exports.getAllPosts = (req, res, next) => {
    Post.find()
    .then((posts) => {
        res.status(200).json(posts);
      })
    .catch(
        (error) => {res.status(400).json({error: error});}
    );
   }

// Création d'un post
exports.createPost = (req, res, next) => {
    const postObject = req.body.post; // Converti la réponse de string à JSON
    delete postObject._userId; // Supprime userId pour le récup depuis le token -> plus sécurisé
    var imgUrl = "" ;
    if(req.file)
       imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const post = new Post({ 
        ...postObject, // spread copie les champs du body de la requête
        userId: req.auth.userId, // UserId récupéré depuis le token
        imageURL: imgUrl // Génération de l'url de l'image

    });
    post.save()// Méthode save enregistre dans la base de donnée, renvoie une promise
    .then(() => { res.status(201).json({message: 'Post créé !'})}) // réponse si ok sinon expiration de la requête
    .catch(error => { res.status(400).json( { error })})
  };


// Modification d'un post
exports.updatePost = (req, res, next) => {
  const postObject = req.file ? { // On regarde s'il y a un champs file
      ...JSON.parse(req.body.post), // Si c'est le cas on recupère l'objet en parsant la chaine de caractère
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Et on recréé l'url de l'image
  } : { ...JSON.parse(req.body.post) }; // Sinon on recupère direct l'objet dans le corps de la requête
  //L'utilisation du mot-clé new avec un modèle Mongoose crée par défaut un champ_id . 
  //Utiliser ce mot-clé générerait une erreur, car nous tenterions de modifier un champ immuable dans un document de la base de données. 
  //Par conséquent, nous devons utiliser le paramètre id de la requête pour configurer notre Thing avec le même _id qu'avant.
  delete postObject._userId; // Pour éviter qu'un objet soit réattribué à quelqu'un d'autre
  Post.findOne({_id: req.params.id}) // Recherche dans la bdd pour s'assurer que c'est le créateur qui modifie
      .then((post) => {
        if(req.file){
        const filename = post.imageUrl.split('/images/')[1]; // Récup du nom de fichier qui est juste après '/images/'
              fs.unlink(`images/${filename}`, () => {})} // Méthode unlink de fs qui supprime le fichier image
          if (post.userId != req.auth.userId) { // Utilisateurs différents -> non autorisé
              res.status(401).json({ message : 'Not authorized'});
          } else { // Même utilisateur = OK
              Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id}) // MAJ avec même id de l'URL
              .then(() => res.status(200).json({message : 'Post modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
        ;
      })
      .catch((error) => {
          res.status(400).json({ error : error });
      });
};

// Suppression d'un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id}) // Recherche dans la bdd
      .then((post) => {
          if (post.userId != req.auth.userId) { // Utilisateurs différents -> non autorisé
              res.status(401).json({message: 'Not authorized'});
          } else { // Même utilisateur = OK
              const filename = post.imageUrl.split('/images/')[1]; // Récup du nom de fichier qui est juste après '/images/'
              fs.unlink(`images/${filename}`, () => { // Méthode unlink de fs qui supprime le fichier image
                  Post.deleteOne({_id: req.params.id}) // Suppresion dans la bdd en filtrant par id
                      .then(() => { res.status(200).json({message: 'Post supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

// Affichage d'un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({_id: req.params.id}) // objet de comparaison, l'id de ce qu'on cherche doit être égal au paramètre de requête
  .then((post) => {
      res.status(200).json(post);
    })
  .catch(
      (error) => {res.status(404).json({error: error});
  });
 }

 // Like / Dislike
exports.likePost = (req, res, next) => {
  Post.findOne({_id : req.params.id}) // Récup id de la post dans URL de la requête
  .then((post) => {
switch(req.body.like){
  case 1 : // LIKE L'utilisateur n'a pas déjà liké ni disliké
        if(!post.usersLiked.includes(req.body.userId) && !post.usersDisliked.includes(req.body.userId) && req.body.like === 1){
          Post.updateOne({_id: req.params.id},
          {
            $inc: {likes: 1}, // Ajout du like
            $push: {usersLiked: req.body.userId} // Ajout du userId dans usersLiked
          }
          )
          .then(() => res.status(201).json({message: "Post like +1"}))
          .catch(error => { res.status(400).json( { error })});
        }
        break;
  case 0 : // ANNUL LIKE / DISLIKE L'utilisateur a déjà liké / disliké
        if(post.usersLiked.includes(req.body.userId)){
          Post.updateOne({_id: req.params.id},
          {
            $inc: {likes: -1}, // Suppression du like
            $pull: {usersLiked: req.body.userId} // Suppression du userId dans usersLiked
          }
          )
          .then(() => res.status(201).json({message: "Post like 0"}))
          .catch(error => { res.status(400).json( { error })});
        }
        if(post.usersDisliked.includes(req.body.userId) && req.body.like === 0){
          Post.updateOne({_id: req.params.id},
          {
            $inc: {dislikes: -1}, // Suppression du dislike
            $pull: {usersDisliked: req.body.userId} // Suppression du userId dans usersDisliked
          }
          )
          .then(() => res.status(201).json({message: "Post dislike 0"}))
          .catch(error => { res.status(400).json( { error })});
        }
        break;
  case -1 : // DISLIKE L'utilisateur n'a pas déjà disliké ni liké
        if(!post.usersDisliked.includes(req.body.userId) && !post.usersLiked.includes(req.body.userId) && req.body.like === -1){
          Post.updateOne({_id: req.params.id},
          {
            $inc: {dislikes: 1}, // Ajout du dislike
            $push: {usersDisliked: req.body.userId} // Ajout du userId dans usersDisliked
          }
          )
          .then(() => res.status(201).json({message: "Post dislike +1"}))
          .catch(error => { res.status(400).json( { error })});
        }
        break;
        
      }   
    })
    .catch(error => { res.status(400).json( { error })});

}