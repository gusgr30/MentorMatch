import { ESTADOS_RESERVA } from "./constants/index.js";
import Joi from "joi";

class Reserva {
  constructor({
    studentId,
    mentorId,
    fechaHora,
    estado = ESTADOS_RESERVA.PENDIENTE
  }) {
    this.studentId = studentId;
    this.mentorId = mentorId;
    this.fechaHora = fechaHora ? new Date(fechaHora) : null;
    this.estado = estado;
    this.urlZoom = null
  }

  validar() {
    const schema = Joi.object({
      studentId: Joi.string().required(),
      mentorId: Joi.string().required(),
      fechaHora: Joi.date().greater("now").required().messages({
        "date.greater":
          "La fecha y hora de la reserva no puede ser en el pasado.",
      }),

      estado: Joi.string()
        .valid(...Object.values(ESTADOS_RESERVA))
        .required(),
    });

    const { error } = schema.validate({
      studentId: this.studentId,
      mentorId: this.mentorId,
      fechaHora: this.fechaHora,
      estado: this.estado,
    });

    if (error) {
      throw new Error(`Validación de Reserva fallida: ${error.message}`);
    }
  }

  get() {
    return {
      studentId: this.studentId,
      mentorId: this.mentorId,
      fechaHora: this.fechaHora,
      estado: this.estado,
      urlZoom: this.urlZoom
    };
  }
}

export default Reserva;
