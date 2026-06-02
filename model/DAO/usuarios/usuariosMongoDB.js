import { ObjectId } from "mongodb";
import CnxMongoDB from "../../DBMongo.js";

class UsuariosMongoDB {
  constructor() {}

  obtenerUsuarios = async () => {
    if (!CnxMongoDB.connectionOK) {
      throw new Error("Error de conexión a base de datos");
    }
    const usuarios = await CnxMongoDB.db
      .collection("usuarios")
      .find({})
      .toArray();
    return usuarios;
  };

  obtenerUsuarioPorId = async (id) => {
    if (!CnxMongoDB.connectionOK) {
      throw new Error("Error de conexión a base de datos");
    }
    const usuario = await CnxMongoDB.db.collection("usuarios").findOne({
      _id: new ObjectId(id),
    });
    return usuario;
  };

  guardarUsuario = async (usuario) => {
    if (!CnxMongoDB.connectionOK) {
      throw new Error("Error de conexión a base de datos");
    }
    const usuarioGuardado = await CnxMongoDB.db
      .collection("usuarios")
      .insertOne(usuario);
    return usuarioGuardado;
  };

  actualizarUsuario = async (id, datosAActualizar) => {
    if (!CnxMongoDB.connectionOK) {
      throw new Error("Error de conexión a base de datos");
    }
    const usuarioActual = await this.obtenerUsuarioPorId(id);

    if (datosAActualizar.mentorProfile && usuarioActual.mentorProfile) {
      datosAActualizar.mentorProfile = {
        ...usuarioActual.mentorProfile,
        ...datosAActualizar.mentorProfile,
      };
    }

    await CnxMongoDB.db
      .collection("usuarios")
      .updateOne({ _id: new ObjectId(id) }, { $set: datosAActualizar });

    return await this.obtenerUsuarioPorId(id);
  };

  borrarUsuario = async (id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    const usuarioEliminado = await this.obtenerUsuarioPorId(id);
    await CnxMongoDB.db.collection("usuarios").deleteOne({
      _id: new ObjectId(id),
    });

    return usuarioEliminado;
  };
}

export default UsuariosMongoDB;
