const Post = require('../models/post.model');
const User = require('../models/user.model');

const Comment = require('../models/comment.model');
const jwt = require('jsonwebtoken');
const fs = require('fs');

//CREATION POST

exports.createPost = (req, res, next) => {
  Post.create({
    description: req.body.description,
    imagePost: req.file
      ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      : null,
    userId: req.body.userId,
  })
    .then((response) =>
      res.status(201).send({
        data: response.dataValues,
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

//MODIF POST
exports.updatePost = (req, res, next) => {
  Post.findOne({ where: { postId: req.params.id } }).then((post) => {
    const postObject = req.file
      ? {
          ...req.body,
          imagePost: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        }
      : { ...req.body };
    Post.update({ ...postObject }, { where: { postId: req.params.id } })
      .then(() => res.status(201).json({ message: 'update du post' }))
      .catch(() => res.status(400).json({ message: 'erreur ' }));
  });
};

//TROUVE UN POST
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
//TROUVE TOUS LES POST
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

//DELETE POST
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { postId: req.params.id } })
    .then((post) => {
      if (post.imagePost) {
        const filename = post.imagePost.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { postId: req.params.id } })
            .then(() =>
              res.status(200).json({ message: 'Post et image supprimé !' })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        Post.destroy({ where: { postId: req.params.id } })
          .then(() => res.status(200).json({ message: 'Post supprimé !' }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
