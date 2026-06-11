import express from "express";
import UsuarioController from "../controller/usuario.js";
import upload from "../middleware/upload.js";
import verificarToken from "../middleware/auth.js";

class RouterUsuarios {
  #controlador;

  constructor() {
    this.#controlador = new UsuarioController();
  }

  config() {
    const router = express.Router();

    router.get("{/:id}", verificarToken, this.#controlador.obtenerUsuarios);
    router.post("/", upload.single("fotoUrl"), this.#controlador.guardarUsuario);
    router.put("/:id", verificarToken, upload.single("fotoUrl"), this.#controlador.actualizarUsuario);
    // router.delete("/:id", this.#controlador.borrarUsuario);

    return router;
  }
}

export default RouterUsuarios;
