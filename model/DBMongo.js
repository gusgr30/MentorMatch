import { MongoClient } from "mongodb";
import config from "../config.js";

class CnxMongoDB {
  static db = null;
  static connectionOK = false;
  static client = null;

  static conectar = async () => {
    // try {
      console.log("Conectando a MongoDB...");

      CnxMongoDB.client = new MongoClient(config.STRCNX);
      await CnxMongoDB.client.connect();

      console.log("Conexión a MongoDB exitosa!");

      CnxMongoDB.db = CnxMongoDB.client.db(config.BASE);
      CnxMongoDB.connectionOK = true;

      await CnxMongoDB.db.collection("usuarios").createIndex(
        { email: 1 },
        { unique: true },
      );
      console.log("Índice único de email creado");

    // } catch (error) {
    //   console.log("Error al conectar a MongoDB:", error.message);
    //   throw error;
    // }
  };

  static desconectar = async () => {
    if (!CnxMongoDB.connectionOK) return;
    if (CnxMongoDB.client) {
      await CnxMongoDB.client.close();
    }
  };
}

export default CnxMongoDB;
