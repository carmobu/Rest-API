import bcrypt from "bcryptjs";
import ModeloUsuario from "../modelos/modeloUsuario.js";
import {generarToken, verificarToken} from "../helpers/funciones.js";

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
            datos: token,
          });
        } else {
            respuesta.json({
            mensaje: "efe",
          });
        }
      } else {
        respuesta.json({
          mensaje: "efe",
        });
      }
    } catch (error) {
      respuesta.json({
        mensaje: "Error en el servidor",
        error: error.message,
      });
    }
  },

  validarToken: async (solicitud, respuesta) => {
    try {
      const token = solicitud.params.token;
      const decodificado = await verificarToken(token);
      console.log(decodificado);
      if (decodificado.id) {
        respuesta.json({
          resultado: 'bien',
          mensaje: 'valido',
          datos: decodificado,
        });
      }
    } catch (error) {
      respuesta.json({
        resultado: 'mal',
        mensaje: 'ocurrio un error',
        datos: error
      });
      
    }
  }
};

export default ControladorSesion;
