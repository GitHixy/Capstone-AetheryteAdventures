const UserModel = require('../models/UserModel');
const {cloudinary} = require('../config/cloudinaryConfig');
const bcrypt = require('bcrypt');

//GET USERS

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find().populate('favourites');
        res.status(200).send(users);
        
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        });        
    };
};

// GET USER BY ID

const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        .populate({
            path: 'favourites',
            populate: {path: 'achievements'}
        });
        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: 'User not found'
            });
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        });
    }
};


//CREATE USER - REGISTRATION

const createUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPW = await bcrypt.hash(req.body.password, salt);
    const result = await cloudinary.uploader.upload(req.file.path);
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPW,
        avatar: result.url,
    });
    try {
        const userToSave = await newUser.save();
        res.status(201).send({
            statusCode: 201,
            payload: userToSave
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error'
        });
    };
};

module.exports = {getUsers, createUser, getUserById};