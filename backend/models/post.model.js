const mongoose = require('mongoose'); // Importation de mongoose pour communiquer avec la base de données MongoDB

const PostSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, trim: true, maxlenght: 500 },
    picture: { type: String },
    video: { type: String },
    likers: { type: [String], required: true},
    comments: { type: [{commenterId: String, commenterName: String, text: String, timestamp: Number}], require: true}
},
{
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);