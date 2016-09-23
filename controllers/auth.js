var crypto        = require('crypto');
var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}

function createSalt(){
    return crypto.randomBytes(32).toString('base64');
}

passport.createUser = function(req,res){
    var username = req.body.username;
    var password =  req.body.password;
    
    var salt = createSalt();
    var hashedPassword = hashPassword(password,salt);
    var user = new User.user({username: username, password: hashedPassword, salt: salt });
    user.save().then(function() {
      console.log("User created");
      res.redirect('/dashboard/');
    }, function(error) {
      console.error(error);
      res.redirect('/dashboard/login');
    });
};

passport.use(new LocalStrategy(function(username, password, done) {
  new User.user({username: username}).fetch().then(function(user){
    if (!user) {
      return done(null, false);
    }

    var hash = hashPassword(password, user.get('salt'));
    if (user.get('password') === hash) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }).catch(function(err){
    console.error(err);
    done(null, false);
  });

}));

passport.serializeUser(function(user, done) {
  return done(null, user.get('id'));
});

passport.deserializeUser(function(id, done) {
  new User.user({id: id}).fetch().then(function(user){
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

passport.checkAuth = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/dashboard/login');
  }
};

module.exports = passport;