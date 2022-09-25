const { response } = require('express');
const bcryptjs = require('bcryptjs')

 const Usuario = require('../models/usuario');
 


const usuariosGet = async ( req, res = response ) => {

  const { limit = 5, from = 0, state  } = req.query;

  // const usuarios = await Usuario.find({state})
  //   .skip(Number(from))
  //   .limit(Number(limit));

  

  const [ total, usuarios] = await Promise.all([
    Usuario.countDocuments({state}),
    Usuario.find({state})
      .skip(Number(from))
      .limit(Number(limit))
  ]);

  
  res.json( {         
    total,
    usuarios
  })
}

const  usuariosPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const usuario = new Usuario( {
    name,
    email,
    password,
    role    
  });
  //Verificar si el correo existe

  

  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );
  //Guardar Db
  await usuario.save();
  res.json( {        
    msg: 'post API - Controlador',
    usuario
  })
}



const usuariosPut = async (req, res = response) => {
  
  const { id }= req.params;  
  const { _id,password,google,correo, ...rest } = req.body;

// TODO validar contra db
if( password ) {
  const salt = bcryptjs.genSaltSync();
  rest.password = bcryptjs.hashSync( password, salt );
}

const usuarioDB = await Usuario.findByIdAndUpdate(id, rest);


  res.json( {        
    msg: 'Usuario Actualizado con éxito',
    usuarioDB
  })
}

const usuariosPatch = (req, res = response) => {
  res.json( {        
    msg: 'patch API - Controlador'
  })
}

const usuariosDelete = async (req, res = response) => {

  const { id } = req.params;

  //const uid = req.uid;

  

  const usuario = await Usuario.findByIdAndUpdate( id, { state: false });
  const usuarioAutenticado = req.usuario;

  console.log(id);
  res.json( {            
    usuario,
    usuarioAutenticado
  })
}


module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPatch,
  usuariosPost,
  usuariosDelete,  
}