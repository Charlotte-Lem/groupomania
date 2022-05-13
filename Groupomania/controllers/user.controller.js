const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

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
    .catch((error) => res.status(400).json({ error }));
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
          error: "Impossible de trouver l'utilisateur, vérifier les données",
        });
      }
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: 'Données incorrectes.' });
        }

        res.status(200).send({
          userId: user.id,
          email: user.email,
          admin: user.admin,
          firstName: user.firstName,
          lastName: user.lastName,
          message: 'Utilisateur connecté',
          token: jwt.sign(
            {
              userId: user.id,
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

//Trouver un user
exports.userGet = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

//supprimer un user
exports.userDelete = (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé ' }))
    .catch((error) => res.status(400).json({ error }));
};

//modifier un user
exports.userModify = (req, res, next) => {
  // need content

  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      // set data to modify
      let newUser = { ...req.body };
      if (req.file) {
        // delete old picture
        const filename = user.profilePicture.split('/images/')[1];
        if (filename !== 'defaultUserPicture.png') {
          fs.unlink(`./images/${filename}`, () => {});
        }
        newUser = {
          ...newUser,
          profilePicture: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        };
      }
      return newUser;
    })
    .then((newUser) => {
      return User.update(
        {
          ...newUser,
        },
        { where: { id: req.params.id } }
      ).catch((error) => res.status(500).send({ error }));
    })
    .then(() => {
      return User.findOne({ where: { id: req.params.id } });
    })
    .then((user) => {
      // if success, send new informations
      res.status(200).send({
        userId: user.id,
        profilePicture: user.profilePicture,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        message: 'profil mise a jour',
      });
    })
    .catch((error) => res.status(500).send({ error }));
};
//   if (req.file) {
//     User.findOne({ where: { id: req.params.id } })
//       .then((user) => {
//         if (user.profilePicture !== 'defaultUserPicture.png') {
//           fs.unlink(`images/${user.profilePicture}`, (error) => {
//             if (error) throw err;
//           });
//         }
//       })
//       .catch((error) => res.status(400).json(error));
//   }
//   User.findOne({ where: { id: req.params.id } }).then(() => {
//     if (req.body.password) {
//       // <- si le password a été modifié on enregistre le hash
//       bcrypt
//         .hash(req.body.password, 10)
//         .then((hash) => {
//           req.body.password = hash;
//           User.update(req.body, { where: { id: req.params.id } })
//             .then(() => {
//               res.status(201).json({ message: 'Profil mise à jour' });
//             })
//             .catch((error) => res.status(400).json(error));
//         })
//         .catch((error) => res.status(500).json(error));
//     } else {
//       // <- le password n'a pas été modifié on peut donc enregistrer nos données directement
//       User.update(req.body, { where: { id: req.params.id } })
//         .then(() =>
//          res.status(201).json({ message: 'Profil mise à jour' }))
//         .catch((error) => res.status(400).json(error));
//     }
//   });
// };

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
