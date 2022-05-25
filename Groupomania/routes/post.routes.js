const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

const multer = require('../middleware/multer-config..middleware');
const auth = require('../middleware/auth.middleware');

/*ROUTES CRUD */
router.post('/', auth, multer, postController.createPost);
router.get('/:id', auth, postController.readOnePost);
router.get('/', auth, postController.readAllPost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, multer, postController.deletePost);

module.exports = router;
