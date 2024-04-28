const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    messageText: {
        type: String,
        required: true,
    }
}, {timestamps: true, strict: true});

module.exports = mongoose.model('MessageModel', messageSchema, 'messages');