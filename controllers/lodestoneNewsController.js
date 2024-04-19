const axios = require('axios');

const fetchNews = async (req, res) => {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.LODESTONE_NEWS,
        headers: {}
    };
    try {
        const response = await axios(config);
        res.send(response.data);
    } catch (e) {
        res.status(500).json({ message: 'Failed to fetch news', details: error.message });
    }
};

module.exports = { fetchNews };