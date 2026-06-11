import express from "express";
import ReservaController from "../controller/reserva.js";
import verificarToken from "../middleware/auth.js";

class RouterReservas {
  #controlador;

  constructor() {
    this.#controlador = new ReservaController();
  }

  config() {
    const router = express.Router();

    router.get("/usuario/:userId", verificarToken, this.#controlador.obtenerReservasPorUsuario);
    router.get("{/:id}", verificarToken, this.#controlador.obtenerReservas);
    router.post("/", verificarToken, this.#controlador.guardarReserva);
    router.put("/:id/cancelar", verificarToken, this.#controlador.cancelarReserva);
    router.put("/:id/confirmar", verificarToken, this.#controlador.confirmarReserva);
    // router.delete("/:id", this.#controlador.borrarReserva);

    return router;
  }
}
export default RouterReservas;
