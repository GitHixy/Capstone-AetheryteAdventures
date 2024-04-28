const express = require('express');
const messageRouter = express.Router();
const {getMessages, postMessage} = require('../controllers/messageController');


messageRouter.get('/messages', getMessages);

messageRouter.post('/messages', postMessage);


module.exports = messageRouter;