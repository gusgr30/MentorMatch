import UsuariosMongoDB from "./usuariosMongoDB.js";

class UsuariosFactory {
  static get(tipo) {
    switch (tipo) {
      case "MONGODB":
        console.log("**** Persistiendo en MongoDB Database ****");
        return new UsuariosMongoDB();

      default:
        console.log("**** Persistiendo en MONGODB (default) ****");
        return new UsuariosMongoDB();
    }
  }
}

export default UsuariosFactory;
