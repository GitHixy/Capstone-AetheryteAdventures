const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const {getUsers, createUser} = require('../controllers/userController');

//Routes

userRouter.get('/users', getUsers);
userRouter.post('/createUser', upload.single('avatar'), createUser);

module.exports = userRouter;