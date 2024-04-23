const express = require('express');
const loreRouter = express.Router();
const {generateLore} = require('../controllers/GPTController');

loreRouter.post('/generateLore', generateLore);

module.exports = loreRouter;