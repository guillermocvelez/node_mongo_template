const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config.db');


class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Rutas
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';

    //conectar a DB
    this.connectDB()


    //Middlewares
    this.middlewares();
    //Rutas de la app
    this.routes();
  }

  async connectDB(){
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use( express.json() )
    
    //Directorio público    
    this.app.use( express.static('public'));
  }

  routes() {
    this.app.use( this.authPath, require('../routes/auth.routes'));
    this.app.use(`${this.usuariosPath}`, require('../routes/user.routes'))
  };

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en', this.port);
    });
  }

}


module.exports = Server;