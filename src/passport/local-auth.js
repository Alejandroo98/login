const { authenticate, Strategy } = require('passport');
const passport = require('passport');
// const user = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;   
const User = require('../models/user');


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
    const user = await User.findOne({ email : email })
    if( user ){
        return done( null , false , req.flash( 'signupMessage' , 'El email ya a sido tomado' ) );//Esto sirve en caso el usuario ya existe dentro de la base de datos //Esto es gracias a el require desde el archivo index.js es decir del servidor
    }else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword( password )
        await newUser.save()
        done(null , newUser)
    }
}));

passport.use('local-signin' , new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
} , async( req , email , password , done ) => {
    const user = await User.findOne({email : email});
    if( !user ){
        return done( null , false , req.flash('signinMessage' , 'No user fund'));
    }

    if( !user.comparePassword(password) ){
        return done( null , false , req.flash('signinMessage' , 'Incorrect Password'));
    }

    done( null , user )
    
}))