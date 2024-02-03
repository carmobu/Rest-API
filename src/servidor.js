import express from "express";
import enrutadorUsuarios from './rutas/rutaUsuarios.js';
import enrutadorRegalos from './rutas/rutaRegalos.js'
import enrutadorSesion from "./rutas/rutaSesion.js";
import cors from "cors";

const servidor = express();
const puerto = process.env.PUERTO;

servidor.set('port', puerto);

servidor.use(cors());
servidor.use(express.json());
servidor.use('/regalos/', enrutadorRegalos);
servidor.use('/usuarios/', enrutadorUsuarios);
servidor.use('/sesion/', enrutadorSesion);

servidor.get('/', (solicitud, respuesta) =>{
    respuesta.json({mensaje: 'hola desde la raiz.'})
});

export default servidor;