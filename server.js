const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const dbConnection = require('./config/dbConfig');
const {cloudinaryConfig} = require('./config/cloudinaryConfig');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const lodestoneNewsRoutes = require('./routes/lodestoneProxyRoutes');
const ffxivCollectRoutes = require('./routes/FFXIVProxyRoutes');
const loreRoutes = require('./routes/GPTRoutes');
const allFavsRoutes = require('./routes/allFavsRoutes');
const favsAchiRoutes = require('./routes/favsAchiRoutes');
const favsTitleRoutes = require('./routes/favsTitleRoutes');
const favsMountRoutes = require('./routes/favsMountRoutes');
const favsMinionRoutes = require('./routes/favsMinionRoutes');
const favsOrchestrionRoutes = require('./routes/favsOrchestrionRoutes');
const favsCardRoutes = require('./routes/favsCardRoutes');
const favsEmoteRoutes = require('./routes/favsEmoteRoutes');
const favsFashionRoutes = require('./routes/favsFashionRoutes');




const PORT = process.env.PORT || 8080;
cloudinaryConfig();
const app = express();
app.use(cors({
    origin: ['https://aetheryte-adventures.com']
}));


// Middleware

app.use(express.json());
app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/', lodestoneNewsRoutes);
app.use('/', ffxivCollectRoutes);
app.use('/api', loreRoutes);
app.use('/', allFavsRoutes);
app.use('/', favsAchiRoutes);
app.use('/', favsTitleRoutes);
app.use('/', favsMountRoutes);
app.use('/', favsMinionRoutes);
app.use('/', favsOrchestrionRoutes);
app.use('/', favsCardRoutes);
app.use('/', favsEmoteRoutes);
app.use('/', favsFashionRoutes);






//Database Connection

dbConnection();

app.listen(PORT, () => console.log(`Server connected and listening on Port: ${PORT}`));
