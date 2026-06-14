import UsuarioServicio from "../service/usuario.js";
import fs from "fs";

class UsuarioController {
  #servicio = null;

  constructor() {
    this.#servicio = new UsuarioServicio();
  }

  obtenerUsuarios = async (req, res) => {
    try {
      const { id } = req.params;
      const { rol } = req.query;
      const usuarios = await this.#servicio.obtenerUsuarios(id, rol);
      res.json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  guardarUsuario = async (req, res) => {
    try {
      const datosUsuario = req.body;

      // Si el middleware proceso una imagen con exito, capturamos su ruta
      if (req.file) {
        // Guardamos la URL relativa
        datosUsuario.fotoUrl = `/uploads/${req.file.filename}`;
      }

      if (Object.keys(datosUsuario).length == 0)
        throw new Error("El usuario está vacío");

      const usuarioGuardado = await this.#servicio.guardarUsuario(datosUsuario);
      res.json(usuarioGuardado);
    } catch (error) {
      // Si hubo  un error y se subio la imagen, la borramos para no dejar archivos huerfanos
      if (req.file) {
        fs.unlink(req.file.path, () => {});
      }
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  actualizarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const datosAActualizar = req.body;

      if (req.file) {
        datosAActualizar.fotoUrl = `/uploads/${req.file.filename}`;
      }

      if (Object.keys(datosAActualizar).length == 0)
        throw new Error("Los datos a actualizar están vacíos");
      const usuarioActualizado = await this.#servicio.actualizarUsuario(
        id,
        datosAActualizar,
      );
      res.json(usuarioActualizado);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };

  borrarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioEliminado = await this.#servicio.borrarUsuario(id);
      res.json(usuarioEliminado);
    } catch (error) {
      res
        .status(500)
        .json({ url: req.url, method: req.method, error: error.message });
    }
  };
}

export default UsuarioController;
