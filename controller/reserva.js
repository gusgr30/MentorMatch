import ReservaServicio from "../service/reserva.js";

class ReservaController {
  #servicio = null;

  constructor() {
    this.#servicio = new ReservaServicio();
  }

  obtenerReservas = async (req, res) => {
    try {
      const { id } = req.params;
      const reservas = await this.#servicio.obtenerReservas(id);
      res.json(reservas);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  guardarReserva = async (req, res) => {
    try {
      const datosReserva = req.body;
      if (Object.keys(datosReserva).length === 0) {
        throw new Error("Los datos a actualizar están vacíos");
      }
      const nuevaReserva = await this.#servicio.guardarReserva(datosReserva);
      res.json(nuevaReserva);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  cancelarReserva = async (req, res) => {
    try {
      const { id } = req.params;
      const reservaCancelada = await this.#servicio.cancelarReserva(id);
      res.json(reservaCancelada);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  // borrarReserva = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const reservaEliminado = await this.#servicio.borrarReserva(id);
  //     res.json(reservaEliminado);
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .json({ url: req.url, method: req.method, error: error.message });
  //   }
  // };
}

export default ReservaController;
