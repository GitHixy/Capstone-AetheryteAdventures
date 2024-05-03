const express = require('express');
const {
    fetchMounts,
    fetchAchievements,
    fetchMinions,
    fetchOrchestrions,
    fetchTitles,
    fetchTriadCards,
    fetchEmotes,
    fetchFashions,
    fetchDiscordChar
  } = require('../controllers/FFXIVCollectController');
  const ffxivCollectRouter = express.Router();

  ffxivCollectRouter.get('/mounts', fetchMounts);
  ffxivCollectRouter.get('/achievements', fetchAchievements);
  ffxivCollectRouter.get('/minions', fetchMinions);
  ffxivCollectRouter.get('/orchestrions', fetchOrchestrions);
  ffxivCollectRouter.get('/titles', fetchTitles);
  ffxivCollectRouter.get('/triad/cards', fetchTriadCards);
  ffxivCollectRouter.get('/emotes', fetchEmotes);
  ffxivCollectRouter.get('/fashions', fetchFashions);
  ffxivCollectRouter.get('/discordCharacters/:discordId', fetchDiscordChar);

  module.exports = ffxivCollectRouter;