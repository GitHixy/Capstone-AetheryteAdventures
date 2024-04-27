const express = require('express');
const fashionRouter = express.Router();
const { addFashionToFavourites, removeFashionFromFavourites } = require('../controllers/favsFashionController');

fashionRouter.post('/users/:userId/favourites/fashions', addFashionToFavourites);
fashionRouter.delete('/users/:userId/favourites/fashions', removeFashionFromFavourites);

module.exports = fashionRouter;