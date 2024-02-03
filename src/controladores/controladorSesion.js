import bcrypt from "bcryptjs";
import ModeloUsuario from "../modelos/modeloUsuario.js";
import generarToken from "../helpers/funciones.js";

const ControladorSesion = {
  loguearUsuario: async (solicitud, respuesta) => {
    try {
      const { username, password } = solicitud.body;
      const usuarioEncontrado = await ModeloUsuario.findOne({ username });
      if (usuarioEncontrado) {
        const contraseniaValida = await bcrypt.compare(
          password,
          usuarioEncontrado.password
        );
        if (contraseniaValida) {
          const token = await generarToken({
            id: usuarioEncontrado._id,
            nombre: usuarioEncontrado.nombre,
          });
          respuesta.json({
            mensaje: "Usuario logueado correctamente",
            token: token,
          });
        } else {
          respuesta.status(401).json({
            mensaje: "efe",
          });
        }
      } else {
        respuesta.status(404).json({
          mensaje: "efe",
        });
      }
    } catch (error) {
      respuesta.status(500).json({
        mensaje: "Error en el servidor",
        error: error.message,
      });
    }
  },
};

export default ControladorSesion;
