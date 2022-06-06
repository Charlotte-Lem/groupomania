const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const auth = require('../middleware/auth.middleware');
//CREER UN COMMENTAIRE
router.post('/comment/:id', auth, commentController.createComment);
//MODIF UN COMMENTAIRE
router.put('/comment/:id', auth, commentController.modifyComment);
//DELETE UN COMMENTAIRE
router.delete('/comment/:id', auth, commentController.deleteComment);
// //TROUVER UN COMM
router.get('/', auth, commentController.getOneComment);
// //TROUVER TOUS LES COMM
router.get('/comment/', auth, commentController.getAllComment);
module.exports = router;
