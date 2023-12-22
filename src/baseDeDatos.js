import mongoose from "mongoose";

mongoose
    .connect(process.env.BASEDEDATOS)
    .then((dato) => console.info('Conectado con la base de datos.'))
    .catch((error) => console.log('No se pudo conectar a la base de datos'));