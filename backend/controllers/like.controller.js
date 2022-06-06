const Likes = require('../models/like.model');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const jwt = require('jsonwebtoken');
//LIKE UN POST

exports.likePost = async (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];
  let decodedToken = jwt.verify(token, '${process.env.TOKEN}');
  const PostId = req.body.postPostId;
  const UserId = decodedToken.userId;
  try {
    const found = await Likes.findOne({
      where: {
        postPostId: PostId,
        userId: UserId,
      },
    });
   
    if (found) {
      await found.destroy();
      res.status(200).json({ message: 'like removed from post' });
    }
    // sinon, ajouter le like
    else {
      const likes = await Likes.create({
        postPostId: PostId,
        userId: UserId,
      });
      res.status(201).json({ likes, message: 'like added to post' });
    }
  } catch (error) {
    res.status(400).json({ message: 'error ' + error });
  }

};

//VOIR TOUS LES LIKES
exports.getLikes = (req, res, next) => {
    Likes.findAll({ include: User })
    .then((likes) => res.status(201).json({likes}))
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: error });
    });
};

