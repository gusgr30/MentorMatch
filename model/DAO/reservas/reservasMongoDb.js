import { ObjectId } from "mongodb";
import { ESTADOS_RESERVA } from "../../constants/index.js";
import CnxMongoDB from "../../DBMongo.js";

class ReservasMongoDB {
  constructor() {}

  obtenerReservas = async () => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");
    return await CnxMongoDB.db.collection("reservas").find({}).toArray();
  };

  obtenerReserva = async (id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    if(!ObjectId.isValid(id)){
      const error = new Error("El id no es válido")
      error.status = 400
      throw error
    }
    const reserva = await CnxMongoDB.db.collection("reservas").findOne({
      _id: new ObjectId(id),
    });

    return reserva || {};
  };

  obtenerReservasPorUsuario = async (userId) =>{
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    if(!ObjectId.isValid(userId)){
      const error = new Error("El id no es válido")
      error.status = 400
      throw error
    }
    const reservas = await CnxMongoDB.db.collection("reservas").find({
      $or: [{mentorId: userId}, {studentId: userId}]
    }).toArray();

    return reservas;
  }

  guardarReserva = async (reserva) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    await CnxMongoDB.db.collection("reservas").insertOne(reserva);
    return reserva;
  };

  buscarColisionExistente = async (mentorId, studentId, fechaHora) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    return await CnxMongoDB.db.collection("reservas").findOne({
      // El estado no debe estar cancelado
      estado: { $ne: ESTADOS_RESERVA.CANCELADA },
      // El horario debe ser el mismo
      fechaHora: new Date(fechaHora),
      // Que el mentor este ocupado O que el alumno este ocupado
      $or: [{ mentorId: mentorId }, { studentId: studentId }],
    });
  };

  actualizarReserva = async (id, datosAActualizar) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    const reservaActual = await this.obtenerReserva(id);

    await CnxMongoDB.db
      .collection("reservas")
      .updateOne({ _id: new ObjectId(id) }, { $set: datosAActualizar });

    return await this.obtenerReserva(id);
  }

  cancelarReserva = async (id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    await CnxMongoDB.db
      .collection("reservas")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { estado: ESTADOS_RESERVA.CANCELADA } },
      );
    return await this.obtenerReserva(id);
  };

  confirmarReserva = async (id, urlZoom) => {
    if (!CnxMongoDB.connectionOK){
      const error = new Error("Error de conexión a base de datos");
      error.status = 500
      throw error
    }

    await CnxMongoDB.db
      .collection("reservas")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { 
            estado: ESTADOS_RESERVA.CONFIRMADA, 
            urlZoom: urlZoom 
          } 
        },
      );
    return await this.obtenerReserva(id);
  };

  borrarReserva = async (id) => {
    if (!CnxMongoDB.connectionOK)
      throw new Error("Error de conexión a base de datos");

    const reservaEliminado = await this.obtenerReserva(id);
    await CnxMongoDB.db.collection("reservas").deleteOne({
      _id: new ObjectId(id),
    });

    return reservaEliminado;
  };
}

export default ReservasMongoDB;
