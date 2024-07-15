const express = require('express');
const ping = require('ping');
const statusRouter = express.Router();

const regions = [
    {
        name: 'EU',
        datacenters: [
            {name: 'Chaos', ip: '80.239.145.6'},
            {name: 'Light', ip: '80.239.145.7'},
            {name: 'Shadow', ip: '80.239.145.8'}
        ]
    },
    {
        name: 'NA',
        datacenters: [
            {name: 'Primal', ip: '204.2.29.7'},
            {name: 'Aether', ip: '204.2.29.6'},
            {name: 'Crystal', ip: '204.2.29.8'},
            {name: 'Dynamis', ip: '204.2.29.9'},
        ]
    },
    {
        name: 'JP',
        datacenters: [
            {name: 'Meteor', ip: '119.252.36.9'},
            {name: 'Elemental', ip: '119.252.36.6'},
            {name: 'Gaia', ip: '119.252.36.7'},
            {name: 'Mana', ip: '119.252.36.8'},
        ]
    },
    {
        name: 'OC',
        datacenters: [
            {name: 'Materia', ip: '153.254.80.103'}
        ]
    }
];

statusRouter.get('/server-status', async (req, res) => {
    try {
        const regionStatuses = await Promise.all(
            regions.map(async (region) => {
                const datacenterStatuses = await Promise.all(
                    region.datacenters.map(async (datacenter) => {
                        const isAlive = await ping.promise.probe(datacenter.ip);
                        return {
                            name: datacenter.name,
                            ip: datacenter.ip,
                            status: isAlive.alive ? 'online' : 'offline'
                        };
                    })
                );
                return {
                    name: region.name,
                    datacenters: datacenterStatuses
                };
            })
        );
        res.json(regionStatuses);
    } catch (error) {
        console.error('Error fetching server statuses:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = statusRouter;

