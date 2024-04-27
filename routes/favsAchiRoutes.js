const express = require('express');
const achiRouter = express.Router();
const { addAchievementToFavourites, removeAchievementFromFavourites } = require('../controllers/favsAchiController');

achiRouter.post('/users/:userId/favourites/achi', addAchievementToFavourites);
achiRouter.delete('/users/:userId/favourites/achi', removeAchievementFromFavourites);

module.exports = achiRouter;