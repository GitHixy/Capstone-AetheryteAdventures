const express = require('express');
const {fetchNews, fetchMaintenance} = require('../controllers/lodestoneNewsController');
const lodestoneNewsRouter = express.Router();

lodestoneNewsRouter.get('/news', fetchNews);
lodestoneNewsRouter.get('/maintenance', fetchMaintenance);

module.exports = lodestoneNewsRouter;