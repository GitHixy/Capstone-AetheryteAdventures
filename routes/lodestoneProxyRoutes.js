const express = require('express');
const {fetchNews} = require('../controllers/lodestoneNewsController');
const lodestoneNewsRouter = express.Router();

lodestoneNewsRouter.get('/news', fetchNews);

module.exports = lodestoneNewsRouter;