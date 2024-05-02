const express = require('express');
const ffxivRouter = express.Router();
const {searchFC} = require('../controllers/ffxivController');

ffxivRouter.get('/fc', searchFC);

module.exports = ffxivRouter;