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
const favsRoutes = require('./routes/favsRoutes');



const PORT = process.env.PORT || 8080;
cloudinaryConfig();
const app = express();
app.use(cors());

// Middleware

app.use(express.json());
app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/', lodestoneNewsRoutes);
app.use('/', ffxivCollectRoutes);
app.use('/api', loreRoutes);
app.use('/', favsRoutes);



//Database Connection

dbConnection();

app.listen(PORT, () => console.log(`Server connected and listening on Port: ${PORT}`));
