import config from "./config.js";
import CnxMongoDB from "./model/DBMongo.js";
import Server from "./server.js";
import Mailer from "./service/email.js";

await Mailer.config()

if (config.MODELO_PERSISTENCIA === "MONGODB") {
  await CnxMongoDB.conectar();
}

const server = new Server(config.PORT);
server.start();
