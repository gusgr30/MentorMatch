import config from "./config.js";
import CnxMongoDB from "./model/DBMongo.js";
import Server from "./server.js";

if (config.MODELO_PERSISTENCIA === "MONGODB") {
  await CnxMongoDB.conectar();
}

const server = new Server(config.PORT);
server.start();
