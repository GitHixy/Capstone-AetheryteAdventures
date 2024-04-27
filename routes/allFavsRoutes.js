const express = require('express');
const allFavsRouter = express.Router();
const { getFavouritesByUserId } = require('../controllers/allFavsController');

allFavsRouter.get('/users/:userId/favourites', getFavouritesByUserId);

module.exports = allFavsRouter;