const express = require('express');
const Db = require('./config/database');
//plugin pour l'upload des images
const path = require('path');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const likeRoutes = require('./routes/like.routes');
// const requireAuth = require ('./middleware/auth.middleware')
// const cors = require('cors');

//IMPORTATION DES variable d'environnement
require('dotenv').config();

// analyse le corps des requetes
const app = express();
//CORSnodemon server

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//renvoie le corp de la requetes en format json
app.use(express.json());

//permet de parser les requêtes envoyées par l'utilisateur
app.use(express.urlencoded({ extended: true }));

//package express rate limit pour limiter les demandes répétées aux API
const rateLimit = require('express-rate-limit');
//configuration de express rate limit
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000,
//   // 10 minutes
//   max: 200,
//   // Limite a 100 les requetes de chaque IP pendant 15 minutes
//   standardHeaders: true,
//   // Retourne les infos rate limit dans le headers `RateLimit-*` headers
//   legacyHeaders: false,
//   //Désactive les `X-RateLimit-*` headers
// });
// // Applique le middleware rateLimit pour toutes les requêtes
// app.use(limiter);

/*helmet configure de manière appropriée des en-têtes HTTP et aide a protéger 
 l'application contre certaines vulnérabilités*/
const helmet = require('helmet');
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

//importation des differentes routes :

app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api', commentRoutes);
app.use('/api/likes', likeRoutes);

Db.sync({ alter: true })
  .then(console.log('Connexion à la bdd réussie'))
  .catch((error) => console.log(error));

/*gestionnaire de routage qui indique a express qu'il faut gérer
la ressource image de manière statique*/
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
