const mongoose = require('mongoose');
require('dotenv').config({path: './config/.env'});
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose
    .connect('mongodb+srv://'+dbUser+':'+dbPassword+'@cluster0.abn4yrw.mongodb.net/groupomania',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connected to MongoDB', err) )