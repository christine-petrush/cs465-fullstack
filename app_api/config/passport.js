const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
// const User = mongoose.model('users');
const User = require('../models/user'); 

passport.use(new LocalStrategy(
 {
   usernameField: 'email'
 },
 async(username, password, done) => {
   const q = await User
         .findOne({ email: username })
         .exec();

         //Uncomment the following line to show results of querey
         //on the console
         //console.log(q);

   //User.findOne({ email: username }, (err, user) => {
     //if (err) { return done(err); }
     if (!q) 
     {
       return done(null, false, { message: 'Incorrect username.'});
     }
     if (! User.validPassword(password)) 
     {
       return done(null, false, { message: 'Incorrect password.'});
     }
     return done(null, User);
     
   //});
 }
));