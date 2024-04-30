const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const UserModel = require('../models/UserModel'); 
const axios = require('axios');
const jwt = require('jsonwebtoken');

const initializePassport = async () => {
    passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,  
        clientSecret: process.env.DISCORD_CLIENT_SECRET,  
        callbackURL: process.env.DISCORD_CALLBACK_URL,  
        scope: ['identify', 'email']  
    }, 
     function (accessToken, refreshToken, profile, done) {
    
        UserModel.findOne({ discordId: profile.id }).then((currentUser) => {
          if (currentUser) {
            const token = jwt.sign({ discordId: currentUser.id }, `${process.env.SECRET_KEY}`, { expiresIn: '1h' });
            currentUser.token = token;
            done(null, currentUser);
          } else {
            
            new UserModel({
              username: profile.username,
              email: profile.email,
              avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
              discordId: profile.id,
            }).save().then((newUser) => {
              const token = jwt.sign({ discordId: newUser.id }, `${process.env.SECRET_KEY}`, { expiresIn: '1h' });
              newUser.token = token;
              done(null, newUser);
            });
          }
        });
      }
    ));
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};

module.exports = {initializePassport};
