import config from "./config.js";
import Server from "./server.js";
import Mailer from "./service/email.js";

await Mailer.config()

const server = new Server(config.PORT, config.MODELO_PERSISTENCIA);
server.start();
