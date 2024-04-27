const express = require('express');
const emoteRouter = express.Router();
const { addEmoteToFavourites, removeEmoteFromFavourites } = require('../controllers/favsEmoteController');

emoteRouter.post('/users/:userId/favourites/emotes', addEmoteToFavourites);
emoteRouter.delete('/users/:userId/favourites/emotes', removeEmoteFromFavourites);

module.exports = emoteRouter;