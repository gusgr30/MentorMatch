import express from "express";
import ReservaController from "../controller/reserva.js";

class RouterReservas {
  #controlador;

  constructor() {
    this.#controlador = new ReservaController();
  }

  config() {
    const router = express.Router();

    router.get("{/:id}", this.#controlador.obtenerReservas);
    router.post("/", this.#controlador.guardarReserva);
    router.put("/:id", this.#controlador.cancelarReserva);
    // router.delete("/:id", this.#controlador.borrarReserva);

    return router;
  }
}
export default RouterReservas;
