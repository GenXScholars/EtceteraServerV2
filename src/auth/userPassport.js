const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../app/models/userModel");
//Create a passport middleware to handle user registration
// passport.use('signup', new localStrategy({
//   usernameField : 'username',
//   passwordField : 'password'
// }, async (username, password, done) => {
//     try {
//       //Save the information provided by the user to the the database
//       const user = await User.create({ username, password });
//       //Send the user information to the next middleware
//       return done(null, user);
//     } catch (error) {
//       done(error);
//     }
// }));


// utility functions
function isValidPassword(password, dbPassword){
  bcrypt.compare(password, dbPassword).then((res) => {
    if(res){
      return true;
    } else {
      return false;
    }
})
}

//Create a passport middleware to handle User login
let userLoginStrategy = function(){
  passport.use('login', new localStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    
      //Find the user associated with the username provided by the user
      const user = await User.findOne({ username : 'username' });
      if( !user ){
       
        //If the user isn't found in the database, return a message
        return done(null, false);
      }
      //Validate password and make sure it matches with the corresponding hash stored in the database
      //If the passwords match, it returns a value of true.
      
        console.log("passport user " + " " + user);
        const validate = await isValidPassord(password, user.password);
        if( !validate ){
          return done(null, false);
        }
        //Send the user information to the next middleware
        return done(null, user);
      
     
    } 
  ));
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
   
  passport.deserializeUser(function(_id, done) {
    User.findById(_id, function (err, user) {
      done(err, user);
    });
  });
}


module.exports = 
  userLoginStrategy();
