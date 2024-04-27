const express = require('express');
const mountRouter = express.Router();
const { addMountToFavourites, removeMountFromFavourites } = require('../controllers/favsMountController');

mountRouter.post('/users/:userId/favourites/mounts', addMountToFavourites);
mountRouter.delete('/users/:userId/favourites/mounts', removeMountFromFavourites);

module.exports = mountRouter;