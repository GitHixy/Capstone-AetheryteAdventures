const express = require('express');
const axios = require('axios');
const statusRouter = express.Router();

const DATA_CENTER_API_URL = 'https://api.xivstatus.com/api/data-centers';
const SERVER_API_URL = 'https://api.xivstatus.com/api/servers';

const fetchDataCenterStatus = async () => {
    try {
        const response = await axios.get(DATA_CENTER_API_URL, { timeout: 10000 });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from external API:', error.message);
        return null;
    }
};

statusRouter.get('/server-status', async (req, res) => {
    const data = await fetchDataCenterStatus();
    
    if (!data) {
        return res.status(500).json({ error: 'Error fetching data from external API' });
    }

    const regionStatuses = data.reduce((acc, server) => {
        let region = acc.find(r => r.name === server.region);
        if (!region) {
            region = { name: server.region, datacenters: [] };
            acc.push(region);
        }

        let datacenter = region.datacenters.find(dc => dc.name === server.name);
        if (!datacenter) {
            datacenter = {
                name: server.name,
                hostname: server.hostname,
                ip: server.ip_address,
                status: server.status,
                latency: server.latency
            };
            region.datacenters.push(datacenter);
        }

        return acc;
    }, []);

    res.json(regionStatuses);
});

module.exports = statusRouter;

