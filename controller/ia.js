import IaServicio from "../service/ia.js";

class IaController {
  #servicio = null;

  constructor() {
    this.#servicio = new IaServicio();
  }

  generarDescripcion = async (req, res) => {
    try {
      const { titulo, skills, experiencia } = req.body;

      if (!titulo && !skills?.length && !experiencia)
        throw new Error("Se necesita al menos un dato (título, skills o experiencia) para generar la descripción");

      const descripcion = await this.#servicio.generarDescripcion({
        titulo,
        skills,
        experiencia,
      });

      res.json({ descripcion });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };
}

export default IaController;
