const express = require('express');
const minionRouter = express.Router();
const { addMinionToFavourites, removeMinionFromFavourites } = require('../controllers/favsMinionController');

minionRouter.post('/users/:userId/favourites/minions', addMinionToFavourites);
minionRouter.delete('/users/:userId/favourites/minions', removeMinionFromFavourites);

module.exports = minionRouter;