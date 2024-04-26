const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const {getUsers, createUser, getUserById} = require('../controllers/userController');


userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUserById);
userRouter.post('/createUser', upload.single('avatar'), createUser);

module.exports = userRouter;