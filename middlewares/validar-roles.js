const { response } = require("express");


const esAdminRole = (req, res = response, next) => {

  if( !req.usuario){
    return res.status(500).json({
      msg: 'Se quiere verificar el rol sin validar el token'
    });
  }

  const { role, name } = req.usuario;

  if ( role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `${name} no es administrador`
    })
  }

  next();
}

const tieneRole = ( ...roles ) => {

  return (req,res = response,next) => {
    
    if( !req.usuario){
      return res.status(500).json({
        msg: 'Se quiere verificar el rol sin validar el token'
      });
    }

    if( !roles.includes ( req.usuario.role )){
      return res.status(401).json({
        msg: 'EL usuario no tiene permisos para esta ruta'
      })
    }

    next();
  }

}

module.exports = {
  esAdminRole,
  tieneRole
}