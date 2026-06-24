import express from "express";
import RouterReservas from "./router/reservas.js";
import RouterUsuarios from "./router/usuarios.js";
import RouterAuth from "./router/auth.js";
import RouterConfig from "./router/config.js";
import cors from "cors";
import CnxMongoDB from "./model/DBMongo.js";

class Server {
  #port;
  #routerReserva;
  #routerUsuarios;
  #routerAuth;
  #routerConfig;
  #persistencia = "";
  #server = null;

  constructor(port, persistencia) {
    this.#port = port;
    this.#persistencia = persistencia;
    this.#routerReserva = new RouterReservas(persistencia).config();
    this.#routerUsuarios = new RouterUsuarios(persistencia).config();
    this.#routerAuth = new RouterAuth().config();
    this.#routerConfig = new RouterConfig(persistencia).config();
  }

  async start() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static("public/"));
    app.use("/uploads", express.static("uploads"));
    //api para despertar a render para el front
    app.get("/api/health", (req, res) => res.json({ ok: true }));

    app.use("/api/reservas", this.#routerReserva);
    app.use("/api/usuarios", this.#routerUsuarios);
    app.use("/api/auth", this.#routerAuth);
    app.use("/api/config", this.#routerConfig);

    try {
      if (this.#persistencia === "MONGODB") {
        await CnxMongoDB.conectar();
      }

      const PORT = this.#port;
      this.#server = app.listen(PORT, () =>
        console.log(`Servidor de MentorMatch escuchando en puerto ${PORT}`),
      );
      this.#server.on("error", (error) =>
        console.log("Error en el servidor " + error),
      );
    } catch (error) {
      console.log(`Error en conexion de base de datos: ${error.message}`);
    }
    return app;
  }

  async stop() {
    if (this.#server != null) {
      this.#server.close();
      await CnxMongoDB.desconectar();
      this.#server = null;
    }
  }
}

export default Server;
