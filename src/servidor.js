import express from "express";
import enrutadorUsuarios from './rutas/rutaUsuarios.js';
import enrutadorRegalos from './rutas/rutaRegalos.js'

const servidor = express();
const puerto = process.env.PUERTO;

servidor.set('port', puerto);

servidor.use(express.json());
servidor.use('/usuarios/', enrutadorUsuarios);
servidor.use('/regalos/', enrutadorRegalos);

servidor.get('/', (solicitud, respuesta) =>{
    respuesta.json({mensaje: 'hola desde la raiz.'})
});

export default servidor;