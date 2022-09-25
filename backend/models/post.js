const mongoose = require('mongoose'); // Importation de mongoose pour communiquer avec la base de données MongoDB
const mongodbErrorHandler = require('mongoose-mongodb-errors'); // Importation du package de gestion des messages d'erreur MongoDB


const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, trim: true, maxlenght: 500 },
    imageURL: { type: String },
    video: { type: String },
    likes: { type: Number, default : 0 },
    dislikes: { type: Number, default : 0 },
    usersLiked: { type: Array},
    usersDisliked: { type: Array}
    //comments: { type: [{commenterId: String, commenterName: String, text: String, timestamp: Number}], require: true}
},
{
    timestamps: true,
});

postSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Post', postSchema);