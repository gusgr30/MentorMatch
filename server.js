import express from "express";
import RouterReservas from "./router/reservas.js";
import RouterUsuarios from "./router/usuarios.js";
import RouterAuth from "./router/auth.js";
import RouterConfig from "./router/config.js";
import cors from "cors";


class Server {
  #port;
  #routerReserva;
  #routerUsuarios;
  #routerAuth;
  #routerConfig;

  constructor(port) {
    this.#port = port;
    this.#routerReserva = new RouterReservas().config();
    this.#routerUsuarios = new RouterUsuarios().config();
    this.#routerAuth = new RouterAuth().config();
    this.#routerConfig = new RouterConfig().config();
  }

  start() {
    const app = express();
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static("public/"));
    app.use("/uploads", express.static("uploads"));

    app.use("/api/reservas", this.#routerReserva);
    app.use("/api/usuarios", this.#routerUsuarios);
    app.use("/api/auth", this.#routerAuth);
    app.use("/api/config", this.#routerConfig);

    const PORT = this.#port;
    const server = app.listen(PORT, () =>
      console.log(`Servidor de MentorMatch escuchando en puerto ${PORT}`),
    );
    server.on("error", (error) => console.log("Error en el servidor " + error));
  }
}

export default Server;
