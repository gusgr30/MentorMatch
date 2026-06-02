import express from "express";
import UsuarioController from "../controller/usuario.js";
import upload from "../middleware/upload.js";

class RouterUsuarios {
  #controlador;

  constructor() {
    this.#controlador = new UsuarioController();
  }

  config() {
    const router = express.Router();

    router.get("{/:id}", this.#controlador.obtenerUsuarios);
    router.post(
      "/",
      upload.single("fotoUrl"),
      this.#controlador.guardarUsuario,
    );
    router.put("/:id", upload.single("fotoUrl"), this.#controlador.actualizarUsuario);
    router.delete("/:id", this.#controlador.borrarUsuario);

    return router;
  }
}

export default RouterUsuarios;
