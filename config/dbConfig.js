const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_DB_URL)

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database connection error!'));
    db.once('open', () => {
        console.log('Database successfully connected!');
    });
}

module.exports = dbConnection;