const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const bodyParser = require('body-parser');
require('dotenv').config({path: './config/.env'});
require('./config/db')
const app = express();
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

// CORS, ajout des headers à l'objet réponse, s'applique à toutes les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Toutes les origines sont autorisées
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, X-Auth-Token, Content-Type, Authorization'); // Headers autorisés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Requêtes autorisées
    next();
  });
