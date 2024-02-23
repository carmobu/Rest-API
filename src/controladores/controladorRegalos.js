import ModeloRegalo from '../modelos/modeloRegalo.js';

// CRUD: Create, Read, Update, Delete => Crear, Leer, Actualizar, Eliminar
const ControladorRegalos = {
  crearRegalo: async (solicitud, respuesta) => {
    try {
      const nuevoRegalo = new ModeloRegalo(solicitud.body);
      const regaloCreado = await nuevoRegalo.save();
      if (regaloCreado._id) {
        respuesta.json({
          resultado: 'bien',
          mensaje: 'registo creado creado',
          datos: regaloCreado.id,
        });
      }
    } catch (error) {
      respuesta.json({
        resultado: 'mal',
        mensaje: 'ocurrió un error',
        datos: error,
      });
    }
  },
  leerRegalos: async (solicitud, respuesta) => {
    try {
      const todosLosRegalos = await ModeloRegalo.find();
      const regalos = [];
      for (let i = 0; i < todosLosRegalos.length; i++) {
        const objeto = {
          id: todosLosRegalos[i]._id,
          peso: todosLosRegalos[i].peso,
          nota: todosLosRegalos[i].nota,
        };
        regalos.push(objeto);
      }
      respuesta.json({
        resultado: 'bien',
        mensaje: 'todos los regalos',
        datos: todosLosRegalos,
      });
    } catch (error) {
      respuesta.json({
        resultado: 'mal',
        mensaje: 'ocurrió un error',
        datos: error,
      });
    }
  },
  leerRegalo: async (solicitud, respuesta) => {
    try {
      const id = solicitud.params.id;
      const regalos = await ModeloRegalo.find({ id: id }); // Consulta para encontrar los regalos con el mismo ID
      if (regalos.length === 0) {
        respuesta.json({
          resultado: 'mal',
          mensaje: 'No se encontraron regalos con ese ID',
          datos: null,
        });
      } else {
        respuesta.json({
          resultado: 'bien',
          mensaje: 'Regalo(s) leído(s)',
          datos: regalos.map(regalo => ({
            id: regalo._id,
            fecha: regalo.createdAt.toLocaleString(),
            peso: regalo.peso,
            nota: regalo.nota,
            biceps: regalo.biceps,
            cintura: regalo.cintura,
            muslos: regalo.muslos,
            cadera: regalo.cadera,
          })),
        });
      }
    } catch (error) {
      respuesta.json({
        resultado: 'mal',
        mensaje: 'Ocurrió un error',
        datos: error,
      });
    }
  },
  actualizarRegalo: async (solicitud, respuesta) => {
    try {
      const actualizado = await ModeloRegalo.findByIdAndUpdate(
        solicitud.params.id,
        solicitud.body
      );
      respuesta.json({
        resultado: 'bien',
        mensaje: 'regalo actualizado',
        datos: actualizado._id,
      });
    } catch (error) {
      respuesta.json({
        resultado: 'mal',
        mensaje: 'ocurrió un error',
        datos: error,
      });
    }
  },
  eliminarRegalo: async (solicitud, respuesta) => {
    try {
      const eliminado = await ModeloRegalo.findByIdAndDelete(
        solicitud.params.id
      );
      respuesta.json({
        resultado: 'bien',
        mensaje: 'regalo eliminado',
        datos: eliminado._id,
      });
    } catch (error) {
      respuesta.json({
        resultado: 'mal',
        mensaje: 'ocurrió un error',
        datos: error,
      });
    }
  },
};

export default ControladorRegalos;