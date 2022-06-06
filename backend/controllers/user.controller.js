const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// //IMPORTATION DES variable d'environnement
require('dotenv').config();

//S'inscrire
exports.userSignup = (req, res, next) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then((response) =>
      res.status(201).send({
        data: response.dataValues,
      })
    )
    .catch((error) => res.status(200).send({ error }));
};

//Se connecter
exports.userLogin = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: 'User Not Found',
        });
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: 'error data' });
        }

        res.status(200).send({
          userId: user.id,
          email: user.email,
          admin: user.admin,
          firstName: user.firstName,
          lastName: user.lastName,
          message: 'User Connected',
          token: jwt.sign(
            {
              userId: user.id,
              admin: user.admin,
            },
            '${process.env.TOKEN}',
            {
              expiresIn: '24h',
            }
          ),
        });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//trouver tous les users
exports.userGetAll = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
      });
    });
};

//Trouver un user
exports.userGet = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

//supprimer un user
exports.userDelete = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];
  let decodedToken = jwt.verify(token, '${process.env.TOKEN}');
  let userId = decodedToken.userId;
  if (req.params.id != userId) {
    return res.status(401).json({ message: `Not authorized` });
  } else {
    User.findOne({ where: { id: req.params.id } }).then((user) => {
      User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé ' }))
        .catch((error) => res.status(400).json({ error }));
    });
  }
};

//modifier un user
exports.userModify = (req, res) => {
  let token = req.headers.authorization.split(' ')[1];
  let decodedToken = jwt.verify(token, '${process.env.TOKEN}');
  let userId = decodedToken.userId;
  if (req.params.id != userId) {
    return res.status(401).json({ message: `Not authorized` });
  } else {
    User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        const filename = user.profilePicture.split('/images/')[1];
        const userObject = req.file
          ? {
              ...req.body,
              profilePicture: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
              }`,
            }
          : {
              ...req.body,
            };
        User.update({ ...userObject }, { where: { id: req.params.id } })
          .then(() => {
            if (filename && req.file) {
              fs.unlink(`images/${filename}`, (err) => {
                if (err) console.log(err);
              });
            }
            return res.status(200).json({ message: 'Success' });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ message: error }));
  }
};
