import express from "express";
import IaController from "../controller/ia.js";

class RouterIa {
  #controlador;

  constructor() {
    this.#controlador = new IaController();
  }

  config() {
    const router = express.Router();

    // Sin verificarToken: se usa tanto desde el perfil (logueado) como desde el
    // formulario de registro (todavía sin JWT), y no depende de la identidad del usuario.
    router.post("/generar-descripcion", this.#controlador.generarDescripcion);

    return router;
  }
}

export default RouterIa;
