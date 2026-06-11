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

  obtenerReservasPorUsuario = async (req, res) => {
    try{
      const { userId } = req.params
      const reservas = await this.#servicio.obtenerReservasPorUsuario(userId)
      res.json(reservas)

    }catch(err){
      res.status(err.status || 500).json({error: err.message})
    }
  }

  guardarReserva = async (req, res) => {
    try {
      const datosReserva = req.body;
      if (Object.keys(datosReserva).length === 0) {
        throw new Error("Los datos a actualizar están vacíos");
      }
      const reservaGuardada = await this.#servicio.guardarReserva(datosReserva);
      res.json(reservaGuardada);
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

  confirmarReserva = async (req, res) => {
    try {
      const { id } = req.params
      const { urlZoom } = req.body
      
      //DESPUES CUANDO TENGAMOS EL FRONT VAMOS A TENER QUE RECIBIR TAMBIEN EL JWT Y EVALUAR SI EL USUARIO ES MENTOR PARA PODER CONFIRMAR

      if(!urlZoom){
        const error = new Error("Debes ingresar el url de Zoom para confirmar")
        error.status = 400
        throw error
      }
      const reservaConfirmada = await this.#servicio.confirmarReserva(id, urlZoom);
      res.json(reservaConfirmada);
    } catch (error) {
      res
        .status(error.status || 500)
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
