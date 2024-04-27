const express = require('express');
const cardRouter = express.Router();
const { addCardToFavourites, removeCardFromFavourites } = require('../controllers/favsCardController');

cardRouter.post('/users/:userId/favourites/cards', addCardToFavourites);
cardRouter.delete('/users/:userId/favourites/cards', removeCardFromFavourites);

module.exports = cardRouter;