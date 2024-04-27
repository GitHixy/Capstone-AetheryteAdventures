const express = require('express');
const orchestrionRouter = express.Router();
const { addOrchestrionToFavourites, removeOrchestrionFromFavourites } = require('../controllers/favsOrchestrionController');

orchestrionRouter.post('/users/:userId/favourites/orchestrions', addOrchestrionToFavourites);
orchestrionRouter.delete('/users/:userId/favourites/orchestrions', removeOrchestrionFromFavourites);

module.exports = orchestrionRouter;