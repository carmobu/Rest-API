import bcrypt from "bcryptjs";
import ModeloUsuario from "../modelos/modeloUsuario.js";

const ControladorUsuarios = {
  crearUsuario: async (solicitud, respuesta) => {
    try {
      const { username, password, nombre, cc } = solicitud.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const nuevoUsuario = new ModeloUsuario({
        username,
        password: hashPassword,
        nombre,
        cc,
      });
      const usuarioCreado = await nuevoUsuario.save();
      if (usuarioCreado._id) {
        respuesta.json({
          mensaje: "Usuario creado",
          datos: usuarioCreado._id,
        });
      }
    } catch (error) {
      respuesta.json({
        mensaje: "Ocurrio un error",
        datos: error,
      });
    }
  },
  leerUsuarios: async (solicitud, respuesta) => {
    try {
      const todosLosUsuarios = await ModeloUsuario.find();
      respuesta.json({
        mensaje: "Todos los usuarios",
        datos: todosLosUsuarios,
      });
    } catch (error) {
      respuesta.json({
        mensaje: "Ocurrio un error",
        datos: error,
      });
    }
  },
  leerUsuario: async (solicitud, respuesta) => {
    try {
      const usuario = await ModeloUsuario.findById(solicitud.params.id);
      respuesta.json({
        mensaje: "usuario leido",
        datos: usuario,
      });
    } catch (error) {
      respuesta.json({
        mensaje: "No se pudo leer Usuario",
        datos: error,
      });
    }
  },
  actualizarUsuario: async (solicitud, respuesta) => {
    try {
      const actualizado = await ModeloUsuario.findByIdAndUpdate(
        solicitud.params.id,
        solicitud.body
      );
      respuesta.json({
        mensaje: "Usuario actualizado",
        datos: actualizado._id,
      });
    } catch (error) {
      respuesta.json({
        mensaje: "Ocurrio un error",
        datos: error,
      });
    }
  },
  eliminarUsuario: async (solicitud, respuesta) => {
    try {
      const eliminado = await ModeloUsuario.findByIdAndDelete(
        solicitud.params.id
      );
      respuesta.json({
        mensaje: "Usuario eliminado",
        datos: eliminado._id,
      });
    } catch (error) {
      respuesta.json({
        mensaje: "Ocurrio un error",
        datos: error,
      });
    }
  },
};

export default ControladorUsuarios;
