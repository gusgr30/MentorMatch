import express from "express";
import RouterMentor from "./router/mentor.js";
import RouterReservas from "./router/reservas.js";
import RouterUsuarios from "./router/usuarios.js";

class Server {
  #port;
  #routerMentor;
  #routerReserva;
  #routerUsuarios;

  constructor(port) {
    this.#port = port;
    this.#routerMentor = new RouterMentor().config();
    this.#routerReserva = new RouterReservas().config();
    this.#routerUsuarios = new RouterUsuarios().config();
  }

  start() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static("public/"));
    app.use("/uploads", express.static("uploads"));

    app.use("/api/mentores", this.#routerMentor);
    app.use("/api/reservas", this.#routerReserva);
    app.use("/api/usuarios", this.#routerUsuarios);

    const PORT = this.#port;
    const server = app.listen(PORT, () =>
      console.log(`Servidor de MentorMatch escuchando en puerto ${PORT}`),
    );
    server.on("error", (error) => console.log("Error en el servidor " + error));
  }
}

export default Server;
