const express = require('express');
const router = express.Router();
const authController = require('../controllers/discordAuthController');


router.get('/auth/discord', authController.loginWithDiscord);


router.get('/auth/discord/callback', authController.discordAuthCallback);


router.get('/profile', authController.getProfile);

module.exports = router;
