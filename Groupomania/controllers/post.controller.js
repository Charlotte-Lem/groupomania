const Post = require('../models/post.model');
const User = require('../models/user.model');

const Comment = require('../models/comment.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// //IMPORTATION DES variable d'environnement
require('dotenv').config();

//CREATION POST

exports.createPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        description: req.body.description,
        imagePost: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
        imagePost: null,
        description: req.body.description,
      };
  const post = new Post({
    ...postObject,
  });
  post
    .save()
    .then((data) => res.status(200).json({ data }))
    .catch((error) => res.status(401).json({ message: error }));
};

//MODIF POST
// exports.updatePost = (req, res, next) => {
//   if (req.file === undefined) {
//     //Mise à jour sans image
//     Post.findOne({ where: { postId: req.params.id } })
//       .then((post) => {
//         if (
//           post.UserId === req.token.userId ||
//           post.admin === req.token.admin
//         ) {
//           Post.update(
//             { ...post, description: req.body.description },
//             { where: { postId: req.params.id } }
//           )
//             .then(() => res.status(201).json({ message: 'Post modifié !' }))
//             .catch((error) =>
//               res.status(400).json({ error, message: error.message })
//             );
//         } else {
//           res
//             .status(403)
//             .json({ message: "Vous n'êtes pas autorisé à modifier ce post !" });
//         }
//       })
//       .catch((error) =>
//         res.status(500).json({ error, message: error.message })
//       );
//   } else {
//     //Mise à jour avec image
//     const postImage = `${req.protocol}://${req.get('host')}/images/${
//       req.file.filename
//     }`;
//     Post.findOne({ where: { postId: req.params.id } })
//       .then((post) => {
//         if (
//           post.UserId === req.token.userId ||
//           post.admin === req.token.admin
//         ) {
//           Post.update(
//             {
//               ...post,
//               description: req.body.description,
//               imagePost: postImage,
//             },
//             { where: { postId: req.params.id } }
//           )
//             .then(() => res.status(200).json({ message: 'Post modifié !' }))
//             .catch((error) =>
//               res.status(400).json({ error, message: error.message })
//             );
//         } else {
//           res
//             .status(403)
//             .json({ message: "Vous n'êtes pas autorisé à modifier ce post !" });
//         }
//       })
//       .catch((error) =>
//         res.status(500).json({ error, message: error.message })
//       );
//   }
// };

//MODIFICATION D UN POST
exports.updatePost = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];
  let decodedToken = jwt.verify(token, '${process.env.TOKEN}');
  // let userId = decodedToken.userId;
  Post.findOne({ where: { postId: req.params.id } })
    .then((post) => {
      if (post.userId === decodedToken.userId || decodedToken.admin) {
        let filename = post.imagePost.split('/images/')[1];

        const postObject = req.file
          ? {
              ...req.body,
              imagePost: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
              }`,
            }
          : {
              ...req.body,
            };
        Post.update({ ...postObject }, { where: { postId: req.params.id } })
          .then(() => {
            if (filename && req.file) {
              fs.unlink(`images/${filename}`, (err) => {
                if (err) console.log(err);
              });
            }
            return res.status(200).json({ message: 'Success' });
          })
          .catch((error) => res.status(500).json({ error }));
      } else if (post.userId !== decodedToken.userId) {
        return res.status(401).json({ message: `Not authorized` });
      }
    })
    .catch((error) => res.status(500).json({ message: error }));
};
// console.log(req.body);
// Post.findOne({ where: { postId: req.params.id } })
//   .then((post) => {
//     if (!post) {
//       return res.status(401).json({ message: `Publication doesn't exist` });
//     }
// vérification utilisateur
// let token = req.headers.authorization.split(' ')[1];
// let decodedToken = jwt.verify(token, '${process.env.TOKEN}');
// let userId = decodedToken.userId;
// if (post.userId !== userId) {
//   return res
//     .status(401)
//     .json({ message: `You are not the autor of this publication` });
// }
//     let filename = post.imagePost;
//     if (filename) {
//       filename = post.imagePost.split('/images/')[1];
//     }
//     const postObject = req.file
//       ? {
//           ...req.body,
//           imagePost: `${req.protocol}://${req.get('host')}/images/${
//             req.file.filename
//           }`,
//         }
//       : {
//           ...req.body,
//         };
//     Post.update({ ...postObject }, { where: { postId: req.params.id } })
//       .then(() => {
//         if (filename && req.file) {
//           fs.unlink(`images/${filename}`, (err) => {
//             if (err) throw err;
//           });
//         }
//         return res.status(200).json({ message: 'Success' });
//       })
//       .catch((error) => res.status(500).json({ error }));
//   })
//   .catch((error) => res.status(500).json({ message: error }));
// };

//TROUVER UN POST
exports.readOnePost = (req, res, next) => {
  Post.findOne({ where: { postId: req.params.id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//TROUVER TOUS LES POST
exports.readAllPost = (req, res, next) => {
  Post.findAll({
    raw: true,
    include: {
      model: User,
    },
    order: [['postId', 'DESC']],
  })
    .then((post) => {
      Comment.findAll({
        raw: true,
        include: {
          model: User,
        },
      }).then((comments) => {
        comments.forEach((message) => {
          const index = post.findIndex(
            (post) => post.postId === message.postPostId
          );
          if (index > -1) {
            if (!post[index].comments) {
              post[index].comments = [];
            }
            post[index].comments.push(message);
          }
        });
        return res.status(200).json(post);
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

//SUPPRIMER UN POST
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { postId: req.params.id } })
    .then((post) => {
      if (!post) {
        return res.status(401).json({ message: `Post not found` });
      }
      let postUserId = post.userId;
      let token = req.headers.authorization.split(' ')[1];
      let decodedToken = jwt.verify(token, '${process.env.TOKEN}');
      // let admin = decodedToken.admin;

      console.log('ADMIN DECODED TOKEN', decodedToken.admin);
      let admin = decodedToken.admin;
      let userId = decodedToken.userId;
      if (admin) {
        postUserId = userId;
      }

      if (postUserId !== userId) {
        return res.status(401).json({ message: `Not authorized` });
      } else {
        if (post.imagePost) {
          const filename = post.imagePost.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Post.destroy({ where: { postId: req.params.id } })
              .then(() => res.status(200).json({ message: 'Post delete !' }))
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          Post.destroy({ where: { postId: req.params.id } })
            .then(() => res.status(200).json({ message: 'Post delete !' }))
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
