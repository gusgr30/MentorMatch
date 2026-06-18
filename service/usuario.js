import config from "../config.js";
import UsuariosFactory from "../model/DAO/usuarios/usuariosFactory.js";
import Usuario from "../model/Usuario.js";
import bcrypt from "bcryptjs";
import Mailer from "./email.js";

class UsuarioServicio {
  #modelo = null;

  constructor(persistencia) {
    // const modo = config.MODELO_PERSISTENCIA;
    this.#modelo = UsuariosFactory.get(persistencia);
  }

  obtenerUsuariosPorRol = async (rol) => {
    return await this.#modelo.obtenerUsuariosPorRol(rol);
  };

  obtenerUsuarios = async (id, rol) => {
    if (id) {
      return await this.#modelo.obtenerUsuarioPorId(id);
    }
    if (rol) {
      return await this.#modelo.obtenerUsuariosPorRol(rol);
    }
    return await this.#modelo.obtenerUsuarios();
  };

  guardarUsuario = async (usuario) => {
    const usuarioInstancia = new Usuario(usuario);
    usuarioInstancia.validar();
    const passHasheada = await bcrypt.hash(usuarioInstancia.password, 10)   //usando bcrypt se hashea la contraseña, usando un salt rounds de 10
    usuarioInstancia.password = passHasheada                                //se cambia la contraseña plana del usuario instanciado por el hash
    const usuarioGuardado = await this.#modelo.guardarUsuario(
      usuarioInstancia.get(),
    );
    Mailer.enviarBienvenida(usuarioInstancia.get())
    return usuarioGuardado;
  };

  actualizarUsuario = async (id, datosAActualizar) => {
    if (datosAActualizar.password) {
      const passHasheada = await bcrypt.hash(datosAActualizar.password, 10); 
      datosAActualizar.password = passHasheada
    }
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
