const mongoose = require('mongoose');

const favouritesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    achievements: [{ type: String }], 
    titles: [{ type: String }],
    mounts: [{ type: String }],
    minions: [{ type: String }],
    orchestrions: [{ type: String }],
    triadCards: [{ type: String }],
    emotes: [{ type: String }],
    fashionAccessories: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Favourites', favouritesSchema);
