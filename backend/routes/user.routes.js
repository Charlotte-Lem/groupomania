const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const multer = require('../middleware/multer-config..middleware');
const auth = require('../middleware/auth.middleware');
//import du middleware password
const password = require('../middleware/password.middleware');
/*import de express-rate-limit qui permet de limiter 
les demandes d'inscription d'ume même adresse ip (5 par heures)*/
const rateLimit = require('express-rate-limit');
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // limite a 10 inscription par heure
  message:
    'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
});
/*ROUTES*/
//inscription
router.post(
  '/signup', createAccountLimiter,password,multer, userController.userSignup);
//Connexion
router.post('/login', userController.userLogin);
//modif user
router.put('/:id', auth, multer, userController.userModify);
//user
router.get('/:id', auth, multer, userController.userGet);
//Tous les Users
router.get('/', auth, multer, userController.userGetAll);
//Delete user
router.delete('/:id', auth, userController.userDelete);

module.exports = router;
