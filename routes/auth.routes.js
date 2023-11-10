const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.get('/list', authController.getUsers);

module.exports = router;