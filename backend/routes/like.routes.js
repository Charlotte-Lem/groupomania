const express = require('express');
const router = express.Router();

const likeController = require('../controllers/like.controller');

const auth = require('../middleware/auth.middleware');

//poster un like sur un post avec son id
router.post('/:id', auth, likeController.likePost);

//trouver les likes d'un post
router.get('/getLikes', likeController.getLikes);

module.exports = router;
