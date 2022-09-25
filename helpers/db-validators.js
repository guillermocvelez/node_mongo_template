const Role = require('../models/role');
const Usuario = require('../models/usuario');



const esRoleValido = async (role = '') => {
  const existeRole = await Role.findOne({ role });
  if( !existeRole ) {
    throw new Error(` El rol ${ role } no esta registrado en la base de datos`);
  }
}

const emailExiste = async ( email) => {
  const existeEmail = await Usuario.findOne({ email });
  if( existeEmail ) {
    throw new Error(`El correo ya esta registrado`)
  }
} 

const usuarioExiste = async ( id ) => {  
  const existeUsuario = await Usuario.findOne({ _id: id }); 
  if( !existeUsuario ) {
    throw new Error(`El ID no existe`)
  } 
} 

module.exports = {
  esRoleValido,
  emailExiste,
  usuarioExiste
}