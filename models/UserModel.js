const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: 3,
        maxlength: 15,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [false,'Password is required']
    },
    discordId: { 
        type: String, 
        unique: true, 
        sparse: true 
    },
    avatar: {
        type: String,
        required: false
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favourites',
        default: [],        
    }]
}, {timestamps: true, strict: true});

module.exports = mongoose.model('UserModel', userSchema, 'users');