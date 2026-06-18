import UsuariosFactory from "../model/DAO/usuarios/usuariosFactory.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";

class ServiceAuth {
  #modelo;

  constructor(persistencia) {
    // const modo = config.MODELO_PERSISTENCIA;
    this.#modelo = UsuariosFactory.get(persistencia);
  }

  obtenerPorId = async (id) => {
    const usuario = await this.#modelo.obtenerUsuarioPorId(id);
    if (!usuario) {
      const error = new Error("Usuario no encontrado");
      error.status = 404;
      throw error;
    }
    const { _id, email, nombre, rol, fotoUrl, mentorProfile } = usuario;
    return { _id, email, nombre, rol, fotoUrl, mentorProfile };
  };

  login = async (emailBody, passBody) => {
    const usuario = await this.#modelo.obtenerUsuarioPorEmail(emailBody);
    if (!usuario) {
      const error = new Error("El email no se encuentra registrado");
      error.status = 404;
      throw error;
    }
    const { _id, email, password, nombre, rol, fotoUrl, mentorProfile } = usuario;

    const valido = await bcrypt.compare(passBody, password);

    if (!valido) {
      const error = new Error("Contraseña incorrecta");
      error.status = 401;
      throw error;
    }

    const token = jwt.sign({ id: usuario._id, email, rol }, config.JWT_SECRET, {
      expiresIn: "24h",
    });

    return {
      token,
      user: { _id, email, nombre, rol, fotoUrl, mentorProfile },
    };
  };
}

export default ServiceAuth;
