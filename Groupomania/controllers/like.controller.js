const Like = require('../models/like.model');

//LIKE UN POST

exports.likePost = (req, res, next) => {
  Like.create({
    like: req.body.like,
    postId: req.params.id,
    userId: req.userId,
  })
    .then(() => res.status(201).json({ message: 'Like créé !' }))
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error });
    });
};

//VOIR TOUS LES LIKES
exports.likeGetAll = (req, res, next) => {
  Like.findAll()
    .then((likes) => res.status(201).json(likes))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: error });
    });
};
