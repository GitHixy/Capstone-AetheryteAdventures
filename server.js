const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = require('./config/dbConfig');
const {cloudinaryConfig} = require('./config/cloudinaryConfig');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');

const PORT = process.env.PORT || 8080;
cloudinaryConfig();
const app = express();

// Middleware

app.use(express.json());
app.use('/', userRoutes);
app.use('/', loginRoutes);

//Database Connection

dbConnection();

app.listen(PORT, () => console.log(`Server connected and listening on Port: ${PORT}`));
