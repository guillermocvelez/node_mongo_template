const { Router } = require('express');
const { check } = require('express-validator');

const { 
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,    
  } = require('../controllers/usuarios.controller');

const { esRoleValido, emailExiste, usuarioExiste } = require('../helpers/db-validators');
const { 
    validarCampos,
    validarJWT, 
    esAdminRole,
    tieneRole
  } = require('../middlewares')


const router = Router();

router.get('/', usuariosGet );



router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio y más de 6 letras').isLength({ min: 6 }),
  check('email', 'El valor correo ingresado no es valido').isEmail(),  
  check('email').custom( emailExiste ),
  check('role').custom( esRoleValido ),
  validarCampos
] ,usuariosPost);

router.put('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom( usuarioExiste ),
  check('role').custom( esRoleValido ),
  validarCampos
],usuariosPut);


router.patch('/', usuariosPatch );
router.delete('/:id', [
  validarJWT,
  //esAdminRole,
  tieneRole('ADMIN_ROLE'),
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom( usuarioExiste ),
  validarCampos
] ,usuariosDelete );









module.exports = router;