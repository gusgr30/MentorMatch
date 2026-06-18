import config from "../config.js";
import { ESTADOS_RESERVA } from "../model/constants/index.js";
import ReservasFactory from "../model/DAO/reservas/reservasFactory.js";
import Reserva from "../model/Reserva.js";
import UsuarioServicio from "./usuario.js";
import Mailer from "./email.js";

class ReservaServicio {
  #modelo = null;
  #usuarioServicio = null;

  constructor(persistencia) {
    // const modo = config.MODELO_PERSISTENCIA;
    this.#modelo = ReservasFactory.get(persistencia);
    this.#usuarioServicio = new UsuarioServicio();
  }

  obtenerReservas = async (id) => {
    if (id) {
      const reserva = await this.#modelo.obtenerReserva(id);

      const mentor = await this.#usuarioServicio.obtenerUsuarios(
        reserva.mentorId,
      );
      const student = await this.#usuarioServicio.obtenerUsuarios(
        
        reserva.studentId,
      );      
      
      if (!mentor || !student) throw new Error("Usuarios de la reserva no encontrados")

      const mentorObj = {nombre: mentor.nombre}
      const studentObj = {nombre: student.nombre}

      return {
        mentorObj,
        studentObj,
        reserva
      }
    }
    const reservas = await this.#modelo.obtenerReservas();
    return reservas;
  };

  obtenerReservasPorUsuario = async (userId) => {
    const reservas = await this.#modelo.obtenerReservasPorUsuario(userId);

    const reservasEnriquecidas = await Promise.all(
      reservas.map(async (reserva) => {
        const mentor = await this.#usuarioServicio.obtenerUsuarios(reserva.mentorId);
        const student = await this.#usuarioServicio.obtenerUsuarios(reserva.studentId);
        return {
          ...reserva,
          mentor: mentor ? { nombre: mentor.nombre, fotoUrl: mentor.fotoUrl } : null,
          student: student ? { nombre: student.nombre, fotoUrl: student.fotoUrl } : null,
        };
      })
    );

    return reservasEnriquecidas;
  }

  guardarReserva = async (datosReserva) => {
    const reservaInstancia = new Reserva(datosReserva);
    reservaInstancia.validar();
    const nuevaReserva = reservaInstancia.get();

    const mentor = await this.#usuarioServicio.obtenerUsuarios(
      nuevaReserva.mentorId,
    );

    if (!mentor) {
      throw new Error("El mentor indicado no existe");
    }

    const student = await this.#usuarioServicio.obtenerUsuarios(
      nuevaReserva.studentId,
    );

    if (!student) {
      throw new Error("El alumno indicado no existe");
    }

    // Verificamos si existe alguna colision (tanto para mentor como para student)
    const conflicto = await this.#modelo.buscarColisionExistente(
      nuevaReserva.mentorId,
      nuevaReserva.studentId,
      nuevaReserva.fechaHora,
    );

    if (conflicto) {
      if (conflicto.mentorId === nuevaReserva.mentorId) {
        throw new Error(
          "El mentor seleccionado ya se encuentra ocupado en ese horario.",
        );
      }
      if (conflicto.studentId === nuevaReserva.studentId) {
        throw new Error(
          "Ya tienes otra mentoría agendada para el mismo día y horario.",
        );
      }
    }
    const mentorObj = {nombre: mentor.nombre, email: mentor.email}
    const studentObj = {nombre: student.nombre}
    const reservaGuardada = await this.#modelo.guardarReserva(nuevaReserva);

    Mailer.enviarNotificacionReserva(reservaGuardada, mentorObj, studentObj) 

    return reservaGuardada
  };

  actualizarReserva = async (id, datosAActualizar) => {
    const reservaActualizada = await this.#modelo.actualizarReserva( id, datosAActualizar);
    return reservaActualizada;
  }

  cancelarReserva = async (id) => {
    const reservaCancelada = await this.#modelo.cancelarReserva(id);
    return reservaCancelada;
  };

  confirmarReserva = async (id, urlZoom) => {
    const reserva = await this.#modelo.obtenerReserva(id)
    if(!reserva || !reserva._id){
      const error = new Error("La reserva no existe")
      error.status = 404
      throw error
    }
    if(reserva.estado !== ESTADOS_RESERVA.PENDIENTE){
      const error = new Error("La reserva ya fue confirmada o cancelada")
      error.status = 400
      throw error
    }

    const reservaConfirmada = await this.#modelo.confirmarReserva(id, urlZoom)

    const mentor = await this.#usuarioServicio.obtenerUsuarios(reservaConfirmada.mentorId)
    const student = await this.#usuarioServicio.obtenerUsuarios(reservaConfirmada.studentId)

    const mentorObj = {nombre: mentor.nombre, email: mentor.email}
    const studentObj = {nombre: student.nombre, email: student.email}


    Mailer.enviarConfirmacionReserva(reservaConfirmada, mentorObj, studentObj)

    return reservaConfirmada
  }

  borrarReserva = async (id) => {
    const reservaEliminado = await this.#modelo.borrarReserva(id);
    return reservaEliminado;
  };
}

export default ReservaServicio;
