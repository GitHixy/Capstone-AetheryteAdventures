const express = require('express');
const achiRouter = express.Router();
const { addAchievementToFavourites } = require('../controllers/favsController');

achiRouter.post('/users/:userId/favourites/achi', addAchievementToFavourites);

module.exports = achiRouter;