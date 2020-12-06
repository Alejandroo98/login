//Codigo del servidor
const express = require ('express');
const  engine = require('ejs-mate')
const path = require('path'); //Sirve para unir directorios o escribir una ruta y que sea multiplataforma
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//Inicialicacion
const app = express();  //Ejecuto express y lo gardo en una constante
require('./data-base')
require('./passport/local-auth')

//Configurarciones 
app.set('views' , path.join(__dirname , 'views'))
app.engine('ejs' , engine); //Aqui lo creamos
app.set('view engine' , 'ejs'); // Aqui lo utlizamos
app.set('port' , process.env.PORT || 3000 )

//middlewares => Son funciones que se ejecutan antes de que pasen a las rutas 
app.use(morgan('dev'))
app.use(express.urlencoded({extended : false})); //Esos datos se almacenaran en una constante llamada reques body ( req.body )
app.use(session({
    secret : 'myscretsession', //Aqui entre las comillas tenemmos que darle un streng que no sea dificil de adivinar, y logicamente lo creas tu
    resave : false,
    saveUninitialized : false
}))
app.use( flash() )
app.use( passport.initialize() );
app.use( passport.session() );

app.use(( req , res , next ) => {  //Esto es un middlewate pero este lo voy a escribir yo
    app.locals.signupMessage =  req.flash('signupMessage'); //Esto es un nombre clave que esta en el archivo local-auth.js //signupMessage es un nombre que eh me e inventado yo
    app.locals.signinMessage = req.flash('signinMessage') // Igual que arriba el primer signinMessage es un nombre que me invente ahora y el segundo signinMessage viene del archivo local-auth
    app.locals.user = req.user;
    next(); //Si no ponemos esto el navegador se quedara cargando, esto sirve para continuar con el resto del codigo
});


//Routs
app.use('/' , require('./routes/index'));

//Empezando el servidor
app.listen( app.get('port') , () => {
    console.log('Puerto conectado en ' , app.get('port'));
} )