const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const dbConnection = require('./config/dbConfig');
const {cloudinaryConfig} = require('./config/cloudinaryConfig');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const lodestoneNewsRoutes = require('./routes/lodestoneProxyRoutes');

const PORT = process.env.PORT || 8080;
cloudinaryConfig();
const app = express();
app.use(cors());

// Middleware

app.use(express.json());
app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/', lodestoneNewsRoutes);

//Database Connection

dbConnection();

app.listen(PORT, () => console.log(`Server connected and listening on Port: ${PORT}`));
