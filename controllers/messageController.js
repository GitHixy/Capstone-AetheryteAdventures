const MessageModel = require('../models/MessageModel');


const getMessages = async (req, res) => {
    try {
        const messages = await MessageModel.find({});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages", error: error });
    }
};

const postMessage = async (req, res) => {
    try {
        const { username, messageText } = req.body;
        if (!username || !messageText) {
            return res.status(400).json({ message: "Username and message text are required" });
        }

        const newMessage = new MessageModel({ username, messageText });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: "Error posting message", error: error });
    }
}

module.exports = {getMessages, postMessage};