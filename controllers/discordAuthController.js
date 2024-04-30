const passport = require('passport');
const jwt = require('jsonwebtoken');


exports.loginWithDiscord = passport.authenticate('discord');


exports.discordAuthCallback = (req, res, next) => {
    
  passport.authenticate('discord', (err, user, info) => {
    if (err || !user) {
      return res.redirect(`${process.env.BASE_REDIRECT_URL}`);
    }
    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }
      
      const secret = process.env.SECRET_KEY 
      const token = jwt.sign({ discordId: user.id }, secret, { expiresIn: '1h' });
      const id = user.id
      const username = user.username

      return res.redirect(`${process.env.BASE_REDIRECT_URL}/success?auth=${token}&id=${id}&username=${username}`);
    });
  })(req, res, next);
};

exports.getProfile = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('You are not authenticated');
    }
    res.send(req.user);  
};









