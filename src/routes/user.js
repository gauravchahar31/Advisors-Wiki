const express = require('express')
const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.createNewUser);
router.post('/login', userController.authenticateUser);
router.get('/adminPage', userController.adminPage);


module.exports = router;