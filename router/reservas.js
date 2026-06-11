import express from "express";
import ReservaController from "../controller/reserva.js";

class RouterReservas {
  #controlador;

  constructor() {
    this.#controlador = new ReservaController();
  }

  config() {
    const router = express.Router();

    router.get("/usuario/:userId", this.#controlador.obtenerReservasPorUsuario);
    router.get("{/:id}", this.#controlador.obtenerReservas);
    router.post("/", this.#controlador.guardarReserva);
    router.put("/:id/cancelar", this.#controlador.cancelarReserva);
    router.put("/:id/confirmar", this.#controlador.confirmarReserva);
    // router.delete("/:id", this.#controlador.borrarReserva);

    return router;
  }
}
export default RouterReservas;
