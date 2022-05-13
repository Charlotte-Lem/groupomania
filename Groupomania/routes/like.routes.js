const express = require('express');
const router = express.Router();

const likeController = require('../controllers/like.controller');
const auth = require('../middleware/auth.middleware');

router.post('/post/:id ', auth, likeController.likePost);
router.get('/post/:id', auth, likeController.likeGetAll);

module.exports = router;
