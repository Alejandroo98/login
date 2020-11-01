const passport = require('passport');
// const user = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;   

const User = require('../models/user')

//Eso es para serializar
passport.serializeUser(( user , done ) => {
    done( null , user.id );
}); //Esto servira para guardar la session una ves iniciada

//Esto es para desearilizar
passport.deserializeUser ( async( id , done ) => {
    const user = await User.findById( id )
    done( null , user )
})

passport.use('local-signup' , new LocalStrategy ( {
    usernameField : 'email', //email es el name del input 
    passwordField : 'password',
    passReqToCallback : true
} , async( req , email , password , done ) => {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword( password )
    await newUser.save()
    done(null , newUser)
}))