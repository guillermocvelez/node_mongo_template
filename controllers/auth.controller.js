const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/generarJWT');
const Usuario = require('../models/usuario');

const login = async (req,res = response ) => {

  const { email, password } = req.body;

  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if( !usuario ) {
      return res.status(400).json({
        msg: 'EL usuario no existe'
      })
    }

    //Verificar si usuario activo

    if( !usuario.state ) {
      return res.status(400).json({
        msg: 'El usuario esta inactivo'
      })
    }


    //verificar contraseña
    const validPassword = await bcryptjs.compareSync( password, usuario.password);
    if ( !validPassword ){
      return res.status(400).json({
        msg: 'Password es incorrecto'
      })
    }


    //generarjwt
    const token = await generarJWT( usuario.id );
    res.json({
      usuario,
      token
    })

  } catch(err) {
    console.log(err);
    return res.status(500).json({
      msg: 'Algo salio mal',      
    })
  };  
}

module.exports = {
  login
}