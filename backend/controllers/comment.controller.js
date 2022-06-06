const Comment = require('../models/comment.model');
const User = require('../models/user.model');

//CREER UN COMM
exports.createComment = (req, res, next) => {
  const comment = new Comment({
    ...req.body,
    postId: req.params.postPostId,
    userId: req.params.id,
  });
  comment
    .save()
    .then((Comment) => res.status(200).json({ Comment }))
    .catch((error) => {
      console.log(error);
      res.status(401).json({ message: error });
    });
};
//SUPPRIMER UN COMM
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { commentId: req.params.id } })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
    .catch((error) => res.status(400).json({ error }));
};

//VOIR UN COMM
exports.getOneComment = (req, res, next) => {
  Comment.findByPk({ where: { id: req.params.id } })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};

//VOIR TOUS LES COMM
exports.getAllComment = (req, res, next) => {
  Comment.findAll({
    raw: true,
    include: {
      model: User,
    },
    order: [['commentId', 'DESC']],
  })
    .then((comments) => res.status(201).json(comments))
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: error });
    });
};

//MODIFIER UN COMM
exports.modifyComment = (req, res, next) => {
  const updateComment = req.body;

  Comment.update(updateComment, { where: { commentId: req.params.id } })
    .then(() => res.status(201).json({ message: 'Commentaire a été modifié' }))
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: error });
    });
};
