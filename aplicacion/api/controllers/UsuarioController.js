/**
 * Created by USRDEL on 19/6/17.
 */

module.exports = {
  welcome: function (req, res) {
    sails.log.info(req.method);
    if (req.method == "POST") {
      return res.json({ saludo: "hola" });
    }
    else {
      return res.send("Error");
    }
  },
  bienvenido: function (req, res) {

    return res.send("Hola");
  },


  crearUsuarioQuemado: function (req, res) {
    var parametros = req.allParams();
    sails.log.info("Parametros", parametros);
    var nuevoUsuario = {
      nombres: parametros.nombres,
      password: parametros.password
    };

    Usuario.create(nuevoUsuario)
      .exec(function (error, usuarioCreado) {
        if (error) {
          return res.serverError(error);
        }
        else {
          return res.redirect("https://www.youtube.com");

        }
      });
  },
  homepage: function (req, res) {
    var parametros = req.allParams();
    sails.log.info("Parametros", parametros);

    //let where = {};
    Usuario
      .find()
      .where({
        and: [
          {
            nombres: {
              contains: parametros.busquedanombre
            }
          },
          {
            apellidos: {
              contains: parametros.busquedapwd
            }
          }
        ]
      })
      .exec(function (err, usuarios) {
        if (err){
          return res.negotiate(err);
          res.redirect('https://www.youtube.com');
        }
        else{
          res.redirect('https://www.facebook.com');
        }
      });
  },
  crearUsuario: function (req, res) {
    return res.view('crearusuario');
  },
  login: function (req, res) {

    var nombres = req.param('nombres');
    var password = req.param('password');

      Usuario.find({
        nombres: nombres,
        password: password
      }).exec(function (err, user) {
        if (err) {
          res.send("credenciales invalidas nombre o password",500);
          // TODO: redirect, storing an error in the session
        }
        if (user) {
          req.session.authenticated = true;
          req.session.User = user;

          // Redirect to protected area
          res.redirect('https://www.facebook.com');
        }

    });
  },
  encontrarUsuario: function (req, res) {
    Usuario.find({nombres:'Katherine'}).exec(function (err, usersNamedFinn){
      if (err) {
        return res.serverError(err);
      }
      sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
      return res.json(usersNamedFinn);
    });
  },


};
