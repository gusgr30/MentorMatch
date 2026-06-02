import config from "../config.js";
import UsuariosFactory from "../model/DAO/usuarios/usuariosFactory.js";
import Usuario from "../model/Usuario.js";

class UsuarioServicio {
  #modelo = null;

  constructor() {
    const modo = config.MODELO_PERSISTENCIA;
    this.#modelo = UsuariosFactory.get(modo);
  }

  obtenerUsuarios = async (id) => {
    if (id) {
      const usuario = await this.#modelo.obtenerUsuarioPorId(id);
      return usuario;
    }
    const usuarios = await this.#modelo.obtenerUsuarios();
    return usuarios;
  };

  guardarUsuario = async (usuario) => {
    const usuarioInstancia = new Usuario(usuario);
    usuarioInstancia.validar();
    const usuarioGuardado = await this.#modelo.guardarUsuario(
      usuarioInstancia.get(),
    );
    return usuarioGuardado;
  };

  actualizarUsuario = async (id, datosAActualizar) => {
    const usuarioActualizado = await this.#modelo.actualizarUsuario(
      id,
      datosAActualizar,
    );
    return usuarioActualizado;
  };

  borrarUsuario = async (id) => {
    const usuarioEliminado = await this.#modelo.borrarUsuario(id);
    return usuarioEliminado;
  };
}

export default UsuarioServicio;
