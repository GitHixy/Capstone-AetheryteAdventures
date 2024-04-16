const express = require('express');
const loginRouter = express.Router();
const {userLogin} = require('../controllers/loginController');

loginRouter.post('/login', userLogin);

module.exports = loginRouter;