const axios = require("axios");

const fetchMounts = async (req, res) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.FFXIV_COLLECT_BASE_URL}/mounts`,
    headers: {},
  };
  try {
    const response = await axios(config);
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to fetch mounts", details: error.message });
  }
};

const fetchAchievements = async (req, res) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.FFXIV_COLLECT_BASE_URL}/achievements`,
    headers: {},
  };
  try {
    const response = await axios(config);
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .json({
        message: "Failed to fetch achievements",
        details: error.message,
      });
  }
};

const fetchTitles = async (req, res) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.FFXIV_COLLECT_BASE_URL}/titles`,
    headers: {},
  };
  try {
    const response = await axios(config);
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to fetch titles", details: error.message });
  }
};

const fetchMinions = async (req, res) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.FFXIV_COLLECT_BASE_URL}/minions`,
    headers: {},
  };
  try {
    const response = await axios(config);
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to fetch minions", details: error.message });
  }
};

const fetchOrchestrions = async (req, res) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.FFXIV_COLLECT_BASE_URL}/orchestrions`,
    headers: {},
  };
  try {
    const response = await axios(config);
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .json({
        message: "Failed to fetch orchestrions",
        details: error.message,
      });
  }
};

const fetchTriadCards = async (req, res) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.FFXIV_COLLECT_BASE_URL}/triad/cards`,
    headers: {},
  };
  try {
    const response = await axios(config);
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to fetch triad cards", details: error.message });
  }
};

const fetchEmotes = async (req, res) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.FFXIV_COLLECT_BASE_URL}/emotes`,
    headers: {},
  };
  try {
    const response = await axios(config);
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to fetch emotes", details: error.message });
  }
};

const fetchFashions = async (req, res) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.FFXIV_COLLECT_BASE_URL}/fashions`,
    headers: {},
  };
  try {
    const response = await axios(config);
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to fetch Fashions", details: error.message });
  }
};

const fetchDiscordChar = async (req, res) => {
    const {discordId} = req.params;
    const url = `${process.env.FFXIV_COLLECT_BASE_URL}/users/${discordId}`
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {},   
  };
  console.log("Making API request to:", url);
  try {
    const response = await axios(config);
    res.send(response.data);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to fetch Discord Character", details: e.message });
  }
}

module.exports = {
  fetchMounts,
  fetchAchievements,
  fetchMinions,
  fetchOrchestrions,
  fetchTitles,
  fetchTriadCards,
  fetchEmotes,
  fetchFashions,
  fetchDiscordChar
};
