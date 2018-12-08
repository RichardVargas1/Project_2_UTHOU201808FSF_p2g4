// This bit of code helps to route logins & logouts of users

const passport = require('passport');

module.exports = function(app){

  app.get('/login', function(req, res) {
    res.render('login');
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

  app.get('/logout', function(req, res){
    //removes from client broswer cookies
    req.logout();
    //removes us from the database
    req.session.destroy();
    res.redirect('/');

  });

}