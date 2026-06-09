import { MongoClient } from "mongodb";
import config from "../config.js";

class CnxMongoDB {
  static db = null;
  static connectionOK = false;
  static conectar = async () => {
    try {
      console.log("Conectando a MongoDB...");

      const client = new MongoClient(config.STRCNX);
      await client.connect();

      console.log("Conexión a MongoDB exitosa!");

      CnxMongoDB.db = client.db(config.BASE);
      CnxMongoDB.connectionOK = true;

      //Creamos el indice unico sobre el email para evitar duplicidad
      await CnxMongoDB.db.collection("usuarios").createIndex(
        {email: 1},    
        {unique: true}  //no permite mails repetidos
      )
      console.log("Índice único de email creado")

    } catch (error) {
      console.log("Error al conectar a MongoDB:", error);
    }
  };
}

export default CnxMongoDB;
