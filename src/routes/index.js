const express = require('express');
const router = express.Router(); //Aqui definimos las rutas de nuestro servidor
const passport = require('passport');

router.get('/' , ( req , res , next ) => { //Esto es para la pagina principal
    res.render('index')
})


/* registrarse */
router.get('/signup' , ( req , res , next ) => { //Esta es la ruta de en caso haya una pagina para registrarnos
    res.render('signup')
})

router.post('/signup' , passport.authenticate('local-signup' , {
    successRedirect : '/profile', //Si todo esta en orden a donde lo quieres enviar. En este caso a la carpeta principal
    failureRedirect : '/signup', //Si no pues lo mandaremos a esta ventana
    passReqToCallback : true
})) //Este validara con el metodo que hemos creado en el archivo que esta en passport y se llama local-auth.js  -  //Con el router de arriba enviamos los datos y este de aqui los va a recibir es decir a escuchar esos datos del usuario
/* fin registrarse */

/* Login */
router.get('/signin' , ( req , res , next ) => { //Lo amismo de arriba es decir con esta ruta le voy a enviar una ventana , dnde ingresa su correco y contraseña
     
})

router.post('/signin' , ( req , res , next ) => {  //Y con esta ruta escuchamos eso datos y los validamos si sus datos estan correctossi existen etc

})
/* fin login */


/* Una vez ingresao el usuario le llevara hasta el perfil de su usuario */
router.get('/profile' , ( req , res , next ) => {
    res.render('profile')
})
/* FIN Una vez ingresao el usuario le llevara hasta el perfil de su usuario */

module.exports = router