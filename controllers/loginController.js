const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// LOGIN 

const userLogin = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: 'The user does not exists!'
            });
        }

        const isPWValid = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPWValid) {
            return res.status(401).send({
                statusCode: 401,
                message: 'Unauthorized!'
            });
        }

        const token = jwt.sign(
            {username: user.username, email: user.email},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        );

        res.header('Authorization', token).status(200).send({
            statusCode: 200,
            token,
            username: user.username,
            id: user._id,
            discordId: user.discordId
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal Server Error!'
        });
    }
};

module.exports = {userLogin};