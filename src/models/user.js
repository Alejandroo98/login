const moongose = require('mongoose');
const { Schema } = moongose
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

const userSchema = new Schema({
    email : String,
    password : String
});

//Para encriptar tu contraseña
userSchema.methods.encryptPassword = ( password ) => { // encryptPassword es el nombre que yo le eh puesto asi que puedes cambiarlo a tu gusto
    return bcrypt.hashSync( password , bcrypt.genSaltSync(10) ) // Todos estas son palabras reservadas; El numero 10 es la cantidad de cifrados que va a tener esta contraseñ entre mas alto sea el numero mas robusta
};

//Para desecnriptar la contraseña y saber si coincide o no
userSchema.methods.comparePassword = function ( password ){ // <-- Si te da errar cambio a este tipo de funcion  ""= funcion ( password ){}""
    return bcrypt.compareSync( password , this.password )
}

module.exports = moongose.model( 'users' , userSchema ); //users es el nombre de la collecion con la que guardara los datos dentro de la base de datos