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

const getID = async (req, res) => {

const {player, server} = req.query;
try {
  const response = await axios.get(`${process.env.FFXIV_KALILISTIC_BASE_URL}/player?playerName=${player}&worldName=${server}`);
  const lodestoneId = response.data.lodestoneId;

  const lodestoneChar = await axios.get(`${process.env.FFXIV_COLLECT_BASE_URL}/characters/${lodestoneId}`)
  res.send({
    lodestoneChar: lodestoneChar.data
  });
} catch (e) {
  res
      .status(500)
      .json({ message: "Failed to fetch ID Character", details: e.message });
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
  getID
};
