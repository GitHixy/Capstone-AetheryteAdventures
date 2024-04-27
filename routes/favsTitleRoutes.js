const express = require('express');
const titleRouter = express.Router();
const { addTitleToFavourites, removeTitleFromFavourites } = require('../controllers/favsTitleController');

titleRouter.post('/users/:userId/favourites/titles', addTitleToFavourites);
titleRouter.delete('/users/:userId/favourites/titles', removeTitleFromFavourites);

module.exports = titleRouter;